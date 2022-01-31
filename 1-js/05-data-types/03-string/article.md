# 字串（String）

在 JavaScript 中，文字數據被存為字串（String）類型，並沒有針對單個字元另外分類。

字串的內部格式始終為 [UTF-16](https://en.wikipedia.org/wiki/UTF-16)，與頁面編碼無關。


## 引號

讓我們回想一下引號的種類。

字串可以被單引號、雙引號或反引號前後包圍：

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

單引號和雙引號本質是相同的。但反引號允許我們把表達式包裹起來，像這樣 `${…}`，然後嵌入字串中：

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

使用反引號的另一個優點，是它們是允許多行字串：

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // 客人名單，多行
```

看起來很自然吧？ 但是單、雙引號不能這樣做。

如果我們使用單引號或雙引號時做換行，將會出現錯誤：

```js run
let guestList = "Guests: // 錯誤：意料之外的令牌（標記、符號） 不合法（Unexpected token ILLEGAL）
  * John";
```

單引號和雙引號來自創造語言的古早時代，當時沒有考慮對多行字串的需求。 反引號出現得較晚，因此用途更廣。

反引號還允許我們，在第一個反引號前指定 "模板功能 (template function)"。 語法為 <code>func&#96;string&#96;</code>。 函數 `func` 會被自動調用，接收字串和嵌入式表達式並處理他們，這稱為 "標記模板 (tagged templates)"。 此功能使實現自定義模板更加容易，但很少在實踐中使用。您可以在 [手冊](mdn:/JavaScript/Reference/Template_literals#Tagged_templates) 中了解更多信息。

<<<<<<< HEAD
=======
Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

## 特殊字元

用單、雙引號仍能建立多行的字串，透過所謂的 "換行符 (newline character)"，寫為 `\n`，表示換行：

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // 一個多行的來賓列表
```

例如， 這兩行做法是相同的，只是書寫方式不同：

```js run
let str1 = "Hello\nWorld"; // 使用一個 "換行符" 創建的兩行字串

// 使用反引號並且正常進行換行所創建的兩行字串
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

還有其他一些不太常見的 "特殊" 字元。

這裡是完整的列表：

| 字元 | 描述 |
|-----------|-------------|
<<<<<<< HEAD
|`\n`| 換行、新行|
|`\r`| 回車：不單獨使用。 Windows 純文字檔案使用兩個字元組合 `\r\n` 來表示換行。 |
|`\'`, `\"`| 引號。|
|`\\`| 反斜槓。|
|`\t`| Tab 製表跳格。|
|`\b`, `\f`, `\v`| 倒退，跳頁，垂直製表跳格 -- 為保持兼容性，目前已不被使用。|
|`\xXX`| 一個 Unicode 字元，`XX` 為十六進制的 unicode，例如 `'\x7A'` 與 `'z'` 相同。|
|`\uXXXX`| 一個 unicode 符號，`XXXX` 為以 UTF-16 編碼的十六進制代碼，例如 `\u00A9` -- 為 unicode 版權符號 `©`，十六進制數字必須是 4 個。|
|`\u{X…XXXXXX}` (1 到 6 個十六進制字元)| 用給定的 UTF-32 編碼的 unicode 符號。因為有些稀有字元是兩個 unicode 符號，佔用 4 個字節。這樣我們可以插入長串的程式碼。|

unicode 的例子：

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, 一個少見的中文象形文字（長的 unicode）
alert( "\u{1F60D}" ); // 😍, 一個笑臉符號（另一個長的 unicode）
=======
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`, `\"`|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- kept for compatibility, not used nowadays. |
|`\xXX`|Unicode character with the given hexadecimal Unicode `XX`, e.g. `'\x7A'` is the same as `'z'`.|
|`\uXXXX`|A Unicode symbol with the hex code `XXXX` in UTF-16 encoding, for instance `\u00A9` -- is a Unicode for the copyright symbol `©`. It must be exactly 4 hex digits. |
|`\u{X…XXXXXX}` (1 to 6 hex characters)|A Unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two Unicode symbols, taking 4 bytes. This way we can insert long codes. |

Examples with Unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c
```

所有特殊字元均以反斜槓字元 `\` 開頭。也稱為 "跳脫字元"。

當我們想在字串中安插引號，也可以使用它。

例如：

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

就像你看到的，我們必須在內部的引號前加上反斜槓 `\`，否則它將結束字串。

<<<<<<< HEAD
當然，只有跟該封閉引號相同的引號才需要跳脫。因此，作為更優雅的解決方案，我們可以轉為使用雙引號或反引號：
=======
Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

請注意，反斜槓 `\` 是為了使 JavaScript 正確讀取字串，然後就消失。儲存的字串中沒有 `\`。你可以在上面的 `alert` 範例中，清楚地看到這點。

但若我們需要在字串中顯示實際的反斜槓 `\` 怎麼辦？

這是可行的，我們只需將它像這樣書寫兩次 `\\`：

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## 字串長度

`length` 屬性，表示了一個字串的長度：

```js run
alert( `My\n`.length ); // 3
```

注意，`\n` 為一個 "特殊" 字元，因此長度的確是 `3`。

```warn header="`length` 是一個屬性"
有其他程式語言背景的人，有時會打字錯誤，用 `str.length()` 而不是 `str.length`。那是行不通的。

請注意，`str.length` 是數值屬性，而不是函數，不需在後面添加括號。
```

## 訪問字元

在位置 `pos` 取一個字元，請使用方括號 `[pos]` 或調用方法 [str.charAt(pos)](mdn:js/String/charAt)。 第一個字元是由位置零開始：

```js run
let str = `Hello`;

// 第一個字元
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// 最後一個字元
alert( str[str.length - 1] ); // o
```

使用方括號，是獲取字元的現代化方式，而 `charAt` 的存在主要出於歷史性原因。

它們之間的唯一區別是，如果找不到字元，則 `[]` 將返回 `undefined`，而 `charAt` 返回一個空字串：

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (一個空字串)
```

我們也可以使用 `for..of` 來迭代過每個字元

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char 會被替換成 "H"，然後是 "e"，然後是 "l" 等等)
}
```

## 字串不可變

JavaScript中，字串不能被更改。 一個字元都無法更改。

讓我們試著改變字串，以證明它不起作用：

```js run
let str = 'Hi';

