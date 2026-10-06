---
title: API Reference
description: The exact signature of slugify(), both call forms, return values, and module exports.
---

# API Reference

## slugify(string, options?)

```ts
slugify(string: string, options?: slugify.Options | string): string
```

The main function accepts the input string and an optional options object, or a
string separator as shorthand.

| Argument | Type | Description |
|----------|------|-------------|
| `string` | `string` | The string to slugify. Non-string input throws a `TypeError`. |
| `options` | `object` \| `string` | Options object, or a string used as `replacement`. |

### Returns

A `string` with spaces replaced by the separator and disallowed characters
removed or transliterated.

```js
slugify('some string')        // 'some-string'
slugify('some string', '_')   // 'some_string'
slugify('some string', { replacement: '-', lower: true }) // 'some-string'
```

## slugify.extend(charMap)

```ts
slugify.extend(args: { [key: string]: any }): void
```

Extends or overrides the default character map for the entire process. See
[Extend](/extend) for details and the module-cache cleanup pattern.

## Types and exports

The package ships TypeScript definitions (`slugify.d.ts`) and supports four
module flavors from one source file:

| Environment | Form |
|-------------|------|
| Node / CommonJS | `var slugify = require('slugify')` |
| ES modules | `import slugify from 'slugify'` (default export mirrors the function) |
| AMD | `define(['slugify'], function (slugify) { ... })` |
| Browser global | `window.slugify` |

The TypeScript declaration exposes the callable function, the `extend`
namespace member, and the default re-export:

```ts
import slugify from 'slugify'

slugify('some string', { lower: true, strict: true })
```

## Behavior notes

- The string argument must be a string; anything else throws
  `slugify: string argument expected`.
- Transliteration happens character by character; characters absent from both
  the locale table and the character map pass through unchanged unless
  `remove` or `strict` deletes them.
- With `strict: true`, only `[A-Za-z0-9\s]` survive before space collapsing.
- The default strip pattern removes characters outside
  `[\w\s$*+~.()'"!\-:@]`; see [Options](/options) for how to change it.
