import type { Finish, Material, Product } from './types';

/** Prefiks dla zasobow statycznych - niezbedny przy publikacji w podkatalogu. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Sciezka do pliku w public/ z uwzglednieniem basePath. */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Laczy klasy CSS, pomijajac wartosci falszywe. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const priceFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 2,
});

/** Formatuje cene z groszy na czytelny zapis, np. 74900 -> "749,00 zl". */
export function formatPrice(grosze: number): string {
  return priceFormatter.format(grosze / 100);
}

/** Wartosc liczbowa w zlotowkach - do atrybutow schema.org. */
export function priceToNumber(grosze: number): string {
  return (grosze / 100).toFixed(2);
}

export const materialLabels: Record<Material, string> = {
  abs: 'ABS',
  carbon: 'Karbon',
  frp: 'FRP',
  pu: 'Poliuretan',
  aluminium: 'Aluminium',
};

export const finishLabels: Record<Finish, string> = {
  'gloss-black': 'Czarny połysk',
  'matte-black': 'Czarny mat',
  'carbon-gloss': 'Karbon połysk',
  'carbon-matte': 'Karbon mat',
  primed: 'Pod lakier',
};

export const badgeLabels: Record<Product['badges'][number], string> = {
  nowosc: 'Nowość',
  bestseller: 'Bestseller',
  promocja: 'Promocja',
  'ostatnie-sztuki': 'Ostatnie sztuki',
};

/** Procent obnizki, zaokraglony w dol - nie obiecujemy wiecej niz jest. */
export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.floor(((compareAtPrice - price) / compareAtPrice) * 100);
}

/** Deklinacja rzeczownika po liczebniku, np. 1 opinia / 2 opinie / 5 opinii. */
export function plural(count: number, one: string, few: string, many: string): string {
  if (count === 1) return one;
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return many;
  if (last >= 2 && last <= 4) return few;
  return many;
}

/**
 * Etykieta ceny na listingu. Gdy warianty roznia sie cena, pokazujemy
 * najnizsza z przedrostkiem "od", zeby nie obiecywac ceny, ktorej nie ma.
 */
export function getMinPriceLabel(product: Product): string {
  const prices = product.variants.map((variant) => product.price + variant.priceDelta);
  const min = Math.min(...prices);
  const hasRange = prices.some((price) => price !== min);
  return hasRange ? `od ${formatPrice(min)}` : formatPrice(min);
}

/** Czas dostawy jako czytelny tekst. */
export function shippingLabel(days: number): string {
  if (days <= 2) return 'Wysyłka w 24-48 h';
  if (days <= 7) return `Wysyłka w ${days} dni roboczych`;
  return `Realizacja ${days} dni roboczych`;
}
