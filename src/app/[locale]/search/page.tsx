import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { SearchClient } from '@/components/search/SearchClient';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.search.title,
    description: dict.search.description,
    alternates: {
      canonical: canonicalUrl(locale, '/search'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/search')]),
      ),
    },
    // Result pages differ only by a query parameter, so there is nothing
    // stable for a crawler to index here.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: '/search', label: dict.search.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.search.title} description={dict.search.description} />
      <SearchClient locale={locale} />
    </>
  );
}
