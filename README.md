# SUK Pattanasin — สุขพัฒนสิน

Portfolio site for a Bangkok design-and-build contractor.
Static HTML/CSS/JS — no build step. Open `index.html` in a browser and it runs.

Stack matches your other client sites: GSAP + ScrollTrigger + Lenis from CDN,
`data-th` / `data-en` language switching, lead form posting to a Google Sheet.

**Thai is the default language.** English is available via the TH/EN toggle and
the choice persists in `localStorage` under `suk_lang`.

---

## What still needs the client's input

Everything below renders as a working placeholder right now, so the site is
presentable as-is. Search the codebase for `TODO(` to jump between them.

### 1 & 2. Logo and photos — `TODO(logo)` / `TODO(photo)`

**One folder per section, each with its own README giving the exact filename,
ratio and pixel size in Thai and English.** Drop the file in and it appears —
no code change needed, because the site already points at these paths.

```
Asset/
├── logo/       logo.svg          → nav bar, renders 34px tall, transparent
├── hero/       hero.jpg          → 2000×1060, landscape 16:8.5
├── about/      about.jpg         → 1200×1500, portrait 4:5
├── social/     og-cover.jpg      → 1200×630 exact (Facebook / LINE preview)
└── projects/
    ├── project-01/cover.jpg      → 1600×1200, 4:3
    ├── project-02/cover.jpg
    ├── project-03/cover.jpg
    ├── project-04/cover.jpg
    ├── project-05/cover.jpg
    └── project-06/cover.jpg
```

Any missing image falls back to a warm diagonal-hatch placeholder card, so a
half-finished photo set never breaks the layout. Expect 404s in the console for
images that haven't landed yet — that is the fallback working, not a fault.

### 3. Project list
Edit the `PROJECTS` array at the top of `script.js` — that single array drives
the whole Work grid, the filter buttons, and the lightbox.

```js
{
    img: 'Asset/projects/baan-ladprao-01.jpg',   // '' → placeholder
    cat: 'build',                                 // build | renovate | interior | design
    th: { title: 'บ้านเดี่ยว 2 ชั้น', sub: 'ลาดพร้าว, กรุงเทพฯ · 240 ตร.ม.' },
    en: { title: 'Two-storey house',  sub: 'Lat Phrao, Bangkok · 240 sqm' }
}
```

Filter buttons only appear for categories that at least one project uses, so
you can delete a whole category just by removing its projects.

The six entries in there now are **invented placeholders** — replace them with
real jobs before launch.

### 4. Contact details — `TODO(contact)`
Three places in `index.html`, all placeholder values right now:
- Contact section list — phone, Line, email, Facebook, service area
- Sticky mobile dock at the bottom — phone + Line
- `tel:+66000000000` and `line.me/ti/p/~LINEID` need the real values

### 5. Lead form — `TODO(form)`
Set `SHEET_URL` at the top of `script.js` to the Google Apps Script web-app URL.
Until it's set, the form validates fully and shows the success state while
logging the payload to the console — so the UX is testable without a backend.
You can reuse the Apps Script from Highburi Hill; the field names posted are
`name`, `tel`, `line`, `job_type`, `budget`, `detail`.

### 6. Copy to verify — `TODO(copy)`
- The four stat numbers (12 years / 180 projects / 100% in-house / 2yr warranty)
  are **plausible guesses, not facts**. Confirm before publishing.
- The About paragraph is written from the Facebook tagline only. The client
  should supply their real founding story and team size.

### 7. Domain
Add a `CNAME` file with the domain when you know it, same as Nord Werk.
The canonical URL in `<head>` currently points at `sukpattanasin.com` — change
it if the domain differs.

---

## Notes on the build

- **Thai typography** — Latin glyphs render in Cormorant Garamond / Inter, Thai
  falls through to Noto Serif Thai / IBM Plex Sans Thai in the same font stack.
  `html[lang="th"]` rules loosen the leading and drop uppercase transforms,
  which look broken on Thai script.
- **Encoding** — files are UTF-8 without BOM, verified clean. Keep it that way;
  editors that save as ANSI will mangle the Thai.
- **Graceful degradation** — if the GSAP CDN is blocked the reveal animations
  are skipped and all content is forced visible, rather than staying at
  `opacity: 0`. `prefers-reduced-motion` is honoured throughout.
- **SEO** — Thai meta description and a `GeneralContractor` JSON-LD block are in
  `<head>`; both help for local search, which is where contractor leads come from.
