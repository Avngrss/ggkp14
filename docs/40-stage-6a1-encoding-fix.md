# Stage 6A.1 — Cyrillic Encoding Repair and Layout Revalidation

Дата: 2026-09-21

---

## 1. Objective

Restore readable Russian text on department and news templates after Stage 6A link-fix regression, without redesign, invented copy, or routing changes.

---

## 2. Symptoms (before fix)

On live GitHub Pages (`681e324`) and in git objects for seven templates:

- Department and news pages showed `�` / `` replacement sequences in browser
- Breadcrumbs, `h1`, card titles, footer labels unreadable
- Raw bytes were **not** valid UTF-8 (e.g. CP1251 octets written as if they were Latin-1/UTF-8)

Pages that remained valid UTF-8 in `681e324`: `index.html`, `content-page.html`, `contacts.html`, `table-page.html`, `search-results.html`, `preview.html`.

---

## 3. Layer-by-layer diagnosis

| Layer | Finding |
|-------|---------|
| **Source (`src/pages/*.html`)** | Corruption in seven files at commit `681e324`; working tree restored from `382c3aa` + link mapping |
| **`<meta charset>`** | All production pages declare `<meta charset="UTF-8" />` early in `<head>` (unchanged) |
| **File encoding** | Restored files decode with strict UTF-8; no U+FFFD in source |
| **Local HTTP (`8765`, root `src/`)** | Response bodies match on-disk UTF-8 (verified byte patterns, e.g. `Рубрика` → `d0 a0 d1 83 d0 b1…`) |
| **GitHub Pages workflow** | No encoding step in `.github/workflows/pages.yml`; artifact copies bytes as-is — defect was **source bytes**, not deploy decoding |
| **Preview scripts** | `preview-local.cmd` / `tools/preview-local.ps1` serve `src/` via Python `http.server`; no transcoding |

**Introducing commit:** `681e324` — bulk static link rewrite (`tools/fix-static-links.py`, removed) wrote HTML without preserving UTF-8.

**Authoritative recovery:** `git show 382c3aa:src/pages/<file>` (same Russian copy as pre-link-fix baseline).

---

## 4. Affected files inventory

| File | Recoverable from Git `382c3aa` | Link mapping reapplied |
|------|-------------------------------|-------------------------|
| `departments-index.html` | Yes | Yes |
| `department.html` | Yes | Yes |
| `department-aop.html` | Yes | Yes |
| `news-archive.html` | Yes | Yes |
| `news-single.html` | Yes | Yes |
| `news-single-video.html` | Yes | Yes |
| `news-single-no-media.html` | Yes | Yes |

No content was guessed from memory; text matches `382c3aa` plus the same href/action rules as `681e324`.

---

## 5. Fix applied

1. Added **`tools/apply-static-links-utf8.py`**: read each affected file from `382c3aa`, reapply local `.html` + `data-source-path` mapping, external `https://ggkp14.by` prefix, `action="search-results.html"`, and search `name="s"` attributes; **`write_text(..., encoding="utf-8")`**.
2. Stage 6A **search-input** repair (`` `r`n `` removal) retained on all production pages.

Unchanged by design: layout CSS, section order, templates, JS, Pages workflow routing.

---

## 6. Validation

### 6.1 Source files

- All `src/pages/*.html`: strict UTF-8 decode OK
- Project search: no `�`, no `` `r`n ``, no `????` corruption patterns in `src/pages/`
- Example byte check (`news-archive.html` `h1`): matches `382c3aa` UTF-8 sequence for «Рубрика: Новости»

### 6.2 Local rendering

- Server: `python -m http.server 8765 --directory src`
- Playwright MCP: document titles and headings display correct Cyrillic (e.g. «Новости», «Структурные подразделения»)
- All **12** production URLs under `/pages/` return UTF-8 bodies without `681e324` mojibake byte pattern

### 6.3 Simulated GitHub Pages artifact

- `python tools/simulate-pages-dist.py` (mirrors workflow copy + index rewrite)
- `dist/pages/news-archive.html` strict UTF-8 with correct Cyrillic bytes
- Temporary `dist/` removed after check (not committed)

### 6.4 Responsive layout (spot check after text restore)

| Viewport | Page | Result |
|----------|------|--------|
| 390×844 | `departments-index.html` | Cyrillic card labels readable; no new overflow vs Stage 6A baseline (screenshot) |
| 1440×1000 | `news-archive.html` | Archive header and cards readable; layout unchanged (screenshot) |

Full 72-viewport matrix from Stage 6A not re-run; markup structure and class names unchanged except restored text nodes and link attributes.

### 6.5 Regression

- Shell, navigation, breadcrumbs, search forms, and footer labels on restored pages match UTF-8 sources
- Pages not in the seven-file set: verified still UTF-8; only search-input attribute fixes from 6A

---

## 7. Screenshots

`docs/audit/stage-6a1/`

- `departments-index-390.png`
- `news-archive-1440.png`

---

## 8. Deployment note

Until a commit containing this fix is pushed to `master`, **live** GitHub Pages continues to serve corrupted bytes from `681e324` for the seven templates. Push restored `src/pages/*.html` to refresh production.

---

## 9. Result

**Encoding repair complete** in working tree; layout spot-checks pass. Ready for commit/deploy as Stage 6A.1 checkpoint.
