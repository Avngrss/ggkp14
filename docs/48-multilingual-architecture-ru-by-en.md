# Stage 7B — RU, BY, and EN multilingual architecture

Date: 2026-09-24

This document specifies how the future GGKP14 WordPress site will serve Russian, Belarusian, and English. It is a design record only. No WordPress install, plugin, PHP, translation, or static-file change is made here.

It extends `docs/47-wordpress-theme-architecture-and-template-mapping.md`. Where this document decides a language behavior, it fills the Stage 7A handoff. It does not replace the theme template set, Department model, or Gutenberg boundaries.

**How to read a label**

- **Confirmed requirement:** already true in the approved baseline or required by this stage’s objective.
- **Recommended decision:** the architecture choice this document proposes. It needs explicit approval before implementation.
- **Open decision:** still unresolved. Implementation of that slice waits.

**Terms**

- **Interface string:** a label the theme prints, such as “Search”, “Menu”, or “Page not found”.
- **Editorial content:** Pages, Posts, Departments, and settings that editors write.
- **Translation group:** three linked records that are the same public object in RU, BY, and EN.
- **Text domain:** the name WordPress uses to load the theme’s interface translations. Proposed name: `ggkp14`.
- **Active language:** the language of the page the visitor is reading.

Evidence: every production page uses `<html lang="ru">`. The topbar and the mobile drawer each contain `.lang-switcher` with RU (`hreflang="ru"`, `aria-current="true"`, `href="#"`), BY (`hreflang="be"`, `lang="be"`, `href="#"`), and EN (`hreflang="en"`, `lang="en"`, `href="#"`). Visible text is the abbreviation only. `docs/42` and `docs/47` record BY/EN as placeholders. Source paths and the static baseline are Russian. `src/js/accessibility.js` hard-codes «Версия для слабовидящих». `src/js/main.js` still contains a Russian search alert that Stage 7A removes.

---

## 1. Language and content model

WordPress can translate **interface strings** with translation functions and a text domain. It does not, by itself, give editors a complete RU / BY / EN workflow for Pages, Posts, Departments, menus, and search. Those are different jobs.

| Model | Fit for GGKP14 | Trade-off |
| --- | --- | --- |
| One record per language, linked in a group | Pages, Posts, the Department custom post type, categories, Gutenberg, and SEO each stay normal WordPress objects | Needs a multilingual layer to store the links. More rows in the database |
| Several languages inside one record | Fewer rows | Breaks the normal editor, revisions, and “one URL per document” from Stage 7A |
| Separate WordPress installs | Strong isolation | Three menus, three media libraries, and three deploys for one clinic |
| Multisite (one network, one site per language) | Separate sites | Heavier hosting and a harder shared-phone model than this clinic needs |

**Recommended decision:** one WordPress record per language, linked into one translation group.

That matches Stage 7A: Pages, Posts, and Departments are already separate records. Gutenberg stays the body editor. A missing Belarusian Department does not delete the Russian one. Editors can publish Russian first and leave BY or EN as a draft. The multilingual product that stores the links is **not** chosen in this stage.

Confirmed requirement: do not treat theme-interface translation and editorial translation as the same task.

---

## 2. Default language

**Confirmed requirement:** Russian is the source and default public language. The static site, the live source paths, and the current switcher all use Russian.

| Topic | Decision |
| --- | --- |
| Default frontend language | Russian |
| Default content-creation language | Russian |
| Admin language | Russian for clinic editors. A translator may use another admin language later. The public language does not follow the admin language |
| URL with no language prefix | Russian, if the recommended URL model is approved |
| Legacy source URLs such as `/contacts/` | They stay Russian. They are not guessed into Belarusian or English |
| Unprefixed Russian | Recommended. See §3 |

---

## 3. URL architecture

Do not publish `.html`, `/pages/`, or `/ggkp14/` paths.

### Comparison

