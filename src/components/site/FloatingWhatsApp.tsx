import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-config";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hola! Quería hacer una consulta.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
