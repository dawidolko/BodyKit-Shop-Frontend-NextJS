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

/** Free delivery threshold, in grosz. */
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
  /** False until localStorage has been read — prevents rendering a false empty cart. */
  isHydrated: boolean;
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Reads and validates the cart from localStorage. Returns empty on any failure. */
function readStoredCart(): CartLine[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    // Drop lines pointing at products that no longer exist in the catalog.
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
    // Corrupted entry or blocked storage — start from an empty cart.
    return [];
  }
}

/**
 * Detects the end of hydration without calling setState inside an effect:
 * false on the server, true in the browser. This distinguishes "cart not read
 * yet" from "cart is empty", which decides between a skeleton and a message.
 */
const subscribeNoop = () => () => {};
const getHydratedClient = () => true;
const getHydratedServer = () => false;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const isHydrated = useSyncExternalStore(subscribeNoop, getHydratedClient, getHydratedServer);

  // Read after mount — localStorage does not exist during prerender.
  // dispatch is not setState, so it does not trigger a render cascade.
  useEffect(() => {
    const stored = readStoredCart();
    if (stored.length > 0) {
      dispatch({ type: 'hydrate', lines: stored });
    }
  }, []);

  // Write only after hydration, so we never overwrite storage with an empty array.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private mode or quota exceeded — the cart still works, just without persistence.
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
    throw new Error('useCart must be used inside a <CartProvider>');
  }
  return context;
}
