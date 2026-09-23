# Remaining static scope and completion plan

Audit date: 2026-09-23. This is a planning record. No production page was created for this document.

“Complete static frontend” means every distinct layout and the public destinations in the approved shell and the homepage quick actions exist as local pages, genuine external resources stay external, and repeated records wait for WordPress. It does not mean a local HTML file for every sitemap URL.

## 1. Current static baseline

Verified from `src/pages/`, `src/pages/preview.html`, `.github/workflows/pages.yml`, and `tools/simulate-pages-dist.py`.

| Count | What it is |
| --- | --- |
| 30 | Production HTML pages, each once |
| 1 | Development-only page: `preview.html` |
| 30 | Production filenames in the Pages rewrite list and in `simulate-pages-dist.py` |
| 30 | Production cards in the preview navigator, plus the dashed preview card |
| 0 | Production pages missing from preview or from the publication list |
| 0 | Distinct page templates still missing |

The 30 production pages:

| File | Role | Source path represented |
| --- | --- | --- |
| `index.html` | Homepage | `/` |
| `content-page.html` | Appointment article | `/zapis-k-vrachu/` |
| `contacts.html` | Contacts landing | `/contacts/` |
| `table-page.html` | Phone-line table | `/o-nas/grafik-pryamyh-telefonnyh-linij/` |
| `search-results.html` | Search with results + empty state | No source page. Static demo states via query parameters |
| `paid-services.html` | Paid-services landing | `/platnye-uslugi-2/` |
| `information.html` | Information landing | `/informaciya/` |
| `about.html` | About landing | `/o-nas/` |
| `applicant-2023.html` | Applicant article | `/abiturient-2023/` |
| `departments-index.html` | Department index | `/o-nas/strukturnye-podrazdeleniya/` |
| `department.html` | Clinic department | `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` |
| `department-aop.html` | Outpatient department | `/o-nas/strukturnye-podrazdeleniya/urickaya-aop/` |
| `news-archive.html` | News archive | `/category/novosti/` |
| `news-single.html` | News with image | Representative post state |
| `news-single-video.html` | News with video | Representative post state |
| `news-single-no-media.html` | News without media | Representative post state |
| `adult-dispensary-examinations.html` | Short article | `/informaciya/poryadok-provedeniya-dispansernyh-osmotrov-vzroslogo-naseleniya/` |
| `working-hours.html` | Schedule groups | `/o-nas/rezhim-raboty/` |
| `hot-line.html` | Three hot lines | `/contacts/goryachaya-liniya/` |
| `administration.html` | Administration contacts | `/o-nas/administraciya/` |
| `vacancies.html` | Current vacancies | `/o-nas/vakansii/` |
| `electronic-appeals.html` | Citizen and legal-entity appeals | `/contacts/elektronnye-obrashheniya/` |
| `email-addresses.html` | Email directory | `/adresa-elektronnoj-pochty/` |
| `territorial-districts.html` | District roster | `/o-nas/territorialnye-uchastki/` |
| `medical-tourism.html` | News-style service article | `/medicinskij-turizm-2/` |
| `five-steps.html` | External-link article | `/sdelai-5-shagov-chtoby-spasti-zhizn/` |
| `medical-extract-order.html` | Extract application fields | `/zakaz-vypiski-iz-medicinskih-dokumentov/` |
| `dispensarization.html` | Dispensarization article | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` |
| `personal-appeals.html` | Personal messages to the administration | `/lichnye-obrashheniya-grazhdan/` |
| `sexological-help.html` | Public notice and helpline numbers | `/seksologicheskaya-pomoshh/` |

`preview.html` is removed by the Pages workflow. The Stage 6E, 6F, and 6G.1 pages are in the working tree and in the mappings. They are not on the last published GitHub Pages deploy.

No page in this list is a half-built shell. Open gaps are destinations those pages still link outward, not unfinished files.

## 2. Source inventory used for the counts

Two inventories, kept separate:

1. Unique `https://ggkp14.by` paths still present in the 30 production pages. Media and PDF paths are not pages. This is the set a current visitor can leave the static site through.
2. WordPress sitemaps fetched as UTF-8 on 2026-09-23: `page-sitemap.xml` (82 URLs), `post-sitemap.xml` (211 URLs), `project-sitemap.xml` (24 URLs), `profile-sitemap.xml` (6 URLs). Feeds, `xmlrpc.php`, and `/gmpg.org` links were ignored.

