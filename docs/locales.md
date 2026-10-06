---
title: Locales
description: The 12 built-in locales, how overrides work, and how to pick the right language code.
---

# Locales

slugify ships with a global character map plus 12 language-specific override
tables. A locale override changes the transliteration **for that language
only**, which matters when the default English-oriented mapping is wrong for
the local pronunciation or orthography.

## Built-in locales

| Code | Language | Notable overrides |
|------|----------|-------------------|
| `bg` | Bulgarian | `Й`→`Y`, `Ц`→`Ts`, `Щ`→`Sht`, `Ъ`→`A`, `Ь`→`Y` |
| `da` | Danish | `Ø`→`OE`, `Å`→`AA`, `&`→`og`, `%`→`procent` |
| `de` | German | `Ä`→`AE`, `Ö`→`OE`, `Ü`→`UE`, `ß`→`ss`, `&`→`und`, `♥`→`liebe` |
| `es` | Spanish | `%`→`por ciento`, `&`→`y`, `£`→`libras`, `♥`→`amor` |
| `fr` | French | `%`→`pourcent`, `&`→`et`, `♥`→`amour` |
| `it` | Italian | `&`→`e` |
| `nb` | Norwegian Bokmål | `Æ`→`AE`, `Ø`→`OE`, `Å`→`AA`, `&`→`og` |
| `nl` | Dutch | `&`→`en` |
| `pt` | Portuguese | `%`→`porcento`, `&`→`e`, `♥`→`amor` |
| `sv` | Swedish | `Å`→`AA`, `Ä`→`AE`, `Ö`→`OE`, `&`→`och` |
| `uk` | Ukrainian | `И`→`Y`, `Ц`→`Ts`, `Х`→`Kh`, `Щ`→`Shch`, `Г`→`H` |
| `vi` | Vietnamese | `Đ`→`D`, `đ`→`d` |

## How the override works

For each character, slugify checks the locale table first; if the character is
not present there it falls back to the global `charmap.json`:

```
locale[ch] → charMap[ch] → ch
```

```js
slugify('Straße', { locale: 'de' }) // 'Strasse'

// Default map already transliterates ß → ss; the German locale keeps that and
// adds umlauts as digraphs: Ä → AE
slugify('Ärger', { locale: 'de' }) // 'AErger'
```

The Vietnamese locale is minimal: the default table already handles
Vietnamese diacritics, so only `Đ`/`đ` needed a `D`/`d` override.

## Country codes and ISO 639-1

Use **ISO 639-1 two-letter language codes** (not country codes). For example,
Portuguese is `pt`, not `BR` or `PT` by country. Find your code on the
[ISO 639-1 list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

Unknown locale codes fall back to the default character map without error:

```js
slugify('привет', { locale: 'zz' }) // falls back to the default table
```

## Adding characters to the map

The global table lives in `config/charmap.json`; locale overrides live in
`config/locales.json`. Add the symbol to `charmap.json` first, then add a
locale override only when the transliteration must differ for your language.
Run the test suite so the build regenerates and sorts both files:
`npm test`.
