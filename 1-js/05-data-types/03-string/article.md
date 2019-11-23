# Strings 字串

In JavaScript, the textual data is stored as strings. There is no separate type for a single character.
在 JavaScript 中，文字數據被存為字串類型。並沒有針對單個字元做不同分類。

The internal format for strings is always [UTF-16](https://en.wikipedia.org/wiki/UTF-16), it is not tied to the page encoding.
字串的內部格式，始終為 [UTF-16](https://en.wikipedia.org/wiki/UTF-16)，與頁面編碼不相關。


## Quotes 引號

Let's recall the kinds of quotes.
讓我們回想一下引號的種類。

Strings can be enclosed within either single quotes, double quotes or backticks:
字串可以用單引號、雙引號或反引號引起來：

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:
單引號和雙引號本質是相同的。但反引號允許我們像這樣 `${…}`將表達式包裹，嵌入到字串中：

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Another advantage of using backticks is that they allow a string to span multiple lines:
使用反引號的另一個優點，是它們是允許在字串中直接換行：

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines // 客人名單，多行
```

Looks natural, right? But single or double quotes do not work this way.
看起來很自然吧？ 但是單、雙引號不能這樣做。

If we use them and try to use multiple lines, there'll be an error:
如果我們使用單引號或雙引號時直接換行，將會出現錯誤：

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL 錯誤：意外的語彙單元 非法
  * John";
```

Single and double quotes come from ancient times of language creation when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.
單引號和雙引號來自創造語言的遠古時代，當時沒有考慮對多行字串的需求。 反引號出現得較晚，因此用途更廣。

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
反引號還允許我們在第一個反引號之前，指定 "模板功能 (template function)"。 語法為 <code>func&#96;string&#96;</code>。 函數 `func` 會被自動調用，接收字串和嵌入式表達式並處理他們，這稱為 "標記模板 (tagged templates)"。 此功能使實現自定義模板更加容易，但很少在實踐中使用。您可以在 [手冊](mdn:/JavaScript/Reference/Template_literals#Tagged_templates) 中了解更多信息。


## Special characters 特殊的角色

It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:
單、雙引號仍然可建立多行的字串，用所謂的 "換行符 (newline character)"，寫為 `\n`，表示換行。

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests 多行的來賓列表
```

For example, these two lines are equal, just written differently:
例如， 這兩行描述是相同的，只是書寫方式不同：

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol" 使用一個 "換行符" 創建的兩行字串。

// two lines using a normal newline and backticks 使用反引號、直接換行所創建的兩行字串。
let str2 = `Hello
World`;

alert(str1 == str2); // true 兩者相等
```

There are other, less common "special" characters.
還有其他一些不太常見的 "特殊" 字元。

Here's the full list:
這是完整列表：

| Character 字元 | Description 描述 |
|-----------|-------------|
|`\n`|New line 換行、新行|
|`\r`|Carriage return: not used alone. Windows text files use a combination of two characters `\r\n` to represent a line break. 回車：不單獨使用。 Windows 純文字檔使用兩個字元組合 `\r\n` 來表示換行。 |
|`\'`, `\"`|Quotes 引號|
|`\\`|Backslash 反斜槓|
|`\t`|Tab 製表跳格|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- kept for compatibility, not used nowadays. 倒退，換頁，垂直製表跳格 -- 為保持兼容性，目前已不被使用。|
|`\xXX`|Unicode character with the given hexadecimal unicode `XX`, e.g. `'\x7A'` is the same as `'z'`. 一個 Unicode 字元，`XX` 為十六進制 unicode 字元，例如 `'\x7A'` 與 `'z'` 相同。|
|`\uXXXX`|A unicode symbol with the hex code `XXXX` in UTF-16 encoding, for instance `\u00A9` -- is a unicode for the copyright symbol `©`. It must be exactly 4 hex digits. 一個 unicode 符號，以 UTF-16 編碼的十六進制代碼 "XXXX" 表示，例如 `\u00A9` -- 為 unicode 版權符號 `©`，十六進制數字必須是 4 個。|
|`\u{X…XXXXXX}` (1 to 6 hex characters 1 到 6 個十六進制字元)|A unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two unicode symbols, taking 4 bytes. This way we can insert long codes. 用給定 UTF-32 編碼的 unicode 符號。因為有些稀有字元是兩個 unicode 符號，佔用 4 個字節。這樣我們可以插入長串的程式碼。|

Examples with unicode:
unicode 的例子：

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long unicode) 一個少見的中文象形文字（長 unicode）
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode) 一個笑臉符號（另一個長 unicode）
```

All special characters start with a backslash character `\`. It is also called an "escape character".
所有特殊字元均以反斜槓字元 `\` 開頭。也稱為 "跳脫字元"。

We might also use it if we wanted to insert a quote into the string.
當我們想在字串中安插引號，也可以使用它。

For instance:
例如：

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus! (Walrus: 海象)
```

