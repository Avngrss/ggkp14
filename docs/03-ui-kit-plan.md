# UI Kit Plan — ggkp14.by Redesign

> Документ описывает планируемую дизайн-систему. Реализация CSS — на Stage 2.

---

## Colors

### Brand palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0D7377` | Primary buttons, links, accents |
| `--color-primary-light` | `#14919B` | Hover states, secondary accents |
| `--color-primary-dark` | `#0A5C5F` | Active/pressed states |
| `--color-accent` | `#32E0C4` | Highlights, badges, FAB |
| `--color-accent-soft` | `#E8FBF8` | Accent backgrounds |

### Neutrals

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text` | `#1A2332` | Primary text |
| `--color-text-secondary` | `#6B7A90` | Captions, meta |
| `--color-text-muted` | `#9AA5B4` | Placeholders, disabled |
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-subtle` | `#F5F7FA` | Section backgrounds |
| `--color-bg-muted` | `#EEF1F5` | Hover backgrounds |
| `--color-border` | `#D1D9E6` | Borders, dividers |
| `--color-border-light` | `#E8ECF1` | Subtle separators |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#2ECC71` | Success messages |
| `--color-warning` | `#F39C12` | Warnings, alerts |
| `--color-error` | `#E74C3C` | Errors, validation |
| `--color-info` | `#3498DB` | Informational |

### Header/Footer

| Token | Value | Usage |
|-------|-------|-------|
| `--color-topbar-bg` | `#0A5C5F` | Topbar background |
| `--color-topbar-text` | `#FFFFFF` | Topbar links |
| `--color-footer-bg` | `#1A2332` | Footer background |
| `--color-footer-text` | `#C8D0DA` | Footer text |

---

## Typography

### Font stack

```css
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-heading: var(--font-family-base);
--font-family-mono: 'JetBrains Mono', monospace; /* optional, phone numbers */
```

### Scale

| Token | Size | Line-height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-xs` | 12px | 1.4 | 400 | Badges, fine print |
| `--text-sm` | 14px | 1.5 | 400 | Captions, meta |
| `--text-base` | 16px | 1.6 | 400 | Body text |
| `--text-lg` | 18px | 1.5 | 400 | Lead text |
| `--text-xl` | 20px | 1.4 | 600 | Card titles |
| `--text-2xl` | 24px | 1.3 | 600 | Section subtitles |
| `--text-3xl` | 28px | 1.2 | 600 | Section headers |
| `--text-4xl` | 36px | 1.15 | 700 | Page H1 |

### Heading mapping

- H1 → `--text-4xl`, weight 700
- H2 → `--text-3xl`, weight 600
- H3 → `--text-xl`, weight 600
- H4 → `--text-lg`, weight 600

---

## Spacing

Base unit: `--space-unit: 4px`

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps, inline |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Default gap |
| `--space-5` | 20px | Card inner spacing |
| `--space-6` | 24px | Card padding, grid gap |
| `--space-8` | 32px | Section inner padding |
| `--space-10` | 40px | Mobile section padding |
| `--space-12` | 48px | — |
| `--space-16` | 64px | Desktop section padding |

---

## Layout Grid

```css
--container-max: 1200px;
--container-padding: 24px;       /* desktop */
--container-padding-mobile: 16px;

--grid-columns: 12;
--grid-gap: 24px;
--grid-gap-mobile: 16px;

