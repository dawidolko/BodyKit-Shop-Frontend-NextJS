import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.checkout.title,
    description: dict.checkout.description,
    alternates: {
      canonical: canonicalUrl(locale, '/checkout'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/checkout')]),
      ),
    },
    // Checkout depends on cart state, so there is nothing stable to index.
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/cart', label: dict.cart.title },
          { href: '/checkout', label: dict.checkout.title },
        ]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.checkout.title} description={dict.checkout.description} />
      <CheckoutForm locale={locale} />
    </>
  );
}
