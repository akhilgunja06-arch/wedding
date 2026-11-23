# Tanusha ❤ Mahesh — Telugu Wedding Invitation

A premium, devotional Telugu wedding invitation built with React, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

The first screen is a blessing: the Tirumala Moolavirat of Sri Venkateswara Swamy beside Sri Padmavathi Ammavaru, framed in gold beneath a mango-leaf torana. A slow, ken-burns devotional slideshow of the Tirumala and Tiruchanur temples runs behind the whole page. The invitation, the couple, the wedding details and countdown, the venue, the seven sacred steps of Sapta Padhi, the album and the final blessing follow, closing with the families' names and credits.

**Design language.** Deep peacock teal, royal emerald, midnight blue, antique gold, ivory and champagne, with rose-gold accents. Tokens live in `src/index.css` under `@theme`; every section uses them rather than raw hex values.

---

## Run the site

```bash
npm install
npm run dev        # development server on http://localhost:12000
npm run build      # production build into dist/
npm run preview    # preview the production build on http://localhost:12001
npm run typecheck  # TypeScript check
```

---

## 1. All wedding information lives in one file

Open **`src/config/wedding.ts`**. Everything a guest reads comes from here:

| What you can edit | Field |
| --- | --- |
| Groom name, Telugu name | `couple.groom` |
| Bride name, Telugu name | `couple.bride` |
| Headline order (`TANUSHA ❤ MAHESH`) | `couple.display` |
| Wedding date and countdown target | `wedding.dateISO` |
| Displayed date, long date, time | `wedding.dateDisplay`, `dateLong`, `timeDisplay` |
| Wedding day (Sunday) | calculated automatically from `dateISO` |
| Venue name, address lines, maps search | `venue` |
| Parents' names | `families.groomParents`, `families.brideParents` |
| Every English and Telugu message | `messages` |
| The seven Sapta Padhi steps, vows and meanings | `saptaPadhi` |
| Photograph slots and file names | `photos` |
| Background music | `music` |
| Devotional artwork | `artwork` |
| Deity names, mantras and image credits | `deities` |
| Background slideshow images, focus, captions | `devotionalSlides` |
| Temple photographs in the devotional gallery | `templePhotos` |

The weekday, Google Maps links and the countdown are all derived from the date and venue fields — you never need to edit them twice.

---

## 2. Photographs

There are two ways to add photographs.

### A. Permanent photographs (recommended for the published invitation)

Drop your originals into **`public/photos/`** using these exact file names. They appear automatically; nothing else needs editing.

| Slot | File name | Used in |
| --- | --- | --- |
| Welcome portrait | `couple-hero.jpg` | Welcome hero and featured album |
| Decorated stage | `couple-stage.jpg` | Couple introduction |
| Romantic portrait | `couple-romantic.jpg` | Story and featured album |
| Groom portrait 1 | `groom-portrait-1.jpg` | Couple section and gallery |
| Groom portrait 2 | `groom-portrait-2.jpg` | Gallery |
| Groom traditional | `groom-traditional.jpg` | Gallery |
| Groom family | `groom-family.jpg` | Gallery |
| Groom special | `groom-special.jpg` | Gallery |
| Bride portrait 1 | `bride-portrait-1.jpg` | Couple section and gallery |
| Bride portrait 2 | `bride-portrait-2.jpg` | Gallery |
| Bride traditional | `bride-traditional.jpg` | Gallery |
| Bride family | `bride-family.jpg` | Gallery |
| Bride special | `bride-special.jpg` | Gallery |
| Couple photos 1–3 | `couple-1.jpg` … `couple-3.jpg` | Gallery |
| Engagement | `engagement.jpg` | Gallery |
| Pre-wedding | `pre-wedding.jpg` | Gallery |

Any slot without a file shows an elegant gold frame with an "Add photo" button — it never shows an unrelated stock person.

### B. In-browser preview

The small photo button in the bottom-right corner opens the **Photo Studio**. Upload a photograph per slot, and it appears instantly on this device. Uploads are stored in the browser (IndexedDB), so they are private to that device and are not published.

