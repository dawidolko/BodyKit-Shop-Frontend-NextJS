import type { Locale } from '@/i18n/config';
import { defaultLocale, localePath } from '@/i18n/config';

/** Site-wide constants — one source of truth for SEO and contact details. */
export const site = {
  name: 'BodyKit Shop',
  shortName: 'BodyKit',
  /** Production address — overridden by an environment variable in the workflow. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bodykit.dawidolko.pl',
  email: 'contact@bodykitshop.pl',
  phone: '+48 17 812 34 56',
  phoneHref: '+48178123456',
  address: {
    street: 'ul. Warsztatowa 12',
    postalCode: '35-001',
    city: 'Rzeszów',
    country: 'PL',
  },
  openingHours: 'Mo-Fr 08:00-17:00',
} as const;

/** Builds an absolute URL — required in Open Graph tags and structured data. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Absolute URL for a locale-prefixed route. */
export function absoluteLocaleUrl(locale: Locale, path = '/'): string {
  return absoluteUrl(localePath(locale, path));
}

/**
 * Canonical URL of a localized page.
 *
 * Each language variant is canonical to itself. Pointing every locale at the
 * default one would tell search engines the other language is a duplicate and
 * keep it out of the index - the opposite of what hreflang is for.
 */
export function canonicalUrl(locale: Locale, path = '/'): string {
  return absoluteLocaleUrl(locale, path);
}

/** Canonical URL for pages that exist outside the locale segments (e.g. the root). */
export function defaultCanonicalUrl(path = '/'): string {
  return absoluteLocaleUrl(defaultLocale, path);
}
