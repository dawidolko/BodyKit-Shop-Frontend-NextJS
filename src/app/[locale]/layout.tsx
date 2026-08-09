import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import '../globals.css';
import { themeInitScript } from '@/components/layout/ThemeToggle';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart';
import { site, absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, ogLocales, type Locale } from '@/i18n/config';

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const fontVariables = `${barlow.variable} ${barlowCondensed.variable}`;

type LayoutParams = { locale: string };

export function generateStaticParams(): LayoutParams[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.siteTitle,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.siteDescription,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: canonicalUrl(locale, '/'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/')]),
      ),
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => ogLocales[code]),
      siteName: site.name,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: absoluteLocaleUrl(locale, '/'),
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: dict.meta.siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: ['/og-default.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

/**
 * Locale segment layout. Everything user-facing lives under /<locale>/, so
 * this is where the dictionary is resolved and handed down to the chrome.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    // The document shell lives here rather than in the root layout: this is the
    // only place that knows the active locale, so it is the only place that can
    // put the right value into lang on the served HTML. Setting it client-side
    // would leave crawlers and assistive technology reading the wrong language.
    <html lang={localeTags[typedLocale]} className={fontVariables}>
      <head>
        {/* Applies the theme before first paint. Without it the page would
            flash a light background before React adds the .dark class. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main-content" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <CartProvider>
          <Header locale={typedLocale} />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer locale={typedLocale} dict={dict} />
        </CartProvider>
      </body>
    </html>
  );
}
