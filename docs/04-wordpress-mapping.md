# WordPress Mapping — ggkp14.by Redesign

> Документ описывает, как статический frontend и компоненты проекта будут преобразованы в WordPress-тему. Написан для разработчиков и для людей, которые будут наполнять сайт через админку.

---

## Общая архитектура

```
wordpress-theme/
├── style.css                 # Метаданные темы (обязательный файл WP)
├── functions.php             # Подключение CSS/JS, меню, поддержка темы
├── index.php                 # Fallback template
├── header.php                # Topbar + Header
├── footer.php                # Footer + wp_footer()
├── front-page.php            # Главная страница
├── page.php                  # Обычные страницы
├── single.php                # Отдельная новость
├── archive.php               # Архив новостей
├── search.php                # Результаты поиска
├── sidebar.php               # Боковая панель
├── 404.php                   # Страница ошибки
├── assets/
│   ├── css/                  # Скомпилированные стили
│   ├── js/                   # Скрипты темы
│   ├── images/               # Статичные изображения темы
│   └── fonts/                # Шрифты
└── template-parts/
    ├── topbar.php
    ├── navigation.php
    ├── hero-welcome.php
    ├── quick-actions.php
    ├── contact-cards.php
    ├── info-cards.php
    ├── departments-grid.php
    ├── news-section.php
    ├── useful-links.php
    ├── sidebar-search.php
    ├── sidebar-hours.php
    ├── sidebar-links.php
    └── content/
        ├── content-news-card.php
        └── content-department-card.php
```

---

## Mapping: Static → WordPress Templates

| Статическая секция (src/)              | WordPress файл                                             | Тип                                       |
| -------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| `<header>` topbar                      | `template-parts/topbar.php` → included in `header.php`     | Template part                             |
| `<header>` main nav                    | `template-parts/navigation.php` → included in `header.php` | Template part                             |
| Hero welcome + quick actions           | `template-parts/hero-welcome.php` + `quick-actions.php`    | Template parts in `front-page.php`        |
| Contact cards                          | `template-parts/contact-cards.php`                         | Template part (ACF)                       |
| Info cards (hotline, vacancies, hours) | `template-parts/info-cards.php`                            | Template part (ACF)                       |
| Departments grid                       | `template-parts/departments-grid.php`                      | Template part (Custom Post Type or Pages) |
| News section                           | `template-parts/news-section.php`                          | WP Query (posts)                          |
| Useful links                           | `template-parts/useful-links.php`                          | Template part (ACF repeater)              |
| Sidebar widgets                        | `sidebar.php` + template-parts                             | Dynamic sidebar or template parts         |
| Footer                                 | `footer.php`                                               | Core template                             |
| Inner pages                            | `page.php`                                                 | Core template                             |
| Single news                            | `single.php`                                               | Core template                             |

---

## header.php

**Содержит:**

- `<!DOCTYPE html>`, `<html>`, `<head>` (via `wp_head()`)
- `<body>` opening tag
- Skip-to-content link
- Include `template-parts/topbar.php`
- Logo (customizer or ACF)
- Include `template-parts/navigation.php`
- Search toggle button
- Accessibility version link
- `wp_nav_menu()` для main menu и topbar menu

**WordPress functions:**

```php
wp_head();
wp_body_open();
wp_nav_menu(['theme_location' => 'primary']);
wp_nav_menu(['theme_location' => 'topbar']);
get_search_form(); // or custom search toggle
```

---

## footer.php

**Содержит:**

- Copyright text (ACF or customizer)
- Optional footer menu
- `wp_footer()` — обязательно для плагинов и скриптов
- Closing `</body></html>`

---

## front-page.php

**Главная страница.** WordPress автоматически использует этот файл, если в Settings → Reading выбрано «A static page».

**Структура:**

```php
get_header();
// Hero
get_template_part('template-parts/hero-welcome');
get_template_part('template-parts/quick-actions');
// Contacts
get_template_part('template-parts/contact-cards');
get_template_part('template-parts/info-cards');
// Departments
get_template_part('template-parts/departments-grid');
// Main + Sidebar layout
echo '<div class="layout-with-sidebar">';
echo '<main class="main-content">';
get_template_part('template-parts/news-section');
get_template_part('template-parts/useful-links');
echo '</main>';
get_sidebar();
echo '</div>';
get_footer();
```

