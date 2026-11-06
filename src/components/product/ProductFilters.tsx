'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import { FilterIcon } from '@/components/ui/Icon';
import { getPartNumber } from '@/lib/products';
import type { Material, Product } from '@/lib/types';
import { cn, formatPrice, getMinPriceLabel, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { localePath, localeTags, type Locale } from '@/i18n/config';

/** Sort keys are stable English identifiers - only the labels are translated. */
type SortKey = 'featured' | 'priceAsc' | 'priceDesc' | 'rating' | 'name';

const sortKeys: SortKey[] = ['featured', 'priceAsc', 'priceDesc', 'rating', 'name'];

type ViewKey = 'wall' | 'list';

/**
 * Product listing with material, make and availability filters, shown as an
 * image wall or as a parts list with one row per part.
 *
 * Filtering happens in memory - the catalog is static and small, so there is
 * no need to reach for the URL or network requests.
 * The result count is announced through aria-live, so the change is audible
 * for people using a screen reader.
 */
export function ProductFilters({ products, locale }: { products: Product[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const [sort, setSort] = useState<SortKey>('featured');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [view, setView] = useState<ViewKey>('wall');

  const availableMaterials = useMemo(() => {
    const set = new Set<Material>();
    products.forEach((product) => product.variants.forEach((variant) => set.add(variant.material)));
    return [...set].sort();
  }, [products]);

  const availableMakes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => product.fitment.forEach((fit) => set.add(fit.make)));
    return [...set].sort();
  }, [products]);

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      if (materials.length > 0) {
        const has = product.variants.some((variant) => materials.includes(variant.material));
        if (!has) return false;
      }
      if (makes.length > 0) {
        const has = product.fitment.some((fit) => makes.includes(fit.make));
        if (!has) return false;
      }
      if (inStockOnly && !product.variants.some((variant) => variant.inStock)) return false;
      return true;
    });

    result = [...result];
    switch (sort) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) =>
          t(a.name, locale).localeCompare(t(b.name, locale), localeTags[locale]),
        );
        break;
      case 'featured':
        result.sort((a, b) => b.badges.length - a.badges.length || b.rating - a.rating);
        break;
    }
    return result;
  }, [products, materials, makes, inStockOnly, sort, locale]);

  const activeCount = materials.length + makes.length + (inStockOnly ? 1 : 0);

  function toggleMaterial(material: Material) {
    setMaterials((current) =>
      current.includes(material)
        ? current.filter((item) => item !== material)
        : [...current, material],
    );
  }

  function toggleMake(make: string) {
    setMakes((current) =>
      current.includes(make) ? current.filter((item) => item !== make) : [...current, make],
    );
  }

  function reset() {
    setMaterials([]);
    setMakes([]);
    setInStockOnly(false);
  }

  const priceRange = useMemo(() => {
    if (filtered.length === 0) return null;
    const prices = filtered.map((product) => product.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [filtered]);

  return (
    <div>
      <div className="border-b-2 border-border-strong bg-surface">
        <div className="container-page py-3">
          <div className="lg:hidden">
            <Button
              variant="secondary"
              onClick={() => setPanelOpen((open) => !open)}
              aria-expanded={panelOpen}
              aria-controls="filter-panel"
              className="ml-1.5"
            >
              <FilterIcon className="size-4" />
              {dict.catalog.filters}
              {activeCount > 0 && <span className="type-data">({activeCount})</span>}
            </Button>
          </div>

          <div
            id="filter-panel"
            className={cn(
              'mt-3 flex-col gap-4 lg:mt-0 lg:flex lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-10',
              panelOpen ? 'flex' : 'hidden',
            )}
          >
            <fieldset>
              <legend className="text-sm font-bold text-text-primary">
                {dict.catalog.material}
              </legend>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {availableMaterials.map((material) => (
                  <label key={material} className="chip">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={materials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                    />
                    {dict.materials[material]}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-text-primary">
                {dict.catalog.carMake}
              </legend>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {availableMakes.map((make) => (
                  <label key={make} className="chip">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={makes.includes(make)}
                      onChange={() => toggleMake(make)}
                    />
                    {make}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-text-primary">
                {dict.catalog.availability}
              </legend>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <label className="chip">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={inStockOnly}
                    onChange={(event) => setInStockOnly(event.target.checked)}
                  />
                  {dict.catalog.inStockOnly}
                </label>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="min-h-9 text-sm font-semibold text-text-brand underline underline-offset-4 focus-ring"
                  >
                    {dict.catalog.clearFilters} ({activeCount})
                  </button>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <p aria-live="polite" className="text-sm text-text-secondary">
          <span className="font-bold text-text-primary">
            {dict.catalog.productCount(filtered.length)}
          </span>
          {priceRange && (
            <span className="text-text-muted">
              {' '}
              ({formatPrice(priceRange.min, locale)} – {formatPrice(priceRange.max, locale)})
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div role="group" aria-label={dict.catalog.viewLabel} className="flex">
            {(
              [
                ['wall', dict.catalog.viewWall],
                ['list', dict.catalog.viewList],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                onClick={() => setView(key)}
                className={cn(
                  'min-h-9 border border-border-default px-3 text-sm font-semibold transition-colors focus-ring',
                  key === 'list' && '-ml-px',
                  view === key
                    ? 'border-text-primary bg-text-primary text-bg-base'
                    : 'bg-surface text-text-secondary hover:text-text-primary',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-text-muted">
              {dict.catalog.sortBy}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-9 border border-border-default bg-surface px-3 text-sm text-text-primary focus-ring"
            >
              {sortKeys.map((key) => (
                <option key={key} value={key}>
                  {dict.catalog.sortOptions[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="container-page">
          <div className="border-2 border-dashed border-border-default p-10 text-center">
            <p className="text-base font-semibold text-text-primary">{dict.catalog.noResults}</p>
            <p className="mt-2 text-sm text-text-muted">{dict.catalog.noResultsHint}</p>
            <Button variant="secondary" onClick={reset} className="mt-5">
              {dict.catalog.clearFilters}
            </Button>
          </div>
        </div>
      )}

      {filtered.length > 0 && view === 'wall' && (
        <ul className="part-wall">
          {filtered.map((product, index) => (
            <li key={product.slug}>
              <ProductCard
                product={product}
                locale={locale}
                dict={dict}
                priority={index < 3}
                headingLevel={2}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      )}

      {filtered.length > 0 && view === 'list' && (
        <div className="container-page">
          <div
            className="overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label={dict.catalog.viewList}
          >
            <table className="w-full min-w-[40rem] border-collapse bg-surface text-sm">
              <caption className="sr-only">{dict.catalog.viewList}</caption>
              <thead>
                <tr className="border-b-2 border-border-strong text-left">
                  <th scope="col" className="px-3 py-2 font-bold">
                    {dict.product.partNumber}
                  </th>
                  <th scope="col" className="px-3 py-2 font-bold">
                    {dict.catalog.columnPart}
                  </th>
                  <th scope="col" className="px-3 py-2 font-bold">
                    {dict.product.fitsLabel}
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-bold">
                    {dict.catalog.columnPrice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.slug} className="border-b border-border-subtle">
                    <td className="type-data whitespace-nowrap px-3 py-2.5">
                      {getPartNumber(product)}
                    </td>
                    <td className="px-3 py-2.5">
                      <Link
                        href={localePath(locale, `/products/${product.slug}`)}
                        className="type-display text-text-primary underline-offset-4 hover:underline focus-ring"
                      >
                        {t(product.name, locale)}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-text-secondary">
                      {product.fitment.map((fit) => `${fit.make} ${fit.model}`).join(', ')}
                    </td>
                    <td className="type-display whitespace-nowrap px-3 py-2.5 text-right">
                      {getMinPriceLabel(product, locale, dict)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
