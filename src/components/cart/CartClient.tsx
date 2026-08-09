'use client';

import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Button, LinkButton } from '@/components/ui/Button';
import { TrashIcon, TruckIcon } from '@/components/ui/Icon';
import { FREE_SHIPPING_THRESHOLD, useCart } from '@/lib/cart';
import { finishLabels, formatPrice, materialLabels, plural } from '@/lib/utils';

export function CartClient() {
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

  // Do czasu odczytania localStorage nie wiemy, co jest w koszyku - pokazujemy
  // szkielet zamiast falszywego komunikatu o pustym koszyku.
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
          Wczytywanie koszyka
        </p>
      </div>
    );
  }

  if (detailedLines.length === 0) {
    return (
      <div className="container-page pb-16">
        <div className="rounded-md border border-dashed border-border-default px-6 py-16 text-center">
          <p className="text-lg font-bold text-text-primary">Twój koszyk jest pusty</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
            Wybierz części z katalogu — przy każdej znajdziesz listę pasujących modeli i roczników.
          </p>
          <LinkButton href="/kategorie/" size="lg" className="mt-6">
            Przeglądaj katalog
          </LinkButton>
        </div>
      </div>
    );
  }

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="container-page pb-16">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        {/* Pozycje */}
        <section aria-labelledby="lines-heading">
          <h2 id="lines-heading" className="sr-only">
            Produkty w koszyku
          </h2>

          <ul className="flex flex-col gap-4">
            {detailedLines.map((line) => (
              <li
                key={`${line.productSlug}-${line.variantId}`}
                className="flex gap-4 rounded-md border border-border-subtle bg-surface p-4"
              >
                <Link
                  href={`/produkty/${line.product.slug}/`}
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
                        <Link
                          href={`/produkty/${line.product.slug}/`}
                          className="rounded-xs hover:text-text-brand focus-ring"
                        >
                          {line.product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {materialLabels[line.variant.material]} ·{' '}
                        {finishLabels[line.variant.finish]}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(line.productSlug, line.variantId)}
                      aria-label={`Usuń z koszyka: ${line.product.name}`}
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
                        aria-label={`Zmniejsz ilość: ${line.product.name}`}
                        className="flex size-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-muted focus-ring"
                      >
                        −
                      </button>
                      <span
                        aria-label={`Ilość: ${line.quantity}`}
                        className="flex h-9 w-10 items-center justify-center border-x border-border-default text-sm font-semibold"
                      >
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.productSlug, line.variantId, line.quantity + 1)
                        }
                        aria-label={`Zwiększ ilość: ${line.product.name}`}
                        className="flex size-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-muted focus-ring"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-right">
                      {line.quantity > 1 && (
                        <span className="block text-xs text-text-muted">
                          {formatPrice(line.unitPrice)} / szt.
                        </span>
                      )}
                      <span className="text-base font-bold text-text-primary">
                        {formatPrice(line.lineTotal)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href="/kategorie/" variant="secondary" size="sm">
              Kontynuuj zakupy
            </LinkButton>
            <Button variant="ghost" size="sm" onClick={clear}>
              Wyczyść koszyk
            </Button>
          </div>
        </section>

        {/* Podsumowanie */}
        <section
          aria-labelledby="summary-heading"
          className="rounded-md border border-border-subtle bg-surface p-6 lg:sticky lg:top-28"
        >
          <h2 id="summary-heading" className="text-lg font-bold uppercase tracking-wide">
            Podsumowanie
          </h2>

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">
                Produkty ({itemCount} {plural(itemCount, 'szt.', 'szt.', 'szt.')})
              </dt>
              <dd className="font-medium text-text-primary">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Dostawa</dt>
              <dd className="font-medium text-text-primary">
                {shipping === 0 ? (
                  <span className="text-success">Gratis</span>
                ) : (
                  formatPrice(shipping)
                )}
              </dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border-subtle pt-4">
              <dt className="text-base font-bold text-text-primary">Razem</dt>
              <dd className="text-xl font-extrabold text-text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>

          {missingForFreeShipping > 0 && (
            <div className="mt-5 rounded-sm bg-accent-subtle p-3">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
                <TruckIcon className="mt-0.5 size-4 shrink-0 text-accent-fg" />
                <span>
                  Do darmowej dostawy brakuje{' '}
                  <strong className="font-bold text-text-primary">
                    {formatPrice(missingForFreeShipping)}
                  </strong>
                  .
                </span>
              </p>
            </div>
          )}

          <LinkButton href="/zamowienie/" size="lg" className="mt-6 w-full">
            Przejdź do zamówienia
          </LinkButton>

          <p className="mt-4 text-center text-xs leading-relaxed text-text-muted">
            To sklep demonstracyjny — zamówienia nie są realizowane, a płatności nie są pobierane.
          </p>
        </section>
      </div>
    </div>
  );
}
