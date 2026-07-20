# Stage 2 — Demo Summary

## Что реализовано

Создан полноценный статический demo редизайна главной страницы ggkp14.by с современным healthcare UI, сохраняющий структуру и контент оригинала.

## Созданные файлы

### CSS
| Файл | Назначение |
|------|------------|
| `src/css/tokens.css` | Design tokens: цвета, типографика, spacing, shadows, radius |
| `src/css/base.css` | Reset, typography, buttons, forms, utilities, a11y mode |
| `src/css/layout.css` | Container, sections, grid, page-layout with sidebar |
| `src/css/components.css` | Topbar, header, nav, drawer, cards, widgets, footer |
| `src/css/homepage.css` | Hero, quick actions, contacts, departments, news, useful links |
| `src/css/responsive.css` | Breakpoints mobile/tablet/desktop, overflow fix, print |

### JavaScript
| Файл | Назначение |
|------|------------|
| `src/js/main.js` | Entry point: sticky header, search demo |
| `src/js/menu.js` | Mobile drawer: open/close, scroll lock, Escape, focus trap |
| `src/js/accessibility.js` | Toggle «версия для слабовидящих» |

### HTML
| Файл | Назначение |
|------|------------|
| `src/pages/index.html` | Static homepage demo |

## Design decisions

1. **Hero split layout** — welcome text + info card (hotline) вместо перегруженного slider
2. **Quick actions grid** — 8 карточек быстрых услуг отдельной секцией
3. **Teal healthcare palette** — `#0D7377` primary, soft backgrounds
4. **Inter font** — Google Fonts, system fallback
5. **CSS gradients** — placeholder images для departments/news (no hotlinking)
6. **SVG icons** — inline, no external icon library
7. **Russian labels** — «Подробнее» вместо «Read More», «Поиск по сайту…»
8. **Semantic HTML** — one H1, section headings H2, aria labels
9. **Mobile drawer** — slide-in from right, overlay, focus trap
10. **Expanded footer** — contacts + navigation (улучшение vs minimal original)

## Assumptions

- Logo represented as text badge «14» + institution name (no external logo image)
- Department/news images — CSS gradient placeholders
- Useful links — text cards instead of partner banner images
- Promo banner — text CTA about dispanserization (based on audit poster concept)
- Links use original URL paths from audit (relative, for future WP integration)
- Search form shows alert in demo (no backend)
- «Версия для слабовидящих» toggles high-contrast CSS class (basic demo)

## What is ready

- [x] Full homepage section order matching audit
- [x] All 18 structural departments
- [x] 6 news cards + 3 extended news items
- [x] 11 useful links
- [x] Contact data from audit
- [x] Sidebar widgets (search, hours, links, telegram, QR placeholder)
- [x] Responsive layout (desktop/tablet/mobile)
- [x] Mobile menu JavaScript
- [x] Accessibility basics (skip link, focus, a11y toggle)

## What needs improvement

- Real logo image and department photos (after asset collection)
- Partner banner images for useful links section
- Carousel for news/useful links (optional, currently static grid)
- Dropdown submenus for «Информация» and «Контакты»
- Full high-contrast a11y mode (font size controls, spacing)
- Search overlay in header (currently sidebar only)
- Topbar «Ещё» dropdown for overflow links on smaller desktops
- Form integrations (Yandex Forms for главный врач)

## Known limitations

- Static demo — links don't navigate to real pages
- No backend search
- ES module-free JS for file:// compatibility
- Google Fonts requires internet connection for Inter font
- Placeholder images only — no real photography

## Next stage

Stage 3: User review → refinements → begin WordPress theme conversion per `docs/04-wordpress-mapping.md`
