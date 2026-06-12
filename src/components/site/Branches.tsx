import { MapPin, MessageCircle } from "lucide-react";
import { SITE_CONFIG, waLink } from "@/lib/site-config";

export function Branches() {
  return (
    <section id="sucursales" className="border-t border-border bg-card/60 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          Nuestras sucursales
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {SITE_CONFIG.branches.map((b) => (
            <div
              key={b.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-video w-full bg-muted">
                <iframe
                  title={`Mapa ${b.name}`}
                  src={b.mapEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold text-charcoal">
                  {b.name}
                </h3>
                <p className="mt-1 text-muted-foreground">{b.address}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/50"
                  >
                    <MapPin className="h-4 w-4" /> Abrir en Maps
                  </a>
                  <a
                    href={waLink(`Hola! Quería consultar por la sucursal ${b.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
