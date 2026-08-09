import { chromium } from 'playwright';
const b = await chromium.launch();

// Scenario A: user types a bad URL directly (the normal way to hit a 404)
{
  const ctx = await b.newContext(); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0,90)));
  await p.goto('http://localhost:4321/en/typo-here/', {waitUntil:'networkidle'});
  await p.waitForTimeout(800);
  console.log('A. direct bad URL        :', errs.length ? errs[0] : 'ok');
  console.log('   404 content rendered  :', (await p.locator('h1').first().textContent())?.trim());
  await ctx.close();
}
// Scenario B: user follows a link, then hits back/forward
{
  const ctx = await b.newContext(); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0,90)));
  await p.goto('http://localhost:4321/en/', {waitUntil:'networkidle'});
  await p.getByRole('link', {name:'Browse the catalog'}).click();
  await p.waitForTimeout(700);
  await p.goBack({waitUntil:'networkidle'}); await p.waitForTimeout(500);
  await p.goForward({waitUntil:'networkidle'}); await p.waitForTimeout(500);
  console.log('B. link + back/forward   :', errs.length ? errs[0] : 'ok');
  await ctx.close();
}
await b.close();
