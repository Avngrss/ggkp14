# Stage 3H — Sticky Header & Responsive QA

## What was inspected

Files read before any edits:

- `src/pages/index.html` — topbar, `.site-header`, search panel, mobile drawer structure
- `src/css/tokens.css` — z-index, header height tokens
- `src/css/base.css` — `scroll-padding-top`, `body.menu-open`
- `src/css/layout.css` — containers, image slots
- `src/css/components.css` — header sticky rules, `.is-scrolled`, search panel, drawer z-index
- `src/css/homepage.css` — hero, news, services responsive grids
- `src/css/responsive.css` — breakpoints, `overflow-x` on html/body
- `src/js/main.js` — scroll listener, `--header-height` update, search open/close
- `src/js/menu.js` — drawer open/close, body scroll lock
- `src/js/accessibility.js` — a11y toggle
- `docs/07-demo-preview-instructions.md`

Playwright MCP QA was run at 1440, 1280, 1024, 768, 390, and 360px before and after fixes.

## Sticky header current state found (before fix)

- `.site-header` already had `position: sticky; top: 0; z-index: 200`
- `.topbar` is **not** sticky — scrolls away (correct)
- JS toggled `.is-scrolled` (shadow) and `.is-compact` (height/logo shrink)
- `--header-height` CSS variable updated only on resize, not on scroll or search open

**Critical bug:** `overflow-x: hidden` on `html, body` in `responsive.css` prevented `position: sticky` from working — header scrolled off-screen instead of sticking.

**Secondary issues:**

- `.is-compact` reduced header height by 10px on scroll → visible layout jump
- Search input focus scrolled page back to top when opening search while scrolled
- `--header-height` did not include search panel height when open

## Sticky header changes made

1. **`responsive.css`:** `overflow-x: hidden` → `overflow-x: clip` (+ `max-width: 100%`) so sticky works without reintroducing horizontal scroll
2. **`components.css`:** Removed `.is-compact` min-height and logo shrink rules — scroll state uses shadow/border only via `.is-scrolled`
3. **`main.js`:**
   - Removed `.is-compact` toggle
   - `updateScrollPadding()` runs on scroll and resize
   - Includes search panel height when panel is open
   - Exposes `header.updateScrollPadding` for search module
   - Search input uses `focus({ preventScroll: true })` to avoid page jump

No HTML structure changes. No switch to `position: fixed`.

## Responsive issues found

| Viewport | Issue found | Severity |
|----------|-------------|------------|
| 1440 | Sticky header not sticking (global overflow bug) | Critical |
| All | 10px layout jump on scroll from `.is-compact` | Medium |
| 1440 scrolled | Search open scrolled page to top | Medium |
| 360–390 | Compact news thumbs slightly large for narrow width | Minor |

No overlap, horizontal overflow, or broken grids found at 1280/1024/768/390/360 after sticky fix.

Desktop 1440 layout (brand | nav | actions) unchanged.

## Responsive fixes made

- **Global sticky fix** (see above) — benefits all viewports
- **`homepage.css` `@media (max-width: 479px)`:** compact news thumbs 96×72, tighter padding — scoped to narrow mobile only

No changes to desktop 1440 grid, news 1+4 structure, 3 service cards, or official resources count.

## Files changed

- `src/css/components.css` — removed `.is-compact` dimension rules
- `src/css/responsive.css` — `overflow-x: clip` fix
- `src/css/homepage.css` — narrow mobile compact news tweak
- `src/js/main.js` — sticky scroll padding sync, search focus fix
- `docs/15-stage-3h-sticky-header-responsive-qa.md` — this file
- `docs/07-demo-preview-instructions.md` — Stage 3H checklist
- `docs/audit/demo-stage3h-*.png` — 9 screenshots

## What was intentionally not changed

- Header HTML structure and grid zones from Stage 3G
- Desktop breakpoint (nav from 1440px)
- Hero layout and content
- News featured + 4 compact structure
- Services 3-card layout
- Official resources 8 items
- Topbar visibility rules
- Mobile drawer structure and z-index stack

## Desktop preservation notes

Before/after Playwright comparison at 1440px:

- Nav display: `block`, burger: `none`
- Header zone overlap: `false`
- News: 1 featured + 4 compact
- Services: 3 cards
- Horizontal overflow: `false`
- After fix: header sticks at `top: 0` on scroll; topbar scrolls away

## Remaining limitations

- `overflow-x: clip` has slightly less legacy browser support than `hidden` (acceptable for demo)
- Search panel is absolutely positioned inside sticky header — tall panel overlays content below (intended dropdown behavior)
- `.is-compact` class no longer used (can be removed entirely in future cleanup)
- Physical device testing not performed

## What user should review before Git push

1. Scroll page at 1440px — header sticks, topbar disappears, shadow appears
2. No content jump when scrolling past 120px
3. Open search while scrolled — page position preserved, panel under header
4. Mobile 390/360 — burger, drawer above header, no horizontal scroll
5. Compare `docs/audit/demo-stage3h-desktop-1440-top.png` vs Stage 3G header screenshot — desktop layout unchanged
6. Review `demo-stage3h-desktop-1440-scrolled-sticky.png` for sticky appearance
