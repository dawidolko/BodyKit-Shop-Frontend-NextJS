import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { categories } from '@/lib/categories';
import { MailIcon, PhoneIcon, ShieldIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

const guaranteeIcons = [TruckIcon, ShieldIcon, WrenchIcon];

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
    <footer className="mt-24 border-t border-border-subtle bg-bg-subtle">
      {/* Guarantee strip */}
      <div className="border-b border-border-subtle">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          {dict.footer.guarantees.map((guarantee, index) => {
            const Icon = guaranteeIcons[index] ?? TruckIcon;
            return (
              <div key={guarantee.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">{guarantee.title}</p>
                  <p className="mt-0.5 text-sm text-text-muted">{guarantee.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 columns: the brand block spans 2, each navigation column takes 1 */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo className="h-10 w-auto text-text-primary" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
            {dict.footer.tagline}
          </p>

          <address className="mt-6 flex flex-col gap-2 text-sm not-italic text-text-secondary">
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2.5 rounded-xs hover:text-text-brand focus-ring"
            >
              <PhoneIcon className="size-4 text-text-muted" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 rounded-xs hover:text-text-brand focus-ring"
            >
              <MailIcon className="size-4 text-text-muted" />
              {site.email}
            </a>
            <p className="mt-1 text-text-muted">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
          </address>
        </div>

        <nav aria-label={dict.nav.categoriesLabel}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
            {dict.nav.categoriesLabel}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link
                  href={href(`/categories/${category.slug}`)}
                  className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                >
                  {t(category.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {column.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={href(link.href)}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.footer.copyright(new Date().getFullYear())}</p>
          <p>{dict.footer.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
