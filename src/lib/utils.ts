import type { Locale } from '@/i18n/config';
import { localeTags } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Localized, Product } from './types';

/** Prefix for static assets — required when publishing under a sub-path. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Resolves a path inside public/ against the configured base path. */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Joins CSS class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Picks the value for the active locale out of a localized field. */
export function t<T>(field: Localized<T>, locale: Locale): T {
  return field[locale];
}

/**
 * Price formatters are cached per locale. Building an Intl.NumberFormat is
 * comparatively expensive, and product listings format dozens of prices.
 */
const priceFormatters = new Map<Locale, Intl.NumberFormat>();

function priceFormatter(locale: Locale): Intl.NumberFormat {
  let formatter = priceFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(localeTags[locale], {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
    });
    priceFormatters.set(locale, formatter);
  }
  return formatter;
}

/** Formats a price given in grosz, e.g. 74900 -> "749,00 zł" / "PLN 749.00". */
export function formatPrice(grosze: number, locale: Locale): string {
  return priceFormatter(locale).format(grosze / 100);
}

/** Numeric value in units, for schema.org attributes. */
export function priceToNumber(grosze: number): string {
  return (grosze / 100).toFixed(2);
}

/** Discount percentage, rounded down so we never promise more than we give. */
export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.floor(((compareAtPrice - price) / compareAtPrice) * 100);
}

/**
 * Listing price label. When variants differ in price we show the lowest one
 * prefixed with "from", so the headline price always exists somewhere.
 */
export function getMinPriceLabel(product: Product, locale: Locale, dict: Dictionary): string {
  const prices = product.variants.map((variant) => product.price + variant.priceDelta);
  const min = Math.min(...prices);
  const hasRange = prices.some((price) => price !== min);
  const formatted = formatPrice(min, locale);
  return hasRange ? `${dict.product.from} ${formatted}` : formatted;
}

/** Human-readable dispatch time. */
export function shippingLabel(days: number, dict: Dictionary): string {
  if (days <= 2) return dict.shipping.fast;
  if (days <= 7) return dict.shipping.days(days);
  return dict.shipping.leadTime(days);
}

/** Formats a date for the active locale. */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
