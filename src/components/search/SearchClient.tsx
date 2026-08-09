'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchIcon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { plural } from '@/lib/utils';

/**
 * Usuwa polskie znaki diakrytyczne, zeby "kola" znajdowalo "koła".
 * NFD rozklada litery na znak bazowy + znak diakrytyczny, ktory usuwamy
 * zakresem U+0300-U+036F. "ł" nie ma rozkladu, wiec podmieniamy je osobno.
 */
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
}

/** Odczyt frazy z adresu - zrodlo zewnetrzne wzgledem Reacta. */
function getQueryFromLocation(): string {
  return new URLSearchParams(window.location.search).get('q') ?? '';
}

/** Adres zmienia sie przy nawigacji wstecz/naprzod. */
function subscribeToLocation(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

/**
 * Wyszukiwarka po nazwie, opisie, kategorii i dopasowaniu do modelu auta.
 */
export function SearchClient() {
  // Fraza startowa pochodzi z adresu (?q=...). Przy static export parametry
  // zapytania nie sa znane w czasie budowania, wiec czytamy je dopiero
  // po hydracji - useSyncExternalStore robi to bez setState w efekcie.
  const initialQuery = useSyncExternalStore(subscribeToLocation, getQueryFromLocation, () => '');
  const [typed, setTyped] = useState<string | null>(null);

  // Dopoki uzytkownik nie zaczal pisac, pokazujemy fraze z adresu.
  const query = typed ?? initialQuery;
  const setQuery = setTyped;

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    if (needle.length < 2) return [];

    const terms = needle.split(/\s+/);

    return products
      .map((product) => {
        const category = categories.find((item) => item.slug === product.categorySlug);
        const haystack = normalize(
          [
            product.name,
            product.shortDescription,
            product.description,
            category?.name ?? '',
            ...product.fitment.map((fit) => `${fit.make} ${fit.model} ${fit.years}`),
            ...product.specs.map((spec) => `${spec.label} ${spec.value}`),
          ].join(' '),
        );

        // Punktacja: trafienie w nazwe wazy wiecej niz w opisie.
        const nameHaystack = normalize(product.name);
        let score = 0;
        for (const term of terms) {
          if (!haystack.includes(term)) return null;
          score += nameHaystack.includes(term) ? 10 : 1;
        }
        return { product, score };
      })
      .filter(
        (entry): entry is { product: (typeof products)[number]; score: number } => entry !== null,
      )
      .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
      .map((entry) => entry.product);
  }, [query]);

  const hasQuery = query.trim().length >= 2;

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="container-page pb-8"
      >
        <label htmlFor="search-input" className="sr-only">
          Szukaj produktów
        </label>
        <div className="relative max-w-2xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Wpisz nazwę części, markę lub model auta…"
            autoComplete="off"
            className="h-14 w-full rounded-sm border border-border-default bg-surface pl-12 pr-4 text-base text-text-primary placeholder:text-text-muted focus-visible:border-border-brand focus-ring"
          />
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Przykłady: <em>splitter BMW</em>, <em>karbon</em>, <em>GR86</em>, <em>dyfuzor</em>
        </p>
      </form>

      <div className="container-page pb-8">
        {hasQuery ? (
          <>
            <p
              aria-live="polite"
              className="border-b border-border-subtle pb-4 text-sm text-text-secondary"
            >
              <span className="font-semibold text-text-primary">{results.length}</span>{' '}
              {plural(results.length, 'wynik', 'wyniki', 'wyników')} dla „{query.trim()}”
            </p>

            {results.length > 0 ? (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product, index) => (
                  <li key={product.slug} className="flex">
                    <ProductCard product={product} priority={index < 4} className="w-full" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 rounded-md border border-dashed border-border-default p-10 text-center">
                <p className="text-base font-semibold text-text-primary">
                  Brak wyników dla „{query.trim()}”
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  Spróbuj ogólniejszej frazy albo przejrzyj katalog według kategorii.
                </p>
                <Button variant="secondary" onClick={() => setQuery('')} className="mt-5">
                  Wyczyść wyszukiwanie
                </Button>
              </div>
            )}
          </>
        ) : (
          <section aria-labelledby="browse-heading">
            <h2 id="browse-heading" className="text-lg font-bold uppercase tracking-wide">
              Przeglądaj według kategorii
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/kategorie/${category.slug}/`}
                    className="inline-flex items-center rounded-sm border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
