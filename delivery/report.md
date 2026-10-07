# slugify documentation site — delivery report

Live URL: https://astra-intelligence.github.io/slugify-docs/
Docs source: https://github.com/astra-intelligence/slugify-docs (main = authored
source; gh-pages = built site)
Target library: https://github.com/simov/slugify @ 8d8c538c53ddf5c1023c8b4769681bb53877746b
(v1.6.9, MIT)

## What was delivered

A navigable, searchable Sourcey-generated documentation site for slugify — a
maintained, MIT-licensed OSS library with 1,745+ GitHub stars and no existing
documentation site. Twelve pages document the full public surface from source:
the `slugify()` function, both call forms, all six options (`replacement`,
`remove` regex/string rules, `lower`, `strict`, `locale`, `trim`), `extend()`,
the 641-entry character map, the 12 built-in locale tables, ISO 639-1 codes,
Unicode normalization, all module formats (CommonJS, AMD, browser global, ES
modules, TypeScript), plus URL/SEO, file-name, identifier, and multilingual
guides and a troubleshooting page. The site includes search
(`search-index.json`), `sitemap.xml`, `llms.txt`/`llms-full.txt`, and OG assets.

## Maintainer-facing gaps this site fills (why an ecosystem audience would link it)

- **No docs site exists today**: slugify's README is the only reference; it is a
  single wall of text with no navigation, no search, and no page-level IA.
- **Option semantics are only implied**: `remove` requires a character class
  with the global flag (or a single-char string); `strict` vs. `remove`
  interaction, `trim: false` behavior, and operation ordering are nowhere
  documented — users hit these as bugs.
- **The 12-locale table is invisible**: only discoverable by reading
  `config/locales.json`; the site turns it into a human-readable index with
  concrete examples per language (bg, da, de, es, fr, it, nb, nl, pt, sv, uk, vi).
- **The 641-entry charmap is undocumented**: users cannot know which scripts
  and symbols are covered (Latin diacritics, Greek, Cyrillic, Armenian, Arabic,
  Georgian, currencies) or how contributions are normalized.
- **`extend()` global-mutation semantics are undocumented**: including the
  module-cache cleanup pattern required to isolate custom mappings — a common
  production footgun.
- **Module-format support is underdocumented**: the UMD wrapper (CommonJS /
  AMD / `window.slugify` / ESM default / TypeScript types) has no reference.
- **No patterns guidance**: URL/SEO slugs, file-name safety, stable identifier
  generation, and multilingual slug recipes are reimplemented ad hoc by users.
- **Legacy boundary is invisible**: the ES2015 rewrite means older browsers
  need `slugify@1.4.7`; the site states it explicitly.

## Verification

- Governed validation run sealed under runx-cli 0.9.1 (>= 0.6.13 floor),
  receipt `runx:receipt:sha256:a0a39ce60662d78ee3818abf1b61b94b589f65f7430a2ecca15ebf7027110381`:
  index, all 12 pages, search-index, sitemap, and llms.txt return HTTP 200 over
  HTTPS; sourcey 3.6.12 recorded.
- Every documented example output was executed against the real library
  (slugify.js v1.6.9) and corrected where my initial draft was wrong.
- Hosting: org-owned GitHub Pages (astra-intelligence org) — durable, public,
  HTTPS-enforced, with the source repo recording the pinned commit and exact
  build command so the site is reproducible and reviewable.

## Reproduce

```bash
git clone https://github.com/astra-intelligence/slugify-docs
cd slugify-docs
npm install -g sourcey   # Node 20+
sourcey build -c docs/sourcey.config.ts -o dist
```
