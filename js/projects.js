/**
 * The work.
 *
 * Kept as data rather than markup so the cards cannot drift out of sync with
 * each other, and so adding a project is one object instead of twenty lines of
 * duplicated HTML.
 */
(function (global) {
  'use strict';

  const USER = 'retroqubit';

  const PROJECTS = [
    {
      name: 'CSV Peek',
      slug: 'csv-peek',
      blurb: 'Open a CSV, sort it, and find out what each column actually holds. The reader is a character scanner, so a comma inside a quoted address does not shift every column after it.',
      note: 'Designed as a ledger — ruled writing lines, tabular figures, a red margin rule.',
      tags: ['RFC 4180', 'Type inference', 'Chunked rendering'],
    },
    {
      name: 'Selector Sleuth',
      slug: 'selector-sleuth',
      blurb: 'Run a CSS selector against your own markup, read it back in plain English, and see where its specificity came from — including the cases calculators get wrong.',
      note: 'Noir: one amber lamp, a typewriter and two manila folders.',
      tags: [':is() / :not()', ':where()', 'DOMParser'],
    },
    {
      name: 'Easing Studio',
      slug: 'easing-studio',
      blurb: 'Drag a cubic-bezier curve and watch it drive four properties off one clock. When a bezier will not do, simulate a real spring and export it as a linear() ramp.',
      note: 'Synthwave, because a tool about motion may as well move.',
      tags: ['Newton–Raphson', 'Spring integration', 'linear()'],
    },
    {
      name: 'Typescale',
      slug: 'typescale',
      blurb: 'Build a modular type scale, look at the specimen at real size, and take it away as CSS, SCSS, a Tailwind config or JSON. Fluid mode gives one clamp() per step.',
      note: 'A printed spread — white stock, one vermilion accent, a lot of air.',
      tags: ['clamp()', 'Fluid type', 'WCAG 1.4.4'],
    },
    {
      name: 'Flexbox Lab',
      slug: 'flexbox-lab',
      blurb: 'A playground that explains itself. Every control carries one sentence on what it really does, and the CSS you copy contains only the declarations that differ from the initial value.',
      note: 'Neo-brutalist: acid yellow, 3px rules, hard offset shadows.',
      tags: ['Property table', 'Six presets', 'Shorthand output'],
    },
    {
      name: 'Gridpaper',
      slug: 'gridpaper',
      blurb: 'Drag rectangles to name grid areas and copy a grid-template-areas block with the columns lined up. Painting rectangles makes the one rule — areas must be rectangular — impossible to break by hand.',
      note: 'A blueprint, with the grid printed across the whole sheet.',
      tags: ['CSS Grid', 'Pointer events', 'Validation'],
    },
    {
      name: 'SVG Squeeze',
      slug: 'svg-squeeze',
      blurb: 'Shrink an SVG and get a line per pass saying what went. Nothing rewrites geometry beyond rounding — that is where optimisers start drawing subtly different pictures.',
      note: 'Swiss: white, black, one signal red, a very large number.',
      tags: ['Path data scanner', 'Arc flags', 'Inheritance-safe'],
    },
    {
      name: 'Breakpoint Lab',
      slug: 'breakpoint-lab',
      blurb: 'Preview a layout at every width at once — device widths plus the widths your own stylesheet switches at — with the live media queries beside it and a flag wherever content overflows.',
      note: 'Frosted glass over a colour mesh; the frames themselves stay on white.',
      tags: ['@media scanner', 'Scaled iframes', 'Overflow detection'],
    },
  ];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function cardHtml(project) {
    const live = `https://${USER}.github.io/${project.slug}/`;
    const repo = `https://github.com/${USER}/${project.slug}`;

    return `<article class="card card-link">
      <div class="card-head">
        <h3>${esc(project.name)}</h3>
        <p class="card-desc">${esc(project.blurb)}</p>
      </div>
      <div class="card-body">
        <div class="badges">${project.tags.map((t) => `<span class="badge">${esc(t)}</span>`).join('')}</div>
        <p class="note">${esc(project.note)}</p>
      </div>
      <div class="card-foot">
        <a class="btn btn-primary btn-sm" href="${live}">Live</a>
        <a class="btn btn-outline btn-sm" href="${repo}">Source</a>
      </div>
    </article>`;
  }

  function render(container) {
    if (!container) return;
    container.innerHTML = PROJECTS.map(cardHtml).join('');
  }

  global.Work = { PROJECTS, render };
})(window);