As you can see, we have to prepend the inner quote by the backslash `\'`, because otherwise it would indicate the string end.
就像你看到的，我們必須在內部的引號前加上反斜槓 `\`，否則它將結束字串。

Of course, only to the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
當然，只有跟那個封閉引號相同的引號，才需要跳脫。因此，作為更優雅的解決方案，我們可以轉為使用雙引號或反引號：

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Note that the backslash `\` serves for the correct reading of the string by JavaScript, then disappears. The in-memory string has no `\`. You can clearly see that in `alert` from the examples above.
請注意，反斜槓 `\` 是為了在 JavaScript 正確讀取字串，然後就消失了。儲存的字串中沒有 `\`。你可以在上面的 `alert` 範例中，清楚地看到這點。

But what if we need to show an actual backslash `\` within the string?
但若我們需要在字串中顯示實際的反斜槓 `\` 怎麼辦？

That's possible, but we need to double it like `\\`:
這是可行的，我們只需將它像這樣書寫兩次 `\\`：

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## String length 字串長度

The `length` property has the string length:
`length` 屬性，表示了一個字串的長度：

```js run
alert( `My\n`.length ); // 3
```

Note that `\n` is a single "special" character, so the length is indeed `3`.
注意，`\n` 為一個 "特殊" 字元，因此長度的確是 `3`。

```warn header="`length` is a property `length` 是一個屬性"
People with a background in some other languages sometimes mistype by calling `str.length()` instead of just `str.length`. That doesn't work.
有其他程式語言背景的人，有時會打字錯誤，用 `str.length()` 而不是 `str.length`。那是行不通的。

Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it.
請注意，`str.length` 是數值屬性，而不是函數，不需在後面添加括號。
```

## Accessing characters 訪問字元

To get a character at position `pos`, use square brackets `[pos]` or call the method [str.charAt(pos)](mdn:js/String/charAt). The first character starts from the zero position:
要從變數 `pos` 位置中獲取一個字元，請使用方括號 `[pos]` 或調用方法 [str.charAt(pos)](mdn:js/String/charAt)。 第一個字元從零位置開始：

```js run
let str = `Hello`;

// the first character 第一個字元
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character 最後一個字元
alert( str[str.length - 1] ); // o
```

The square brackets are a modern way of getting a character, while `charAt` exists mostly for historical reasons.
使用方括號，是獲取字元的現代化方式，而 `charAt` 的存在主要出於歷史性原因。

The only difference between them is that if no character is found, `[]` returns `undefined`, and `charAt` returns an empty string:
它們之間的唯一區別是，如果找不到字元，則 `[]` 將返回 `undefined`，而 `charAt` 返回一個空字串：

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string 一個空字串)
```

We can also iterate over characters using `for..of`:
我們也可以使用 `for..of` 來迭代過每個字元

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc // char 會被替換成 "H"，然後是 "e"，然後是 "l" 等等)
}
```

## Strings are immutable 字符串不可變

Strings can't be changed in JavaScript. It is impossible to change a character.
JavaScript中，字串不能被更改。 一個字元都無法更改。

Let's try it to show that it doesn't work:
讓我們試著改變字串，以證明它不起作用：

```js run
let str = 'Hi';

str[0] = 'h'; // error 錯誤
alert( str[0] ); // doesn't work 不起作用
```

The usual workaround is to create a whole new string and assign it to `str` instead of the old one.
通常的解決方法是創建一個全新的字串，再將它分配給 `str` 替換掉舊的字串。

For instance:
例如：

```js run
let str = 'Hi';

str = 'h' + str[1]; // replace the string 替換字串

