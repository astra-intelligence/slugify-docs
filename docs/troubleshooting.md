---
title: Troubleshooting
description: Common pitfalls — regex remove rules, non-string input, extend pollution, and legacy browser support.
---

# Troubleshooting

## `remove` regex does not do anything

The `remove` value must be a **character class** and must carry the **global
flag**:

```js
// Correct
slugify('..', { remove: /[*+~.()'"!:@]/g })

// Incorrect — no global flag, or anchors/quantifiers
slugify('..', { remove: /[*+~.()'"!:@]/ })
slugify('..', { remove: /[.]{2}/g })
```

When `remove` is a string it must be a **single character**:

```js
slugify('a.b.c', { remove: '.' }) // 'abc'
slugify('a.b.c', { remove: '.!' }) // unreliable
```

## `slugify: string argument expected`

The first argument must be a string. Numbers, arrays, and `undefined` throw:

```js
slugify(123)        // TypeError
slugify(null)       // TypeError
slugify(String(123)) // '123'
```

## Slugs come out with unexpected characters

The default strip regex keeps `\w \s $ * + ~ . ( ) ' " ! - : @`. When you need
plain letters and digits only, use `strict: true`:

```js
slugify("Don't stop 'til you get enough", { strict: true })
// 'Dont-stop-til-you-get-enough'
```

`strict` removes apostrophes along with everything else non-alphanumeric.

## `extend` affects other parts of the app

`extend()` mutates the shared module map for the whole process. Isolate it
with the cache-cleanup pattern:

```js
delete require.cache[require.resolve('slugify')]
var slugify = require('slugify')
```

Or put custom mappings in a dedicated module that every caller imports.

## My locale slug looks wrong

Two-letter codes are ISO 639-1 **language** codes, not country codes. Verify
the code and that the locale is in the built-in list (`bg da de es fr it nb
nl pt sv uk vi`). Unknown codes silently fall back to the default table.

## Legacy browser error

The current package targets ES2015. Pin `slugify@1.4.7` for older engines:

```bash
npm install slugify@1.4.7
```

## Behavior I cannot reproduce

slugify is deterministic: the same input and options always produce the same
output. Check whether `extend()` ran earlier in the process — that is the only
global state that can change results between calls.
