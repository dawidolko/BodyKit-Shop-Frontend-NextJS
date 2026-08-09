import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Sciezki transakcyjne i panel klienta nie maja wartosci w wynikach
        // wyszukiwania, a ich indeksowanie tylko rozmywa mape serwisu.
        disallow: ['/koszyk/', '/zamowienie/', '/konto/', '/szukaj/', '/style-guide/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
