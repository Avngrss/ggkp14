# Stage 3E — Cleanup & Controlled Layout Fix

## What was cleaned up

### Playwright / npm artifacts

| Item | Status |
|------|--------|
| `package.json` | Removed (contained only default npm test script, created for prior Playwright install) |
| `playwright.config.*` | Confirmed absent |
| `tests/` / `e2e/` | Confirmed absent |
| `test-results/` / `playwright-report/` / `.playwright/` | Confirmed absent |
| `scripts/capture-stage3d-screenshots.mjs` | Confirmed absent |
| `node_modules/` | **May remain locally** from prior install — safe to delete manually; not part of static demo |

No Playwright dependencies are declared in the project after cleanup. Playwright MCP is used only as an external browser tool, not as a project dependency.

## Lower layout problems fixed

| Problem | Fix |
|---------|-----|
| Search card in «Полезная информация» | Removed |
| Search only in lower content | Moved to header dropdown + mobile drawer |
| Lonely «Все новости» button below grid | Moved to section header row |
| 5 equal utility cards | Reduced to exactly 3 cards |
| Separate Telegram + QR cards | Combined into one card |
| Duplicate «Полезные ссылки» section | Renamed to «Официальные ресурсы» |
| Excessive empty space / tall placeholders | Tighter news + useful info CSS, capped featured image height |
| Internal scroll in content areas | No `overflow-y: auto` on news/useful sections (mobile drawer scroll unchanged) |

## Search moved to header

- Button «Поиск» with icon near «Запись к врачу»
- Panel under sticky header with label «Поиск по сайту», placeholder «Введите запрос», submit «Найти»
- Demo form `action="#"` — WordPress: `get_search_form()`
- Escape / outside click close; focus into input on open, back to button on close
- Mobile: icon in header + form in drawer

## News structure

- Section header: eyebrow + title + subtitle + «Все новости» (right)
- Desktop: 45% featured + 55% compact list
- 1 featured + exactly 4 compact items with 96×72 thumbnails
- No footer archive button, no sidebar, no internal scroll

## Useful information — 3 cards

Section: **Сервисы и информация**

1. Время работы
2. Полезные ссылки (4 links + «Все полезные ссылки» → official resources)
3. Telegram и QR-код (combined)

No search card.

## Official resources

- Renamed from duplicated «Полезные ссылки»
- Compact `.official-resource` grid with local `resource-logo-placeholder.svg`

## Sticky header

- Unchanged: `.site-header` sticky, scroll shadow/compact states, search panel inside header element

## WordPress image slot mapping

| Slot | WP source |
|------|-----------|
| `.hero__visual` | ACF `hero_image` |
| `.news-featured__figure` | Featured post thumbnail |
| `.news-compact__thumb` | Post thumbnail fallback |
| `.info-card-widget__qr-compact` | ACF `sidebar_qr_image` |
| `.official-resource__logo` | ACF repeater logo field |

## Files changed

- `src/pages/index.html`
- `src/css/layout.css`
- `src/css/components.css`
- `src/css/homepage.css`
- `src/css/responsive.css`
- `src/js/main.js`
- `src/assets/images/placeholders/resource-logo-placeholder.svg` (new)
- `docs/04-wordpress-mapping.md`
- `docs/07-demo-preview-instructions.md`
- `docs/12-stage-3e-cleanup-and-controlled-layout-fix.md`

## Remaining limitations

- Search shows demo alert only
- Official resource labels still use full partner names in some cases
- `node_modules/` may need manual deletion if present from prior session
- No WordPress PHP yet

## Next review focus

1. Header search UX on desktop and mobile
2. News density (featured vs compact proportion)
3. Three-card useful information row
4. Official resources strip compactness
5. Overall empty space in lower homepage
