import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { absoluteUrl, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Regulamin, zwroty i polityka prywatności',
  description:
    'Warunki sprzedaży, prawo odstąpienia od umowy, procedura reklamacyjna i zasady przetwarzania danych w BodyKit Shop.',
  alternates: { canonical: '/regulamin/' },
  openGraph: { url: absoluteUrl('/regulamin/'), title: 'Regulamin — BodyKit Shop' },
};

const sections = [
  {
    id: 'postanowienia',
    title: '1. Postanowienia ogólne',
    paragraphs: [
      `Sklep internetowy ${site.name} prowadzony jest pod adresem ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
      'Regulamin określa zasady zawierania umów sprzedaży za pośrednictwem sklepu, prawa i obowiązki stron oraz tryb postępowania reklamacyjnego.',
      'Klientem może być osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna oraz jednostka organizacyjna nieposiadająca osobowości prawnej.',
    ],
  },
  {
    id: 'zamowienia',
    title: '2. Składanie zamówień',
    paragraphs: [
      'Zamówienie składa się przez dodanie produktów do koszyka i wypełnienie formularza zamówienia. Umowa sprzedaży zostaje zawarta w chwili potwierdzenia przyjęcia zamówienia przez sklep.',
      'Ceny podane w sklepie są cenami brutto wyrażonymi w złotych polskich i zawierają podatek VAT. Cena nie obejmuje kosztów dostawy, które prezentowane są przed złożeniem zamówienia.',
      'Sklep zastrzega możliwość odmowy realizacji zamówienia w przypadku wyczerpania zapasów lub błędu w prezentacji ceny — w takiej sytuacji klient zostaje niezwłocznie poinformowany, a wpłacone środki zwrócone w całości.',
    ],
  },
  {
    id: 'dostawa',
    title: '3. Dostawa i terminy',
    paragraphs: [
      'Produkty oznaczone jako dostępne wysyłane są w terminie 24-48 godzin roboczych. Produkty wykonywane na zamówienie mają indywidualny czas realizacji podany na karcie produktu.',
      'Dostawa realizowana jest przez firmę kurierską lub do punktu odbioru wybranego przez klienta. Koszt dostawy wynosi od 16,90 zł, a przy zamówieniach powyżej 500 zł dostawa jest bezpłatna.',
      'Zalecamy sprawdzenie przesyłki w obecności kuriera. Uszkodzenia opakowania warto odnotować w protokole — ułatwia to późniejsze rozpatrzenie reklamacji, choć nie jest warunkiem jej uwzględnienia.',
    ],
  },
  {
    id: 'odstapienie',
    title: '4. Prawo odstąpienia od umowy',
    paragraphs: [
      'Konsument może odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia objęcia towaru w posiadanie. Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem.',
      'Zwracany towar nie może nosić śladów montażu ani być lakierowany. Klient odpowiada za zmniejszenie wartości rzeczy wynikające z korzystania z niej w sposób wykraczający poza konieczny do stwierdzenia jej cech i funkcjonowania.',
      'Prawo odstąpienia nie przysługuje w odniesieniu do towarów wyprodukowanych według specyfikacji konsumenta lub służących zaspokojeniu jego zindywidualizowanych potrzeb — dotyczy to elementów wykonywanych na indywidualne zamówienie, o czym informujemy przed zakupem.',
      'Zwrot płatności następuje w terminie 14 dni od otrzymania oświadczenia, przy użyciu tego samego sposobu zapłaty, chyba że klient wyraźnie zgodzi się na inne rozwiązanie.',
    ],
  },
  {
    id: 'reklamacje',
    title: '5. Reklamacje i gwarancja',
    paragraphs: [
      'Sklep udziela 24-miesięcznej gwarancji na wady materiałowe i wykonawcze, w tym rozwarstwienie laminatu, pęcherze w powłoce lakierniczej oraz odkształcenia niewynikające z eksploatacji.',
      'Gwarancja nie obejmuje uszkodzeń mechanicznych powstałych w trakcie użytkowania, w szczególności kontaktu elementu z krawężnikiem, progiem zwalniającym lub nawierzchnią drogi, a także uszkodzeń powstałych wskutek nieprawidłowego montażu.',
      'Reklamację można złożyć drogą elektroniczną na adres reklamacje@bodykitshop.pl. Rozpatrujemy ją w terminie 14 dni od otrzymania zgłoszenia, a dla partnerów B2B w terminie 3 dni roboczych.',
      'Niezależnie od gwarancji konsumentowi przysługują uprawnienia z tytułu rękojmi określone w Kodeksie cywilnym.',
    ],
  },
  {
    id: 'montaz',
    title: '6. Montaż i odpowiedzialność',
    paragraphs: [
      'Produkty przeznaczone są do montażu zgodnie z dołączoną instrukcją. Elementy wymagające ingerencji w konstrukcję nadwozia zalecamy powierzyć wyspecjalizowanemu warsztatowi.',
      'Modyfikacje nadwozia mogą wymagać zgłoszenia w dowodzie rejestracyjnym lub uzyskania badania technicznego. Obowiązek weryfikacji zgodności z przepisami ruchu drogowego spoczywa na właścicielu pojazdu.',
      'Sklep nie ponosi odpowiedzialności za szkody wynikające z montażu niezgodnego z instrukcją ani za następstwa użytkowania pojazdu niespełniającego wymogów homologacyjnych.',
    ],
  },
  {
    id: 'dane',
    title: '7. Ochrona danych osobowych',
    paragraphs: [
      `Administratorem danych osobowych jest ${site.name} z siedzibą w ${site.address.city}. Kontakt w sprawach ochrony danych: ${site.email}.`,
      'Dane przetwarzane są w celu realizacji zamówienia (art. 6 ust. 1 lit. b RODO), wypełnienia obowiązków podatkowych (lit. c) oraz w prawnie uzasadnionym interesie administratora, jakim jest obsługa reklamacji i dochodzenie roszczeń (lit. f).',
      'Każdej osobie przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
      'Dane przechowywane są przez okres niezbędny do realizacji umowy oraz przez czas wynikający z przepisów o rachunkowości i przedawnieniu roszczeń.',
    ],
  },
  {
    id: 'koncowe',
    title: '8. Postanowienia końcowe',
    paragraphs: [
      'W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta.',
      'Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w tym platformy ODR dostępnej pod adresem ec.europa.eu/consumers/odr.',
      'Sklep zastrzega prawo do zmiany regulaminu. Do zamówień złożonych przed wejściem zmian w życie stosuje się regulamin w brzmieniu dotychczasowym.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/regulamin/', label: 'Regulamin' }]} />
      <PageHeader
        title="Regulamin i polityka prywatności"
        description="Warunki sprzedaży, zwrotów i przetwarzania danych osobowych."
      />

      <div className="container-page pb-16">
        <div className="mb-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">Dokument demonstracyjny.</strong> Treść
            przygotowano na potrzeby projektu portfolio. Nie stanowi wzorca umownego ani porady
            prawnej i nie powinna być wykorzystywana w działającym sklepie bez konsultacji z
            prawnikiem.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Spis treści regulaminu" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Spis treści
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
              Ostatnia aktualizacja: <time dateTime="2026-08-01">1 sierpnia 2026</time>
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
