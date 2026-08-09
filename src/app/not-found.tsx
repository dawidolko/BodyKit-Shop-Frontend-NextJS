import type { Metadata } from 'next';
import Link from 'next/link';
import { LinkButton } from '@/components/ui/Button';
import { categories } from '@/lib/categories';
import { t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { defaultLocale, localePath, localeTags } from '@/i18n/config';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { themeInitScript } from '@/components/layout/ThemeToggle';

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

/**
 * This file sits outside the [locale] segment, so there is no locale param to
 * read - Next.js renders it for unmatched paths at any depth. It falls back to
 * the default locale, and every link points into that locale's routes.
 */
const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dict.notFound.title,
  description: dict.notFound.lead,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    // Outside the [locale] segment nothing supplies a document shell, so this
    // page renders its own. Without it React would hydrate a fragment against
    // a full document and bail out with a mismatch.
    <html lang={localeTags[defaultLocale]} className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* The page still needs a main landmark: no locale layout wraps this
            route, so nothing else provides one. */}
        <main id="main-content" className="container-page flex-1 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p
              aria-hidden="true"
              className="font-display text-8xl font-extrabold leading-none text-accent-fg sm:text-9xl"
            >
              404
            </p>

            <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              {dict.notFound.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {dict.notFound.lead}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href={localePath(defaultLocale, '/')} size="lg">
                {dict.notFound.home}
              </LinkButton>
              <LinkButton href={localePath(defaultLocale, '/search')} size="lg" variant="secondary">
                {dict.notFound.search}
              </LinkButton>
            </div>
          </div>

          <nav aria-labelledby="popular-heading" className="mx-auto mt-16 max-w-3xl">
            <h2
              id="popular-heading"
              className="text-center text-xs font-bold uppercase tracking-wider text-text-muted"
            >
              {dict.notFound.popular}
            </h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={localePath(defaultLocale, `/categories/${category.slug}`)}
                    className="inline-flex items-center rounded-sm border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
                  >
                    {t(category.name, defaultLocale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </body>
    </html>
  );
}
