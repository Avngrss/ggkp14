# Stage 6K.6 evidence notes

Date: 2026-10-20

## Source access attempts

1. Playwright MCP:
   - `https://ggkp14.by/` -> HTTP 200, title `Главная - ГУЗ «Гомельская городская клиническая поликлиника №14»`.
   - `https://ggkp14.by/administrativnye-procedury/` -> HTTP 403, title `403 Forbidden`.
2. Strict UTF-8 fetch with browser-like headers:
   - `https://ggkp14.by/administrativnye-procedury/` -> HTTP 403.
3. Live navigation DOM (homepage):
   - Parent row `Административные процедуры` present in Information dropdown.
   - Child rows confirmed in source order:
     1) `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/`
     2) `/palliativnaya-medicinskaya-pomoshhi/`
     3) `/informaciya/ideologiya/`
4. WordPress REST API:
   - `wp-json/wp/v2/pages?slug=administrativnye-procedury` returned one published page.
   - Page id `15076`, canonical link `https://ggkp14.by/administrativnye-procedury/`.
   - Title `Административные процедуры`, one HTML table in `content.rendered`.
5. Sitemap:
   - `https://ggkp14.by/page-sitemap.xml` contains `https://ggkp14.by/administrativnye-procedury/`.
6. Child pages:
   - All three child URLs return HTTP 200.

## Screenshot evidence

- `live-administrative-procedures-403-1440.png`
- `live-information-administrative-flyout-1440.png`
- `local-administrative-procedures-1440.png`
- `local-information-procedures-flyout-1440.png`
- `local-information-procedures-keyboard-1440.png`
- `local-sticky-header-1440.png`
- `local-header-1439.png`
- `local-mobile-drawer-768.png`
- `local-mobile-drawer-390.png`

## Local verification summary

- `administrative-procedures.html` renders with expected title, h1, and breadcrumb.
- Desktop Information dropdown includes Administrative Procedures parent + three child links.
- Keyboard focus reaches the parent row and child rows in desktop dropdown/flyout.
- At 390 and 768 widths, drawer includes parent + three child links once each.
- Drawer closes with Escape at mobile/tablet widths.
- No page-level horizontal overflow at 390, 768, 1439, or 1440 during checks.
