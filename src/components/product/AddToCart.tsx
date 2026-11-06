'use client';

import { useState } from 'react';
import { Button, LinkButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icon';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';
import { cn, formatPrice, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/**
 * Variant and quantity picker plus the add-to-cart action.
 * After adding, a confirmation appears in an aria-live region, so the message
 * also reaches people who cannot see the header counter change.
 */
export function AddToCart({ product, locale }: { product: Product; locale: Locale }) {
  const dict = getDictionary(locale);
  const { addItem } = useCart();
  const firstAvailable =
    product.variants.find((variant) => variant.inStock) ?? product.variants[0]!;
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((item) => item.id === variantId) ?? firstAvailable;
  const unitPrice = product.price + variant.priceDelta;
  const name = t(product.name, locale);

  function handleAdd() {
    addItem(product.slug, variant.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 4000);
  }

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-bold text-text-primary">
          {dict.product.materialAndFinish}
        </legend>
        <div className="mt-2 grid gap-px bg-border-default p-px sm:grid-cols-2">
          {product.variants.map((item) => {
            const price = product.price + item.priceDelta;
            const selected = item.id === variantId;
            return (
              <label
                key={item.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 p-3 transition-colors',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-(--focus-ring)',
                  selected ? 'bg-bg-muted shadow-[inset_4px_0_0_var(--accent)]' : 'bg-surface',
                  !item.inStock && 'cursor-not-allowed opacity-70',
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
                    {dict.materials[item.material]}
                  </span>
                  <span className="block text-xs text-text-muted">
                    {dict.finishes[item.finish]}
                  </span>
                  <span className="type-display mt-1 block text-sm text-text-primary">
                    {formatPrice(price, locale)}
                  </span>
                  {!item.inStock && (
                    <span className="mt-1 block text-xs font-medium text-danger">
                      {dict.product.outOfStockShort}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-bold text-text-primary">
            {dict.product.quantity}
          </label>
          <div className="mt-1.5 flex items-center border-2 border-border-strong">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
              aria-label={dict.product.decrease}
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
              className="h-11 w-14 border-x-2 border-border-strong bg-transparent text-center text-sm font-semibold text-text-primary focus-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(99, value + 1))}
              disabled={quantity >= 99}
              aria-label={dict.product.increase}
              className="flex size-11 items-center justify-center text-lg text-text-secondary transition-colors hover:bg-bg-muted disabled:opacity-40 focus-ring"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-bold text-text-primary">{dict.product.total}</p>
          <p className="type-display mt-1 text-3xl text-text-primary">
            {formatPrice(unitPrice * quantity, locale)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={handleAdd} disabled={!variant.inStock} className="mx-1.5 flex-1">
          {variant.inStock ? dict.product.addToCart : dict.product.unavailable}
        </Button>
        <LinkButton
          href={localePath(locale, '/cart')}
          variant="secondary"
          size="lg"
          className="mx-1.5"
        >
          {dict.product.goToCart}
        </LinkButton>
      </div>

      {/* Message region - present in the DOM from the start, so the screen
          reader keeps observing it and announces the update in place. */}
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {added && (
          <span className="flex items-center gap-2 font-medium text-success">
            <CheckIcon className="size-4" />
            {dict.product.addedToCart(name, quantity)}
          </span>
        )}
      </p>
    </div>
  );
}
