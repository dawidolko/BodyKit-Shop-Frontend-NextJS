import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Badge } from '@/components/ui/Badge';
import { Rating } from './Rating';
import type { Product } from '@/lib/types';
import { cn, discountPercent, formatPrice, getMinPriceLabel, t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/**
 * Product tile used across listings.
 *
 * The whole card is one click target thanks to a stretched link (::after), yet
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
  className,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const discount = discountPercent(product.price, product.compareAtPrice);
  const cover = product.images[0] ?? 'shot-detail-1';
  const anyInStock = product.variants.some((variant) => variant.inStock);
  const name = t(product.name, locale);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-border-subtle',
        'bg-surface transition-[border-color,box-shadow,translate] duration-300 ease-out-quint',
        'hover:-translate-y-1 hover:border-border-brand hover:shadow-(--shadow-md)',
        'focus-within:border-border-brand',
        className,
      )}
    >
      <div className="relative overflow-hidden bg-bg-muted">
        <Picture
          name={cover}
          alt={dict.product.imageAlt(name)}
          ratio={1}
          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          imgClassName="transition-transform duration-500 ease-out-quint group-hover:scale-[1.04]"
        />

        {(product.badges.length > 0 || discount) && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {discount && <Badge tone="accent">-{discount}%</Badge>}
            {product.badges
              .filter((badge) => badge !== 'sale')
              .map((badge) => (
                <Badge key={badge} tone="on-image">
                  {dict.badges[badge]}
                </Badge>
              ))}
          </div>
        )}

        {!anyInStock && (
          <p className="absolute inset-x-0 bottom-0 bg-bg-inverse/90 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-text-inverse">
            {dict.product.unavailable}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Rating
          value={product.rating}
          count={product.reviewCount}
          dict={dict}
          size="sm"
          className="mb-2"
        />

        <Heading className="text-base font-bold leading-snug text-text-primary">
          <Link
            href={localePath(locale, `/products/${product.slug}`)}
            className="rounded-xs after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline"
          >
            {name}
          </Link>
        </Heading>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {t(product.shortDescription, locale)}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="flex flex-col">
            {product.compareAtPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.compareAtPrice, locale)}
              </span>
            )}
            <span className="text-lg font-bold text-text-primary">
              {getMinPriceLabel(product, locale, dict)}
            </span>
          </p>
          <span
            aria-hidden="true"
            className="text-xs font-semibold uppercase tracking-wide text-text-muted transition-colors group-hover:text-text-brand"
          >
            {dict.product.view}
          </span>
        </div>
      </div>
    </article>
  );
}
