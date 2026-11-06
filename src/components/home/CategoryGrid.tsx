import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { cn, t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/*
 * Tiles marked wide take two of the four columns. Spread this way, the eight
 * categories fill exactly three rows with the large photos staggered.
 */
const wideTiles = new Set([0, 5, 6, 7]);

export function CategoryGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="categories-heading" className="pt-14">
      <header className="container-page flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-5">
        <div>
          <p className="index-tab">{dict.home.categoriesEyebrow}</p>
          <h2 id="categories-heading" className="type-display-lg mt-2">
            {dict.home.categoriesHeading}
          </h2>
        </div>
        <Link
          href={localePath(locale, '/categories')}
          className="font-semibold text-text-brand underline underline-offset-4 focus-ring"
        >
          {dict.home.categoriesLink}
        </Link>
      </header>

      <ul className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {categories.map((category, index) => (
          <li key={category.slug} className={cn(wideTiles.has(index) && 'lg:col-span-2')}>
            <Link
              href={localePath(locale, `/categories/${category.slug}`)}
              className="group relative block h-44 overflow-hidden focus-visible:z-10 focus-visible:-outline-offset-4 sm:h-64 lg:h-80"
            >
              <Picture
                name={category.image}
                alt=""
                sizes={wideTiles.has(index) ? '50vw' : '(min-width: 1024px) 25vw, 50vw'}
                className="h-full w-full"
                imgClassName="transition-transform duration-500 ease-out-quint group-hover:scale-[1.03]"
              />
              <span className="livery absolute bottom-0 left-0 block max-w-[94%] py-2 pl-3 pr-6 [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_100%,0_100%)] sm:py-2.5 sm:pl-4 sm:pr-8">
                <span className="type-data flex gap-3 text-[0.8125rem] text-text-muted">
                  <span>{category.code}</span>
                  <span>
                    {dict.catalog.productCount(getProductsByCategory(category.slug).length)}
                  </span>
                </span>
                <span className="type-display block text-sm leading-tight text-text-primary sm:text-lg">
                  {t(category.name, locale)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
