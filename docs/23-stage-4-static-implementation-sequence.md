# Stage 4 — Static Implementation Sequence

Recommended order for building internal static templates **after Stage 4 approval**. Nothing in this document is implemented during Stage 4.

**Principles:**

1. Stabilize shared internal-page components first.
2. Implement one static template at a time.
3. Verify each template before starting the next.
4. Do not modify approved homepage unless shared-component fix is explicitly approved.
5. Full static-site regression after all templates.
6. WordPress conversion only after static templates approved.

---

## Stage 5A — Shared internal shell

| Field | Detail |
|-------|--------|
| **Template** | Shared partials only (no new page file) |
| **Source reference** | Any internal page on ggkp14.by |
| **Dependencies** | Approved homepage header/footer (Stage 3I) |
| **Reused components** | topbar, header, sticky, drawer, search, lang switcher, footer, skip link |
| **New components** | `.breadcrumb`, `.page-header`, `.page-main`, `.internal-widgets` (optional compact sidebar) |
| **CSS scope** | New `src/css/internal.css`; extend `layout.css` |
| **JS scope** | None — reuse `main.js`, `menu.js`, `accessibility.js` |
| **Responsive checks** | 1440 / 1280 / 768 / 390 — header full width, breadcrumb wrap |
| **Multilingual checks** | Breadcrumb + H1 wrap with long BY/EN strings |
| **Accessibility checks** | `main id="main"`, one H1 slot, breadcrumb `nav` + `aria-label` |
| **Completion criteria** | Shell HTML snippet documented; renders with homepage assets; no homepage edit unless shared bug |

---

## Stage 5B — `content-page.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5B |
| **Template** | `src/pages/content-page.html` |
| **Source reference** | https://ggkp14.by/zapis-k-vrachu/ |
| **Dependencies** | Stage 5A shell |
| **Reused components** | Shell, `.btn`, prose tokens |
| **New components** | `.page-content`, `.prose` typography block |
| **CSS scope** | `internal.css` |
| **JS scope** | None |
| **Responsive checks** | Long title, prose images, 390 overflow |
| **Multilingual checks** | Sample long H1 in placeholder |
| **Accessibility checks** | Single H1; heading order in sample content |
| **Completion criteria** | Page opens from `src/pages/` with correct relative paths; matches shell; screenshot in `docs/audit/` |

**Variants to verify on same template (content swap only):**

- Download list — `/platnye-uslugi-2/`
- Section hub — `/informaciya/`
- Embed form placeholder — Yandex form page

---

## Stage 5C — `contacts.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5C |
| **Template** | `src/pages/contacts.html` |
| **Source reference** | https://ggkp14.by/contacts/ |
| **Dependencies** | 5A shell |
| **Reused components** | Info card patterns, buttons |
| **New components** | `.contact-block`, `.contact-links` |
| **CSS scope** | `internal.css` |
| **JS scope** | None |
| **Responsive checks** | Phone blocks stack; tap targets |
| **Multilingual checks** | Link labels |
| **Accessibility checks** | `tel:` / `mailto:`; heading structure |
| **Completion criteria** | Hub layout with child page links; screenshot audit |

---

## Stage 5D — `table-page.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5D |
| **Template** | `src/pages/table-page.html` |
| **Source reference** | https://ggkp14.by/o-nas/grafik-pryamyh-telefonnyh-linij/ |
| **Dependencies** | 5A shell |
| **Reused components** | Shell, prose intro |
| **New components** | `.table-responsive`, table styles with `<th scope>` |
| **CSS scope** | `internal.css`, `responsive.css` overflow rules |
| **JS scope** | Optional scroll shadow hint (vanilla, minimal) |
| **Responsive checks** | **Critical** — 390/360 horizontal scroll contained in wrapper |
| **Multilingual checks** | Column header length |
| **Accessibility checks** | Table headers; caption if multi-table page |
| **Completion criteria** | 3-table example from direct lines OR 1 large table from territorial page; mobile screenshot |

---

## Stage 5E — `departments-index.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5E |
| **Template** | `src/pages/departments-index.html` |
| **Source reference** | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/ |
| **Dependencies** | 5A shell; homepage dept card CSS |
| **Reused components** | `.dept-card` from homepage |
| **New components** | None if cards reused |
| **CSS scope** | Reuse `homepage.css` grid + `internal.css` page header |
| **JS scope** | None |
| **Responsive checks** | 4→2→1 grid |
| **Multilingual checks** | Long department names |
| **Accessibility checks** | Link text = department name |
| **Completion criteria** | 18 cards linking to `#` placeholders; desktop + mobile screenshots |