| Model | Shape | Migration from current Russian URLs | Clarity | Cost |
| --- | --- | --- | --- | --- |
| A | `/` , `/by/` , `/en/` | Russian paths stay valid. Best match to `docs/47` permalinks and `data-source-path` | BY and EN are explicit. Russian is the unmarked default | Caches and `hreflang` must treat “no prefix” as Russian |
| B | `/ru/` , `/by/` , `/en/` | Every current Russian URL needs a redirect | All three languages look the same | Extra redirects and a longer public path for the language people already use |
| C | Separate domains or subdomains | New hosts, certificates, and cookies | Clear to people | Extra hosting. Out of proportion for three languages of one clinic |

**Recommended decision, requiring approval:** Model A. Russian has no prefix. Belarusian uses `/by/`. English uses `/en/`.

Model B is the fallback if a later SEO review rejects an unprefixed default. Model C is not recommended.

Language codes in the path are `by` and `en`. The visible switcher abbreviation stays **BY**, matching the approved static control. The Belarusian HTML language tag stays `be` (the existing `hreflang="be"`). Do not show a flag.

### Examples

These slugs illustrate structure. They are not approved translations of every page.

| Object | Russian | Belarusian | English |
| --- | --- | --- | --- |
| Homepage | `/` | `/by/` | `/en/` |
| Contacts Page | `/contacts/` | `/by/kantakty/` | `/en/contacts/` |
| Department archive | `/o-nas/strukturnye-podrazdeleniya/` | `/by/pra-nas/strukturnyya-padrazdzyalenni/` | `/en/about/departments/` |
| One Department | `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` | `/by/pra-nas/strukturnyya-padrazdzyalenni/zhanochaya-kansultatsyya/` | `/en/about/departments/womens-consultation/` |
| News archive | `/category/novosti/` | `/by/category/naviny/` | `/en/category/news/` |
| One news Post | `/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/` | `/by/{belarusian-slug}/` | `/en/{english-slug}/` |
| Search | `/?s=запись` | `/by/?s=запіс` | `/en/?s=appointment` |
| 404 | `/` path that does not exist, Russian chrome | `/by/` unknown path, Belarusian chrome | `/en/` unknown path, English chrome |

Search stays on the language home with `?s=`. It is not a translated slug.

Known Russian aliases from Stage 7A still apply inside Russian only. Example: the dispensarization homepage path redirects to the canonical Information article, then that Russian article is the source for BY and EN translations.

---

## 4. Translated slugs and relationships

**Recommended decision:** translated slugs for Pages, Posts, Departments, and categories. Shared slugs are not required.

| Kind | Slug rule |
| --- | --- |
| Russian Pages, Posts, Departments | Keep the published source slug |
| Belarusian and English | Editors may use a translated slug. English slugs should be Latin. Belarusian may be Cyrillic or a Latin transliteration; pick one style during the first BY fixtures and keep it |
| Archive bases (`category`, department base) | Translated with the language prefix |
| Search | `?s=` only |
| System paths (`wp-admin`, media files) | Not translated |

If two records in the same language want the same slug, WordPress must keep them unique inside that language. Changing a public slug creates a redirect from the old URL to the new one in that language only. The translation group stays linked by ID, not by the slug text.

A translation group has up to one RU, one BY, and one EN record.

| State | Behavior |
| --- | --- |
| Draft or scheduled translation | Not public. The switcher treats it as missing |
| Private | Not public |
| Removed translation | The other languages remain. Their switcher no longer offers the removed language as a link |
| Duplicate from Russian | Structure may be copied. Status stays draft until a person publishes it |
| Parent and child | A translated child points at the translated parent when that parent exists |

---

## 5. Missing translations

**Recommended decision:** keep the visitor on the current page. Show BY or EN as visible but disabled when that translation does not exist. The control is not a link. An accessible name states that the translation is not available yet.

Do not send the visitor to the homepage. Do not pretend the translation exists. Do not swap in the Russian page without saying so.

Exception: a person or crawler opens a `/by/` or `/en/` URL that has no record. Show a not-available page in that language’s chrome. Offer an explicit link to the Russian version of **the same object** when the Russian record exists. If there is no Russian record either, use the normal 404.

This applies to Pages, Departments, Posts, archives, and search. Search does not change language by borrowing results from another language.

---

## 6. Language switcher

**Confirmed requirement:** the switcher already lives in the desktop topbar and in the mobile drawer. Both must stay.

