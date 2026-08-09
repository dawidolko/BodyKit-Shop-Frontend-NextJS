<div align="center">

<img src="public/favicon.svg" alt="" width="72" height="72" />

# BodyKit Shop

**Frontendowy sklep z dokładkami i częściami do tuningu karoserii.**

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · statyczny eksport

[Demo](https://bodykit.dawidolko.pl/) ·
[Design system](https://bodykit.dawidolko.pl/style-guide/) ·
[Docker](#uruchomienie-w-dockerze)

</div>

---

## O projekcie

BodyKit Shop to kompletny, w pełni frontendowy sklep internetowy z częściami do
modyfikacji nadwozia: splitterami, spoilerami, dyfuzorami, felgami i elementami
karbonowymi. Aplikacja nie ma backendu — całość kompiluje się do statycznych
plików HTML, które można postawić na GitHub Pages, dowolnym CDN-ie albo za nginxem
w kontenerze.

Stan koszyka żyje w `localStorage`, katalog jest wbudowany w kod, a wszystkie
podstrony są generowane w czasie budowania.

### Co jest w środku

| Obszar         | Realizacja                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Strony**     | 17 tras + 8 kategorii + 19 produktów generowanych statycznie                                    |
| **Motywy**     | Jasny i ciemny z przełącznikiem, zapisem wyboru i wykrywaniem ustawień systemu                  |
| **Dostępność** | WCAG 2.2 AA — 0 naruszeń axe-core na 19 trasach × 2 motywy                                      |
| **SEO**        | Metadane per strona, `sitemap.xml`, `robots.txt`, JSON-LD (Store, Product, FAQ, BreadcrumbList) |
| **Obrazy**     | AVIF + WebP w trzech szerokościach, placeholdery LQIP, `srcset` z manifestu                     |
| **Wydajność**  | Fonty lokalne, zero zewnętrznych zapytań, hero 1920 px w AVIF waży 112 kB                       |
| **Jakość**     | TypeScript `strict`, ESLint, Prettier, audyt dostępności w CI                                   |

---

## Szybki start

Wymagania: **Node.js 20.9+** (zalecane 22) i npm.

```bash
npm install
npm run dev
```

Aplikacja ruszy na [http://localhost:3000](http://localhost:3000).

Budowanie wersji produkcyjnej:

```bash
npm run build     # statyczny eksport do out/
npm run serve     # podgląd zbudowanej wersji na :3000
```

---

## Struktura projektu

```
.
├── .github/workflows/     # deploy na Pages + kontrola jakości
├── .tools/docker/         # Dockerfile, compose, konfiguracja nginx
├── public/
│   ├── images/            # warianty AVIF/WebP + CREDITS.md
│   └── favicon.svg, og-default.png, site.webmanifest
├── scripts/
│   ├── fetch-images.mjs        # pobiera źródła zdjęć z Unsplash
│   ├── optimize-images.mjs     # kadruje, konwertuje, buduje manifest
│   ├── generate-brand-assets.mjs  # favicony i karta Open Graph
│   └── a11y-audit.mjs          # audyt axe-core
└── src/
    ├── app/               # trasy (App Router)
    ├── components/
    │   ├── brand/         # logo
    │   ├── layout/        # nagłówek, stopka, przełącznik motywu
    │   ├── product/       # karta, galeria, filtry, koszyk
    │   ├── seo/           # dane strukturalne
    │   └── ui/            # przyciski, pola, plakietki, ikony, obrazy
    └── lib/               # katalog, typy, stan koszyka, narzędzia
```

---

## Design system

Kierunek wizualny: **carbon + elektryczny pomarańcz**. Ciemna, techniczna baza
z jednym mocnym akcentem, ostre promienie (2–10 px) i kondensowana typografia
nagłówkowa.

### Kolory

| Rola                | Jasny                               | Ciemny               |
| ------------------- | ----------------------------------- | -------------------- |
| Tekst główny        | `carbon-900` — 16.8:1               | `carbon-50` — 17.6:1 |
| Tekst uzupełniający | `carbon-600` — 7.2:1                | `carbon-300` — 9.2:1 |
| Tekst przygaszony   | `carbon-500` — 5.1:1                | `carbon-400` — 5.6:1 |
| Link / akcent       | `brand-700` — 5.5:1                 | `brand-400` — 6.9:1  |
| Tekst na akcencie   | `carbon-950` na `brand-500` — 6.6:1 | ta sama para         |

Jedna decyzja warta wyjaśnienia: **na pomarańczowym tle używamy ciemnego
atramentu, nie bieli**. Biały tekst na `brand-500` daje tylko 2.8:1, co nie
przechodzi nawet dla dużego tekstu. Ciemny carbon na tym samym tle daje 6.6:1
i przy okazji wygląda ostrzej.

Wszystkie wartości zweryfikowano obliczeniowo i potwierdzono skanem axe-core.

### Typografia

Barlow (tekst) i Barlow Condensed (nagłówki), ładowane lokalnie przez
`next/font` — bez zapytań do Google i bez przeskoku typografii przy wczytywaniu.

Pełna dokumentacja tokenów, komponentów i zasad dostępności:
[`/style-guide`](https://bodykit.dawidolko.pl/style-guide/).

---

## Dostępność

Projekt przechodzi audyt axe-core (WCAG 2.2 A/AA + best practices) **bez ani
jednego naruszenia** na 19 trasach w obu motywach.

```bash
npm run build
npx serve out -l 4321 &
npm run audit:a11y
```

Co konkretnie zostało zrobione:

- **Kontrast** — każda para tekst/tło ≥ 4.5:1, elementy interfejsu ≥ 3:1, w obu motywach.
- **Fokus** — wspólna klasa `.focus-ring`, pierścień 2 px z odstępem, tylko dla `:focus-visible`.
- **Klawiatura** — link pomijający nawigację, `Escape` zamyka panele i przywraca fokus, `aria-expanded` na przełącznikach.
- **Formularze** — etykiety powiązane z polami, błędy z `role="alert"`, po nieudanej wysyłce fokus wędruje na podsumowanie błędów z linkami do konkretnych pól.
- **Ruch** — `prefers-reduced-motion` skraca wszystkie animacje do 0.01 ms.
- **Kontrast systemowy** — `prefers-contrast: more` wzmacnia obramowania i przygaszony tekst.
- **Struktura** — jeden `h1` na stronę, poziomy nagłówków bez przeskoków (karta produktu przyjmuje poziom przez `headingLevel`).

---

## Obrazy

Zdjęcia pochodzą z [Unsplash](https://unsplash.com) i są objęte licencją
pozwalającą na użycie komercyjne. Lista autorów: [`public/images/CREDITS.md`](public/images/CREDITS.md).

```bash
npm run images:fetch      # pobiera źródła do .image-cache/ (poza repozytorium)
npm run images:optimize   # kadruje, konwertuje i generuje manifest
```

Skrypt optymalizacji kadruje z użyciem strategii `attention` (sharp wybiera
najbardziej wyrazisty fragment, co ma znaczenie przy pionowych źródłach),
produkuje AVIF i WebP w trzech szerokościach, zapisuje placeholder LQIP
i buduje `src/lib/image-manifest.json`.

Komponent `Picture` czyta wyłącznie z tego manifestu — dzięki temu `srcset`
nie może wskazać wariantu, którego nie ma na dysku.

---

## Uruchomienie w Dockerze

Obraz jest wieloetapowy: Node buduje statyczny eksport, nginx go serwuje.
Warstwa końcowa nie zawiera Node'a ani zależności.

```bash
# Produkcja na http://localhost:8080
npm run docker:up

# albo bez compose
docker build -f .tools/docker/Dockerfile -t bodykit-shop .
docker run -p 8080:8080 bodykit-shop

# Tryb deweloperski z przeładowaniem na http://localhost:3000
docker compose -f .tools/docker/docker-compose.yml --profile dev up
```

Kontener działa jako użytkownik nieuprzywilejowany, z systemem plików tylko do
odczytu, i wysyła komplet nagłówków bezpieczeństwa (CSP, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

> **Uwaga o nginx:** nagłówki bezpieczeństwa siedzą w osobnym snippecie
> dołączanym w każdym bloku `location`. To nie jest ozdobnik — `add_header`
> z poziomu `server` przestaje działać w momencie, gdy blok `location`
> zdefiniuje własny nagłówek.

---

## Wdrożenie na GitHub Pages

Serwis działa pod własną domeną **[bodykit.dawidolko.pl](https://bodykit.dawidolko.pl/)**.

### Konfiguracja po stronie GitHuba

1. **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain**: `bodykit.dawidolko.pl`, następnie zaznacz **Enforce HTTPS**.

Plik [`public/CNAME`](public/CNAME) trafia do wyniku budowania, więc ustawienie
domeny przetrwa każde kolejne wdrożenie. Workflow sprawdza jego obecność
i przerywa, jeśli go zabraknie.

### Konfiguracja DNS

W panelu domeny `dawidolko.pl` dodaj rekord:

| Typ     | Nazwa     | Wartość                |
| ------- | --------- | ---------------------- |
| `CNAME` | `bodykit` | `dawidolko.github.io.` |

Propagacja zwykle trwa kilkanaście minut. Do czasu wydania certyfikatu opcja
„Enforce HTTPS" może być niedostępna — pojawi się sama.

### Budowanie

Każdy push na `main` uruchamia budowanie i wdrożenie. Ponieważ serwis stoi
w korzeniu domeny, `basePath` pozostaje pusty. Workflow dokłada plik
`.nojekyll`, bez którego Pages ukryłoby katalog `_next`.

Odtworzenie buildu produkcyjnego lokalnie:

```bash
NEXT_PUBLIC_SITE_URL=https://bodykit.dawidolko.pl npm run build
```

Gdybyś kiedyś zrezygnował z własnej domeny i wrócił na
`<user>.github.io/<repo>`, ustaw w `deploy.yml` zmienną
`NEXT_PUBLIC_BASE_PATH` na `/<nazwa-repozytorium>` i usuń `public/CNAME`.

Drugi workflow (`quality.yml`) sprawdza typy, lint, formatowanie, uruchamia
audyt dostępności i weryfikuje, że obraz Dockera buduje się i poprawnie serwuje
trasy oraz nagłówki.

---

## Dostępne polecenia

| Polecenie                           | Opis                                         |
| ----------------------------------- | -------------------------------------------- |
| `npm run dev`                       | Serwer deweloperski                          |
| `npm run build`                     | Statyczny eksport do `out/`                  |
| `npm run serve`                     | Podgląd zbudowanej wersji                    |
| `npm run verify`                    | Typy + lint + format + build                 |
| `npm run typecheck`                 | Sprawdzenie typów                            |
| `npm run lint` / `lint:fix`         | ESLint                                       |
| `npm run format` / `format:check`   | Prettier                                     |
| `npm run audit:a11y`                | Audyt axe-core (wymaga działającego serwera) |
| `npm run images:fetch`              | Pobranie źródeł zdjęć                        |
| `npm run images:optimize`           | Optymalizacja i manifest obrazów             |
| `npm run brand:assets`              | Favicony i karta Open Graph                  |
| `npm run docker:up` / `docker:down` | Docker Compose                               |

---

## Uwagi

To jest **projekt demonstracyjny**. Zamówienia nie są realizowane, płatności nie
są pobierane, a formularze nie wysyłają danych na żaden serwer — walidacja działa
w pełni, ale wynik pozostaje w przeglądarce. Regulamin i polityka prywatności
zostały napisane na potrzeby makiety i nie stanowią wzorca umownego.

Katalog produktów, opisy techniczne i dane firmy są fikcyjne.

---

## Licencja

[MIT](LICENSE)
