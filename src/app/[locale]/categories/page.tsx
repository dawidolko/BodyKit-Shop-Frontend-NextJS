import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { absoluteLocaleUrl, canonicalUrl, ogImage, seoTitle } from '@/lib/site';
import { t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: seoTitle(dict.catalog.title, locale),
    description: dict.catalog.description,
    alternates: {
      canonical: canonicalUrl(locale, '/categories'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/categories')]),
      ),
    },
    openGraph: {
      images: [ogImage],
      url: absoluteLocaleUrl(locale, '/categories'),
      title: seoTitle(dict.catalog.title, locale).absolute,
      description: dict.catalog.description,
    },
  };
}

export default async function CategoriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: '/categories', label: dict.catalog.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.catalog.title} description={dict.catalog.description} />

      <ul className="grid gap-px md:grid-cols-2">
        {categories.map((category, index) => {
          const count = getProductsByCategory(category.slug).length;
          return (
            <li key={category.slug}>
              <Link
                href={localePath(locale, `/categories/${category.slug}`)}
                className="group grid h-full bg-surface focus-visible:relative focus-visible:z-10 focus-visible:-outline-offset-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
              >
                <Picture
                  name={category.image}
                  alt=""
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                  priority={index < 2}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-500 ease-out-quint group-hover:scale-[1.03]"
                />
                <div className="flex flex-col border-t-2 border-border-strong p-4 sm:border-l-2 sm:border-t-0 lg:p-5">
                  <span className="type-data flex justify-between gap-3 text-sm text-text-muted">
                    <span>{category.code}</span>
                    <span>{dict.catalog.productCount(count)}</span>
                  </span>
                  <h2 className="type-display-md mt-3 text-text-primary">
                    {t(category.name, locale)}
                  </h2>
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {t(category.description, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-3 text-sm font-bold text-text-brand underline underline-offset-4"
                  >
                    {dict.catalog.goToCategory}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
