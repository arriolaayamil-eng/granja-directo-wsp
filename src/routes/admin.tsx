import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2, LogOut, Megaphone } from "lucide-react";
import { useProducts, type Product, type ProductCategory, type ProductUnit } from "@/lib/products-store";
import { useOfferBanner } from "@/lib/offers-store";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Granja La Unión" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const SESSION_KEY = "granja-admin-session";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_CONFIG.adminPassword) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg"
        >
          <h1 className="font-display text-2xl font-bold text-charcoal">
            Panel de administración
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ingresá la contraseña para continuar.
          </p>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
          />
          {error && <p className="mt-2 text-sm text-primary">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-primary py-2.5 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return <AdminEditor onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />;
}

function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const { products, save } = useProducts();

  const update = (id: string, patch: Partial<Product>) => {
    save(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const add = () => {
    const id = `nuevo-${Date.now()}`;
    save([
      ...products,
      {
        id,
        name: "Nuevo producto",
        price: "$XXXX",
        unit: "kg",
        category: "Cortes",
        image: "",
        active: true,
      },
    ]);
  };

  const remove = (id: string) => {
    if (confirm("¿Eliminar este producto?")) {
      save(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <h1 className="font-display text-xl font-bold text-charcoal">
            Productos — Granja La Unión
          </h1>
          <div className="flex gap-2">
            <button
              onClick={add}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Agregar producto
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/50"
            >
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-3 px-4 py-6">
        <p className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
          Los cambios se guardan automáticamente en este dispositivo. Los productos
          inactivos no se muestran en el sitio.
        </p>
        {products.map((p) => (
          <div
            key={p.id}
            className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-[1fr_120px_140px_120px_auto]"
          >
            <div>
              <Label>Nombre</Label>
              <input
                value={p.name}
                onChange={(e) => update(p.id, { name: e.target.value })}
                className={inputCls}
              />
              <Label className="mt-2">URL de imagen (opcional)</Label>
              <input
                value={p.image}
                onChange={(e) => update(p.id, { image: e.target.value })}
                placeholder="https://..."
                className={inputCls}
              />
            </div>
            <div>
              <Label>Precio</Label>
              <input
                value={p.price}
                onChange={(e) => update(p.id, { price: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <select
                value={p.category}
                onChange={(e) =>
                  update(p.id, { category: e.target.value as ProductCategory })
                }
                className={inputCls}
              >
                <option>Cortes</option>
                <option>Preparados</option>
                <option>Ofertas</option>
              </select>
            </div>
            <div>
              <Label>Unidad</Label>
              <select
                value={p.unit}
                onChange={(e) => update(p.id, { unit: e.target.value as ProductUnit })}
                className={inputCls}
              >
                <option value="kg">por kg</option>
                <option value="unidad">por unidad</option>
              </select>
            </div>
            <div className="flex flex-col items-stretch justify-between gap-2 sm:items-end">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={p.active}
                  onChange={(e) => update(p.id, { active: e.target.checked })}
                  className="h-4 w-4 accent-[color:var(--color-primary)]"
                />
                Activo
              </label>
              <button
                onClick={() => remove(p.id)}
                className="inline-flex items-center justify-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Trash2 className="h-3 w-3" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary";

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block text-xs font-semibold text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}
