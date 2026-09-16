# Stage 3I — Designer Feedback Fixes

Дата: 2026-09-16  
Этап: правки по обратной связи дизайнера перед внутренним аудитом страниц.

---

## Designer feedback (исходный список)

1. **Header full width** — фон header/topbar/sticky/search panel на всю ширину viewport.
2. **Hero CTA cleanup** — убрать дублирующую кнопку «Запись к врачу» под «Время работы».
3. **Hero column content and padding** — компактнее, лучше использовать ширину колонки.
4. **Primary color more blue** — сместить палитру с teal-green к медицинскому синему.
5. **Padding system consistency** — единый вертикальный ритм секций homepage.
6. **Multilingual readiness** — подготовка layout к RU / BY / EN без полного перевода.
7. **Accessibility foundation** — skip link, lang, ARIA для search/menu, focus-visible.
8. **Adaptive search menu fix** — иконка лупы вместо accent-кнопки «Найти» на mobile/tablet.

---

## Что изменено

### 1. Header full width

- `.topbar`, `.site-header`, `.header-search-panel` — `width: 100%`, без ограничения `max-width` на оболочках.
- Внутреннее выравнивание через `.container` в `.topbar__inner`, `.site-header__inner`, `.header-search-panel__inner`.
- Sticky shadow/border на `.site-header` сохраняется на полной ширине.
- Desktop grid (1440px+) не изменён: brand | nav | actions.

### 2. Hero CTA cleanup

- Удалена карточка `hero__info-card--cta` с кнопкой «Запись к врачу» под блоком «Время работы».
- Остаётся один primary CTA в `.hero__actions`.
- Header CTA и drawer CTA сохранены как отдельные точки входа.

### 3. Hero padding / content

- Уменьшены `padding-block` hero, внутренние отступы content panel и info cards.
- Сокращены grid gaps в hero grid.
- Desktop composition сохранена; tablet/mobile получили пропорциональное уменьшение через `responsive.css`.

### 4. Primary color → medical blue

**tokens.css:**

| Token | Было (teal) | Стало (blue) |
|-------|-------------|--------------|
| `--color-primary` | `#0D7377` | `#1A6EA8` |
| `--color-primary-dark` | — | `#145A8A` |
| `--color-topbar-bg` | teal | `#145A8A` |
| `--color-accent-soft` | `#E8FBF8` | `#E8F4FC` |
| `--color-focus` | teal | `#1A6EA8` |

- Обновлены shadow tints, nav active colors, hero accent gradient.
- `hero-bg.svg` — синие градиенты вместо teal.
- Compact news thumbnail gradient — синие оттенки.

### 5. Padding consistency

Новые токены:

- `--section-padding: 48px` (desktop large sections)
- `--section-padding-compact: 40px`
- `--section-padding-mobile: 32px`

Применены в `layout.css` для `.section`, `.section--compact`; дублирующие padding у `.latest-news`, `.useful-info` убраны из `homepage.css`.

### 6. Multilingual readiness

- Переключатель **RU / BY / EN** в topbar (desktop 1440+) и в mobile drawer.
- `hreflang="ru|be|en"`, `lang` на ссылках, `aria-current="true"` на активном RU.
- `aria-label="Выбор языка"` на обоих switcher.
- Header CTA допускает перенос текста (`white-space: normal`) для более длинных EN/BY labels.
- Полный перевод контента **не выполнялся** — будет на этапе WordPress / multilingual plugin.

### 7. Accessibility

- `<html lang="ru">` — подтверждено.
- `<main id="main">`, skip link `#main`.
- Один `<h1>` в hero; логический порядок h2 в секциях.
- Search toggle: `aria-expanded`, `aria-controls="header-search-panel"`.
- Menu toggle: `aria-expanded`, `aria-controls="mobile-drawer"`.
- Mobile drawer: `aria-hidden`, `role="dialog"`, `aria-modal="true"`.
- Icon search submit: `aria-label="Выполнить поиск"`.
- Decorative SVG: `aria-hidden="true"` или `alt=""`.
- Focus-visible и reduced motion — без изменений логики, токены focus обновлены под новый primary.

### 8. Adaptive search

- Два submit: `.search-form__submit-text` (desktop «Найти») и `.search-form__submit-icon` (лупа).
- `@media (max-width: 1439px)`: текст скрыт, показана компактная icon-кнопка с neutral border.
- Header search panel — только поиск, без дублирующего CTA.
- Mobile drawer: CTA **перед** search, не под accent search button.

---

## Файлы изменены

| Файл | Изменения |
|------|-----------|
| `src/pages/index.html` | lang switcher, search icon button, hero CTA removal, `id="main"` |
| `src/css/tokens.css` | blue palette, section padding tokens |
| `src/css/layout.css` | section padding tokens |
| `src/css/components.css` | full-width header, lang switcher, search icon, drawer order |
| `src/css/homepage.css` | hero padding, compact news gradient |
| `src/css/responsive.css` | adaptive search, section mobile padding |
| `src/assets/images/hero-bg.svg` | blue gradients |
| `docs/07-demo-preview-instructions.md` | Stage 3I checklist |
| `docs/20-stage-3i-designer-feedback-fixes.md` | этот документ |

JS-файлы (`main.js`, `menu.js`, `accessibility.js`) — без структурных изменений; существующая логика search/menu/sticky совместима.

---

## Ограничения

- Переводы RU/BY/EN — только layout readiness, ссылки `#`.
- Некоторые SVG placeholders могут содержать старые teal оттенки — не критично для UI kit demo.
- Internal pages audit **не начинался**.
- WordPress PHP **не создавался**.

---

## Что проверить дизайнеру / заказчику

1. Header background на всю ширину — нет «обрезанных» краёв на 1440/1280.
2. Sticky header после прокрутки — тень на full width.
3. Hero: одна кнопка «Запись к врачу» в actions, нет дубля в info cards.
4. Hero визуально компактнее, H1 не обрезан.
5. Primary blue — достаточно «медицинский», не неон.
6. Секции: равномерные вертикальные отступы (news, services, resources, departments).
7. Language switcher RU/BY/EN в topbar и drawer.
8. Mobile search: icon button, без тяжёлой кнопки «Найти».
9. Нет horizontal overflow на 390/360.
10. Skip link, focus ring, aria на интерактивных элементах.

---

## Скриншоты

Захвачены через Cursor Playwright MCP (локальный сервер `python -m http.server 8765`):

- `docs/audit/demo-stage3i-header-1440.png`
- `docs/audit/demo-stage3i-hero-1440.png`
- `docs/audit/demo-stage3i-news-services-1440.png`
- `docs/audit/demo-stage3i-desktop-1280.png`
- `docs/audit/demo-stage3i-tablet-768.png`
- `docs/audit/demo-stage3i-mobile-390.png`
- `docs/audit/demo-stage3i-mobile-search-open.png`
- `docs/audit/demo-stage3i-sticky-scrolled.png`
