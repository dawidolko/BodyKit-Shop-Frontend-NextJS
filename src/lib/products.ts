import type { Product, ProductVariant } from './types';

/**
 * Demo catalogue. Prices are in grosz so cart totals never hit
 * floating point rounding errors.
 */

/** Shorthand variant builder - most products share the same layout. */
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

/** Default variant ladder: painted ABS, primed ABS, then carbon. */
const STANDARD = [
  { material: 'abs' as const, finish: 'gloss-black' as const, delta: 0 },
  { material: 'abs' as const, finish: 'matte-black' as const, delta: 0 },
  { material: 'abs' as const, finish: 'primed' as const, delta: -4000 },
  { material: 'carbon' as const, finish: 'carbon-gloss' as const, delta: 89000 },
];

export const products: Product[] = [
  // ---------------------------------------------------------- front splitters
  {
    slug: 'street-gt-front-splitter',
    name: {
      en: 'Street GT front splitter',
      pl: 'Splitter przedni Street GT',
    },
    categorySlug: 'front-splitters',
    price: 74900,
    compareAtPrice: 89900,
    shortDescription: {
      en: 'A splitter for the stock bumper that loads the front axle without blocking airflow to the coolers.',
      pl: 'Splitter pod zderzak seryjny, dociąża przednią oś bez ingerencji w chłodzenie.',
    },
    description: {
      en: 'Street GT is a splitter designed for daily driving: 65 mm of overhang gives a clear visual effect while still leaving a sensible approach angle for car park ramps. The leading edge is thickened, so the part survives kerb contact without cracking. The ABS version arrives in a finished gloss, the carbon version in 2x2 twill prepreg with a UV clear coat.',
      pl: 'Street GT to splitter zaprojektowany pod codzienną jazdę: wysunięcie 65 mm daje wyraźny efekt wizualny, a jednocześnie pozostawia rozsądny kąt natarcia przy wjeździe na parking. Krawędź natarcia jest pogrubiona, więc element znosi kontakt z krawężnikiem bez pęknięcia. Wersja ABS przychodzi w gotowym połysku, wersja karbonowa w prepregu 2x2 twill z lakierem UV.',
    },
    fitment: [
      { make: 'BMW', model: '3 Series G20', years: '2018-2022' },
      { make: 'BMW', model: '4 Series G22', years: '2020+' },
      { make: 'Audi', model: 'A4 B9', years: '2019-2023' },
    ],
    images: ['shot-detail-1', 'shot-detail-3', 'cat-splittery'],
    variants: variants(STANDARD, 'sgt'),
    specs: [
      {
        label: { en: 'Overhang', pl: 'Wysunięcie' },
        value: { en: '65 mm', pl: '65 mm' },
      },
      {
        label: { en: 'Material thickness', pl: 'Grubość materiału' },
        value: { en: '4 mm', pl: '4 mm' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '3.4 kg (ABS) / 1.9 kg (carbon)', pl: '3,4 kg (ABS) / 1,9 kg (karbon)' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Screws + 3M VHB tape', pl: 'Wkręty + taśma 3M VHB' },
      },
      {
        label: { en: 'Fitting time', pl: 'Czas montażu' },
        value: { en: 'approx. 45 min', pl: 'ok. 45 min' },
      },
    ],
    included: {
      en: [
        'Front splitter',
        'Full set of stainless steel mounting screws',
        '3M VHB tape cut to size',
        'Fitting instructions PL/EN',
      ],
      pl: [
        'Splitter przedni',
        'Komplet wkrętów montażowych ze stali nierdzewnej',
        'Taśma 3M VHB przycięta na wymiar',
        'Instrukcja montażu PL/EN',
      ],
    },
    rating: 4.7,
    reviewCount: 128,
    badges: ['bestseller', 'sale'],
    shippingDays: 2,
  },
  {
    slug: 'track-lip-aero-splitter',
    name: {
      en: 'Track Lip Aero splitter',
      pl: 'Splitter Track Lip Aero',
    },
    categorySlug: 'front-splitters',
    price: 129900,
    shortDescription: {
      en: 'Track-focused version with a full underplate and adjustable support rods.',
      pl: 'Wersja torowa z płytą dolną i wspornikami regulowanymi.',
    },
    description: {
      en: 'Track Lip Aero was built for circuit use. The FRP composite underplate is braced by two adjustable stainless steel support rods, letting you set the angle of attack between 0 and 4 degrees and dial the aero balance in for a specific track. At full extension the part generates measurable downforce from 120 km/h upwards.',
      pl: 'Track Lip Aero powstał do jazdy po torze. Płyta dolna z kompozytu FRP jest podparta dwoma regulowanymi wspornikami ze stali nierdzewnej, co pozwala ustawić kąt natarcia w zakresie 0-4 stopni i dobrać balans aerodynamiczny do konkretnego obiektu. Przy pełnym wysunięciu element generuje mierzalny docisk już od 120 km/h.',
    },
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
      {
        label: { en: 'Overhang', pl: 'Wysunięcie' },
        value: { en: '95 mm', pl: '95 mm' },
      },
      {
        label: { en: 'Angle adjustment', pl: 'Regulacja kąta' },
        value: { en: '0-4°', pl: '0-4°' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '5.1 kg', pl: '5,1 kg' },
      },
      {
        label: { en: 'Support rods', pl: 'Wsporniki' },
        value: { en: '304 stainless steel, 2 pcs', pl: 'Stal nierdzewna 304, 2 szt.' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Drilling into the bumper beam', pl: 'Wiercenie w belce zderzaka' },
      },
    ],
    included: {
      en: [
        'FRP splitter plate',
        'Adjustable support rods, 2 pcs',
        'Full set of M8 bolts with washers',
        'Drilling template for the mounting holes',
      ],
      pl: [
        'Płyta splittera FRP',
        'Wsporniki regulowane 2 szt.',
        'Komplet śrub M8 z podkładkami',
        'Szablon otworów montażowych',
      ],
    },
    rating: 4.9,
    reviewCount: 41,
    badges: ['new'],
    shippingDays: 5,
  },
  {
    slug: 'aero-fin-canards',
    name: {
      en: 'Aero Fin canards',
      pl: 'Canardy boczne Aero Fin',
    },
    categorySlug: 'front-splitters',
    price: 34900,
    shortDescription: {
      en: 'A set of four airflow-guiding fins for the front bumper.',
      pl: 'Komplet czterech płetw kierujących na zderzak przedni.',
    },
    description: {
      en: 'Canards order the airflow running along the side of the body and visually widen the nose. The set contains four elements in two sizes, fitted with tape and screws. The edges come finished from the mould, so they need no sanding before painting.',
      pl: 'Canardy porządkują przepływ powietrza wzdłuż boku nadwozia i wizualnie poszerzają front. Komplet zawiera cztery elementy w dwóch rozmiarach, montowane na taśmę i wkręty. Krawędzie są fabrycznie wykończone, więc nie wymagają szlifowania przed lakierowaniem.',
    },
    fitment: [{ make: 'Universal', model: 'Workshop fitting', years: 'all' }],
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
      {
        label: { en: 'Piece count', pl: 'Liczba elementów' },
        value: { en: '4 pcs (2 pairs)', pl: '4 szt. (2 pary)' },
      },
      {
        label: { en: 'Dimensions', pl: 'Wymiary' },
        value: { en: '240x90 mm and 180x70 mm', pl: '240x90 mm i 180x70 mm' },
      },
      {
        label: { en: 'Set weight', pl: 'Waga kompletu' },
        value: { en: '0.9 kg', pl: '0,9 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: '3M VHB tape', pl: 'Taśma 3M VHB' },
      },
    ],
    included: {
      en: ['4 canards', 'Mounting tape', 'Degreaser and cloth'],
      pl: ['4 canardy', 'Taśma montażowa', 'Odtłuszczacz i ściereczka'],
    },
    rating: 4.4,
    reviewCount: 87,
    badges: [],
    shippingDays: 2,
  },

  // ----------------------------------------------------------------- spoilers
  {
    slug: 'ducktail-classic-spoiler',
    name: {
      en: 'Ducktail Classic spoiler',
      pl: 'Spoiler Ducktail Classic',
    },
    categorySlug: 'spoilers',
    price: 89900,
    shortDescription: {
      en: 'A ducktail for the boot lid, fitted without drilling.',
      pl: 'Kaczy ogon na klapę bagażnika, montaż bezinwazyjny.',
    },
    description: {
      en: 'Ducktail Classic lifts the boot lid edge by 55 mm and closes the body line with its signature kick. The shape follows the curvature of the factory lid, so the gap stays even along the whole length. It fits on tape only, with no drilling - the part can be removed without leaving a trace.',
      pl: 'Ducktail Classic podnosi krawędź klapy o 55 mm i zamyka linię nadwozia charakterystycznym łamaniem. Kształt odwzorowuje krzywiznę klapy fabrycznej, więc szczelina jest równa na całej długości. Montaż wyłącznie na taśmę, bez wiercenia - element można zdemontować bez śladu.',
    },
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Audi', model: 'A3 8V/8Y', years: '2013+' },
    ],
    images: ['cat-spoilery', 'shot-detail-2', 'shot-detail-6'],
    variants: variants(STANDARD, 'dtc'),
    specs: [
      {
        label: { en: 'Height', pl: 'Wysokość' },
        value: { en: '55 mm', pl: '55 mm' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '1.7 kg', pl: '1,7 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: '3M VHB tape, no drilling', pl: 'Taśma 3M VHB, bez wiercenia' },
      },
      {
        label: { en: 'Fitting time', pl: 'Czas montażu' },
        value: { en: 'approx. 25 min', pl: 'ok. 25 min' },
      },
    ],
    included: {
      en: ['Spoiler', '3M VHB tape', 'Cleaning kit', 'Instructions'],
      pl: ['Spoiler', 'Taśma 3M VHB', 'Zestaw czyszczący', 'Instrukcja'],
    },
    rating: 4.8,
    reviewCount: 213,
    badges: ['bestseller'],
    shippingDays: 2,
  },
  {
    slug: 'gt-wing-1400',
    name: {
      en: 'GT Wing 1400',
      pl: 'Skrzydło GT Wing 1400',
    },
    categorySlug: 'spoilers',
    price: 249900,
    shortDescription: {
      en: 'A free-standing 1400 mm wing on aluminium uprights.',
      pl: 'Wolnostojące skrzydło 1400 mm na słupkach aluminiowych.',
    },
    description: {
      en: 'A wing profile with a 200 mm chord mounted on two 6061-T6 aluminium uprights. The angle of attack adjusts in 2 degree steps from -2 to +12, so downforce can be matched to the character of the track. End plates limit edge vortices and raise the efficiency of the profile.',
      pl: 'Profil skrzydła o cięciwie 200 mm osadzony na dwóch słupkach z aluminium 6061-T6. Kąt natarcia regulowany co 2 stopnie w zakresie od -2 do +12, co pozwala dobrać docisk do charakterystyki toru. Płyty boczne ograniczają wiry krawędziowe i zwiększają skuteczność profilu.',
    },
    fitment: [{ make: 'Universal', model: 'Flat or slightly curved boot lid', years: 'all' }],
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
      {
        label: { en: 'Span', pl: 'Rozpiętość' },
        value: { en: '1400 mm', pl: '1400 mm' },
      },
      {
        label: { en: 'Profile chord', pl: 'Cięciwa profilu' },
        value: { en: '200 mm', pl: '200 mm' },
      },
      {
        label: { en: 'Angle adjustment', pl: 'Regulacja kąta' },
        value: { en: '-2° to +12°, in 2° steps', pl: '-2° do +12°, co 2°' },
      },
      {
        label: { en: 'Uprights', pl: 'Słupki' },
        value: { en: '6061-T6 aluminium', pl: 'Aluminium 6061-T6' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '7.8 kg', pl: '7,8 kg' },
      },
    ],
    included: {
      en: [
        'Wing profile',
        'Uprights, 2 pcs',
        'End plates, 2 pcs',
        'Mounting kit with reinforcing backing plates',
      ],
      pl: [
        'Profil skrzydła',
        'Słupki 2 szt.',
        'Płyty boczne 2 szt.',
        'Zestaw montażowy z podkładkami wzmacniającymi',
      ],
    },
    rating: 4.6,
    reviewCount: 34,
    badges: ['new'],
    shippingDays: 7,
  },
  {
    slug: 'slim-spoiler-overlay',
    name: {
      en: 'Slim spoiler overlay',
      pl: 'Nakładka na spoiler Lotka Slim',
    },
    categorySlug: 'spoilers',
    price: 44900,
    shortDescription: {
      en: 'A slim lip that bonds over the factory spoiler.',
      pl: 'Cienka lotka nakładana na spoiler fabryczny.',
    },
    description: {
      en: 'Slim is the answer for cars that already have a factory spoiler but lack presence. The 18 mm thick overlay bonds onto the existing edge and extends it by 30 mm, keeping the proportions of the body intact.',
      pl: 'Lotka Slim to rozwiązanie dla aut, które mają już fabryczny spoiler, ale brakuje im wyrazistości. Nakładka o grubości 18 mm nakleja się na istniejącą krawędź i przedłuża ją o 30 mm, zachowując proporcje nadwozia.',
    },
    fitment: [
      { make: 'BMW', model: '3 Series G20', years: '2018+' },
      { make: 'Mercedes', model: 'C-Class W205', years: '2014-2021' },
    ],
    images: ['shot-detail-6', 'cat-spoilery'],
    variants: variants(STANDARD, 'lsl'),
    specs: [
      {
        label: { en: 'Extension', pl: 'Przedłużenie' },
        value: { en: '30 mm', pl: '30 mm' },
      },
      {
        label: { en: 'Thickness', pl: 'Grubość' },
        value: { en: '18 mm', pl: '18 mm' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '0.8 kg', pl: '0,8 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: '3M VHB tape', pl: 'Taśma 3M VHB' },
      },
    ],
    included: {
      en: ['Overlay', 'Mounting tape', 'Degreaser'],
      pl: ['Nakładka', 'Taśma montażowa', 'Odtłuszczacz'],
    },
    rating: 4.3,
    reviewCount: 62,
    badges: [],
    shippingDays: 2,
  },

  // ----------------------------------------------------------- rear diffusers
  {
    slug: 'race-fin-rear-diffuser',
    name: {
      en: 'Race Fin rear diffuser',
      pl: 'Dyfuzor tylny Race Fin',
    },
    categorySlug: 'rear-diffusers',
    price: 99900,
    compareAtPrice: 119900,
    shortDescription: {
      en: 'Five guiding fins, cut for a twin exhaust setup.',
      pl: 'Pięć żeber kierujących, wersja pod podwójny wydech.',
    },
    description: {
      en: 'Race Fin closes off the airflow leaving the underbody and clearly lowers the rear end visually. Five fins of varying height lead the stream out to the edge of the bumper. The standard version has cut-outs for two exhaust tips up to 90 mm in diameter.',
      pl: 'Race Fin zamyka przepływ powietrza spod podłogi i wyraźnie obniża wizualnie tył auta. Pięć żeber o zmiennej wysokości prowadzi strugę do krawędzi zderzaka. Wersja standardowa ma wycięcia pod dwie końcówki wydechu o średnicy do 90 mm.',
    },
    fitment: [
      { make: 'Audi', model: 'A4 B9', years: '2016-2023' },
      { make: 'Volkswagen', model: 'Passat B8', years: '2015+' },
    ],
    images: ['cat-dyfuzory', 'shot-detail-4', 'shot-detail-2'],
    variants: variants(STANDARD, 'rfn'),
    specs: [
      {
        label: { en: 'Fin count', pl: 'Liczba żeber' },
        value: { en: '5', pl: '5' },
      },
      {
        label: { en: 'Exhaust cut-outs', pl: 'Wycięcia wydechu' },
        value: { en: '2x max 90 mm', pl: '2x max 90 mm' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '2.9 kg', pl: '2,9 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Screws into existing points', pl: 'Wkręty w istniejące punkty' },
      },
      {
        label: { en: 'Fitting time', pl: 'Czas montażu' },
        value: { en: 'approx. 40 min', pl: 'ok. 40 min' },
      },
    ],
    included: {
      en: ['Diffuser', 'Full set of screws', 'Wall plugs', 'Instructions'],
      pl: ['Dyfuzor', 'Komplet wkrętów', 'Kołki rozporowe', 'Instrukcja'],
    },
    rating: 4.7,
    reviewCount: 156,
    badges: ['sale'],
    shippingDays: 3,
  },
  {
    slug: 'vortex-carbon-diffuser',
    name: {
      en: 'Vortex carbon diffuser',
      pl: 'Dyfuzor karbonowy Vortex',
    },
    categorySlug: 'rear-diffusers',
    price: 219900,
    shortDescription: {
      en: 'Full prepreg carbon with vortex generators.',
      pl: 'Pełny karbon prepreg z generatorami wirów.',
    },
    description: {
      en: 'Vortex is an autoclaved carbon diffuser with seven fins and a row of vortex generators along the leading edge. The design comes from a racing series, where at 200 km/h it adds noticeable downforce on the rear axle. The surface is finished in a UV-filtering clear coat.',
      pl: 'Vortex to dyfuzor z karbonu autoklawowanego z siedmioma żebrami i rzędem generatorów wirów na krawędzi wejściowej. Konstrukcja pochodzi z serii wyścigowej, gdzie przy 200 km/h dokłada zauważalny docisk tylnej osi. Powierzchnia lakierowana bezbarwnym lakierem z filtrem UV.',
    },
    fitment: [
      { make: 'BMW', model: 'M3 F80 / M4 F82', years: '2014-2020' },
      { make: 'BMW', model: '4 Series G22', years: '2020+' },
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
      {
        label: { en: 'Material', pl: 'Materiał' },
        value: { en: '2x2 twill prepreg carbon', pl: 'Karbon prepreg 2x2 twill' },
      },
      {
        label: { en: 'Fin count', pl: 'Liczba żeber' },
        value: { en: '7', pl: '7' },
      },
      {
        label: { en: 'Vortex generators', pl: 'Generatory wirów' },
        value: { en: '6 pcs', pl: '6 szt.' },
      },
      {
        label: { en: 'Weight', pl: 'Waga' },
        value: { en: '2.1 kg', pl: '2,1 kg' },
      },
      {
        label: { en: 'Clear coat', pl: 'Lakier' },
        value: { en: 'Clear with UV filter', pl: 'Bezbarwny z filtrem UV' },
      },
    ],
    included: {
      en: ['Carbon diffuser', 'Mounting kit', 'Material certificate', 'Instructions'],
      pl: ['Dyfuzor karbonowy', 'Zestaw montażowy', 'Certyfikat materiału', 'Instrukcja'],
    },
    rating: 5.0,
    reviewCount: 19,
    badges: ['new'],
    shippingDays: 10,
  },

  // -------------------------------------------------------------- side skirts
  {
    slug: 'street-line-side-skirts',
    name: {
      en: 'Street Line side skirt extensions',
      pl: 'Nakładki progowe Street Line',
    },
    categorySlug: 'side-skirts',
    price: 84900,
    shortDescription: {
      en: 'A pair of side skirt extensions that drop the visual ride height by 40 mm.',
      pl: 'Para dokładek progowych, obniżenie optyczne o 40 mm.',
    },
    description: {
      en: 'Street Line closes the side profile between the splitter and the diffuser. The extensions visually lower the silhouette by 40 mm and have a shaped edge that does not collect dirt thrown from the wheel. They fit onto original mounting points and tape - no drilling into the structural sill.',
      pl: 'Street Line domyka linię boczną między splitterem a dyfuzorem. Dokładki obniżają optycznie sylwetkę o 40 mm i mają wyprofilowaną krawędź, która nie zbiera brudu spod koła. Montaż na oryginalne punkty i taśmę - bez wiercenia w progu nośnym.',
    },
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Skoda', model: 'Octavia IV', years: '2019+' },
    ],
    images: ['cat-progi', 'shot-detail-6', 'shot-detail-1'],
    variants: variants(STANDARD, 'stl'),
    specs: [
      {
        label: { en: 'Visual drop', pl: 'Obniżenie optyczne' },
        value: { en: '40 mm', pl: '40 mm' },
      },
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: 'Pair (L+R)', pl: 'Para (L+P)' },
      },
      {
        label: { en: 'Weight per pair', pl: 'Waga pary' },
        value: { en: '4.2 kg', pl: '4,2 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Factory points + 3M tape', pl: 'Punkty fabryczne + taśma 3M' },
      },
    ],
    included: {
      en: ['Left and right extensions', 'Mounting clips', '3M VHB tape', 'Instructions'],
      pl: ['Nakładki L i P', 'Klipsy montażowe', 'Taśma 3M VHB', 'Instrukcja'],
    },
    rating: 4.6,
    reviewCount: 174,
    badges: ['bestseller'],
    shippingDays: 3,
  },
  {
    slug: 'widebody-flare-kit',
    name: {
      en: 'Widebody Flare kit',
      pl: 'Poszerzenia Widebody Flare',
    },
    categorySlug: 'side-skirts',
    price: 329900,
    shortDescription: {
      en: 'A full set of arch flares adding +35 mm per side.',
      pl: 'Komplet poszerzeń nadkoli +35 mm na oś.',
    },
    description: {
      en: 'A set of four arch flares adding 35 mm per side. It lets you tuck wider wheels and tyres under the body without cutting the wing. The edges are rolled inwards, so they will not slice a tyre at full lock and full suspension travel.',
      pl: 'Zestaw czterech poszerzeń nadkoli dodających 35 mm na stronę. Pozwala schować pod nadwoziem szersze felgi i opony bez przycinania błotnika. Krawędzie są wywinięte do wewnątrz, więc nie tną opony przy pełnym skręcie i ugięciu zawieszenia.',
    },
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
      {
        label: { en: 'Width added', pl: 'Poszerzenie' },
        value: { en: '+35 mm per side', pl: '+35 mm na stronę' },
      },
      {
        label: { en: 'Piece count', pl: 'Liczba elementów' },
        value: { en: '4 pcs', pl: '4 szt.' },
      },
      {
        label: { en: 'Set weight', pl: 'Waga kompletu' },
        value: { en: '8.6 kg', pl: '8,6 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Blind rivets + tape', pl: 'Nity zrywalne + taśma' },
      },
      {
        label: { en: 'Required', pl: 'Wymagane' },
        value: { en: 'Painting before fitting', pl: 'Lakierowanie przed montażem' },
      },
    ],
    included: {
      en: ['Flares, 4 pcs', 'Blind rivets and washers', 'Sealing tape', 'Fitting template'],
      pl: [
        'Poszerzenia 4 szt.',
        'Nity zrywalne i podkładki',
        'Taśma uszczelniająca',
        'Szablon montażowy',
      ],
    },
    rating: 4.8,
    reviewCount: 52,
    badges: ['new'],
    shippingDays: 14,
  },

  // ------------------------------------------------------------------- wheels
  {
    slug: 'rs01-forged-wheels-19',
    name: {
      en: 'RS-01 forged wheels 19"',
      pl: 'Felgi kute RS-01 19"',
    },
    categorySlug: 'wheels',
    price: 699900,
    shortDescription: {
      en: 'A set of four forged wheels, 19x8.5 ET35.',
      pl: 'Komplet czterech felg kutych, 19x8.5 ET35.',
    },
    description: {
      en: 'RS-01 is a one-piece forged wheel in 6061-T6 aluminium. Forging cuts weight by 25 percent against a cast wheel while raising strength. Ten twin spokes expose the brake caliper, and the finish is protected with powder coating.',
      pl: 'RS-01 to felga kuta jednoczęściowa z aluminium 6061-T6. Proces kucia daje o 25 procent niższą masę względem odlewu przy wyższej wytrzymałości. Dziesięć podwójnych ramion odsłania zacisk hamulcowy, a wykończenie jest zabezpieczone lakierem proszkowym.',
    },
    fitment: [
      { make: 'BMW', model: 'PCD 5x120', years: 'all' },
      { make: 'Audi', model: 'PCD 5x112', years: 'all' },
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
      {
        label: { en: 'Size', pl: 'Rozmiar' },
        value: { en: '19x8.5"', pl: '19x8.5"' },
      },
      {
        label: { en: 'Offset', pl: 'Offset' },
        value: { en: 'ET35', pl: 'ET35' },
      },
      {
        label: { en: 'Bolt pattern', pl: 'Rozstaw' },
        value: { en: '5x112 or 5x120', pl: '5x112 lub 5x120' },
      },
      {
        label: { en: 'Weight per wheel', pl: 'Waga felgi' },
        value: { en: '9.2 kg', pl: '9,2 kg' },
      },
      {
        label: { en: 'Load rating', pl: 'Obciążenie' },
        value: { en: '750 kg each', pl: '750 kg/szt.' },
      },
    ],
    included: {
      en: ['4 wheels', 'Centre caps', 'Hubcentric rings', 'TÜV certificate'],
      pl: ['4 felgi', 'Kapsle centrujące', 'Pierścienie centrujące', 'Certyfikat TÜV'],
    },
    rating: 4.9,
    reviewCount: 76,
    badges: ['bestseller'],
    shippingDays: 5,
  },
  {
    slug: 'hubcentric-spacers-20mm',
    name: {
      en: 'Hubcentric wheel spacers 20 mm',
      pl: 'Dystanse hubcentryczne 20 mm',
    },
    categorySlug: 'wheels',
    price: 49900,
    shortDescription: {
      en: 'A pair of spacers with a centring lip and extended bolts.',
      pl: 'Para dystansów z pierścieniem centrującym i śrubami.',
    },
    description: {
      en: 'Spacers machined from 7075 aluminium with a centring lip that carries the load on the hub rather than on the bolts. The set includes longer bolts with the correct thread engagement, so there is nothing to buy separately.',
      pl: 'Dystanse frezowane z aluminium 7075 z pierścieniem centrującym przenoszącym obciążenie na piastę, a nie na śruby. Komplet zawiera dłuższe śruby o właściwej długości gwintu, więc nie trzeba dokupować ich osobno.',
    },
    fitment: [{ make: 'Universal', model: 'By PCD and hub bore', years: 'all' }],
    images: ['shot-wheel-2', 'cat-felgi'],
    variants: variants(
      [
        { material: 'aluminium', finish: 'matte-black', delta: 0 },
        { material: 'aluminium', finish: 'gloss-black', delta: 4000 },
      ],
      'dys',
    ),
    specs: [
      {
        label: { en: 'Thickness', pl: 'Grubość' },
        value: { en: '20 mm', pl: '20 mm' },
      },
      {
        label: { en: 'Material', pl: 'Materiał' },
        value: { en: '7075-T6 aluminium', pl: 'Aluminium 7075-T6' },
      },
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: 'Pair (2 pcs)', pl: 'Para (2 szt.)' },
      },
      {
        label: { en: 'Centring', pl: 'Centrowanie' },
        value: { en: 'Hubcentric', pl: 'Hubcentryczne' },
      },
      {
        label: { en: 'Bolts', pl: 'Śruby' },
        value: { en: 'Included', pl: 'W komplecie' },
      },
    ],
    included: {
      en: ['2 spacers', '10 bolts', 'Hubcentric rings', 'Certificate'],
      pl: ['2 dystanse', '10 śrub', 'Pierścienie centrujące', 'Certyfikat'],
    },
    rating: 4.5,
    reviewCount: 98,
    badges: [],
    shippingDays: 2,
  },

  // ---------------------------------------------------------------- exhausts
  {
    slug: 'sport-304-catback-exhaust',
    name: {
      en: 'Sport 304 cat-back exhaust',
      pl: 'Wydech cat-back Sport 304',
    },
    categorySlug: 'exhausts',
    price: 389900,
    shortDescription: {
      en: 'A 304 stainless cat-back system with a remote-controlled valve.',
      pl: 'System cat-back ze stali 304 z klapą sterowaną pilotem.',
    },
    description: {
      en: 'A complete system from the catalytic converter back, built in 304 stainless steel and mandrel bent so the cross section stays constant through the bends. The remote-controlled valve lets you switch between quiet and sport modes without getting out of the car.',
      pl: 'Kompletny układ od katalizatora wstecz, wykonany ze stali nierdzewnej 304 metodą gięcia na trzpieniu, co utrzymuje stały przekrój na łukach. Klapa sterowana pilotem pozwala przełączać się między trybem cichym a sportowym bez wychodzenia z auta.',
    },
    fitment: [
      { make: 'BMW', model: '3 Series G20 320i/330i', years: '2018+' },
      { make: 'BMW', model: '4 Series G22', years: '2020+' },
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
      {
        label: { en: 'Material', pl: 'Materiał' },
        value: { en: '304 stainless steel', pl: 'Stal nierdzewna 304' },
      },
      {
        label: { en: 'Pipe diameter', pl: 'Średnica rur' },
        value: { en: '63.5 mm', pl: '63,5 mm' },
      },
      {
        label: { en: 'Tips', pl: 'Końcówki' },
        value: { en: '2x114 mm', pl: '2x114 mm' },
      },
      {
        label: { en: 'Valve', pl: 'Klapa' },
        value: { en: 'Remote controlled', pl: 'Sterowana pilotem' },
      },
      {
        label: { en: 'Power gain', pl: 'Wzrost mocy' },
        value: { en: '8-12 hp', pl: '8-12 KM' },
      },
    ],
    included: {
      en: ['Cat-back system', 'Valve with actuator', 'Remote', 'Gaskets and clamps'],
      pl: ['Układ cat-back', 'Klapa z siłownikiem', 'Pilot', 'Uszczelki i obejmy'],
    },
    rating: 4.8,
    reviewCount: 44,
    badges: [],
    shippingDays: 7,
  },
  {
    slug: 'carbon-101-exhaust-tips',
    name: {
      en: 'Carbon 101 exhaust tips',
      pl: 'Końcówki wydechu Carbon 101',
    },
    categorySlug: 'exhausts',
    price: 79900,
    shortDescription: {
      en: 'A pair of carbon tip sleeves, clamped onto the existing tips.',
      pl: 'Para nakładek karbonowych na końcówki, montaż na obejmę.',
    },
    description: {
      en: 'Carbon sleeves with an inner stainless steel liner that shields the resin from exhaust gas temperature. They clamp with an allen-key band onto an existing tip between 54 and 70 mm in diameter.',
      pl: 'Nakładki z karbonu z wewnętrzną tuleją ze stali nierdzewnej, która chroni żywicę przed temperaturą spalin. Montaż na obejmę imbusową na istniejącą końcówkę o średnicy 54-70 mm.',
    },
    fitment: [{ make: 'Universal', model: 'Tips 54-70 mm', years: 'all' }],
    images: ['cat-karbon', 'cat-wydechy'],
    variants: variants(
      [
        { material: 'carbon', finish: 'carbon-gloss', delta: 0 },
        { material: 'carbon', finish: 'carbon-matte', delta: 6000 },
      ],
      'c101',
    ),
    specs: [
      {
        label: { en: 'Fitting range', pl: 'Zakres montażu' },
        value: { en: 'Ø 54-70 mm', pl: 'Ø 54-70 mm' },
      },
      {
        label: { en: 'Outlet diameter', pl: 'Średnica wylotu' },
        value: { en: '101 mm', pl: '101 mm' },
      },
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: 'Pair (2 pcs)', pl: 'Para (2 szt.)' },
      },
      {
        label: { en: 'Liner', pl: 'Tuleja' },
        value: { en: 'Stainless steel', pl: 'Stal nierdzewna' },
      },
    ],
    included: {
      en: ['2 tips', 'Allen-key clamps', 'Allen key'],
      pl: ['2 końcówki', 'Obejmy imbusowe', 'Klucz imbusowy'],
    },
    rating: 4.6,
    reviewCount: 121,
    badges: [],
    shippingDays: 2,
  },

  // --------------------------------------------------------------- suspension
  {
    slug: 'street-comfort-coilovers',
    name: {
      en: 'Street Comfort coilovers',
      pl: 'Zawieszenie gwintowane Street Comfort',
    },
    categorySlug: 'suspension',
    price: 429900,
    shortDescription: {
      en: '30-70 mm of ride height adjustment and 32 damping settings.',
      pl: 'Regulacja wysokości 30-70 mm i 32 stopnie tłumienia.',
    },
    description: {
      en: 'A coilover kit with 30-70 mm of ride height adjustment and thirty-two rebound damping settings. The characteristics are tuned for daily driving - the drop looks right, but the car still handles potholes and speed bumps.',
      pl: 'Zestaw gwintowany z regulacją wysokości w zakresie 30-70 mm i trzydziestoma dwoma stopniami tłumienia odbicia. Charakterystyka dobrana pod codzienną jazdę - obniżenie wygląda dobrze, ale auto nadal znosi dziury i progi zwalniające.',
    },
    fitment: [
      { make: 'Volkswagen', model: 'Golf VII/VIII', years: '2013+' },
      { make: 'Audi', model: 'A3 8V/8Y', years: '2013+' },
    ],
    images: ['cat-zawieszenie', 'shot-wheel-1'],
    variants: variants([{ material: 'aluminium', finish: 'gloss-black', delta: 0 }], 'zsc'),
    specs: [
      {
        label: { en: 'Drop range', pl: 'Zakres obniżenia' },
        value: { en: '30-70 mm', pl: '30-70 mm' },
      },
      {
        label: { en: 'Damping adjustment', pl: 'Regulacja tłumienia' },
        value: { en: '32 settings', pl: '32 stopnie' },
      },
      {
        label: { en: 'Springs', pl: 'Sprężyny' },
        value: { en: 'Chrome-silicon steel', pl: 'Stal chromowo-krzemowa' },
      },
      {
        label: { en: 'Body', pl: 'Korpus' },
        value: { en: 'Galvanised steel', pl: 'Stal ocynkowana' },
      },
      {
        label: { en: 'Warranty', pl: 'Gwarancja' },
        value: { en: '24 months', pl: '24 miesiące' },
      },
    ],
    included: {
      en: ['4 dampers', 'Springs', 'Top mounts', 'Adjustment wrench', 'Certificate'],
      pl: ['4 amortyzatory', 'Sprężyny', 'Poduszki górne', 'Klucz regulacyjny', 'Certyfikat'],
    },
    rating: 4.7,
    reviewCount: 88,
    badges: [],
    shippingDays: 5,
  },
  {
    slug: 'sport-lowering-springs-35',
    name: {
      en: 'Sport lowering springs -35 mm',
      pl: 'Sprężyny obniżające Sport -35 mm',
    },
    categorySlug: 'suspension',
    price: 119900,
    shortDescription: {
      en: 'A set of springs that lowers the car by 35 mm, road legal.',
      pl: 'Komplet sprężyn obniżających o 35 mm, homologacja.',
    },
    description: {
      en: 'Progressive rate springs that lower the body by 35 mm. They work with the factory dampers, making this the simplest way to fix the arch gap without replacing the whole suspension.',
      pl: 'Sprężyny o progresywnej charakterystyce obniżające nadwozie o 35 mm. Współpracują z amortyzatorami fabrycznymi, więc to najprostszy sposób na poprawienie proporcji nadkola bez wymiany całego zawieszenia.',
    },
    fitment: [
      { make: 'BMW', model: '3 Series G20', years: '2018+' },
      { make: 'Mercedes', model: 'C-Class W205', years: '2014-2021' },
    ],
    images: ['cat-zawieszenie', 'shot-wheel-2'],
    variants: variants([{ material: 'aluminium', finish: 'matte-black', delta: 0 }], 'sp35'),
    specs: [
      {
        label: { en: 'Drop', pl: 'Obniżenie' },
        value: { en: '35 mm front and rear', pl: '35 mm przód i tył' },
      },
      {
        label: { en: 'Spring rate', pl: 'Charakterystyka' },
        value: { en: 'Progressive', pl: 'Progresywna' },
      },
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: '4 springs', pl: '4 sprężyny' },
      },
      {
        label: { en: 'Type approval', pl: 'Homologacja' },
        value: { en: 'Yes', pl: 'Tak' },
      },
    ],
    included: {
      en: ['4 springs', 'Type approval certificate', 'Instructions'],
      pl: ['4 sprężyny', 'Certyfikat homologacji', 'Instrukcja'],
    },
    rating: 4.4,
    reviewCount: 143,
    badges: [],
    shippingDays: 3,
  },

  // ------------------------------------------------------------ carbon parts
  {
    slug: 'carbon-mirror-caps',
    name: {
      en: 'Carbon mirror caps',
      pl: 'Obudowy lusterek karbonowe',
    },
    categorySlug: 'carbon-parts',
    price: 149900,
    shortDescription: {
      en: 'A pair of mirror caps in 2x2 twill prepreg.',
      pl: 'Para nakładek na lusterka, prepreg 2x2 twill.',
    },
    description: {
      en: 'Autoclaved carbon caps that fit over the factory mirror housings. They need no dismantling of the mechanism - just pop off the outer cover and clip the new one on. The 2x2 twill weave is direction-matched between the left and right side.',
      pl: 'Nakładki z karbonu autoklawowanego zakładane na fabryczne obudowy lusterek. Nie wymagają demontażu mechanizmu - wystarczy zdjąć zewnętrzną klapkę i zatrzasnąć nową. Splot 2x2 twill jest dopasowany kierunkowo między lewą a prawą stroną.',
    },
    fitment: [
      { make: 'BMW', model: '3 Series G20', years: '2018+' },
      { make: 'BMW', model: '4 Series G22', years: '2020+' },
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
      {
        label: { en: 'Material', pl: 'Materiał' },
        value: { en: '2x2 twill prepreg', pl: 'Prepreg 2x2 twill' },
      },
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: 'Pair (L+R)', pl: 'Para (L+P)' },
      },
      {
        label: { en: 'Weight per pair', pl: 'Waga pary' },
        value: { en: '0.6 kg', pl: '0,6 kg' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Clip-on, no bonding', pl: 'Na zatrzaski, bez klejenia' },
      },
    ],
    included: {
      en: ['2 caps', 'Cover removal instructions'],
      pl: ['2 obudowy', 'Instrukcja demontażu klapek'],
    },
    rating: 4.9,
    reviewCount: 67,
    badges: ['bestseller'],
    shippingDays: 4,
  },
  {
    slug: 'vented-carbon-bonnet',
    name: {
      en: 'Vented carbon bonnet',
      pl: 'Maska karbonowa Vented',
    },
    categorySlug: 'carbon-parts',
    price: 899900,
    compareAtPrice: 1049900,
    shortDescription: {
      en: 'A bonnet with heat extraction vents, -9 kg.',
      pl: 'Maska z wlotami odprowadzającymi ciepło, -9 kg.',
    },
    description: {
      en: 'A carbon bonnet with two vents that extract hot air from the engine bay. Against the factory bonnet it saves around 9 kg, which shows up directly in the weight over the front axle. Hinges and the latch bolt into the original points.',
      pl: 'Maska z karbonu z dwoma wlotami odprowadzającymi gorące powietrze z komory silnika. Względem maski fabrycznej jest lżejsza o około 9 kg, co przekłada się na rozkład masy na przedniej osi. Zawiasy i zamek montowane w punkty oryginalne.',
    },
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
      {
        label: { en: 'Weight saving', pl: 'Redukcja masy' },
        value: { en: '-9 kg vs. factory', pl: '-9 kg vs. fabryczna' },
      },
      {
        label: { en: 'Vents', pl: 'Wloty' },
        value: { en: '2 pcs, heat extraction', pl: '2 szt., odprowadzenie ciepła' },
      },
      {
        label: { en: 'Material', pl: 'Materiał' },
        value: { en: 'Prepreg carbon, autoclaved', pl: 'Karbon prepreg, autoklaw' },
      },
      {
        label: { en: 'Bonnet pins', pl: 'Zapinki' },
        value: { en: 'Included', pl: 'W komplecie' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: 'Factory points', pl: 'Punkty fabryczne' },
      },
    ],
    included: {
      en: ['Bonnet', 'Bonnet pins, 2 pcs', 'Seals', 'Material certificate'],
      pl: ['Maska', 'Zapinki maski 2 szt.', 'Uszczelki', 'Certyfikat materiału'],
    },
    rating: 4.8,
    reviewCount: 12,
    badges: ['sale'],
    shippingDays: 21,
  },
  {
    slug: 'carbon-led-door-sills',
    name: {
      en: 'Carbon LED door sills',
      pl: 'Listwy progowe karbonowe LED',
    },
    categorySlug: 'carbon-parts',
    price: 69900,
    shortDescription: {
      en: 'Illuminated inner door sill covers, 4 pcs.',
      pl: 'Podświetlane nakładki na progi wewnętrzne, 4 szt.',
    },
    description: {
      en: 'Carbon covers for the inner door sills with an illuminated logo. They run off a USB port or straight from the wiring loom, and a door sensor switches the lighting on automatically.',
      pl: 'Nakładki na wewnętrzne progi drzwi z karbonu z podświetlanym logo. Zasilanie z portu USB lub bezpośrednio z instalacji, czujnik otwarcia drzwi uruchamia podświetlenie automatycznie.',
    },
    fitment: [{ make: 'Universal', model: 'Cut to size', years: 'all' }],
    images: ['cat-karbon', 'shot-detail-3'],
    variants: variants([{ material: 'carbon', finish: 'carbon-gloss', delta: 0 }], 'lpc'),
    specs: [
      {
        label: { en: 'Contents', pl: 'Zawartość' },
        value: { en: '4 pcs', pl: '4 szt.' },
      },
      {
        label: { en: 'Power', pl: 'Zasilanie' },
        value: { en: 'USB or 12 V wiring', pl: 'USB lub instalacja 12 V' },
      },
      {
        label: { en: 'LED colour', pl: 'Kolor LED' },
        value: { en: 'Cool white', pl: 'Biały zimny' },
      },
      {
        label: { en: 'Fitting', pl: 'Montaż' },
        value: { en: '3M tape', pl: 'Taśma 3M' },
      },
    ],
    included: {
      en: ['4 sill covers', 'Wiring', '3M tape', 'Instructions'],
      pl: ['4 listwy', 'Okablowanie', 'Taśma 3M', 'Instrukcja'],
    },
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

/** Products from the same category, minus the current one - for the "related" section. */
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

/** Lowest variant price - used for the "from X zl" label. */
export function getMinPrice(product: Product): number {
  const deltas = product.variants.map((variant) => variant.priceDelta);
  return product.price + Math.min(...deltas, 0);
}
