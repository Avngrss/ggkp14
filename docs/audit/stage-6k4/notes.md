# Stage 6K.4 evidence

Date: 2026-09-24. Local preview was `http://127.0.0.1:8765/`.

## Live source access

Playwright navigation to all five source pages failed with the same error:

- `net::ERR_CERT_COMMON_NAME_INVALID`
- browser URL: `chrome-error://chromewebdata/`

Evidence: `live-cert-error.png`.

Because of that certificate failure, source bodies were inspected through strict UTF-8 fetch with `User-Agent: GGKP14-audit`.

## Local verification screenshots

- `medical-extract-procedure-1440.png`
- `palliative-care-1440.png`
- `ideology-1440.png`
- `preventive-examinations-1440.png`
- `addiction-help-390.png`
- `local-information-dropdown-1440.png`
- `local-information-keyboard-1440.png`
- `local-mobile-drawer-390.png`

## Key checks

- New pages at `390x844`, `768x1024`, `1439x900`, `1440x1000`: page overflow `0`.
- Breadcrumbs:
  - extract and preventive: `Главная → Информация → page`;
  - ideology: `Главная → Информация → Идеология`;
  - palliative and addiction: `Главная → page`.
- Information dropdown visible items now include, in order:
  1. Общая информация
  2. О нас
  3. Порядок получения выписки из медицинских документов
  4. Паллиативная медицинская помощь
  5. Идеология
  6. Порядок проведения профилактических осмотров
  7. Помощь в лечении зависимости
- About flyout stayed open while tabbing and while moving the pointer across child items.
- Drawer at 390 is scrollable, contains each new destination once, and closes on Escape.
