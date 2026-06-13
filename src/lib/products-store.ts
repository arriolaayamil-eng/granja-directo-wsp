import { useEffect, useState, useCallback } from "react";
import pollo from "@/assets/pollo.png.asset.json";
import suprema from "@/assets/suprema.png.asset.json";
import pechuga from "@/assets/pechuga.png.asset.json";
import pataMuslo from "@/assets/pataMuslo.png.asset.json";
import pataDeshuesada from "@/assets/pataDeshuesada.png.asset.json";
import alitas from "@/assets/alitas.png.asset.json";
import crispy from "@/assets/crispy.jpg.asset.json";
import nuggets from "@/assets/nuggets.png.asset.json";
import huevos from "@/assets/huevos.jpg.asset.json";

export type ProductCategory = "Cortes" | "Preparados" | "Otros" | "Ofertas";
export type ProductUnit = "kg" | "unidad" | "docena";

export interface Product {
  id: string;
  name: string;
  price: string;
  unit: ProductUnit;
  category: ProductCategory;
  image: string;
  active: boolean;
}

const STORAGE_KEY = "granja-products-v2";
const EVENT = "granja-products-changed";

const DEFAULTS: Product[] = [
  { id: "pollo-entero", name: "Pollo entero fresco", price: "$XXXX", unit: "unidad", category: "Cortes", image: pollo.url, active: true },
  { id: "suprema", name: "Suprema de pollo", price: "$XXXX", unit: "kg", category: "Cortes", image: suprema.url, active: true },
  { id: "pechuga", name: "Pechuga con hueso", price: "$XXXX", unit: "kg", category: "Cortes", image: pechuga.url, active: true },
  { id: "pata-muslo", name: "Pata y muslo", price: "$XXXX", unit: "kg", category: "Cortes", image: pataMuslo.url, active: true },
  { id: "pata-deshuesada", name: "Pata deshuesada", price: "$XXXX", unit: "kg", category: "Cortes", image: pataDeshuesada.url, active: true },
  { id: "alitas", name: "Alitas", price: "$XXXX", unit: "kg", category: "Cortes", image: alitas.url, active: true },
  { id: "milanesas", name: "Milanesas de pollo", price: "$XXXX", unit: "kg", category: "Preparados", image: crispy.url, active: true },
  { id: "nuggets", name: "Nuggets de pollo", price: "$XXXX", unit: "kg", category: "Preparados", image: nuggets.url, active: true },
  { id: "huevos", name: "Huevos frescos", price: "$XXXX", unit: "docena", category: "Otros", image: huevos.url, active: true },
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
