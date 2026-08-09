/**
 * Pobiera zdjecia scen (auta, warsztat, detale nadwozia) z Unsplash i zapisuje
 * je w .image-cache/. Zrodla sa na licencji Unsplash: wolno ich uzywac
 * komercyjnie bez zgody i bez atrybucji - mimo to zapisujemy autorow
 * w public/images/CREDITS.md, bo tak wypada.
 *
 * Uruchomienie: npm run images:fetch
 * Nastepnie:    npm run images:optimize
 *
 * Skrypt jest idempotentny - juz pobrane pliki pomija.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const CACHE_DIR = path.resolve('.image-cache');

/**
 * Kazdy wpis to zdjecie Unsplash: id fotografii + autor (do CREDITS)
 * + rola w serwisie. `w` dobiera szerokosc zrodla do docelowego uzycia.
 */
const SOURCES = [
  // --- Hero / sekcje ---
  { id: 'IKQVgYipevQ', file: 'hero-main', author: 'Al Yori', w: 2400, role: 'hero glowny' },
  { id: 'jU5kaHyBhq8', file: 'hero-garage', author: 'Toby Hall', w: 2000, role: 'sekcja warsztat' },
  { id: 'rOsbzK6j5pk', file: 'cta-banner', author: 'Axhad Mohamed', w: 2000, role: 'baner CTA' },
  { id: 'pip2LoO1H6w', file: 'about-workshop', author: 'Toby Hall', w: 2000, role: 'o nas' },
  { id: 'qKcTUvKJTZ8', file: 'business-fleet', author: 'Robin WOEHL', w: 2000, role: 'B2B' },

  // --- Kafle kategorii ---
  { id: '50cIn5ELxLo', file: 'cat-splittery', author: 'Lance Asper', w: 1200, role: 'kategoria splittery' },
  { id: 'gQirfxwCeuw', file: 'cat-spoilery', author: 'Baptiste Regnier', w: 1200, role: 'kategoria spoilery' },
  { id: 't_da1pys898', file: 'cat-dyfuzory', author: 'Ryno Marais', w: 1200, role: 'kategoria dyfuzory' },
  { id: '_WIC1wfxlbY', file: 'cat-progi', author: 'Chris Stein', w: 1200, role: 'kategoria progi' },
  { id: 'h82zfDTFUP0', file: 'cat-felgi', author: 'Mathias Reding', w: 1200, role: 'kategoria felgi' },
  { id: 'nuF88iIQOu0', file: 'cat-wydechy', author: 'Bradikan', w: 1200, role: 'kategoria wydechy' },
  { id: 'Z9jNN_F2PwU', file: 'cat-zawieszenie', author: 'Toby Hall', w: 1200, role: 'kategoria zawieszenie' },
  { id: 'Lwhd4wSjLxw', file: 'cat-karbon', author: 'Andres Grijalva', w: 1200, role: 'kategoria karbon' },

  // --- Zdjecia lifestyle do kart / galerii produktu ---
  { id: '-pSOAtdMVlk', file: 'shot-detail-1', author: 'Lance Asper', w: 1600, role: 'detal nadwozia' },
  { id: 'heBR6uL0RB4', file: 'shot-detail-2', author: 'Justin Reichelt', w: 1600, role: 'detal nadwozia' },
  { id: 'lawdYpKPhGE', file: 'shot-detail-3', author: 'Yihao Li', w: 1600, role: 'detal nadwozia' },
  { id: '4iYr6fQm_rs', file: 'shot-detail-4', author: 'Matheus Frazao', w: 1600, role: 'detal nadwozia' },
  { id: 'QGLFFH4hWW8', file: 'shot-detail-5', author: 'Puscas Adryan', w: 1600, role: 'detal nadwozia' },
  { id: 'YoBx_5o1PbM', file: 'shot-detail-6', author: 'Zachary Edmundson', w: 1600, role: 'detal nadwozia' },
  { id: 'FsBbavP9YA4', file: 'shot-wheel-1', author: 'Jakob Rosen', w: 1600, role: 'detal felgi' },
  { id: '_GpMW7GiJz0', file: 'shot-wheel-2', author: 'Semyon Borisov', w: 1600, role: 'detal felgi' },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(entry) {
  const target = path.join(CACHE_DIR, `${entry.file}.jpg`);
  if (await exists(target)) {
    console.log(`  = ${entry.file}.jpg (juz w cache)`);
    return true;
  }

  // Endpoint /photo-<id> nie istnieje publicznie; uzywamy source.unsplash.com,
  // ktory przekierowuje do CDN z zadana szerokoscia.
  const url = `https://unsplash.com/photos/${entry.id}/download?w=${entry.w}`;

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'BodyKitShop-AssetFetcher/1.0' },
    });
    if (!response.ok) {
      console.warn(`  ! ${entry.file}: HTTP ${response.status}`);
      return false;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 10_000) {
      console.warn(`  ! ${entry.file}: podejrzanie maly plik (${buffer.length} B)`);
      return false;
    }
    await writeFile(target, buffer);
    console.log(`  + ${entry.file}.jpg (${(buffer.length / 1024).toFixed(0)} kB)`);
    return true;
  } catch (error) {
    console.warn(`  ! ${entry.file}: ${error.message}`);
    return false;
  }
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  console.log(`Pobieranie ${SOURCES.length} zdjec do .image-cache/\n`);

  const results = [];
  for (const entry of SOURCES) {
    results.push({ entry, ok: await download(entry) });
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\nGotowe: ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('Nieudane:', failed.map((f) => f.entry.file).join(', '));
    console.log('Skrypt optymalizacji podstawi generowane tla dla brakujacych plikow.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { SOURCES };
