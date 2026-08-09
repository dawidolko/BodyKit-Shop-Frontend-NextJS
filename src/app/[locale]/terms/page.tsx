import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/terms';

/** Date of the last edit, rendered through the locale-aware formatter. */
const LAST_UPDATED = '2026-08-01';

type TermsSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

/**
 * Legal copy. It stays in the page rather than the dictionary because nothing
 * else in the app reads it and it would double the dictionary size. The
 * section ids are shared across locales so in-page anchors survive a language
 * switch.
 */
const termsSections: Record<Locale, TermsSection[]> = {
  en: [
    {
      id: 'general',
      title: '1. General provisions',
      paragraphs: [
        `The ${site.name} online shop is operated at ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
        'These terms set out the rules for concluding sales contracts through the shop, the rights and obligations of both parties, and the complaints procedure.',
        'A customer may be a natural person with full legal capacity, a legal person, or an organisational unit without legal personality.',
      ],
    },
    {
      id: 'orders',
      title: '2. Placing orders',
      paragraphs: [
        'An order is placed by adding products to the cart and completing the order form. The sales contract is concluded once the shop confirms acceptance of the order.',
        'Prices shown in the shop are gross prices in Polish zloty and include VAT. The price does not cover delivery costs, which are shown before the order is placed.',
        'The shop reserves the right to refuse an order if stock runs out or a price is displayed in error — in that case the customer is informed without delay and any payment is refunded in full.',
      ],
    },
    {
      id: 'delivery',
      title: '3. Delivery and lead times',
      paragraphs: [
        'Products marked as in stock are dispatched within 24-48 business hours. Made-to-order products have an individual lead time stated on the product page.',
        'Delivery is handled by a courier company or to a pickup point chosen by the customer. Delivery costs start at 16.90 zł, and delivery is free on orders above 500 zł.',
        'We recommend inspecting the parcel in the courier presence. Noting any packaging damage in a report makes a later complaint easier to process, although it is not a condition of accepting one.',
      ],
    },
    {
      id: 'withdrawal',
      title: '4. Right of withdrawal',
      paragraphs: [
        'A consumer may withdraw from the contract without giving a reason within 14 days of taking possession of the goods. Sending the statement before the deadline is enough to meet it.',
        'Returned goods must show no signs of fitting and must not have been painted. The customer is liable for any diminished value of the goods resulting from handling them beyond what is necessary to establish their nature and functioning.',
        'The right of withdrawal does not apply to goods manufactured to the consumer specification or serving their individualised needs — this covers parts made to individual order, which we state before purchase.',
        'Payment is refunded within 14 days of receiving the statement, using the same payment method, unless the customer expressly agrees to another arrangement.',
      ],
    },
    {
      id: 'complaints',
      title: '5. Complaints and warranty',
      paragraphs: [
        'The shop gives a 24-month warranty on material and workmanship defects, including laminate delamination, blisters in the paint coating, and deformation not resulting from normal use.',
        'The warranty does not cover mechanical damage arising during use, in particular contact between the part and a kerb, a speed bump or the road surface, nor damage caused by incorrect fitting.',
        'Complaints can be submitted electronically to returns@bodykitshop.pl. We process them within 14 days of receipt, and within 3 business days for B2B partners.',
        'Regardless of the warranty, consumers retain the statutory warranty rights set out in the Civil Code.',
      ],
    },
    {
      id: 'fitting',
      title: '6. Fitting and liability',
      paragraphs: [
        'Products are intended to be fitted in line with the enclosed instructions. Parts requiring intervention in the body structure are best entrusted to a specialist workshop.',
        'Body modifications may require an entry in the vehicle registration document or a technical inspection. Verifying compliance with road traffic regulations is the responsibility of the vehicle owner.',
        'The shop is not liable for damage resulting from fitting that departs from the instructions, nor for the consequences of using a vehicle that does not meet type-approval requirements.',
      ],
    },
    {
      id: 'data',
      title: '7. Personal data protection',
      paragraphs: [
        `The data controller is ${site.name}, based in ${site.address.city}. Contact for data protection matters: ${site.email}.`,
        'Data is processed to fulfil the order (Art. 6(1)(b) GDPR), to meet tax obligations (point c), and in the legitimate interest of the controller, being complaint handling and the pursuit of claims (point f).',
        'Everyone has the right to access their data, to rectify, erase, restrict processing of, and port it, as well as the right to object, and the right to lodge a complaint with the President of the Personal Data Protection Office.',
        'Data is retained for as long as needed to perform the contract and for the period required by accounting rules and limitation periods for claims.',
      ],
    },
    {
      id: 'final',
      title: '8. Final provisions',
      paragraphs: [
        'Matters not covered by these terms are governed by Polish law, in particular the Civil Code and the Consumer Rights Act.',
        'A consumer may use out-of-court complaint and redress procedures, including the ODR platform available at ec.europa.eu/consumers/odr.',
        'The shop reserves the right to amend these terms. Orders placed before an amendment takes effect are governed by the terms in their previous wording.',
      ],
    },
  ],
  pl: [
    {
      id: 'general',
      title: '1. Postanowienia ogólne',
      paragraphs: [
        `Sklep internetowy ${site.name} prowadzony jest pod adresem ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
        'Regulamin określa zasady zawierania umów sprzedaży za pośrednictwem sklepu, prawa i obowiązki stron oraz tryb postępowania reklamacyjnego.',
        'Klientem może być osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna oraz jednostka organizacyjna nieposiadająca osobowości prawnej.',
      ],
    },
    {
      id: 'orders',
      title: '2. Składanie zamówień',
      paragraphs: [
        'Zamówienie składa się przez dodanie produktów do koszyka i wypełnienie formularza zamówienia. Umowa sprzedaży zostaje zawarta w chwili potwierdzenia przyjęcia zamówienia przez sklep.',
        'Ceny podane w sklepie są cenami brutto wyrażonymi w złotych polskich i zawierają podatek VAT. Cena nie obejmuje kosztów dostawy, które prezentowane są przed złożeniem zamówienia.',
        'Sklep zastrzega możliwość odmowy realizacji zamówienia w przypadku wyczerpania zapasów lub błędu w prezentacji ceny — w takiej sytuacji klient zostaje niezwłocznie poinformowany, a wpłacone środki zwrócone w całości.',
      ],
    },
    {
      id: 'delivery',
      title: '3. Dostawa i terminy',
      paragraphs: [
        'Produkty oznaczone jako dostępne wysyłane są w terminie 24-48 godzin roboczych. Produkty wykonywane na zamówienie mają indywidualny czas realizacji podany na karcie produktu.',
        'Dostawa realizowana jest przez firmę kurierską lub do punktu odbioru wybranego przez klienta. Koszt dostawy wynosi od 16,90 zł, a przy zamówieniach powyżej 500 zł dostawa jest bezpłatna.',
        'Zalecamy sprawdzenie przesyłki w obecności kuriera. Uszkodzenia opakowania warto odnotować w protokole — ułatwia to późniejsze rozpatrzenie reklamacji, choć nie jest warunkiem jej uwzględnienia.',
      ],
    },
    {
      id: 'withdrawal',
      title: '4. Prawo odstąpienia od umowy',
      paragraphs: [
        'Konsument może odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia objęcia towaru w posiadanie. Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem.',
        'Zwracany towar nie może nosić śladów montażu ani być lakierowany. Klient odpowiada za zmniejszenie wartości rzeczy wynikające z korzystania z niej w sposób wykraczający poza konieczny do stwierdzenia jej cech i funkcjonowania.',
        'Prawo odstąpienia nie przysługuje w odniesieniu do towarów wyprodukowanych według specyfikacji konsumenta lub służących zaspokojeniu jego zindywidualizowanych potrzeb — dotyczy to elementów wykonywanych na indywidualne zamówienie, o czym informujemy przed zakupem.',
        'Zwrot płatności następuje w terminie 14 dni od otrzymania oświadczenia, przy użyciu tego samego sposobu zapłaty, chyba że klient wyraźnie zgodzi się na inne rozwiązanie.',
      ],
    },
    {
      id: 'complaints',
      title: '5. Reklamacje i gwarancja',
      paragraphs: [
        'Sklep udziela 24-miesięcznej gwarancji na wady materiałowe i wykonawcze, w tym rozwarstwienie laminatu, pęcherze w powłoce lakierniczej oraz odkształcenia niewynikające z eksploatacji.',
        'Gwarancja nie obejmuje uszkodzeń mechanicznych powstałych w trakcie użytkowania, w szczególności kontaktu elementu z krawężnikiem, progiem zwalniającym lub nawierzchnią drogi, a także uszkodzeń powstałych wskutek nieprawidłowego montażu.',
        'Reklamację można złożyć drogą elektroniczną na adres reklamacje@bodykitshop.pl. Rozpatrujemy ją w terminie 14 dni od otrzymania zgłoszenia, a dla partnerów B2B w terminie 3 dni roboczych.',
        'Niezależnie od gwarancji konsumentowi przysługują uprawnienia z tytułu rękojmi określone w Kodeksie cywilnym.',
      ],
    },
    {
      id: 'fitting',
      title: '6. Montaż i odpowiedzialność',
      paragraphs: [
        'Produkty przeznaczone są do montażu zgodnie z dołączoną instrukcją. Elementy wymagające ingerencji w konstrukcję nadwozia zalecamy powierzyć wyspecjalizowanemu warsztatowi.',
        'Modyfikacje nadwozia mogą wymagać zgłoszenia w dowodzie rejestracyjnym lub uzyskania badania technicznego. Obowiązek weryfikacji zgodności z przepisami ruchu drogowego spoczywa na właścicielu pojazdu.',
        'Sklep nie ponosi odpowiedzialności za szkody wynikające z montażu niezgodnego z instrukcją ani za następstwa użytkowania pojazdu niespełniającego wymogów homologacyjnych.',
      ],
    },
    {
      id: 'data',
      title: '7. Ochrona danych osobowych',
      paragraphs: [
        `Administratorem danych osobowych jest ${site.name} z siedzibą w ${site.address.city}. Kontakt w sprawach ochrony danych: ${site.email}.`,
        'Dane przetwarzane są w celu realizacji zamówienia (art. 6 ust. 1 lit. b RODO), wypełnienia obowiązków podatkowych (lit. c) oraz w prawnie uzasadnionym interesie administratora, jakim jest obsługa reklamacji i dochodzenie roszczeń (lit. f).',
        'Każdej osobie przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
        'Dane przechowywane są przez okres niezbędny do realizacji umowy oraz przez czas wynikający z przepisów o rachunkowości i przedawnieniu roszczeń.',
      ],
    },
    {
      id: 'final',
      title: '8. Postanowienia końcowe',
      paragraphs: [
        'W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta.',
        'Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w tym platformy ODR dostępnej pod adresem ec.europa.eu/consumers/odr.',
        'Sklep zastrzega prawo do zmiany regulaminu. Do zamówień złożonych przed wejściem zmian w życie stosuje się regulamin w brzmieniu dotychczasowym.',
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
    title: dict.terms.title,
    description: dict.terms.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.terms.title} — ${site.name}`,
      description: dict.terms.description,
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const sections = termsSections[locale];

  return (
    <>
      <Breadcrumbs
        items={[{ href: PATH, label: dict.footer.links.terms }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.terms.title} description={dict.terms.description} />

      <div className="container-page pb-16">
        <div className="mb-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">{dict.terms.demoStrong}</strong>{' '}
            {dict.terms.demoNotice}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label={dict.terms.tocLabel} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {dict.terms.tableOfContents}
            </p>
            <ol className="mt-4 flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-text-muted">
              {dict.terms.lastUpdated}{' '}
              <time dateTime={LAST_UPDATED}>{formatDate(LAST_UPDATED, locale)}</time>
            </p>
          </nav>

          <div className="max-w-3xl">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-28">
                <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
