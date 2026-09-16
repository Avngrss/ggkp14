/**
 * Main entry — initializes all modules
 */
(function () {
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const panel = document.getElementById("header-search-panel");

    const getHeaderOffsetHeight = () => {
      const headerRect = header.getBoundingClientRect();
      if (panel && !panel.hidden) {
        const panelRect = panel.getBoundingClientRect();
        return Math.ceil(panelRect.bottom - headerRect.top);
      }
      return header.offsetHeight;
    };

    const updateScrollPadding = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        getHeaderOffsetHeight() + "px",
      );
    };

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      updateScrollPadding();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollPadding, { passive: true });

    header.updateScrollPadding = updateScrollPadding;
    updateScrollPadding();
    onScroll();
  }

  function initHeaderSearch() {
    const header = document.querySelector(".site-header");
    const toggle = document.getElementById("header-search-toggle");
    const panel = document.getElementById("header-search-panel");
    const input = panel?.querySelector(".search-form__input");

    if (!toggle || !panel) return;

    const syncScrollPadding = () => {
      if (typeof header?.updateScrollPadding === "function") {
        header.updateScrollPadding();
      }
    };

    const open = () => {
      const scrollY = window.scrollY;
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.add("is-active");
      header?.classList.add("is-search-open");
      syncScrollPadding();
      input?.focus({ preventScroll: true });
      if (window.scrollY !== scrollY) {
        window.scrollTo(0, scrollY);
      }
    };

    const close = () => {
      panel.hidden = true;
      panel.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-active");
      header?.classList.remove("is-search-open");
      syncScrollPadding();
      toggle.focus();
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (panel.hidden) open();
      else close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) close();
    });

    document.addEventListener("click", (e) => {
      if (
        !panel.hidden &&
        !panel.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        close();
      }
    });

    panel.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  function initSearchForm() {
    const forms = document.querySelectorAll(".search-form");

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        const action = (form.getAttribute("action") || "#").trim();
        const isLocalDemoAction =
          action &&
          action !== "#" &&
          !/^https?:\/\//i.test(action);

        if (isLocalDemoAction) {
          return;
        }

        e.preventDefault();
        const input = form.querySelector(".search-form__input");
        const query = input?.value.trim();
        if (query) {
          alert(
            "Поиск: «" +
              query +
              "»\n\nВ демо-версии поиск не подключён. В WordPress будет работать стандартный поиск.",
          );
        }
      });
    });
  }

  function initTableScroll() {
    const wrappers = document.querySelectorAll("[data-table-scroll]");
    if (!wrappers.length) return;

    const update = (wrapper) => {
      const section = wrapper.closest(".table-section");
      const hint = section?.querySelector("[data-table-scroll-hint]");
      const needsScroll = wrapper.scrollWidth > wrapper.clientWidth + 1;

      wrapper.toggleAttribute("data-scrollable", needsScroll);
      if (hint) {
        hint.hidden = !needsScroll;
      }
    };

    wrappers.forEach((wrapper) => {
      update(wrapper);
      window.addEventListener(
        "resize",
        () => update(wrapper),
        { passive: true },
      );
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.initMenu === "function") window.initMenu();
    if (typeof window.initAccessibility === "function")
      window.initAccessibility();
    initStickyHeader();
    initHeaderSearch();
    initSearchForm();
    initTableScroll();
  });
})();
