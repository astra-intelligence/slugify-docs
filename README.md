# slugify documentation site

A documentation site for the [slugify](https://github.com/simov/slugify)
library, built with [Sourcey](https://sourcey.com/docs), the static
documentation generator.

## What this is

slugify (npm: `slugify`, MIT, zero dependencies) is a widely used
string-to-slug library. Its canonical README covers the basics, but the option
surface — 6 options, 12 locales, a 641-entry transliteration table, the
runtime `extend()` API, and four module formats — deserves a navigable
reference. This site fills that gap: generated from the package source
(`slugify.js`, `slugify.d.ts`, `config/charmap.json`, `config/locales.json`)
at the pinned commit below, with a search index, sitemap, and llms.txt.

Live site: https://astra-intelligence.github.io/slugify-docs/

## Pinned source

| Field | Value |
|-------|-------|
| Repository | https://github.com/simov/slugify |
| Commit | `8d8c538c53ddf5c1023c8b4769681bb53877746b` |
| Date | 2026-06-29 |
| Version | 1.6.9 |
| License | MIT |

## Build

```bash
npm install -g sourcey   # Node 20+
sourcey build -o dist    # from the repo root, reads docs/sourcey.config.ts
```

Generated output lives in `dist/` (served on the `gh-pages` branch).

## Documented concepts

`slugify()`, string-shorthand separator, the options object (`replacement`,
`remove` as RegExp or single char, `lower`, `strict`, `locale`, `trim`),
`extend()`, charmap coverage, locale tables, ISO 639-1 codes, Unicode
normalization, module formats (CommonJS / AMD / browser global / ES modules /
TypeScript), URL/SEO patterns, file-name and identifier patterns,
multilingual slugs, and troubleshooting.

## Docs source

- `docs/sourcey.config.ts` — site configuration
- `docs/*.md` — authored documentation pages

This repository exists so the documentation has a durable home on a credible
organization-owned host (GitHub Pages under astra-intelligence).
