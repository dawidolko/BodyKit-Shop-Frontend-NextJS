import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({...devices['Galaxy S9+']});
const p = await ctx.newPage();
await p.goto('http://localhost:4321/',{waitUntil:'networkidle'});
const culprits = await p.evaluate(()=>{
  const vw = document.documentElement.clientWidth;
  const out=[];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1 || r.right > vw + 1) {
      out.push({tag:el.tagName, cls:(el.className?.toString?.()||'').slice(0,90), w:Math.round(r.width), right:Math.round(r.right)});
    }
  }
  return {vw, out: out.slice(0,8)};
});
console.log('viewport:', culprits.vw);
culprits.out.forEach(c=>console.log(` ${c.tag} w=${c.w} right=${c.right} :: ${c.cls}`));
await b.close();
