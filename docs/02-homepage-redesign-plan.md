# План редизайна главной страницы

## Цель редизайна

Преобразовать главную страницу ggkp14.by в современный, доверительный и удобный healthcare-интерфейс, сохранив всю функциональность и информационную архитектуру. Новый дизайн должен снижать когнитивную нагрузку, улучшать доступ к ключевым сервисам (запись к врачу, контакты, обращения) и соответствовать ожиданиям пользователей государственных медицинских порталов 2026 года.

## Концепция: Modern Healthcare UI

**Ключевые принципы:**
- **Доверие и профессионализм** — чистая типографика, медицинская цветовая палитра (teal/blue + white + soft gray)
- **Patient-first** — быстрые действия (запись, обращения, телефоны) доступны в первые 3 секунды
- **Clarity over decoration** — минимум визуального шума, чёткая иерархия
- **Accessible by default** — контраст WCAG AA, focus states, семантика, русскоязычные labels
- **Mobile-ready** — touch-friendly targets, sticky header, collapsible sections

**Референсное настроение:** современные клиники и госмедпорталы (NHS-style clarity + Material Healthcare cards), без копирования конкретных сайтов.

---

## Что остаётся неизменным (структура)

| Элемент | Причина |
|---------|---------|
| Порядок секций | Пользователи и SEO привыкли к текущей логике |
| Topbar links (набор) | Служебная навигация для постоянных посетителей |
| Main menu items | Иерархия разделов сайта |
| Hero welcome text | Официальное название учреждения |
| Quick service links (набор) | Критичные patient journeys |
| Contact blocks (данные) | Юридически значимая информация |
| 18 departments | Полный перечень подразделений |
| News feed | WordPress posts integration |
| Useful links (партнёры) | Государственные требования |
| Sidebar widgets (функции) | Поиск, время работы, ссылки |
| Footer copyright | Юридический текст |

---

## Что улучшаем (UI)

| Область | Текущая проблема | Решение |
|---------|------------------|---------|
| Hero slider | Перегружен 15+ разнородными слайдами | Разделить: 1 welcome block + отдельная grid «Быстрые услуги» + optional promo carousel |
| Topbar | Мелкий текст, много ссылок в ряд | Компактный bar с dropdown «Ещё» на desktop; accordion на mobile |
| Header | Плотная навигация | Sticky header, больше whitespace, чёткий logo zone |
| Contact cards | Heading-телефоны без группировки | Icon cards с click-to-call, grouped by department |
| Info cards | Плоские блоки | Elevated cards с accent border |
| Departments | Однотипные WP thumbnails | Uniform aspect-ratio cards, hover lift, category badges (АОП/ФАП/Отделение) |
| News | Дублирование carousel + grid | Один primary news block + «Все новости» link |
| Useful links | Карусель баннеров разного размера | Normalized logo grid/carousel with consistent height |
| Sidebar | Разрозненные widgets | Unified widget style with section headers |
| Search | English placeholder | «Поиск по сайту…» + accessible label |
| Mobile menu | Overlay без animation | Slide-in drawer with backdrop, clear close button |
| Typography | H4/H5/H1 mix | Single H1, logical H2–H4 hierarchy |
| Colors | Устаревшая WP theme palette | Fresh healthcare palette (см. UI Kit) |

---

## Цветовое направление

```
Primary:    #0D7377 (medical teal)
Secondary:  #14919B (lighter teal)
Accent:     #32E0C4 (bright accent for CTAs)
Dark:       #1A2332 (text, header)
Gray-100:   #F5F7FA (backgrounds)
Gray-300:   #D1D9E6 (borders)
Gray-600:   #6B7A90 (secondary text)
White:      #FFFFFF
Success:    #2ECC71
Warning:    #F39C12
Error:      #E74C3C
```

Акцентные CTA (запись к врачу) — Primary с white text. Информационные блоки — white cards на gray-100 background.

---

## Типографика

