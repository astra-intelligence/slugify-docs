---
title: Browser and Module Formats
description: Use slugify in Node, the browser, AMD loaders, ES modules, and TypeScript.
---

# Browser and Module Formats

slugify is a single UMD-style file that adapts to the module system that
loaded it: CommonJS, AMD, or a plain browser global.

## Node (CommonJS)

```js
var slugify = require('slugify')
slugify('some string') // 'some-string'
```

## ES modules

The package sets `module.exports['default']` to the same factory, so both
import styles work:

```js
import slugify from 'slugify'

slugify('some string', { lower: true }) // 'some-string'
```

## AMD

```js
define(['slugify'], function (slugify) {
  slugify('some string') // 'some-string'
})
```

## Browser global

Without a module loader the script attaches `window.slugify`:

```html
<script src="slugify.js"></script>
<script>
  window.slugify('some string') // 'some-string'
</script>
```

## TypeScript

Type definitions ship in `slugify.d.ts` with a callable function type, the
`extend` member, and a default re-export:

```ts
import slugify from 'slugify'

const options: {
  replacement?: string
  remove?: RegExp | string
  lower?: boolean
  strict?: boolean
  locale?: string
  trim?: boolean
} = { lower: true, strict: true }

const slug: string = slugify('Some String', options)
```

The options object type accepts `remove` as either a `RegExp` or a string, and
the second argument may also be passed as a plain `string`.

## Legacy browsers

Version 1.4.7 is the last release before the ES2015 rewrite. Pin that version
when you must support older JavaScript engines:

```bash
npm install slugify@1.4.7
```

See the [release notes](https://github.com/simov/slugify/releases/tag/v1.4.7)
for the exact change boundary.
