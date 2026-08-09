import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { getFeaturedProducts } from '@/lib/products';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function FeaturedProducts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = getFeaturedProducts(8);

  return (
    <section
      aria-labelledby="featured-heading"
      className="border-y border-border-subtle bg-bg-subtle"
    >
      <div className="container-page py-20">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-brand">
              {dict.home.featuredEyebrow}
            </p>
            <h2
              id="featured-heading"
              className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl"
            >
              {dict.home.featuredHeading}
            </h2>
          </div>
          <Link
            href={localePath(locale, '/search')}
            className="group flex items-center gap-2 rounded-xs text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-text-brand focus-ring"
          >
            {dict.home.featuredLink}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <li key={product.slug} className="flex">
              <ProductCard product={product} locale={locale} dict={dict} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
