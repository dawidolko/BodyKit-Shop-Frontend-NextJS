'use client';

import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Button, LinkButton } from '@/components/ui/Button';
import { TrashIcon, TruckIcon } from '@/components/ui/Icon';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/lib/cart';
import { formatPrice, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function CartClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const {
    detailedLines,
    itemCount,
    subtotal,
    shipping,
    total,
    isHydrated,
    setQuantity,
    removeItem,
    clear,
  } = useCart();

  // Until localStorage has been read we do not know what is in the cart, so we
  // show a skeleton instead of a false "cart is empty" message.
  if (!isHydrated) {
    return (
      <div className="container-page pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="flex flex-col gap-4">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-md border border-border-subtle bg-bg-muted"
              />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-md border border-border-subtle bg-bg-muted" />
        </div>
        <p className="sr-only" role="status">
          {dict.cart.loading}
        </p>
      </div>
    );
  }

  if (detailedLines.length === 0) {
    return (
      <div className="container-page pb-16">
        <div className="rounded-md border border-dashed border-border-default px-6 py-16 text-center">
          <p className="text-lg font-bold text-text-primary">{dict.cart.empty}</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
            {dict.cart.emptyHint}
          </p>
          <LinkButton href={localePath(locale, '/categories')} size="lg" className="mt-6">
            {dict.cart.browse}
          </LinkButton>
        </div>
      </div>
    );
  }

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="container-page pb-16">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Cart lines */}
        <section aria-labelledby="lines-heading">
          <h2 id="lines-heading" className="sr-only">
            {dict.cart.itemsHeading}
          </h2>

          <ul className="flex flex-col gap-4">
            {detailedLines.map((line) => {
              const name = t(line.product.name, locale);
              const href = localePath(locale, `/products/${line.product.slug}`);
              return (
                <li
                  key={`${line.productSlug}-${line.variantId}`}
                  className="flex gap-4 rounded-md border border-border-subtle bg-surface p-4"
                >
                  <Link
                    href={href}
                    className="w-24 shrink-0 overflow-hidden rounded-sm focus-ring sm:w-28"
                  >
                    <Picture
                      name={line.product.images[0] ?? 'shot-detail-1'}
                      alt=""
                      ratio={1}
                      sizes="7rem"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-snug text-text-primary sm:text-base">
                          <Link href={href} className="rounded-xs hover:text-text-brand focus-ring">
                            {name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                          {dict.materials[line.variant.material]} ·{' '}
                          {dict.finishes[line.variant.finish]}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.productSlug, line.variantId)}
                        aria-label={dict.cart.remove(name)}
                        className="shrink-0 rounded-sm p-2 text-text-muted transition-colors hover:bg-bg-muted hover:text-danger focus-ring"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-sm border border-border-default">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productSlug, line.variantId, line.quantity - 1)
                          }
                          aria-label={dict.cart.decrease(name)}
                          className="flex size-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-muted focus-ring"
                        >
                          −
                        </button>
                        <span
                          aria-label={dict.cart.quantityLabel(line.quantity)}
                          className="flex h-9 w-10 items-center justify-center border-x border-border-default text-sm font-semibold"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productSlug, line.variantId, line.quantity + 1)
                          }
                          aria-label={dict.cart.increase(name)}
                          className="flex size-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-muted focus-ring"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-right">
                        {line.quantity > 1 && (
                          <span className="block text-xs text-text-muted">
                            {formatPrice(line.unitPrice, locale)} {dict.cart.perUnit}
                          </span>
                        )}
                        <span className="text-base font-bold text-text-primary">
                          {formatPrice(line.lineTotal, locale)}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href={localePath(locale, '/categories')} variant="secondary" size="sm">
              {dict.cart.continueShopping}
            </LinkButton>
            <Button variant="ghost" size="sm" onClick={clear}>
              {dict.cart.clearCart}
            </Button>
          </div>
        </section>

        {/* Summary */}
        <section
          aria-labelledby="summary-heading"
          className="rounded-md border border-border-subtle bg-surface p-6 lg:sticky lg:top-28"
        >
          <h2 id="summary-heading" className="text-lg font-bold uppercase tracking-wide">
            {dict.cart.summary}
          </h2>

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">{dict.cart.products(itemCount)}</dt>
              <dd className="font-medium text-text-primary">{formatPrice(subtotal, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">{dict.cart.delivery}</dt>
              <dd className="font-medium text-text-primary">
                {shipping === 0 ? (
                  <span className="text-success">{dict.cart.free}</span>
                ) : (
                  formatPrice(shipping, locale)
                )}
              </dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border-subtle pt-4">
              <dt className="text-base font-bold text-text-primary">{dict.cart.grandTotal}</dt>
              <dd className="text-xl font-extrabold text-text-primary">
                {formatPrice(total, locale)}
              </dd>
            </div>
          </dl>

          {missingForFreeShipping > 0 && (
            <div className="mt-5 rounded-sm bg-accent-subtle p-3">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
                <TruckIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                <span>
                  {dict.cart.freeShippingGap(formatPrice(missingForFreeShipping, locale))}
                </span>
              </p>
            </div>
          )}

          <LinkButton href={localePath(locale, '/checkout')} size="lg" className="mt-6 w-full">
            {dict.cart.checkout}
          </LinkButton>

          <p className="mt-4 text-center text-xs leading-relaxed text-text-muted">
            {dict.cart.demoNote}
          </p>
        </section>
      </div>
    </div>
  );
}
