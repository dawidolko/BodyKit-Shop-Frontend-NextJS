import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCart } from '@/components/product/AddToCart';
import { ProductCard } from '@/components/product/ProductCard';
import { Rating } from '@/components/product/Rating';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { CheckIcon, ShieldIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { getCategory } from '@/lib/categories';
import { getProduct, getRelatedProducts, products } from '@/lib/products';
import { absoluteUrl, site } from '@/lib/site';
import {
  asset,
  badgeLabels,
  discountPercent,
  formatPrice,
  materialLabels,
  priceToNumber,
  shippingLabel,
} from '@/lib/utils';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const cover = product.images[0] ?? 'shot-detail-1';

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/produkty/${product.slug}/` },
    openGraph: {
      type: 'website',
      title: `${product.name} — BodyKit Shop`,
      description: product.shortDescription,
      url: absoluteUrl(`/produkty/${product.slug}/`),
      images: [{ url: asset(`/images/${cover}-900.webp`), width: 900, height: 900, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const anyInStock = product.variants.some((variant) => variant.inStock);
  const prices = product.variants.map((variant) => product.price + variant.priceDelta);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.slug,
    category: category?.name,
    image: product.images.map((image) => absoluteUrl(asset(`/images/${image}-900.webp`))),
    brand: { '@type': 'Brand', name: site.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PLN',
      lowPrice: priceToNumber(Math.min(...prices)),
      highPrice: priceToNumber(Math.max(...prices)),
      offerCount: product.variants.length,
      availability: anyInStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: absoluteUrl(`/produkty/${product.slug}/`),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        items={[
          { href: '/kategorie/', label: 'Katalog' },
          ...(category
            ? [{ href: `/kategorie/${category.slug}/`, label: category.name }]
            : []),
          { href: `/produkty/${product.slug}/`, label: product.name },
        ]}
      />

      <div className="container-page py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            {(product.badges.length > 0 || discount) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {discount && <Badge tone="accent">-{discount}%</Badge>}
                {product.badges.map((badge) => (
                  <Badge key={badge} tone="outline">
                    {badgeLabels[badge]}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} count={product.reviewCount} />
              <span className="text-sm text-text-muted">
                {anyInStock ? (
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckIcon className="size-4" />
                    Dostępny
                  </span>
                ) : (
                  <span className="text-danger">Chwilowo niedostępny</span>
                )}
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-text-secondary">
              {product.description}
            </p>

            {product.compareAtPrice && (
              <p className="mt-6 text-sm text-text-muted">
                Cena katalogowa:{' '}
                <span className="line-through">{formatPrice(product.compareAtPrice)}</span>
              </p>
            )}

            <div className="mt-6 border-t border-border-subtle pt-6">
              <AddToCart product={product} />
            </div>

            <ul className="mt-8 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
              <li className="flex gap-3">
                <TruckIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  {shippingLabel(product.shippingDays)}
                </span>
              </li>
              <li className="flex gap-3">
                <ShieldIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  24 miesiące gwarancji
                </span>
              </li>
              <li className="flex gap-3">
                <WrenchIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  Instrukcja montażu PL
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dane techniczne, dopasowanie i zawartosc zestawu */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <section aria-labelledby="spec-heading">
            <h2 id="spec-heading" className="text-lg font-bold uppercase tracking-wide">
              Dane techniczne
            </h2>
            <dl className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-sm text-text-muted">{spec.label}</dt>
                  <dd className="text-right text-sm font-medium text-text-primary">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="fitment-heading">
            <h2 id="fitment-heading" className="text-lg font-bold uppercase tracking-wide">
              Pasuje do
            </h2>
            <ul className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
              {product.fitment.map((fit) => (
                <li key={`${fit.make}-${fit.model}`} className="py-3">
                  <p className="text-sm font-semibold text-text-primary">
                    {fit.make} {fit.model}
                  </p>
                  <p className="text-xs text-text-muted">Roczniki: {fit.years}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-text-muted">
              Nie widzisz swojego modelu?{' '}
              <Link href="/kontakt/" className="font-medium text-text-brand underline focus-ring">
                Napisz do nas
              </Link>{' '}
              — sprawdzimy dopasowanie.
            </p>
          </section>

          <section aria-labelledby="included-heading">
            <h2 id="included-heading" className="text-lg font-bold uppercase tracking-wide">
              W zestawie
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {product.included.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-text-secondary">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-text-muted">
              Dostępne materiały:{' '}
              {[...new Set(product.variants.map((variant) => materialLabels[variant.material]))].join(
                ', ',
              )}
              .
            </p>
          </section>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-20">
            <h2 id="related-heading" className="text-2xl font-extrabold uppercase tracking-tight">
              Z tej samej kategorii
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <ProductCard product={item} className="w-full" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
