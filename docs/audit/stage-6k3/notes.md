# Stage 6K.3 evidence

Date: 2026-09-24. Local preview `http://127.0.0.1:8765/`.

- `about-dropdown-1440.png` — Information menu with the About flyout open. Twelve items, panel bottom inside a 1000px viewport.
- `about-keyboard-1440.png` — focus on «О нас». Tab then reached every flyout child, and the panel stayed open until focus left it.
- `anti-corruption-1440.png` — article page.
- `trade-union-1440.png` — union page and table.
- `administration-reception-1440.png` — first reception tables at desktop.
- `administration-reception-390.png` — same page at 390px. Page overflow stayed 0; the table wrappers scroll.
- `mobile-drawer-390.png` — drawer scrolled to the lower destinations. Escape closed it.

Page overflow was 0 at 390, 768, 1439, and 1440 on all five new pages. The header stayed sticky (`top: 0`, class `is-scrolled`) after scroll.
