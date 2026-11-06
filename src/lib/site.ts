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

/** The shared social card. The file is 1200x630, the size Open Graph consumers expect. */
export const ogImage = {
  url: absoluteUrl('/og-default.png'),
  width: 1200,
  height: 630,
  alt: site.name,
};

const titleHints: Record<Locale, string> = {
  en: 'car tuning parts',
  pl: 'części tuningowe',
};

/**
 * Builds a <title> that stays within the 30-60 characters shown in search results.
 * Short names get a descriptive middle part so they are not reported as thin titles.
 */
export function seoTitle(label: string, locale: Locale): { absolute: string } {
  const plain = `${label} — ${site.name}`;
  if (plain.length < 30) return { absolute: `${label} — ${titleHints[locale]} — ${site.name}` };
  return { absolute: plain.length > 60 ? label : plain };
}

/** Takes whole sentences up to the 160 characters a meta description can use. */
export function seoDescription(text: string, fallback = ''): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let result = '';
  for (const sentence of sentences) {
    if ((result + sentence).trim().length > 160) break;
    result += sentence;
  }
  result = result.trim();
  if (!result) return `${text.slice(0, 157).replace(/\s+\S*$/, '')}...`;
  if (result.length >= 70 || !fallback) return result;
  const joined = `${result} ${fallback}`;
  return joined.length <= 160 ? joined : `${joined.slice(0, 157).replace(/\s+\S*$/, '')}...`;
}
