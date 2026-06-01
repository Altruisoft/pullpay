# Design System: PullPay Ecosystem

## 1. Visual Theme & Atmosphere

The visual identity is **Institutional Swiss** — clean, functional, and quietly authoritative. PullPay is ecosystem infrastructure, not a consumer SaaS, so the design reflects an execution-oriented tool that prioritizes clarity over decoration.

The design uses a **light-mode base** with warm neutral surfaces, generous whitespace (120px+ section gaps), and sharp typographic hierarchy. Accent color is used sparingly to draw attention to interactive elements and brand-heavy moments.

## 2. Color Palette & Roles

*   **Page Background:** `#F7F6F3` (Warm off-white surface).
*   **Panel/Card:** `#FFFFFF` (Clean white containers).
*   **Primary (PullPay Blue):** `#0FA8F1` (Reserved for primary actions, CTA buttons, accent lines, and brand-heavy moments).
*   **Secondary (PullPay Dark Blue):** `#15376E` (Used for hover states, interactive trust indicators, and secondary emphasis).
*   **Text (Primary):** `#0C0A09` (Near-black for maximum readability).
*   **Text (Secondary):** `#78716C` (Stone-tinted grey for supporting text).
*   **Border (Subtle):** `#E7E4DE` (Warm border for cards and dividers).

## 3. Typography Rules

This system utilizes **Inter** exclusively for its utilitarian, high-legibility roots.
*   **Headlines:** `clamp(2.4rem, 5vw, 4.5rem)`, fontWeight: 500. Tight negative letter spacing (`-0.06em`).
*   **Body:** 14px–16px for optimal scanning.
*   **Data & Labels:** Uppercase tracking (`0.2em`), 12px, font-weight 500.
*   **Monospace:** Used for wallet addresses, transaction hashes, and contract IDs.

## 4. Component Stylings

*   **Buttons:**
    *   *Primary:* Solid PullPay Blue (`#0FA8F1`) background, white text, hover transitions to Dark Blue (`#15376E`).
    *   *Secondary:* White background with subtle border (`#E7E4DE`), shadow on hover.
*   **Cards/Containers:** Generously rounded corners (16px–24px), subtle border (`#E7E4DE`), white background, hover shadow elevation.
*   **Section Labels:** Uppercase, `0.2em` letter-spacing, stone-grey (`#78716C`), 12px.

## 5. Layout Principles

*   **12-column Modern Asymmetric Grid:** Marketing sections use offset alignments (e.g., sticky headline on cols 1–5, scrollable content on cols 6–12).
*   **Whitespace:** Generous section gaps (80px–120px) to allow elements to breathe.
*   **Responsive:** Mobile-first with `lg:` breakpoint for desktop layouts.
