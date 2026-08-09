import Link from 'next/link';
import { Picture } from '@/components/ui/Picture';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { categories } from '@/lib/categories';

export function CategoryGrid() {
  return (
    <section aria-labelledby="kategorie-heading" className="container-page py-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-brand">Katalog</p>
          <h2 id="kategorie-heading" className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">
            Wybierz kategorię
          </h2>
        </div>
        <Link
          href="/kategorie/"
          className="group flex items-center gap-2 rounded-xs text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-text-brand focus-ring"
        >
          Wszystkie kategorie
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <li key={category.slug}>
            <Link
              href={`/kategorie/${category.slug}/`}
              className="group relative flex h-full flex-col overflow-hidden rounded-md border border-border-subtle bg-surface transition-[border-color,translate,box-shadow] duration-300 ease-(--ease-out-quint) hover:-translate-y-1 hover:border-border-brand hover:shadow-(--shadow-md) focus-ring"
            >
              <div className="relative overflow-hidden bg-bg-muted">
                <Picture
                  name={category.image}
                  alt=""
                  profile="category"
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  priority={index < 2}
                  imgClassName="transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-carbon-950/80 via-carbon-950/10 to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-bold leading-tight text-text-primary">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{category.tagline}</p>
                <span
                  aria-hidden="true"
                  className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-brand"
                >
                  Zobacz produkty
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