alert( str ); // hi
```

In the following sections we'll see more examples of this.
在以下章節中，我們將看到更多例子。

## Changing the case 改變大小寫

[toLowerCase()](mdn:js/String/toLowerCase) 方法和 [toUpperCase()](mdn:js/String/toUpperCase) 方法可以改變大小寫：

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Or, if we want a single character lowercased:
或者，我們想要一個小寫字元

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Searching for a substring 搜尋一個子字串

There are multiple ways to look for a substring within a string.
查詢一個字串當中的子字串，有很多方法。

### str.indexOf

The first method is [str.indexOf(substr, pos)](mdn:js/String/indexOf).
第一個方法是 [str.indexOf(substr, pos)](mdn:js/String/indexOf)。

It looks for the `substr` in `str`, starting from the given position `pos`, and returns the position where the match was found or `-1` if nothing can be found.
它在 `str` 中尋找 `substr`，從我們給定的位置 `pos` 開始找，若找到，則回傳該匹配字串的索引位置；若沒找到，找到則回傳 `-1`。

For instance:
例如：

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning // 0， 因為一開始 'Widget' 就被找到
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive // -1，沒找到，搜尋是對大小寫敏感的。

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id) // 1， "id" 在索引位置 "1" 處就被找到 (..idget 中的 id) 。
```

The optional second parameter allows us to search starting from the given position.
第二個參數是可選的，允許我們從給定的位置開始找。

For instance, the first occurrence of `"id"` is at position `1`. To look for the next occurrence, let's start the search from position `2`:
舉例來說，`"id"` 第一次出現的位置是 `1`，要尋找下一個，我們從 `2` 開始找。

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:
如果我們好奇所有的位置，我們可以在一個迴圈中用 `indexOf`。每一次新呼叫，都發生在前一個找到的位置之後。

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it // 我們來找它

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position // 從下一個位置繼續找
}
```

The same algorithm can be layed out shorter:
相同的算法，可以寫得更短：

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
There is also a similar method [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) that searches from the end of a string to its beginning.

還有一個類似的方法 [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) ，它是從字串末端開始搜尋。

It would list the occurrences in the reverse order.
它列出的事件，順序會是相反的。
```

There is a slight inconvenience with `indexOf` in the `if` test. We can't put it in the `if` like this:
在 `if` 測試中，`indexOf` 會有一些不便。 我們不能像這樣，將它放在 `if` 中：

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work! // 沒有作用!
}
```

The `alert` in the example above doesn't show because `str.indexOf("Widget")` returns `0` (meaning that it found the match at the starting position). Right, but `if` considers `0` to be `false`.
上面範例中的 `alert` 沒有顯示，因為 `str.indexOf("Widget")` 回傳 `0`（意思是在起始位置就匹配成功）。是的，但是 `if` 認為 `0` 是 `false` 值。

So, we should actually check for `-1`, like this:
所以我們實際上應該去檢查 `-1` ，像這樣：

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now! // 現在可以運作了！
}
```

#### The bitwise NOT trick 按位（bitwise）NOT 技巧

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.
這裡使用一個古老的技巧， [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` 運算子。它將數字轉換為一個 32 位元 （32-bit）的整數（如果有小數點則全部捨棄），然後反轉它的二進製表示中的所有位元。

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.
在實踐中，這意味著一件簡單的事情：對於 32 位元整數來說 `~n` 與 `-(n+1)` 完全相同。

For instance:
例如：

```js run
alert( ~2 ); // -3, the same as -(2+1) // -3, 等同 -(2+1)
alert( ~1 ); // -2, the same as -(1+1) // -2, 等同 -(1+1)
alert( ~0 ); // -1, the same as -(0+1) // -1, 等同 -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1) // 0, 等同 -(-1+1)
*/!*
```

As we can see, `~n` is zero only if `n == -1` (that's for any 32-bit signed integer `n`).
如我們看到的，只有當 `n==-1` 時 `~n` 是零 （that's for any 32-bit signed integer `n` 適用於任何 32 位元，有符號的整數 `n`）

So, the test `if ( ~str.indexOf("...") )` is truthy only if the result of `indexOf` is not `-1`. In other words, when there is a match.
所以，測試 `if ( ~str.indexOf("...") )` 會是 truthy，只有 `indexOf` 結果不是 `-1` 時。 換句話說，其他的都是符合的。

People use it to shorten `indexOf` checks:
大家用它做縮寫的 `indexOf` 檢查：

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works // 可行
}
```

It is usually not recommended to use language features in a non-obvious way, but this particular trick is widely used in old code, so we should understand it.
通常不建議以不直覺的方式使用語言特性，但是這種特殊技巧，在舊程式碼中已廣泛使用，因此我們應該理解它。

Just remember: `if (~str.indexOf(...))` reads as "if found".
只要記住：`if (~str.indexOf(...))` 讀作 "if found"。

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check is correct only if a string is not that long.
確切地說，由於大數字被 `〜` 運算子截斷為 32 位元，因此存在其他給出 `0` 的數字，最小的數字為 `〜4294967295 = 0`。那使得，只有當字串不那麼長時，檢查才是正確的。

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).
現在，我們只能在舊程式碼中看到此技巧，因為現代 JavaScript 提供了 `.includes` 方法（見下文）。