**Recommended decision:**

| Topic | Behavior |
| --- | --- |
| Visible label | RU, BY, EN, as on the static site |
| Accessible name | Full name plus state: Russian — Русский, Belarusian — Беларуская, English — English. The abbreviation is not the only name |
| Current language | `aria-current="true"` and `.is-active`. Not color alone |
| Keyboard | Real links or disabled controls in tab order. Focus uses the existing focus ring |
| Available translation | Link to the same object in that language |
| Missing translation | Disabled control. No `href="#"` |
| Homepage, Page, Department, Post, archive | Equivalent object |
| Search | Same `s` value on the other language’s search URL only if that language is being searched on purpose. Switching language from a result list opens the translated search URL with the same query text, then that language’s own results. It does not jump to the homepage |
| 404 | Other languages point at their own 404 explanation or home only as a labeled recovery link, not as a fake translation of the missing URL |
| External sites | The switcher does not rewrite tutmed, обращения.бел, or partner hosts |
| Persistence | The URL is the source of truth. A saved preference may be considered only after a privacy review. It must not override an explicit URL |

Do not use flags as the only indicator. Do not machine-translate the page when a language is chosen.

---

## 7. Theme internationalization

**Confirmed requirement:** from the first PHP and JavaScript in the theme, every theme-owned interface string is translation-ready. Do not hard-code Russian in future PHP or JavaScript.

| Mechanism | Use |
| --- | --- |
| Text domain `ggkp14` | Theme metadata and all theme strings |
| `esc_html__()`, `esc_attr__()`, `esc_html_e()` | Visible or attribute text |
| `_n()` | Plurals such as result counts |
| `_x()` | Short words that need context, such as “Home” in a breadcrumb |
| `wp_set_script_translations()` | Drawer, search, and low-vision script strings |

Cover search messages, pagination, breadcrumb chrome (“Home”), 404, skip link, menu button, table scroll hint, empty states, and editor labels for Department fields.

Leave editorial content, menu item titles, and clinic settings untranslated by gettext. Those are records. Plugin strings belong to that plugin. External systems keep their own language.

The current Russian strings in `accessibility.js` and the search alert in `main.js` are baseline evidence. The alert is removed by Stage 7A. The low-vision label becomes a theme string.

---

## 8. Content models and shared fields

Editors translate records. The homepage skeleton in `front-page.php` stays one layout. It is not rebuilt three times.

### Homepage

| Section | Language behavior |
| --- | --- |
| Hero title and text | Translated |
| Hero photo | Shared image if it has no text; language-specific if text is in the picture |
| Hero pattern | Theme asset, language-neutral |
| Appointment and quick actions | Links to the active language’s Pages. Labels come from that language’s menu or settings |
| Hot line and hours | Shared phone digits and shared time values. Labels and weekday words are translated |
| Contacts and information cards | Translated labels, shared numbers |
| Departments | Query the active language only |
| Latest news | Query the active language only. A language with no Posts hides the section |
| Official resources | Shared logos when the mark has no sentence. The link URL may differ by language when the partner site has one. Otherwise one URL is shared |
| Footer | Menus and sentences for the active language. Phone and email digits shared |

### Pages

Ordinary Pages, including short ones such as the five-steps article, are one record per language. Gutenberg blocks are translated by editing the translation, not by a second template. Parent and child stay in the same language: a Belarusian child uses the Belarusian parent when it exists. Breadcrumbs must not mix Russian and Belarusian titles in one trail.

### Departments

Stage 7A’s custom post type stays. Eighteen Russian records can exist before any translation.

| Value | Class |
| --- | --- |
| Phone digits, email, map coordinates, `menu_order`, internal ID | Shared technical value |
| Kind badge (AOP, FAP) | Shared code, translated visible label |
| Department name, summary, address wording, hours labels, service text, staff role labels, Gutenberg body, alt text, SEO title | Translated independently |
| Featured photo of a building or room with no words | Shared image, translated alt text |
| Card order | Shared `menu_order` unless a language needs a different public order later |

The archive lists only Departments published in the active language. A missing translation does not show the Russian card inside `/by/` or `/en/`.

