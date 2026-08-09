import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { Badge } from '@/components/ui/Badge';
import { Rating } from './Rating';
import type { Product } from '@/lib/types';
import { badgeLabels, cn, discountPercent, formatPrice, getMinPriceLabel } from '@/lib/utils';

/**
 * Kafel produktu na listingach.
 *
 * Cala karta jest jednym celem klikniecia dzieki rozciagnietemu linkowi
 * (::after), ale w drzewie dostepnosci pozostaje pojedynczym odnosnikiem
 * z pelna nazwa produktu.
 *
 * `headingLevel` pozwala dopasowac poziom naglowka do kontekstu: na stronie
 * kategorii siatka stoi bezposrednio pod h1 (wiec h2), a na stronie glownej
 * pod naglowkiem sekcji h2 (wiec h3). Przeskok poziomow lamalby strukture
 * dokumentu, po ktorej nawiguja czytniki ekranu.
 */
export function ProductCard({
  product,
  priority = false,
  headingLevel = 3,
  className,
}: {
  product: Product;
  priority?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const discount = discountPercent(product.price, product.compareAtPrice);
  const cover = product.images[0] ?? 'shot-detail-1';
  const anyInStock = product.variants.some((variant) => variant.inStock);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-border-subtle',
        'bg-surface transition-[border-color,box-shadow,translate] duration-300 ease-(--ease-out-quint)',
        'hover:-translate-y-1 hover:border-border-brand hover:shadow-(--shadow-md)',
        'focus-within:border-border-brand',
        className,
      )}
    >
      <div className="relative overflow-hidden bg-bg-muted">
        <Picture
          name={cover}
          alt={`${product.name} - zdjęcie produktu`}
          ratio={1}
          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          imgClassName="transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-[1.04]"
        />

        {(product.badges.length > 0 || discount) && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {discount && <Badge tone="accent">-{discount}%</Badge>}
            {product.badges
              .filter((badge) => badge !== 'promocja')
              .map((badge) => (
                <Badge key={badge} tone="on-image">
                  {badgeLabels[badge]}
                </Badge>
              ))}
          </div>
        )}

        {!anyInStock && (
          <p className="absolute inset-x-0 bottom-0 bg-bg-inverse/90 py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-text-inverse">
            Chwilowo niedostępny
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Rating value={product.rating} count={product.reviewCount} size="sm" className="mb-2" />

        <Heading className="text-base font-bold leading-snug text-text-primary">
          <Link
            href={`/produkty/${product.slug}/`}
            className="rounded-xs after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline"
          >
            {product.name}
          </Link>
        </Heading>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="flex flex-col">
            {product.compareAtPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-text-primary">{getMinPriceLabel(product)}</span>
          </p>
          <span
            aria-hidden="true"
            className="text-xs font-semibold uppercase tracking-wide text-text-muted transition-colors group-hover:text-text-brand"
          >
            Zobacz
          </span>
        </div>
      </div>
    </article>
  );
}
