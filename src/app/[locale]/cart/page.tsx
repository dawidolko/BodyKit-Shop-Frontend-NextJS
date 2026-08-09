import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { CartClient } from '@/components/cart/CartClient';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.cart.title,
    description: dict.cart.metaDescription,
    alternates: {
      canonical: canonicalUrl(locale, '/cart'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/cart')]),
      ),
    },
    // The cart is per-visitor state - nothing worth crawling or following.
    robots: { index: false, follow: false },
  };
}

export default async function CartPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: '/cart', label: dict.cart.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.cart.title} />
      <CartClient locale={locale} />
    </>
  );
}
