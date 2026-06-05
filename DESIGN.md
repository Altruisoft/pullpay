# PullPay Design System

Reference for anyone building UI in PullPay. This document maps directly to the token layer in `layout.css` and the component patterns already shipped in the landing page and application views.

---

## Identity

PullPay is developer tooling for the Stellar ecosystem. The visual language borrows from financial infrastructure products (Stripe Atlas, Linear, Vercel) — not crypto dashboards, not SaaS marketing sites.

**What this means in practice:**

- No gradient backgrounds on sections. Surfaces are flat and warm.
- No decorative illustrations. If something is visual, it shows real product UI (escrow cards, transaction states, GitHub workflow snippets).
- No rounded-everything. Border radii are deliberate — larger on hero-level containers (24px), tighter on inline elements (6–8px).
- No stock icons. SVG strokes at 1.2–2px weight, matching the typographic weight of surrounding text.

---

## Color

All color tokens live in `layout.css` under the `@theme` block. The naming uses a `crx-` prefix (legacy convention, kept for consistency).

### Surfaces

| Token | Hex | Usage |
|---|---|---|
| `crx-page` | `#F7F6F3` | Page background. Warm off-white, not pure grey. |
| `crx-panel` | `#FFFFFF` | Cards, modals, popovers. Clean white against the warm page. |
| `crx-muted` | `#F0EFEC` | Recessed areas, code blocks, secondary panels. |
| `crx-inverse` | `#0B0B0B` | Dark UI blocks (footer, dark hero variant if needed). |

### Text

| Token | Hex | Usage |
|---|---|---|
| `crx-black` | `#0C0A09` | Headlines, primary body text, interactive labels. |
| `crx-charcoal` | `#1C1917` | Slightly softer than black — used in dense paragraph text. |
| `crx-gray-700` | `#57534E` | Secondary body copy. The default "paragraph grey". |
| `crx-gray-500` | `#78716C` | Tertiary text: timestamps, eyebrow labels, helper text. |

### Brand

| Token | Hex | Usage |
|---|---|---|
| `crx-orange` | `#0FA8F1` | Primary accent (the PullPay blue). CTA buttons, active states, accent lines. Named "orange" for legacy reasons — it is blue. |
| `crx-orange-hover` | `#15376E` | Hover/pressed state for primary buttons. Shifts to deep navy, not lighter blue. |
| `crx-orange-soft` | `#E8F6FE` | Light tint for badges, soft backgrounds behind accent elements. |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `crx-border-subtle` | `#E7E4DE` | Default card borders, section dividers. Warm, not cool grey. |
| `crx-border-default` | `#D8D5CE` | Slightly stronger — used for interactive card borders on hover. |
| `crx-border-strong` | `#BDB8AE` | Inputs in focus state, emphasized separators. |

### Semantic

Standard red/green/amber/blue set for status indicators (escrow states, validation results):

- `crx-success` / `crx-success-soft` — Settled, merged, funded states
- `crx-warning` / `crx-warning-soft` — Pending, timelock active
- `crx-danger` / `crx-danger-soft` — Failed, expired, refunded
- `crx-info` / `crx-info-soft` — Informational callouts

---

## Typography

**Inter** is the only typeface. No secondary font. No display font for headlines.

### Scale

- **Hero headlines:** `clamp(2.5rem, 4.5vw, 4.2rem)`, weight 500, tracking `-0.04em`. Used once per page.
- **Section headlines:** `clamp(2.4rem, 5vw, 4.5rem)`, weight 500, tracking `-0.06em`. Tighter tracking because these tend to be longer.
- **Section sub-headlines / card titles:** `text-lg` to `text-2xl`, weight 500, tracking `-0.02em` to `tight`.
- **Body text:** 14px–18px depending on context. Line-height `1.6`–`1.75` for readability.
- **Eyebrow labels:** 12–13px, uppercase, tracking `0.2em`, weight 500, color `crx-gray-500`. These precede every section headline.
- **Monospace:** System monospace for wallet addresses (`GBXF...7Q3K`), contract IDs, and code snippets. Rendered with `bg-crx-black text-white px-1.5 py-0.5 rounded-sm` inline badges when inside prose.

### Rules

1. Headlines never end with a period.
2. Body text uses sentence case, not title case.
3. CTAs use sentence case with an arrow glyph (`↗`) separated by a space, not an icon component.
4. Numbers in data displays (amounts, percentages) use tabular figures where available.

