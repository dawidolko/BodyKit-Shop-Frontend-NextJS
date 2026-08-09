import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { defaultLocale, locales, localePath, localeNames, localeTags } from '@/i18n/config';
import { defaultCanonicalUrl } from '@/lib/site';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'BodyKit Shop',
  alternates: { canonical: defaultCanonicalUrl('/') },
  // The root is only a redirect stop; the localized pages carry the content
  // that should be indexed.
  robots: { index: false, follow: true },
};

const target = asset(localePath(defaultLocale));

/**
 * Root entry point.
 *
 * A static export has no server to issue a 3xx, so the redirect happens in the
 * document: a meta refresh covers crawlers and users with JavaScript disabled,
 * while the inline script makes it instant and keeps the root out of session
 * history. Visible links are the fallback if both are blocked.
 */
export default function RootPage() {
  return (
    // This page sits outside the locale segments, so it carries its own
    // document shell. It is language-neutral by design - the visitor has not
    // chosen one yet - so lang falls back to the default locale.
    <html lang={localeTags[defaultLocale]}>
      <body>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)})`,
          }}
        />
        <div className="container-page flex min-h-dvh flex-col items-center justify-center gap-6 py-20 text-center">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">BodyKit Shop</h1>
          <p className="text-sm text-text-secondary">Choose your language · Wybierz język</p>
          <nav aria-label="Language">
            <ul className="flex gap-3">
              {locales.map((locale) => (
                <li key={locale}>
                  <Link
                    href={localePath(locale)}
                    hrefLang={locale}
                    className="inline-flex h-11 items-center rounded-sm border border-border-default px-6 text-sm font-semibold uppercase tracking-wide text-text-primary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
                  >
                    {localeNames[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </body>
    </html>
  );
}
