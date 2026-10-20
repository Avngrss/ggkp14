# Stage 7C — Multilingual solution comparison

Research date: 24 September 2026.

This is a research record. Nothing was installed. The requirements come from `docs/47-wordpress-theme-architecture-and-template-mapping.md` and `docs/48-multilingual-architecture-ru-by-en.md`.

Labels used below:

- **Verified:** stated in a current official document.
- **Paid:** documented, but only on a paid plan or add-on.
- **Configurable:** documented, and the safe GGKP14 behavior depends on a setting.
- **Theme-controlled:** the product exposes data; the theme must render the approved behavior.
- **Unverified:** not stated in the sources read for this stage. It is not treated as a capability.

## 1. Decision context

Stage 7B requires one WordPress record per language, linked Russian, Belarusian, and English records, Russian at `/`, Belarusian at `/by/`, English at `/en/`, translated slugs, and no silent redirect to an unrelated homepage when a translation is missing. WordPress core does not provide that content workflow. Official handbook, last updated 7 July 2025: [Multilingual WordPress](https://developer.wordpress.org/advanced-administration/wordpress/multilingual/).

## 2. Project requirements

The comparison uses the Stage 7A and 7B rules already written: Pages, Posts, a Department custom post type, categories, language-specific menus, active-language search, Gutenberg, shared technical values with translated labels, language-specific images when the picture contains text, an accessible switcher in the topbar and the drawer, and `hreflang`. A custom-fields product, an SEO plugin, and a cache plugin are not chosen here.

## 3. Candidates considered

| Candidate | Why it is in the comparison | Model |
| --- | --- | --- |
| Polylang 3.8.9, with Polylang Pro as its paid tier | Maintained one-record plugin. Free plugin updated 8 September 2026. Requires WordPress 6.5 and PHP 7.4. Tested up to WordPress 7.1.2. | Separate linked records. Stores language with WordPress taxonomies. |
| WPML, Multilingual CMS plan | Maintained one-record plugin with documented per-field copy and translate behavior. | Separate linked records in one database. |
| WordPress Multisite | The handbook’s “one site per language” architecture. | Separate sites, not one site with linked records. |

Sources: [Polylang on WordPress.org](https://wordpress.org/plugins/polylang/), [Polylang URL modifications](https://polylang.pro/documentation/support/guides/url-modifications/), [WPML language URL options](https://wpml.org/documentation/getting-started-guide/language-setup/language-url-options/) (updated 18 October 2024), [WPML pricing](https://wpml.org/purchase/), [WordPress multilingual handbook](https://developer.wordpress.org/advanced-administration/wordpress/multilingual/).

## 4. Candidates excluded

| Excluded | Reason |
| --- | --- |
| WPML Multilingual Blog (€39) | The current pricing table does not include menu translation, string translation, or full-site editing. GGKP14 needs language-specific menus and translated slugs. Slug translation is documented as a CMS or Agency feature. |
| Page-overlay and machine-translation products | The handbook treats “translate the generated page” and “send the visitor to an external translator” as different models. Stage 7B rejects automatic translation as the architecture. They were not scored. |
| Several languages inside one record | Rejected in Stage 7B. |
| A Multisite add-on as a fourth scored product | Core Multisite is the architectural alternative. A linking plugin would be a new product choice and was not required to judge the architecture. |

## 5. Source and research method

Pages were read from polylang.pro documentation, the WordPress.org Polylang listing, wpml.org documentation and pricing, and developer.wordpress.org. A WPML support thread was used only for search behavior, and it is marked as a forum statement rather than a guide. No affiliate comparison was used as evidence. Prices below are the figures published on 24 September 2026.

## 6. Capability matrix

| Requirement | Polylang free | Polylang Pro | WPML Multilingual CMS | Multisite core |
| --- | --- | --- | --- | --- |
| One record per language | Verified. Posts, pages, media, categories, and public custom post types. | Same core. | Verified. Posts, pages, and custom post types can be set translatable. | One record per site, not one linked group inside a site. |
| Russian, Belarusian, English | Verified: no fixed language limit. WordPress language packs are downloaded. The plugin’s own admin is translated into Belarusian. The public URL code is chosen per language. | Same. | Verified: preconfigured languages plus custom languages. | Verified: each site has its own site language. |
| Russian without a prefix | Verified. “Hide URL language information for default language.” | Same. | Verified. Directory examples are `example.com` and `example.com/es/`. Putting the default language in its own directory is optional and must stay off. | Possible only by making the main site Russian and other sites children. Server setup is required. Unverified as a supported language feature. |
| `/by/` and `/en/` | Verified directory mode. The directory is the language code. Using `by` while the HTML language is `be` must be checked in the trial. | Same. | Verified directory mode. The code is the language code configured in WPML. | Unverified without a custom site path and a linking plugin. |
| Translated record slugs | Verified by the separate-record model: each translation has its own WordPress slug. | Can also share one slug, or translate archive bases. | Paid. Page, post, custom post type, and taxonomy slugs. CMS or Agency only. | Each site has its own slugs. No shared group. |
| Translated Department archive base | Not in the free list. | Paid. “Translate URL slugs for categories, author bases, custom post types and more.” | Paid, with slug translation enabled. | Separate sites can use different bases. Not one archive. |
| Pages and hierarchy | Pages are translatable. Automatic parent synchronization was not verified. | Duplicate and synchronize content is paid. Parent behavior still unverified. | Verified. Page parent can synchronize from the source. Configurable. | Separate pages per site. |
| Posts and archives | Verified, including language directories on archives. | Same. | Verified. “Only show translated items” avoids showing Russian posts in another language. | Each site has its own posts. |
| Department custom post type | Verified for public custom post types, enabled in settings. | Same, plus base-slug translation. | Verified, but custom types default to not translatable until enabled. | The theme must register the type on every site. |
| Categories | Verified. | Archive-base translation is paid. | Verified. Default is “only show translated items.” | Separate terms per site. |
| Gutenberg | Translations are normal records, so the block editor can edit them. “Better integration” is paid. | Paid: block-editor sidebar, duplication, site-editor template parts. | Paid plan includes full-site editing support. Block editor copy flow is documented. | Normal editor on each site. |
| `theme.json` | Unverified. Nothing read says it replaces theme styles. | Unverified. | Unverified. | Native. |
| Menus | Verified for classic menus. | Same, plus site-editor language options. | Paid. Menu translation is not in the Blog plan. | One menu set per site. |
| Breadcrumbs | No breadcrumb system in the sources. The theme still builds crumbs from translated parents. | Same. | Parent synchronization helps. No GGKP14 breadcrumb API was verified. | Theme must query another site. Unverified. |
| Active-language search | Unverified in a Polylang search guide. The handbook says this plugin class filters queries by language. | Same gap. | Forum statement by WPML: search should not show other languages. Not a product guide. | Natural, because each site is separate. |
| Pagination | Language stays in the archive URL. Verified by the URL guide. | Same. | Directory mode keeps the language in the path. | Per site. |
| Shared versus translated fields | Free copies categories, tags, and other meta when a translation is created. Ongoing per-field sync is not documented. | Paid duplicate and synchronize. Per-field Copy versus Translate, without a fields plugin, was not verified. | Verified per field: Don’t translate, Copy, Copy once, Translate. | No shared field across sites. |
| Media and alt text | Verified: media is translatable. A separate attachment can hold another file and its own alt text. | Same. | Verified settings for alt, caption, and title, including a different file per language in the linked media guide. | Separate libraries unless files are duplicated. |
| Language-specific documents | Same mechanism as media. A “Russian file” label is theme text. | Same. | Same. | Manual. |
| Switcher API | Verified. `pll_the_languages()` with `raw` returns `no_translation`. | Same, plus site-editor switcher blocks. | Verified. `wpml_active_languages`: `skip_missing` 1 hides the language; 0 links to that language’s home. | Not in core. |
| Missing translation | Default switcher links to the other language’s front page. Hide option removes the language. Disabled-but-visible is theme-controlled through `no_translation`. | Same. | Native choices are hide or link home. A disabled-but-visible control was not verified. | Not in core. |
| SEO title and description | Each record has its own fields. Yoast compatibility is listed. An SEO plugin is not selected. | Paid marketing also lists language-dependent meta tags. | Documented alongside SEO plugins. Not selected here. | Per site. |
| Canonical and `hreflang` | `hreflang` is documented as automatic. `x-default` on every page is not the default; the `pll_rel_hreflang_attributes` filter can add it. Canonical behavior was not separately verified. | Same filter. | `hreflang` output was not opened in a WPML guide during this research. Unverified here. | Not in core. |
| Sitemaps | A changelog entry refers to language-code sitemap bugs, so Polylang participates in sitemaps. A full sitemap contract was not verified. | Same. | Unverified in the pages read. | One sitemap per site unless a plugin merges them. |
| Editor workflow | Documented “+” creates a translation. It is not published by the act of copying. | Paid duplication and machine translation. Machine translation must stay off. | Copy does not keep sync. Duplicate does. Completed translations can be published or saved as draft. Configurable. | Editors work in three dashboards. |
| Roles | Per-language capabilities are listed in the Pro 3.8 changelog, not in the free feature list. | Paid. | Translation Management is on the CMS plan. Exact clinic roles were not verified. | Network administrator versus site editor. Heavier. |
| Existing Russian content | Verified setting: assign existing posts, pages, categories, and public types to the default language without changing those URLs. | Same. | Not verified in the pages read. | Content would be copied to other sites. No official importer was verified. |
| Import and export | WordPress importer fixes appear in the changelog. XLIFF is Pro. | Paid XLIFF. | Translation services are a paid integration. A full WP export contract was not verified. | Core export per site. |
| REST API | Settings REST API is documented. Public content filtering was not fully verified. | Additional REST behavior is paid in places such as WooCommerce, which this site does not need. | Unverified in the pages read. | Per site. |
| Caching | Unverified. | Unverified. | Unverified. | More than one cache namespace. |
| Performance | Official claim: taxonomies, no extra tables. The handbook warns that one record per language grows the database. This site is small. | Same core. | Vendor says it should not slow the site. No measurement was made. | Three sites to maintain. |
| Uninstall | Handbook: this model leaves post content in place. A Polylang uninstall test was not run. | Same. | If the license is not renewed, WPML keeps running but stops receiving updates. Uninstall cleanup was not verified. | Removing a linking plugin is not applicable. The sites remain. |
| Maintenance | Free forum. Security updates were shipping in 2026. | Paid helpdesk. | Paid support for one year, stated as 24 hours, 7 days. | Core only. |
| Beginner editor | Uses the normal WordPress editor and a translation plus button. The switcher must be customized by a developer. | More tools, including duplication. | More concepts: copy, duplicate, fallback, translation editor. Easier fields, heavier screens. | Three admins. Poor fit. |

## 7. Structured fields compatibility

No custom-fields product is selected. Department phones, emails, coordinates, and order are theme meta, as in Stage 7A. Clinic-wide phones and hours are settings, not three copies of a Department.

| Value | Polylang free | WPML CMS | Multisite |
| --- | --- | --- | --- |
| Phone digits, email, coordinates, order | Copied when the translation is created. Later Russian edits are not documented as re-copied. The trial must keep the Russian record as the source and have the theme read those keys for every language. | Verified **Copy**: the translation keeps the source value, including later edits. | Not shared. Would be copied by hand or by custom network code. |
| Labels, address wording, hours words, Department body, alt text | Edited on each record. | Verified **Translate**, or **Copy once** if a translator should start from Russian and then diverge. | Edited on each site. |
| Department name | The translated record’s title. | Same. | Same, per site. |
| Language-specific poster | A translated media record. | Documented different file per language. | A file on that site. |

Polylang Pro’s synchronize option must not be turned on for whole posts. It could overwrite a Belarusian text when Russian changes. That would violate the Stage 7B outdated-translation rule.

WPML fallback (“use translation if available or fallback to default language”) must stay off for Pages, Posts, and Departments. It would show Russian content inside `/by/` or `/en/`.

## 8. Missing translation behavior

Approved behavior: the language stays visible, the control is disabled, the visitor stays on the current page, and a real translation opens the matching record.

| Product | What the official source says | Fit |
| --- | --- | --- |
| Polylang | Default switcher links to the other front page. A hide option removes the language. `pll_the_languages( array( 'raw' => 1 ) )` exposes `no_translation`. | Theme-controlled. The theme must not use the default switcher. |
| WPML | `skip_missing` 1 hides the language. `skip_missing` 0 links to that language’s home. | Hide and home-link are verified. Disabled-but-visible is unverified. |
| Multisite | No switcher in core. | Unsupported until another product is added. |

## 9. Editorial workflow

Polylang’s documented flow is: publish Russian, press the translation plus control, edit the new record, publish it later. That matches “do not auto-publish a copy.”

WPML can copy without syncing, or duplicate with sync. The non-syncing copy is the closer match. Its setting for completed translations must be “save as draft,” not “publish immediately,” until the trial proves editors understand it.

Neither product may send clinic text to DeepL, Google, Microsoft, or WPML AI during the trial. Both vendors offer those services. They stay off.

## 10. SEO and URL support

Polylang and WPML CMS can both represent `/`, `/by/`, and `/en/` from the documents read. Polylang’s `hreflang` output and the filter for `x-default` are documented. WPML `hreflang` was not re-read from a guide in this pass, so it is not scored as verified. Canonical tags were not verified for either plugin. Browser-language redirects stay off, as Stage 7B requires.

## 11. Performance and portability

Both one-record products add a second and third record per translated object. The handbook warns about database growth on very large shops. This clinic’s page count does not approach that example. No timing test was run.

Polylang’s own documentation says it uses WordPress taxonomies and does not add its own tables. Uninstall should leave the posts. The language links would stop being interpreted. That was not tested.

WPML remains installed and working without a renewal, but it no longer receives updates. That is a maintenance risk. Exit cost is unverified.

Multisite keeps normal posts, but splits them across sites. Shared clinic data and one editorial workflow are worse, not better.

## 12. Licensing and cost

Prices published on 24 September 2026:

| Product | Price read | What the price buys |
| --- | --- | --- |
| Polylang | No fee. GPL plugin on WordPress.org. | The free row in the matrix. |
| Polylang Pro | €99 per year for one site. The pricing page displayed version 3.8.6. | Archive-base slug translation, duplication, synchronization, per-language capabilities, DeepL, XLIFF, helpdesk. |
| WPML Blog | €39 per year. | Not sufficient. Menus and slug translation are absent. |
| WPML CMS | €99 per year. Includes 22,500 AI words. | The CMS row in the matrix. Support and updates for one year. The site keeps working after expiry, without updates. |
| WPML Agency | €199 per year. | More sites. Not needed for one clinic. |
| Multisite | No plugin fee. | More hosting and administration. No language links. |

AI word allowances are not a reason to choose a product.

## 13. Weighted scoring

Weights: architecture fit 20, content-model compatibility 15, editor usability 10, Gutenberg 10, SEO and URL behavior 15, portability 10, performance and maintenance 10, cost and licensing 5, implementation complexity 5. Each category is scored from 0 to 5 using verified behavior only. Unverified items lower the score. Cost cannot outweigh a failed requirement.

| Category | Weight | Polylang free | WPML CMS | Multisite |
| --- | --- | --- | --- | --- |
| Architecture fit | 20 | 4 | 4 | 2 |
| Content model | 15 | 3 | 5 | 2 |
| Editor usability | 10 | 4 | 3 | 2 |
| Gutenberg | 10 | 3 | 4 | 5 |
| SEO and URL | 15 | 4 | 3 | 2 |
| Portability | 10 | 4 | 2 | 3 |
| Performance and maintenance | 10 | 4 | 3 | 3 |
| Cost and licensing | 5 | 5 | 3 | 4 |
| Implementation complexity | 5 | 4 | 3 | 1 |
| Weighted total | 100 | 75.0 | 69.0 | 51.0 |

Weighted total = sum of (score / 5 × weight).

Polylang is ahead because the URL model, `hreflang`, menus, and the `no_translation` flag are documented without a fee. WPML is ahead on structured fields, parent sync, and Gutenberg translation tools. Multisite loses because it is a different architecture and core does not link translations.

## 14. Risks and limitations

- Polylang’s default switcher violates the missing-translation rule until the theme replaces it.
- Polylang does not document ongoing per-field sync. A copied phone can go stale.
- Translated Department archive bases need Polylang Pro or WPML CMS. Free Polylang can still translate each Department’s own slug.
- WPML can be configured to fall back to Russian. That configuration would violate Stage 7B.
- WPML’s verified missing-language behavior is hide or home link, not a disabled control.
- Neither canonical output nor cache behavior was verified.
- No product was installed, so editor usability is documentary, not observed.
- Machine-translation buttons exist in both paid products and must not be used for medical or personal text.

## 15. Recommended solution or shortlist

**Shortlist two solutions for a hands-on evaluation. Do not install either in this stage.**

1. **Polylang free** is the first trial install, on a disposable WordPress site only, after approval.
2. **WPML Multilingual CMS** is the second trial only if the Polylang trial fails a condition below.

Multisite is not recommended.

Polylang is first because the approved URL shape, separate records, classic menus, public custom post types, media records, `hreflang`, and a switcher flag for a missing translation are documented on the free plugin. The Department phone rule can be implemented in the theme by reading the Russian record, which matches Stage 7A theme-owned meta. That workaround is part of the trial, not a hidden plugin feature.

WPML CMS is the alternative because its Copy / Copy once / Translate field modes are the clearest verified match for shared digits and translated labels. It costs €99 per year and its public switcher does not document the disabled-control behavior.

Conditions that would make Polylang fail the trial:

- The theme cannot disable a missing language without a homepage link.
- Editors cannot keep phone digits aligned without constant hand edits.
- The untranslated archive base (`/en/o-nas/strukturnye-podrazdeleniya/`) is rejected by the project owner.

If Polylang fails, the same fixture is repeated on WPML CMS. If WPML cannot show a disabled language either, the switcher stays a theme control and the field behavior decides.

Polylang Pro is an upgrade inside the first product, not a third finalist. Buy it only if the trial proves the free plugin cannot translate the Department archive base or cannot duplicate a draft safely. Do not buy it for DeepL.

## 16. Acceptance trial

Do not run this until installation is approved. Use a disposable site and this fixture:

- Russian homepage, Contacts, one Department, one news Post, one category, one table Page, search, and a 404.
- One shared portrait and one poster that contains Russian words.
- One Russian-only PDF.
- Belarusian and English translations for Contacts and the Department.
- English deliberately missing for the news Post.

Pass rules:

- Russian URLs have no language prefix. Belarusian uses `/by/`. English uses `/en/`.
- Each translation is its own record and is linked.
- Slugs can differ. A copied translation stays a draft.
- Menus differ by language. Breadcrumbs do not mix languages.
- Search from `/by/` does not return Russian or English records.
- The missing English news control is visible and disabled. The page does not change.
- The shared portrait has different alt text. The poster is a different file. The PDF remains available and is labeled as Russian.
- Changing the Russian phone updates the other languages, or the theme reads the Russian phone, and the Belarusian description does not change.
- `hreflang` lists only published translations. `x-default` points at Russian.
- A non-technical editor can add the second language without using a translation-service button.

## 17. Approval decision required

Approve or reject this shortlist before any WordPress or plugin installation:

- First trial: Polylang free.
- Second trial, only on failure: WPML Multilingual CMS.
- Not chosen: Multisite, WPML Blog, and machine translation.

No plugin has been installed. The static site was not changed.
