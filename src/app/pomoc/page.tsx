import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { LinkButton } from '@/components/ui/Button';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Centrum pomocy i FAQ',
  description:
    'Odpowiedzi na pytania o dopasowanie części, montaż, materiały, dostawę, zwroty i gwarancję w BodyKit Shop.',
  alternates: { canonical: '/pomoc/' },
  openGraph: { url: absoluteUrl('/pomoc/'), title: 'Centrum pomocy — BodyKit Shop' },
};

const faqGroups = [
  {
    id: 'dopasowanie',
    title: 'Dopasowanie i dobór części',
    items: [
      {
        q: 'Skąd mam wiedzieć, czy część pasuje do mojego auta?',
        a: 'Na karcie każdego produktu jest sekcja „Pasuje do” z listą marek, modeli i przedziałów rocznikowych. Podajemy tam wersję nadwozia (np. G20, ND), bo różnice między liftem a przedliftem potrafią wykluczyć montaż. Jeśli Twojego auta nie ma na liście — napisz do nas, sprawdzimy u producenta.',
      },
      {
        q: 'Mam wersję M-Pakiet / S-Line. Czy to ma znaczenie?',
        a: 'Ma, i to bardzo duże. Pakiety sportowe zmieniają kształt zderzaka, więc dokładka pod wersję podstawową nie przylegnie. W opisach rozróżniamy te warianty. Jeśli w nazwie produktu nie ma dopisku o pakiecie, część jest przeznaczona do zderzaka standardowego.',
      },
      {
        q: 'Czy mogę połączyć elementy z różnych serii?',
        a: 'Technicznie tak, ale rzadko wygląda to dobrze. Splitter z jednej linii i dyfuzor z innej mają różne kąty załamania i grubości krawędzi. Jeśli planujesz komplet, napisz — podpowiemy, które elementy tworzą spójną całość.',
      },
    ],
  },
  {
    id: 'materialy',
    title: 'Materiały i wykonanie',
    items: [
      {
        q: 'Czym różni się ABS od FRP i karbonu?',
        a: 'ABS to tworzywo elastyczne, odporne na uderzenia i tanie w naprawie — najlepszy wybór do codziennej jazdy. FRP (laminat szklany) jest sztywniejszy i lżejszy, ale kruchy przy kontakcie z krawężnikiem; sprawdza się na torze. Karbon jest najlżejszy i najdroższy, ma widoczny splot i lakier UV, ale uszkodzenie oznacza kosztowną naprawę.',
      },
      {
        q: 'Czy elementy wymagają lakierowania?',
        a: 'Zależy od wykończenia. Warianty „czarny połysk” i „czarny mat” są gotowe do montażu. Wariant „pod lakier” ma nałożony podkład i wymaga lakierowania w kolorze nadwozia. Karbon jest zabezpieczony lakierem bezbarwnym z filtrem UV i nie wymaga dodatkowej obróbki.',
      },
      {
        q: 'Czy karbon żółknie z czasem?',
        a: 'Nielakierowana żywica epoksydowa żółknie pod wpływem promieniowania UV. Wszystkie nasze elementy karbonowe mają lakier z filtrem UV, który temu zapobiega. Przy myciu unikaj środków na bazie rozpuszczalników.',
      },
    ],
  },
  {
    id: 'montaz',
    title: 'Montaż',
    items: [
      {
        q: 'Czy montaż wymaga wiercenia?',
        a: 'W większości produktów nie — używamy punktów fabrycznych i taśmy 3M VHB. Wyjątkiem są elementy torowe (np. splitter Track Lip Aero) i poszerzenia widebody, gdzie wiercenie jest konieczne. Zawsze piszemy o tym w sekcji „Dane techniczne”, w wierszu „Montaż”.',
      },
      {
        q: 'Czy dam radę zamontować to samodzielnie?',
        a: 'Dokładki montowane na taśmę i punkty fabryczne to zadanie na 30-60 minut przy podstawowych narzędziach. Elementy wymagające wiercenia albo demontażu zderzaka lepiej zostawić warsztatowi — błąd na tym etapie jest trudny do odkręcenia.',
      },
      {
        q: 'W jakiej temperaturze montować taśmę 3M?',
        a: 'Powyżej 15°C, na odtłuszczonej i suchej powierzchni. Poniżej 10°C klej nie osiągnie pełnej przyczepności. Po montażu unikaj mycia myjką ciśnieniową przez 72 godziny — to czas potrzebny na pełne związanie.',
      },
    ],
  },
  {
    id: 'zamowienia',
    title: 'Zamówienia, dostawa i zwroty',
    items: [
      {
        q: 'Ile trwa wysyłka?',
        a: 'Produkty oznaczone jako dostępne wysyłamy w 24-48 godzin. Elementy karbonowe i produkowane na zamówienie mają podany czas realizacji na karcie produktu — od 5 do 21 dni roboczych.',
      },
      {
        q: 'Czy mogę zwrócić zamówiony towar?',
        a: 'Tak, masz 14 dni na odstąpienie od umowy bez podania przyczyny. Warunek: produkt nie może być lakierowany ani montowany. Elementy przygotowane na indywidualne zamówienie nie podlegają zwrotowi — informujemy o tym przed zakupem.',
      },
      {
        q: 'Co obejmuje gwarancja?',
        a: 'Dajemy 24 miesiące gwarancji na wady materiałowe i wykonanie: rozwarstwienie laminatu, pęcherze w lakierze, odkształcenia niewynikające z eksploatacji. Gwarancja nie obejmuje uszkodzeń mechanicznych, w tym kontaktu z krawężnikiem czy progiem zwalniającym.',
      },
    ],
  },
];

