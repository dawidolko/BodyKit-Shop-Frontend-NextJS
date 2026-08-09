import type { Category } from './types';

/**
 * Product categories. Slugs are English and shared across locales, so a link
 * only ever changes its locale prefix, never the rest of the path.
 */
export const categories: Category[] = [
  {
    slug: 'front-splitters',
    name: {
      en: 'Front splitters',
      pl: 'Splittery przednie',
    },
    tagline: {
      en: 'Front axle downforce and a sharper nose',
      pl: 'Dociążenie przedniej osi i ostrzejszy front',
    },
    description: {
      en: 'A front splitter guides air under the body and adds downforce to the front axle at speed. We stock ABS versions ready for paint, lightweight FRP and full prepreg carbon with a visible 2x2 twill weave.',
      pl: 'Splitter przedni prowadzi powietrze pod nadwoziem i zwiększa docisk przedniej osi przy wyższych prędkościach. W ofercie mamy wersje ABS pod lakier, lekkie FRP oraz pełny karbon prepreg z widoczną teksturą 2x2 twill.',
    },
    image: 'cat-splittery',
  },
  {
    slug: 'spoilers',
    name: {
      en: 'Spoilers and wings',
      pl: 'Spoilery i skrzydła',
    },
    tagline: {
      en: 'From a subtle ducktail to a GT wing',
      pl: 'Od dyskretnej lotki po skrzydło typu GT',
    },
    description: {
      en: 'Boot lid ducktails, overlays for factory spoilers and free-standing GT wings on uprights. Every model is matched to a specific boot lid shape, so it sits flush without filler or trimming.',
      pl: 'Lotki na klapę bagażnika, nakładki na spoiler fabryczny i wolnostojące skrzydła GT na słupkach. Każdy model dobierany jest pod konkretny kształt klapy, więc przylega bez szpachlowania i dopasowywania.',
    },
    image: 'cat-spoilery',
  },
  {
    slug: 'rear-diffusers',
    name: {
      en: 'Rear diffusers',
      pl: 'Dyfuzory tylne',
    },
    tagline: {
      en: 'Ordered airflow leaving the underbody',
      pl: 'Uporządkowany przepływ powietrza z tyłu auta',
    },
    description: {
      en: 'Diffusers with guiding fins close off the underbody airflow and visually lower the rear end. Available for single and twin exhaust outlets, plus a version for sport bumpers.',
      pl: 'Dyfuzory z żebrami kierującymi domykają przepływ pod podłogą i wizualnie obniżają tył nadwozia. Dostępne w wariantach pod jedną i dwie końcówki wydechu oraz w wersji pod zderzak sportowy.',
    },
    image: 'cat-dyfuzory',
  },
  {
    slug: 'side-skirts',
    name: {
      en: 'Side skirt extensions',
      pl: 'Nakładki progowe',
    },
    tagline: {
      en: 'A visually lower, continuous side profile',
      pl: 'Optyczne obniżenie i spójna linia boczna',
    },
    description: {
      en: 'Side skirt extensions tie the front splitter and rear diffuser into one line. They mount on 3M VHB tape and screws into existing points, with no drilling into the structural sill.',
      pl: 'Dokładki progów łączą splitter przedni z dyfuzorem w jedną linię. Montaż na taśmę 3M VHB i wkręty w istniejące punkty, bez wiercenia w progu nośnym.',
    },
    image: 'cat-progi',
  },
  {
    slug: 'wheels',
    name: {
      en: 'Wheels and spacers',
      pl: 'Felgi i dystanse',
    },
    tagline: {
      en: 'Filling the arch with the right offset',
      pl: 'Wypełnienie nadkola i właściwy offset',
    },
    description: {
      en: 'Forged and cast wheels from 17 to 20 inches, plus certified spacers. Every size lists its offset, backspacing and any arch rolling it requires.',
      pl: 'Felgi kute i odlewane w rozmiarach 17-20 cali oraz dystanse z certyfikatem. Do każdego rozmiaru podajemy ET, wylot i wymagane przetłoczenie nadkola.',
    },
    image: 'cat-felgi',
  },
  {
    slug: 'exhausts',
    name: {
      en: 'Exhaust systems',
      pl: 'Układy wydechowe',
    },
    tagline: {
      en: 'Sound, and tips you can see',
      pl: 'Dźwięk i końcówki, które widać',
    },
    description: {
      en: 'Rear silencers, 304 stainless cat-back systems and carbon tips. Valve-controlled versions let you change the character of the sound without swapping parts.',
      pl: 'Tłumiki końcowe, systemy cat-back ze stali 304 i końcówki karbonowe. Warianty z klapą sterowaną pilotem pozwalają zmieniać charakter dźwięku bez wymiany elementów.',
    },
    image: 'cat-wydechy',
  },
  {
    slug: 'suspension',
    name: {
      en: 'Suspension',
      pl: 'Zawieszenie',
    },
    tagline: {
      en: 'Ride height and geometry under control',
      pl: 'Prześwit i geometria pod kontrolą',
    },
    description: {
      en: 'Coilover kits, lowering springs and air suspension. Drop heights are chosen so body parts keep a safe clearance over kerbs.',
      pl: 'Zestawy gwintowane, sprężyny obniżające i poduszki powietrzne. Obniżenie dobierane tak, by dokładki zachowały bezpieczny prześwit nad krawężnikiem.',
    },
    image: 'cat-zawieszenie',
  },
  {
    slug: 'carbon-parts',
    name: {
      en: 'Carbon parts',
      pl: 'Elementy karbonowe',
    },
    tagline: {
      en: '2x2 twill prepreg with UV clear coat',
      pl: 'Prepreg 2x2 twill z lakierem UV',
    },
    description: {
      en: 'Bonnets, mirror caps, roof overlays and trims in autoclaved carbon fibre. The surface is protected with a UV-filtering clear coat that keeps the resin from yellowing.',
      pl: 'Maski, obudowy lusterek, nakładki na dach i listwy z włókna węglowego autoklawowanego. Powierzchnia zabezpieczona lakierem z filtrem UV, który zapobiega żółknięciu żywicy.',
    },
    image: 'cat-karbon',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
