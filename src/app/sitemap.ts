import type { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { absoluteLocaleUrl } from '@/lib/site';
import { locales, localeTags, type Locale } from '@/i18n/config';

/**
 * Sitemap generated at build time.
 *
 * Routes marked noindex (cart, checkout, account, search, style guide) are left
 * out — they carry no value for search engines and only dilute the map. Every
 * remaining route is listed once per locale, with `alternates.languages`
 * pointing at its counterparts so crawlers can pair them up.
 */
export const dynamic = 'force-static';

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const staticRoutes: RouteConfig[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/categories', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/packages', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/help', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/business', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build date — the catalog is static, so this is the closest thing we have
  // to a real last-modified timestamp.
  const lastModified = new Date();

  const categoryRoutes: RouteConfig[] = categories.map((category) => ({
    path: `/categories/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: RouteConfig[] = products.map((product) => ({
    path: `/products/${product.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

  return allRoutes.flatMap((route) =>
    locales.map((locale: Locale) => ({
      url: absoluteLocaleUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, route.path)]),
        ),
      },
    })),
  );
}
