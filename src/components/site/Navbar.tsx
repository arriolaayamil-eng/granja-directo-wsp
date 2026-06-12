import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { count, setOpen, pulse } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (pulse === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(t);
  }, [pulse]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="font-display text-xl font-bold text-primary">
          Granja La Unión
        </a>
        <nav className="hidden gap-8 text-sm font-medium sm:flex">
          <a href="#productos" className="hover:text-primary">Productos</a>
          <a href="#sucursales" className="hover:text-primary">Sucursales</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir carrito"
          className={`relative grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 ${bump ? "cart-bump" : ""}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
