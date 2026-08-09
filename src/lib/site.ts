/** Stale konfiguracyjne serwisu - jedno zrodlo prawdy dla SEO i danych kontaktowych. */
export const site = {
  name: 'BodyKit Shop',
  shortName: 'BodyKit',
  /** Adres produkcyjny - nadpisywany zmienna srodowiskowa w workflow. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bodykit.dawidolko.pl',
  description:
    'Dokładki, splittery, spoilery i elementy karbonowe dopasowane do konkretnych modeli aut. Sprawdzone materiały, komplet montażowy i instrukcje po polsku.',
  locale: 'pl_PL',
  lang: 'pl',
  email: 'kontakt@bodykitshop.pl',
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

/** Buduje pelny adres bezwzgledny - wymagany w tagach OG i danych strukturalnych. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
