# Motley Tech — Brand Guidelines

*Single source of truth for the Motley Tech identity. Use this when handing off to printers, embroiderers, stationers, or anyone else producing anything with the name on it.*

---

## The mark

![](assets/brand/wordmark-dark.svg)

Two components — **the wordmark is primary; the mark is supporting.**

- **Wordmark** — the name *Motley Tech*, set in **Space Grotesk Bold (700)** with tight tracking (−0.025em), title case. This is the brand, full stop. It stands alone on the website, documents, invoices, email signatures, and most print.
- **Mark** — a solid **ember-orange square** (`#F97316`), 1:1 aspect ratio. A **supporting element** for tight spaces where the full wordmark won't fit or read well (favicon, app icon, social avatar, hat side, sticker corner, small embroidery spots).

When both are used together — called the **full lockup** — the mark sits to the **left** of the wordmark with a gap equal to the mark's own width. Reserve the full lockup for: stationery headers, business cards, t-shirt back prints, and other moments where you have real estate to show both.

**Website convention (as of 2026-04-17)**: nav and footer use the wordmark alone, generously sized. The ember square does not appear on the live site — it's reserved for print and merch.

---

## Files

All canonical files live in `assets/brand/`.

| File | Use |
|------|-----|
| `wordmark-dark.svg` | Dark backgrounds (the website, dark letterhead, merch with dark base colors) |
| `wordmark-light.svg` | Light backgrounds (white stationery, invoices, documents) |
| `wordmark-mono.svg` | Single-color — black default, swap `fill` for embroidery / foil / etch |
| `mark.svg` | Just the ember square, for tight spaces |
| `favicon.svg` | Browser tab — ember square with a white "m" baked in, readable at 16×16 |

**For embroidery and print vendors**: open `wordmark-mono.svg` in Figma or Illustrator → *convert type to outlines* → send the outlined version. This removes the dependency on the Space Grotesk font being installed at the vendor's shop.

---

## Colors

| Role | Hex | CMYK (approx) | Thread (approx) |
|------|-----|---------------|------------------|
| Ember (primary accent) | `#F97316` | 0 · 62 · 92 · 0 | Madeira 1678 / Sulky 1168 *(confirm with vendor)* |
| Ink (dark text / dark bg) | `#0A0A0C` | 0 · 0 · 0 · 100 | Black |
| Paper (light text / light bg) | `#FAFAF9` | 0 · 0 · 0 · 2 | White |

For any vendor that asks for Pantone, specify **Pantone 165 C** as the ember match.

**One-color reproduction**: if the budget only allows one color, use the `wordmark-mono.svg` in black (on light products) or white (on dark products). Drop the ember. The wordmark still holds up.

---

## Typography

