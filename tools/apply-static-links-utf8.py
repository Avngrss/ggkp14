"""Apply GitHub Pages static link mapping; read/write UTF-8 only."""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "src" / "pages"

LOCAL_MAP = [
    ("/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/", "department.html"),
    ("/o-nas/strukturnye-podrazdeleniya/urickaya-aop/", "department-aop.html"),
    ("/o-nas/strukturnye-podrazdeleniya/", "departments-index.html"),
    ("/o-nas/grafik-pryamyh-telefonnyh-linij/", "table-page.html"),
    ("/category/novosti/", "news-archive.html"),
    ("/zapis-k-vrachu/", "content-page.html"),
    ("/contacts/", "contacts.html"),
]


def fix_content(content: str) -> str:
    for wp_path, local in LOCAL_MAP:
        content = content.replace(
            f'href="{wp_path}"',
            f'href="{local}" data-source-path="{wp_path}"',
        )
    content = re.sub(
        r'href="/"(?=[\s>])',
        'href="index.html" data-source-path="/"',
        content,
    )

    def externalize(match: re.Match[str]) -> str:
        path = match.group(1)
        return f'href="https://ggkp14.by{path}"'

    content = re.sub(r'href="(/[^"]*)"', externalize, content)
    content = content.replace('action="#"', 'action="search-results.html"')
    return content


def fix_search_inputs(content: str) -> str:
    content = content.replace(
        'id="header-search-input"\n                class="form-input search-form__input"',
        'id="header-search-input"\n                name="s"\n                class="form-input search-form__input"',
    )
    content = content.replace(
        'id="mobile-search-input"\n              class="form-input search-form__input"',
        'id="mobile-search-input"\n              name="s"\n              class="form-input search-form__input"',
    )
    if 'name="s"' not in content.split("header-search-input")[1][:200]:
        pass
    return content


def restore_from_git(commit: str, rel_path: str) -> str:
    raw = subprocess.check_output(["git", "show", f"{commit}:{rel_path}"])
    return raw.decode("utf-8")


def main() -> None:
    corrupted = [
        "src/pages/department-aop.html",
        "src/pages/department.html",
        "src/pages/departments-index.html",
        "src/pages/news-archive.html",
        "src/pages/news-single-no-media.html",
        "src/pages/news-single-video.html",
        "src/pages/news-single.html",
    ]
    for rel in corrupted:
        text = restore_from_git("382c3aa", rel)
        text = fix_content(text)
        text = fix_search_inputs(text)
        out = ROOT / rel.replace("/", "\\") if False else ROOT / Path(rel)
        out.write_text(text, encoding="utf-8", newline="\n")
        out.read_text(encoding="utf-8")
        print(f"restored+mapped {Path(rel).name}")


if __name__ == "__main__":
    main()