### News and categories

Not every Post must exist in all three languages. Russian news can be published alone. The archive and its pagination show the active language only. Dates stay the publication date of that record. The category Новости has a linked term per language (`novosti`, and later BY and EN slugs). Do not add extra taxonomies for language.

### Tables

| Table | Behavior |
| --- | --- |
| Direct-phone schedule, email directory, territorial districts | One structured source for IDs, phone digits, and emails. Headers, names, roles, streets, and captions are translated per language. The theme renders each language’s table. Do not keep one Russian HTML table for all languages |
| Simple Gutenberg tables | Translated inside the translated Page |
| Row order and rowspan groups | Shared structure. Editors do not rebuild merged cells per language |

Territorial names are not machine-translated without a human check.

### Global clinic data

| Value | Class |
| --- | --- |
| Legal clinic name | Translated display name. One official Russian name remains the source |
| Street address | Translated wording. Do not treat the whole address as language-neutral |
| Registry phone, hot-line digits, email | Shared value, translated label |
| Weekday hours | Shared times, translated weekday and “closed” labels |
| Telegram URL | Shared, unless a language-specific channel appears later |
| Official resource logos | Shared image when wordless; separate asset when the logo contains a sentence |
| Footer copyright sentence | Translated |
| Booking URL (tutmed) | External, language-neutral until that system offers a language URL |
| обращения.бел | External. Instructions around it are translated |

---

## 9. Search, navigation, and breadcrumbs

**Recommended decision:** search returns the active language only. No Russian fallback in the BY or EN result list.

The form posts to the current language home with `name="s"`. Result titles and excerpts come from that language’s records. Pages, Posts, and Departments in that language are included. Attachments and external PDFs are not search hits unless a later decision says so. Pagination stays on the same language. No AJAX, autocomplete, or client index.

**Menus:** one menu per location per language (topbar, primary, mobile, footer, footer patients, quick actions). Editors translate labels and point items at that language’s records. Desktop and mobile stay the approved Stage 7A split: email and districts are not added to the drawer just because another language exists. Equal item counts are reviewed. Equal string length is not required.

**Breadcrumbs:** translated titles, translated parents, and the active-language archive label. If a translated parent is missing, stop at the nearest translated ancestor and do not insert a Russian title into a Belarusian trail. Home is a theme string, not a hard-coded Russian word.

---

## 10. Media, documents, and SEO

| Asset | Class |
| --- | --- |
| Administration portraits | Shared photo, translated alt text. Empty alt stays empty when the name is the heading |
| Department and news photos without words | Shared file, translated alt |
| Hero and promo placeholders | Theme fallback, not content |
| Dispensarization posters (`decree-2025.png`, `groups.png`) | Separate asset per language. Russian text inside the image is not fixed by alt text |
| Medical-tourism photograph | Shared if it has no text |
| Paid-service PDFs | External or Media Library. If only the Russian file exists, the link stays available and the visible label says the file is in Russian. Do not hide the price list |
| Other documents | Same rule: shared file when the file is language-neutral; separate file when the words are in the file |

**SEO requirements, no plugin chosen yet:**

- `<html lang>` is `ru`, `be`, or `en` for the active language
- One canonical URL per record
- `hreflang` for `ru`, `be`, and `en` only when that translation is public
- `x-default` points at the Russian URL
- Translated title and description per record
- Language-specific sitemap entries or annotated URLs
- Missing translations are omitted from `hreflang`, not pointed at Russian
- A 404 stays in the language of the prefix the visitor used

Core can set `lang` and titles. The theme can print `hreflang` if the multilingual layer exposes the group. A later SEO plugin may own sitemaps only if it does not fight this model.

---

## 11. Accessibility and text expansion

| Requirement | Rule |
| --- | --- |
| Page language | `lang` on `<html>` matches the active language |
| Language switcher | Full names in the accessible name. Abbreviations remain visible |
| Current language | `aria-current` and text, not color alone |
| Missing language | Disabled control with an accessible unavailable state |
| Keyboard | Tab reaches the switcher in the topbar and in the drawer. Focus ring stays visible |
| In-content language | A Belarusian or English phrase inside a Russian page gets its own `lang` when the editor marks it |
| Forms and errors | Theme strings follow the active language |
| Alt text | Translated with the record. Untranslated alt is not copied silently into another language as if it were done |
| Tables and pagination | Captions and labels follow the active language |

