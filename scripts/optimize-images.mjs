/**
 * Turns the sources in .image-cache/ into optimized assets in public/images/.
 *
 * For every photo it produces:
 *   - <name>-<width>.avif  (primary format, best compression)
 *   - <name>-<width>.webp  (fallback for older browsers)
 *   - <name>-blur.txt      (base64 LQIP - placeholder shown before loading)
 *
 * Cropping to the target aspect ratio uses the `attention` strategy, so sharp
 * picks the most salient region instead of a blind centre crop - that matters
 * because some of the sources are portrait while we need panoramas.
 *
 * Run with: npm run images:optimize
 */
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { SOURCES } from './fetch-images.mjs';

const CACHE_DIR = path.resolve('.image-cache');
const OUT_DIR = path.resolve('public/images');

/**
 * Target profiles. `ratio` forces the crop aspect ratio, `widths` are the
 * widths generated for the srcset.
 */
const PROFILES = {
  hero: { ratio: 21 / 9, widths: [960, 1440, 1920] },
  banner: { ratio: 16 / 6, widths: [800, 1200, 1600] },
  category: { ratio: 4 / 3, widths: [400, 600, 800] },
  product: { ratio: 1, widths: [400, 600, 900] },
  editorial: { ratio: 3 / 2, widths: [600, 900, 1200] },
};

/** Maps a source file to its cropping profile. */
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
    // Never upscale - shipping a smaller file beats shipping a blurry one.
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

  // LQIP: a tiny blurred preview inlined as a data URI.
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
    console.error('No .image-cache/ directory - run this first: npm run images:fetch');
    process.exitCode = 1;
    return;
  }

  const names = cached.map((f) => path.basename(f, '.jpg'));
  console.log(`Optimizing ${names.length} photos -> public/images/\n`);

  const results = [];
  for (const name of names) {
    const result = await processOne(name);
    results.push(result);
    console.log(`  ${name} [${result.profile}] -> ${result.widths.join(', ')}px`);
  }

  await writeCredits(results);
  await writeBlurMap(results);
  console.log(`\nDone. Generated ${results.length * 2} variants + LQIP.`);
}

/**
 * Writes the image manifest: for every file its LQIP, the widths that were
 * actually generated and the crop aspect ratio.
 *
 * The Picture component builds its srcset exclusively from this map, which
 * means it can never ask for a variant that is not on disk - and that kind of
 * mistake only shows up as a 404 in the browser, not at build time.
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
  console.log(`  -> src/lib/image-manifest.json (${results.length} entries)`);
}

/** Writes the author list - the Unsplash licence does not require it, but it is the decent thing to do. */
async function writeCredits(results) {
  const byFile = new Map(SOURCES.map((s) => [s.file, s]));
  const rows = results
    .map((r) => byFile.get(r.name))
    .filter(Boolean)
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((s) => `| \`${s.file}\` | ${s.author} | [unsplash.com/photos/${s.id}](https://unsplash.com/photos/${s.id}) |`);

  const content = `# Photo credits

All photographs come from [Unsplash](https://unsplash.com) and are covered by
the [Unsplash licence](https://unsplash.com/license): they may be used free of
charge, including commercially, without asking for permission and without
mandatory attribution. The list below is a voluntary thank-you to the authors.

The files in this directory are derivatives (cropping, resizing, conversion to
AVIF/WebP) generated by \`scripts/optimize-images.mjs\`.

| File | Author | Source |
| --- | --- | --- |
${rows.join('\n')}

Everything that is not a photograph - the brand mark and the Open Graph card
generated by \`scripts/generate-brand-assets.mjs\` - is original vector artwork
created for this project.
`;

  await writeFile(path.join(OUT_DIR, 'CREDITS.md'), content, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
