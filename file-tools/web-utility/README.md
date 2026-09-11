# Web Utility modules

This folder contains the modular implementation used by `web-utility-modular.html`.

## Structure

- `core.js` — registry, rendering, search/filtering, collapse controls, notifications, copy/download helpers.
- `rng-money-time.js` — random/RNG, money, timers, and date/timestamp tools.
- `conversion-writing.js` — conversions, writing/text, school, and data tools.
- `browser-file-privacy.js` — browser/computer, file/image, and privacy/security tools.
- `creative-travel-audio-language.js` — creative, travel/time-zone, audio, and language tools.
- `legacy.js` — existing encoding, HTML, developer-helper, clipboard, and sandbox tools.

## Adding a new tool

Create or edit a module and call:

```js
WebUtil.register('Category', 'Icon', 'Tool title', 'Short description', function(el, api) {
  el.innerHTML = `...`;
  // wire events here
});
```

Then add the module with a normal `<script src="web-utility/your-module.js"></script>` in the HTML entry point.

The core automatically groups tools by category, creates cards, adds search filtering, and wires minimize/expand behavior.

## Design goals

- No framework or external library required.
- Browser-first and offline-friendly.
- Tools should operate locally whenever possible.
- Keep each feature isolated so future additions do not require rewriting the whole page.
- Avoid network requests for user-entered data.
