import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { themeInitScript } from '@/components/layout/ThemeToggle';
import { CartProvider } from '@/lib/cart';
import { site, absoluteUrl } from '@/lib/site';
import { asset } from '@/lib/utils';

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — dokładki, spoilery i tuning karoserii`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  generator: 'Next.js',
  keywords: [
    'dokładki',
    'body kit',
    'splitter przedni',
    'spoiler',
    'dyfuzor tylny',
    'tuning karoserii',
    'karbon',
    'felgi',
  ],
  alternates: { canonical: '/' },
  // Sciezki w metadanych sa rozwiazywane wzgledem metadataBase, ktory juz
  // zawiera basePath. Dodanie asset() zdublowaloby prefiks w adresie.
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — dokładki, spoilery i tuning karoserii`,
    description: site.description,
    url: absoluteUrl('/'),
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — sklep z częściami do tuningu karoserii`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — dokładki, spoilery i tuning karoserii`,
    description: site.description,
    images: ['/og-default.png'],
  },
  // Ikony i manifest trafiaja do atrybutu href jako sciezki wzgledne
  // dokumentu, wiec tutaj basePath trzeba dodac jawnie.
  icons: {
    icon: [
      { url: asset('/favicon.svg'), type: 'image/svg+xml' },
      { url: asset('/favicon-96.png'), sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: asset('/apple-touch-icon.png'), sizes: '180x180' }],
  },
  manifest: asset('/site.webmanifest'),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1115' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* Ustawia motyw przed pierwszym malowaniem - bez tego strona mrugalaby
            jasnym tlem, zanim React zdazylby dodac klase .dark */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        <CartProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