--sidebar-width: 320px;
--main-with-sidebar: calc(100% - var(--sidebar-width) - var(--grid-gap));
```

### Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--bp-sm` | 480px | Small mobile |
| `--bp-md` | 768px | Tablet |
| `--bp-lg` | 1024px | Small desktop |
| `--bp-xl` | 1200px | Desktop |
| `--bp-2xl` | 1440px | Large desktop |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals, large cards |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(26,35,50,0.06)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(26,35,50,0.08)` | Cards default |
| `--shadow-lg` | `0 8px 24px rgba(26,35,50,0.12)` | Dropdowns, modals |
| `--shadow-xl` | `0 16px 48px rgba(26,35,50,0.16)` | Overlays |
| `--shadow-focus` | `0 0 0 3px rgba(13,115,119,0.3)` | Focus ring |

---

## Buttons

### Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | `--color-primary` | white | none | Main CTAs |
| Secondary | transparent | `--color-primary` | 1px primary | Secondary actions |
| Ghost | transparent | `--color-primary` | none | Tertiary, nav |
| Danger | `--color-error` | white | none | Destructive |

### Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| sm | 36px | 12px 16px | 14px |
| md | 44px | 12px 24px | 16px |
| lg | 52px | 16px 32px | 18px |

### States
- Hover: darken 8% or `--color-primary-light`
- Active: darken 12%
- Disabled: opacity 0.5, no pointer
- Focus: `--shadow-focus`

### Icon button
- 44×44px, `--radius-md`
- aria-label required

---

## Cards

### Base card
```
background: white
border: 1px solid --color-border-light
border-radius: --radius-lg
padding: --space-6
shadow: --shadow-sm
hover: --shadow-md, translateY(-2px)
transition: 200ms ease
```

### Card variants

| Variant | Description |
|---------|-------------|
| `.card--flat` | No shadow, border only |
| `.card--elevated` | `--shadow-md` default |
| `.card--accent` | Top border 3px primary |
| `.card--interactive` | Full card is link, hover lift |

---

## Forms

### Input
```
height: 44px
padding: 0 16px
border: 1px solid --color-border
border-radius: --radius-md
font-size: --text-base
focus: border-color primary + --shadow-focus
```

### Search input
- Icon left inside input
- Placeholder: «Поиск по сайту…»
- Submit button attached right OR icon button

### Label
- Above input, `--text-sm`, weight 500
- Required indicator: red asterisk

### Validation
- Error: border `--color-error`, message below in `--text-sm`
- Success: border `--color-success`

---

## Badges

| Variant | Background | Text |
|---------|------------|------|
| Default | `--color-bg-muted` | `--color-text-secondary` |
| Primary | `--color-accent-soft` | `--color-primary` |
| Category | `--color-primary` | white |

Size: `--text-xs`, padding 4px 8px, `--radius-sm`

Usage: department type (АОП, ФАП), news date, status

---

## Links

```css
--link-color: var(--color-primary);
--link-hover: var(--color-primary-dark);
--link-decoration: none;
--link-hover-decoration: underline;
```

### Inline link
- Primary color, underline on hover

### Nav link
- `--color-text` default, primary on hover/active
- Active: bottom border 2px primary

### Footer link
- `--color-footer-text`, white on hover

---

## Navigation

### Topbar
- Height 36px, dark bg
- Links: 13px, white, hover underline
- «Ещё» dropdown for overflow links

### Main nav
- Height part of 72px header
- Horizontal on desktop, drawer on mobile
- Dropdown: shadow-lg, 8px radius, min-width 220px
- Active item: primary bottom border

### Mobile menu
- Full-height slide-in from right (320px width)
- Backdrop overlay rgba(26,35,50,0.5)
- Close button top-right (×), 44px target
- Accordion submenus with chevron rotation
- Body scroll lock when open

---

## Section Headers

```
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: --space-8;
}
.section-header__title { /* H2 */ }
.section-header__link { /* «Все новости →» */ }
```

Optional: subtitle below title in `--color-text-secondary`

---

## News Cards

```
Structure:
┌─────────────────────┐
│  [Image 16:9]       │
│  ┌ date badge ──┐   │
├─────────────────────┤
│  Title (2 lines)    │
│  Meta: date · comments │
└─────────────────────┘
```

- Image: aspect-ratio 16/9, object-fit cover, `--radius-lg` top
- Date badge: overlay top-left OR below image
- Title: `--text-lg`, max 2 lines clamp
- Meta: `--text-sm`, `--color-text-secondary`
- Hover: shadow elevation, title color primary

### Carousel variant
- 3 visible desktop, 1 mobile
- Prev/next: 40px circle buttons, shadow-md
- Dot indicators below

---

## Department Cards

```
Structure:
┌─────────────────────┐
│  [Image 16:9]       │
│  ┌ АОП ─ badge ──┐  │
├─────────────────────┤
│  Department Name    │
└─────────────────────┘
```

- Badge: top-right overlay (АОП / ФАП / Отделение)
- Grid: 4/2/1 columns
- Entire card clickable

---

## Sidebar Widgets

### Widget base
```
.widget {
  background: white;
  border: 1px solid --color-border-light;
  border-radius: --radius-lg;
  padding: --space-6;
  margin-bottom: --space-6;
}
.widget__title {
  font-size: --text-lg;
  font-weight: 600;
  margin-bottom: --space-4;
  padding-bottom: --space-3;
  border-bottom: 1px solid --color-border-light;
}
```

### Widget types
1. **Search** — input + button
2. **Working Hours** — icon + label + time list
3. **Quick Links** — bulleted link list with arrow icons
4. **Telegram** — banner image/link
5. **QR Code** — centered image

---

## Quick Action Tiles

```
┌──────────┐
│  [icon]  │
│  Label   │
└──────────┘
```

- Grid: 4×2 desktop, 2×N mobile
- Min height 100px
- Icon 32px, primary color
- Label `--text-sm`, centered
- Hover: bg `--color-accent-soft`, border primary

---

## File structure (planned)

```
src/css/
├── tokens.css          # All CSS variables
├── base.css            # Reset, typography, utilities
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   ├── navigation.css
│   ├── badges.css
│   └── widgets.css
├── layout/
│   ├── grid.css
│   ├── header.css
│   ├── footer.css
│   └── sidebar.css
└── main.css            # Imports all
```

---

## Implementation notes

- Use CSS custom properties exclusively — no hardcoded colors in components
- Mobile-first media queries
- BEM naming: `.block__element--modifier`
- No CSS framework dependency (vanilla CSS)
- Icons: SVG sprite or Lucide/Heroicons subset
- Font: Inter via Google Fonts or self-hosted woff2
