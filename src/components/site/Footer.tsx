import { SITE_CONFIG, waLink } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-background">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3 sm:items-center">
        <div className="font-display text-xl font-bold">{SITE_CONFIG.brand}</div>
        <div className="text-sm text-background/80">
          {SITE_CONFIG.branches[0].address}
        </div>
        <div className="text-sm sm:text-right">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            WhatsApp
          </a>
          <p className="mt-1 text-background/60">© 2026 {SITE_CONFIG.brand}</p>
        </div>
      </div>
    </footer>
  );
}
