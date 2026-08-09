import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { MailIcon, PhoneIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/contact';

/**
 * Icons for the department list. Only the structural part lives here - the
 * titles, descriptions and addresses come from the dictionary and are zipped
 * with this array by index.
 */
const departmentIcons = [WrenchIcon, TruckIcon, MailIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.contact.title,
    description: dict.contact.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.contact.title} — ${site.name}`,
      description: dict.contact.description,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `${dict.contact.title} — ${site.name}`,
    url: absoluteLocaleUrl(locale, PATH),
    mainEntity: {
      '@type': 'Organization',
      name: site.name,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
      contactPoint: dict.contact.departments.map((department) => ({
        '@type': 'ContactPoint',
        contactType: department.title,
        email: department.email,
        availableLanguage: [...locales],
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ href: PATH, label: dict.nav.contact }]} locale={locale} dict={dict} />
      <PageHeader title={dict.contact.title} description={dict.contact.description} />

      <div className="container-page pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">
              {dict.contact.formHeading}
            </h2>
            <ContactForm locale={locale} />
          </section>

          <aside className="flex flex-col gap-5">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.contact.directContact}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 rounded-xs text-sm font-medium text-text-primary hover:text-text-brand focus-ring"
                >
                  <PhoneIcon className="size-4 text-text-muted" />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-xs text-sm font-medium text-text-primary hover:text-text-brand focus-ring"
                >
                  <MailIcon className="size-4 text-text-muted" />
                  {site.email}
                </a>
              </div>

              <div className="mt-5 border-t border-border-subtle pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  {dict.contact.openingHours}
                </p>
                <p className="mt-2 text-sm text-text-secondary">{dict.contact.hoursValue}</p>
                <p className="mt-1 text-xs text-text-muted">{dict.contact.hoursNote}</p>
              </div>

              <address className="mt-5 border-t border-border-subtle pt-4 text-sm not-italic leading-relaxed text-text-secondary">
                <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  {dict.contact.address}
                </p>
                <p className="mt-2">
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </p>
              </address>
            </div>

            <div className="rounded-md border border-border-subtle bg-bg-subtle p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.contact.departmentsHeading}
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {dict.contact.departments.map((department, index) => {
                  const Icon = departmentIcons[index] ?? MailIcon;
                  return (
                    <li key={department.email}>
                      <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                        <Icon className="size-4 text-accent-fg" />
                        {department.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">
                        {department.text}
                      </p>
                      <a
                        href={`mailto:${department.email}`}
                        className="mt-1 inline-block rounded-xs text-xs font-medium text-text-brand underline focus-ring"
                      >
                        {department.email}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
