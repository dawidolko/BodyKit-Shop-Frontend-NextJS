import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'splittery',
    name: 'Splittery przednie',
    tagline: 'Dociążenie przedniej osi i ostrzejszy front',
    description:
      'Splitter przedni prowadzi powietrze pod nadwoziem i zwiększa docisk przedniej osi przy wyższych prędkościach. W ofercie mamy wersje ABS pod lakier, lekkie FRP oraz pełny karbon prepreg z widoczną teksturą 2x2 twill.',
    image: 'cat-splittery',
    icon: 'splitter',
  },
  {
    slug: 'spoilery',
    name: 'Spoilery i skrzydła',
    tagline: 'Od dyskretnej lotki po skrzydło typu GT',
    description:
      'Lotki na klapę bagażnika, nakładki na spoiler fabryczny i wolnostojące skrzydła GT na słupkach. Każdy model dobierany jest pod konkretny kształt klapy, więc przylega bez szpachlowania i dopasowywania.',
    image: 'cat-spoilery',
    icon: 'spoiler',
  },
  {
    slug: 'dyfuzory',
    name: 'Dyfuzory tylne',
    tagline: 'Uporządkowany przepływ powietrza z tyłu auta',
    description:
      'Dyfuzory z żebrami kierującymi domykają przepływ pod podłogą i wizualnie obniżają tył nadwozia. Dostępne w wariantach pod jedną i dwie końcówki wydechu oraz w wersji pod zderzak sportowy.',
    image: 'cat-dyfuzory',
    icon: 'diffuser',
  },
  {
    slug: 'progi',
    name: 'Nakładki progowe',
    tagline: 'Optyczne obniżenie i spójna linia boczna',
    description:
      'Dokładki progów łączą splitter przedni z dyfuzorem w jedną linię. Montaż na taśmę 3M VHB i wkręty w istniejące punkty, bez wiercenia w progu nośnym.',
    image: 'cat-progi',
    icon: 'skirt',
  },
  {
    slug: 'felgi',
    name: 'Felgi i dystanse',
    tagline: 'Wypełnienie nadkola i właściwy offset',
    description:
      'Felgi kute i odlewane w rozmiarach 17-20 cali oraz dystanse z certyfikatem. Do każdego rozmiaru podajemy ET, wylot i wymagane przetłoczenie nadkola.',
    image: 'cat-felgi',
    icon: 'wheel',
  },
  {
    slug: 'wydechy',
    name: 'Układy wydechowe',
    tagline: 'Dźwięk i końcówki, które widać',
    description:
      'Tłumiki końcowe, systemy cat-back ze stali 304 i końcówki karbonowe. Warianty z klapą sterowaną pilotem pozwalają zmieniać charakter dźwięku bez wymiany elementów.',
    image: 'cat-wydechy',
    icon: 'exhaust',
  },
  {
    slug: 'zawieszenie',
    name: 'Zawieszenie',
    tagline: 'Prześwit i geometria pod kontrolą',
    description:
      'Zestawy gwintowane, sprężyny obniżające i poduszki powietrzne. Obniżenie dobierane tak, by dokładki zachowały bezpieczny prześwit nad krawężnikiem.',
    image: 'cat-zawieszenie',
    icon: 'suspension',
  },
  {
    slug: 'karbon',
    name: 'Elementy karbonowe',
    tagline: 'Prepreg 2x2 twill z lakierem UV',
    description:
      'Maski, obudowy lusterek, nakładki na dach i listwy z włókna węglowego autoklawowanego. Powierzchnia zabezpieczona lakierem z filtrem UV, który zapobiega żółknięciu żywicy.',
    image: 'cat-karbon',
    icon: 'carbon',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
