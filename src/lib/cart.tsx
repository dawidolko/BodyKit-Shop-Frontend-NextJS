'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { CartLine, CartLineDetailed } from './types';
import { getProduct } from './products';

const STORAGE_KEY = 'bodykit-cart-v1';

/** Darmowa dostawa od tej kwoty (w groszach). */
export const FREE_SHIPPING_THRESHOLD = 50000;
export const SHIPPING_COST = 2490;

type CartAction =
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; productSlug: string; variantId: string }
  | { type: 'setQuantity'; productSlug: string; variantId: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: CartLine[] };

function reducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;

    case 'add': {
      const existing = state.find(
        (line) =>
          line.productSlug === action.line.productSlug && line.variantId === action.line.variantId,
      );
      if (existing) {
        return state.map((line) =>
          line === existing
            ? { ...line, quantity: Math.min(99, line.quantity + action.line.quantity) }
            : line,
        );
      }
      return [...state, action.line];
    }

    case 'remove':
      return state.filter(
        (line) => !(line.productSlug === action.productSlug && line.variantId === action.variantId),
      );

    case 'setQuantity': {
      if (action.quantity <= 0) {
        return state.filter(
          (line) =>
            !(line.productSlug === action.productSlug && line.variantId === action.variantId),
        );
      }
      return state.map((line) =>
        line.productSlug === action.productSlug && line.variantId === action.variantId
          ? { ...line, quantity: Math.min(99, action.quantity) }
          : line,
      );
    }

    case 'clear':
      return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  detailedLines: CartLineDetailed[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  /** false do czasu odczytania localStorage - blokuje bledne renderowanie pustego koszyka. */
  isHydrated: boolean;
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Odczytuje i waliduje koszyk z localStorage. Zwraca pusty przy jakimkolwiek bledzie. */
function readStoredCart(): CartLine[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    // Odfiltruj pozycje wskazujace na produkty, ktorych juz nie ma w katalogu.
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === 'object' &&
        line !== null &&
        typeof (line as CartLine).productSlug === 'string' &&
        typeof (line as CartLine).variantId === 'string' &&
        typeof (line as CartLine).quantity === 'number' &&
        getProduct((line as CartLine).productSlug) !== undefined,
    );
  } catch {
    // Uszkodzony wpis albo zablokowany storage - startujemy z pustym koszykiem.
    return [];
  }
}

/**
 * Wykrywa zakonczenie hydracji bez setState w efekcie: na serwerze zwraca
 * false, w przegladarce true. Pozwala odroznic "koszyk jeszcze nieodczytany"
 * od "koszyk pusty", co decyduje o tym, czy pokazac szkielet czy komunikat.
 */
const subscribeNoop = () => () => {};
const getHydratedClient = () => true;
const getHydratedServer = () => false;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const isHydrated = useSyncExternalStore(subscribeNoop, getHydratedClient, getHydratedServer);

  // Odczyt po zamontowaniu - localStorage nie istnieje podczas prerenderu.
  // dispatch nie jest setState, wiec nie wywoluje kaskady renderow.
  useEffect(() => {
    const stored = readStoredCart();
    if (stored.length > 0) {
      dispatch({ type: 'hydrate', lines: stored });
    }
  }, []);

  // Zapis dopiero po hydracji, zeby nie nadpisac zawartosci pusta tablica.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Tryb prywatny lub brak miejsca - koszyk dziala, tylko bez trwalosci.
    }
  }, [lines, isHydrated]);

  const addItem = useCallback((productSlug: string, variantId: string, quantity = 1) => {
    dispatch({ type: 'add', line: { productSlug, variantId, quantity } });
  }, []);

  const removeItem = useCallback((productSlug: string, variantId: string) => {
    dispatch({ type: 'remove', productSlug, variantId });
  }, []);

  const setQuantity = useCallback((productSlug: string, variantId: string, quantity: number) => {
    dispatch({ type: 'setQuantity', productSlug, variantId, quantity });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const detailedLines = useMemo(() => {
    return lines.flatMap<CartLineDetailed>((line) => {
      const product = getProduct(line.productSlug);
      if (!product) return [];
      const variant = product.variants.find((item) => item.id === line.variantId);
      if (!variant) return [];
      const unitPrice = product.price + variant.priceDelta;
      return [
        {
          ...line,
          product,
          variant,
          unitPrice,
          lineTotal: unitPrice * line.quantity,
        },
      ];
    });
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = detailedLines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = detailedLines.reduce((sum, line) => sum + line.lineTotal, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    return {
      lines,
      detailedLines,
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      isHydrated,
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [lines, detailedLines, isHydrated, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart musi byc uzyty wewnatrz <CartProvider>');
  }
  return context;
}
