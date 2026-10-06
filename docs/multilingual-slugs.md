---
title: Multilingual Slugs
description: Transliterate Bulgarian, German, Vietnamese, Arabic, and other scripts into readable ASCII slugs.
---

# Multilingual Slugs

slugify was built for international text: it transliterates non-Latin scripts
to English-readable ASCII instead of dropping them.

## Non-Latin scripts

Cyrillic, Greek, Armenian, Arabic, and Georgian all map to Latin equivalents
out of the box:

```js
const slugify = require('slugify')

slugify('Привет мир')          // Latin-transliterated slug
slugify('مرحبا بالعالم')       // Arabic → Latin transliteration
slugify('Γειά σου Κόσμε')      // Greek → Latin transliteration
```

Because the table is embedded in the package, no locale file is needed for
basic script coverage.

## Language-specific polish

Use `locale` when the default map is close but not idiomatic for the language
— for example Bulgarian `Щ` defaults to `Sh` but the Bulgarian locale maps it
to `Sht`, and German umlauts become digraphs only in the German locale:

```js
slugify('Щастие', { locale: 'bg' })     // 'Shtastie'
slugify('Äpfel & Birnen', { locale: 'de', lower: true })
// 'aepfel-und-birnen'
```

## Vietnamese

Vietnamese diacritics are handled by the default table; the `vi` locale adds
the `Đ`/`đ` correction:

```js
slugify('Thành phố Hồ Chí Minh', { locale: 'vi', lower: true })
// lowercase Latin slug with diacritics stripped
```

## Combining locale with SEO options

```js
function localizedUrl(title, lang) {
  return slugify(title, { lower: true, strict: true, locale: lang })
}

localizedUrl('Мы делаем софт', 'uk')
localizedUrl('Ökostrom-Tarife', 'de')
```

## Unicode normalization

slugify calls `String.prototype.normalize()` before transliteration, so
composed and decomposed characters (NFD vs NFC) produce equivalent slugs.
Word separators and zero-width characters are dropped by the default strip
pattern.

## When transliteration is not enough

Scripts without Latin equivalents — CJK ideographs, emoji, brand logos —
usually pass through unchanged and are then removed by the default strip
pattern. Add your own mapping with [extend()](/extend) for the handful of
symbols you actually need:

```js
slugify.extend({ '🦄': 'unicorn' })
slugify('The 🦄 Project') // 'The-unicorn-Project'
```
