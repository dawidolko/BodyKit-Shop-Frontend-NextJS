/**
 * Przerabia zrodla z .image-cache/ na zoptymalizowane zasoby w public/images/.
 *
 * Dla kazdego zdjecia powstaje:
 *   - <nazwa>-<szerokosc>.avif  (glowny format, najlepsza kompresja)
 *   - <nazwa>-<szerokosc>.webp  (fallback dla starszych przegladarek)
 *   - <nazwa>-blur.txt          (base64 LQIP - placeholder przed zaladowaniem)
 *
 * Kadrowanie do zadanego formatu uzywa `attention`, wiec sharp wybiera
 * najbardziej wyrazisty fragment zamiast slepego srodka - wazne, bo czesc
 * zrodel jest pionowa, a potrzebujemy panoram.
 *
 * Uruchomienie: npm run images:optimize
 */
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { SOURCES } from './fetch-images.mjs';

const CACHE_DIR = path.resolve('.image-cache');
const OUT_DIR = path.resolve('public/images');

/**
 * Profile docelowe. `ratio` wymusza format kadru, `widths` to szerokosci
 * generowane pod srcset.
 */
const PROFILES = {
  hero: { ratio: 21 / 9, widths: [960, 1440, 1920] },
  banner: { ratio: 16 / 6, widths: [800, 1200, 1600] },
  category: { ratio: 4 / 3, widths: [400, 600, 800] },
  product: { ratio: 1, widths: [400, 600, 900] },
  editorial: { ratio: 3 / 2, widths: [600, 900, 1200] },
};

/** Przypisanie pliku zrodlowego do profilu kadrowania. */
const PROFILE_BY_FILE = {
  'hero-main': 'hero',
  'hero-garage': 'editorial',
  'cta-banner': 'banner',
  'about-workshop': 'editorial',
  'business-fleet': 'editorial',
};

function profileFor(name) {
  if (PROFILE_BY_FILE[name]) return PROFILE_BY_FILE[name];
  if (name.startsWith('cat-')) return 'category';
  if (name.startsWith('shot-')) return 'product';
  return 'editorial';
}

async function processOne(name) {
  const src = path.join(CACHE_DIR, `${name}.jpg`);
  const profileName = profileFor(name);
  const profile = PROFILES[profileName];
  const generated = [];

  const metadata = await sharp(src).metadata();
  const maxWidth = metadata.width ?? Math.max(...profile.widths);

  for (const width of profile.widths) {
    // Nie skalujemy w gore - lepiej wydac mniejszy plik niz rozmyty.
    if (width > maxWidth * 1.15) continue;

    const height = Math.round(width / profile.ratio);
    const pipeline = sharp(src)
      .resize(width, height, { fit: 'cover', position: sharp.strategy.attention })
      .sharpen({ sigma: 0.6 });

    await pipeline
      .clone()
      .avif({ quality: 58, effort: 6 })
      .toFile(path.join(OUT_DIR, `${name}-${width}.avif`));

    await pipeline
      .clone()
      .webp({ quality: 76, effort: 5 })
      .toFile(path.join(OUT_DIR, `${name}-${width}.webp`));

    generated.push(width);
  }

  // LQIP: maleńki rozmyty podglad wstawiany inline jako data URI.
  const lqip = await sharp(src)
    .resize(20, Math.max(1, Math.round(20 / profile.ratio)), { fit: 'cover' })
    .blur(1.2)
    .webp({ quality: 30 })
    .toBuffer();

  const dataUri = `data:image/webp;base64,${lqip.toString('base64')}`;
  await writeFile(path.join(OUT_DIR, `${name}-blur.txt`), dataUri, 'utf8');

  return { name, profile: profileName, widths: generated, lqipBytes: lqip.length };
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  let cached;
  try {
    cached = (await readdir(CACHE_DIR)).filter((f) => f.endsWith('.jpg'));
  } catch {
    console.error('Brak .image-cache/ - uruchom najpierw: npm run images:fetch');
    process.exitCode = 1;
    return;
  }

  const names = cached.map((f) => path.basename(f, '.jpg'));
  console.log(`Optymalizacja ${names.length} zdjec -> public/images/\n`);

  const results = [];
  for (const name of names) {
    const result = await processOne(name);
    results.push(result);
    console.log(`  ${name} [${result.profile}] -> ${result.widths.join(', ')}px`);
  }

  await writeCredits(results);
  await writeBlurMap(results);
  console.log(`\nGotowe. Wygenerowano ${results.length * 2} wariantow + LQIP.`);
}

/**
 * Zapisuje manifest obrazow: dla kazdego pliku LQIP, faktycznie wygenerowane
 * szerokosci i proporcje kadru.
 *
 * Komponent Picture buduje srcset wylacznie z tej mapy, dzieki czemu nie moze
 * poprosic o wariant, ktorego nie ma na dysku - a taki blad daje 404 dopiero
 * w przegladarce, nie przy budowaniu.
 */
async function writeBlurMap(results) {
  const entries = {};
  for (const result of results) {
    entries[result.name] = {
      blur: await readFile(path.join(OUT_DIR, `${result.name}-blur.txt`), 'utf8'),
      widths: result.widths,
      ratio: PROFILES[result.profile].ratio,
    };
  }
  const target = path.resolve('src/lib/image-manifest.json');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
  console.log(`  -> src/lib/image-manifest.json (${results.length} wpisow)`);
}

/** Zapisuje liste autorow - licencja Unsplash tego nie wymaga, ale wypada. */
async function writeCredits(results) {
  const byFile = new Map(SOURCES.map((s) => [s.file, s]));
  const rows = results
    .map((r) => byFile.get(r.name))
    .filter(Boolean)
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((s) => `| \`${s.file}\` | ${s.author} | [unsplash.com/photos/${s.id}](https://unsplash.com/photos/${s.id}) |`);

  const content = `# Zrodla zdjec

Wszystkie fotografie pochodza z [Unsplash](https://unsplash.com) i sa objete
[licencja Unsplash](https://unsplash.com/license): mozna z nich korzystac
bezplatnie, takze komercyjnie, bez pytania o zgode i bez obowiazkowej
atrybucji. Ponizsza lista jest dobrowolnym podziekowaniem dla autorow.

Pliki w tym katalogu sa pochodnymi (kadrowanie, skalowanie, konwersja do
AVIF/WebP) wygenerowanymi przez \`scripts/optimize-images.mjs\`.

| Plik | Autor | Zrodlo |
| --- | --- | --- |
${rows.join('\n')}

Rendery czesci (splittery, spoilery, dyfuzory) w \`src/components/product/PartRender.tsx\`
sa autorska grafika wektorowa stworzona na potrzeby tego projektu.
`;

  await writeFile(path.join(OUT_DIR, 'CREDITS.md'), content, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
