export function TrustBar() {
  const items = [
    "⭐ 4.3 en Google",
    "🚚 Envío gratis",
    "💳 Pago por transferencia",
    "🐔 Fresco todos los días",
  ];
  return (
    <div className="bg-charcoal text-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-sm font-medium">
        {items.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