---

## page.php

**Шаблон для всех обычных страниц** (О нас, Контакты, Платные услуги и т.д.)

**Содержит:**

- `get_header()`
- Breadcrumbs (optional)
- Page title: `the_title()`
- Page content: `the_content()`
- Sidebar (if applicable)
- `get_footer()`

WordPress автоматически подставляет контент из редактора страницы.

---

## template-parts

**Template parts** — переиспользуемые фрагменты HTML/PHP. Вызываются через:

```php
get_template_part('template-parts/hero-welcome');
```

| Template part                 | Данные                                        | Редактируемость            |
| ----------------------------- | --------------------------------------------- | -------------------------- |
| `topbar.php`                  | WP Menu «Topbar»                              | Admin → Appearance → Menus |
| `navigation.php`              | WP Menu «Primary»                             | Admin → Appearance → Menus |
| `hero-welcome.php`            | ACF: title, subtitle, image                   | ACF Options or Page fields |
| `quick-actions.php`           | ACF Repeater: icon, label, url                | ACF                        |
| `contact-cards.php`           | ACF Repeater: department, phones              | ACF                        |
| `info-cards.php`              | ACF: hotline, vacancies link, hours           | ACF                        |
| `departments-grid.php`        | Custom Post Type «departments» OR child pages | WP Admin                   |
| `news-section.php`            | WP_Query latest posts                         | Posts → Add New            |
| `useful-links.php`            | ACF Repeater: logo, url, alt                  | ACF                        |
| `sidebar-search.php`          | WordPress search                              | Built-in                   |
| `sidebar-hours.php`           | ACF or Widget                                 | ACF / Widgets              |
| `sidebar-links.php`           | WP Menu «Sidebar»                             | Admin → Menus              |
| `content-news-card.php`       | Post loop item                                | Automatic from posts       |
| `content-department-card.php` | Department loop item                          | Automatic                  |

---

## Подключение CSS

**В `functions.php`:**

```php
function ggkp14_enqueue_styles() {
    wp_enqueue_style(
        'ggkp14-main',
        get_template_directory_uri() . '/assets/css/main.css',
        [],
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'ggkp14_enqueue_styles');
```

**Порядок файлов CSS (в main.css):**

1. `tokens.css` — переменные
2. `base.css` — reset, typography
3. `components/*.css`
4. `layout/*.css`

**Статический demo → тема:** файлы из `src/css/` копируются в `wordpress-theme/assets/css/`.

---

## Подключение JS

**В `functions.php`:**

```php
function ggkp14_enqueue_scripts() {
    wp_enqueue_script(
        'ggkp14-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.0',
        true // in footer
    );
}
add_action('wp_enqueue_scripts', 'ggkp14_enqueue_scripts');
```

**Скрипты темы:**

- `main.js` — mobile menu, search toggle, carousels
- `navigation.js` — dropdown, drawer
- `carousel.js` — news/useful links sliders

**Правило:** не дублировать jQuery — WordPress включает его; для новой темы предпочтительно vanilla JS.

---

## Управление меню

**Регистрация в `functions.php`:**

```php
register_nav_menus([
    'primary'  => 'Главное меню',
    'topbar'   => 'Верхняя панель',
    'sidebar'  => 'Боковая панель',
    'footer'   => 'Подвал',
]);
```

**Редактирование:** WordPress Admin → **Внешний вид → Меню**

Администратор может:

- Добавлять/удалять пункты
- Создавать подменю (drag & drop)
- Назначать меню на location

---

## Управление новостями

**Новости = WordPress Posts (Записи)**

- Admin → **Записи → Добавить новую**
- Заголовок, текст, featured image, категория «Новости»
- Автоматически появляются в `news-section.php` через `WP_Query`

```php
$query = new WP_Query([
    'post_type'      => 'post',
    'posts_per_page' => 6,
    'category_name'  => 'novosti',
]);
```

**Архив:** `archive.php` или `category.php` для `/category/novosti/`

---

## Что редактируется из админки

