---
title: File Names and Identifiers
description: Make file-safe names, stable IDs, and readable keys with custom separators.
---

# File Names and Identifiers

slugify is often used to derive file names, cache keys, and stable identifiers
from human text. The same options that work for URLs apply, with different
separator choices.

## File names

Use an underscore or dot separator when the file format already uses dashes:

```js
const slugify = require('slugify')
```

Pass every option in the options object — the string shorthand and options
cannot be combined in one call:

```js
slugify('Q3 Financial Report', { replacement: '_', lower: true, strict: true })
// 'q3_financial_report'
```

Add a date or sequence prefix yourself:

```js
const datePart = '2026-10-06'
const name = slugify('Board Deck Final', { lower: true, strict: true })
const fileName = `${datePart}-${name}.pdf`
// '2026-10-06-board-deck-final.pdf'
```

## Identifiers and keys

For stable programmatic keys, keep `strict: true` so the result contains only
`[a-z0-9]` (plus spaces that collapse to the separator):

```js
const key = slugify('User Profile — Settings', {
  replacement: '-',
  lower: true,
  strict: true
})
// 'user-profile-settings'
```

## Content-addressable replay

Because slugify is pure and deterministic, you can store `(input, options)`
and reproduce any identifier exactly:

```js
function makeId(input, opts) {
  return slugify(input, opts)
}
// makeId('A/B Testing', { lower: true }) always returns 'a-b-testing'
```

## Notes

- slugify does **not** deduplicate: `slugify('a') === slugify('a')` and two
  different titles can collide after normalization. Add your own uniqueness
  suffix when keys must be unique.
- `replacement` can be any string, including an empty string, for
  concatenated compact keys: `slugify('First Name', { replacement: '' })`
  → `'FirstName'`.
- The default strip pattern keeps `$ * + ~ . ( ) ' " ! - : @` — if a file
  name must avoid those, use `strict: true` or a custom `remove` regex.
