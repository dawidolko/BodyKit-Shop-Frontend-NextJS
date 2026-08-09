import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { JsonLd } from '@/components/seo/JsonLd';
import { categories, getCategory } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { absoluteUrl } from '@/lib/site';
import { priceToNumber } from '@/lib/utils';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description.slice(0, 160),
    alternates: { canonical: `/kategorie/${category.slug}/` },
    openGraph: {
      title: `${category.name} — BodyKit Shop`,
      description: category.description.slice(0, 160),
      url: absoluteUrl(`/kategorie/${category.slug}/`),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/produkty/${product.slug}/`),
      name: product.name,
    })),
  };

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: absoluteUrl(`/kategorie/${category.slug}/`),
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
          { href: '/kategorie/', label: 'Katalog' },
          { href: `/kategorie/${category.slug}/`, label: category.name },
        ]}
      />
      <PageHeader title={category.name} description={category.description} />

      <div className="container-page pb-8">
        <ProductFilters products={products} />
      </div>
    </>
  );
}
