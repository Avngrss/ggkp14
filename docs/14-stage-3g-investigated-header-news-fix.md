# Stage 3G — Investigated Header, News & Lower Layout Fix

## What was inspected

Before any edits, these files were read in full or in relevant sections:

- `src/pages/index.html` — header DOM, news section, services/resources blocks
- `src/css/tokens.css` — layout tokens (`--container-max`, header widths)
- `src/css/base.css` — scroll padding, typography base
- `src/css/layout.css` — containers, `.image-slot`
- `src/css/components.css` — topbar, header grid, nav, search, official resources
- `src/css/homepage.css` — hero, news, useful-info
- `src/css/responsive.css` — breakpoints 768 / 1280 / 1440
- `src/js/main.js` — sticky header, search open/close/focus
- `src/js/menu.js` — burger drawer
- `src/js/accessibility.js` — a11y toggle

## Actual current header structure found

```html
<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__logo">…logo-icon + logo-text…</a>
    <nav class="main-nav">…main-nav__list / main-nav__item / main-nav__link…</nav>
    <div class="site-header__actions">
      <div class="header-search">
        <button id="header-search-toggle" class="header-search__toggle">…</button>
      </div>
      <a class="btn btn--primary site-header__cta">Запись к врачу</a>
      <button id="menu-toggle" class="menu-toggle">…</button>
    </div>
  </div>
  <div id="header-search-panel" class="header-search-panel">…form…</div>
</header>
```

Topbar (separate, above header):

```html
<div class="topbar">
  <div class="container topbar__inner">
    <nav class="topbar__nav">…topbar__link…</nav>
    <div class="topbar__actions">…email + a11y…</div>
  </div>
</div>
```

## Actual cause of header problem

1. **Breakpoint too early:** Desktop nav was enabled at `min-width: 1280px`, but the header inner width is capped at `--container-max: 1200px`.
2. **Fixed column math did not fit nav:** Grid was `340px | 1fr | 230px`. Middle column ≈ 526px, while six nav items at 16px with 24px gaps need ≈ 740px.
3. **Two-column grid below 1280 with three DOM children:** When nav was hidden this was fine, but at 1280+ overflow from nav spilled visually into brand/actions zones — institution name appeared to collide with nav/search.
4. **Search panel** was absolutely positioned under the icon only (not under full header) and used a visually hidden label.

## Actual changes made to header

- Explicit grid areas: `brand | nav | actions` at desktop; `brand | actions` below 1440px.
- **Desktop nav + topbar only from 1440px** (`max-width: 1439px` uses burger, no desktop nav).
- Wider desktop container: `--container-max-wide: 1320px` at 1440+.
- Reduced brand column to `--header-logo-width: 300px`; nav gap 12px, link font 15px.
- Moved `#header-search-panel` to direct child of `.site-header` (below inner row).
- Search panel is now a full-width bar under header with visible label «Поиск по сайту».
- `main.js` toggles `.is-search-open` on header when panel opens.

## Actual current news structure found

```html
<section class="latest-news">
  <header class="section__intro section__intro--row">
    …h2… + <a class="latest-news__archive">Все новости</a>
  </header>
  <div class="latest-news__grid">
    <article class="card news-featured">
      <figure class="news-featured__figure image-slot">…</figure>
      <div class="news-featured__body">…</div>
    </article>
    <div class="news-compact-list">
      <article class="news-compact">… ×4</article>
    </div>
  </div>
</section>
```

## Actual cause of news visual problem

1. **`news-placeholder.svg`** used skeleton/wireframe rectangles — looked like an loading skeleton, not a photo area.
2. **Featured image height 240px** amplified the empty skeleton block feeling.
3. **Compact items** used 124×88 thumbs, 17px titles, 14px meta — still read as small admin rows.
4. Metadata color `--color-text-muted` was too faint.

## Actual changes made to news

- Replaced featured/thumb placeholder SVGs with soft photo-area gradients (no skeleton bars).
- Featured figure: 200px height, 16:9, gradient background, `object-fit: cover`.
- Featured meta uses secondary text color; title `var(--text-xl)`, excerpt `var(--text-base)`.
- Compact: 132×96 thumbs, min-height 132px, padding 16px, title `var(--text-lg)`, radius `--radius-lg`.
- Section padding normalized to tokens (`--space-12`).

## Services / resources changes

- **Services (3 cards unchanged):** min-height 240px, padding `--space-8`, title `--text-xl`.
- **Official resources (8 items unchanged):** min-height 80px, logo 44px, text `--text-base`, radius `--radius-lg`.
- No search card added; Telegram+QR card unchanged in structure.

## Spacing / scroll fixes

- Removed fixed `64px`/`54px` magic numbers in hero/news/services — use spacing tokens.
- Hero top padding reduced to `--space-6` (sticky offset handled by dynamic `--header-height` in JS).
- No internal scroll containers added; mobile drawer `overflow-y: auto` unchanged (drawer only).

## Files changed

- `src/pages/index.html`
- `src/css/tokens.css`
- `src/css/components.css`
- `src/css/homepage.css`
- `src/css/responsive.css`
- `src/js/main.js`
- `src/assets/images/placeholders/news-placeholder.svg`
- `src/assets/images/placeholders/news-thumb-placeholder.svg`
- `docs/07-demo-preview-instructions.md`
- `docs/14-stage-3g-investigated-header-news-fix.md`
- `docs/audit/demo-stage3g-*.png` (7 screenshots)

## Remaining limitations

- Nav still has 6 top-level items; at exactly 1440px layout is tight but fits with reduced gaps.
- Search remains demo alert only (no backend).
- Placeholder images are SVG gradients, not real photos.
- Official resource logos still use generic placeholders.
- Topbar hidden below 1440px (same as desktop nav threshold).

## What user should check next

1. Header at **1440px** — brand left, nav center, search+CTA right, no overlap.
2. Header at **1280px** — burger visible, no desktop nav collision.
3. Open search — panel under header, visible label, Escape closes, focus returns to button.
4. Hero H1 fully visible when page loads at 1440px.
5. Featured news reads as a card, not a skeleton block.
6. Compact news titles readable at a glance.
7. Services cards and 8 official resources feel proportionate, not tiny admin blocks.