Text-expansion risk, without redesign:

| Component | Risk |
| --- | --- |
| RU/BY/EN switcher | Low. Abbreviations stay short |
| Topbar | Medium. Needs a stress test with longer BY and EN link labels |
| Primary nav and dropdowns | Medium. Flexible width. No fixed label width |
| Drawer | Low to medium. Labels wrap |
| Buttons and quick actions | Medium. Long EN labels must wrap inside the tile |
| Cards, headings, breadcrumbs | Medium. Allow wrap. No one-line truncation that hides the meaning |
| Tables | Medium. Existing scroll wrapper stays |
| Info-line labels | Medium. The static pattern already wraps |
| Footer | Low to medium |

Do not invent final BY or EN menu labels in this stage. Later tests must use deliberately long strings.

---

## 12. Editor workflow

1. Create and publish the Russian record.
2. Create linked BY and EN records from it.
3. Copy the block structure into the draft. Do not publish that copy as a finished translation.
4. Replace text, alt text, and language-specific images.
5. A reviewer checks meaning, phones, and names.
6. Publish the translation. Only then does the switcher link to it.
7. When Russian changes, mark the other languages outdated. Do not overwrite a published translation automatically.
8. Preview each language on its own URL.
9. Removing one language leaves the others in place.

Machine assistance, if ever allowed, is a draft aid. A person must review it before publication. Do not send appeals, medical text, personal data, unpublished drafts, or form entries to an external translation service without a later privacy decision. Public clinic pages are not the same as submitted visitor data.

---

## 13. Roles and permissions

Conceptual only. Do not build roles in this stage.

| Role | May |
| --- | --- |
| Administrator | Languages, shared settings, menus, all records |
| Editor | Create and publish content in the languages they are granted |
| Translator | Edit assigned languages. Not shared phone digits or global settings unless also an editor |
| Reviewer | Approve publication. May be the same person as the editor at the start |

The exact capabilities depend on the multilingual product chosen later. Do not assume every editor may change every language.

---

## 14. Plugin evaluation criteria

Do not select a product in this stage.

A later comparison must score candidates on:

- one record per language and translation groups
- Pages, Posts, the Department post type, and categories
- Gutenberg and `theme.json`
- translated slugs and redirects
- menus per language
- active-language search
- structured shared fields versus translated fields
- media and documents
- `hreflang` and SEO coexistence
- roles
- import and unlink tools
- editor screens a clinic editor can understand
- query cost
- uninstall without losing the Russian records
- support, license, cost, and lock-in
- room for later forms and caching

No ranking is made here.

---

## 15. Edge cases

| Situation | Expected result |
| --- | --- |
| Missing or unpublished translation | Switcher shows that language disabled. Current page stays |
| Deleted translation | Other languages remain linked to each other |
| Translated child without translated parent | Do not publish the child until the parent exists, or show it only with a shortened breadcrumb that stays in one language |
| Archive with no items in that language | Empty archive message in that language. Not the other language’s posts |
| Language switch from search | Same query string on the other language’s search URL, results of that language only |
| Language switch from 404 | Labeled recovery. Not a fake translation |
| External link with one language | Keep the link. Translate the instruction around it |
| Russian-only PDF | Show it with a visible “Russian file” label |
| Shared image, alt not translated | Do not publish the translation as complete |
| Department missing translated hours label | Show the shared times only with a translated label, or hide the row if the label is empty |
| Russian page updated | BY and EN marked outdated. Public text unchanged until edited |
| Slug renamed | Redirect inside that language |
| Broken group link | Treat as missing. Do not guess by slug |

---

## 16. Testing handoff

Do not write tests in this stage. The first multilingual QA pass uses a small fixture: homepage, Contacts, one Department, one news Post, one table Page, search with hits, search with no hits, and a 404. Each fixture has RU published, BY published, and EN either published or deliberately missing.