Each uploaded photo has a download button in the Photo Studio. Download it, then place it in `public/photos/` with the file name shown beside the slot so every guest can see it.

---

## 3. Music

A 90-second nadaswaram excerpt is included at **`public/audio/wedding-theme.mp3`**. It is looped at a comfortable background level.

* **Track:** “Tamadamen Swami” from *Thodi* — Karukurichi P. Arunachalam (nadaswaram).
* **Licence:** [Public Domain Mark 1.0](https://creativecommons.org/publicdomain/mark/1.0/).
* **Source:** [Archive.org — Thodi, Karukurichi P. Arunachalam](https://archive.org/details/thodi-karukurichi-p.-arunachalam).
* **Edit:** a 90-second excerpt, loudness-normalised, with a short fade in and fade out.

Music never autoplays. The floating player has a visible **Music ON / OFF** switch, a separate play/pause button, and a volume slider. Guests can leave music off and every other feature continues to work.

If the file is missing, a soft, generated tanpura-style ambience is played instead, so the controls still work.

---

## 4. Devotional imagery

Three kinds of devotional imagery are used, and each is credited in the site and in [ASSET-CREDITS.md](ASSET-CREDITS.md).

| Role | Files | Credit |
| --- | --- | --- |
| Tirumala Moolavirat (opening screen, deity gallery, slideshow) | `public/images/venkateswara.jpg` / `.webp` | Megala Shankar · CC BY-SA 4.0 · Wikimedia Commons |
| Sri Padmavathi Ammavaru (traditional artwork, labelled as such) | `public/images/padmavathi.jpg` / `.webp` | Banksboomer · CC BY-SA 4.0 · Wikimedia Commons |
| Tirumala temple, Maha Dwaram, Tiruchanur shrine, festival lamps | `public/images/*-desk.webp`, `*-mob.webp` | Adityamadhav83, eclicks_by_bunny, Malyadri, vijay chennupati · CC BY-SA 3.0 / 4.0 / CC BY 2.0 |

The deity portraits keep their 3:4 aspect ratio and are never stretched, cropped into the face or recoloured. Temple photographs are shipped as separate desktop (2800 × 1575) and mobile (1200 × 1500) WebP crops so phones never download a large landscape frame.

**On authenticity:** the Venkateswara image is a licensed photograph of the Tirumala Moolavirat. No freely licensed photograph of the Sri Padmavathi Ammavaru Moolavirat could be verified, so the site uses a licensed devotional artwork and labels it *traditional artwork* on the card instead of substituting an AI-generated deity image.

The background slideshow (`DevotionalBackground`) crossfades every 9.5 seconds, applies a slow ken-burns zoom, and lays a teal veil over each frame so headings stay readable. It renders one image when `prefers-reduced-motion` is set, and only loads the desktop or the mobile source for the current breakpoint.

---

## 5. Deploy

The production build is a static site in `dist/`.

* **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Enable Pages → Source: GitHub Actions once in the repository settings.
* **Any static host:** upload the contents of `dist/`.

---

## 6. Accessibility and performance

* `prefers-reduced-motion` disables the petal canvas, the ken-burns zoom, the slideshow crossfade and entrance animations.
* Lightbox, menu and the Sapta Padhi walkthrough support Escape, arrow keys and swipe; focus styles and scroll locking are preserved.
* Sapta Padhi exposes `aria-live` step announcements, `aria-current` on the active diya and a `progressbar` with `aria-valuenow`.
* All controls have accessible labels; photographs have descriptive alternative text.
* Hero images are preloaded; every other photograph and background frame is lazy-loaded and decoded asynchronously. Devotional images are served as WebP.
* The opening screen compresses through height media queries so the deity, names and welcome line stay on the first screen from 768 px to 1080 px tall viewports.
* Layouts were checked at 360 × 800, 390 × 844, 768 × 1024, 1024 × 768, 1440 × 900 and 1920 × 1080 with no horizontal scrolling (`document.documentElement.scrollWidth === window.innerWidth`).
