/**
 * Downloads scene photos (cars, workshop, body detail shots) from Unsplash and
 * stores them in .image-cache/. The sources are covered by the Unsplash
 * licence: they may be used commercially without permission and without
 * attribution - even so we record the authors in public/images/CREDITS.md,
 * because it is the decent thing to do.
 *
 * Run with:  npm run images:fetch
 * Then with: npm run images:optimize
 *
 * The script is idempotent - files that were already downloaded are skipped.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const CACHE_DIR = path.resolve('.image-cache');

/**
 * Each entry is one Unsplash photo: the photo id + author (for CREDITS)
 * + its role on the site. `w` matches the source width to the intended use.
 */
const SOURCES = [
  // --- Hero / sections ---
  { id: 'IKQVgYipevQ', file: 'hero-main', author: 'Al Yori', w: 2400, role: 'main hero' },
  { id: 'jU5kaHyBhq8', file: 'hero-garage', author: 'Toby Hall', w: 2000, role: 'workshop section' },
  { id: 'rOsbzK6j5pk', file: 'cta-banner', author: 'Axhad Mohamed', w: 2000, role: 'CTA banner' },
  { id: 'pip2LoO1H6w', file: 'about-workshop', author: 'Toby Hall', w: 2000, role: 'about us' },
  { id: 'qKcTUvKJTZ8', file: 'business-fleet', author: 'Robin WOEHL', w: 2000, role: 'B2B' },

  // --- Category tiles ---
  { id: '50cIn5ELxLo', file: 'cat-splittery', author: 'Lance Asper', w: 1200, role: 'splitters category' },
  { id: 'gQirfxwCeuw', file: 'cat-spoilery', author: 'Baptiste Regnier', w: 1200, role: 'spoilers category' },
  { id: 't_da1pys898', file: 'cat-dyfuzory', author: 'Ryno Marais', w: 1200, role: 'diffusers category' },
  { id: '_WIC1wfxlbY', file: 'cat-progi', author: 'Chris Stein', w: 1200, role: 'side skirts category' },
  { id: 'h82zfDTFUP0', file: 'cat-felgi', author: 'Mathias Reding', w: 1200, role: 'wheels category' },
  { id: 'nuF88iIQOu0', file: 'cat-wydechy', author: 'Bradikan', w: 1200, role: 'exhausts category' },
  { id: 'Z9jNN_F2PwU', file: 'cat-zawieszenie', author: 'Toby Hall', w: 1200, role: 'suspension category' },
  { id: 'Lwhd4wSjLxw', file: 'cat-karbon', author: 'Andres Grijalva', w: 1200, role: 'carbon category' },

  // --- Lifestyle shots for cards / product galleries ---
  { id: '-pSOAtdMVlk', file: 'shot-detail-1', author: 'Lance Asper', w: 1600, role: 'body detail' },
  { id: 'heBR6uL0RB4', file: 'shot-detail-2', author: 'Justin Reichelt', w: 1600, role: 'body detail' },
  { id: 'lawdYpKPhGE', file: 'shot-detail-3', author: 'Yihao Li', w: 1600, role: 'body detail' },
  { id: '4iYr6fQm_rs', file: 'shot-detail-4', author: 'Matheus Frazao', w: 1600, role: 'body detail' },
  { id: 'QGLFFH4hWW8', file: 'shot-detail-5', author: 'Puscas Adryan', w: 1600, role: 'body detail' },
  { id: 'YoBx_5o1PbM', file: 'shot-detail-6', author: 'Zachary Edmundson', w: 1600, role: 'body detail' },
  { id: 'FsBbavP9YA4', file: 'shot-wheel-1', author: 'Jakob Rosen', w: 1600, role: 'wheel detail' },
  { id: '_GpMW7GiJz0', file: 'shot-wheel-2', author: 'Semyon Borisov', w: 1600, role: 'wheel detail' },
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
    console.log(`  = ${entry.file}.jpg (already cached)`);
    return true;
  }

  // The /photo-<id> endpoint is not publicly available; we use
  // source.unsplash.com, which redirects to the CDN at the requested width.
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
      console.warn(`  ! ${entry.file}: suspiciously small file (${buffer.length} B)`);
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
  console.log(`Downloading ${SOURCES.length} photos into .image-cache/\n`);

  const results = [];
  for (const entry of SOURCES) {
    results.push({ entry, ok: await download(entry) });
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone: ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('Failed:', failed.map((f) => f.entry.file).join(', '));
    console.log('The optimization script will substitute generated backgrounds for the missing files.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { SOURCES };
