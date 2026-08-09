'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchIcon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/**
 * Strips Polish diacritics, so a query typed as "kola" still matches the
 * accented spelling in the catalog.
 * NFD decomposes letters into a base character plus a combining mark, which we
 * drop with the U+0300-U+036F range. The barred l (U+0142) has no
 * decomposition, so it is replaced separately.
 */
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
}

/** Reads the phrase from the URL - a source external to React. */
function getQueryFromLocation(): string {
  return new URLSearchParams(window.location.search).get('q') ?? '';
}

/** The URL changes on back/forward navigation. */
function subscribeToLocation(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

/**
 * Search across name, description, category and car model fitment.
 */
export function SearchClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  // The initial phrase comes from the URL (?q=...). With a static export the
  // query parameters are not known at build time, so we read them only after
  // hydration - useSyncExternalStore does that without a setState in an effect.
  const initialQuery = useSyncExternalStore(subscribeToLocation, getQueryFromLocation, () => '');
  const [typed, setTyped] = useState<string | null>(null);

  // Until the user starts typing, we show the phrase from the URL.
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
            t(product.name, locale),
            t(product.shortDescription, locale),
            t(product.description, locale),
            category ? t(category.name, locale) : '',
            ...product.fitment.map((fit) => `${fit.make} ${fit.model} ${fit.years}`),
            ...product.specs.map((spec) => `${t(spec.label, locale)} ${t(spec.value, locale)}`),
          ].join(' '),
        );

        // Scoring: a hit in the name weighs more than one in the description.
        const nameHaystack = normalize(t(product.name, locale));
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
  }, [query, locale]);

  const hasQuery = query.trim().length >= 2;

  return (
    <>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="container-page pb-8"
      >
        <label htmlFor="search-input" className="sr-only">
          {dict.search.label}
        </label>
        <div className="relative max-w-2xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.search.placeholder}
            autoComplete="off"
            className="h-14 w-full rounded-sm border border-border-default bg-surface pl-12 pr-4 text-base text-text-primary placeholder:text-text-muted focus-visible:border-border-brand focus-ring"
          />
        </div>
        <p className="mt-2 text-xs text-text-muted">
          {dict.search.examples}{' '}
          {dict.search.exampleTerms.map((term, index) => (
            <span key={term}>
              {index > 0 && ', '}
              <em>{term}</em>
            </span>
          ))}
        </p>
      </form>

      <div className="container-page pb-8">
        {hasQuery ? (
          <>
            <p
              aria-live="polite"
              className="border-b border-border-subtle pb-4 text-sm text-text-secondary"
            >
              <span className="font-semibold text-text-primary">
                {dict.search.results(results.length, query.trim())}
              </span>
            </p>

            {results.length > 0 ? (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product, index) => (
                  <li key={product.slug} className="flex">
                    <ProductCard
                      product={product}
                      locale={locale}
                      dict={dict}
                      priority={index < 4}
                      headingLevel={2}
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 rounded-md border border-dashed border-border-default p-10 text-center">
                <p className="text-base font-semibold text-text-primary">
                  {dict.search.noResults(query.trim())}
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  {dict.search.noResultsHint}
                </p>
                <Button variant="secondary" onClick={() => setQuery('')} className="mt-5">
                  {dict.search.clear}
                </Button>
              </div>
            )}
          </>
        ) : (
          <section aria-labelledby="browse-heading">
            <h2 id="browse-heading" className="text-lg font-bold uppercase tracking-wide">
              {dict.search.browseByCategory}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={localePath(locale, `/categories/${category.slug}`)}
                    className="inline-flex items-center rounded-sm border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
                  >
                    {t(category.name, locale)}
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
