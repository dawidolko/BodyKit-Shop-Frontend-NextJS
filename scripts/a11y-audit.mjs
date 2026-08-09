/**
 * Audyt dostepnosci: uruchamia axe-core na kazdej podstronie w obu motywach.
 *
 * Wymaga dzialajacego serwera ze statycznym eksportem:
 *   npm run build && npx serve out -l 4321
 *   node scripts/a11y-audit.mjs
 *
 * Adres mozna nadpisac zmienna AUDIT_URL.
 * Kod wyjscia rozny od zera oznacza wykryte naruszenia - dzieki temu
 * krok w CI zatrzymuje sie na regresji dostepnosci.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE_URL = process.env.AUDIT_URL ?? 'http://localhost:4321';

const ROUTES = [
  '/',
  '/kategorie/',
  '/kategorie/splittery/',
  '/kategorie/karbon/',
  '/produkty/splitter-przedni-street-gt/',
  '/produkty/felgi-forged-rs01-19/',
  '/pakiety/',
  '/o-nas/',
  '/dla-firm/',
  '/pomoc/',
  '/kontakt/',
  '/konto/',
  '/koszyk/',
  '/szukaj/',
  '/regulamin/',
  '/style-guide/',
  '/zamowienie/',
  '/zamowienie/dziekujemy/',
  // Adres nieistniejacy - sprawdza strone 404.
  '/tej-strony-nie-ma/',
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
      // Chwila na ustabilizowanie sie interfejsu po hydracji.
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

  console.log(`Sprawdzono ${checks} kombinacji strona/motyw (${ROUTES.length} tras x 2).`);

  if (findings.size === 0) {
    console.log('Brak naruszen WCAG.');
    return;
  }

  console.log(`\nZnaleziono ${findings.size} typow naruszen:\n`);
  const sorted = [...findings.values()].sort((a, b) => b.occurrences - a.occurrences);

  for (const violation of sorted) {
    console.log(`[${violation.impact}] ${violation.id} - ${violation.occurrences}x`);
    console.log(`  ${violation.help}`);
    console.log(`  Dokumentacja: ${violation.helpUrl}`);
    console.log(`  Strony: ${[...violation.routes].join(', ')}`);
    const first = violation.nodes[0];
    if (first) {
      console.log(`  Przyklad: ${first.html.slice(0, 160)}`);
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
