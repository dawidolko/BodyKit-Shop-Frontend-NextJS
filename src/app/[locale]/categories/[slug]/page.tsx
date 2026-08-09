import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { JsonLd } from '@/components/seo/JsonLd';
import { categories, getCategory } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { priceToNumber, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, slug: category.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const category = getCategory(slug);
  if (!category) return {};

  const name = t(category.name, locale);
  const description = t(category.description, locale).slice(0, 160);
  const path = `/categories/${category.slug}`;

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
      title: `${name} — ${site.name}`,
      description,
      url: absoluteLocaleUrl(locale, path),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const name = t(category.name, locale);
  const description = t(category.description, locale);
  const path = `/categories/${category.slug}`;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteLocaleUrl(locale, `/products/${product.slug}`),
      name: t(product.name, locale),
    })),
  };

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteLocaleUrl(locale, path),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PLN',
      lowPrice: priceToNumber(Math.min(...products.map((product) => product.price))),
      highPrice: priceToNumber(Math.max(...products.map((product) => product.price))),
      offerCount: products.length,
    },
  };

  return (
    <>
      <JsonLd data={[itemList, collection]} />
      <Breadcrumbs
        items={[
          { href: '/categories', label: dict.catalog.title },
          { href: path, label: name },
        ]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={name} description={description} />

      <div className="container-page pb-8">
        <ProductFilters products={products} locale={locale} />
      </div>
    </>
  );
}
