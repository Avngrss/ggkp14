# Stage 3F — Scale, Header & News Fix

## What was wrong visually

User feedback after Stage 3E:

- Header crooked and too tight
- Search button awkwardly inserted into navigation area with text label
- Text and navigation too small (12–13px nav, tiny news/services text)
- News section looked weak and too small
- Lower cards looked like unfinished admin blocks
- Overall layout still felt visually broken

## Exact header fix

Desktop header (1280px+):

```css
grid-template-columns: 340px minmax(0, 1fr) 230px;
gap: 28px;
min-height: 82px;
```

- Left: logo badge + institution name (15px, 2 lines max) + address
- Center: primary nav only (16px, 24px gap) — no search
- Right: actions only (search 44×44 icon + CTA 164×48px)
- Below 1280px: burger menu, no desktop nav

## Exact search placement fix

- Search moved inside `.header-search` in `.site-header__actions` only
- Icon button with `aria-label="Открыть поиск по сайту"` — no text «Поиск» button
- Dropdown 420px wide, aligned to actions column
- Input and submit height 46px
- Escape / outside click / focus behavior unchanged

## Hero scale fix

- Padding: 54px top, 64px bottom
- Grid: `minmax(0, 1fr) 380px`, gap 40px
- Content card padding 42px
- H1 clamp max ~44px, line-height 1.12
- Subtitle max-width 620px
- Visual slot fixed height 260px
- Info cards slightly more compact

## News scale fix

- Section padding 64px vertical
- Header title 36px, description 18px, margin-bottom 28px
- Grid renamed to `.latest-news__grid`: `1fr / 1.1fr`, gap 28px
- Featured: image 240px, body padding 26px, title 22px, text 16px
- Compact: 124×88 thumbnails, min-height 120px, title 17px, meta/link 14px

## Services scale fix

- Section padding 64px
- 3 equal columns, gap 24px
- Cards min-height 210px, padding 28px
- Title 20px, body/links 16px
- QR 96px (92px on mobile below text)

## Official resources fix

- Max 8 items visible on homepage
- Grid: 4 cols desktop, 2 tablet, 1 mobile
- Card min-height 74px, padding 16px, logo 36px, text 15px
- Link «Все официальные ресурсы» added below grid

## Files changed

- `src/pages/index.html`
- `src/css/tokens.css`
- `src/css/components.css`
- `src/css/homepage.css`
- `src/css/responsive.css`
- `docs/07-demo-preview-instructions.md`
- `docs/13-stage-3f-scale-header-news-fix.md`

## Remaining limitations

- Dropdown nav items (Информация, Контакты) still present in center nav
- Search remains demo alert only
- Official resource labels still use full partner names
- No WordPress PHP

## What user should review

1. Header at 1440 and 1280 — alignment, nav readability, search in actions
2. Hero title not cropped, less empty vertical space
3. News text size and featured vs compact balance
4. Services cards — readable, not admin-like
5. Official resources — 8 items + more link
6. Sticky header + search dropdown while scrolling
