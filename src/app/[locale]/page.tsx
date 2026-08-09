import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { site, absoluteUrl, absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: canonicalUrl(locale, '/'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/')]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, '/'),
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': absoluteUrl('/#store'),
    name: site.name,
    description: dict.meta.siteDescription,
    url: absoluteLocaleUrl(locale, '/'),
    image: absoluteUrl('/og-default.png'),
    logo: absoluteUrl('/icon-512.png'),
    telephone: site.phone,
    email: site.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    openingHours: site.openingHours,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: site.name,
    url: absoluteLocaleUrl(locale, '/'),
    inLanguage: localeTags[locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteLocaleUrl(locale, '/search')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={[organization, website]} />
      {/* The only h1 on this page lives inside the Hero component. */}
      <Hero locale={locale} dict={dict} />
      <CategoryGrid locale={locale} dict={dict} />
      <FeaturedProducts locale={locale} dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
