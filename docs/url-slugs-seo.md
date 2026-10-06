---
title: URL Slugs and SEO
description: Patterns for search-friendly, stable URL slugs — lowercasing, punctuation removal, and readable titles.
---

# URL Slugs and SEO

A slug is the human-readable part of a URL. Good slugs are readable, stable,
and keyword-bearing: `/articles/how-to-bake-sourdough` beats
`/articles/48713` for both users and search engines.

## The basic recipe

```js
const slugify = require('slugify')

function urlSlug(title) {
  return slugify(title, { lower: true, strict: true })
}

urlSlug('How to Bake Sourdough — A Beginner’s Guide')
// 'how-to-bake-sourdough-a-beginners-guide'
```

`strict: true` keeps only letters, digits, and spaces, so em-dashes, smart
quotes, and other punctuation disappear entirely instead of surviving removal.

## Keep useful punctuation with remove

Sometimes you want to allow `_`, `.`, or `@` in URLs (usernames, file
references). Instead of `strict`, pass a targeted `remove` pattern:

```js
// Keep letters, digits, underscores, and dots; drop everything else quoted
slugify('alpha_beta@example.com', { lower: true, remove: /[^a-z0-9_.]/gi })
// 'alpha_betaexample.com' — @ removed by the regex
```

When `remove` is a regex it must be a **character class with the global flag**.

## Stable slugs over time

Slug changes break links and lose ranking. Prefer keeping the first slug a
title ever receives; if the title changes, keep the old slug in a redirect
table rather than regenerating it. slugify is deterministic — the same input
and options always produce the same slug — so you can safely regenerate for
verification:

```js
// Store the input + options, not only the slug, to allow exact replay
const input = 'The Future of APIs'
const slug = slugify(input, { lower: true })
// later: slugify(input, { lower: true }) === slug
```

## Multilingual URLs

Locale-aware slugs keep meaning in the URL while staying ASCII:

```js
slugify('Экспорт в Европе', { locale: 'uk', lower: true })
// transliterated Cyrillic slug with Ukrainian overrides
```

See [Locales](/locales) for the full list of supported languages.

## SEO checklist

- Lowercase everything with `lower: true`
- Strip punctuation you do not need with `strict: true` or a targeted `remove`
- Keep slugs short but meaningful — 3 to 6 words usually carries intent
- Do not regenerate slugs on every render; persist the first slug
- Collisions are not handled by slugify — add a numeric suffix in your own
  code when titles repeat:
  ```js
  let n = 1
  let slug = base
  while (used.has(slug)) slug = `${base}-${n++}`
  ```
