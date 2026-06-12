import { useEffect, useState, useCallback } from "react";

export type ProductCategory = "Cortes" | "Preparados" | "Ofertas";
export type ProductUnit = "kg" | "unidad";

export interface Product {
  id: string;
  name: string;
  price: string; // string para permitir "$XXXX" como placeholder
  unit: ProductUnit;
  category: ProductCategory;
  image: string; // URL o vacío para mostrar placeholder
  active: boolean;
}

const STORAGE_KEY = "granja-products-v1";
const EVENT = "granja-products-changed";

const DEFAULTS: Product[] = [
  {
    id: "pollo-entero",
    name: "Pollo entero fresco",
    price: "$XXXX",
    unit: "unidad",
    category: "Cortes",
    image: "",
    active: true,
  },
  {
    id: "milanesas",
    name: "Milanesas de pollo",
    price: "$XXXX",
    unit: "kg",
    category: "Preparados",
    image: "",
    active: true,
  },
  {
    id: "supremas",
    name: "Supremas",
    price: "$XXXX",
    unit: "kg",
    category: "Cortes",
    image: "",
    active: true,
  },
  {
    id: "pata-muslo",
    name: "Pata y muslo",
    price: "$XXXX",
    unit: "kg",
    category: "Cortes",
    image: "",
    active: true,
  },
  {
    id: "alitas",
    name: "Alitas",
    price: "$XXXX",
    unit: "kg",
    category: "Cortes",
    image: "",
    active: true,
  },
  {
    id: "tiras",
    name: "Tiras de pollo",
    price: "$XXXX",
    unit: "kg",
    category: "Preparados",
    image: "",
    active: true,
  },
];

function read(): Product[] {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
      return DEFAULTS;
    }
    return JSON.parse(raw) as Product[];
  } catch {
    return DEFAULTS;
  }
}

function write(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() =>
    typeof window === "undefined" ? DEFAULTS : read(),
  );

  useEffect(() => {
    setProducts(read());
    const handler = () => setProducts(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const save = useCallback((next: Product[]) => {
    write(next);
    setProducts(next);
  }, []);

  return { products, save };
}
