import type { Locale } from '@/i18n/config';

/** A string that exists in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Material a part is made from — drives price and fitting method. */
export type Material = 'abs' | 'carbon' | 'frp' | 'pu' | 'aluminium';

/** Surface finish of the part. */
export type Finish = 'gloss-black' | 'matte-black' | 'carbon-gloss' | 'carbon-matte' | 'primed';

/** Marketing labels shown on product cards. */
export type BadgeKey = 'new' | 'bestseller' | 'sale' | 'lastUnits';

export type Category = {
  slug: string;
  name: Localized;
  /** Short line under the category heading. */
  tagline: Localized;
  description: Localized;
  image: string;
};

export type ProductVariant = {
  id: string;
  material: Material;
  finish: Finish;
  /** Surcharge over the base price, in grosz. */
  priceDelta: number;
  inStock: boolean;
};

/** Which cars a part fits. Make and model are brand names, so not translated. */
export type Fitment = {
  make: string;
  model: string;
  years: string;
};

export type Spec = {
  label: Localized;
  value: Localized;
};

export type Product = {
  slug: string;
  name: Localized;
  categorySlug: string;
  /** Base price in grosz — integers avoid floating point rounding errors. */
  price: number;
  /** Price before the discount, when the product is on sale. */
  compareAtPrice?: number;
  shortDescription: Localized;
  description: Localized;
  fitment: Fitment[];
  images: string[];
  variants: ProductVariant[];
  specs: Spec[];
  /** Contents of the fitting kit. */
  included: Localized<string[]>;
  rating: number;
  reviewCount: number;
  badges: BadgeKey[];
  /** Dispatch time in business days. */
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
  /** Unit price including the variant surcharge, in grosz. */
  unitPrice: number;
  lineTotal: number;
};