---

## Layout

### Grid

Content maxes out at `1440px` with `px-6` on mobile and `px-12` on desktop.

Most marketing sections use a **two-column asymmetric grid** — sticky left column (eyebrow + headline, ~42–45%) with scrollable right column (content, ~55–58%). This is the signature pattern. Not every section needs it, but the Problem, Why Stellar, and How It Works sections use it consistently.

### Spacing

- Section vertical padding: `py-20` mobile, `py-28` desktop.
- Between section headline block and content: `mb-14` (56px).
- Inside cards: `p-6` mobile, `p-8` desktop.
- Between stacked cards/items in a list: `0` — they share borders, not margins. This creates a table-like density.

### Section Rhythm

Sections alternate between `bg-crx-page` and `bg-crx-panel` (white). Every section has a `border-b border-crx-border-subtle` bottom border. The alternation creates a reading cadence without relying on color blocks.

---

## Components

### Buttons

- **Primary:** `bg-[#0FA8F1]` with white text, `rounded-[0.9rem]`, `px-8 py-3.5`. Hover transitions to `crx-orange-hover` (`#15376E`). No gradient, no ring effect.
- **Secondary/Ghost:** White or transparent background, `border border-crx-border-subtle`, text color inherits. On hover: fills white, gains shadow.
- **CTA text links:** Inline `<a>` with `font-medium`, arrow glyph, color transitions on hover.

### Cards

- White background, `border border-crx-border-subtle/60`, `rounded-[1.5rem]`, `shadow-[0_24px_60px_rgba(0,0,0,0.06)]`.
- On hover: shadow deepens, no scale transform (scale on cards looks cheap).
- Interior content follows a clear hierarchy: eyebrow → title → description → footer metadata.

### Data Rows (Rail Comparison, Feature Lists)

- Items stack vertically sharing borders (`divide-y`), no individual card wrapping.
- Each row: `py-4` to `py-6`, two-column grid — left column for label/title (bold, tight), right for description (normal weight, secondary color).
- Hover: background shifts to white (from `crx-panel` or `crx-page`). Subtle, no animation beyond `duration-300`.
- Index numbers displayed as `[01]` in monospace, `crx-gray-400`, transitioning to accent on row hover.

### Section Header Pattern

Every marketing section follows this structure:

```
<p> eyebrow — uppercase, tracked, crx-gray-500 </p>
<h2> headline — large, tight tracking, crx-black </h2>
<p> optional supporting paragraph — max-w-lg, crx-gray-700 </p>
```

The gap between eyebrow and headline is `space-y-5`. This is consistent across all sections — do not vary it.

---

## Motion

Two utilities from `$lib/motion`:

- **`reveal`:** Fade-in + translate-Y on scroll intersection. Default `y: 24`, delay staggered per element (`0.06` increments). Used on every section.
- **`parallax`:** Subtle Y-axis shift on scroll. Reserved for hero background image and CTA portrait image only. Not used on cards or text.

### Rules

1. No element should animate more than 30px of travel.
2. No animation should exceed 600ms duration.
3. `prefers-reduced-motion` disables all motion — the layouts must work without animation.
4. No hover scale transforms on cards. Only on primary CTA buttons (`hover:scale-[1.03]`), and only in the hero and final CTA sections.

---

## Content Voice

PullPay copy is written for grant reviewers and infrastructure-minded developers. It is not marketing fluff.

- State what the product does, not what it "empowers" or "unlocks".
- Use concrete numbers: "$5 reward", "<$0.01 fee", "sub-5-second finality".
- Avoid superlatives. Not "the best" or "revolutionary". Say what it does and let the reader evaluate.
- Terminology: "maintainer" and "contributor", never "user" or "customer". "Ecosystem infrastructure", never "platform" or "marketplace".
- Every claim should be verifiable. If a feature is testnet-only, say so. If a flow requires Freighter, say so.

---

## File Map

| File | Purpose |
|---|---|
| `layout.css` | All design tokens (`@theme` block) |
| `$lib/motion.ts` | `reveal` and `parallax` Svelte actions |
| `$lib/components/landing/data.ts` | All landing page copy and structured data |
| `$lib/components/landing/types.ts` | TypeScript interfaces for landing data |
| `$lib/components/ui/` | Shared primitives (Button, etc.) |
