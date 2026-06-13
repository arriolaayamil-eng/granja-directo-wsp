import { Tag, ArrowRight } from "lucide-react";
import { useOfferBanner } from "@/lib/offers-store";

export function OffersBanner() {
  const { offer } = useOfferBanner();

  if (!offer.active) return null;

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
            <Tag className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              Oferta especial
            </p>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {offer.title}
            </h2>
            <p className="mt-1 max-w-md text-sm opacity-90 sm:text-base">
              {offer.subtitle}
            </p>
          </div>
        </div>
        <a
          href={offer.ctaTarget}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow transition hover:bg-white/90 active:scale-95"
        >
          {offer.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
