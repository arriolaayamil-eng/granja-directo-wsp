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
import milanesaRellena from "@/assets/milanesaRellena.png.asset.json";
import milanesaPata from "@/assets/milanesaPata.png.asset.json";
import milanesaPechuga from "@/assets/milanesaPechuga.png.asset.json";
import milanesaSemillas from "@/assets/milanesaSemillas.png.asset.json";
import hamburguesas from "@/assets/hamburguesas.jpeg.asset.json";
import bastoncitos from "@/assets/bastoncitos.jpg.asset.json";
import arrollados from "@/assets/arrollados.jpeg.asset.json";
import patitas from "@/assets/patitas.jpg.asset.json";
import pechugasRebosadas from "@/assets/pechugasRebosadas.png.asset.json";

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

const STORAGE_KEY = "granja-products-v4";
const EVENT = "granja-products-changed";

const DEFAULTS: Product[] = [
  { id: "pollo-entero", name: "Pollo entero fresco", price: "$XXXX", unit: "unidad", category: "Cortes", image: pollo.url, active: true },
  { id: "suprema", name: "Suprema de pollo", price: "$XXXX", unit: "kg", category: "Cortes", image: suprema.url, active: true },
  { id: "pechuga", name: "Pechuga con hueso", price: "$XXXX", unit: "kg", category: "Cortes", image: pechuga.url, active: true },
  { id: "pata-muslo", name: "Pata y muslo", price: "$XXXX", unit: "kg", category: "Cortes", image: pataMuslo.url, active: true },
  { id: "pata-deshuesada", name: "Pata deshuesada", price: "$XXXX", unit: "kg", category: "Cortes", image: pataDeshuesada.url, active: true },
  { id: "alitas", name: "Alitas", price: "$XXXX", unit: "kg", category: "Cortes", image: alitas.url, active: true },
  { id: "pollo-crispy", name: "Pollo crispy", price: "$XXXX", unit: "kg", category: "Preparados", image: crispy.url, active: true },
  { id: "nuggets", name: "Nuggets de pollo", price: "$XXXX", unit: "kg", category: "Preparados", image: nuggets.url, active: true },
  { id: "milanesa-pechuga", name: "Milanesa de pechuga", price: "$XXXX", unit: "kg", category: "Preparados", image: milanesaPechuga.url, active: true },
  { id: "milanesa-pata", name: "Milanesa de pata", price: "$XXXX", unit: "kg", category: "Preparados", image: milanesaPata.url, active: true },
  { id: "milanesa-semillas", name: "Milanesa con semillas", price: "$XXXX", unit: "kg", category: "Preparados", image: milanesaSemillas.url, active: true },
  { id: "milanesa-rellena", name: "Milanesa rellena de jamón y queso", price: "$XXXX", unit: "unidad", category: "Preparados", image: milanesaRellena.url, active: true },
  { id: "pechugas-rebozadas", name: "Pechugas rebozadas", price: "$XXXX", unit: "kg", category: "Preparados", image: pechugasRebosadas.url, active: true },
  { id: "hamburguesas", name: "Hamburguesas de pollo", price: "$XXXX", unit: "unidad", category: "Preparados", image: hamburguesas.url, active: true },
  { id: "bastoncitos", name: "Bastoncitos de pollo", price: "$XXXX", unit: "kg", category: "Preparados", image: bastoncitos.url, active: true },
  { id: "patitas", name: "Patitas de pollo (formitas)", price: "$XXXX", unit: "kg", category: "Preparados", image: patitas.url, active: true },
  { id: "arrollado", name: "Arrollado de pollo relleno", price: "$XXXX", unit: "kg", category: "Preparados", image: arrollados.url, active: true },
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
