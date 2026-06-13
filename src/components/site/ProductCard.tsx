import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products-store";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-muted">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-5xl">🐔</div>
        )}
        {product.category === "Ofertas" && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            Oferta
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-charcoal">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-primary">
          {product.price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / {product.unit === "kg" ? "kg" : "unidad"}
          </span>
        </p>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center justify-between rounded-full border border-border sm:justify-start">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-l-full hover:bg-muted"
              aria-label="Restar"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-r-full hover:bg-muted"
              aria-label="Sumar"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => {
              add(product, qty);
              setQty(1);
            }}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 active:scale-95 sm:flex-1"
          >
            + Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