Playwright cannot open the live site (`ERR_CERT_COMMON_NAME_INVALID`). Sitemap and page-title checks are HTTP fetches, not browser clicks. A compressed fetch on 2026-09-23 followed one redirect from `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` to `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`. The two responses were identical. They are one article, `dispensarization.html`. That article is not `adult-dispensary-examinations.html`.

Of the 82 page-sitemap URLs, the previous 20 local page URLs remain, plus the Stage 6G.1 page URLs now represented by `five-steps.html`, `medical-extract-order.html`, `dispensarization.html`, `personal-appeals.html`, and `sexological-help.html`. `medical-tourism.html` is a news post, not an extra page-sitemap URL. The homepage dispensarization path is the redirect above, not a second sitemap page.

## 3. Classification

Each remaining destination is in one class.

### A. Mandatory shell pages: none remaining

Stage 6F.1 completed administration, vacancies, and electronic appeals. Stage 6F.2 completed the two table pages. No approved shell destination still points at `ggkp14.by`.

| Title from source | Path | Where it appears | File | Pattern | Status |
| --- | --- | --- | --- | --- | --- |
| Администрация | `/o-nas/administraciya/` | Information dropdown, drawer, homepage list | `administration.html` | Content article. Headings, no table | Local (Stage 6F.1) |
| ОБ ОБРАЩЕНИЯХ ГРАЖДАН И ЮРИДИЧЕСКИХ ЛИЦ | `/contacts/elektronnye-obrashheniya/` | Contacts dropdown, drawer, footer, homepage quick action | `electronic-appeals.html` | Content article. Nav label stays «Электронные обращения»; the source h1 is the long title | Local (Stage 6F.1) |
| Вакансии | `/o-nas/vakansii/` | Topbar, drawer, footer, homepage teaser | `vacancies.html` | Content article. Five titles and one phone. No table | Local (Stage 6F.1) |
| Адреса электронной почты | `/adresa-elektronnoj-pochty/` | Contacts dropdown only | `email-addresses.html` | Two-column directory. Source breadcrumb has no Contacts step | Local (Stage 6F.2) |
| Территориальные участки | `/o-nas/territorialnye-uchastki/` | Topbar, homepage list | `territorial-districts.html` | One table with rowspan groups and two headings | Local (Stage 6F.2) |

Breadcrumbs follow the source parent: About for administration, vacancies, and districts; Contacts for appeals and email. Each batch updates the exact links, `preview.html`, `pages.yml`, and `simulate-pages-dist.py` together.

### B. Recommended representative pages: 15

Same approved article or table patterns. They are linked from the homepage quick actions or from a local landing, and they are not repeated department or news records. They are not required to prove a new layout.

Homepage quick actions:

