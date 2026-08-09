<div align="center">

<img src="public/favicon.svg" alt="" width="72" height="72" />

# BodyKit Shop

**A front-end shop for car body kits and styling parts.**

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · bilingual · static export

[Live demo](https://bodykit.dawidolko.pl/) ·
[Design system](https://bodykit.dawidolko.pl/en/style-guide/) ·
[Docker](#running-with-docker)

</div>

---

## About

BodyKit Shop is a complete front-end store selling body modification parts:
front splitters, spoilers, diffusers, wheels and carbon fibre components. There
is no backend — the whole thing compiles to static HTML that can be hosted on
GitHub Pages, any CDN, or behind nginx in a container.

Cart state lives in `localStorage`, the catalog is compiled into the bundle, and
every page is generated at build time in both languages.

### What is inside

| Area              | Implementation                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Languages**     | English and Polish, each with its own URL prefix, `hreflang` pairs and a switcher that keeps you on the same page      |
| **Pages**         | 17 routes × 8 categories × 19 products, generated statically per locale                                                |
| **Themes**        | Light and dark, with a toggle, persisted choice and system preference detection                                        |
| **Accessibility** | WCAG 2.2 AA — zero axe-core violations across every route in both locales and both themes                              |
| **SEO**           | Per-page metadata, `sitemap.xml` with language alternates, `robots.txt`, JSON-LD (Store, Product, FAQ, BreadcrumbList) |
| **Images**        | AVIF + WebP at three widths, LQIP placeholders, `srcset` driven by a build-time manifest                               |
| **Performance**   | Self-hosted fonts, no third-party requests, a 1920 px hero at 112 kB in AVIF                                           |
| **Quality**       | TypeScript `strict`, ESLint, Prettier, accessibility audit in CI                                                       |

---

## Quick start

Requires **Node.js 20.9+** (22 recommended) and npm.

```bash
npm install
npm run dev
```

The app starts at [http://localhost:3000](http://localhost:3000) and redirects
to `/en/`.

Production build:

```bash
npm run build     # static export into out/
npm run serve     # preview the built output on :3000
```

---

## Internationalisation

Every page lives under a locale segment: `/en/products/gt-wing-1400/` and
`/pl/products/gt-wing-1400/`. English is the default.

**Why separate paths rather than a client-side toggle.** A static export has no
server to negotiate languages, so a runtime switch would leave search engines
seeing a single language and would flash the wrong copy on first paint.
Prefixed routes give each language a real, indexable URL, work without
JavaScript, and let `hreflang` pair the two versions properly.

**URL slugs stay English in both languages.** `/pl/products/carbon-mirror-caps/`
rather than `/pl/produkty/nakladki-lusterek/`. One set of slugs means links,
`generateStaticParams` and the language switcher never need a translation
table — swapping the locale segment is enough to land on the same page.

### Where the strings live

```
src/i18n/
├── config.ts               # locales, localePath(), switchLocaleInPath()
├── index.ts                # getDictionary()
└── dictionaries/
    ├── en.ts               # source of truth; its shape defines the contract
    └── pl.ts               # typed against en.ts
```

`pl.ts` is typed as `Dictionary`, a widened version of the English object. Add a
key to `en.ts` and the Polish file fails to compile until it catches up — a
missing translation is a build error, not a silent English fallback.

Product and category content is bilingual in the data layer itself: text fields
are `Localized<T>` (`{ en, pl }`) and are read through `t(field, locale)`.

Plural rules that Polish needs and English does not are handled inside the
dictionary, as functions: `dict.product.reviews(3)` returns `3 reviews` or
`3 opinie` depending on the locale.

### Adding a language

1. Add the code to `locales` in `src/i18n/config.ts` and fill in `localeNames`,
   `localeTags`, `ogLocales`.
2. Create `src/i18n/dictionaries/<code>.ts` typed as `Dictionary`.
3. Add the language key to every `Localized` field in `categories.ts` and
   `products.ts`.

TypeScript will point at each spot that still needs attention.

---

## Project structure

```
.
├── .github/workflows/     # Pages deployment + quality checks
├── .tools/docker/         # Dockerfile, compose, nginx configuration
├── public/
│   ├── images/            # AVIF/WebP variants + CREDITS.md
│   └── CNAME, favicon.svg, og-default.png, site.webmanifest
├── scripts/
│   ├── fetch-images.mjs           # downloads photo sources from Unsplash
│   ├── optimize-images.mjs        # crops, converts, writes the manifest
│   ├── generate-brand-assets.mjs  # favicons and the Open Graph card
│   └── a11y-audit.mjs             # axe-core audit across both locales
└── src/
    ├── app/
    │   ├── page.tsx       # language redirect stub at the root
    │   └── [locale]/      # every real route
    ├── components/
    │   ├── brand/         # logo
    │   ├── layout/        # header, footer, theme and language switchers
    │   ├── product/       # card, gallery, filters, add-to-cart
    │   ├── seo/           # structured data
    │   └── ui/            # buttons, fields, badges, icons, images
    ├── i18n/              # locale config and dictionaries
    └── lib/               # catalog, types, cart state, helpers
```

---

## Design system

The visual direction is **carbon plus electric orange**: a dark technical base
with a single strong accent, tight radii (2–10 px) and condensed display type.

### Colour

| Role           | Light                               | Dark                 |
| -------------- | ----------------------------------- | -------------------- |
| Primary text   | `carbon-900` — 16.8:1               | `carbon-50` — 17.6:1 |
| Secondary text | `carbon-600` — 7.2:1                | `carbon-300` — 9.2:1 |
| Muted text     | `carbon-500` — 5.1:1                | `carbon-400` — 5.6:1 |
| Link / accent  | `brand-700` — 5.5:1                 | `brand-400` — 6.9:1  |
| Text on accent | `carbon-950` on `brand-500` — 6.6:1 | same pair            |

One decision worth explaining: **brand surfaces use dark ink, not white.** White
on `brand-500` measures 2.8:1, which fails even the large-text threshold. Dark
carbon on the same orange reaches 6.6:1 — and reads sharper.

Every value was computed and then confirmed by an axe-core scan.

### Typography

Barlow for body text, Barlow Condensed for headings, both self-hosted through
`next/font` — no requests to Google and no layout shift while fonts load.

Full token and component documentation: [`/en/style-guide`](https://bodykit.dawidolko.pl/en/style-guide/).

---

## Accessibility

The project passes an axe-core audit (WCAG 2.2 A/AA plus best practices) with
**zero violations** across every route, in both locales and both themes.

```bash
npm run build
npx serve out -l 4321 &
npm run audit:a11y
```

What that covers in practice:

- **Contrast** — every text/background pair at 4.5:1 or better, UI elements at 3:1, in both themes.
- **Focus** — one shared `.focus-ring` class, a 2 px ring with a 2 px offset, shown only for `:focus-visible`.
- **Keyboard** — skip link, `Escape` closes panels and restores focus, disclosures expose `aria-expanded`.
- **Forms** — labels bound to controls, errors announced through `role="alert"`, and a failed submit moves focus to a summary that links to each broken field.
- **Language** — `<html lang>` matches the rendered locale, and `hreflang` links pair the two versions.
- **Motion** — `prefers-reduced-motion` collapses every animation to 0.01 ms.
- **High contrast** — `prefers-contrast: more` strengthens borders and muted text.
- **Structure** — one `h1` per page and no skipped heading levels (`ProductCard` takes its level from context).

---

## Images

Photographs come from [Unsplash](https://unsplash.com) under a licence that
permits commercial use. Credits: [`public/images/CREDITS.md`](public/images/CREDITS.md).

```bash
npm run images:fetch      # downloads sources into .image-cache/ (git-ignored)
npm run images:optimize   # crops, converts and writes the manifest
```

Cropping uses sharp's `attention` strategy, which picks the most salient region
instead of a blind centre crop — it matters because several sources are portrait
while the layout needs panoramas. The script emits AVIF and WebP at three widths,
an LQIP placeholder, and `src/lib/image-manifest.json`.

The `Picture` component reads only from that manifest, so a `srcset` can never
point at a variant that is missing from disk — a mistake that would otherwise
surface as a 404 in the browser rather than at build time.

---

## Running with Docker

The image is multi-stage: Node builds the static export, nginx serves it. The
final layer contains neither Node nor any dependencies.

```bash
# Production on http://localhost:8080
npm run docker:up

# or without compose
docker build -f .tools/docker/Dockerfile -t bodykit-shop .
docker run -p 8080:8080 bodykit-shop

# Development with hot reload on http://localhost:3000
docker compose -f .tools/docker/docker-compose.yml --profile dev up
```

The container runs as an unprivileged user with a read-only filesystem and
sends a full set of security headers (CSP, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

> **A note on nginx:** the security headers live in a snippet that is included
> in every `location` block. That is not decoration — nginx only inherits
> `add_header` into blocks that declare none of their own, so a single
> `add_header` inside a `location` silently drops every server-level header.

---

## Deploying to GitHub Pages

The site runs on a custom domain: **[bodykit.dawidolko.pl](https://bodykit.dawidolko.pl/)**.

### GitHub configuration

1. **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain**: `bodykit.dawidolko.pl`, then tick **Enforce HTTPS**.

[`public/CNAME`](public/CNAME) is copied into the build output, so the domain
setting survives every deployment. The workflow verifies the file is present and
fails the build if it is missing.

### DNS

Add this record for `dawidolko.pl`:

| Type    | Name      | Value                  |
| ------- | --------- | ---------------------- |
| `CNAME` | `bodykit` | `dawidolko.github.io.` |

Propagation usually takes a few minutes. "Enforce HTTPS" stays greyed out until
the certificate is issued.

### Builds

Every push to `main` builds and deploys. Because the site is served from the
root of a custom domain, `basePath` stays empty. The workflow also writes
`.nojekyll`, without which Pages would hide the `_next` directory.

Reproducing the production build locally:

```bash
NEXT_PUBLIC_SITE_URL=https://bodykit.dawidolko.pl npm run build
```

If you ever drop the custom domain and go back to `<user>.github.io/<repo>`,
set `NEXT_PUBLIC_BASE_PATH` to `/<repository-name>` in `deploy.yml` and delete
`public/CNAME`.

A second workflow (`quality.yml`) checks types, linting and formatting, runs the
accessibility audit, and verifies that the Docker image builds and serves its
routes and headers correctly.

---

## Available scripts

| Command                             | Purpose                                 |
| ----------------------------------- | --------------------------------------- |
| `npm run dev`                       | Development server                      |
| `npm run build`                     | Static export into `out/`               |
| `npm run serve`                     | Preview the built output                |
| `npm run verify`                    | Types + lint + format + build           |
| `npm run typecheck`                 | TypeScript only                         |
| `npm run lint` / `lint:fix`         | ESLint                                  |
| `npm run format` / `format:check`   | Prettier                                |
| `npm run audit:a11y`                | axe-core audit (needs a running server) |
| `npm run images:fetch`              | Download photo sources                  |
| `npm run images:optimize`           | Optimize images and write the manifest  |
| `npm run brand:assets`              | Favicons and Open Graph card            |
| `npm run docker:up` / `docker:down` | Docker Compose                          |

---

## Notes

This is a **demonstration project**. Orders are not fulfilled, no payments are
taken, and no form sends data anywhere — validation runs in full, but the result
stays in the browser. The terms and privacy policy were written for a mock-up
and are not a contractual template.

The catalog, technical descriptions and company details are fictional.

---

## Licence

[MIT](LICENSE)
