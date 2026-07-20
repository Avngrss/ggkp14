# Stage 3A — Design Direction Correction Summary

## Что не понравилось пользователю (Stage 2 feedback)

- Меню выглядело неровно и перегруженно
- Ссылки на другие страницы расположены awkwardly
- Top navigation казалась «кривой»
- Hero area слишком plain / пустая
- Нужны background images или visual elements, ближе к оригинальному сайту
- Общий flat look без глубины

## Что было изменено

### Topbar
- Перестроен на CSS Grid: `1fr auto` (ссылки слева, email + a11y справа)
- Убран `flex-wrap` — ссылки не переносятся на desktop
- Добавлены visual separators между ссылками
- Уменьшен font-size (13px) для компактности
- Email оформлен с иконкой
- Убран «Профсоюз» из topbar (не входил в список user requirements)
- Фиксированная высота 38px

### Main Header
- CSS Grid layout: `auto 1fr auto` (logo | nav | CTA)
- Logo block: увеличен badge (52px), улучшен gradient + shadow
- Nav центрирован в средней колонке
- Единый padding для nav items, font-size 13px
- Active state: bottom border вместо background fill
- Dropdown menus для «Информация» и «Контакты» (hover/focus-within)
- CTA фиксированной ширины справа
- Header shadow + border для depth
- Burger menu на tablet/mobile (< 1200px) — раньше чем 1024px

### Navigation
- Dropdown cards с shadow, rounded corners
- Mobile drawer: grouped sub-links для Information/Contacts
- Mobile drawer: служебные ссылки + a11y toggle
- Chevron rotation на dropdown hover

### Hero Background
- Создан `src/assets/images/hero-bg.svg` — teal/blue gradient overlay
- Создан `src/assets/images/medical-pattern.svg` — medical crosses, dots, circles
- Layered background: gradient + pattern with mix-blend-mode
- Content panel: frosted glass effect (backdrop-filter + white overlay)
- No external hotlinked images

### Hero Composition
- Split grid: content panel (left) + info cards stack (right)
- 3 info cards: Hotline (accent), Working Hours, Appointment CTA
- Welcome badge pill style
- Larger primary CTA button
- Promo links separated with border-top

### Visual Style
- New shadow tokens: `--shadow-header`, `--shadow-card`
- Section subtle gradients instead of flat gray
- Card shadows upgraded
- Promo banner shadow
- Logo badge depth
- Hero frosted panels

## Files Updated

| File | Changes |
|------|---------|
| `src/pages/index.html` | Header structure, dropdowns, hero background, info cards, mobile nav groups |
| `src/css/tokens.css` | Header vars, shadow tokens, nav colors |
| `src/css/base.css` | btn--lg size |
| `src/css/layout.css` | Section gradient backgrounds |
| `src/css/components.css` | Complete topbar/header/nav/drawer rewrite |
| `src/css/homepage.css` | Hero background layers, info cards, composition |
| `src/css/responsive.css` | 1200px breakpoint, tablet/mobile rules |
| `docs/07-demo-preview-instructions.md` | Stage 3A review checklist |

## Files Created

| File | Purpose |
|------|---------|
| `src/assets/images/hero-bg.svg` | Hero gradient background (original asset) |
| `src/assets/images/medical-pattern.svg` | Medical pattern overlay (original asset) |
| `src/assets/icons/favicon.svg` | Site favicon |
| `docs/08-stage-3a-design-correction-summary.md` | This document |

## Assumptions

- Original site images NOT copied (copyright) — replaced with agent-created SVG assets
- SVG backgrounds inspired by original healthcare feel, not pixel copies
- Dropdown sub-links based on audit navigation structure
- Topbar hidden below 1200px (links available in mobile drawer)
- «Профсоюз» removed from topbar but can be re-added if needed

## Remaining Limitations

- No real photography in hero (SVG only)
- Dropdowns hover-only on desktop (no click toggle)
- Topbar may still feel tight on viewports 1200–1280px with long link text
- High-contrast a11y mode still basic
- Useful links still text cards (no partner logos)
- Search only in sidebar

## What User Should Review Next

1. Header alignment at 1440px — logo, nav, CTA on one line
2. Topbar — no ugly wrapping, clean separators
3. Hero background — visual depth without clutter
4. Hero info cards — hotline, hours, appointment
5. Dropdown menus — Information, Contacts
6. Tablet (768px) — burger menu, collapsed topbar
7. Mobile (390px) — hero readability, touch targets
8. Overall feel — closer to public healthcare institution, not startup

## Next Stage

After user visual approval → Stage 3B refinements OR Stage 4 WordPress theme conversion.
