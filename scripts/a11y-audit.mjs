/**
 * Accessibility audit: runs axe-core on every subpage in both themes.
 *
 * Requires a running server with the static export:
 *   npm run build && npx serve out -l 4321
 *   node scripts/a11y-audit.mjs
 *
 * The address can be overridden with the AUDIT_URL variable.
 * A non-zero exit code means violations were found - that is what makes the
 * CI step fail on an accessibility regression.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE_URL = process.env.AUDIT_URL ?? 'http://localhost:4321';

/** Path suffixes checked under every locale prefix. */
const PATHS = [
  '', // home
  '/categories',
  '/categories/front-splitters',
  '/categories/carbon-parts',
  '/products/street-gt-front-splitter',
  '/products/rs01-forged-wheels-19',
  '/packages',
  '/about',
  '/business',
  '/help',
  '/contact',
  '/account',
  '/cart',
  '/search',
  '/terms',
  '/style-guide',
  '/checkout',
  '/checkout/thank-you',
  // Deliberately missing address - exercises the 404 page.
  '/this-page-does-not-exist',
];

// The site is built with trailingSlash: true, so every URL must end with a
// slash. The bare root '/' is the language-redirect stub and is checked once.
const ROUTES = [
  '/',
  ...['en', 'pl'].flatMap((l) => PATHS.map((p) => '/' + l + p + (p.endsWith('/') ? '' : '/'))),
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

async function main() {
  const browser = await chromium.launch();
  const findings = new Map();
  let checks = 0;

  for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
      // A moment for the interface to settle down after hydration.
      await page.waitForTimeout(250);
      checks += 1;

      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

      for (const violation of results.violations) {
        const key = violation.id;
        if (!findings.has(key)) {
          findings.set(key, { ...violation, occurrences: 0, routes: new Set() });
        }
        const entry = findings.get(key);
        entry.occurrences += violation.nodes.length;
        entry.routes.add(`${colorScheme}:${route}`);
      }
    }

    await page.close();
    await context.close();
  }

  await browser.close();

  console.log(`Checked ${checks} page/theme combinations (${ROUTES.length} routes x 2).`);

  if (findings.size === 0) {
    console.log('No WCAG violations.');
    return;
  }

  console.log(`\nFound ${findings.size} violation types:\n`);
  const sorted = [...findings.values()].sort((a, b) => b.occurrences - a.occurrences);

  for (const violation of sorted) {
    console.log(`[${violation.impact}] ${violation.id} - ${violation.occurrences}x`);
    console.log(`  ${violation.help}`);
    console.log(`  Documentation: ${violation.helpUrl}`);
    console.log(`  Pages: ${[...violation.routes].join(', ')}`);
    const first = violation.nodes[0];
    if (first) {
      console.log(`  Example: ${first.html.slice(0, 160)}`);
      if (first.failureSummary) {
        console.log(`  ${first.failureSummary.replace(/\n/g, ' | ')}`);
      }
    }
    console.log();
  }

  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
