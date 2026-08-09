import type { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { absoluteUrl } from '@/lib/site';

/**
 * Mapa strony generowana przy budowaniu.
 * Pomijamy adresy oznaczone jako noindex (koszyk, zamowienie, panel klienta),
 * bo nie niosa wartosci dla wyszukiwarek.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Data budowania - katalog jest statyczny, wiec to najlepsze przyblizenie
  // ostatniej modyfikacji tresci.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
      { url: absoluteUrl('/kategorie/'), changeFrequency: 'weekly', priority: 0.9 },
      { url: absoluteUrl('/pakiety/'), changeFrequency: 'monthly', priority: 0.8 },
      { url: absoluteUrl('/o-nas/'), changeFrequency: 'yearly', priority: 0.5 },
      { url: absoluteUrl('/pomoc/'), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl('/kontakt/'), changeFrequency: 'yearly', priority: 0.6 },
      { url: absoluteUrl('/dla-firm/'), changeFrequency: 'monthly', priority: 0.6 },
      { url: absoluteUrl('/regulamin/'), changeFrequency: 'yearly', priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/kategorie/${category.slug}/`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/produkty/${product.slug}/`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
