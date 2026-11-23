# Tanusha ❤ Mahesh — Telugu Wedding Invitation

A premium, cinematic Telugu Hindu wedding invitation built with React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

The experience opens with the blessings of Lord Venkateswara, honours Sri Venkateswara Swamy and Sri Padmavathi Ammavaru in a dedicated devotional section, welcomes guests with the couple's photographs, presents the wedding details and a live countdown, guides them through the seven sacred steps of Sapta Padhi, and closes with a warm final invitation.

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

## 4. Devotional artwork

The devotional section uses two licensed images:

| Image | File | Credit |
| --- | --- | --- |
| Sri Venkateswara Swamy | `public/images/venkateswara.jpg` | Megala Shankar · CC BY-SA 4.0 · Wikimedia Commons |
| Sri Padmavathi Ammavaru | `public/images/padmavathi.jpg` | Banksboomer · CC BY-SA 4.0 · Wikimedia Commons |

Both images were cropped to a 3:4 portrait, resized to 900 × 1200, and adjusted for brightness, contrast and clarity without altering faces, ornaments or religious symbols. The adapted images remain available under CC BY-SA 4.0. Full source links and licence details are in **[ASSET-CREDITS.md](ASSET-CREDITS.md)** and in the small credit line beneath each image on the site.

`public/images/venkateswara.jpg` is also used as a subtle backdrop in the opening blessing. Without the files, the section falls back to the hand-drawn gold Namam emblem, lotus, temple arch and oil lamps.

---

## 5. Deploy

The production build is a static site in `dist/`.

* **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Enable Pages → Source: GitHub Actions once in the repository settings.
* **Any static host:** upload the contents of `dist/`.

---

## 6. Accessibility and performance

* `prefers-reduced-motion` disables the petal canvas and entrance animations.
* Lightbox and menu support Escape, arrow keys, focus styles and scroll locking.
* All controls have accessible labels; photographs have descriptive alternative text.
* Photographs load lazy (except the welcome image) and are decoded asynchronously.
* Mobile layouts stack the couple, the names and the action buttons with no horizontal scrolling.