---

## Stage 5F — `department.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5F |
| **Template** | `src/pages/department.html` |
| **Source reference** | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/ |
| **Dependencies** | 5E index (breadcrumb link) |
| **Reused components** | Shell, prose, optional image slot |
| **New components** | `.department-meta` (phone, hours) |
| **CSS scope** | `internal.css` |
| **JS scope** | None |
| **Responsive checks** | Images + text stack |
| **Multilingual checks** | Structure list labels |
| **Accessibility checks** | H1; list markup for structure section |
| **Completion criteria** | Representative department content; breadcrumb chain |

---

## Stage 5G — `news-archive.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5G |
| **Template** | `src/pages/news-archive.html` |
| **Source reference** | https://ggkp14.by/category/novosti/ |
| **Dependencies** | 5A shell |
| **Reused components** | `.news-compact` styling from homepage |
| **New components** | `.news-archive-list`, `.pagination` |
| **CSS scope** | `internal.css` + homepage news CSS |
| **JS scope** | None (static pagination links) |
| **Responsive checks** | List layout mobile |
| **Multilingual checks** | Date format; pagination labels in RU |
| **Accessibility checks** | H1; `<article>` or list semantics |
| **Completion criteria** | ≥5 sample posts + pagination UI (links `#`) |

---

## Stage 5H — `news-single.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5H |
| **Template** | `src/pages/news-single.html` |
| **Source reference** | https://ggkp14.by/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/ |
| **Dependencies** | 5G archive (back link) |
| **Reused components** | Prose, news typography |
| **New components** | `.article-meta`, `.related-posts` (optional), comments placeholder |
| **CSS scope** | `internal.css` |
| **JS scope** | None |
| **Responsive checks** | Inline images |
| **Multilingual checks** | Headline wrap |
| **Accessibility checks** | **H1 for title** (fix source H2 issue); comment form labels if shown |
| **Completion criteria** | Full article sample; related posts block optional |

---

## Stage 5I — `search-results.html`

| Field | Detail |
|-------|--------|
| **Stage** | 5I |
| **Template** | `src/pages/search-results.html` |
| **Source reference** | https://ggkp14.by/?s=диспансerization |
| **Dependencies** | 5A shell; header search from homepage |
| **Reused components** | Search form, result list item |
| **New components** | `.search-results`, empty state |
| **CSS scope** | `internal.css` |
| **JS scope** | None (static demo with sample query) |
| **Responsive checks** | Result list mobile |
| **Multilingual checks** | RU results heading (not English like source) |
| **Accessibility checks** | H1 includes query; result links descriptive |
| **Completion criteria** | Sample results + empty state variant documented |

---

## Stage 5J — Full static regression

| Field | Detail |
|-------|--------|
| **Stage** | 5J |
| **Scope** | All pages: `index.html` + 7 internal templates |
| **Checks** | Cross-links, shared header, no homepage regression, 1440/768/390, lang switcher, a11y baseline |
| **Deliverable** | `docs/24-static-site-regression.md` + audit screenshots |
| **Completion criteria** | Designer/stakeholder sign-off on full static demo |

---

## Stage 6+ — WordPress conversion (out of scope for Stage 4)

Begin only after Stage 5J approval. Map files per `docs/04-wordpress-mapping.md` and `docs/22-stage-4-static-template-classification.md`.

---

## Implementation order diagram

```
5A Shell
 ├─ 5B content-page (+ variants)
 ├─ 5C contacts
 ├─ 5D table-page
 ├─ 5E departments-index → 5F department
 ├─ 5G news-archive → 5H news-single
 └─ 5I search-results
       └─ 5J regression → Stage 6 WP
```

---

## Homepage modification policy

| Allowed during 5A–5I | Not allowed |
|---------------------|-------------|
| Shared CSS token fix if internal pages need same variable | Homepage layout/section changes |
| Bug fix in `main.js` affecting all pages (if broken) | New homepage sections |
| Favicon/assets shared across pages | Removing approved Stage 3I features |

Any homepage change requires explicit approval note in stage doc.
