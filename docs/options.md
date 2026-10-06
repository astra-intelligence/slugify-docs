---
title: Options
description: Every slugify option — replacement, remove, lower, strict, locale, trim — with exact semantics and examples.
---

# Options

All options are optional. Defaults are shown in the table.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `replacement` | `string` | `'-'` | Character inserted where spaces and other whitespace collapse. |
| `remove` | `RegExp` \| `string` | `undefined` | Characters to remove from the result. |
| `lower` | `boolean` | `false` | Lowercase the final slug. |
| `strict` | `boolean` | `false` | Strip every character that is not `A-Z`, `a-z`, `0-9`, or whitespace. |
| `locale` | `string` | `undefined` | ISO 639-1 language code selecting a transliteration override table. |
| `trim` | `boolean` | `true` | Trim leading and trailing separator characters from the result. |

## replacement

The string used where runs of whitespace are collapsed into. It is also
substituted for mapped characters whose transliteration equals the replacement
(so a mapped `-` does not create double separators).

```js
slugify('some string')               // 'some-string'
slugify('some string', '_')          // 'some_string'
slugify('some string', '')           // 'somestring'
```

## remove

Deletes matching characters before whitespace collapsing. Two accepted forms:

### Regular expression

A **character class** with the **global flag**:

```js
slugify('..', { remove: /[*+~.()'"!:@]/g }) // ''
```

```js
slugify('Hello *world*!', { remove: /[*!]/g }) // 'Hello-world'
```

Rules:

- Must be a character class (`[...]`) and only a character class
- Must use the global flag (`/g`)
- Otherwise behavior is not guaranteed

### String

A **single character** to remove:

```js
slugify('a.b.c', { remove: '.' }) // 'abc'
```

## lower

Lowercases the result after all transliteration and stripping:

```js
slugify('Some STRING', { lower: true }) // 'some-string'
```

Recommended for URLs to keep slugs consistent and case-insensitive.

## strict

Keeps only letters, digits, and whitespace. Everything else is removed before
space collapsing:

```js
slugify('I ♥ JavaScript ☢', { strict: true }) // 'I-love-JavaScript'
```

Here `♥` maps to `love` (letters survive `strict`), while `☢` is unmapped
and gets removed.

## locale

Selects the per-language override table. Used for characters whose default
transliteration is not correct for a specific language:

```js
slugify('Цена', { locale: 'bg' }) // transliterated with the Bulgarian table
```

Available locales: `bg`, `da`, `de`, `es`, `fr`, `it`, `nb`, `nl`, `pt`,
`sv`, `uk`, `vi`. See [Locales](/locales).

## trim

When `true` (default), leading and trailing separators are removed from the
final slug:

```js
slugify(' some string ')        // 'some-string'
slugify(' some string ', { trim: false }) // '-some-string-'
```

## Order of operations

1. Character-by-character transliteration (locale table first, then charmap)
2. Default or custom `remove` strip
3. `strict` filter (letters, digits, whitespace only)
4. `trim` of leading/trailing whitespace
5. Collapse whitespace runs into the `replacement`
6. `lower` case conversion
