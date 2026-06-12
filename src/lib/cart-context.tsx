import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./products-store";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  image: string;
  qty: number;
}

type Action =
  | { type: "add"; product: Product; qty?: number }
  | { type: "set-qty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

const STORAGE_KEY = "granja-cart-v1";

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const qty = action.qty ?? 1;
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...state,
        {
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          unit: action.product.unit,
          image: action.product.image,
          qty,
        },
      ];
    }
    case "set-qty":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartCtx {
  items: CartItem[];
  count: number;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  pulse: number; // increments when an item is added — for badge animation
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      add: (product, qty) => {
        dispatch({ type: "add", product, qty });
        setPulse((p) => p + 1);
      },
      setQty: (id, qty) => dispatch({ type: "set-qty", id, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      isOpen,
      setOpen,
      pulse,
    }),
    [items, isOpen, pulse],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
