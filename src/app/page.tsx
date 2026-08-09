import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { site, absoluteUrl } from '@/lib/site';
import { asset } from '@/lib/utils';

export default function HomePage() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': absoluteUrl('/#store'),
    name: site.name,
    description: site.description,
    url: absoluteUrl('/'),
    image: absoluteUrl(asset('/og-default.png')),
    logo: absoluteUrl(asset('/icon-512.png')),
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
    url: absoluteUrl('/'),
    inLanguage: 'pl-PL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/szukaj/')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={[organization, website]} />
      {/* Jedyny h1 strony znajduje sie w komponencie Hero. */}
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
