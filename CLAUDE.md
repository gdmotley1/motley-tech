# Motley Tech — Website Project

> **This file auto-loads when Claude Code works in `C:\Users\motle\claude-code\motley-tech\`.**
> It is the primary source of truth for the site's architecture and design system.

---

## What this is

Grant Motley's solo web-dev business site. Targets **small local businesses in Milledgeville, GA**. Positions him alongside modern tech studios (Vercel, Linear, Stripe) while staying approachable.

**Business model**: Build the whole site FREE to earn the work → prospect chooses to keep it (hosting subscription from $49/mo), buy it outright (one-time fee), or walk away. First 5 Milledgeville businesses get free builds.

**Owner-operator**: Grant Motley. Contact: motleytech.ai@gmail.com.

**Separate from Comvoy/Otto/Fouts work — do NOT cross-reference Otto as a case study on this site** (explicitly forbidden by Grant).

---

## Project structure

**Multi-page since 2026-04-17.** Every nav tab opens a real page — no more anchor-scroll single pages.
**Brand kit finalized 2026-04-17.** See `BRAND.md` — the wordmark is locked; don't redesign it without Grant's sign-off.

```
motley-tech/
├── index.html                         ← home: hero + rotator + WHY IT MATTERS (4-up stats, AI first) + gallery + scarcity
├── faq.html                           ← 10 Q&As · terminal-style cards · hosts FAQPage JSON-LD
├── process.html                       ← "How it works" — 3-step + note
├── contact.html                       ← card-picker form (hosts motleyForm Alpine)
├── sitemap.xml                        ← full URL list for search crawlers
├── robots.txt                         ← explicitly allows all AI crawlers (GPTBot, Claude-Web, Perplexity, Google-Extended, etc.)
├── llms.txt                           ← human-readable site map specifically for LLM discovery
├── demos/
│   ├── restaurant/                    ← Mama Lou's Kitchen (Playfair + burgundy)
│   │   ├── index.html                 (hero + today's plates teaser)
│   │   ├── menu.html
│   │   ├── story.html
│   │   └── visit.html                 (hosts the reservation form at #reserve)
│   ├── retail/                        ← Oak & Thread (Instrument Serif + monochrome)
│   │   ├── index.html                 (hero + category strip)
│   │   ├── shop.html
│   │   ├── lookbook.html
│   │   ├── journal.html
│   │   └── visit.html
│   ├── salon/                         ← The Barber & Co. (DM Serif + brass/coal)
│   │   ├── index.html                 (hero + testimonial)
│   │   ├── services.html
│   │   ├── barbers.html               (monogram profiles — see ethical note)
│   │   ├── gallery.html
│   │   └── book.html                  (booking form + visit info merged)
│   └── trades/                        ← Milledgeville HVAC Pros (Barlow + navy/safety)
│       ├── index.html                 (hero + how-it-works)
│       ├── services.html
│       ├── coverage.html              (service area + reviews at #reviews)
│       └── estimate.html
├── assets/brand/                      ← brand kit (source of truth for print/merch/web)
│   ├── wordmark-dark.svg              (white text + ember square — dark backgrounds)
│   ├── wordmark-light.svg             (black text + ember square — light backgrounds)
│   ├── wordmark-mono.svg              (single-color — embroidery, foil stamp, etch)
│   ├── mark.svg                       (just the ember square)
│   ├── favicon.svg                    (ember square with white "m" baked in)
│   └── og-image.svg                   (1200x630 share card for Twitter/FB/iMessage)
├── design-system/motley-tech/
│   ├── MASTER.md                      ← the current v2.0 design system
│   └── pages/                         ← per-page overrides (currently empty)
├── BRAND.md                           ← brand guidelines · single source of truth
└── CLAUDE.md                          ← this file
```

**Total: 24 HTML files** (4 main + 4/5/5/4 demo pages + journal index + 1 journal post). Each file is standalone HTML loading Tailwind + Alpine from CDN.

**Landing narrative flow (locked)**: hero → **why it matters** (stats + before/after) → demo gallery → scarcity. Problem-awareness BEFORE product-proof. "Why it matters" is the single biggest selling-point section — it lives on the home page, inline, not on its own page. Don't split it out again.

URLs served by `python -m http.server` automatically serve `index.html` when the URL ends in `/`, so `http://localhost:4321/demos/restaurant/` resolves to the restaurant's home page.

**Dev server / launch config**: `C:\Users\motle\claude-code\.claude\launch.json` (parent dir, NOT in this project). Entry name: `motley-tech`, port 4321, uses Python http.server.

**One deploy, one domain.** All demos are part of this single site — they just live at `motleytech.com/demos/*.html`. When Grant deploys (GitHub Pages or Vercel), everything ships together.

---

## Tech stack (intentionally minimal)

- **One-command Tailwind build.** Tailwind compiled locally to `dist/main.css` via `npm run build` (or `npm run watch` during dev). Switched from the Play CDN on 2026-04-29 to fix a Core Web Vitals problem (34% of page loads were "Poor" LCP from the CDN's runtime parsing).
- **Alpine.js 3.x** still loaded from `cdn.jsdelivr.net` for state (tab picker, multi-step form, hero rotator). Tiny, no build needed.
- **Google Fonts** loaded via `<link>` in each file.
- All assets inline, in `dist/main.css`, or from CDN — minimal compilation surface.

### Build workflow

```bash
npm install          # one-time, installs Tailwind CLI into node_modules/
npm run build        # compiles src/input.css → dist/main.css (minified, ~46KB)
npm run watch        # rebuilds on file changes during active dev
```

You MUST run `npm run build` (or have `watch` running) before pushing if you added new Tailwind utility classes to any HTML file. Otherwise the new classes won't have CSS.

`tailwind.config.js` at the repo root holds ALL custom theme tokens (every demo's colors, fonts, etc.) merged into one config. Tailwind purges unused classes by scanning the `content` glob, so the bundle stays tiny even with all four demos plus the main site sharing one config.

**Why a build step now?** The Play CDN downloads ~250KB and runs Tailwind in the browser on every load. On slow connections that cost 1-3s of LCP — bad for SEO, bad for conversion. The compiled file is 46KB minified and cached by the browser after the first load.

**Files added to support the build:**
- `package.json` — npm scripts + tailwindcss devDependency
- `tailwind.config.js` — merged theme tokens
- `src/input.css` — three `@tailwind` directives
- `dist/main.css` — compiled output (committed so GitHub Pages serves it; node_modules/ is gitignored)

---

## Design system — v2.0 (current, dark tech)

**Vibe**: Modern tech studio. NOT "warm craftsman" (that was v1.0, rejected by Grant on 2026-04-16 — demos looked better than the main site).

### Palette (dark)

| Token | Hex | Use |
|------|-----|-----|
| `bg-0` | `#0A0A0C` | page background |
| `bg-1` | `#111114` | card background |
| `bg-2` | `#17171B` | elevated / hover |
| `bg-3` | `#1E1E23` | deepest elevated |
| `text-0` | `#FAFAF9` | primary text |
| `text-1` | `#D6D3D1` | secondary text |
| `text-2` | `#A8A29E` | muted |
| `text-3` | `#78716C` | most muted / timestamps |
| `line` | `#26262C` | subtle borders |
| `line-strong` | `#36363E` | emphasized borders |
| `ember` | `#F97316` | primary accent (CTAs, brand) |
| `ember-hot` | `#FB923C` | ember hover |
| `lime` | `#A3E635` | success / status / secondary accent |
| `mint` | `#10B981` | rarely used |
| `amber2` | `#FACC15` | data viz warning tone |

### Typography

- **Display / headings**: **Space Grotesk** (400–700). Tight tracking (`-0.025em`).
- **Body**: **Inter** (400–700).
- **Mono** (labels, tags, file names, timestamps, stats): **JetBrains Mono** (400–600).
- **Oswald** (400–700) — loaded alongside the main fonts on `index.html`. Used ONLY inside the Martin's Auto BEFORE/AFTER preview card (condensed uppercase display for the blue-collar auto shop mock). Do not use Oswald elsewhere in the Motley Tech chrome.
- **Fraunces is GONE** from the main site (see feedback below). Keep it out.

### Brand wordmark (locked)

Full guidelines in `BRAND.md`. Quick reference:

- **Full lockup**: solid ember square (w-5 h-5 bg-ember) + `Motley Tech` in Space Grotesk Bold, tight tracking (`tracking-tighter`), `text-text-0` for dark bg / `text-bg-0` for light bg.
- **HTML pattern used in nav/footer**:
  ```html
  <span class="w-5 h-5 bg-ember flex-shrink-0" aria-hidden="true"></span>
  <span class="display font-bold text-lg tracking-tighter text-text-0">Motley Tech</span>
  ```
- **Lowercase "motley.tech" with an m-tile is v1.0 and dead.** Don't reintroduce.
- **Favicon**: all 22 pages reference `<base>/assets/brand/favicon.svg` — relative path depends on depth (e.g., `assets/brand/favicon.svg` from root, `../../assets/brand/favicon.svg` from demo subpages).

### Motifs

- **Mono section tags**: `[ // THE STAKES ]` in ember, uppercase, 11px, letter-spacing 0.12em. Class: `.tag-mono`.
- **BEFORE / AFTER compare** (on landing, in the stakes section) uses **Martin's Auto** as the worked example. The AFTER card is deliberately styled as a **blue-collar auto shop page** — cream `#F5F0E8` bg, engine red `#B91C1C`, navy `#0F1F38`, safety yellow `#FFC107`, with **Oswald Bold condensed caps** for display copy. This is intentionally NOT the Motley Tech dark/ember/Space-Grotesk look — the card shows what Grant would build for a client, not another Motley Tech page. Do not restyle it to match the main site aesthetic.
- **Dot-grid backdrop** on hero: `.dotgrid` (rgba white 1px dots every 24px).
- **Pulsing status dots**: `.status-dot` class, `pulse-dot` keyframes (2s cycle).
- **Gradient-border cards** for key moments: `.border-gradient` (ember→lime→transparent gradient as a 1px pseudo-element). Used on step 3 "You choose" and "What I build" before/after card.
- **Mini browser frame**: `.mini-frame` + `.mini-bar` for the hero's rotating demo preview.
- **Kbd-style keys**: `.kbd` class — inline little key-cap look for keyboard hints.

### Voice / copy

- First-person ("I build...", not "We provide solutions").
- Reference **real industry stats** with source citations (BrightLocal, Think with Google, Stanford Web Credibility). Never invent Motley-Tech-specific numbers.
- Milledgeville / Baldwin County local specifics are fine and encouraged.
- Developer-studio flavor: file-name-style lists, `$` prefixed commands, `[ // TAGS ]`, `v2.0` version pills, `✓ PASS / ✕ FAIL`.

---

## Key interactive components

### Hero rotator (Alpine — `heroRotator()`)

Right side of hero. Cycles through the 4 demos every 4 seconds via `setInterval`.

- **State**: `current` (index 0–3), `timer` (interval id), `demos[]` (array of demo metadata).
- **Each demo entry** has: `id`, `label`, `name`, `tagline`, `kicker`, `url`, `href`, `bg` (CSS gradient), `fg`, `meta`, `glow`, `font`, `weight`, `style`.
- **`start()`** sets the interval. **`restart()`** clears + restarts (used when user clicks a dot indicator).
- **Ring-glow halo** behind the frame interpolates to match each demo's color via `demos[current].glow`.

### Contact form (Alpine — `motleyForm()`)

4-step visual card picker → payoff preview.

- **Steps**: (1) business type, (2) what's broken (multi-select), (3) vibe, (4) name + email. Then step 5 = generated preview card.
- **`previewDomain`** getter auto-generates a slug from `businessName`.
- **`tagline`** getter maps business type to a personality line.
- **Submit currently logs to console only** — NOT wired to a real backend. Uncomment the mailto block in `submit()` for a quick fallback, or hook to Formspree/Vercel serverless when deploying.
- Step transitions use `x-show` + `x-cloak` (NOT `x-transition` — caused stacking bug where multiple steps rendered at once; see feedback).

### Sample Sites nav dropdown

In the main nav. `x-data="{ open: false }"` on hover/click. Lists all 4 demos with tiny color swatches + mono file names. Items link to `demos/<vertical>/` (trailing slash → serves the folder's `index.html`).

---

## Multi-page conventions

Every page in the same site has the same `<head>`, `<nav>`, and `<footer>` **duplicated inline** (no build step — raw HTML). If you change one, change all pages in that site.

**Active-page indicator**: on each page, the matching nav link gets `class="text-ember underline underline-offset-8"` (main site) or the demo's accent-color equivalent (`text-gold` / `text-moss` / `text-brassL` / `text-navy`). Remove from the link when on a different page.

**Link-path rules**:
- Main site pages reference each other by filename: `href="why.html"`, `href="contact.html"`, etc.
- Main site → demos: `href="demos/restaurant/"` (trailing slash → directory index)
- Demo page → sibling demo page: `href="menu.html"` (same folder)
- Demo page → back to main site: `href="../../index.html"` or `href="../../contact.html"` (two levels up)
- Demo's top-banner link: `../../contact.html` for "get yours →", `../../index.html` for "Motley Tech"

**Adding a new page to a demo**:
1. Copy any existing sibling page as a template
2. Keep the `<head>` + `<nav>` + footer identical
3. Swap out the main content between them
4. Update the nav link in ALL pages of that site to link to the new page
5. Update the active-page indicator so the new page's nav link is highlighted when on it

**Adding a new main-site page**:
1. Same pattern — copy an existing main-site page
2. Add the link to every main-site nav (`index.html`, `why.html`, `process.html`, `contact.html`, and implicitly to the dropdown if demo-related)

**`heroRotator()` lives on `index.html` ONLY.** Don't include it in `process.html` / `contact.html`.

**`motleyForm()` lives on `contact.html` ONLY.** The Alpine state machine that powers the card-picker + preview payoff.

### Card alignment conventions (locked)

Every card grid across the site enforces uniform heights and visual rhythm. Pattern:

1. **Grid container** gets `items-stretch` (explicit, even though it's the default). For grids with more than one row, also add `auto-rows-fr` so rows are equal height, not just items within a row.
2. **Each card** gets `flex flex-col h-full` so its contents can distribute vertically.
3. **Source citations / footer metadata** inside a card get `mt-auto pt-4` to pin them to the bottom. That way "— BrightLocal" on a short card sits at the same visual y-position as "— Stanford Web Credibility" on a longer one.
4. **Aspect-ratio preview panes** (e.g. demo gallery 16/10 previews) get `flex-shrink-0` so they don't collapse when the card stretches.
5. **Variable-length text** should be edited to be roughly uniform across sibling cards when possible. The grid handles height mismatch, but matching copy length matches visual density.

Confirmed measurements after this pass (2026-04-17):
- Stats grid → all 4 cards = 398px
- BEFORE/AFTER compare → both = 792px
- Demo gallery → all 4 = 478px
- Process cards, FAQ grid, contact pickers all `flex flex-col h-full`

Don't add new card grids without following this pattern — broken alignment is the fastest way for the site to feel amateur.

### SEO + AEO (Answer Engine Optimization)

This is treated as a first-class feature — not bolt-on. Locked in since 2026-04-17.

**Every main page has:**
- Full `<title>` + `<meta name="description">` — unique per page
- **Open Graph + Twitter Card** meta tags for rich social/iMessage previews (share image at `assets/brand/og-image.svg`)
- **Schema.org JSON-LD** as `<script type="application/ld+json">` in `<head>`:
  - `index.html` / `process.html` / `contact.html` → `@graph` with `ProfessionalService`, `Person` (Grant Motley), `Service` (with `Offer` array for free build / subscription / buyout)
  - `faq.html` → `FAQPage` with all 10 Q&A pairs as `mainEntity`
- `<link rel="icon" ...>` to `assets/brand/favicon.svg`

**Why it matters**: AI answer engines (ChatGPT, Perplexity, Gemini, Claude) use structured data + crawlable HTML to decide which businesses to cite when a user asks "who builds small business websites?" The site is explicitly designed to be their answer.

**Root-level crawler files:**
- `sitemap.xml` — lists all 22 HTML URLs with priorities. Referenced from `robots.txt`.
- `robots.txt` — **explicitly allows** GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot (plus all traditional crawlers via `User-agent: *`). Do NOT add `Disallow` rules without reason.
- `llms.txt` — plain-markdown description of the site structured for LLM discovery (emerging 2024/2025 convention: one short paragraph + links to key pages). Think of it as "robots.txt for content, not crawling."

**FAQ strategy (important)**: the FAQ page is the single biggest AEO lever. All 10 questions are `<details open>` so content is visible immediately (no click-to-expand — crawlers + reduced-motion users see everything). The FAQPage schema mirrors the visible content exactly; do NOT let them drift apart.

**Don't introduce Milledgeville-specific hardcoding** (Grant's rule, 2026-04-17). The schema uses `"areaServed": "United States"` deliberately. The existing "Milledgeville" mentions in the hero/footer can stay but don't layer more in — Grant plans to expand.

### Scroll-reveal (every page)

Every HTML file has a **scroll-reveal snippet** — fades sections + grid-children into view on scroll. Lives as CSS in the `<style>` block and JS right before `</body>`.

- **CSS class `.reveal`** — starts `opacity: 0; transform: translateY(14px)`. When `.is-in` is added, transitions to `opacity: 1; transform: none` over 700ms.
- **Auto-tag**: the JS automatically adds `.reveal` to every `<section>` and to direct children of `.grid` / `[class*="grid-cols"]` inside sections. Stagger: each grid child gets a 70ms transition-delay (capped at 480ms) so items appear one-after-another.
- **Opt-out**: add `class="no-reveal"` to any element to skip it. Useful for elements that should be visible immediately.
- **Reduced-motion**: respects `prefers-reduced-motion: reduce` — instantly shows everything with no transition.
- **Don't wrap hero content** — hero lives in `<header>`, not `<section>`, so it's unaffected. If you add a new `<section>` you want visible on load, apply `class="no-reveal"`.

The snippet is idempotent on re-injection (checks for `.reveal { opacity: 0` marker before injecting).

---

## The four demo sites — distinct identities

**Grant's explicit requirement**: each demo must feel like a different business, NOT like the main Motley Tech site. Use different fonts, palettes, and layouts per vertical. All four should look nothing alike when clicked.

### 1. restaurant.html — Mama Lou's Kitchen
- **Vibe**: Editorial warm Southern, 47-year-old institution
- **Fonts**: **Playfair Display** (huge italic display) + Inter body
- **Palette**: Burgundy `#7c2d12` / cream `#FEF3C7` / gold `#C8A24B`
- **Structure**: full-bleed hero → today's plates → menu with dot-leader pricing → chef story → reservation form → visit
- **Ornament**: Gold horizontal-rule pseudo-element `.ornament` as section dividers

### 2. retail.html — Oak & Thread
- **Vibe**: Modern minimal boutique, slow-fashion editorial
- **Fonts**: **Instrument Serif** (display, including italic) + **Manrope** (sans body)
- **Palette**: Monochrome (ink `#0a0a0a` / off-white `#FAFAF9` / taupe `#78716C`) + moss accent `#3F5D3D`
- **Structure**: marquee ticker → 50/50 split hero → 4-category strip → product grid with hover image-swap → lookbook split → journal teaser → newsletter
- **Hover effect**: products have a 2nd "swatch" that fades in on hover (`.product:hover .swatch-2`)

### 3. salon.html — The Barber & Co.
- **Vibe**: Dark vintage luxury, masculine, by-appointment only
- **Fonts**: **DM Serif Display** (big elegant serif) + **Montserrat** (tracked sans)
- **Palette**: Coal `#0a0908` / ash `#1c1917` / brass `#B88A44` / cream `#E7D9BC`
- **Structure**: barber-pole top stripe → moody hero → services menu (numbered 01/02/...) → 3 barber profiles → gallery → testimonial → booking form → visit
- **Brass "rule" ornament**: `.rule-brass` gradient line for divider moments

### 4. trades.html — Milledgeville HVAC Pros
- **Vibe**: Utility industrial, phone-first, big-block trust signals
- **Fonts**: **Barlow Condensed** (black 900 weight, condensed) + Inter body
- **Palette**: Navy `#0c4a6e` / safety yellow `#FACC15` / slate
- **Structure**: emergency banner top → nav with "CALL NOW" → big shouted hero + stat sidebar → services grid (6 cards) → how-it-works 3-step → reviews → service area → estimate form → footer → **sticky mobile call bar**
- **Stripe decoration**: `.stripe-caution` diagonal yellow-black — used at top/bottom of dark sections

**Every demo has a top banner**: `"Sample site · built by Motley Tech · get yours →"` linking back to `../index.html` and `../index.html#contact`. This is the cross-sell mechanism.

---

## Images in demos — Unsplash hot-link pattern

27 curated Unsplash photos are embedded across the demos (restaurant 5, retail 11, salon 9, trades 2). They're hot-linked from `images.unsplash.com` — no asset files, no API key, free for commercial use, CDN-cached worldwide.

### The wrapper pattern (always use this)

```html
<div class="aspect-[4/5] relative" style="background: linear-gradient(...);">
  <img src="https://images.unsplash.com/photo-XXXXX?w=900&q=80&auto=format&fit=crop"
       alt="..."
       class="absolute inset-0 w-full h-full object-cover"
       onerror="this.remove()">
</div>
```

Why the wrapper:
- Parent keeps the original CSS gradient as a fallback
- `onerror="this.remove()"` nukes any broken `<img>` so the gradient shows through — **never a broken-image icon**
- Allows layering vignette / gradient overlays on top as additional `<div>`s

For hero backdrops (image behind content), add `opacity-20 mix-blend-luminosity` so the photo gives texture without fighting the brand color. Example in `restaurant.html` and `salon.html` heroes.

### URL parameters

Always use `?w=WIDTH&q=80&auto=format&fit=crop`:
- `w=` — target display width; smaller = faster load (use 700 for product tiles, 1400 for hero)
- `q=80` — good quality, reasonable file size
- `auto=format` — Unsplash serves WebP/AVIF to supporting browsers
- `fit=crop&crop=entropy` (optional) — smart-crop focal point

### Known-dead photo IDs (avoid)

These 404'd during dev — don't reuse:
- `1521322800607-8c38375eef04`
- `1590540179852-2110a27b6bf7`

### Ethical note — NO real faces as fake barbers

The salon demo keeps **monogram initials** (EC / JM / RD) for barber profiles instead of stock portraits. Using real people's faces as fake named employees is gross. If a real barbershop client adopts the site, they swap in their actual team's portraits.

### Swap-in flow when real client lands

When Grant lands an actual Milledgeville business:
1. Create folder `motley-tech/demos/<vertical>/assets/` (e.g., `demos/restaurant/assets/`)
2. Drop their photos in (JPG/PNG/WebP)
3. Replace `src="https://images.unsplash.com/..."` URLs with `src="./assets/<filename>"` — relative paths
4. Gradients stay as fallbacks; layout stays intact
5. Takes about 30 seconds per photo

---

## Grant's confirmed design preferences (feedback)

- **No Fraunces italic anywhere.** The `WONK` and `SOFT` axes read as "funky" to him — specifically the loopy `g`/`y` tails. Dropped entirely on the main site in v2.0. If italic emphasis is needed, use a plain italic from the current font stack (Space Grotesk italic, if available, or just skip italic and use color/weight for emphasis).
- **Main site must look at least as polished as the demos.** He noticed the demos looked better than the main site and asked for the techier/sharper v2.0 refresh. Don't let the main site fall behind demo quality again.
- **Demos must feel like different businesses.** No shared typography or palette across demos. Each one is its own brand.
- **Contact form emphasizes tap-to-answer, minimal typing.** "Cool UI, not clicking and typing" was the directive. Visual cards, progress bar, personalized preview payoff. Typing only at the final step.
- **No Otto/Comvoy/Fouts as case studies.** Explicit.
- **Scarcity framing works for Grant** ("First 5 Milledgeville businesses · 3 spots left"). Keep it.

---

## Known gotchas

- **Claude preview screenshots time out** when the page has heavy CSS filters (`feTurbulence`, `filter: blur(60px)`). If adding texture/grain, prefer stacked `radial-gradient()`s or SVG background patterns — not SVG filters.
- **Alpine `x-transition.opacity.duration.300ms` caused a stacking bug** where old tabs remained display:block after switching. Use plain `x-show` + `x-cloak` (CSS `[x-cloak]{display:none!important}` is in `<style>`). Do NOT add back `x-transition` modifiers without verifying.
- **Fonts include variable-axis features** — only enable axes you need. Don't set `font-variation-settings` inline unless you've verified it renders how you expect across weights.

---

## Deployment (as of 2026-04-24)

**Live at https://motley-tech.com** (custom domain purchased via Cloudflare Registrar).

- **Repo**: https://github.com/gdmotley1/motley-tech (public, GitHub Pages from `main` root)
- **CNAME** file binds the domain. **DNS** is Cloudflare; 4 apex A records (185.199.108–111.153) + www CNAME to `gdmotley1.github.io`, currently **proxied** (orange cloud). Cloudflare SSL mode is **Full** (NOT Full strict — strict breaks GitHub Pages because Cloudflare-proxied DNS prevents Let's Encrypt HTTP-01 cert issuance for the apex domain).
- **Deploy**: `git push` to `main`. Rebuild ~1 min.
- **Canonical links**: every HTML page has `<link rel="canonical" href="https://motley-tech.com/...">`. The `gdmotley1.github.io/motley-tech/` URL is deliberately *not* the canonical.
- **404.html**: on-brand dark-tech 404 at the repo root. GitHub auto-serves for missing paths.

## Contact form wiring

`contact.html` → `submit()`:
- **Default**: opens user's mail client (mailto:) pre-filled to motleytech.ai@gmail.com with business name, type, vibe, problems, contact, suggested domain. Works with zero setup.
- **Formspree swap-in**: set `FORMSPREE_ENDPOINT` (const at top of the script) to the endpoint from https://formspree.io; `submit()` switches to `fetch` POST with mailto as failure fallback. No other code changes.

## SEO / AEO state (as of 2026-04-29)

Site is technically as optimized as a static marketing site can be. Remaining levers are off-site (backlinks, GBP, time) not technical. Don't keep tweaking schema or meta tags — the next gain comes from authority, not code.

**Done:**
- Google Search Console: verified via **Cloudflare DNS TXT** (domain property covers all subdomains). Sitemap submitted. Top 9 URLs manually requested for indexing.
- Bing Webmaster: verified via **meta tag** (`<meta name="msvalidate.01" content="ACFDF9F00674053EA660C221F30F5EA5">` lives in `index.html` head). Sitemap submitted. Top 9 URLs submitted via URL Submission.
- **IndexNow** enabled via Cloudflare's Crawler Hints toggle (Caching → Configuration). Auto-pings Bing + Yandex on every push. Big AEO move because ChatGPT search uses Bing's index.
- Cloudflare site recommendations applied: Always Use HTTPS, TLS 1.3, Brotli, HTTP/3, Early Hints, Auto Minify, Cloudflare Fonts, Bot Fight Mode all on.
- Cloudflare **Email Routing** live: `hello@motley-tech.com` and `grant@motley-tech.com` forward to `motleytech.ai@gmail.com`. Catch-all not yet enabled.
- Tailwind compiled to `dist/main.css` — LCP went from 34% Poor to 8% Poor (92% Good).
- 16 FAQs + FAQPage schema, journal post + Article schema, ProfessionalService + Person + Service + Blog + CollectionPage schemas live.
- Meta descriptions tightened on all 7 main pages.
- humans.txt, theme-color (palette-matched per demo), llms.txt all in place.

**Open (Grant-side, mostly off-site):**
1. **Google Business Profile** — STILL UNCLAIMED. Single biggest missing item. https://business.google.com → service-area business → "Motley Tech, Milledgeville GA". 10 min. Gets a knowledge panel + feeds Google Maps + AI answers.
2. **Convert `og-image.svg` → `og-image.png`** — Facebook/iMessage/LinkedIn don't render SVG previews. squoosh.app, 30 sec. Then `find . -name "*.html" | xargs sed -i 's|og-image.svg|og-image.png|g'` and re-push.
3. **Cloudflare Web Analytics** — Grant to toggle on at Analytics & Logs → Web Analytics → enable. Will give a `<script>` snippet to paste into all 32 page heads.
4. **Backlinks** — Milledgeville/Baldwin Chamber of Commerce member directory, LinkedIn company page, GitHub profile README. Each one tells Google "real entity, not parked domain."
5. **One social profile per major platform** — same name + URL everywhere = entity signal.
6. **More journal posts** — 1/month is the cadence target. Each post = new door for Google + AI to find the site.
7. **Catch-all email** — Cloudflare → Email Routing → enable catch-all to capture typos like `info@`, `contact@`, `support@`.

**Other open items (non-SEO):**
8. **Formspree signup + endpoint paste** — whenever Grant wants real lead capture instead of mailto.
9. **Replace placeholder phone** if wanted. Currently email-only.
10. **Repeat-prospect handling**: once a real build is done, consider adding a "Recent work" section using the actual client (with permission) instead of just the sample demos.
11. **Self-host demo photos eventually.** Currently hot-linked from Unsplash (27 photos). Mirror to `demos/<vertical>/assets/` if Unsplash rate-limits or demo load ever matters for SEO. Wrapper pattern already supports drop-in swap.
12. **LocalBusiness schema upgrade** — current `ProfessionalService` schema could add `LocalBusiness` with geo coordinates (Milledgeville lat/lng) once Grant decides whether to stay locally focused or go regional. Currently `areaServed` is "United States" deliberately.

**What to expect:** Google takes 2-8 weeks to fully index and start ranking a new domain. Bing's faster (days). Don't panic about query data being thin until ~5 days post-submission. Branded+geo searches ("Motley Tech Milledgeville") will surface before pure brand searches because of the band-name competition.

---

## Quick reference — paths

- Main site: `C:\Users\motle\claude-code\motley-tech\index.html`
- Demos: `C:\Users\motle\claude-code\motley-tech\demos\*.html`
- Design system: `C:\Users\motle\claude-code\motley-tech\design-system\motley-tech\MASTER.md`
- Preview config: `C:\Users\motle\claude-code\.claude\launch.json` (entry: `motley-tech`)
- Preview URL: `http://localhost:4321/`