Check URLs, group links, switcher, menus, breadcrumbs, active-language search, archives, pagination, `hreflang`, `lang`, keyboard focus, long BY and EN labels at 390, 768, and 1440, Gutenberg tables, Russian-only PDFs, posters, and the draft-not-published rule.

---

## 17. Open decisions

| Decision | Why it is open | Blocks the theme skeleton? |
| --- | --- | --- |
| Approve Model A versus Model B | Migration convenience versus a prefixed `/ru/` | Blocks language configuration, not a text-domain skeleton |
| Belarusian slug style: Cyrillic or Latin | Both are readable; one style should be consistent | No |
| Saved language preference | Privacy review | No. URL is enough at first |
| SEO plugin versus theme-printed `hreflang` | Depends on the multilingual product | No |
| Who may edit shared phone fields | Depends on roles in the chosen product | No |

---

## 18. Recommended decisions

| Topic | Status | Recommendation |
| --- | --- | --- |
| Storage | Recommended | One record per language, one translation group |
| Default language | Confirmed | Russian |
| URLs | Recommended, needs approval | Unprefixed Russian, `/by/`, `/en/` |
| Slugs | Recommended | Translated per language. Russian keeps source slugs |
| Missing translation | Recommended | Disabled switcher control. No silent homepage redirect |
| Switcher | Recommended | Topbar and drawer. Full accessible names. Equivalent URL when it exists |
| Search | Recommended | Active language only |
| Menus | Recommended | One menu set per language |
| Shared values | Recommended | Digits, email, order, and map coordinates shared. Labels, addresses, and body text translated |
| Media | Recommended | Wordless photos shared. Posters with Russian words are separate files |
| Documents | Recommended | Russian-only files stay available with a language label |
| Editor flow | Recommended | Duplicate structure into a draft. Human publish. Outdated flag after Russian edits |
| Plugin timing | Recommended | Choose only in a later comparison, after this document is approved |

---

## 19. Implementation sequence

Start only after this architecture is approved. Aligns with Stage 7A: internationalize strings during the theme skeleton; turn on public languages after the Russian templates exist; translate the corpus after Russian migration.

| Step | Depends on | Result | Do not | Done when |
| --- | --- | --- | --- | --- |
| 1. Approve this document | Stage 7A | URL model and missing-translation rule accepted | Installing WordPress | Approval recorded |
| 2. Compare multilingual products | Step 1 | One product chosen in a separate stage | Building the theme around a guess | Written comparison |
| 3. Create the WordPress environment | Approval | Local WP | Content import | Site runs |
| 4. Internationalize the theme from the first PHP and JS | Step 3 | Text domain, no hard-coded Russian chrome | Translating Pages | Strings use translation functions |
| 5. Configure languages and URLs | Steps 2 and 4 | RU default, `/by/`, `/en/` if approved | Full content | Three homepages resolve |
| 6. Relationships and switcher | Step 5 | Groups and disabled missing languages | Machine translation | Switcher matches §6 |
| 7. Language-aware menus, crumbs, Departments, Posts, search | Step 6 | Active-language queries | AJAX search | Fixture pages pass |
| 8. Migrate Russian content | Stage 7A content models | Russian records | BY/EN corpus | Russian URLs match the source map |
| 9. Representative BY and EN fixtures | Step 8 | Small translated set, including one missing language | Translating all news | QA fixture exists |
| 10. Gutenberg, responsive, a11y, SEO tests | Step 9 | Test record | Redesign | §16 checks pass |
| 11. Remaining translations | Step 10 | Public BY/EN as capacity allows | Auto-publishing drafts | Each item reviewed |
| 12. Editor documentation | Step 11 | Short guide | New features | A non-developer can follow §12 |

---

## 20. Definition of done

Stage 7B is complete when this document defines the language model, default language, URL recommendation, slugs, groups, missing translations, switcher, theme i18n, Pages, homepage, Posts, Departments, categories, menus, search, tables, global data, media, documents, SEO, editor workflow, roles, plugin criteria, edge cases, tests, and sequence. No plugin is selected or installed. No translation and no WordPress code is created.