| Контент                     | Способ редактирования      |
| --------------------------- | -------------------------- |
| Главное меню                | Appearance → Menus         |
| Topbar меню                 | Appearance → Menus         |
| Sidebar меню                | Appearance → Menus         |
| Новости                     | Posts → Add New            |
| Страницы (О нас, Контакты…) | Pages → Edit               |
| Hero текст/изображение      | ACF Options Page           |
| Quick actions               | ACF Repeater               |
| Contact cards               | ACF Repeater               |
| Info cards (hotline, hours) | ACF Fields                 |
| Useful links                | ACF Repeater               |
| Sidebar hours               | ACF or Text Widget         |
| Departments                 | Custom Post Type or Pages  |
| Logo                        | Customizer → Site Identity |
| Copyright                   | ACF Options or Customizer  |
| Telegram/QR banners         | ACF Image fields           |

## Что может оставаться статичным

- CSS/JS файлы темы (меняет разработчик)
- SVG icons (part of theme)
- Font files
- Template structure (PHP files)
- Fallback images

---

## ACF (Advanced Custom Fields) — рекомендуемые поля

### Options Page: «Настройки главной»

| Field            | Type     | Description                 |
| ---------------- | -------- | --------------------------- |
| `hero_title`     | Text     | H1 заголовок                |
| `hero_subtitle`  | Textarea | Подзаголовок                |
| `hero_image`     | Image    | Фоновое/боковое изображение |
| `hotline_phone`  | Text     | Телефон горячей линии       |
| `hotline_hours`  | Text     | Часы работы горячей линии   |
| `working_hours`  | Repeater | day + time                  |
| `copyright_text` | Text     | Footer copyright            |

### Repeater: `quick_actions`

| Sub-field | Type                       |
| --------- | -------------------------- |
| `icon`    | Text (icon class) or Image |
| `label`   | Text                       |
| `url`     | URL                        |

### Repeater: `contact_cards`

| Sub-field         | Type                    |
| ----------------- | ----------------------- |
| `department_name` | Text                    |
| `phones`          | Repeater (phone number) |

### Repeater: `useful_links`

| Sub-field  | Type  |
| ---------- | ----- |
| `logo`     | Image |
| `url`      | URL   |
| `alt_text` | Text  |

### Custom Post Type: `department`

| Field             | Type                           |
| ----------------- | ------------------------------ |
| `title`           | Built-in                       |
| `featured_image`  | Built-in                       |
| `department_type` | Select (АОП / ФАП / Отделение) |
| `content`         | Built-in editor                |

---

## Blocks / Pages / Scripts — объяснение

### Pages (Страницы)

Фиксированный контент: «О нас», «Контакты», «Платные услуги». Каждая страница — отдельный URL. Редактируется через блочный редактор WordPress (Gutenberg).

### Posts (Записи)

Динамический контент: новости. Имеют дату, категорию, featured image. Автоматически выводятся в ленте.

### Blocks (Блоки Gutenberg)

Стандартный редактор WordPress. Для главной страницы рекомендуется ACF + template-parts вместо Gutenberg blocks — проще для неопытного администратора.

### Scripts

- **Theme scripts** (`assets/js/`) — mobile menu, carousels. Подключаются через `wp_enqueue_script`.
- **Plugin scripts** — подключаются автоматически (ACF, Yoast, etc.)
- **Third-party** — Yandex Metrika, reCAPTCHA — через `wp_footer()` или plugin

---

## Миграция со старого сайта

1. Экспорт контента: Tools → Export (WordPress XML)
2. Экспорт медиа: wp-content/uploads
3. Меню: recreate manually or use plugin
4. ACF fields: import via ACF JSON sync
5. URLs: maintain same slugs for SEO (redirect map if changed)

---

## Homepage controlled layout mapping (Stage 3E)

Controlled homepage layout — no sidebar on news area, no search in lower content.

| Demo element | WordPress implementation |
|--------------|-------------------------|
| `#header-search-panel` form | `get_search_form()` in `header.php` |
| Mobile drawer search | Same `get_search_form()` in mobile menu template part |
| Featured post (`.news-featured`) | `WP_Query`: `posts_per_page => 1` (latest post) |
| Compact list (`.news-compact` × 4) | `offset => 1`, `posts_per_page => 4` |
| `.latest-news__archive` («Все новости») | Category archive `/category/novosti/` |
| Full news archive | `archive.php` / category template |
| `.news-featured__figure` | `the_post_thumbnail('large')` |
| `.news-compact__thumb` | `the_post_thumbnail('thumbnail')` with fallback |
| Useful info — hours card | ACF options / template part |
| Useful info — links card | ACF repeater or menu location |
| Useful info — Telegram/QR card | ACF options: `telegram_channel_url`, `sidebar_qr_image` |
| `.official-resource` strip | ACF repeater: logo, url, title |
| Homepage news sidebar | **None** — do not restore sidebar next to news |

