import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon, ShieldIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Współpraca B2B dla warsztatów',
  description:
    'Rabaty progowe, odroczony termin płatności i wsparcie techniczne dla warsztatów, detailingu i firm zajmujących się modyfikacją nadwozia.',
  alternates: { canonical: '/dla-firm/' },
  openGraph: { url: absoluteUrl('/dla-firm/'), title: 'Dla firm — BodyKit Shop' },
};

const tiers = [
  {
    name: 'Partner',
    threshold: 'od 5 000 zł / kwartał',
    discount: '8%',
    perks: ['Rabat 8% na cały asortyment', 'Priorytetowa wysyłka', 'Wsparcie techniczne e-mail'],
  },
  {
    name: 'Partner Plus',
    threshold: 'od 15 000 zł / kwartał',
    discount: '14%',
    perks: [
      'Rabat 14% na cały asortyment',
      'Odroczony termin płatności 14 dni',
      'Dedykowany opiekun handlowy',
      'Materiały ekspozycyjne do warsztatu',
    ],
    featured: true,
  },
  {
    name: 'Dystrybutor',
    threshold: 'indywidualnie',
    discount: 'do 25%',
    perks: [
      'Warunki ustalane indywidualnie',
      'Odroczony termin płatności 30 dni',
      'Dostęp do produktów przed premierą',
      'Wsparcie przy zamówieniach specjalnych',
    ],
  },
];

const benefits = [
  {
    icon: TruckIcon,
    title: 'Wysyłka bezpośrednio do klienta',
    text: 'Możemy wysłać zamówienie pod adres Twojego klienta, w neutralnym opakowaniu i z Twoimi dokumentami.',
  },
  {
    icon: WrenchIcon,
    title: 'Wsparcie przy nietypowym montażu',
    text: 'Jeśli trafisz na auto po wcześniejszych modyfikacjach, nasz dział techniczny pomoże dobrać rozwiązanie.',
  },
  {
    icon: ShieldIcon,
    title: 'Uproszczona ścieżka reklamacji',
    text: 'Zgłoszenia od partnerów rozpatrujemy w 3 dni robocze, bez konieczności odsyłania towaru przed decyzją.',
  },
];

export default function BusinessPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/dla-firm/', label: 'Dla firm' }]} />
      <PageHeader
        title="Współpraca B2B"
        description="Program partnerski dla warsztatów, studiów detailingu i firm zajmujących się modyfikacją nadwozia."
      />

      <div className="container-page pb-8">
        <Picture
          name="business-fleet"
          alt="Samochody przygotowane do modyfikacji w profesjonalnym warsztacie"
          sizes="(min-width: 1536px) 88rem, 95vw"
          priority
          className="rounded-lg border border-border-subtle"
        />
      </div>

      <section aria-labelledby="tiers-heading" className="container-page py-12">
        <h2 id="tiers-heading" className="text-2xl font-extrabold uppercase tracking-tight">
          Progi rabatowe
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Rabat naliczamy na podstawie obrotu z poprzedniego kwartału. Nie ma opłat wstępnych ani
          zobowiązania do minimalnych zamówień.
        </p>

        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <li
              key={tier.name}
              className={`flex flex-col rounded-md border bg-surface p-6 ${
                tier.featured ? 'border-border-brand shadow-(--shadow-md)' : 'border-border-subtle'
              }`}
            >
              {tier.featured && (
                <p className="mb-3 inline-flex self-start rounded-xs bg-accent px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-text-on-brand">
                  Najczęściej wybierany
                </p>
              )}
              <h3 className="text-lg font-bold text-text-primary">{tier.name}</h3>
              <p className="mt-1 text-xs text-text-muted">{tier.threshold}</p>
              <p className="mt-4 font-display text-4xl font-extrabold text-accent-fg">
                {tier.discount}
              </p>
              <p className="text-xs uppercase tracking-wider text-text-muted">rabatu</p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2.5 text-sm text-text-secondary">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                    {perk}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="benefits-heading"
        className="border-y border-border-subtle bg-bg-subtle"
      >
        <div className="container-page py-14">
          <h2 id="benefits-heading" className="text-2xl font-extrabold uppercase tracking-tight">
            Co jeszcze dostajesz
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="flex size-11 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="apply-heading" className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="apply-heading" className="text-2xl font-extrabold uppercase tracking-tight">
            Jak dołączyć
          </h2>
          <ol className="mt-8 flex flex-col gap-5 text-left">
            {[
              'Napisz do nas z formularza kontaktowego, podając NIP i profil działalności.',
              'Odsyłamy formularz rejestracyjny i cennik partnerski w ciągu jednego dnia roboczego.',
              'Po weryfikacji dostajesz dostęp do panelu z cenami netto i historią zamówień.',
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-text-on-brand">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-text-secondary">{step}</span>
              </li>
            ))}
          </ol>

          <LinkButton href="/kontakt/" size="lg" className="mt-10">
            Złóż wniosek o współpracę
          </LinkButton>
        </div>
      </section>
    </>
  );
}
