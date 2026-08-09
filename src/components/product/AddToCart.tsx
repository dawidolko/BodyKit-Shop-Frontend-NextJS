'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icon';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';
import { cn, finishLabels, formatPrice, materialLabels } from '@/lib/utils';

/**
 * Wybor wariantu, ilosci i dodanie do koszyka.
 * Po dodaniu pojawia sie potwierdzenie w regionie aria-live, wiec informacja
 * dociera takze do osob, ktore nie widza zmiany licznika w naglowku.
 */
export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstAvailable =
    product.variants.find((variant) => variant.inStock) ?? product.variants[0]!;
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((item) => item.id === variantId) ?? firstAvailable;
  const unitPrice = product.price + variant.priceDelta;

  function handleAdd() {
    addItem(product.slug, variant.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 4000);
  }

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
          Materiał i wykończenie
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {product.variants.map((item) => {
            const price = product.price + item.priceDelta;
            const selected = item.id === variantId;
            return (
              <label
                key={item.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-sm border p-3 transition-colors',
                  selected
                    ? 'border-border-brand bg-accent-subtle'
                    : 'border-border-subtle hover:border-border-strong',
                  !item.inStock && 'cursor-not-allowed opacity-55',
                )}
              >
                <input
                  type="radio"
                  name="variant"
                  value={item.id}
                  checked={selected}
                  disabled={!item.inStock}
                  onChange={() => setVariantId(item.id)}
                  className="mt-0.5 size-4 accent-accent focus-ring"
                />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-text-primary">
                    {materialLabels[item.material]}
                  </span>
                  <span className="block text-xs text-text-muted">{finishLabels[item.finish]}</span>
                  <span className="mt-1 block text-sm font-bold text-text-primary">
                    {formatPrice(price)}
                  </span>
                  {!item.inStock && (
                    <span className="mt-1 block text-xs font-medium text-danger">Niedostępny</span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs font-bold uppercase tracking-wider text-text-primary"
          >
            Ilość
          </label>
          <div className="mt-2 flex items-center rounded-sm border border-border-default">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
              aria-label="Zmniejsz ilość"
              className="flex size-11 items-center justify-center text-lg text-text-secondary transition-colors hover:bg-bg-muted disabled:opacity-40 focus-ring"
            >
              −
            </button>
            <input
              id="quantity"
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(event) => {
                const parsed = Number.parseInt(event.target.value, 10);
                setQuantity(Number.isNaN(parsed) ? 1 : Math.min(99, Math.max(1, parsed)));
              }}
              className="h-11 w-14 border-x border-border-default bg-transparent text-center text-sm font-semibold text-text-primary focus-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(99, value + 1))}
              disabled={quantity >= 99}
              aria-label="Zwiększ ilość"
              className="flex size-11 items-center justify-center text-lg text-text-secondary transition-colors hover:bg-bg-muted disabled:opacity-40 focus-ring"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-text-muted">Razem</p>
          <p className="mt-1 text-2xl font-extrabold text-text-primary">
            {formatPrice(unitPrice * quantity)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={handleAdd} disabled={!variant.inStock} className="flex-1">
          {variant.inStock ? 'Dodaj do koszyka' : 'Produkt niedostępny'}
        </Button>
        <Link
          href="/koszyk/"
          className="inline-flex h-13 items-center justify-center rounded-sm border border-border-default px-6 text-sm font-semibold uppercase tracking-wide text-text-primary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
        >
          Przejdź do koszyka
        </Link>
      </div>

      {/* Region na komunikat - obecny w DOM od poczatku, zeby czytnik go sledzil */}
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {added && (
          <span className="flex items-center gap-2 font-medium text-success">
            <CheckIcon className="size-4" />
            Dodano do koszyka: {product.name} ({quantity} szt.)
          </span>
        )}
      </p>
    </div>
  );
}
