import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Badge } from '@/components/ui/Badge';
import { Rating } from './Rating';
import { getPartNumber } from '@/lib/products';
import type { Product } from '@/lib/types';
import { cn, discountPercent, formatPrice, getMinPriceLabel, t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/**
 * Parts-wall tile: photo edge to edge, then the catalogue data a buyer checks
 * first, part number, fitment and price.
 *
 * The whole tile is one click target thanks to a stretched link (::after), yet
 * the accessibility tree still sees a single link carrying the full product
 * name.
 *
 * `headingLevel` matches the heading to its context: on a category page the
 * grid sits directly under the h1 (so h2), on the home page under a section
 * heading (so h3). Skipping levels would break the document outline that
 * screen readers navigate by.
 */
export function ProductCard({
  product,
  locale,
  dict,
  priority = false,
  headingLevel = 3,
  lead = false,
  className,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  headingLevel?: 2 | 3;
  /** The large tile that opens a parts wall. */
  lead?: boolean;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const discount = discountPercent(product.price, product.compareAtPrice);
  const cover = product.images[0] ?? 'shot-detail-1';
  const anyInStock = product.variants.some((variant) => variant.inStock);
  const name = t(product.name, locale);
  const firstFit = product.fitment[0];

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-surface',
        'has-[a:focus-visible]:z-10 has-[a:focus-visible]:outline-2',
        'has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-(--focus-ring)',
        className,
      )}
    >
      <div className={cn('relative overflow-hidden bg-bg-muted', lead && 'flex-1')}>
        <Picture
          name={cover}
          alt={dict.product.imageAlt(name)}
          ratio={4 / 3}
          sizes={lead ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 26rem, 50vw'}
          priority={priority}
          className={cn('max-h-[26rem] w-full', lead && 'h-full lg:max-h-none')}
        />

        {(product.badges.length > 0 || discount) && (
          <div className="absolute left-0 top-3 flex flex-col items-start gap-1">
            {discount && <Badge tone="accent">-{discount}%</Badge>}
            {product.badges
              .filter((badge) => badge !== 'sale')
              .map((badge) => (
                <Badge key={badge} tone={badge === 'lastUnits' ? 'hazard' : 'on-image'}>
                  {dict.badges[badge]}
                </Badge>
              ))}
          </div>
        )}

        {!anyInStock && (
          <p className="absolute inset-x-0 bottom-0 bg-carbon-950 py-1.5 text-center text-xs font-semibold text-carbon-50">
            {dict.product.unavailable}
          </p>
        )}

        <span
          aria-hidden="true"
          className="stripes absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-300 ease-out-quint group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-col gap-1.5 border-t-2 border-border-strong p-3 sm:p-4">
        <div className="flex items-baseline justify-between gap-3 text-xs text-text-muted">
          <span className="type-data text-[0.8125rem]">
            <span className="sr-only">{dict.product.partNumber} </span>
            {getPartNumber(product)}
          </span>
          <Rating value={product.rating} dict={dict} size="sm" showCount={false} />
        </div>

        <Heading
          className={cn(
            'type-display leading-[1.15] text-text-primary',
            lead ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base',
          )}
        >
          <Link
            href={localePath(locale, `/products/${product.slug}`)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline"
          >
            {name}
          </Link>
        </Heading>

        {lead && (
          <p className="line-clamp-2 max-w-prose text-sm leading-relaxed text-text-muted">
            {t(product.shortDescription, locale)}
          </p>
        )}

        {firstFit && (
          <p className="text-xs leading-snug text-text-muted">
            {dict.product.fitsLabel} {firstFit.make} {firstFit.model}
            {product.fitment.length > 1 && (
              <> {dict.product.moreModels(product.fitment.length - 1)}</>
            )}
          </p>
        )}

        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="type-display text-base text-text-primary sm:text-lg">
            {getMinPriceLabel(product, locale, dict)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(product.compareAtPrice, locale)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
