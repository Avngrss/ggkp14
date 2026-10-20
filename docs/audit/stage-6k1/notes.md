# Stage 6K.1 evidence

Date: 2026-09-24. Local server: `python -m http.server 8774 --directory src`. Live pages were read with a strict UTF-8 fetch. Playwright opened the local pages. The live site was not clicked.

## Screenshots

- `patients-1440.png` — Patients article at 1440×1000.
- `administration-phones-1440.png` — administration directory, three rows.
- `staff-phones-1440.png` — employee directory.
- `department-hours-390.png` — department hours table scrolling inside its wrapper at 390×844.
- `contacts-dropdown-1440.png` — Contacts dropdown with the three directories and the existing items.
- `mobile-nav-390.png` — drawer at 390×844. The three directories are in the Contacts group. «Для пациентов» is lower in the same drawer.

## Viewport checks

Page-level horizontal overflow was 0 at 390, 768, 1439, and 1440 on all four pages. Directory tables scroll only at 390, and the scroll hint is shown only then. Desktop navigation is visible at 1440. At 1439 and below the drawer toggle is shown instead.

Keyboard focus from «Контакты» reaches every dropdown child, including the three new directories, «Горячая линия», «Электронные обращения», and «Адреса e-mail», then «Абитуриент 2026».

At 1440 the nav link spacing is slightly tighter than before so the seventh top-level item fits beside search and the booking button without overlap.

## Publication

`tools/simulate-pages-dist.py` rewrote the four new root links to `pages/…`, omitted `preview.html`, and wrote `.nojekyll`. `dist/` was removed afterward.