| Элемент | Шрифт | Размер | Weight |
|---------|-------|--------|--------|
| H1 (page title) | Inter / system sans | 32–36px | 700 |
| H2 (section) | Inter | 24–28px | 600 |
| H3 (card title) | Inter | 18–20px | 600 |
| Body | Inter | 16px | 400 |
| Small/caption | Inter | 14px | 400 |
| Nav links | Inter | 15px | 500 |
| Phone numbers | Inter | 20–24px | 600 (tabular nums) |

Line-height: 1.5 body, 1.2 headings. Max content width: 1200px.

---

## Spacing

- Base unit: 4px
- Section padding: 64px vertical (desktop), 40px (mobile)
- Card padding: 24px
- Grid gap: 24px (desktop), 16px (mobile)
- Header height: 72px (desktop), 56px (mobile)

---

## Cards / Buttons / Forms

**Buttons:**
- Primary: filled teal, 44px min-height, 8px radius
- Secondary: outlined teal
- Ghost: text only for tertiary actions
- Icon button: 44×44px touch target

**Cards:**
- White background, 1px border gray-300 OR subtle shadow
- 12px border-radius
- Hover: translateY(-2px) + shadow elevation

**Forms:**
- Input height 44px, 8px radius
- Focus ring: 2px primary outline
- Label above input, not placeholder-only

---

## Section-by-section plan

### 1. Topbar
- Slim bar (36px), dark teal background, white text links
- Desktop: first 5 links visible + «Ещё» dropdown
- Mobile: hidden, доступ через icon в header

### 2. Header
- White sticky header with subtle shadow on scroll
- Logo left, nav center/right, search + accessibility icons right
- Dropdown menus: white panel, shadow, 8px radius

### 3. Hero / Welcome
- Split layout: left — welcome text (H1 + subtitle), right — optional image/illustration
- Below: **Quick Actions Grid** (2×4 on desktop, 2×2 on mobile) — иконка + label для каждой услуги
- Promo carousel (optional): 3–5 curated slides max, separate from quick actions

### 4. Contact Info
- 3-column card grid → 1 column mobile
- Each card: icon, department name, phone list with click-to-call
- Email and address in dedicated «Контакты» card

### 5. Info Cards Row
- 3 equal cards: Hotline | Vacancies | Working Hours
- Accent top border in primary color

### 6. Departments
- Section header with «Все подразделения» link
- Responsive grid: 4 cols desktop, 2 tablet, 1 mobile
- Card: image (16:9), title, optional badge (АОП/ФАП)

### 7. Latest News
- Section header + «Все новости» link
- Horizontal scroll or 3-column grid (latest 6)
- Card: image, date badge, title, excerpt optional

### 8. Useful Links
- Logo grid with consistent 120×60 container
- Carousel on mobile, grid on desktop

### 9. Sidebar
- Sticky on desktop (if two-column layout kept)
- Widgets: Search, Hours, Quick Links, Telegram, QR
- Unified widget card style

### 10. Footer
- Minimal: copyright + optional secondary links row
- Dark background, light text

---

## Responsive strategy

| Breakpoint | Layout |
|------------|--------|
| ≥1200px | Full desktop: sidebar right, 4-col grids |
| 768–1199px | 2-col grids, sidebar below main or hidden |
| <768px | Single column, hamburger menu, stacked sections |
| <390px | Reduced padding, 2-col quick actions |

**Mobile-specific:**
- Sticky header with logo + menu + search
- Bottom-fixed optional «Запись к врачу» FAB (consider)
- Touch targets ≥44px
- Carousels: swipe + dot indicators

---

## Accessibility strategy

- One H1 per page: название учреждения
- Section headings: H2
- All interactive elements: visible focus ring
- Icon buttons: aria-label in Russian
- Skip to content link
- Color contrast: minimum 4.5:1 for text
- Phone links: `<a href="tel:+375...">`
- Search: `<label>` + Russian placeholder
- Carousel: aria-roledescription, prev/next with labels
- Reduced motion: respect `prefers-reduced-motion`
- High contrast mode support for «версия для слабовидящих»

---

## Этапы реализации (после Stage 1)

1. UI Kit CSS (variables + base components)
2. Static HTML prototype (front-page)
3. Responsive testing
4. WordPress theme conversion
5. ACF fields for editable blocks
6. Content migration guide
