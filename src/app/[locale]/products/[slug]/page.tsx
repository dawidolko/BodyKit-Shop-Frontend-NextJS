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
import { absoluteLocaleUrl, absoluteUrl, canonicalUrl, site } from '@/lib/site';
import { discountPercent, formatPrice, priceToNumber, shippingLabel, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProduct(slug);
  if (!product) return {};

  const cover = product.images[0] ?? 'shot-detail-1';
  const name = t(product.name, locale);
  const description = t(product.shortDescription, locale);
  const path = `/products/${product.slug}`;

  return {
    title: name,
    description,
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, path)]),
      ),
    },
    openGraph: {
      type: 'website',
      title: `${name} — ${site.name}`,
      description,
      url: absoluteLocaleUrl(locale, path),
      images: [{ url: `/images/${cover}-900.webp`, width: 900, height: 900, alt: name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const anyInStock = product.variants.some((variant) => variant.inStock);
  const prices = product.variants.map((variant) => product.price + variant.priceDelta);

  const name = t(product.name, locale);
  const description = t(product.description, locale);
  const path = `/products/${product.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: product.slug,
    category: category ? t(category.name, locale) : undefined,
    image: product.images.map((image) => absoluteUrl(`/images/${image}-900.webp`)),
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
      availability: anyInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: absoluteLocaleUrl(locale, path),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        items={[
          { href: '/categories', label: dict.catalog.title },
          ...(category
            ? [{ href: `/categories/${category.slug}`, label: t(category.name, locale) }]
            : []),
          { href: path, label: name },
        ]}
        locale={locale}
        dict={dict}
      />

      <div className="container-page py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} productName={name} locale={locale} />

          <div>
            {(product.badges.length > 0 || discount) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {discount && <Badge tone="accent">-{discount}%</Badge>}
                {product.badges.map((badge) => (
                  <Badge key={badge} tone="outline">
                    {dict.badges[badge]}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">
              {name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} count={product.reviewCount} dict={dict} />
              <span className="text-sm text-text-muted">
                {anyInStock ? (
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckIcon className="size-4" />
                    {dict.product.available}
                  </span>
                ) : (
                  <span className="text-danger">{dict.product.unavailable}</span>
                )}
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-text-secondary">{description}</p>

            {product.compareAtPrice && (
              <p className="mt-6 text-sm text-text-muted">
                {dict.product.listPrice}{' '}
                <span className="line-through">{formatPrice(product.compareAtPrice, locale)}</span>
              </p>
            )}

            <div className="mt-6 border-t border-border-subtle pt-6">
              <AddToCart product={product} locale={locale} />
            </div>

            <ul className="mt-8 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
              <li className="flex gap-3">
                <TruckIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  {shippingLabel(product.shippingDays, dict)}
                </span>
              </li>
              <li className="flex gap-3">
                <ShieldIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  {dict.product.warranty}
                </span>
              </li>
              <li className="flex gap-3">
                <WrenchIcon className="size-5 shrink-0 text-accent-fg" />
                <span className="text-xs leading-relaxed text-text-secondary">
                  {dict.product.instructions}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Specifications, fitment and what is in the box */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <section aria-labelledby="spec-heading">
            <h2 id="spec-heading" className="text-lg font-bold uppercase tracking-wide">
              {dict.product.specs}
            </h2>
            <dl className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
              {product.specs.map((spec) => (
                <div key={t(spec.label, locale)} className="flex justify-between gap-4 py-3">
                  <dt className="text-sm text-text-muted">{t(spec.label, locale)}</dt>
                  <dd className="text-right text-sm font-medium text-text-primary">
                    {t(spec.value, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="fitment-heading">
            <h2 id="fitment-heading" className="text-lg font-bold uppercase tracking-wide">
              {dict.product.fitment}
            </h2>
            <ul className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
              {product.fitment.map((fit) => (
                <li key={`${fit.make}-${fit.model}`} className="py-3">
                  <p className="text-sm font-semibold text-text-primary">
                    {fit.make} {fit.model}
                  </p>
                  <p className="text-xs text-text-muted">
                    {dict.product.years} {fit.years}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-text-muted">
              {dict.product.notListed}{' '}
              <Link
                href={localePath(locale, '/contact')}
                className="font-medium text-text-brand underline focus-ring"
              >
                {dict.product.notListedLink}
              </Link>{' '}
              {dict.product.notListedSuffix}
            </p>
          </section>

          <section aria-labelledby="included-heading">
            <h2 id="included-heading" className="text-lg font-bold uppercase tracking-wide">
              {dict.product.included}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {t(product.included, locale).map((item) => (
                <li key={item} className="flex gap-3 text-sm text-text-secondary">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-text-muted">
              {dict.product.availableMaterials}{' '}
              {[
                ...new Set(product.variants.map((variant) => dict.materials[variant.material])),
              ].join(', ')}
              .
            </p>
          </section>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-20">
            <h2 id="related-heading" className="text-2xl font-extrabold uppercase tracking-tight">
              {dict.product.related}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <ProductCard product={item} locale={locale} dict={dict} className="w-full" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
