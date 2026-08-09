import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { MailIcon, PhoneIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { absoluteUrl, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Skontaktuj się z BodyKit Shop — dobór części do konkretnego modelu, pytania o montaż, reklamacje i współpraca B2B.',
  alternates: { canonical: '/kontakt/' },
  openGraph: { url: absoluteUrl('/kontakt/'), title: 'Kontakt — BodyKit Shop' },
};

const departments = [
  {
    icon: WrenchIcon,
    title: 'Dział techniczny',
    text: 'Dobór części, dopasowanie do modelu, pytania o montaż.',
    contact: 'technika@bodykitshop.pl',
    href: 'mailto:technika@bodykitshop.pl',
  },
  {
    icon: TruckIcon,
    title: 'Zamówienia i wysyłka',
    text: 'Status zamówienia, zmiana adresu, terminy realizacji.',
    contact: 'zamowienia@bodykitshop.pl',
    href: 'mailto:zamowienia@bodykitshop.pl',
  },
  {
    icon: MailIcon,
    title: 'Reklamacje i zwroty',
    text: 'Zgłoszenia gwarancyjne i odstąpienie od umowy.',
    contact: 'reklamacje@bodykitshop.pl',
    href: 'mailto:reklamacje@bodykitshop.pl',
  },
];

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Kontakt — BodyKit Shop',
    url: absoluteUrl('/kontakt/'),
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
      contactPoint: departments.map((department) => ({
        '@type': 'ContactPoint',
        contactType: department.title,
        email: department.contact,
        availableLanguage: ['pl', 'en'],
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ href: '/kontakt/', label: 'Kontakt' }]} />
      <PageHeader
        title="Kontakt"
        description="Napisz, z czym masz problem — im więcej szczegółów o aucie, tym konkretniej odpowiemy."
      />

      <div className="container-page pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">
              Formularz kontaktowy
            </h2>
            <ContactForm />
          </section>

          <aside className="flex flex-col gap-5">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Kontakt bezpośredni
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
                  Godziny pracy
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Poniedziałek – piątek, 8:00 – 17:00
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  W weekendy odpisujemy na e-maile w pierwszy dzień roboczy.
                </p>
              </div>

              <address className="mt-5 border-t border-border-subtle pt-4 text-sm not-italic leading-relaxed text-text-secondary">
                <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Adres</p>
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
                Piszesz w konkretnej sprawie?
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {departments.map(({ icon: Icon, title, text, contact, href }) => (
                  <li key={title}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Icon className="size-4 text-accent-fg" />
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">{text}</p>
                    <a
                      href={href}
                      className="mt-1 inline-block rounded-xs text-xs font-medium text-text-brand underline focus-ring"
                    >
                      {contact}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