str[0] = 'h'; // 錯誤
alert( str[0] ); // 不起作用
```

通常的解決方法是創建一個全新的字串，再將它分配給 `str` 替換掉舊的字串。

例如：

```js run
let str = 'Hi';

str = 'h' + str[1]; // 替換字串

alert( str ); // hi
```

在以下章節中，我們將看到更多例子。

## 改變大小寫

[toLowerCase()](mdn:js/String/toLowerCase) 方法和 [toUpperCase()](mdn:js/String/toUpperCase) 方法可以改變大小寫：

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

或者，我們想要一個單獨的小寫字元：

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## 檢索一個子字串

查詢一個字串當中的子字串，有很多方法。

### str.indexOf

第一個方法是 [str.indexOf(substr, pos)](mdn:js/String/indexOf)。

它在 `str` 中尋找 `substr`，從給定的位置 `pos` 開始找，找到則回傳該匹配字串的索引位置；沒找到則回傳 `-1`。

例如：

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0， 因為一開始 'Widget' 就被找到
alert( str.indexOf('widget') ); // -1，沒找到，檢索是有區分大小寫的。

alert( str.indexOf("id") ); // 1, "id" 在索引位置 "1" 處就被找到 (..idget 中的 id) 。
```

<<<<<<< HEAD
第二個參數是可選的，允許我們從給定的位置開始檢索。
=======
The optional second parameter allows us to start searching from a given position.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

舉例來說，`"id"` 第一次出現的位置是 `1`，要尋找下一個，我們從位置 `2` 開始找。

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

