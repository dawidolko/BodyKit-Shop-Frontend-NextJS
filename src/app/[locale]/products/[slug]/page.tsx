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
import { getPartNumber, getProduct, getRelatedProducts, products } from '@/lib/products';
import {
  absoluteLocaleUrl,
  canonicalUrl,
  ogImage,
  seoDescription,
  seoTitle,
  site,
} from '@/lib/site';
import { discountPercent, formatPrice, shippingLabel, t } from '@/lib/utils';
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

  const name = t(product.name, locale);
  const description = seoDescription(
    t(product.shortDescription, locale),
    t(product.description, locale),
  );
  const path = `/products/${product.slug}`;

  return {
    title: seoTitle(name, locale),
    description,
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, path)]),
      ),
    },
    openGraph: {
      images: [ogImage],
      type: 'website',
      title: `${name} — ${site.name}`,
      description,
      url: absoluteLocaleUrl(locale, path),
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

  const name = t(product.name, locale);
  const description = t(product.description, locale);
  const path = `/products/${product.slug}`;

  /*
   * A catalogue page rather than Product markup: this is a demo store, so the
   * prices, stock and ratings are not real data search engines should show.
   */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteLocaleUrl(locale, path),
    inLanguage: localeTags[locale],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { name: dict.catalog.title, item: absoluteLocaleUrl(locale, '/categories') },
        ...(category
          ? [
              {
                name: t(category.name, locale),
                item: absoluteLocaleUrl(locale, `/categories/${category.slug}`),
              },
            ]
          : []),
        { name, item: absoluteLocaleUrl(locale, path) },
      ].map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })),
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

      <div className="grid border-b-2 border-border-strong bg-surface lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ProductGallery images={product.images} productName={name} locale={locale} />

        <div className="px-4 py-6 md:px-6 lg:border-l-2 lg:border-border-strong lg:py-8 xl:pr-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="index-tab type-data">
              <span className="sr-only">{dict.product.partNumber} </span>
              {getPartNumber(product)}
            </span>
            {discount && <Badge tone="accent">-{discount}%</Badge>}
            {product.badges
              .filter((badge) => badge !== 'sale')
              .map((badge) => (
                <Badge key={badge} tone={badge === 'lastUnits' ? 'hazard' : 'on-image'}>
                  {dict.badges[badge]}
                </Badge>
              ))}
          </div>

          <h1 className="type-display-lg mt-3">{name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} count={product.reviewCount} dict={dict} />
            <span className="text-sm font-semibold">
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

          <p className="mt-4 max-w-prose leading-relaxed text-text-secondary">{description}</p>

          {product.compareAtPrice && (
            <p className="mt-4 text-sm text-text-muted">
              {dict.product.listPrice}{' '}
              <span className="line-through">{formatPrice(product.compareAtPrice, locale)}</span>
            </p>
          )}

          <div className="mt-5 border-t-2 border-border-strong pt-5">
            <AddToCart product={product} locale={locale} />
          </div>

          <ul className="mt-5 grid gap-3 border-t border-border-subtle pt-4 sm:grid-cols-3">
            <li className="flex gap-2.5">
              <TruckIcon className="size-5 shrink-0 text-accent-fg" />
              <span className="text-sm leading-snug text-text-secondary">
                {shippingLabel(product.shippingDays, dict)}
              </span>
            </li>
            <li className="flex gap-2.5">
              <ShieldIcon className="size-5 shrink-0 text-accent-fg" />
              <span className="text-sm leading-snug text-text-secondary">
                {dict.product.warranty}
              </span>
            </li>
            <li className="flex gap-2.5">
              <WrenchIcon className="size-5 shrink-0 text-accent-fg" />
              <span className="text-sm leading-snug text-text-secondary">
                {dict.product.instructions}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page grid gap-x-12 gap-y-10 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]">
        <section aria-labelledby="fitment-heading">
          <h2 id="fitment-heading" className="type-display-md">
            {dict.product.fitment}
          </h2>
          <table className="mt-4 w-full border-collapse bg-surface text-sm">
            <thead>
              <tr className="border-b-2 border-border-strong text-left">
                <th scope="col" className="px-3 py-2 font-bold">
                  {dict.product.make}
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  {dict.product.model}
                </th>
                <th scope="col" className="px-3 py-2 font-bold">
                  {dict.product.yearsColumn}
                </th>
              </tr>
            </thead>
            <tbody>
              {product.fitment.map((fit) => (
                <tr key={`${fit.make}-${fit.model}`} className="border-b border-border-subtle">
                  <td className="px-3 py-2.5 font-semibold text-text-primary">{fit.make}</td>
                  <td className="px-3 py-2.5 text-text-primary">{fit.model}</td>
                  <td className="type-data px-3 py-2.5 text-text-secondary">{fit.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
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

        <section aria-labelledby="spec-heading">
          <h2 id="spec-heading" className="type-display-md">
            {dict.product.specs}
          </h2>
          <dl className="mt-4 divide-y divide-border-subtle border-y-2 border-border-strong bg-surface">
            {category && (
              <div className="flex justify-between gap-4 px-3 py-2.5">
                <dt className="text-sm text-text-muted">{dict.product.category}</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  {t(category.name, locale)}
                </dd>
              </div>
            )}
            {product.specs.map((spec) => (
              <div key={t(spec.label, locale)} className="flex justify-between gap-4 px-3 py-2.5">
                <dt className="text-sm text-text-muted">{t(spec.label, locale)}</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  {t(spec.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="included-heading">
          <h2 id="included-heading" className="type-display-md">
            {dict.product.included}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {t(product.included, locale).map((item) => (
              <li key={item} className="flex gap-3 text-sm text-text-secondary">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            {dict.product.availableMaterials}{' '}
            {[...new Set(product.variants.map((variant) => dict.materials[variant.material]))].join(
              ', ',
            )}
            .
          </p>
        </section>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className="type-display-lg container-page pb-5">
            {dict.product.related}
          </h2>
          <ul className="part-wall">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} locale={locale} dict={dict} className="w-full" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
