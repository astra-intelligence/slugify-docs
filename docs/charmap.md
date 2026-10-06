---
title: Character Map
description: The 641-entry transliteration table — scripts, symbols, currencies, and how unknown characters behave.
---

# Character Map

Every build of slugify embeds a sorted character map with **641 entries**
(`config/charmap.json`) plus the locale overrides. The table is generated from
`config/charmap.json` and baked into `slugify.js` at build time, so the shipped
module needs no external data files.

## Coverage

The map covers:

- **Latin diacritics** — `À`→`A`, `á`→`a`, `Ø`→`O`, `ß`→`ss`, Vietnamese
  tones (`ấ`→`a`, `ệ`→`e`, …), and extended European letters
- **Greek** — `Α`→`A`, `Φ`→`F`, `Ψ`→`PS`, `ω`→`w`, accents included
- **Cyrillic** — `А`→`A`, `Ж`→`Zh`, `Ц`→`C`, `Ю`→`Yu`, `ё`→`yo`, plus
  Kazakh/Uzbek/Bashkir extended Cyrillic (`Қ`→`KH`, `Ң`→`NG`, `Ү`→`UE`)
- **Armenian** — `Ա`→`A`, `Ժ`→`JH`, `և`→`EV`
- **Arabic** — letters and diacritics (`ب`→`b`, `ش`→`sh`, `ً`→`an`) and
  Arabic-Indic digits `٠`–`٩` and `۰`–`۹`
- **Georgian** — `ა`→`a`, `შ`→`sh`, `წ`→`ts`
- **Currency and symbols** — `$`→`dollar`, `€`→`euro`, `₿`→`bitcoin`,
  `♥`→`love`, `™`→`tm`, `©`→`(c)`, `…`→`...`
- **Punctuation** — smart quotes and dashes normalize to ASCII (`'`, `"`, `-`)

## Unknown characters

A character that has no mapping passes through unchanged. The default strip
pattern then usually removes it because it is outside
`[\w\s$*+~.()'"!\-:@]`:

```js
slugify('☢ warning') // 'warning'  (☢ is not in the map)
```

Add it with [extend()](/extend) when you need it:

```js
slugify.extend({ '☢': 'radioactive' })
slugify('☢ warning') // 'radioactive-warning'
```

## Order and deduplication

The map is sorted and deduplicated by the build script (`bin/build.js`), so
contributions should be added in any order and `npm test` normalizes the file.

## Contributing characters

1. Add the character to `config/charmap.json`
2. Run `npm test`
3. The tests rebuild `slugify.js` and sort `charmap.json`
4. Commit all modified files

If the default transliteration is wrong for your language, add the override to
`config/locales.json` instead — see [Locales](/locales).