| Title | Path | File | Status |
| --- | --- | --- | --- |
| Медицинский туризм | `/medicinskij-turizm-2/` | `medical-tourism.html` | Local (Stage 6G.1) |
| Сделай 5 шагов, чтобы спасти жизнь | `/sdelai-5-shagov-chtoby-spasti-zhizn/` | `five-steps.html` | Local (Stage 6G.1). The source page is an external link |
| Заказ выписки из медицинских документов | `/zakaz-vypiski-iz-medicinskih-dokumentov/` | `medical-extract-order.html` | Local (Stage 6G.1). No local form |
| Диспансеризация, homepage path | `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | `dispensarization.html` | Local (Stage 6G.1). Redirects to the Information article |
| Личные обращения граждан | `/lichnye-obrashheniya-grazhdan/` | `personal-appeals.html` | Local (Stage 6G.1). Not the electronic-appeals page |
| Сексологическая помощь | `/seksologicheskaya-pomoshh/` | `sexological-help.html` | Local (Stage 6G.1) |

Information landing cards still external:

| Title | Path | Proposed file |
| --- | --- | --- |
| Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` | `preventive-examinations.html` |
| Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` | `incapacity-recognition.html` |
| Диспансеризация FAQ under Information | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Same file as `dispensarization.html`. Not a second page |

About landing cards still external, excluding shell pages that are already local or still listed in §A:

| Title | Path | Proposed file |
| --- | --- | --- |
| График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` | `administration-reception.html` |
| Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` | `anti-corruption.html` |
| Профсоюз | `/o-nas/profsojuz/` | `trade-union.html` |

Contacts landing children still external, excluding appeals and email:

| Title | Path | Proposed file | Pattern |
| --- | --- | --- | --- |
| Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` | `administration-phones.html` | Table |
| Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` | `staff-phones.html` | Table |
| Режим работы и контактные телефоны структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | `department-hours-phones.html` | Table. Not the working-hours page |

### C. Bulk content for WordPress: 16 departments + 25 other pages + 208 posts

Department records with no local file, all using `department.html` or `department-aop.html`. Counted once. The homepage and the department index link the same paths.

1. `/o-nas/strukturnye-podrazdeleniya/hirurgicheskoe-otdelenie/`
2. `/o-nas/strukturnye-podrazdeleniya/ultrazvukovaya-diagnostika/`
3. `/o-nas/strukturnye-podrazdeleniya/funkcionalnaya-diagnostika/`
4. `/o-nas/strukturnye-podrazdeleniya/otdeleniya-obshhej-praktiki/`
5. `/o-nas/strukturnye-podrazdeleniya/otdeleniya-dnevnogo-prebyvaniya/`
6. `/o-nas/strukturnye-podrazdeleniya/otdeleniya-profilaktiki/`
7. `/o-nas/strukturnye-podrazdeleniya/otdeleniya-medicinskoj-reabilitacii/`
8. `/o-nas/strukturnye-podrazdeleniya/kliniko-diagnosticheskaya-laboratoriya/`
9. `/o-nas/strukturnye-podrazdeleniya/rentgenovskoe-otdeleniya/`
10. `/o-nas/strukturnye-podrazdeleniya/terenichskaya-aop/`
11. `/o-nas/strukturnye-podrazdeleniya/rudnya-marimonovskaya-aop/`
12. `/o-nas/strukturnye-podrazdeleniya/teleshovskij-ffp/`
13. `/o-nas/strukturnye-podrazdeleniya/rudnya-telefovskij-fap/`
14. `/o-nas/strukturnye-podrazdeleniya/staro-beleckij-fap/`
15. `/o-nas/strukturnye-podrazdeleniya/zalipskij-fap/`
16. `/o-nas/strukturnye-podrazdeleniya/novo-milchanskij-fap/`

Other page-sitemap URLs that are not local, not in §A, not in §B, and not departments: 25. They are ordinary prose, schedules, numeric slugs, or child pages. Examples: `/administrativnye-procedury/`, `/informaciya/ideologiya/`, `/kiberprestupnost/`, `/nashi-partnery/`, `/palliativnaya-medicinskaya-pomoshhi/`, `/pomoshh-pri-alkogolizme/`, `/protivodejstvie-ekstremizmu/`, `/informaciya/mery-po-realizacii-ukaza-631/`, reception schedules, and numeric slugs such as `/20033-2/`. Building each one does not test a new layout.

Posts: the post sitemap lists 211 URLs. Three local news files represent the image, video, and no-media states. They are not a claim that three specific sitemap posts were copied as archives. 208 post URLs have no local file. The first entries include English theme samples (`/helping-children-deal-with-trauma/`, `/our-definitive-guide-to-cold-and-flu/`, `/7-ways-to-get-more-sleep-naturally/`). The clinic-only portion of the 208 was not separated, so 208 is the count of post URLs without a local page, not a count of clinic news that must be written by hand. The static archive’s first page also links 7 further posts; those 7 are inside the 208, not an extra set.

### D. External destinations

Stay external. Not static pages.

Hosts linked from production HTML, excluding font hosts: `24health.by`, `fpb.1prof.by`, `ggmc.by`, `gomel-region.by`, `gomeluzo.by`, `gsmu.by`, `minzdrav.gov.by`, `pomogut.by`, `pravo.by`, `president.gov.by`, `t.me`, `uommk.by`, `www.tutmed.by`. The source partners menu also names `sansk.by`, which is not in the current static HTML.

Files kept external: the four paid-service PDFs under `/wp-content/uploads/`.

### E. WordPress-only or dynamic

- Live search and the empty-query behavior of WordPress search.
- Archive pagination. The static archive uses `href="#"` for page 2 and page 21.
- BY/EN. The switcher is `href="#"`.
- Online questionnaires `/anketa-onlajn/` and `/zapolnit-anketu-onlajn/`.
- The chief-doctor Yandex form under `/home-store/…`.
- Chat-bot pages `/chat-bot-ggkp-14/` and `/chat-bot-gcgkp/`.
- Theme samples: `/sample-page`, the 6 `/profile/…` demo names, and the 24 `/project/…` URLs (English demo projects plus department slugs repeated under `/project/`).
- Gutenberg, media library, PHP templates, permalinks, and form submission.

That is 1 sample page, 2 questionnaire pages, 1 form embed, 2 chat-bot pages, 6 profiles, and 24 project URLs, plus the dynamic behaviors. These are not added to the static page totals.

### F. Decisions required: 1

1. «Для пациентов» (`/dlya-pacientov/`) is a source top-level item. The approved static header does not list it. The decision is whether the static menu gains that item or the shortened menu stays until WordPress.
2. Resolved in Stage 6G.1. The homepage dispensarization path redirects to the Information article, and both responses were identical. `dispensarization.html` represents that article. `adult-dispensary-examinations.html` remains a different path.

## 4. Count reconciliation

| Total | Included items | Excluded |
| --- | --- | --- |
| 30 current production pages | The file table in §1 | `preview.html` |
| 0 mandatory shell pages still external | §A |  |
| 8 recommended landing cards still external | The Information, About, and Contacts rows in §B that are not the dispensarization article | The six homepage quick actions are local |
| 16 department instances | The numbered list in §C | The 2 department pages already local |
| 25 other prose pages | Page-sitemap remainder after local, §A, §B, departments, and the named §E page URLs | Posts |
| 208 post URLs without a local file | 211 post-sitemap URLs minus the 3 local news state files | Not a clinic-news count |
| 13 external hosts in production HTML | §D | Font hosts; `sansk.by` is source-menu only |
| 6 named dynamic or sample groups | §E | Not static pages |
| 1 decision | §F. The dispensarization alias is resolved |  |
| 0 missing templates | Shell pages match the article or table patterns already shipped |  |
| 0 missing standalone content states | Search results include both states | News pagination waits for WordPress |
| 0 shell paths still on the source site | Approved shell destinations are local | Deep landing links are outside this count |

The source `page-sitemap.xml` is still 82 URLs. Local production files are now 30. The six homepage destinations are local. Eight landing cards in §B remain external. Medical tourism is a news post. The two dispensarization URLs are one article, so they are not two remaining pages.

## 5. Three scenarios

### Scenario 1: Minimum design-complete baseline

Remaining work: an approved commit and a GitHub Pages check. Stage 6H completed the local regression and completion audit. The shell pages and the homepage quick-action pages are local, and `search-results.html` has both states.

This covers every destination in the approved shell, and it does not add a template. The six homepage quick actions are local as of Stage 6G.1. Other landing cards can still leave for the source site.

### Scenario 2: Navigation-complete static site

Remaining work: an approved commit and a GitHub Pages check. Stage 6H completed the local audit.

Header, dropdowns, drawer, topbar, footer, and those homepage actions then resolve locally or to a genuine external site. Information, About, and Contacts cards that are not in the shell can stay on the source site until WordPress. The 16 departments and the post corpus stay on the source site.

### Scenario 3: Near-full static copy

Remaining work: Scenario 2, plus the 8 landing cards still external in §B, the 25 prose pages, and the 16 departments. That is 49 additional HTML files on top of the current 30. The dispensarization alias is resolved.

The 208 post URLs, forms, chat bots, and theme samples still would not be meaningful static copies. The risk is a second copy of the same articles that goes stale as soon as the clinic edits WordPress. This scenario is not the recommended boundary.

## 6. Recommendation

Use Scenario 2 as the static completion boundary.

The approved shell is the navigation on every page, and the homepage quick actions are the other set of links a visitor meets before any landing. Both sets reuse pages that already exist as patterns. Another 16 department files and 208 posts would not teach the team a new layout. WordPress should receive those records once, with the local department and news files as the templates.

Before WordPress, run the baseline checklist in §9. After that, migration covers departments, news, the remaining landing children, forms, languages, search, and pagination.

The baseline is proven when preview and the Pages list stay aligned, `preview.html` is still excluded, and a full local pass shows no new 404, no page-level overflow at 390, 768, and 1440, and no shell link back to `ggkp14.by` except agreed external hosts and files.

## 7. UI and content states

| State | Status |
| --- | --- |
| Search with results | Covered by `search-results.html` |
| Search with no results | Covered on `search-results.html?state=empty&s=...` |
| News pagination | Covered as a non-working control. Behavior waits for WordPress |
| Very long headings and labels | Covered on applicant, department, and the appeals h1. Re-check when districts are built |
| Wide tables | Covered by `table-page.html`. Email and district tables re-check the same wrapper |
| News image, video, no media | Covered by the three news files |
| Broken-image fallback | Not a separate page. Optional check on an existing news file |
| Large document lists | Covered by the four paid-service PDFs |
| Mixed phone and schedule groups | Covered by working hours, the hot line, and administration |
| Form validation | WordPress |
| Optional department blocks | Covered by the two department templates |
| External links | Covered. Policy is in §D |
| Mobile density and keyboard dropdown | Covered in Stages 6D.4, 6E.1, and 6E.2. Repeat after the shell batch |
| Language switcher | WordPress. Stays `href="#"` |

## 8. Defects and technical work

Baseline blockers before the final commit of the static site:

- Working hours, the hot line, administration, vacancies, electronic appeals, the Stage 6F.2 table pages, and Stage 6G work are uncommitted, so GitHub Pages does not serve them yet. That is a release gap, not a defect in the files.

Recommended cleanup, not page work:

- Keep `preview.html` and both publication lists updated in the same batch as any new page.
- Repeat UTF-8 checks on new pages.
- Final static regression after Scenario 2, then one commit and one Pages check when a push is requested.

Optional polish:

- `/favicon.ico` 404 when a browser asks the host root. Pages already link `favicon.svg`.
- The drawer has no «Адреса e-mail» or «Территориальные участки» because the topbar is hidden below 1440px. Documented in `docs/42`. Do not invent a new mobile group without a decision.
- The homepage clinic hot line says «перерыв»; the hot-line page says «обед», matching its source page. Do not silently rewrite the homepage.
- `tools/preview-local.ps1` has an uncommitted UTF-8 BOM so Windows PowerShell 5 can parse the Russian strings.

## 9. Implementation plan

1. Shell articles: `administration.html`, `vacancies.html`, `electronic-appeals.html`. Done in Stage 6F.1.
2. Shell tables: `email-addresses.html`, `territorial-districts.html`. Done in Stage 6F.2.
3. Homepage quick actions: the 6 files in §B. Done in Stage 6G.1.
4. Empty search on `search-results.html`. Done in Stage 6G.2.
5. Static baseline audit against §10. Done in Stage 6H. WordPress preparation starts only after an approved commit and Pages check.

Do not build the 16 departments or the news corpus in these batches.

## 10. Definition of done

Required in the repository before the final static commit:

- The 30 current production pages remain. No extra search file was added.
- Search demonstrates results and no results.
- Every approved shell destination and the six homepage quick actions is local or an agreed external host or file.
- No new template and no new menu-script behavior was required.
- Preview lists each production page once and still marks itself development-only.
- `pages.yml` and `simulate-pages-dist.py` list every production page and still delete `preview.html`.
- Local checks at 390, 768, and 1440 show no page-level horizontal overflow on the new pages.
- New text files are UTF-8 without replacement characters.
- `docs/41`, `docs/42`, and this document agree on the remaining WordPress set.

Required after a future approved push:

- The Pages workflow succeeds.
- All 30 production pages return 200 on GitHub Pages.
- The root homepage links to them under `pages/`.
- `preview.html` returns 404 on GitHub Pages.

Deferred to WordPress:

- The 16 departments, 25 other prose pages, and post corpus.
- Live search, pagination, BY/EN, forms, and the chief-doctor embed.
- The «Для пациентов» menu decision. The dispensarization alias is already resolved.

## 11. Limits

Sitemap coverage is complete for the four sitemap files that exist. It is not a browser crawl, and it does not prove which numeric or sample URLs the clinic still considers public. The 208 post figure includes theme samples. Scenario 2 is sufficient without splitting that figure further.
