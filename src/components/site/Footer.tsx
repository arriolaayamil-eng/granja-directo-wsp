import { SITE_CONFIG, waLink } from "@/lib/site-config";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center">
        <img
          src={logo.url}
          alt={SITE_CONFIG.brand}
          className="h-24 w-auto object-contain sm:h-28"
        />
        <div className="text-sm text-background/80">
          {SITE_CONFIG.branches[0].address}
        </div>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-accent hover:underline"
        >
          WhatsApp
        </a>
        <p className="text-xs text-background/60">© 2026 {SITE_CONFIG.brand}</p>
      </div>
    </footer>
  );
}
