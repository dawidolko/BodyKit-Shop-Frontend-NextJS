'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import { FilterIcon } from '@/components/ui/Icon';
import type { Material, Product } from '@/lib/types';
import { cn, formatPrice, materialLabels, plural } from '@/lib/utils';

type SortKey = 'polecane' | 'cena-rosnaco' | 'cena-malejaco' | 'ocena' | 'nazwa';

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'polecane', label: 'Polecane' },
  { value: 'cena-rosnaco', label: 'Cena: od najniższej' },
  { value: 'cena-malejaco', label: 'Cena: od najwyższej' },
  { value: 'ocena', label: 'Najwyżej oceniane' },
  { value: 'nazwa', label: 'Nazwa A-Z' },
];

/**
 * Listing produktow z filtrami materialu, marki i dostepnosci.
 *
 * Filtrowanie dzieje sie w pamieci - katalog jest statyczny i niewielki,
 * wiec nie ma potrzeby siegac po adres URL ani zapytania sieciowe.
 * Liczba wynikow jest ogloszana przez aria-live, zeby zmiana byla slyszalna
 * dla osob korzystajacych z czytnika ekranu.
 */
export function ProductFilters({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>('polecane');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

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
      case 'cena-rosnaco':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'cena-malejaco':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'ocena':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'nazwa':
        result.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
        break;
      case 'polecane':
        result.sort((a, b) => b.badges.length - a.badges.length || b.rating - a.rating);
        break;
    }
    return result;
  }, [products, materials, makes, inStockOnly, sort]);

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
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Filtry */}
      <div>
        <div className="flex items-center justify-between lg:hidden">
          <Button
            variant="secondary"
            onClick={() => setPanelOpen((open) => !open)}
            aria-expanded={panelOpen}
            aria-controls="filter-panel"
          >
            <FilterIcon className="size-4" />
            Filtry
            {activeCount > 0 && (
              <span className="ml-1 rounded-full bg-accent px-1.5 text-[0.6875rem] text-text-on-brand">
                {activeCount}
              </span>
            )}
          </Button>
        </div>

        <div
          id="filter-panel"
          className={cn('mt-4 flex-col gap-7 lg:mt-0 lg:flex', panelOpen ? 'flex' : 'hidden')}
        >
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Materiał
            </legend>
            <div className="mt-3 flex flex-col gap-2.5">
              {availableMaterials.map((material) => (
                <label key={material} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={materials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="size-4.5 rounded-xs accent-accent focus-ring"
                  />
                  <span className="text-text-secondary">{materialLabels[material]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Marka auta
            </legend>
            <div className="mt-3 flex flex-col gap-2.5">
              {availableMakes.map((make) => (
                <label key={make} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={makes.includes(make)}
                    onChange={() => toggleMake(make)}
                    className="size-4.5 rounded-xs accent-accent focus-ring"
                  />
                  <span className="text-text-secondary">{make}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Dostępność
            </legend>
            <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="size-4.5 rounded-xs accent-accent focus-ring"
              />
              <span className="text-text-secondary">Tylko dostępne od ręki</span>
            </label>
          </fieldset>

          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={reset} className="self-start">
              Wyczyść filtry ({activeCount})
            </Button>
          )}
        </div>
      </div>

      {/* Wyniki */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
          <p aria-live="polite" className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{filtered.length}</span>{' '}
            {plural(filtered.length, 'produkt', 'produkty', 'produktów')}
            {priceRange && (
              <span className="text-text-muted">
                {' '}
                · {formatPrice(priceRange.min)} – {formatPrice(priceRange.max)}
              </span>
            )}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-text-muted">
              Sortuj:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-9 rounded-sm border border-border-default bg-surface px-3 text-sm text-text-primary focus-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product, index) => (
              <li key={product.slug} className="flex">
                <ProductCard product={product} priority={index < 3} className="w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-md border border-dashed border-border-default p-10 text-center">
            <p className="text-base font-semibold text-text-primary">
              Żaden produkt nie pasuje do wybranych filtrów
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Spróbuj usunąć część kryteriów albo zajrzyj do innej kategorii.
            </p>
            <Button variant="secondary" onClick={reset} className="mt-5">
              Wyczyść filtry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
