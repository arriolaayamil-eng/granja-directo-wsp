import { useMemo, useState } from "react";
import { useProducts, type ProductCategory } from "@/lib/products-store";
import { ProductCard } from "./ProductCard";

type Filter = "Todos" | ProductCategory;
const FILTERS: Filter[] = ["Todos", "Cortes", "Preparados", "Ofertas"];

export function Products() {
  const { products } = useProducts();
  const [filter, setFilter] = useState<Filter>("Todos");

  const visible = useMemo(
    () =>
      products
        .filter((p) => p.active)
        .filter((p) => filter === "Todos" || p.category === filter),
    [products, filter],
  );

  return (
    <section id="productos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
        ¿Qué querés pedir hoy?
      </h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-charcoal hover:border-primary/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
