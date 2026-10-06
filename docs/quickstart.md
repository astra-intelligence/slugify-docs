---
title: Quickstart
description: Install slugify and generate your first slugs in three lines.
---

# Quickstart

## 1. Install

```bash
npm install slugify
```

Or with yarn:

```bash
yarn add slugify
```

## 2. Require and slugify

```js
var slugify = require('slugify')

slugify('some string') // 'some-string'
```

The default separator is `-`. Spaces and other whitespace are collapsed to a
single separator, and surrounding separator characters are trimmed.

## 3. Pick a separator

Pass a string as the second argument to change the replacement character:

```js
slugify('some string', '_') // 'some_string'
slugify('some string', '+') // 'some+string'
```

This is shorthand for `{ replacement: '_' }`.

## 4. Configure with an options object

```js
slugify('some string', {
  replacement: '-',
  remove: undefined,
  lower: false,
  strict: false,
  locale: 'vi',
  trim: true
})
```

`lower: true` makes slugs lowercase for URLs; `strict: true` strips every
character that is not a letter, digit, or space; `locale` switches
language-specific transliteration; `remove` deletes matching characters.

```js
slugify('Some String', { lower: true }) // 'some-string'

slugify('I love ☢ Nuclei', { strict: true }) // 'I love Nuclei'

slugify('На здоровье', { locale: 'uk' }) // transliterates to Latin characters
```

## 5. Extend the character map

Add symbols that are not in the built-in table:

```js
slugify.extend({ '☢': 'radioactive' })
slugify('unicode ♥ is ☢') // 'unicode-love-is-radioactive'
```

## Browser

In the browser the module also exports a global:

```html
<script src="slugify.js"></script>
<script>
  slugify('some string') // 'some-string'
</script>
```

## You are ready

That is the whole API surface you need for daily work. For exact semantics of
every option see [Options](/options), and for the full function signature see
[API Reference](/api).
