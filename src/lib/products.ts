import type { Product, ProductVariant } from './types';

/**
 * Katalog demonstracyjny. Ceny w groszach, zeby uniknac bledow
 * zmiennoprzecinkowych przy sumowaniu koszyka.
 */

/** Skrocone budowanie wariantow - wiekszosc produktow ma ten sam uklad. */
function variants(
  base: {
    material: ProductVariant['material'];
    finish: ProductVariant['finish'];
    delta: number;
    inStock?: boolean;
  }[],
  prefix: string,
): ProductVariant[] {
  return base.map((entry, index) => ({
    id: `${prefix}-v${index + 1}`,
    material: entry.material,
    finish: entry.finish,
    priceDelta: entry.delta,
    inStock: entry.inStock ?? true,
  }));
}

const STANDARD = [
  { material: 'abs' as const, finish: 'gloss-black' as const, delta: 0 },
  { material: 'abs' as const, finish: 'matte-black' as const, delta: 0 },
  { material: 'abs' as const, finish: 'primed' as const, delta: -4000 },
  { material: 'carbon' as const, finish: 'carbon-gloss' as const, delta: 89000 },
];

export const products: Product[] = [
  // ---------------------------------------------------------------- splittery
  {
    slug: 'splitter-przedni-street-gt',
    name: 'Splitter przedni Street GT',
    categorySlug: 'splittery',
    price: 74900,
    compareAtPrice: 89900,
    shortDescription:
      'Splitter pod zderzak seryjny, dociąża przednią oś bez ingerencji w chłodzenie.',
    description:
      'Street GT to splitter zaprojektowany pod codzienną jazdę: wysunięcie 65 mm daje wyraźny efekt wizualny, a jednocześnie pozostawia rozsądny kąt natarcia przy wjeździe na parking. Krawędź natarcia jest pogrubiona, więc element znosi kontakt z krawężnikiem bez pęknięcia. Wersja ABS przychodzi w gotowym połysku, wersja karbonowa w prepregu 2x2 twill z lakierem UV.',
    fitment: [
      { make: 'BMW', model: 'Seria 3 G20', years: '2018-2022' },
      { make: 'BMW', model: 'Seria 4 G22', years: '2020+' },
      { make: 'Audi', model: 'A4 B9', years: '2019-2023' },
    ],
    images: ['shot-detail-1', 'shot-detail-3', 'cat-splittery'],
    variants: variants(STANDARD, 'sgt'),
    specs: [
      { label: 'Wysunięcie', value: '65 mm' },
      { label: 'Grubość materiału', value: '4 mm' },
      { label: 'Waga', value: '3,4 kg (ABS) / 1,9 kg (karbon)' },
      { label: 'Montaż', value: 'Wkręty + taśma 3M VHB' },
      { label: 'Czas montażu', value: 'ok. 45 min' },
    ],
    included: [
      'Splitter przedni',
      'Komplet wkrętów montażowych ze stali nierdzewnej',
      'Taśma 3M VHB przycięta na wymiar',
      'Instrukcja montażu PL/EN',
    ],
    rating: 4.7,
    reviewCount: 128,
    badges: ['bestseller', 'promocja'],
    shippingDays: 2,
  },
  {
    slug: 'splitter-przedni-track-lip',
    name: 'Splitter Track Lip Aero',
    categorySlug: 'splittery',
    price: 129900,
    shortDescription: 'Wersja torowa z płytą dolną i wspornikami regulowanymi.',
    description:
      'Track Lip Aero powstał do jazdy po torze. Płyta dolna z kompozytu FRP jest podparta dwoma regulowanymi wspornikami ze stali nierdzewnej, co pozwala ustawić kąt natarcia w zakresie 0-4 stopni i dobrać balans aerodynamiczny do konkretnego obiektu. Przy pełnym wysunięciu element generuje mierzalny docisk już od 120 km/h.',
    fitment: [
      { make: 'Subaru', model: 'BRZ ZD8', years: '2021+' },
      { make: 'Toyota', model: 'GR86', years: '2021+' },
    ],
    images: ['shot-detail-5', 'cat-splittery', 'shot-detail-2'],
    variants: variants(
      [
        { material: 'frp', finish: 'primed', delta: 0 },
        { material: 'frp', finish: 'gloss-black', delta: 12000 },
        { material: 'carbon', finish: 'carbon-matte', delta: 120000, inStock: false },
      ],
      'tla',
    ),
    specs: [
      { label: 'Wysunięcie', value: '95 mm' },
      { label: 'Regulacja kąta', value: '0-4°' },
      { label: 'Waga', value: '5,1 kg' },
      { label: 'Wsporniki', value: 'Stal nierdzewna 304, 2 szt.' },
      { label: 'Montaż', value: 'Wiercenie w belce zderzaka' },
    ],
    included: [
      'Płyta splittera FRP',
      'Wsporniki regulowane 2 szt.',
      'Komplet śrub M8 z podkładkami',
      'Szablon otworów montażowych',
    ],
    rating: 4.9,
    reviewCount: 41,
    badges: ['nowosc'],
    shippingDays: 5,
  },
  {
    slug: 'splitter-boczny-canards',
    name: 'Canardy boczne Aero Fin',
    categorySlug: 'splittery',
    price: 34900,
    shortDescription: 'Komplet czterech płetw kierujących na zderzak przedni.',
    description:
      'Canardy porządkują przepływ powietrza wzdłuż boku nadwozia i wizualnie poszerzają front. Komplet zawiera cztery elementy w dwóch rozmiarach, montowane na taśmę i wkręty. Krawędzie są fabrycznie wykończone, więc nie wymagają szlifowania przed lakierowaniem.',
    fitment: [{ make: 'Uniwersalne', model: 'Dopasowanie warsztatowe', years: 'wszystkie' }],
    images: ['shot-detail-3', 'cat-splittery'],
    variants: variants(
      [
        { material: 'abs', finish: 'gloss-black', delta: 0 },
        { material: 'abs', finish: 'matte-black', delta: 0 },
        { material: 'carbon', finish: 'carbon-gloss', delta: 46000 },
      ],
      'afn',
    ),
    specs: [
      { label: 'Liczba elementów', value: '4 szt. (2 pary)' },
      { label: 'Wymiary', value: '240x90 mm i 180x70 mm' },
      { label: 'Waga kompletu', value: '0,9 kg' },
      { label: 'Montaż', value: 'Taśma 3M VHB' },
    ],
    included: ['4 canardy', 'Taśma montażowa', 'Odtłuszczacz i ściereczka'],
    rating: 4.4,
    reviewCount: 87,
    badges: [],
    shippingDays: 2,
  },

  // ----------------------------------------------------------------- spoilery
  {
    slug: 'spoiler-ducktail-classic',
    name: 'Spoiler Ducktail Classic',
    categorySlug: 'spoilery',
    price: 89900,
    shortDescription: 'Kaczy ogon na klapę bagażnika, montaż bezinwazyjny.',
    description:
      'Ducktail Classic podnosi krawędź klapy o 55 mm i zamyka linię nadwozia charakterystycznym łamaniem. Kształt odwzorowuje krzywiznę klapy fabrycznej, więc szczelina jest równa na całej długości. Montaż wyłącznie na taśmę, bez wiercenia - element można zdemontować bez śladu.',
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Audi', model: 'A3 8V/8Y', years: '2013+' },
    ],
    images: ['cat-spoilery', 'shot-detail-2', 'shot-detail-6'],
    variants: variants(STANDARD, 'dtc'),
    specs: [
      { label: 'Wysokość', value: '55 mm' },
      { label: 'Waga', value: '1,7 kg' },
      { label: 'Montaż', value: 'Taśma 3M VHB, bez wiercenia' },
      { label: 'Czas montażu', value: 'ok. 25 min' },
    ],
    included: ['Spoiler', 'Taśma 3M VHB', 'Zestaw czyszczący', 'Instrukcja'],
    rating: 4.8,
    reviewCount: 213,
    badges: ['bestseller'],
    shippingDays: 2,
  },
  {
    slug: 'skrzydlo-gt-wing-1400',
    name: 'Skrzydło GT Wing 1400',
    categorySlug: 'spoilery',
    price: 249900,
    shortDescription: 'Wolnostojące skrzydło 1400 mm na słupkach aluminiowych.',
    description:
      'Profil skrzydła o cięciwie 200 mm osadzony na dwóch słupkach z aluminium 6061-T6. Kąt natarcia regulowany co 2 stopnie w zakresie od -2 do +12, co pozwala dobrać docisk do charakterystyki toru. Płyty boczne ograniczają wiry krawędziowe i zwiększają skuteczność profilu.',
    fitment: [{ make: 'Uniwersalne', model: 'Klapa płaska lub lekko wypukła', years: 'wszystkie' }],
    images: ['cat-spoilery', 'shot-detail-5', 'shot-detail-3'],
    variants: variants(
      [
        { material: 'aluminium', finish: 'gloss-black', delta: 0 },
        { material: 'aluminium', finish: 'matte-black', delta: 0 },
        { material: 'carbon', finish: 'carbon-gloss', delta: 180000 },
      ],
      'gtw',
    ),
    specs: [
      { label: 'Rozpiętość', value: '1400 mm' },
      { label: 'Cięciwa profilu', value: '200 mm' },
      { label: 'Regulacja kąta', value: '-2° do +12°, co 2°' },
      { label: 'Słupki', value: 'Aluminium 6061-T6' },
      { label: 'Waga', value: '7,8 kg' },
    ],
    included: [
      'Profil skrzydła',
      'Słupki 2 szt.',
      'Płyty boczne 2 szt.',
      'Zestaw montażowy z podkładkami wzmacniającymi',
    ],
    rating: 4.6,
    reviewCount: 34,
    badges: ['nowosc'],
    shippingDays: 7,
  },
  {
    slug: 'nakladka-spoiler-lotka-slim',
    name: 'Nakładka na spoiler Lotka Slim',
    categorySlug: 'spoilery',
    price: 44900,
    shortDescription: 'Cienka lotka nakładana na spoiler fabryczny.',
    description:
      'Lotka Slim to rozwiązanie dla aut, które mają już fabryczny spoiler, ale brakuje im wyrazistości. Nakładka o grubości 18 mm nakleja się na istniejącą krawędź i przedłuża ją o 30 mm, zachowując proporcje nadwozia.',
    fitment: [
      { make: 'BMW', model: 'Seria 3 G20', years: '2018+' },
      { make: 'Mercedes', model: 'Klasa C W205', years: '2014-2021' },
    ],
    images: ['shot-detail-6', 'cat-spoilery'],
    variants: variants(STANDARD, 'lsl'),
    specs: [
      { label: 'Przedłużenie', value: '30 mm' },
      { label: 'Grubość', value: '18 mm' },
      { label: 'Waga', value: '0,8 kg' },
      { label: 'Montaż', value: 'Taśma 3M VHB' },
    ],
    included: ['Nakładka', 'Taśma montażowa', 'Odtłuszczacz'],
    rating: 4.3,
    reviewCount: 62,
    badges: [],
    shippingDays: 2,
  },

  // ---------------------------------------------------------------- dyfuzory
  {
    slug: 'dyfuzor-tylny-race-fin',
    name: 'Dyfuzor tylny Race Fin',
    categorySlug: 'dyfuzory',
    price: 99900,
    compareAtPrice: 119900,
    shortDescription: 'Pięć żeber kierujących, wersja pod podwójny wydech.',
    description:
      'Race Fin zamyka przepływ powietrza spod podłogi i wyraźnie obniża wizualnie tył auta. Pięć żeber o zmiennej wysokości prowadzi strugę do krawędzi zderzaka. Wersja standardowa ma wycięcia pod dwie końcówki wydechu o średnicy do 90 mm.',
    fitment: [
      { make: 'Audi', model: 'A4 B9', years: '2016-2023' },
      { make: 'Volkswagen', model: 'Passat B8', years: '2015+' },
    ],
    images: ['cat-dyfuzory', 'shot-detail-4', 'shot-detail-2'],
    variants: variants(STANDARD, 'rfn'),
    specs: [
      { label: 'Liczba żeber', value: '5' },
      { label: 'Wycięcia wydechu', value: '2x max 90 mm' },
      { label: 'Waga', value: '2,9 kg' },
      { label: 'Montaż', value: 'Wkręty w istniejące punkty' },
      { label: 'Czas montażu', value: 'ok. 40 min' },
    ],
    included: ['Dyfuzor', 'Komplet wkrętów', 'Kołki rozporowe', 'Instrukcja'],
    rating: 4.7,
    reviewCount: 156,
    badges: ['promocja'],
    shippingDays: 3,
  },
  {
    slug: 'dyfuzor-carbon-vortex',
    name: 'Dyfuzor karbonowy Vortex',
    categorySlug: 'dyfuzory',
    price: 219900,
    shortDescription: 'Pełny karbon prepreg z generatorami wirów.',
    description:
      'Vortex to dyfuzor z karbonu autoklawowanego z siedmioma żebrami i rzędem generatorów wirów na krawędzi wejściowej. Konstrukcja pochodzi z serii wyścigowej, gdzie przy 200 km/h dokłada zauważalny docisk tylnej osi. Powierzchnia lakierowana bezbarwnym lakierem z filtrem UV.',
    fitment: [
      { make: 'BMW', model: 'M3 F80 / M4 F82', years: '2014-2020' },
      { make: 'BMW', model: 'Seria 4 G22', years: '2020+' },
    ],
    images: ['shot-detail-4', 'cat-dyfuzory', 'cat-karbon'],
    variants: variants(
      [
        { material: 'carbon', finish: 'carbon-gloss', delta: 0 },
        { material: 'carbon', finish: 'carbon-matte', delta: 8000 },
      ],
      'vtx',
    ),
    specs: [
      { label: 'Materiał', value: 'Karbon prepreg 2x2 twill' },
      { label: 'Liczba żeber', value: '7' },
      { label: 'Generatory wirów', value: '6 szt.' },
      { label: 'Waga', value: '2,1 kg' },
      { label: 'Lakier', value: 'Bezbarwny z filtrem UV' },
    ],
    included: ['Dyfuzor karbonowy', 'Zestaw montażowy', 'Certyfikat materiału', 'Instrukcja'],
    rating: 5.0,
    reviewCount: 19,
    badges: ['nowosc'],
    shippingDays: 10,
  },

  // ------------------------------------------------------------------- progi
  {
    slug: 'nakladki-progowe-street-line',
    name: 'Nakładki progowe Street Line',
    categorySlug: 'progi',
    price: 84900,
    shortDescription: 'Para dokładek progowych, obniżenie optyczne o 40 mm.',
    description:
      'Street Line domyka linię boczną między splitterem a dyfuzorem. Dokładki obniżają optycznie sylwetkę o 40 mm i mają wyprofilowaną krawędź, która nie zbiera brudu spod koła. Montaż na oryginalne punkty i taśmę - bez wiercenia w progu nośnym.',
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Skoda', model: 'Octavia IV', years: '2019+' },
    ],
    images: ['cat-progi', 'shot-detail-6', 'shot-detail-1'],
    variants: variants(STANDARD, 'stl'),
    specs: [
      { label: 'Obniżenie optyczne', value: '40 mm' },
      { label: 'Zawartość', value: 'Para (L+P)' },
      { label: 'Waga pary', value: '4,2 kg' },
      { label: 'Montaż', value: 'Punkty fabryczne + taśma 3M' },
    ],
    included: ['Nakładki L i P', 'Klipsy montażowe', 'Taśma 3M VHB', 'Instrukcja'],
    rating: 4.6,
    reviewCount: 174,
    badges: ['bestseller'],
    shippingDays: 3,
  },
  {
    slug: 'progi-widebody-flare-kit',
    name: 'Poszerzenia Widebody Flare',
    categorySlug: 'progi',
    price: 329900,
    shortDescription: 'Komplet poszerzeń nadkoli +35 mm na oś.',
    description:
      'Zestaw czterech poszerzeń nadkoli dodających 35 mm na stronę. Pozwala schować pod nadwoziem szersze felgi i opony bez przycinania błotnika. Krawędzie są wywinięte do wewnątrz, więc nie tną opony przy pełnym skręcie i ugięciu zawieszenia.',
    fitment: [
      { make: 'Toyota', model: 'GR86', years: '2021+' },
      { make: 'Subaru', model: 'BRZ ZD8', years: '2021+' },
      { make: 'Mazda', model: 'MX-5 ND', years: '2015+' },
    ],
    images: ['hero-main', 'shot-detail-5', 'cat-progi'],
    variants: variants(
      [
        { material: 'abs', finish: 'primed', delta: 0 },
        { material: 'abs', finish: 'gloss-black', delta: 26000 },
        { material: 'frp', finish: 'primed', delta: 42000, inStock: false },
      ],
      'wbf',
    ),
    specs: [
      { label: 'Poszerzenie', value: '+35 mm na stronę' },
      { label: 'Liczba elementów', value: '4 szt.' },
      { label: 'Waga kompletu', value: '8,6 kg' },
      { label: 'Montaż', value: 'Nity zrywalne + taśma' },
      { label: 'Wymagane', value: 'Lakierowanie przed montażem' },
    ],
    included: [
      'Poszerzenia 4 szt.',
      'Nity zrywalne i podkładki',
      'Taśma uszczelniająca',
      'Szablon montażowy',
    ],
    rating: 4.8,
    reviewCount: 52,
    badges: ['nowosc'],
    shippingDays: 14,
  },

  // ------------------------------------------------------------------ felgi
  {
    slug: 'felgi-forged-rs01-19',
    name: 'Felgi kute RS-01 19"',
    categorySlug: 'felgi',
    price: 699900,
    shortDescription: 'Komplet czterech felg kutych, 19x8.5 ET35.',
    description:
      'RS-01 to felga kuta jednoczęściowa z aluminium 6061-T6. Proces kucia daje o 25 procent niższą masę względem odlewu przy wyższej wytrzymałości. Dziesięć podwójnych ramion odsłania zacisk hamulcowy, a wykończenie jest zabezpieczone lakierem proszkowym.',
    fitment: [
      { make: 'BMW', model: 'rozstaw 5x120', years: 'wszystkie' },
      { make: 'Audi', model: 'rozstaw 5x112', years: 'wszystkie' },
    ],
    images: ['cat-felgi', 'shot-wheel-1', 'shot-wheel-2'],
    variants: variants(
      [
        { material: 'aluminium', finish: 'matte-black', delta: 0 },
        { material: 'aluminium', finish: 'gloss-black', delta: 0 },
      ],
      'rs1',
    ),
    specs: [
      { label: 'Rozmiar', value: '19x8.5"' },
      { label: 'Offset', value: 'ET35' },
      { label: 'Rozstaw', value: '5x112 lub 5x120' },
      { label: 'Waga felgi', value: '9,2 kg' },
      { label: 'Obciążenie', value: '750 kg/szt.' },
    ],
    included: ['4 felgi', 'Kapsle centrujące', 'Pierścienie centrujące', 'Certyfikat TÜV'],
    rating: 4.9,
    reviewCount: 76,
    badges: ['bestseller'],
    shippingDays: 5,
  },
  {
    slug: 'dystanse-hubcentric-20mm',
    name: 'Dystanse hubcentryczne 20 mm',
    categorySlug: 'felgi',
    price: 49900,
    shortDescription: 'Para dystansów z pierścieniem centrującym i śrubami.',
    description:
      'Dystanse frezowane z aluminium 7075 z pierścieniem centrującym przenoszącym obciążenie na piastę, a nie na śruby. Komplet zawiera dłuższe śruby o właściwej długości gwintu, więc nie trzeba dokupować ich osobno.',
    fitment: [{ make: 'Uniwersalne', model: 'Wg rozstawu i średnicy piasty', years: 'wszystkie' }],
    images: ['shot-wheel-2', 'cat-felgi'],
    variants: variants(
      [
        { material: 'aluminium', finish: 'matte-black', delta: 0 },
        { material: 'aluminium', finish: 'gloss-black', delta: 4000 },
      ],
      'dys',
    ),
    specs: [
      { label: 'Grubość', value: '20 mm' },
      { label: 'Materiał', value: 'Aluminium 7075-T6' },
      { label: 'Zawartość', value: 'Para (2 szt.)' },
      { label: 'Centrowanie', value: 'Hubcentryczne' },
      { label: 'Śruby', value: 'W komplecie' },
    ],
    included: ['2 dystanse', '10 śrub', 'Pierścienie centrujące', 'Certyfikat'],
    rating: 4.5,
    reviewCount: 98,
    badges: [],
    shippingDays: 2,
  },

  // ---------------------------------------------------------------- wydechy
  {
    slug: 'wydech-catback-sport-304',
    name: 'Wydech cat-back Sport 304',
    categorySlug: 'wydechy',
    price: 389900,
    shortDescription: 'System cat-back ze stali 304 z klapą sterowaną pilotem.',
    description:
      'Kompletny układ od katalizatora wstecz, wykonany ze stali nierdzewnej 304 metodą gięcia na trzpieniu, co utrzymuje stały przekrój na łukach. Klapa sterowana pilotem pozwala przełączać się między trybem cichym a sportowym bez wychodzenia z auta.',
    fitment: [
      { make: 'BMW', model: 'Seria 3 G20 320i/330i', years: '2018+' },
      { make: 'BMW', model: 'Seria 4 G22', years: '2020+' },
    ],
    images: ['cat-wydechy', 'shot-detail-4', 'shot-detail-2'],
    variants: variants(
      [
        { material: 'aluminium', finish: 'gloss-black', delta: 0 },
        { material: 'carbon', finish: 'carbon-gloss', delta: 78000 },
      ],
      'cb3',
    ),
    specs: [
      { label: 'Materiał', value: 'Stal nierdzewna 304' },
      { label: 'Średnica rur', value: '63,5 mm' },
      { label: 'Końcówki', value: '2x114 mm' },
      { label: 'Klapa', value: 'Sterowana pilotem' },
      { label: 'Wzrost mocy', value: '8-12 KM' },
    ],
    included: ['Układ cat-back', 'Klapa z siłownikiem', 'Pilot', 'Uszczelki i obejmy'],
    rating: 4.8,
    reviewCount: 44,
    badges: [],
    shippingDays: 7,
  },
  {
    slug: 'koncowki-wydechu-carbon-101',
    name: 'Końcówki wydechu Carbon 101',
    categorySlug: 'wydechy',
    price: 79900,
    shortDescription: 'Para nakładek karbonowych na końcówki, montaż na obejmę.',
    description:
      'Nakładki z karbonu z wewnętrzną tuleją ze stali nierdzewnej, która chroni żywicę przed temperaturą spalin. Montaż na obejmę imbusową na istniejącą końcówkę o średnicy 54-70 mm.',
    fitment: [{ make: 'Uniwersalne', model: 'Końcówki 54-70 mm', years: 'wszystkie' }],
    images: ['cat-karbon', 'cat-wydechy'],
    variants: variants(
      [
        { material: 'carbon', finish: 'carbon-gloss', delta: 0 },
        { material: 'carbon', finish: 'carbon-matte', delta: 6000 },
      ],
      'c101',
    ),
    specs: [
      { label: 'Zakres montażu', value: 'Ø 54-70 mm' },
      { label: 'Średnica wylotu', value: '101 mm' },
      { label: 'Zawartość', value: 'Para (2 szt.)' },
      { label: 'Tuleja', value: 'Stal nierdzewna' },
    ],
    included: ['2 końcówki', 'Obejmy imbusowe', 'Klucz imbusowy'],
    rating: 4.6,
    reviewCount: 121,
    badges: [],
    shippingDays: 2,
  },

  // ------------------------------------------------------------- zawieszenie
  {
    slug: 'zawieszenie-gwintowane-street-comfort',
    name: 'Zawieszenie gwintowane Street Comfort',
    categorySlug: 'zawieszenie',
    price: 429900,
    shortDescription: 'Regulacja wysokości 30-70 mm i 32 stopnie tłumienia.',
    description:
      'Zestaw gwintowany z regulacją wysokości w zakresie 30-70 mm i trzydziestoma dwoma stopniami tłumienia odbicia. Charakterystyka dobrana pod codzienną jazdę - obniżenie wygląda dobrze, ale auto nadal znosi dziury i progi zwalniające.',
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Audi', model: 'A3 8V/8Y', years: '2013+' },
    ],
    images: ['cat-zawieszenie', 'shot-wheel-1'],
    variants: variants([{ material: 'aluminium', finish: 'gloss-black', delta: 0 }], 'zsc'),
    specs: [
      { label: 'Zakres obniżenia', value: '30-70 mm' },
      { label: 'Regulacja tłumienia', value: '32 stopnie' },
      { label: 'Sprężyny', value: 'Stal chromowo-krzemowa' },
      { label: 'Korpus', value: 'Stal ocynkowana' },
      { label: 'Gwarancja', value: '24 miesiące' },
    ],
    included: ['4 amortyzatory', 'Sprężyny', 'Poduszki górne', 'Klucz regulacyjny', 'Certyfikat'],
    rating: 4.7,
    reviewCount: 88,
    badges: [],
    shippingDays: 5,
  },
  {
    slug: 'sprezyny-obnizajace-sport-35',
    name: 'Sprężyny obniżające Sport -35 mm',
    categorySlug: 'zawieszenie',
    price: 119900,
    shortDescription: 'Komplet sprężyn obniżających o 35 mm, homologacja.',
    description:
      'Sprężyny o progresywnej charakterystyce obniżające nadwozie o 35 mm. Współpracują z amortyzatorami fabrycznymi, więc to najprostszy sposób na poprawienie proporcji nadkola bez wymiany całego zawieszenia.',
    fitment: [
      { make: 'BMW', model: 'Seria 3 G20', years: '2018+' },
      { make: 'Mercedes', model: 'Klasa C W205', years: '2014-2021' },
    ],
    images: ['cat-zawieszenie', 'shot-wheel-2'],
    variants: variants([{ material: 'aluminium', finish: 'matte-black', delta: 0 }], 'sp35'),
    specs: [
      { label: 'Obniżenie', value: '35 mm przód i tył' },
      { label: 'Charakterystyka', value: 'Progresywna' },
      { label: 'Zawartość', value: '4 sprężyny' },
      { label: 'Homologacja', value: 'Tak' },
    ],
    included: ['4 sprężyny', 'Certyfikat homologacji', 'Instrukcja'],
    rating: 4.4,
    reviewCount: 143,
    badges: [],
    shippingDays: 3,
  },

  // ----------------------------------------------------------------- karbon
  {
    slug: 'obudowy-lusterek-carbon',
    name: 'Obudowy lusterek karbonowe',
    categorySlug: 'karbon',
    price: 149900,
    shortDescription: 'Para nakładek na lusterka, prepreg 2x2 twill.',
    description:
      'Nakładki z karbonu autoklawowanego zakładane na fabryczne obudowy lusterek. Nie wymagają demontażu mechanizmu - wystarczy zdjąć zewnętrzną klapkę i zatrzasnąć nową. Splot 2x2 twill jest dopasowany kierunkowo między lewą a prawą stroną.',
    fitment: [
      { make: 'BMW', model: 'Seria 3 G20', years: '2018+' },
      { make: 'BMW', model: 'Seria 4 G22', years: '2020+' },
    ],
    images: ['cat-karbon', 'shot-detail-6'],
    variants: variants(
      [
        { material: 'carbon', finish: 'carbon-gloss', delta: 0 },
        { material: 'carbon', finish: 'carbon-matte', delta: 10000 },
      ],
      'lus',
    ),
    specs: [
      { label: 'Materiał', value: 'Prepreg 2x2 twill' },
      { label: 'Zawartość', value: 'Para (L+P)' },
      { label: 'Waga pary', value: '0,6 kg' },
      { label: 'Montaż', value: 'Na zatrzaski, bez klejenia' },
    ],
    included: ['2 obudowy', 'Instrukcja demontażu klapek'],
    rating: 4.9,
    reviewCount: 67,
    badges: ['bestseller'],
    shippingDays: 4,
  },
  {
    slug: 'maska-carbon-vented',
    name: 'Maska karbonowa Vented',
    categorySlug: 'karbon',
    price: 899900,
    compareAtPrice: 1049900,
    shortDescription: 'Maska z wlotami odprowadzającymi ciepło, -9 kg.',
    description:
      'Maska z karbonu z dwoma wlotami odprowadzającymi gorące powietrze z komory silnika. Względem maski fabrycznej jest lżejsza o około 9 kg, co przekłada się na rozkład masy na przedniej osi. Zawiasy i zamek montowane w punkty oryginalne.',
    fitment: [{ make: 'BMW', model: 'M3 F80 / M4 F82', years: '2014-2020' }],
    images: ['cat-karbon', 'shot-detail-5', 'hero-garage'],
    variants: variants(
      [
        { material: 'carbon', finish: 'carbon-gloss', delta: 0 },
        { material: 'carbon', finish: 'carbon-matte', delta: 24000, inStock: false },
      ],
      'msk',
    ),
    specs: [
      { label: 'Redukcja masy', value: '-9 kg vs. fabryczna' },
      { label: 'Wloty', value: '2 szt., odprowadzenie ciepła' },
      { label: 'Materiał', value: 'Karbon prepreg, autoklaw' },
      { label: 'Zapinki', value: 'W komplecie' },
      { label: 'Montaż', value: 'Punkty fabryczne' },
    ],
    included: ['Maska', 'Zapinki maski 2 szt.', 'Uszczelki', 'Certyfikat materiału'],
    rating: 4.8,
    reviewCount: 12,
    badges: ['promocja'],
    shippingDays: 21,
  },
  {
    slug: 'listwy-progowe-carbon-led',
    name: 'Listwy progowe karbonowe LED',
    categorySlug: 'karbon',
    price: 69900,
    shortDescription: 'Podświetlane nakładki na progi wewnętrzne, 4 szt.',
    description:
      'Nakładki na wewnętrzne progi drzwi z karbonu z podświetlanym logo. Zasilanie z portu USB lub bezpośrednio z instalacji, czujnik otwarcia drzwi uruchamia podświetlenie automatycznie.',
    fitment: [{ make: 'Uniwersalne', model: 'Docinane na wymiar', years: 'wszystkie' }],
    images: ['cat-karbon', 'shot-detail-3'],
    variants: variants([{ material: 'carbon', finish: 'carbon-gloss', delta: 0 }], 'lpc'),
    specs: [
      { label: 'Zawartość', value: '4 szt.' },
      { label: 'Zasilanie', value: 'USB lub instalacja 12 V' },
      { label: 'Kolor LED', value: 'Biały zimny' },
      { label: 'Montaż', value: 'Taśma 3M' },
    ],
    included: ['4 listwy', 'Okablowanie', 'Taśma 3M', 'Instrukcja'],
    rating: 4.2,
    reviewCount: 55,
    badges: [],
    shippingDays: 3,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

/** Produkty z tej samej kategorii, bez biezacego - do sekcji "podobne". */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products
    .filter((product) => product.badges.length > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

/** Najnizsza cena wariantu - do etykiety "od X zl". */
export function getMinPrice(product: Product): number {
  const deltas = product.variants.map((variant) => variant.priceDelta);
  return product.price + Math.min(...deltas, 0);
}
