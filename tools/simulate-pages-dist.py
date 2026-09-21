"""Simulate .github/workflows/pages.yml dist build locally (no sed; Python rewrite)."""
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SRC = ROOT / "src"

PAGES = [
    "content-page.html",
    "contacts.html",
    "table-page.html",
    "departments-index.html",
    "department.html",
    "department-aop.html",
    "news-archive.html",
    "news-single.html",
    "news-single-video.html",
    "news-single-no-media.html",
    "search-results.html",
    "paid-services.html",
    "information.html",
    "about.html",
    "applicant-2023.html",
    "adult-dispensary-examinations.html",
]


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(SRC, DIST)
    index = (DIST / "pages" / "index.html").read_text(encoding="utf-8")
    index = index.replace("../css/", "./css/")
    index = index.replace("../js/", "./js/")
    index = index.replace("../assets/", "./assets/")
    for page in PAGES:
        index = index.replace(f'href="{page}"', f'href="pages/{page}"')
        index = index.replace(f'action="{page}"', f'action="pages/{page}"')
    (DIST / "index.html").write_text(index, encoding="utf-8", newline="\n")
    (DIST / "pages" / "preview.html").unlink(missing_ok=True)
    (DIST / ".nojekyll").touch()
    print(f"dist ready at {DIST}")


if __name__ == "__main__":
    main()