如果我們好奇所有的位置，我們可以在一個迴圈中用 `indexOf`。每一次新呼叫，都發生在前一個找到的位置之後。

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // 我們來找它

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // 從下一個位置繼續檢索
}
```

相同的演算法，可以寫得更短：

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
還有一個類似的方法 [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) ，它是從字串末端開始檢索。

它列出的事件，順序會是相反的。
```

在 `if` 測試中，`indexOf` 會有一些不便。 我們不能像這樣，將它放在 `if` 中：

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // 沒有作用!
}
```

上面範例中的 `alert` 沒有顯示，因為 `str.indexOf("Widget")` 回傳 `0`（意思是在起始位置就匹配成功）。是的，但是 `if` 認為 `0` 是 `false` 值。

所以我們實際上應該去檢查 `-1` ，像這樣：

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // 現在可以運作了！
}
```

#### 按位（bitwise）NOT 技巧

<<<<<<< HEAD
這裡使用一個古老的技巧， [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` 運算子。它將數字轉換為一個 32 位元 （32-bit）的整數（如果有小數點則全部捨棄），然後反轉它的二進製表示中的所有位元。
=======
One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

在實踐中，這意味著一件簡單的事情：對於 32 位元整數來說 `~n` 與 `-(n+1)` 完全相同。

例如：

```js run
alert( ~2 ); // -3, 等同 -(2+1)
alert( ~1 ); // -2, 等同 -(1+1)
alert( ~0 ); // -1, 等同 -(0+1)
*!*
alert( ~-1 ); // 0, 等同 -(-1+1)
*/!*
```

如我們看到的，只有當 `n==-1` 時 `~n` 是零（適用於任何 32 位元，有符號的整數 `n`）

所以，測試 `if ( ~str.indexOf("...") )` 會是 truthy，只有 `indexOf` 結果不是 `-1` 時。 換句話說，其他的都是符合的。

大家用它做縮寫的 `indexOf` 檢查：

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 可行
}
```

通常不建議以不直覺的方式使用語言特性，但是這種特殊技巧，在舊程式碼中已廣泛使用，因此我們應該理解它。

只要記住：`if (~str.indexOf(...))` 讀作 "if found"。

<<<<<<< HEAD
確切地說，由於大數字被 `~` 運算子截斷為 32 位元，因此存在其他給出 `0` 的數字，最小的數字為 `~4294967295 = 0`。那使得，只有當字串不那麼長時，檢查才是正確的。
=======
To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

現在，我們只能在舊程式碼中看到此技巧，因為現代 JavaScript 提供了 `.includes` 方法（見下文）。

### includes, startsWith, endsWith

更現代的方法 [str.includes(substr, pos)](mdn:js/String/includes) 會根據 `str` 中是否包含 `substr` 來回傳 `true/false`。

如果我們要測試它是否吻合，但不需要知道它的位置，此為正確的選擇：

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes` 的第二個參數是可選的，代表開始檢索的位置：

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, 從索引位置 3 開始檢索不會找到 "id"
```

方法 [str.startsWith](mdn:js/String/startsWith) 和 [str.endsWith](mdn:js/String/endsWith) 完全如它們所說：

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" 以 "Wid" 開始
alert( "Widget".endsWith("get") ); // true, "Widget" 以 "get" 結尾
```

## 取得一個子字串

JavaScript 有三個取得子字串的方法：`substring`, `substr` 和 `slice`。

`str.slice(start [, end])` :
回傳該字串從 `start` 到（但不包含）`end` 的部分。

例如：

```js run
let str = "stringify";
alert( str.slice(0, 5) ); // 'strin', 子字串為從字串位置 0 到 5 (但不包含 5)
alert( str.slice(0, 1) ); // 's', 從 0 到 1, 但不包含 1，所以只有位置位於 0 的字元。
```

若沒有第二個參數，那麼 `slice` 將取值到字串末尾。

```js run
let str = "st*!*ringify*/!*";
alert( str.slice(2) ); // 'ringify', 從位置第 2 直到結束
```

`start/end` 也可能是負值，它代表該位置是從字串末尾開始計算的。

```js run
let str = "strin*!*gif*/!*y";
// 開始為從右邊算起第 4 個位置，結尾為從右邊算起第 1 個位置。
alert( str.slice(-4, -1) ); // 'gif'
```

`str.substring(start [, end])` :
回傳該字串 `start` 和 `end` *之間* 的部分。

它幾乎與 `slice` 一樣，但它允許 `start` 可以大於 `end`。

例如：

```js run
let str = "st*!*ring*/!*ify";

// 這些寫法對 substring 來說是一樣的
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// 但對於 slice 來說是不一樣的：
alert( str.slice(2, 6) ); // "ring" (相同)
alert( str.slice(6, 2) ); // "" (一個空字串)
```

負值的參數是不被支援的（不同於 slice），它們被視為 `0`。

`str.substr(start [, length])`:
回傳該字串從 `start` 到給定 `length` 的部分。

與之前的方法相比，此方法使我們可以指定一個 `length` 而不是結束位置。

```js run
let str = "st*!*ring*/!*ify";
alert( str.substr(2, 4) ); // 'ring'，從位置 2 開始，取 4 個字元
```

第一個參數可以是負的，從結尾算起：

```js run
let str = "strin*!*gi*/!*fy";
alert( str.substr(-4, 2) ); // 'gi', 從位置 4 開始取 2 個字元
```

讓我們回顧一下這些方法，以免混淆：

| 方法 | 選擇器 | 負號參數 |
|--------|-----------|-----------|
| `slice(start, end)` | 從 `start` 到 `end` (不包含 `end`) | 允許負號參數 |
| `substring(start, end)` | `start` 與 `end` 之間 | 負號參數視為 `0`|
| `substr(start, length)` | 從 `start` 取 `length` 個字元 | 允許 `start` 為負數 |

```smart header="使用哪一個？"
它們都可以勝任工作。從形式上看，`substr` 有個小缺點：它不是在 JavaScript 的核心規範中被描述，而是寫在附件 B 中，它涵蓋了主要由於歷史因素而存在的瀏覽器特性。因此，非瀏覽器環境可能無法支持它，但實際上它在任何地方都可運作。

另外兩個變種，`slice` 更靈活一點，它允許負號參數，且寫得短些。所以只要記住這三個方法中的 `slice` 就夠了。
```

## Comparing strings 比對字串

如同我們從 <info:comparison>（值的比較）章節了解到的，字串是按字母順序逐字比較。

不過，也有些奇怪之處。

1. 一個小寫字母總是大於大寫字母：

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. 有變音標記字母是 "失靈" 的：

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    這可能導致奇怪的結果，如果我們排序這些國名，一般人們會認為列表中 `Zealand` 會排在 `Österreich` 之後。

為了明白發生什麼事，我們回顧一下 JavaScript 中，字串的內部表現形式。

所有字串都是用 [UTF-16](https://en.wikipedia.org/wiki/UTF-16) 編碼的。即：每一個字元都有一個對應的數字代碼。有一些特殊的方法可以獲取代碼表示的字符，以及字符對應的代碼。

`str.codePointAt(pos)`：
回傳位於 `pos` 字元的代碼：

```js run
// 字母大小寫有不同的代碼
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90
```

`String.fromCodePoint(code)`：
用字元的代碼數字 `code` 創建字元

```js run
alert( String.fromCodePoint(90) ); // Z
```

<<<<<<< HEAD
我們也可以透過字元代碼來添加 unicode 字元，在 `\u` 後面接該十六進制代碼：
=======
    We can also add Unicode characters by their codes using `\u` followed by the hex code:
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

```js run
// 在十六進制系統中 90 為 5a
alert( '\u005a' ); // Z
```

現在我們來看代碼 `60..220` 的字元（拉丁字母和一些額外的字元）方法是用它們創建一個字串：

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

看到沒？先是大寫字元，然後是一些特殊字元，然後是小寫字元，而 `Ö` 幾乎是最後輸出。

現在很明顯為什麼 `a > Z`。

字元通過它們的數字代碼進行比較。代碼較大表示該字元較大。 `a` 代碼 (97) 大於 `Z` 代碼 (90)。

<<<<<<< HEAD
- 所有小寫字母都在大寫字母後面，因為它們的代碼更大。
- 一些字母像是 `Ö` 與主要字母分開。在這裏，它的代碼比從 `a` 到 `z` 的任何字元代碼都大。

### Correct comparisons 正確的比較
=======
- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

執行字串比較，"正確" 的演算法比看起來更複雜，因為不同語言的字母是不同的。

所以，瀏覽器需要知道要比較的語言是什麼。

<<<<<<< HEAD
幸運的是，所有現代瀏覽器（IE10 -- 需要額外的函式庫 [Intl.JS](https://github.com/andyearnshaw/Intl.js/)）都支援國際化標準 [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf)。
=======
Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

It provides a special method to compare strings in different languages, following their rules.
它提供一種特殊方法來比較不同的語言的字串，遵循語言的規則。

呼叫 [str.localeCompare(str2)](mdn:js/String/localeCompare) 會根據語言的規則回傳一個整數，該整數能表明 `str` 是小於、相等或大於 `str2`。

- 若 `str` 小於 `str2`，回傳負數
- 若 `str` 大於 `str2`，回傳正數
- 若它們相等，則回傳 `0`

例如：

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

這個方法實際上在 [此文件](mdn:js/String/localeCompare) 指定了兩個額外的參數，它允許指定語言（預設會在環境中獲取語言，字母順序會根據語言不同）並設定額外規則，像是區分大小寫，或是否將 `"a"` 和 `"á"` 視為相同等等。

## 內部的, Unicode

```warn header="進階知識"
本節將深入字串內部。 如果您打算處理表情符號，稀有的數學或像形文字或其他稀有符號，則此知識對您很有用。

如果您不打算為其提供支援，可以跳過本節。
```

### Surrogate pairs 代理對

所有常用字元都有 2 位元代碼。大多數歐洲語言、數字甚至大多象形文字的字母都有一個 2 位元的表現形式。

但 2 位元組只允許 65536 種組合，對一切可能的符號，這還遠遠不夠。所以稀有符號使用一個成對的，稱作 "代理對（a surrogate pair）" 的 2 位元字元編碼。

這些符號的長度是 `2`：

```js run
alert( '𝒳'.length ); // 2, 大寫數學符號 X
alert( '😂'.length ); // 2, 笑到流淚的表情
alert( '𩷶'.length ); // 2, 一個罕見中國象形字
```

請注意，JavaScript 創建時，代理對並不存在，因此 JavaScript 無法正確處理！

每個上面的字串，我們實際有的是單獨的符號，但 `length` 長度是 `2`。

`String.fromCodePoint` 和 `str.codePointAt` 都是少數處理代理對的罕見方法。在它們之前，只有  [String.fromCharCode](mdn:js/String/fromCharCode) 和 [str.charCodeAt](mdn:js/String/charCodeAt) 這些方法。這些方法是實際上與 `fromCodePoint/codePointAt` 相同，但不適用於代理對。

獲取一個符號可能很棘手，因為代理對被視為兩個字元。

```js run
alert( '𝒳'[0] ); // 奇怪的符號...
alert( '𝒳'[1] ); // ...代理對的片段
```

注意，代理對若缺少另外一部分就沒有意義。所以上面範例中的 alert 實際是顯示亂碼。

技術角度來說，代理對可以用它們的代碼檢測到：如果一個字元代碼在 `0xd800..0xdbff` 之間，那它就是代碼對的第一個部分。下一個字元（第二部分）代碼必須在 `0xdc00..0xdfff` 之間。這些區間是依據標準專門為代理對保留的。

在上述案例中：

```js run
// charCodeAt 不認得代理對（surrogate-pair），因此給出代碼的片段

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, 在 0xd800 和 0xdbff 之間
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 在 0xdc00 和 0xdfff 之間
```

稍後在 <info：iterable> 一章中，您將找到更多處理代理對的方法。 可能也有專門的函式庫，但是沒有什麼足以在這裡建議的。


### Diacritical marks and normalization 變音標記和標準化

在許多語言中，有些符號是由帶有上標記或下標記的基本字元組成。

<<<<<<< HEAD
例如，字母 `a` 可以是下列的基本字元：`àáâäãåā`。最常見的 "複合" 字元在 UTF-16 表中有自己的代碼。但他們並非全部，因為可能的組合太多。

為了支援任意組合，UTF-16 允許我們去使用幾個 unicode 字元：基本字元緊跟著一或多個 "裝飾" 它的 "標記" 字元。
=======
To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.
例如，若我們有 `S` 後面跟著特殊 "上標點 (dot above)" 字元（代碼 `\u0307`），顯示為 Ṡ。

```js run
alert( 'S\u0307' ); // Ṡ
```

如果我們需要在字母上方（或下方）附加一個標記 -- 沒問題，只需添加必要的標記字元即可。

例如，如果我們再加一個 "下標點（dot below）" 字元（代碼 `\u0323`），那麼我們將得到有上方和下方都有帶點的 `S`：`Ṩ`。

例如：

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

<<<<<<< HEAD
這提供了極大的靈活性，但還有個有趣的問題：兩個字元在視覺上可能看來相同，但是用不同的 unicode 組合表示。
=======
This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

例如：

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + 上標點 + 下標點
let s2 = 'S\u0323\u0307'; // Ṩ, S + 下標點 + 上標點

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false 儘管字元看起來是相同的 (?!)
```

<<<<<<< HEAD
為了解決這個問題，有一種 "unicode 標準化（unicode normalization）" 演算法，將每個字串轉換為單個 "常規" 格式。
=======
To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

他透過 [str.normalize()](mdn:js/String/normalize) 實作。

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

我們遇到好玩的現象，`normalize()` 實際將三字元的序列聚集成一個： `\u1e68`（有兩個點的 S）。

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

事實上，這種例子並非總是像這樣。原因是 `Ṩ` 符號 "足夠常見"，因此 UTF-16 創建者將其包含在主表中並提供代碼。

如果你想了解有關規範化規則和變體的更多信息 -- 它們在 Unicode 標準的附錄中有所描述：[Unicode Normalization Forms](http://www.unicode.org/reports/tr15/)，但對於大多數實際目的來說，本節的信息就足夠了。

<<<<<<< HEAD
## Summary 總結
=======
- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their Unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

- 有 3 種類型的引號。 反引號允許字串的換行，並在內嵌入表達式 `${…}`。
- 字串在 JavaScript 中都是使用 UTF-16 編碼。
- 我們可以使用特殊字元像 `\n`，還有用 `\u...` 以他們的 unicode 來插入字母。
- 取得字元使用：`[]`
- 取得子字串使用：`slice` 或 `substring`。
- 字串大小寫轉換，使用：`toLowerCase/toUpperCase`。
- 要搜尋一個子字串，使用： `indexOf`，或用 `includes/startsWith/endsWith` 來做簡單的確認。
- 要依據語言比較字串時使用：`localeCompare`，否則將使用字元編碼比較

關於字串，其他ㄧ些有用的方法：

- `str.trim()` -- 移除 ("trims") 字串前後的空格。
- `str.repeat(n)` -- 重複該字串 `n` 次。
- ...更多內容請參考 [manual 手冊](mdn:js/String).
字串也有使用正則表達式進行 檢索/替換 的方法。但這是個大主題，因此，將在一個單獨的教程章節 <info:regular-expressions> 中說明。
