# 樣式（Patterns）與 旗標（flags）

正規表達式（Regular expressions）是提供一種有力的方式在文字上去搜尋與取代的模式。

在 JavaScript，它們可以藉由 [RegExp](mdn:js/RegExp) 物件使用，也整合進了字串的方法中。

## 正規表達式

一個正規表達式（又稱 "regexp"，或只寫做 "reg"）由一個**樣式**與可選用的**旗標**組成。

這裡有兩種語法可以用來建立一個正規表達式物件。

較長的語法：

```js
regexp = new RegExp("pattern", "flags");
```

和較短的，使用斜線 `"/"`：

```js
regexp = /pattern/; // 沒有旗標
regexp = /pattern/gmi; // 搭配旗標 g、m 和 i （等一下會講到）
```

斜線 `pattern:/.../` 會告訴 JavaScript 我們要建立一個正規表達式。它們扮演著跟字串引號相同的角色。

兩種請況下的 `regexp` 都會變成內建 `RegExp` 類別的實體。

兩種語法主要不同之處在於一種使用斜線 `/.../`，不允許插入表達式（像是字串樣板字面值 `${...}`）。他們是完全靜態的。

斜線用在當我們撰寫程式碼時，所知道的正規表達式 -- 這是最常見的情況。而 `new RegExp`，經常用在我們需要用動態產生的字串建立一個 '即時' 的正規表達式。例如：

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // 如果在提示窗中回答 "h2"，則等同 /<h2>/
```

## 旗標

正規表達式可能會有影響搜尋結果的旗標。

在 JavaScript 中只有6種：

`pattern:i`：使用這個旗標會使搜尋不區分大小寫：`A` 與 `a` 不分（參見下面的範例）

`pattern:g`：使用這個旗標會使搜尋查找所有匹配結果, 沒有這個的話 -- 只有第一個匹配結果會回傳。
搜尋
`pattern:m`：多行模式 (介紹在此章節 <info:regexp-multiline-mode>)。

`pattern:s`：啟用 "dotAll" 模式, 允許句點符號 `pattern:.` 去匹配換行字元 `\n`（介紹在此章節 <info:regexp-character-classes>）。

`pattern:u`：啟用完整 unicode 支援。該旗標啟用了正確的代理對（surrogate pairs）處理。關於更多在此章節 <info:regexp-unicode>。

`pattern:y`："Sticky" 模式：搜尋在文本中的確切位置（介紹在此章節 <info:regexp-sticky>）

```smart header="顏色"
這裡的配色方式是：

- 正規表達式 -- `pattern:紅色`
- 字串(我們搜尋的) -- `subject:藍色`
- 匹配結果 -- `match:綠色`
```

## 搜尋: str.match

前面有提到，正規表達式有整合在字串的方法。

`str.match(regexp)` 方法用 `regexp` 正規表達式尋找了匹配結果在整個 `str` 字串中。

它有3種工作模式：

1. 如果正規表達式有旗標 `pattern:g`，此回傳一個全部匹配結果的陣列：
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (2 個匹配結果的部份字串在一個陣列)
    ```
    請注意兩個 `match:We` 和 `match:we` 會被找到，是因為旗標 `pattern:i` 使正規表達式不分大小寫。

2. 如果沒有旗標 `pattern:g` 回傳形式會是只有第一個匹配結果的陣列，該陣列中包含一些額外資訊在屬性中，完全匹配結果在索引 `0`：
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // 不使用旗標 g

    alert( result[0] );     // We (1st 匹配結果)
    alert( result.length ); // 1

    // 額外資訊：
    alert( result.index );  // 0 (匹配位置)
    alert( result.input );  // We will, we will rock you (來源字串)
    ```
    如果正規表達式的一部分在括号中，則陣列除了 `0` 外還會有其他索引。我們將在此章節介紹 <info:regexp-groups>。

3. 最後，如果沒有匹配結果，會回傳 `null`（與有無 `pattern:g` 旗標無關）。
    這是很重要的細節。如果沒有匹配結果，我們不會收到一個空陣列，而是收到 `null`。忘記這件事情會導致錯誤，例如：

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    如果我們想要結果永遠是一個陣列，我們可以這麼寫：

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // 現在會動了
    }
    ```

## 取代: str.replace

`str.replace(regexp, replacement)` 方法用 `regexp` 找到了匹配結果，並在 `str` 字串使用 `placement` 字串取代。（如果是 `pattern:g` 旗標的話，會是全部匹配結果，反之只會是第一個）。

例如：

```js run
// 沒有 g 旗標
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// 有 g 旗標
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

第二個參數是 `replacement` 字串。我們可以在其中使用特殊字元组来插入匹配結果片段：

| 符號 | 取代字串的操作 |
|--------|--------|
|`$&`|插入整個匹配結果|
|<code>$&#096;</code>|插入匹配結果前面的字串|
|`$'`|插入匹配結果後面的字串|
|`$n`|如果 `n` 是一個 1 到 2 位元的數字，那會插入第 n 個括號中的內容，關於更多在此章節 <info:regexp-groups>|
|`$<name>`|插入給定 `name` 括號中的內容, 關於更多在此章節 <info:regexp-groups>|
|`$$`|插入字元 `$` |

`pattern:$&` 的範例：

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## 測試: regexp.test

`regexp.test(str)` 方法尋找至少一個匹配結果，如果有找到，回傳 `true`，反之則是 `false`。

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

之後的章節我們將學惜更多正規表達式，通過更多的範例，了解其他方法。

關於方法的完整資訊提供在此文章 <info:regexp-methods>。

## 總結

- 一個正規表達式由一個樣式和可選用的旗標組成，可選用旗標：`pattern:g`、`pattern:i`、`pattern:m`、`pattern:u`、`pattern:s`、`pattern:y`。
- 除了旗標和特殊符號（我們等等會學到），用正規表達式來搜尋跟部份字串搜尋相同。
- `str.match(regexp)` 方法用 `regexp` 正規表達式尋找了匹配結果在整個 `str` 字串中。
- `str.replace(regexp, replacement)` 方法用 `regexp` 找到了匹配結果，並在 `str` 字串中使用 `placement` 字串取代。（如果是 `pattern:g` 旗標的話，會是全部匹配結果，反之只會是第一個）。
- `regexp.test(str)` 方法尋找至少一個匹配結果，如果有找到，回傳 `true`，反之則是 `false`。
