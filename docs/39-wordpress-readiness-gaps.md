# WordPress Readiness Gaps

Дата: 2026-09-21

Пробелы, которые должны быть закрыты при конвертации статического демо в WordPress-тему. **Не решать на этапе статического HTML.**

---

## Routing and templates

- Динамические меню (`wp_nav_menu`) вместо дублированного HTML shell
- `search.php` с серверным `get_search_query()` и веткой no-results
- `archive.php` / category templates для новостей
- `single.php` (единый шаблон с условиями featured image / video / text-only)
- Страницы подразделений из записей или CPT с полями
- Локальные permalinks вместо sibling `.html` и `data-source-path`

## Loops and pagination

- WordPress Loop для архива, поиска, подразделений
- `the_posts_pagination()` вместо статической пагинации
- Условный вывод excerpt, thumbnail, metadata

## Content and editor

- Gutenberg blocks: embed video, gallery, tables, notices
- Featured image: `has_post_thumbnail()` / условный wrapper
- Реальный `the_content()` вместо demo prose
- Dynamic breadcrumbs (`yoast_breadcrumb` или custom)
- SEO title/description per page
- Sanitization and editor capabilities

## Forms and integrations

- `get_search_form()` с `action` на home URL
- Электронные обращения, Yandex-формы, запись к врачу — server-side или embed plugins
- Contact map: oEmbed или ACF iframe field

## Departments and structure

- 18+ department records: CPT или pages + custom fields (адрес, телефоны, AOP badge)
- Index generated from query, not static 18-card list maintenance

## Multilingual

- Plugin (Polylang / WPML / core i18n strategy)
- Перевод меню, строк UI, slug strategy

## Assets and migration

- Media library uploads вместо placeholders
- Favicon and theme assets via `get_template_directory_uri()`
- Content migration from live ggkp14.by

## Deployment

- PHP-capable hosting (GitHub Pages insufficient for WP runtime)
- Staging vs production URL strategy
