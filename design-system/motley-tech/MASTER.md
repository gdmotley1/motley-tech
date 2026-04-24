# Motley Tech — Design System (MASTER v2.0)

> Source of truth for all Motley Tech UI work. Refreshed 2026-04-16.
> **v1.0 (warm cream + Fraunces) is deprecated.** Do not revert.

## Brand Direction
- **Vibe**: Modern tech studio · dark, sharp, confident (peer to Vercel/Linear/Stripe in feel)
- **Audience**: Small local businesses in Milledgeville, GA
- **Personality**: "I build the same quality the biggest tech companies build — for your neighborhood." Approachable in copy, precise in craft.

## Color Palette (Dark Tech)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-0` | `#0A0A0C` | Page bg |
| `bg-1` | `#111114` | Card bg |
| `bg-2` | `#17171B` | Elevated / hover |
| `bg-3` | `#1E1E23` | Deepest elevated |
| `text-0` | `#FAFAF9` | Primary text |
| `text-1` | `#D6D3D1` | Secondary text |
| `text-2` | `#A8A29E` | Muted |
| `text-3` | `#78716C` | Most muted |
| `line` | `#26262C` | Subtle borders |
| `line-strong` | `#36363E` | Emphasized borders |
| `ember` | `#F97316` | Primary accent · CTAs · brand |
| `ember-hot` | `#FB923C` | Ember hover |
| `lime` | `#A3E635` | Success · status · secondary accent |
| `amber2` | `#FACC15` | Data-viz warning tone |

Glows:
- `shadow-glow-ember`: `0 0 0 1px rgba(249,115,22,0.25), 0 20px 60px -20px rgba(249,115,22,0.45)`
- `shadow-glow-lime`: `0 0 0 1px rgba(163,230,53,0.25), 0 20px 60px -20px rgba(163,230,53,0.35)`
- `shadow-card`: `0 1px 0 0 rgba(255,255,255,0.04) inset, 0 16px 48px -20px rgba(0,0,0,0.6)`

## Typography

- **Display / headings**: **Space Grotesk** (400–700) · tight tracking `-0.025em`
- **Body**: **Inter** (400–700)
- **Mono** (labels, tags, file names, timestamps, units): **JetBrains Mono** (400–600)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Fraunces is banned from the main site.** (v1.0 legacy — rejected.)

## Signature motifs

- **Section tags** — `[ // THE STAKES ]`, `[ // HOW IT WORKS ]` — mono 11px, ember, letter-spacing 0.12em, uppercase. Utility class `.tag-mono`.
- **Dot-grid background** `.dotgrid` — subtle white dots, 24px grid.
- **Pulsing status dot** — `.status-dot` with `pulse-dot` keyframe. Often inside mono pills like `[ MILLEDGEVILLE, GA · ACCEPTING BUILDS ]`.
- **Mini browser frames** `.mini-frame` + `.mini-bar` — dark URL-bar look with 3 gray dots. Used in hero (rotator) and form payoff.
- **Gradient border** `.border-gradient` — ember→lime→transparent as 1px pseudo-element. Reserve for *hero* moments (process step 3, "What I build" card).
- **Mono "file name" lists** — `✓ responsive_and_fast.tsx` style. Used in before/after diff.
- **Slot counter** — numbered pills for scarcity (`01 02 03 04 05`, dimmed when "taken").

## Style
- Rounded corners — default `rounded-2xl` for cards, `rounded-lg` for buttons
- Transitions: `200ms ease` default
- Hover on cards: `translate-y-[-1px]` or `-translate-y-1` + border color shift to `ember/50`
- No heavy motion or parallax

## Voice
- **First person** — "I build...", never "We provide solutions"
- Cite real industry stats with sources (BrightLocal, Think with Google, Stanford)
- Milledgeville / Baldwin County local specifics are encouraged
- Developer-studio flavor welcome: `$` command prefixes, `[ // TAGS ]`, version pills, `v2.0`

## Anti-patterns
- Fraunces italic (funky loopy glyphs — rejected by Grant)
- Warm cream backgrounds (reverts to v1.0)
- Corporate stock photos
- "Solutions / synergize / passionate about" copy
- Otto / Comvoy / Fouts references (explicitly forbidden on this site)
- Fake testimonials or Motley-Tech-specific stats

## Typography + color example

```html
<!-- Headline -->
<h2 class="display text-5xl font-semibold text-text-0 tracking-tight">
  Zero risk.
  <span class="text-ember">Actually zero.</span>
</h2>

<!-- Section tag -->
<div class="tag-mono">[ // HOW IT WORKS ]</div>

<!-- Primary CTA -->
<a class="inline-flex items-center gap-2 px-7 py-4 bg-ember hover:bg-ember-hot text-bg-0 rounded-lg font-semibold">
  <span class="mono text-xs">$</span>
  Start my build
</a>
```

## Demo sites' palettes (intentionally different — don't apply Motley's system there)

Demos live in `demos/*.html` and each has its own full design system. Never make a demo match this MASTER — they exist to show breadth.

- **Mama Lou's** → Playfair Display + burgundy/cream/gold editorial
- **Oak & Thread** → Instrument Serif + Manrope monochrome boutique
- **The Barber & Co.** → DM Serif Display + Montserrat dark vintage brass
- **HVAC Pros** → Barlow Condensed + Inter navy/safety-yellow industrial

See `CLAUDE.md` for each demo's full styling notes.