export default function HelpPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    ),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[{ href: '/pomoc/', label: 'Pomoc' }]} />
      <PageHeader
        title="Centrum pomocy"
        description="Najczęstsze pytania o dobór części, materiały, montaż i zwroty. Jeśli nie znajdziesz odpowiedzi — napisz albo zadzwoń."
      />

      <div className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          {/* Spis treści */}
          <nav aria-label="Sekcje pomocy" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Na tej stronie
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-md border border-border-subtle bg-bg-subtle p-5">
              <p className="text-sm font-semibold text-text-primary">Nie ma Twojego pytania?</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Dział techniczny odbiera telefon do 17:00.
              </p>
              <LinkButton href="/kontakt/" variant="secondary" size="sm" className="mt-4">
                Kontakt
              </LinkButton>
            </div>
          </nav>

          {/* Pytania */}
          <div className="flex flex-col gap-12">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
                <h2
                  id={`${group.id}-heading`}
                  className="text-xl font-extrabold uppercase tracking-tight"
                >
                  {group.title}
                </h2>

                <div className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-md border border-border-subtle bg-surface open:border-border-brand"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-5 text-sm font-semibold text-text-primary marker:content-none focus-ring">
                        {item.q}
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-lg leading-none text-accent-fg transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="border-t border-border-subtle px-5 py-4 text-sm leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            <section
              aria-labelledby="more-help"
              className="rounded-md border border-border-subtle bg-bg-subtle p-6"
            >
              <h2 id="more-help" className="text-lg font-bold uppercase tracking-wide">
                Przydatne linki
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li>
                  <Link href="/regulamin/" className="text-sm text-text-brand underline focus-ring">
                    Regulamin, zwroty i reklamacje
                  </Link>
                </li>
                <li>
                  <Link href="/dla-firm/" className="text-sm text-text-brand underline focus-ring">
                    Współpraca dla warsztatów
                  </Link>
                </li>
                <li>
                  <Link href="/pakiety/" className="text-sm text-text-brand underline focus-ring">
                    Gotowe pakiety montażowe
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt/" className="text-sm text-text-brand underline focus-ring">
                    Formularz kontaktowy
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