### includes, startsWith, endsWith （包含...，用...開始，用...結束）

The more modern method [str.includes(substr, pos)](mdn:js/String/includes) returns `true/false` depending on whether `str` contains `substr` within.
更現代的方法 [str.includes(substr, pos)](mdn:js/String/includes) 會根據 `str` 中是否包含 `substr` 來回傳 `true/false`。

It's the right choice if we need to test for the match, but don't need its position:
如果我們要測試它是否吻合，但不需要知道位置，此為正確的選擇：

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The optional second argument of `str.includes` is the position to start searching from:
`str.includes` 的第二個參數是可選的，代表開始搜尋的位置：

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id" // false, 從索引位置 3 開始搜尋，不會找到 "id"
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they say:
方法 [str.startsWith](mdn:js/String/startsWith) 和 [str.endsWith](mdn:js/String/endsWith) 完全如它們所說：

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid" // true, "Widget" 用 "Wid" 開始
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get" // true, "Widget" 以 "get" 結尾
```

## Getting a substring 取得一個子字串

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.
JavaScript 有三個取得子字串的方法：`substring`, `substr` 和 `slice`。

`str.slice(start [, end])` :
Returns the part of the string from `start` to (but not including) `end`.
回傳該字串從 `start` 到（但不包含）`end` 的部分。

    For instance:
    例如：

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5) // 'strin', 子字串為從字串位置 0 到 5 (但不包含 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0 // 's', 從 0 到 1, 但不包含 1，所以只有位置位於 0 的字元。
    ```

    If there is no second argument, then `slice` goes till the end of the string:
    若沒有第二個參數，那麼 `slice` 將取值到字串末尾。

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:
    `start/end` 也可能是負值，它代表該位置是從字串末尾開始計算的。

    ```js run
    let str = "strin*!*gif*/!*y";
    // start at the 4th position from the right, end at the 1st from the right // 開始為從右邊算起第四個位置，結尾為從右邊算起第一個位置。
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])` :
Returns the part of the string *between* `start` and `end`.
回傳該字串 `start` 和 `end` *之間* 的部分。

    This is almost the same as `slice`, but it allows `start` to be greater than `end`.
    它幾乎與 `slice` 一樣，但它允許 `start` 可以大於 `end`。

    For instance:
    例如：

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring // 這些寫法對 substring 來說是一樣的
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice: // 但對於 slice 來說是不一樣的：
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)
    ```

    Negative arguments are (unlike slice) not supported, they are treated as `0`.
    負值的參數是不被支援的（不同於 slice），它們被視為 `0`。

`str.substr(start [, length])`:
Returns the part of the string from `start`, with the given `length`.
回傳該字串從 `start` 到給定 `length` 的部分。

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:
    與之前的方法相比，此方法使我們可以指定一個 `length` 而不是結束位置。

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters // 'ring'，從位置 2 開始，取 4 個字元
    ```

    The first argument may be negative, to count from the end:
    第一個參數可以是負的，從結尾算起：

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters // 'gi', 從位置 4 開始取 2 個字元
    ```

Let's recap these methods to avoid any confusion:
讓我們回顧一下這些方法，以免混淆：

| method 方法 | selects... 選擇器 | negatives 負號參數 |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) 從 `start` 到 `end` (不包含 `end`) | allows negatives 允許負號參數 |
| `substring(start, end)` | between `start` and `end` `start` 與 `end` 之間 | negative values mean `0` 負號參數視為 `0`|
| `substr(start, length)` | from `start` get `length` characters 從 `start` 取 `length` 個字元 | allows negative `start` 允許 `start` 為負數 |

```smart header="Which one to choose? 使用哪一個？"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.
它們都可以勝任工作。從形式上看，`substr` 有個小缺點：它不是在 JavaScript 的核心規範中被描述，而是寫在附件 B 中，它涵蓋了主要由於歷史因素而存在的瀏覽器特性。因此，非瀏覽器環境可能無法支持它，但實際上它在任何地方都可運作。

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
另外兩個變種，`slice` 更靈活一點，它允許負號參數，且寫得短些。所以只要記住這三個方法中的 `slice` 就夠了。
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of order":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.

### Correct comparisons

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

Getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
