'use client';

import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Button, LinkButton } from '@/components/ui/Button';
import { TrashIcon, TruckIcon } from '@/components/ui/Icon';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/lib/cart';
import { getPartNumber } from '@/lib/products';
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
      <div className="container-page pt-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
          <div className="flex flex-col gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="h-32 animate-pulse bg-bg-muted" />
            ))}
          </div>
          <div className="h-64 animate-pulse bg-bg-muted" />
        </div>
        <p className="sr-only" role="status">
          {dict.cart.loading}
        </p>
      </div>
    );
  }

  if (detailedLines.length === 0) {
    return (
      <div className="container-page pt-6">
        <div className="border-2 border-dashed border-border-default px-6 py-16 text-center">
          <p className="type-display-md text-text-primary">{dict.cart.empty}</p>
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
    <div className="container-page pt-6">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
        {/* Cart lines */}
        <section aria-labelledby="lines-heading">
          <h2 id="lines-heading" className="sr-only">
            {dict.cart.itemsHeading}
          </h2>

          <ul className="sheet flex flex-col divide-y divide-border-subtle">
            {detailedLines.map((line) => {
              const name = t(line.product.name, locale);
              const href = localePath(locale, `/products/${line.product.slug}`);
              return (
                <li key={`${line.productSlug}-${line.variantId}`} className="flex gap-4">
                  <Link
                    href={href}
                    className="w-28 shrink-0 self-stretch overflow-hidden focus-visible:-outline-offset-2 sm:w-44"
                  >
                    <Picture
                      name={line.product.images[0] ?? 'shot-detail-1'}
                      alt={dict.product.imageAlt(name)}
                      ratio={1}
                      sizes="11rem"
                      className="h-full w-full"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col py-3 pr-3 sm:py-4 sm:pr-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="type-data text-[0.8125rem] text-text-muted">
                          <span className="sr-only">{dict.product.partNumber} </span>
                          {getPartNumber(line.product)}
                        </p>
                        <h3 className="type-display text-base leading-snug text-text-primary sm:text-lg">
                          <Link href={href} className="hover:text-text-brand focus-ring">
                            {name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                          {dict.materials[line.variant.material]},{' '}
                          {dict.finishes[line.variant.finish]}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.productSlug, line.variantId)}
                        aria-label={dict.cart.remove(name)}
                        className="shrink-0 p-2 text-text-muted transition-colors hover:bg-bg-muted hover:text-danger focus-ring"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      <div className="flex items-center border-2 border-border-strong">
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
                          className="flex h-9 w-10 items-center justify-center border-x-2 border-border-strong text-sm font-semibold"
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
                        <span className="type-display text-lg text-text-primary">
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
            <LinkButton
              href={localePath(locale, '/categories')}
              variant="secondary"
              size="sm"
              className="ml-1"
            >
              {dict.cart.continueShopping}
            </LinkButton>
            <Button variant="ghost" size="sm" onClick={clear}>
              {dict.cart.clearCart}
            </Button>
          </div>
        </section>

        {/* Summary */}
        <section aria-labelledby="summary-heading" className="livery p-6 lg:sticky lg:top-20">
          <h2 id="summary-heading" className="type-display-md">
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
              <dd className="type-display text-2xl text-text-primary">
                {formatPrice(total, locale)}
              </dd>
            </div>
          </dl>

          {missingForFreeShipping > 0 && (
            <div className="mt-5 border-l-4 border-hazard bg-bg-muted p-3">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
                <TruckIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                <span className="text-text-secondary">
                  {dict.cart.freeShippingGap(formatPrice(missingForFreeShipping, locale))}
                </span>
              </p>
            </div>
          )}

          <LinkButton
            href={localePath(locale, '/checkout')}
            size="lg"
            className="mt-6 w-[calc(100%-0.75rem)] translate-x-1.5"
          >
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
