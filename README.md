# retroqubit.github.io

Personal site. One page, hand-written, no framework and no build step.

## Design

The visual language follows [shadcn/ui](https://ui.shadcn.com): neutral zinc palette, `0.5rem` radius, Inter, hairline borders, subtle card shadows and generous whitespace. None of it is copied in — there is no Tailwind and no component library here, only the token shape.

That shape is the useful part. Every colour is stored as **bare HSL channels** and consumed through `hsl(var(--token))`:

```css
:root {
  --background: 0 0% 100%;
  --muted-foreground: 240 3.8% 46.1%;
}

.card { box-shadow: 0 1px 2px 0 hsl(var(--foreground) / .05); }
```

Storing channels rather than finished colours means any token can take an alpha at the point of use, so a translucent border needs no second token for the translucent variant.

## Theming

Three states, not two: light, dark, and *whatever the system says* — which is the default, and the one most toggles quietly discard on first click.

- Bare `:root` is light.
- `@media (prefers-color-scheme: dark)`, guarded with `:root:not([data-theme="light"])`, covers the system default while letting an explicit light choice win inside a dark OS.
- `:root[data-theme="dark"]` comes last so the toggle wins in both directions.

The attribute is only written once a choice has actually been made, so a visitor who never touches the button keeps following their OS — including when it flips at sunset with the page still open. A tiny inline script in `<head>` applies the stored choice before first paint, so a dark-mode reload never flashes white.

## Accessibility

- Skip link to the main content.
- Visible focus rings on every interactive element, drawn from the `--ring` token.
- `prefers-reduced-motion` disables transitions, hover lift and smooth scrolling.
- Colour pairings use the shadcn foreground/background pairs, which are contrast-checked by construction.

## Running locally

```bash
git clone https://github.com/retroqubit/retroqubit.github.io.git
cd retroqubit.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

The only network request is the webfont pair (Inter and JetBrains Mono); offline it falls back to the system UI stack.

## Layout

```
index.html        the page
css/style.css     tokens, components and both themes
js/theme.js       the three-state theme toggle
js/projects.js    the work, as data
js/app.js         wiring
```

## License

MIT — see [LICENSE](LICENSE).
