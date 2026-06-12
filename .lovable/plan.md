## Granja La Unión — Build Plan

A warm, mobile-first poultry shop site in Spanish with a side-drawer cart, WhatsApp checkout, and a simple admin panel. All data lives in browser localStorage (no backend).

### Brand & design system
- Set tokens in `src/styles.css`: primary `#C0392B`, background `#FAFAF7`, foreground `#1A1A1A`, accent `#D4A853`.
- Load Playfair Display + Inter via `<link>` in `__root.tsx`, register as `--font-display` / `--font-sans` in `@theme`.
- Update `__root.tsx` meta (title, description, OG) for "Granja La Unión".

### Routes
- `/` — full storefront (single scrolling landing).
- `/admin` — password-gated admin panel (login screen → product editor).
- 404 stays as-is.

### Storefront (`src/routes/index.tsx`)
Composed of section components under `src/components/site/`:
1. **Navbar** (sticky) — logo left, "Productos" / "Sucursales" center (smooth scroll to anchors), cart icon right with count badge. Opens cart drawer.
2. **Hero** — full-width image placeholder, headline + subhead, single red CTA "Ver productos y pedir" (smooth-scrolls to `#productos`).
3. **Trust bar** — dark band with the 4 items.
4. **Products** (`#productos`) — title, filter tabs (Todos / Cortes / Preparados / Ofertas), responsive card grid. Each card: image placeholder, name, price label, +/- quantity stepper, big red "+ Agregar" button with a brief scale/pulse animation. Adding pushes to cart and bumps the navbar badge (no navigation).
5. **Why order online** — 3 icon blocks.
6. **Testimonials** — 3 review cards + ⭐ 4.3 badge.
7. **Branches** (`#sucursales`) — two cards (Ostende real address, Valeria del Mar placeholder), Google Maps iframe embed, "Abrir en Maps" + WhatsApp buttons.
8. **Footer** — logo, address, WhatsApp link, copyright.
9. **Floating WhatsApp button** — fixed bottom-right, green `#25D366`.

### Cart & checkout
- Global cart state via React Context + `useReducer`, persisted to `localStorage` (`granja-cart-v1`).
- `CartDrawer` uses shadcn `Sheet` (right side). Lists items with thumbnail, qty stepper, line subtotal, remove; shows total and free-shipping badge.
- Checkout form fields: nombre, dirección, teléfono, sucursal (select Ostende/Valeria), aclaraciones.
- Submit builds the WhatsApp message exactly as specified and opens `https://wa.me/5491100000000?text=<encoded>` in a new tab. WhatsApp number stored in a single `src/lib/site-config.ts` constant for easy editing.

### Products data
- Default 6 products seeded into localStorage on first load (`granja-products-v1`) with `$XXXX` placeholder prices and `active: true`.
- Shape: `{ id, name, price, unit: 'kg'|'unidad', category: 'Cortes'|'Preparados'|'Ofertas', image, active }`.
- `useProducts()` hook reads/writes localStorage and emits a custom `storage`-like event so storefront and admin stay in sync within the same tab. Storefront filters out `active: false`.

### Admin panel (`/admin`)
- Simple password gate: hardcoded password `granjaunion2026` (documented as editable in `site-config.ts`) checked against an input; on success, sets a `sessionStorage` flag.
- Editor UI: table/list of products with inline edit for name, price, category (select), image URL, active toggle; "Agregar producto" button; "Eliminar" per row; "Cerrar sesión" button.
- Clean, minimal layout — labels in Spanish, big touch targets.
- Security note shown to user: this is client-side only; anyone with the password (or browser dev tools) can edit. Acceptable for chosen storage mode.

### Technical
- Tailwind v4 tokens + shadcn components (Sheet, Button, Input, Select, Textarea, Tabs, Card, Badge, Switch).
- Smooth scroll via `scroll-behavior: smooth` on `html` + anchor IDs.
- Mobile-first: 1-col product grid → 2-col sm → 3-col lg; drawer full-width on mobile, 420px on desktop.
- All copy in Spanish.
- `head()` per route with proper title/description/OG.

### Placeholders that will need real values later
- WhatsApp number `5491100000000`
- Valeria del Mar address + map embed
- Hero and product images (neutral SVG/gradient placeholders)
- Prices (`$XXXX`)
- Admin password (`granjaunion2026`)

### File list (new)
- `src/lib/site-config.ts`
- `src/lib/cart-context.tsx`
- `src/lib/products-store.ts`
- `src/components/site/Navbar.tsx`, `Hero.tsx`, `TrustBar.tsx`, `Products.tsx`, `ProductCard.tsx`, `WhyOnline.tsx`, `Testimonials.tsx`, `Branches.tsx`, `Footer.tsx`, `FloatingWhatsApp.tsx`, `CartDrawer.tsx`
- `src/routes/admin.tsx`
- Edits: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
