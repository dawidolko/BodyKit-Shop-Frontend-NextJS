/**
 * Generates the raster brand assets from a single SVG source:
 *   - favicon-96.png, apple-touch-icon.png, icon-192/512.png (PWA)
 *   - og-default.png (Open Graph 1200x630)
 *
 * Run with: node scripts/generate-brand-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const publicDir = path.join(root, 'public');

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="8" fill="#0f1115"/>
  <path d="M4 7h25l6.5 8.5L29 34H4V7Z" fill="#1a1d26"/>
  <path d="M29 7l6.5 8.5L29 34l-3.3-3.8 4.7-14.7L25.7 7H29Z" fill="#ff6b1a"/>
  <path d="M9.5 12.5h6.2c2.2 0 3.6 1.1 3.6 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.1-1.6 3.4-4.1 3.4H9.5V12.5Zm5.6 4.6c.9 0 1.5-.5 1.5-1.3s-.6-1.2-1.5-1.2h-2.9v2.5h2.9Zm.3 5c1 0 1.7-.5 1.7-1.4s-.7-1.4-1.7-1.4h-3.2v2.8h3.2Z" fill="#ff6b1a"/>
  <path d="M22.2 12.5h2.7v4.8l4.2-4.8h3.2l-4.6 5.2 4.8 6.5h-3.3l-3.4-4.7-.9 1v3.7h-2.7V12.5Z" fill="#f6f7f9"/>
</svg>`;

/** Open Graph card - dark, with a carbon grid and an orange accent. */
const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1115"/>
      <stop offset="100%" stop-color="#1a1d26"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6b1a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff6b1a" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#262a35" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.55"/>
  <rect x="0" y="0" width="620" height="630" fill="url(#glow)"/>
  <g transform="translate(96 150) scale(2.6)">
    <path d="M3 6h27l7 9-7 19H3V6Z" fill="#1a1d26"/>
    <path d="M30 6l7 9-7 19-3.5-4 5-15-5-9H30Z" fill="#ff6b1a"/>
    <path d="M9.5 12.5h6.2c2.2 0 3.6 1.1 3.6 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.1-1.6 3.4-4.1 3.4H9.5V12.5Zm5.6 4.6c.9 0 1.5-.5 1.5-1.3s-.6-1.2-1.5-1.2h-2.9v2.5h2.9Zm.3 5c1 0 1.7-.5 1.7-1.4s-.7-1.4-1.7-1.4h-3.2v2.8h3.2Z" fill="#ff6b1a"/>
    <path d="M22.2 12.5h2.7v4.8l4.2-4.8h3.2l-4.6 5.2 4.8 6.5h-3.3l-3.4-4.7-.9 1v3.7h-2.7V12.5Z" fill="#f6f7f9"/>
  </g>
  <text x="96" y="380" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="92" font-weight="800" fill="#f6f7f9" letter-spacing="-2">BODYKIT SHOP</text>
  <text x="96" y="440" font-family="Barlow, Arial, sans-serif" font-size="32" font-weight="500" fill="#aeb5c4">Body kits, spoilers and styling parts for your car</text>
  <rect x="96" y="486" width="150" height="6" fill="#ff6b1a"/>
</svg>`;

const PNG_TARGETS = [
  { name: 'favicon-96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function main() {
  await mkdir(publicDir, { recursive: true });

  const markBuffer = Buffer.from(MARK_SVG);
  for (const { name, size } of PNG_TARGETS) {
    await sharp(markBuffer, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, name));
    console.log(`  ${name} (${size}x${size})`);
  }

  await sharp(Buffer.from(OG_SVG), { density: 144 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og-default.png'));
  console.log('  og-default.png (1200x630)');

  // favicon.ico is emitted as a 32x32 PNG container - accepted by every
  // modern browser and it avoids pulling in a dependency for the ICO format.
  const ico32 = await sharp(markBuffer, { density: 384 }).resize(32, 32).png().toBuffer();
  await writeFile(path.join(publicDir, 'favicon.ico'), ico32);
  console.log('  favicon.ico (32x32)');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
