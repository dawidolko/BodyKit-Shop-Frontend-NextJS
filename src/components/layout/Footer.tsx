import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { categories } from '@/lib/categories';
import { MailIcon, PhoneIcon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

const linkClass = 'text-sm text-text-secondary transition-colors hover:text-sky focus-ring';

/**
 * Laid out as the title block of an engineering drawing: every group of
 * information sits in a ruled cell, with the guarantees as a row of revisions.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const href = (path: string) => localePath(locale, path);

  const columns = [
    {
      title: dict.footer.columns.shop,
      links: [
        { href: '/categories', label: dict.footer.links.allCategories },
        { href: '/search', label: dict.footer.links.search },
        { href: '/packages', label: dict.footer.links.packages },
        { href: '/business', label: dict.footer.links.businessOffer },
      ],
    },
    {
      title: dict.footer.columns.customerService,
      links: [
        { href: '/help', label: dict.footer.links.help },
        { href: '/contact', label: dict.footer.links.contact },
        { href: '/account', label: dict.footer.links.account },
        { href: '/terms', label: dict.footer.links.terms },
      ],
    },
    {
      title: dict.footer.columns.company,
      links: [
        { href: '/about', label: dict.footer.links.about },
        { href: '/business', label: dict.footer.links.business },
        { href: '/style-guide', label: dict.footer.links.styleGuide },
      ],
    },
  ];

  return (
    <footer className="livery">
      <div aria-hidden="true" className="hazard-tape h-2.5" />

      <div className="mx-auto max-w-[90rem] md:px-6">
        <div className="grid border-border-default sm:grid-cols-2 md:border-x lg:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))]">
          <div className="border-b border-border-default p-5 sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-r">
            <Logo className="h-11 w-auto text-text-primary" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {dict.footer.tagline}
            </p>
            <address className="mt-5 flex flex-col gap-2 text-sm not-italic text-text-secondary">
              <a
                href={`tel:${site.phoneHref}`}
                className={`flex items-center gap-2.5 ${linkClass}`}
              >
                <PhoneIcon className="size-4 text-text-muted" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className={`flex items-center gap-2.5 ${linkClass}`}>
                <MailIcon className="size-4 text-text-muted" />
                {site.email}
              </a>
              <p className="text-text-muted">
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </p>
            </address>
          </div>

          <nav
            aria-label={dict.nav.categoriesLabel}
            className="border-b border-border-default p-5 sm:border-r lg:border-b-0"
          >
            <h2 className="font-sans text-sm font-bold not-italic text-text-muted">
              {dict.nav.categoriesLabel}
            </h2>
            <ul className="mt-3 flex flex-col">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={href(`/categories/${category.slug}`)}
                    className={`inline-flex min-h-7 items-center ${linkClass}`}
                  >
                    {t(category.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {columns.map((column, index) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={`border-b border-border-default p-5 lg:border-b-0 ${
                index < columns.length - 1 ? 'lg:border-r' : ''
              } ${index === 1 ? 'sm:border-r' : ''}`}
            >
              <h2 className="font-sans text-sm font-bold not-italic text-text-muted">
                {column.title}
              </h2>
              <ul className="mt-3 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={href(link.href)}
                      className={`inline-flex min-h-7 items-center ${linkClass}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <ul className="grid border-border-default sm:grid-cols-3 md:border-x lg:border-t">
          {dict.footer.guarantees.map((guarantee, index) => (
            <li
              key={guarantee.title}
              className={`border-b border-border-default p-5 lg:border-b-0 ${
                index > 0 ? 'sm:border-l' : ''
              }`}
            >
              <p className="type-display text-lg text-text-primary">{guarantee.title}</p>
              <p className="mt-1 text-sm text-text-muted">{guarantee.text}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 border-border-default p-5 text-xs text-text-muted sm:flex-row sm:justify-between md:border lg:mb-6">
          <p>{dict.footer.copyright(new Date().getFullYear())}</p>
          <p>{dict.footer.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
