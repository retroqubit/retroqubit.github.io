/**
 * The theme toggle.
 *
 * Three states, not two: light, dark, and "whatever the system says", which is
 * the default and the one most toggles quietly throw away on first click. The
 * attribute is only written once a choice has actually been made, so a visitor
 * who never touches the button keeps following their OS setting — including
 * when it changes at sunset while the page is still open.
 */
(function (global) {
  'use strict';

  const KEY = 'theme';
  const root = document.documentElement;
  const media = global.matchMedia('(prefers-color-scheme: dark)');

  const stored = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };

  const remember = (value) => {
    try { localStorage.setItem(KEY, value); } catch { /* private mode; the page still works */ }
  };

  /** What the page is actually showing right now. */
  function effective() {
    const choice = root.getAttribute('data-theme');
    if (choice) return choice;
    return media.matches ? 'dark' : 'light';
  }

  function apply(value) {
    root.setAttribute('data-theme', value);
    remember(value);
    const button = document.getElementById('theme');
    if (button) button.setAttribute('aria-label', value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function init() {
    const button = document.getElementById('theme');
    if (!button) return;

    apply(stored() || effective());
    button.addEventListener('click', () => apply(effective() === 'dark' ? 'light' : 'dark'));
  }

  global.Theme = { init, effective };
})(window);
