# LLM_AGENT_README.md

> **Audience:** LLM agent (but helpful for humans, too). The goal is deterministic, low‑surprise edits.

## Golden rules
- **Add markup only inside the AGENT HOOKS** in `pages/index.html`:
  - `<!-- [AGENT HOOK] HEADER-FEATURE-SLOT -->`
  - `<!-- [AGENT HOOK] MAIN-FEATURE-SLOT -->`
  - `<!-- [AGENT HOOK] SBL-FEATURE-SLOT -->`
  - `<!-- [AGENT HOOK] SBR-FEATURE-SLOT -->`
  - `<!-- [AGENT HOOK] FTR-FEATURE-SLOT -->`
- **Prefix classes by area**: `.hdr-*`, `.main-*`, `.sbl-*`, `.sbr-*`, `.ftr-*`.
- **Use the provided primitives**: `.cmp-*` (components) and `.u-*` (utilities). Don’t re‑invent near‑duplicates.
- **Don’t change**: cascade layer order, grid `grid-template-areas`, or global layout in `assets/base/layout.css`.
- **No IDs. No `!important`. Selector depth ≤ 2.**

## How to add a feature (example: MAIN)
1. In `pages/index.html`, locate:
   ```html
   <!-- [AGENT HOOK] MAIN-FEATURE-SLOT -->
   <div class="main-slot"></div>
   ```
2. Insert markup using only `.main-*` and `.cmp-*` classes, e.g.:
   ```html
   <section class="main-feature cmp-card">
     <h2 class="main-title">Title</h2>
     <p class="main-desc cmp-clamp">Two-line description…</p>
     <a href="#" class="cmp-button cmp-button--ghost">Learn more</a>
   </section>
   ```
3. Add styles to `assets/areas/main.css` using only `.main-*` selectors (and `.cmp-*`/`.u-*` helpers).

> Each area CSS (`header.css`, `main.css`, `sidebar-left.css`, `sidebar-right.css`, `footer.css`) starts with a **HOW‑TO** block and follows the same pattern.

## Accessibility checklist
- Keep the **skip link** (`<a class="skip-link" href="#main">`) and the `id="main"` on the `<main>` element.
- Avoid heavy animations; reduced‑motion is respected globally.
- Always provide visible focus with `:focus-visible`.

## Breakpoints
Edit once in `assets/base/layout.css` under the **EDIT BREAKPOINTS HERE** block:
- **360px** — header appears
- **780px** — left sidebar appears
- **1024px** — right sidebar appears

## Pre-flight checklist before you’re “done”
- [ ] HTML inserted only inside the correct **AGENT HOOK**.
- [ ] Classes use the correct **area prefix** and **`.cmp-*`/`.u-*`** helpers.
- [ ] No IDs, no `!important`, selector chains ≤ 2.
- [ ] Landmarks intact (`<header>`, `<main id="main">`, `<aside>`, `<footer>`).
- [ ] Visual pass on `pages/sanity.html`.
