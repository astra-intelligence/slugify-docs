---
title: Introduction
description: What slugify is, what it does, and why it has no dependencies.
---

# slugify

slugify is a small, dependency-free JavaScript library that converts any string
into a URL-friendly, Unicode-aware slug. It is used for search-engine friendly
URLs, stable file names, HTML anchors, and anywhere a human-readable string must
become a safe identifier.

```js
var slugify = require('slugify')

slugify('some string') // some-string
```

The library ships as **vanilla ES2015 JavaScript** with no runtime
dependencies. The entire transliteration table ships inside the package, so it
works offline, in Node, and in the browser.

## What it does

- Replaces spaces and separator characters with a `-` by default
- Coerces foreign symbols to their English equivalents using a built-in
  641-entry character map
- Strips or removes characters you do not want in the result
- Supports 12 built-in locales with per-language transliteration overrides
- Lets you extend or override the character map at runtime with `extend()`
- Works in CommonJS, AMD, and plain browser environments via `window.slugify`

## Feature highlights

- **No dependencies** — one file, one purpose, nothing to install alongside it
- **Unicode transliteration** — Latin diacritics, Greek, Cyrillic, Armenian,
  Arabic, Georgian, currency symbols, and more map to ASCII equivalents
- **Locale-aware** — language-specific overrides for Bulgarian, Danish, German,
  Spanish, French, Italian, Norwegian, Dutch, Portuguese, Swedish, Ukrainian,
  and Vietnamese
- **Strict mode** — keep only `A-Z`, `a-z`, `0-9`, and spaces
- **Runtime extension** — add your own symbol mappings with `slugify.extend()`

## Install

```bash
npm install slugify
```

If you need to support older browsers without ES2015, use
[version 1.4.7](https://github.com/simov/slugify/releases/tag/v1.4.7),
the last release published with legacy language features.

## Hello world

```js
var slugify = require('slugify')

slugify('Hello, World!')    // 'Hello-World'
slugify('Hello, World!', '_')  // 'Hello_World'
slugify('你好，世界')       // strips unknown characters and collapses spaces
```

## Next steps

- Walk through your first slugs in the [Quickstart](/quickstart)
- Read the full function signature in [API Reference](/api)
- Browse every option in [Options](/options)
