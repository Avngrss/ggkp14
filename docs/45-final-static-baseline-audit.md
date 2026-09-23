# Stage 6H — Final static baseline audit

Date: 2026-09-23

This is the formal Stage 6H record. Detailed matrix and method notes are in `docs/audit/stage-6h/notes.md`. Stage 6H.1 dispositions are in `docs/46-final-pre-commit-review.md`.

## Result

The working tree is one complete Scenario 2 static product.

| Item | Count |
| --- | --- |
| Production HTML pages | 30 |
| Development-only page | `preview.html` |
| Search visual states | 2 states of `search-results.html` |
| Blocker findings | 0 |
| Important findings | 0 |
| Remaining Scenario 2 page or state work | 0 |

No commit or push was performed in Stage 6H.

## What was checked

Every production page at 390×844, 768×1024, and 1440×1000; shared navigation; local links and assets; preview completeness; simulated GitHub Pages artifact.

No page-level horizontal overflow. Approved shell destinations and the six homepage quick actions are local.

## Minor findings after Stage 6H

| Finding | Stage 6H.1 disposition |
| --- | --- |
| Title separator hyphen vs em dash | Accidental metadata drift. Eleven `<title>` values now use `—`. |
| Trailing period on the no-media news `h1` | Source-backed. Preserved. |
| Root `/favicon.ico` 404 | Harmless browser fallback. No ICO added. |
| CRLF in older shared CSS/JS | UTF-8, no defect. Rewrite deferred. |
| Unused space beside 48rem prose | Intentional readable measure. Composition unchanged. |

## Remaining after the static baseline

WordPress work only: department records, extra news, remaining Information/About/Contacts children, live search, pagination, languages, and forms.

Next publication step: an approved commit and a GitHub Pages check.
