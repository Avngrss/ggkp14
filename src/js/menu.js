/**
 * Mobile menu — open/close, scroll lock, Escape, overlay click
 */
(function () {
  const SELECTORS = {
    toggle: '#menu-toggle',
    drawer: '#mobile-drawer',
    overlay: '.mobile-drawer__overlay',
    close: '#menu-close',
    panel: '.mobile-drawer__panel',
  };

  window.initMenu = function () {
    const toggle = document.querySelector(SELECTORS.toggle);
    const drawer = document.querySelector(SELECTORS.drawer);
    const overlay = document.querySelector(SELECTORS.overlay);
    const closeBtn = document.querySelector(SELECTORS.close);
    const panel = document.querySelector(SELECTORS.panel);

    if (!toggle || !drawer) return;

    const open = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      closeBtn?.focus();
    };

    const close = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      toggle.focus();
    };

    toggle.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) {
        close();
      } else {
        open();
      }
    });

    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        close();
      }
    });

    panel?.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  };
})();
