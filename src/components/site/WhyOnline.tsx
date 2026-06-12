export function WhyOnline() {
  const items = [
    {
      icon: "🛒",
      title: "Pedí desde el celular",
      desc: "Sin llamar, sin esperar.",
    },
    {
      icon: "🚚",
      title: "Envío gratis",
      desc: "A domicilio en Pinamar, Ostende, Valeria del Mar y Cariló.",
    },
    {
      icon: "💳",
      title: "Pagás por transferencia",
      desc: "Como siempre, pero más fácil.",
    },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="text-center sm:text-left">
            <div className="text-4xl">{i.icon}</div>
            <h3 className="mt-3 font-display text-xl font-semibold text-charcoal">
              {i.title}
            </h3>
            <p className="mt-1 text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
