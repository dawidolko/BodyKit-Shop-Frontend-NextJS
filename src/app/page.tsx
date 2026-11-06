import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTENT_SECURITY_POLICY } from '@/lib/csp';
import { defaultLocale, locales, localePath, localeNames, localeTags } from '@/i18n/config';
import { defaultCanonicalUrl } from '@/lib/site';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'BodyKit Shop',
  alternates: { canonical: defaultCanonicalUrl('/') },
  /*
   * No `robots: { index: false }` here, deliberately.
   *
   * The root is a redirect stop and must not be indexed in its own right, but
   * the canonical above already says so — it points at the default locale, so
   * Google folds this URL into that page instead of treating it as a separate
   * one. Declaring `noindex` as well is the combination Google documents as
   * conflicting: the directive can travel along the canonical and take the
   * page it points at down with it. Search Console reported this URL as
   * "excluded by noindex tag", which is the first half of that going wrong.
   */
};

const target = asset(localePath(defaultLocale));

/**
 * Root entry point.
 *
 * A static export has no server to issue a 3xx, so the redirect happens in the
 * document: a meta refresh covers crawlers and users with JavaScript disabled,
 * while the inline script makes it instant and keeps the root out of session
 * history. Visible links are the fallback if both are blocked.
 *
 * The page loads no stylesheet on purpose. An inline script waits for pending
 * stylesheets, and every millisecond here delays the first paint of the shop.
 */
export default function RootPage() {
  return (
    <html lang={localeTags[defaultLocale]}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)})`,
          }}
        />
      </head>
      <body
        style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '20vh 1rem' }}
      >
        <main>
          <h1>BodyKit Shop</h1>
          <p>Choose your language · Wybierz język</p>
          <nav aria-label="Language">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {locales.map((locale) => (
                <li key={locale}>
                  <Link
                    href={localePath(locale)}
                    hrefLang={locale}
                    style={{ display: 'inline-block', padding: '0.75rem' }}
                  >
                    {localeNames[locale]}
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
