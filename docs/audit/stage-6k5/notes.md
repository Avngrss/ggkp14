# Stage 6K.5 audit evidence

Date: 2026-10-20

## Live-source access result

- Playwright navigation to `https://ggkp14.by/` failed with `net::ERR_CERT_COMMON_NAME_INVALID`.
- Screenshot: `live-cert-error.png`.
- Strict UTF-8 fallback (fresh fetch) was used for content inspection.
- HTTP results from fallback:
  - `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` -> 200
  - `/kiberprestupnost/` -> 200
  - `/protivodejstvie-ekstremizmu/` -> 200
  - `/informaciya/mery-po-realizacii-ukaza-631/` -> 200
  - `/administrativnye-procedury/` -> 403 (still blocked)

## Canonical mapping (implemented)

- `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` -> `incapacity.html`
- `/kiberprestupnost/` -> `cybercrime.html`
- `/protivodejstvie-ekstremizmu/` -> `extremism.html`
- `/informaciya/mery-po-realizacii-ukaza-631/` -> `decree-631.html`

## Source-structure decisions

- `incapacity.html`: prose article + one phone contact + one external document link.
- `cybercrime.html`: media-heavy page, six section blocks, source images and video links kept external.
- `extremism.html`: long legal-information prose, heading blocks preserved from source line structure.
- `decree-631.html`: legal/benefits article with source list structure and bank link.
- `/administrativnye-procedury/`: no page created because source body was not readable (HTTP 403).

## Navigation position evidence

- Information dropdown and drawer order after Stage 6K.4 entries:
  1. Порядок признания граждан недееспособными
  2. Профилактика киберпреступлений
  3. Противодействие экстремизму
  4. Меры поддержки по реализации Указа 631
- `information.html` card for incapacity now points to `incapacity.html`.

## Local Playwright verification

- Viewports checked: `390x844`, `768x1024`, `1439x900`, `1440x1000`.
- New pages: title + `h1` + breadcrumbs verified; all returned local HTTP 200.
- Horizontal overflow: not detected on the four new pages at all required viewports.
- Information dropdown: visible at 1440, four new entries present in order.
- Keyboard: focus reaches dropdown items (evidence screenshot with focused `extremism.html` item).
- Sticky header: `is-scrolled` state applied and header top stayed at `0` after scroll.
- Drawer: each new Information entry appears exactly once; drawer scroll reaches end; Escape closes at 390 and 768.
- `cybercrime.html`: remote source images are referenced by HTTPS URLs on `ggkp14.by`; in local browser checks they log `ERR_CERT_COMMON_NAME_INVALID` and may not render until source TLS access is normal.

## Cross-page consistency result

- Production pages checked: 48 (`preview.html` excluded).
- Header consistency script confirmed each production page contains links to the four new Information pages in both desktop menu and drawer.

## Publication mapping result

- Updated: `src/pages/preview.html`, `.github/workflows/pages.yml`, `tools/simulate-pages-dist.py`.
- Simulated dist checks:
  - new pages present in `dist/pages/`
  - `dist/pages/preview.html` removed
  - `dist/.nojekyll` present

## Remaining missing source-header path

- `/administrativnye-procedury/` only.

## Screenshot list

- `live-cert-error.png`
- `local-desktop-header-1440.png`
- `local-information-dropdown-1440.png`
- `local-information-keyboard-focus-1440.png`
- `local-header-1439.png`
- `local-mobile-drawer-768.png`
- `local-mobile-drawer-390-top.png`
- `local-mobile-drawer-390-bottom.png`
- `incapacity-1440.png`
- `cybercrime-1440.png`
- `extremism-1440.png`
- `decree-631-1440.png`
