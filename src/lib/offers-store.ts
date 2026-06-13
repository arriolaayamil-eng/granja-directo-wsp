import { useEffect, useState, useCallback } from "react";

export interface OfferBanner {
  title: string;
  subtitle: string;
  cta: string;
  ctaTarget: string;
  active: boolean;
}

const STORAGE_KEY = "granja-offer-banner-v1";
const EVENT = "granja-offer-changed";

const DEFAULT_BANNER: OfferBanner = {
  title: "Oferta de la semana",
  subtitle:
    "¡Llevá 2 kg de pollo fresco y recibí un 10% de descuento en tu segunda compra!",
  cta: "Ver productos",
  ctaTarget: "#productos",
  active: true,
};

function read(): OfferBanner {
  if (typeof window === "undefined") return DEFAULT_BANNER;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BANNER));
      return DEFAULT_BANNER;
    }
    return JSON.parse(raw) as OfferBanner;
  } catch {
    return DEFAULT_BANNER;
  }
}

function write(offer: OfferBanner) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offer));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useOfferBanner() {
  const [offer, setOffer] = useState<OfferBanner>(() =>
    typeof window === "undefined" ? DEFAULT_BANNER : read(),
  );

  useEffect(() => {
    setOffer(read());
    const handler = () => setOffer(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const save = useCallback((next: OfferBanner) => {
    write(next);
    setOffer(next);
  }, []);

  return { offer, save };
}
