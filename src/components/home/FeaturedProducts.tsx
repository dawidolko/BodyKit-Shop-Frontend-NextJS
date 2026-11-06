import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/*
 * Nine parts on purpose: the lead tile takes four cells of a four-column grid,
 * so eight more fill three full rows on desktop and pair up on a phone.
 */
const WALL_SIZE = 9;

export function FeaturedProducts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [lead, ...rest] = getFeaturedProducts(WALL_SIZE);

  return (
    <section aria-labelledby="featured-heading">
      <header className="container-page flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-5 pt-10">
        <div>
          <p className="index-tab">{dict.home.featuredEyebrow}</p>
          <h2 id="featured-heading" className="type-display-lg mt-2">
            {dict.home.featuredHeading}
          </h2>
        </div>
        <Link
          href={localePath(locale, '/search')}
          className="font-semibold text-text-brand underline underline-offset-4 focus-ring"
        >
          {dict.home.featuredLink}
        </Link>
      </header>

      <ul className="grid grid-cols-2 gap-px bg-border-subtle lg:grid-cols-4">
        {lead && (
          <li className="col-span-2 flex lg:row-span-2">
            <ProductCard product={lead} locale={locale} dict={dict} lead className="w-full" />
          </li>
        )}
        {rest.map((product) => (
          <li key={product.slug} className="flex">
            <ProductCard product={product} locale={locale} dict={dict} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
