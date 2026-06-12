// Site-wide editable configuration. Update these values to customize the site.
export const SITE_CONFIG = {
  brand: "Granja La Unión",
  tagline: "La calidad que llevás a tu mesa empieza acá",
  whatsappNumber: "5491100000000", // Solo dígitos, con código de país. Sin + ni espacios.
  adminPassword: "granjaunion2026", // Cambiá esta contraseña para acceder al panel /admin
  branches: [
    {
      id: "ostende",
      name: "Ostende",
      address: "Víctor Hugo 1648, Ostende – Pinamar",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=V%C3%ADctor+Hugo+1648+Ostende+Pinamar",
      mapEmbed:
        "https://www.google.com/maps?q=V%C3%ADctor+Hugo+1648+Ostende+Pinamar&output=embed",
    },
    {
      id: "valeria",
      name: "Valeria del Mar",
      address: "Dirección a confirmar, Valeria del Mar",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Valeria+del+Mar",
      mapEmbed: "https://www.google.com/maps?q=Valeria+del+Mar&output=embed",
    },
  ],
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
