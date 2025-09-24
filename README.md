# Layered Baseline (HTML + CSS only)

This is an **LLM‑ready** edition of a baseline for simple web-applications. It includes stable grid areas and cascade layers, and adds a few quality‑of‑life upgrades so humans and LLMs can extend it safely and consistently.

## What’s new in this edition
- **Single-sourced breakpoints (build‑less).** Edit them once in `assets/base/layout.css` (see “EDIT BREAKPOINTS HERE” block).
- **Accessibility built‑ins.** Global `:focus-visible`, reduced‑motion handling, and a styled `.skip-link` that targets `#main`.
- **Expanded tokens.** Spacing, radii, shadows, type scale, and container paddings alongside the original color tokens.
- **Tiny component kit.** Reusable `.cmp-*` primitives: card, button, stack, line‑clamp, simple nav.
- **Style rules you can lint.** `.stylelintrc.json` enforces class prefixes and low selector depth (optional but recommended).
- **Visual sanity page.** Open `pages/sanity.html` to eyeball regressions across areas/components.

## Quick start
1. Open `pages/index.html` in your browser to see the baseline layout.
2. Open `pages/sanity.html` to view a compact gallery of components and areas.

## Editing breakpoints (single source of truth)
All breakpoints live directly in **`assets/base/layout.css`**. Search for the block:
```css
/* =============================
   EDIT BREAKPOINTS HERE (single source of truth)
     S (header appears):   360px
     M (left sidebar):     780px
     L (right sidebar):    1024px
   Update these numeric values directly in the media queries below.
   ============================= */
@media (min-width: 360px) { /* header */ }
@media (min-width: 780px) { /* left sidebar */ }
@media (min-width: 1024px) { /* right sidebar */ }
```
> Note: We intentionally **don’t** use CSS variables for media queries (not supported) and we avoid a build step.

## Design tokens
Defined in **`assets/base/tokens.css`** under `@layer base`:

**Color & surfaces**
- `--bg`, `--fg`, `--border`, `--outline`, `--card-bg` (auto‑switch in dark mode)

**Spacing**
- `--space-2: 0.5rem`, `--space-4: 1rem`, `--space-6: 1.5rem`, `--space-8: 2rem`, `--space-12: 3rem`

**Radii**
- `--radius-s: 4px`, `--radius-m: 8px`, `--radius-l: 12px`

**Shadows**
- `--shadow-1` (subtle), `--shadow-2` (elevated)

**Type scale**
- `--font-size-xs/s/m/l/xl`, `--line-tight/normal/relaxed`

**Containers**
- `--container-gap`, `--area-pad`

## Components kit (`assets/components/components.css`)
- `.cmp-card` — padded surface with border and shadow
- `.cmp-button` (+ `.cmp-button--ghost`)
- `.cmp-stack` — vertical spacing helper (`--stack-gap` override)
- `.cmp-clamp` — multi‑line text clamp (`--clamp-lines`)
- `.cmp-nav` — very small inline nav

## Accessibility built‑ins
- Global `:focus-visible` outline with `outline-offset` for clarity.
- Reduced‑motion CSS disables heavy animations when users prefer less motion.
- `.skip-link` is included at the top of the `<body>` and styled in `utilities.css`. It targets `<main id="main">`.

## Style rules (LLM‑friendly)
Keep changes predictable for humans and LLMs:
- **Use class selectors only.** **No IDs**, no element selectors for features.
- **No `!important`.**
- **Selector depth ≤ 2** (e.g., `.main-card .cmp-button` is fine; deeper chains are not).
- Respect cascade **layer order** and **do not modify grid areas**.

### Layer order
`assets/base/reset.css` sets the canonical order:
```css
@layer reset, base, layout, area-header, area-main, area-sidebar-left, area-sidebar-right, area-footer, components, utilities;
```
> Load files in any order; the cascade is controlled by the layer list above.

## Linting (optional but recommended)
If you use Node:
```bash
npm i -D stylelint stylelint-config-standard
```
Add to `package.json` (optional):
```json
{
  "scripts": { "lint:css": "stylelint \"assets/**/*.css\"" }
}
```
Run:
```bash
npm run lint:css
```
The included **`.stylelintrc.json`** enforces allowed prefixes per area, bans IDs and `!important`, and limits selector depth.

## Contributing — where to put code
- **HTML features:** only inside `<!-- [AGENT HOOK] …-FEATURE-SLOT -->` comments in `pages/index.html`.
- **CSS for that feature:** the matching file in `assets/areas/` (`header.css`, `main.css`, `sidebar-left.css`, `sidebar-right.css`, `footer.css`).
- Prefer `.cmp-*` and `.u-*` helpers over inventing new micro‑utilities.


---

## Improvements in this baseline (2025-09-24)

**What changed**
- Added semantic tokens (`--surface`, `--text`, `--muted`, `--accent`, `--outline`) and fixed missing tokens (`--stack-gap`, `--clamp-lines`, `--u-gap`). `:root` now declares `color-scheme: light dark`.
- Rewrote `reset.css` for stricter structure, consistent tokenized focus rings, and better reduced-motion handling (without `!important`). Also added `prefers-contrast` support.
- Introduced `.u-skip-link` (kept legacy `.skip-link` working), `.u-clamp`, and `.u-stack` utilities.
- Added performance hints with `content-visibility: auto` to major layout areas.
- Added rail toggles: apply `.has-left-rail` / `.has-right-rail` (or `.no-left-rail` / `.no-right-rail`) on `<body>` to control sidebars.
- Added component primitives such as `.cmp-card`, and stack/clamp aliases.
- Hardened Stylelint config (order, declaration-strict-value) and a token CI check script (`npm run check:tokens`).

**Layer order (unchanged)**
```
@layer reset, base, layout, area-header, area-main, area-sidebar-left, area-sidebar-right, area-footer, components, utilities;
/* Files: reset → tokens → layout → areas → components → utilities */
```

**Responsive behavior**
- The layout remains grid-first; the `<body>` is marked with `container-type: inline-size` to enable future container-query enhancements. Use the rail toggles on `<body>` to switch configurations in markup.

**Skip link**
- Add a skip link at the top of `<body>`:
  ```html
  <a class="u-skip-link" href="#main">Skip to content</a>
  ```

**Stylelint**
- Run: `npm run lint:css` (and `npm run lint:css:fix`). To enforce token discipline, run: `npm run check:tokens`.

