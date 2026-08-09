/** Materiał, z ktorego wykonana jest czesc - wplywa na cene i montaz. */
export type Material = 'abs' | 'carbon' | 'frp' | 'pu' | 'aluminium';

/** Wykonczenie powierzchni. */
export type Finish = 'gloss-black' | 'matte-black' | 'carbon-gloss' | 'carbon-matte' | 'primed';

export type Category = {
  slug: string;
  name: string;
  /** Krotki opis pod naglowkiem kategorii. */
  tagline: string;
  description: string;
  image: string;
  /** Ikona SVG renderowana w kaflach - klucz z CategoryIcon. */
  icon:
    'splitter' | 'spoiler' | 'diffuser' | 'skirt' | 'wheel' | 'exhaust' | 'suspension' | 'carbon';
};

export type ProductVariant = {
  id: string;
  material: Material;
  finish: Finish;
  /** Dopłata do ceny bazowej w groszach. */
  priceDelta: number;
  inStock: boolean;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  /** Cena bazowa w groszach - liczby calkowite eliminuja bledy zaokraglen. */
  price: number;
  /** Cena przed obnizka, jesli produkt jest w promocji. */
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  /** Dopasowanie: marka -> modele z rocznikami. */
  fitment: { make: string; model: string; years: string }[];
  images: string[];
  variants: ProductVariant[];
  specs: { label: string; value: string }[];
  /** Zawartosc zestawu montazowego. */
  included: string[];
  rating: number;
  reviewCount: number;
  badges: ('nowosc' | 'bestseller' | 'promocja' | 'ostatnie-sztuki')[];
  /** Czas wysylki w dniach roboczych. */
  shippingDays: number;
};

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

export type CartLineDetailed = CartLine & {
  product: Product;
  variant: ProductVariant;
  /** Cena jednostkowa z uwzglednieniem wariantu, w groszach. */
  unitPrice: number;
  lineTotal: number;
};
