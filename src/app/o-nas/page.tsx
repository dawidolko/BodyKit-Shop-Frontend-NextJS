import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icon';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'O nas',
  description:
    'BodyKit Shop — skąd wziął się pomysł na sklep, jak dobieramy produkty i dlaczego opisujemy dopasowanie przez konkretne roczniki.',
  alternates: { canonical: '/o-nas/' },
  openGraph: { url: absoluteUrl('/o-nas/'), title: 'O nas — BodyKit Shop' },
};

const values = [
  {
    title: 'Dopasowanie zamiast „uniwersalności”',
    text: 'Każdy produkt ma listę modeli i roczników. Jeśli czegoś nie ma na liście, mówimy o tym wprost, zamiast pisać „pasuje do większości aut”.',
  },
  {
    title: 'Opis, który mówi prawdę o montażu',
    text: 'Podajemy, czy trzeba wiercić, ile trwa montaż i co jest w zestawie. Wiercenie w belce zderzaka to nie to samo co taśma 3M — i klient powinien wiedzieć o tym przed zakupem.',
  },
  {
    title: 'Materiał dobrany do zastosowania',
    text: 'ABS na co dzień, FRP na tor, karbon gdy liczy się masa i wygląd. Nie sprzedajemy karbonu tam, gdzie nie ma z niego korzyści.',
  },
];

const milestones = [
  { year: '2019', text: 'Pierwsze zamówienia realizowane z garażu w Rzeszowie.' },
  { year: '2021', text: 'Własny magazyn i stała współpraca z trzema producentami z UE.' },
  { year: '2023', text: 'Uruchomienie działu technicznego i instrukcji montażu po polsku.' },
  { year: '2026', text: 'Ponad 2 400 zrealizowanych zamówień i 38 obsługiwanych modeli.' },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/o-nas/', label: 'O nas' }]} />
      <PageHeader
        title="O BodyKit Shop"
        description="Zaczęliśmy od własnych aut i frustracji, że zamówiona dokładka nie przylegała do zderzaka. Dziś prowadzimy sklep, w którym dopasowanie jest opisane, a nie obiecane."
      />

      <div className="container-page pb-8">
        <Picture
          name="about-workshop"
          alt="Samochody z poszerzeniami nadwozia w hali warsztatowej"
          sizes="(min-width: 1536px) 88rem, 95vw"
          priority
          className="rounded-lg border border-border-subtle"
        />
      </div>

      <section aria-labelledby="story-heading" className="container-page py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-2xl">
            <h2 id="story-heading" className="text-2xl font-extrabold uppercase tracking-tight">
              Jak to się zaczęło
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
              <p>
                W 2019 roku zamówiliśmy splitter do prywatnego auta. Opis mówił „pasuje do serii 3”.
                Po rozpakowaniu okazało się, że element zaprojektowano pod inny wariant zderzaka —
                różnica wynosiła kilkanaście milimetrów, ale wystarczyła, żeby dokładka nie
                przylegała na całej długości.
              </p>
              <p>
                Warsztat wycenił dopasowanie na więcej niż kosztowała sama część. Wtedy
                zrozumieliśmy, na czym polega problem tej branży: sprzedaje się kształt, a nie
                dopasowanie. Opisy są ogólne, bo ogólny opis pasuje do większej liczby wyszukiwań.
              </p>
              <p>
                BodyKit Shop zbudowaliśmy odwrotnie. Każdy produkt ma listę konkretnych modeli i
                przedziałów rocznikowych. Jeśli części nie testowaliśmy na danym aucie, nie ma go na
                liście — nawet jeśli teoretycznie mogłaby pasować.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-extrabold uppercase tracking-tight">
              Czym się kierujemy
            </h2>
            <ul className="mt-6 flex flex-col gap-6">
              {values.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <CheckIcon className="mt-1 size-5 shrink-0 text-accent-fg" />
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{value.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{value.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Kamienie milowe
              </h2>
              <ol className="mt-5 flex flex-col gap-5">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4">
                    <span className="font-display text-lg font-extrabold text-accent-fg">
                      {milestone.year}
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {milestone.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 rounded-md border border-border-subtle bg-bg-subtle p-6">
              <p className="text-sm leading-relaxed text-text-secondary">
                Masz auto, którego nie ma na naszych listach dopasowania? Napisz — sprawdzimy u
                producenta i odpiszemy nawet, jeśli okaże się, że nic nie pasuje.
              </p>
              <LinkButton href="/kontakt/" variant="secondary" size="sm" className="mt-4">
                Napisz do nas
              </LinkButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
