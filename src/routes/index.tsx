import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { OffersBanner } from "@/components/site/OffersBanner";
import { Products } from "@/components/site/Products";
import { WhyOnline } from "@/components/site/WhyOnline";
import { Testimonials } from "@/components/site/Testimonials";
import { Branches } from "@/components/site/Branches";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { CartDrawer } from "@/components/site/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Granja La Unión — Pollajería en Pinamar, Ostende y Valeria del Mar" },
      {
        name: "description",
        content:
          "Pollo fresco todos los días. Pedí online, pagás por transferencia y envío gratis a Ostende, Valeria del Mar, Pinamar y Cariló.",
      },
      { property: "og:title", content: "Granja La Unión — Pollajería" },
      {
        property: "og:description",
        content:
          "La calidad que llevás a tu mesa empieza acá. Pedí online y recibí gratis.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <OffersBanner />
        <Products />
        <WhyOnline />
        <Testimonials />
        <Branches />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </CartProvider>
  );
}
