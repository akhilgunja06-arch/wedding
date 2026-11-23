# Repository guide

Single-page Telugu wedding invitation for Tanusha & Mahesh (13 December 2026, Lingala).
React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide.

## Commands

```bash
npm install
npm run dev        # Vite on port 12000 (host 0.0.0.0, allowedHosts: true)
npm run build      # tsc -b && vite build -> dist/
npm run preview    # Vite preview on port 12001
npm run typecheck  # tsc --noEmit
```

## Structure

* `src/config/wedding.ts` — the single source of truth for names, dates, venue, messages, Sapta Padhi, photo slots, music and `deities` (names, mantras, combined duo images, credits). Never hardcode wedding copy in components.
* `src/config/sections.ts` — navigation sections (English + Telugu labels), including `deities`.
* `src/config/slides.ts` — the eight slide-deck chapters; keep it in sync with `data-slide` values and page order.
* `src/components/sections/*` — one file per page section, in page order: Blessing, Deities, Hero, CoupleIntro, Details, SaptaPadhi, Venue, Gallery, Family, Finale.
* `src/components/ui/*` — reusable chrome: Navigation, Countdown, Lightbox, MusicPlayer, PhotoFrame, Section, ornaments (`Ornaments.tsx`), temple motifs (`TempleOrnaments.tsx`: torana, kalasham, paisley band, arch crown), `DevotionalBackground.tsx` (crossfading ken-burns slideshow), `DivineDuo.tsx` (combined Venkateswara–Padmavathi darshan frame) and `SlideDeck.tsx` (right-rail / mobile slide navigation).
* `src/components/admin/PhotoManager.tsx` — in-browser photo upload drawer (IndexedDB overrides).
* `src/components/effects/PetalCanvas.tsx` / `ClickEffects.tsx` — petal drift, gold burst and button ripple effects.
* `src/lib/photoLibrary.tsx` — IndexedDB photo overrides; `src/lib/music.tsx` — `MusicProvider`/`useMusic` audio context with generated ambience fallback, exposing `start`, `stop`, `toggle` and `setVolume` (shared by the opening prompt and the floating player).
* `public/photos`, `public/audio`, `public/images` — drop-in assets; file names documented in README.md. Real asset sources and licences live in `ASSET-CREDITS.md`.

## Conventions

* All Telugu text uses `font-telugu` and `lang="te"`; English display type uses `font-display` (Playfair), body copy uses Poppins.
* Palette tokens live in `src/index.css` under `@theme` (peacock/emerald/midnight/gold/ivory/champagne/rosegold). Use them instead of raw hex values. The opening screen sizes itself from `--open-*` variables and height media queries.
* Framer Motion entrances must respect `useReducedMotion`; the petal canvas returns `null` when reduced motion is requested.
* Overlays (lightbox, drawer) render through portals or at the App root so section `z-index` stacking contexts do not clip them.
* Countdown, weekday and Google Maps URLs derive from `wedding.dateISO` / `wedding.venue`; do not duplicate them.
* Sapta Padhi follows the traditional seven vow words (Iṣe, Ūrje, Rāyaspoṣāya, Māyobhavāya, Prajābhyaḥ, Ṛtubhyaḥ, Sakhe). Keep `vowTelugu` and `meaningTelugu` respectful and literal; do not invent new religious claims.
* `MusicPlayer` separates the Music ON/OFF switch from play/pause and syncs the switch with `useMusic().playing`, so any entry point (opening prompt, transport) keeps it truthful. Never autoplay audio; keep the generated ambience fallback working.
* The combined darshan uses the `.divine-duo` / `.duo-frame` / `.duo-portrait` styles in `src/index.css`; keep both portraits at their 3:4 aspect ratio and preserve the credit links. The Padmavathi image is devotional artwork and must stay labelled `Traditional artwork` — do not present it as a photograph, and never swap in an AI-generated deity.
* `devotionalSlides` and `templePhotos` in `wedding.ts` hold the licensed temple photography; keep desktop/mobile WebP pairs together and keep `credit`/`creditUrl` with each entry.
* Sections that position decorative elements outside their box (Blessing, Couple, Venue, Deities) need `overflow-hidden` to keep mobile `scrollWidth === innerWidth`.
* The opening screen must fit one viewport; verify `#blessings` bottom edge equals the viewport height at 1440×900, 1024×768 and 390×844 when changing its spacing.

## Verification

No test runner. Validate with `npm run typecheck`, `npm run build`, and browser checks against the dev/preview hosts. Mobile breakpoints were checked at 390×844; ensure `document.documentElement.scrollWidth === window.innerWidth`.
