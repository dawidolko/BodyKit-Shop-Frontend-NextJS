import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { LinkButton } from '@/components/ui/Button';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags, type Locale } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/help';

type FaqGroup = {
  id: string;
  title: string;
  items: { q: string; a: string }[];
};

/**
 * Long-form support copy. It lives here rather than in the dictionary because
 * it is page-specific documentation, not reusable UI wording - the dictionary
 * would grow by a few hundred lines that nothing else ever reads. The group
 * ids are shared across locales so in-page anchors survive a language switch.
 */
const faqGroups: Record<Locale, FaqGroup[]> = {
  en: [
    {
      id: 'fitment',
      title: 'Fitment and choosing parts',
      items: [
        {
          q: 'How do I know whether a part fits my car?',
          a: 'Every product page has a "Fits" section listing makes, models and model-year ranges. We name the body variant there (e.g. G20, ND), because the difference between a facelift and a pre-facelift can rule out fitting altogether. If your car is not on the list, write to us and we will check with the manufacturer.',
        },
        {
          q: 'I have the M Sport / S line version. Does that matter?',
          a: 'It matters a great deal. Sports packages change the bumper shape, so a part made for the base version will not sit flush. We distinguish these variants in the descriptions. If the product name carries no note about a package, the part is intended for the standard bumper.',
        },
        {
          q: 'Can I mix parts from different lines?',
          a: 'Technically yes, but it rarely looks right. A splitter from one line and a diffuser from another have different edge break angles and edge thicknesses. If you are planning a full set, write to us — we will tell you which parts form a consistent whole.',
        },
      ],
    },
    {
      id: 'materials',
      title: 'Materials and workmanship',
      items: [
        {
          q: 'What is the difference between ABS, FRP and carbon?',
          a: 'ABS is a flexible plastic, impact resistant and cheap to repair — the best choice for daily driving. FRP (glass fibre laminate) is stiffer and lighter, but brittle on kerb contact; it works well on track. Carbon is the lightest and most expensive, with a visible weave and UV clear coat, but damage means a costly repair.',
        },
        {
          q: 'Do the parts need painting?',
          a: 'It depends on the finish. The "gloss black" and "matte black" versions are ready to fit. The "primed for paint" version comes with primer applied and needs painting in your body colour. Carbon is protected with a UV-filtering clear coat and needs no further work.',
        },
        {
          q: 'Does carbon go yellow over time?',
          a: 'Unprotected epoxy resin yellows under UV radiation. All our carbon parts carry a UV-filtering clear coat that prevents this. When washing, avoid solvent-based products.',
        },
      ],
    },
    {
      id: 'fitting',
      title: 'Fitting',
      items: [
        {
          q: 'Does fitting require drilling?',
          a: 'For most products, no — we use factory mounting points and 3M VHB tape. The exceptions are track parts (e.g. the Track Lip Aero splitter) and widebody flares, where drilling is unavoidable. We always say so in the "Specifications" section, in the "Fitting" row.',
        },
        {
          q: 'Can I fit this myself?',
          a: 'Parts mounted on tape and factory points are a 30-60 minute job with basic tools. Parts that need drilling or bumper removal are better left to a workshop — a mistake at that stage is hard to undo.',
        },
        {
          q: 'At what temperature should 3M tape be applied?',
          a: 'Above 15°C, on a degreased and dry surface. Below 10°C the adhesive will not reach full bond strength. After fitting, avoid pressure washing for 72 hours — that is how long full curing takes.',
        },
      ],
    },
    {
      id: 'orders',
      title: 'Orders, delivery and returns',
      items: [
        {
          q: 'How long does shipping take?',
          a: 'Products marked as in stock ship within 24-48 hours. Carbon parts and made-to-order items list their lead time on the product page — anywhere from 5 to 21 business days.',
        },
        {
          q: 'Can I return an order?',
          a: 'Yes, you have 14 days to withdraw from the contract without giving a reason. The condition is that the product has not been painted or fitted. Items prepared to individual order cannot be returned — we say so before purchase.',
        },
        {
          q: 'What does the warranty cover?',
          a: 'We give a 24-month warranty on material and workmanship defects: laminate delamination, blisters in the coating, and deformation not caused by normal use. The warranty does not cover mechanical damage, including contact with a kerb or a speed bump.',
        },
      ],
    },
  ],
  pl: [
    {
      id: 'fitment',
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
      id: 'materials',
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
      id: 'fitting',
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
      id: 'orders',
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
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.help.title,
    description: dict.help.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.help.title} — ${site.name}`,
      description: dict.help.description,
    },
  };
}

export default async function HelpPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const groups = faqGroups[locale];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((group) =>
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
      <Breadcrumbs items={[{ href: PATH, label: dict.nav.help }]} locale={locale} dict={dict} />
      <PageHeader title={dict.help.title} description={dict.help.description} />

      <div className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          {/* Table of contents */}
          <nav aria-label={dict.help.onThisPage} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {dict.help.onThisPage}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {groups.map((group) => (
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
              <p className="text-sm font-semibold text-text-primary">{dict.help.noQuestion}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {dict.help.noQuestionText}
              </p>
              <LinkButton
                href={localePath(locale, '/contact')}
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                {dict.help.contact}
              </LinkButton>
            </div>
          </nav>

          {/* Questions */}
          <div className="flex flex-col gap-12">
            {groups.map((group) => (
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
                {dict.help.usefulLinks}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li>
                  <Link
                    href={localePath(locale, '/terms')}
                    className="text-sm text-text-brand underline focus-ring"
                  >
                    {dict.help.links.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, '/business')}
                    className="text-sm text-text-brand underline focus-ring"
                  >
                    {dict.help.links.business}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, '/packages')}
                    className="text-sm text-text-brand underline focus-ring"
                  >
                    {dict.help.links.packages}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, '/contact')}
                    className="text-sm text-text-brand underline focus-ring"
                  >
                    {dict.help.links.contactForm}
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
