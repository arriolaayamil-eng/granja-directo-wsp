import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { SITE_CONFIG, waLink } from "@/lib/site-config";

export function CartDrawer() {
  const { items, isOpen, setOpen, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    sucursal: "Ostende",
    aclaraciones: "",
  });

  const totalLine = items.length
    ? items.map((i) => `${i.qty} x ${i.name} — ${i.price}/${i.unit}`).join("\n")
    : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const msg =
      `Hola! Quiero hacer el siguiente pedido:\n\n` +
      `${totalLine}\n\n` +
      `Total: a confirmar\n` +
      `Envío: Gratis\n\n` +
      `Nombre: ${form.nombre}\n` +
      `Dirección: ${form.direccion}\n` +
      `Teléfono: ${form.telefono}\n` +
      `Sucursal: ${form.sucursal}\n` +
      `Aclaraciones: ${form.aclaraciones || "-"}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-display text-2xl">Tu pedido</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              Tu carrito está vacío.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-muted text-2xl">
                    {i.image ? (
                      <img
                        src={i.image}
                        alt={i.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      "🐔"
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-semibold text-charcoal">{i.name}</p>
                      <button
                        onClick={() => remove(i.id)}
                        aria-label="Eliminar"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {i.price} / {i.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="grid h-7 w-7 place-items-center rounded-l-full hover:bg-muted"
                          aria-label="Restar"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="grid h-7 w-7 place-items-center rounded-r-full hover:bg-muted"
                          aria-label="Sumar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-5 space-y-3 rounded-xl bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">A confirmar</span>
              </div>
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                🚚 Envío gratis
              </span>
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-3" id="checkout-form">
            <Field label="Nombre y apellido" required>
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Dirección de entrega" required>
              <input
                required
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Teléfono" required>
              <input
                required
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Sucursal más cercana" required>
              <select
                required
                value={form.sucursal}
                onChange={(e) => setForm({ ...form, sucursal: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {SITE_CONFIG.branches.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Aclaraciones del pedido">
              <textarea
                rows={3}
                value={form.aclaraciones}
                onChange={(e) => setForm({ ...form, aclaraciones: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
          </form>
        </div>

        <div className="border-t border-border bg-card px-5 py-4">
          <button
            form="checkout-form"
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-full bg-whatsapp px-5 py-4 text-base font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
          >
            Confirmar pedido por WhatsApp
          </button>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-primary"
            >
              Vaciar carrito
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-charcoal">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
