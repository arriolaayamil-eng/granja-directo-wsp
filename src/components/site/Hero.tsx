import portada from "@/assets/portada.png.asset.json";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative h-[80vh] min-h-[520px] w-full">
        <img
          src={portada.url}
          alt="Cortes de pollo fresco Granja La Unión"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="max-w-xl text-primary-foreground">
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              Pollo fresco todos los días
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight drop-shadow-md sm:text-5xl lg:text-6xl">
              La calidad que llevás a tu mesa empieza acá.
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/90">
              Elegí tus cortes, pedí online y pagás por transferencia. Envío gratis a
              Ostende, Valeria del Mar, Pinamar y Cariló.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#productos"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-xl transition hover:bg-primary/90"
              >
                Ver productos y pedir
              </a>
              <a
                href="#sucursales"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Nuestras sucursales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
