export function Testimonials() {
  const reviews = [
    {
      name: "Mariana G.",
      text: "Siempre fresco y atención excelente. Las milanesas son las mejores de Pinamar.",
    },
    {
      name: "Diego P.",
      text: "Hace años que compro acá. Calidad constante y precios justos.",
    },
    {
      name: "Lucía R.",
      text: "Pedí por WhatsApp y me llegó rapidísimo. Súper recomendable.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <span className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-background">
          ⭐ 4.3 — 14 reseñas en Google
        </span>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="text-accent">★★★★★</div>
            <p className="mt-3 text-charcoal/80">"{r.text}"</p>
            <p className="mt-4 text-sm font-semibold text-charcoal">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