- **Wordmark typeface**: [Space Grotesk Bold (700)](https://fonts.google.com/specimen/Space+Grotesk) — free on Google Fonts.
- **Tracking**: −0.025em (slightly tighter than default) on the wordmark only. Body copy uses Inter at normal spacing.

If the vendor can't access Space Grotesk, use the outlined version (see above) so the letterforms come over as shapes, not text.

---

## Clear space (don't crowd the mark)

Maintain clear space around the full lockup equal to **one mark's width** on every side. On a polo chest, this means: if the mark is 10mm square, leave 10mm of blank space around the entire lockup.

```
     ██
██   Motley Tech   ██
     ██
```

---

## Minimum sizes

| Medium | Full lockup | Mark alone |
|--------|-------------|------------|
| Screen | 120px wide | 16px wide |
| Print (business card, invoice) | 30mm wide | 8mm wide |
| Embroidery | 60mm wide on chest / 80mm wide on back | 20mm wide |

Below these sizes, switch to the mark alone — the wordmark loses legibility.

---

## Merch placement (polos, hats, tees)

| Item | Placement | Size | Variant |
|------|-----------|------|---------|
| Polo (left chest) | 4" down from shoulder, centered on chest panel | 3" wide | full lockup, mono |
| T-shirt (left chest) | Same as polo | 3" wide | full lockup, mono |
| T-shirt (full back) | 6" down from collar, centered | 10" wide | full lockup, two-color |
| Hat (front crown) | Centered, 1" up from brim | 2.25" wide | full lockup, mono |
| Hat (side crown) | Either side, 1" back from front seam | 1" wide | **mark only** |
| Tote bag | Centered, 4" down from top hem | 4" wide | full lockup |
| Sticker | N/A | 2.5" square | mark only + wordmark below, stacked |

---

## Do / Don't

✅ **Do**
- Use the mark and wordmark at the lockup proportions defined above
- Keep them in ember / ink / paper colors
- Maintain clear space
- Use white wordmark on ember, or ember mark next to ink wordmark

❌ **Don't**
- Stretch, skew, or rotate the lockup
- Recolor the ember square to anything else (no red, no brand-of-the-month blues)
- Add shadows, bevels, outlines, or effects
- Place the wordmark on a busy photo without a solid backplate
- Italicize, underline, or re-space the wordmark
- Separate the mark and wordmark with more than "one mark width" of gap in the lockup
- Put the wordmark below minimum size (it becomes illegible)

---

## Voice/copy cheat sheet (for context when designing materials)

- **Style**: modern tech studio, not quirky craftsman. Clean, precise, confident.
- **Tagline** (optional): *"Websites for Milledgeville businesses, built free."*
- **Location tag**: *Milledgeville, GA · Baldwin County*
- **Contact**: motleytech.ai@gmail.com

### Voice rules (locked 2026-04-28)

Every page on `motley-tech.com` follows these. If you write or edit copy, hold the line.

1. **First person, plural.** "We build," "we ship," "we'll have something to show you." Never "I," "me," or "my" for Motley Tech actions. Use "I" / "my" only when speaking *as the customer* (form labels, CTAs like "Start my build") or quoting one. Never "our team," "the agency."
2. **Specific over generic.** Real numbers (`200M`, `$3,000/mo`, `14 days`), real places (Milledgeville, Baldwin County), real scenarios. No "elevate your business," no "leverage solutions."
3. **Plainspoken.** Short sentences. Conversational. A neighbor explaining a trade, not a sales deck. Read it aloud; if it sounds like a brochure, rewrite it.
4. **Confident, not boastful.** State what's true. "Live in 14 days," not "industry-leading turnaround." Skip the superlatives unless backed by a citation. Cut weasels ("just," "really," "actually," "a bit," "kind of," "I think") and hedges ("we'll try to," "you can if you want," "feel free to," "potentially"). Prefer declarative over conditional: "we do," not "we can"; "it works," not "it might help." Confident, never boastful.
5. **Dev-studio flavor as accent, not wallpaper.** `[ // SECTION TAGS ]`, mono labels, `$` prompts, file-name lists, `v2.0` pills. They're seasoning. Don't pile them on every block.
6. **Punctuation: no em dashes, no emojis.** Em dashes read as AI-generated. Use periods, commas, colons, or parentheses instead. Emojis aren't on-brand.
7. **Cite real sources.** Stats get an attribution line: *BrightLocal*, *Think with Google*, *Stanford Web Credibility*, *OpenAI / Perplexity 2024*. Never invent numbers about Motley Tech itself.
8. **Local without forcing it.** Milledgeville and Baldwin County are fair game when they fit. Don't crowbar them into every paragraph. The site serves the U.S.
9. **Scarcity is honest.** "First 5 Milledgeville businesses, 3 spots left" is a real thing Grant is doing. Don't manufacture fake urgency.
10. **Demos are different brands.** Each demo (Mama Lou's, Oak & Thread, The Barber & Co., Milledgeville HVAC Pros) gets its own voice. The rules above apply to the Motley Tech chrome only, not to the demo content itself.

---

## Version history

| Version | Date | Notes |
|---------|------|-------|
| v1.0 | 2026-04-17 | Initial Fortune-500-style wordmark: ember square + "Motley Tech" in Space Grotesk Bold. Replaces the v2.0-site "motley.tech with m-tile" which was too busy. |
| v1.1 | 2026-04-28 | Voice rule 1 flipped to first person plural. Rule 4 expanded with confidence-tightening: cut weasels and hedges, prefer declarative over conditional. |

---

*This file is the source of truth. If you update the wordmark, update here first, then propagate to `assets/brand/` and to every nav/footer in the site.*
