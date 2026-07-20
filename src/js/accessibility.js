/**
 * Accessibility helpers — version for visually impaired toggle
 */
(function () {
  window.initAccessibility = function () {
    const toggles = document.querySelectorAll('[data-a11y-toggle]');

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('a11y-mode');
        toggle.setAttribute('aria-pressed', String(isActive));

        toggle.textContent = isActive
          ? 'Обычная версия сайта'
          : 'Версия для слабовидящих';
      });
    });
  };
})();
