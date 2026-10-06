---
title: Extend
description: Add custom symbol mappings at runtime with slugify.extend() — semantics, scope, and cleanup.
---

# Extend

`slugify.extend()` adds or overrides entries in the default character map for
the **entire process**. It is the escape hatch for symbols, emoji, logos, and
brand spellings that the built-in table does not cover.

```js
slugify.extend({ '☢': 'radioactive' })
slugify('unicode ♥ is ☢') // 'unicode-love-is-radioactive'
```

## Semantics

- New keys map a single input character to a replacement string
- Existing keys are overridden
- The mutation is **global and persistent** for the lifetime of the loaded
  module
- Because the map is embedded in the module, no external file is touched

## The module-cache cleanup pattern

Because `extend` mutates the shared default map, a fresh instance requires
removing the module from the require cache:

```js
delete require.cache[require.resolve('slugify')]
var slugify = require('slugify')
```

This restores the pristine embedded map. Useful in test suites and long-running
processes that must isolate custom mappings between packages.

## When to use extend

- Emoji or brand marks that should become words: `{ '🦄': 'unicorn' }`
- Notation you want to keep: `{ 'C#': 'csharp' }` (post-process, see below)
- Symbols from your domain not covered by the charmap

For multi-character replacements, apply them after `slugify()` as a
post-processing step:

```js
var slug = slugify('Build C# apps').replace(/c\s*#/i, 'csharp')
// 'Build-csharp-apps'
```

## When not to use extend

- For language-specific transliteration, use a [locale](/locales) or edit
  `config/locales.json` — locale tables take priority during lookup
- For characters that should be removed instead of mapped, use the
  [`remove`](/options) option