Layout: featured column ~45%, compact list ~55% on desktop (`grid-template-columns: 45fr 55fr`).

## Homepage news (Stage 3C — superseded by 3E)

The homepage shows a **limited news preview**, not the full archive:

| Homepage element                   | WordPress implementation                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Featured post (`.news-featured`)   | `WP_Query`: latest post, `posts_per_page => 1`                                        |
| Compact list (`.news-compact` × 4) | Same query or second query: `offset => 1`, `posts_per_page => 4`                      |
| «Все новости» button               | Link to category archive `/category/novosti/` or `get_post_type_archive_link('post')` |
| Full news list                     | **`archive.php`** / category template — all posts paginated                           |

Post thumbnails map to image slots:

| Slot                     | Thumbnail size                                |
| ------------------------ | --------------------------------------------- |
| `.news-featured__figure` | `large` or `medium_large`                     |
| `.news-compact__thumb`   | `thumbnail` (96×72 display, object-fit cover) |

Fallback: placeholder SVGs when `has_post_thumbnail()` is false.

## Useful information cards (Stage 3C)

Former sidebar widgets are now homepage template parts / ACF options:

| Card            | Suggested WP source                                      |
| --------------- | -------------------------------------------------------- |
| Время работы    | ACF options page `clinic_hours`                          |
| Полезные ссылки | ACF repeater or nav menu location `homepage-quick-links` |
| Telegram        | ACF URL `telegram_channel_url`                           |
| QR              | ACF / theme option `sidebar_qr_image`                    |
| Поиск           | `get_search_form()` in template part                     |

---

## Image fields prepared for WordPress

Stage 3B added semantic image slots in the static demo. Each slot maps to a future WordPress/ACF field:

| Demo selector / `data-wp-field`              | WordPress source                                        | Fallback                                                 |
| -------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| `.hero__visual` / `hero_image`               | ACF field `hero_image` on front page or theme options   | `assets/images/placeholders/hero-clinic-placeholder.svg` |
| `.news-card__figure` / `post_thumbnail`      | Post featured image (`the_post_thumbnail()`)            | `assets/images/placeholders/news-placeholder.svg`        |
| `.news-featured__figure` / `post_thumbnail`  | Featured homepage post — `the_post_thumbnail('large')`  | `assets/images/placeholders/news-placeholder.svg`        |
| `.news-compact__thumb` / `post_thumbnail`    | Compact list posts — `the_post_thumbnail('thumbnail')`  | `assets/images/placeholders/news-thumb-placeholder.svg`  |
| `.dept-card__image` / `department_thumbnail` | Department CPT featured image or ACF `department_image` | `assets/images/placeholders/department-placeholder.svg`  |
| `.promo-banner__visual` / `promo_image`      | ACF field `promo_image` on front page                   | `assets/images/placeholders/promo-placeholder.svg`       |
| `.official-resource__logo` / `partner_logo` | ACF repeater sub-field `logo` on official resources | `assets/images/placeholders/resource-logo-placeholder.svg` |
| `.info-card-widget__qr-compact` / `sidebar_qr_image` | Theme option or ACF options page `sidebar_qr_image` | `assets/images/placeholders/qr-placeholder.svg` |

**Implementation notes:**

- Use `<figure class="image-slot">` wrapper in template-parts for consistent styling
- All images should use `object-fit: cover` (or `contain` for logos/QR)
- In PHP: if `has_post_thumbnail()` / ACF image empty, output placeholder via `get_template_directory_uri() . '/assets/images/placeholders/...'`
- Hero and promo backgrounds (CSS SVG patterns) remain decorative; the `<img>` slots are the CMS-managed content areas

---

## Checklist для разработчика

- [ ] Create `style.css` with theme metadata
- [ ] Setup `functions.php` (menus, enqueue, theme support)
- [ ] Convert static HTML sections to template-parts
- [ ] Register ACF field groups
- [ ] Create department CPT
- [ ] Setup WP_Query for news
- [ ] Test menu locations
- [ ] Test responsive
- [ ] Write admin guide (docs/05)
