export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.95 0.02 60) 0%, oklch(0.88 0.04 50) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight text-charcoal sm:text-5xl">
            La mejor pollajería de la zona, ahora con pedido online.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-charcoal/80">
            Elegí tus cortes, hacé tu pedido y pagá por transferencia. Envío gratis a
            Ostende y Valeria del Mar.
          </p>
          <a
            href="#productos"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
          >
            Ver productos y pedir
          </a>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-xl ring-1 ring-border">
          <div className="grid h-full place-items-center text-charcoal/30">
            <span className="font-display text-2xl">Imagen destacada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
