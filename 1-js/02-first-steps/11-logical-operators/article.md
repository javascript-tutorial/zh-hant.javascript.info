# 邏輯運算子

<<<<<<< HEAD
JavaScript 中有三種邏輯運算子：`||`（OR）、`&&`（AND）和 `!`（NOT）。
=======
There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing). Here we cover the first three, the `??` operator is in the next article.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

雖然被稱為 "邏輯"，這些運算子也可被用於不只是布林類型的任何值上，結果亦可能是任何類型。

讓我們來看看細節吧。

## ||（OR）

"OR" 運算子用兩條垂直線符號表示：

```js
result = a || b;
```

在傳統的程式設計中，邏輯 OR 意味著只操作布林值，如果它的任一個引數是 `true` 則回傳 `true`，否則回傳 `false`。

在 JavaScript 中，這個運算子有點棘手，但相對有更多功用，首先，讓我們看看用在布林值上會發生什麼事。

有四種可能的邏輯組合：

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

如我們所見，除了兩個運算元都是 `false` 的情況以外，剩下的結果都是 `true`。

如果某個運算元不是布林值，它會被轉成布林值再進行核定。

舉個例，數值 `1` 被視為 `true`，而數值 `0` 則為 `false`：

```js run
if (1 || 0) { // 運作起來就像 if( ture || false )
  alert( 'truthy!' );
}
```

大部分時間，OR `||` 被用於 `if` 述語中來測試給予的 *任何* 條件是否皆為 `true`。

例如：

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

我們也可傳入更多條件：

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // 因為是週末
}
```

<<<<<<< HEAD
## OR "||" 找出第一個真值
=======
## OR "||" finds the first truthy value [#or-finds-the-first-truthy-value]
>>>>>>> 6989312841d843f2350803ab552d9082437be569

前面提到的邏輯運算有點傳統，現在來看些 JavaScript 的 "額外" 特性。

擴展的演算法如下述運作。

給予多個使用 OR 的值：

```js
result = value1 || value2 || value3;
```

OR `||` 運算子做以下的事：

- 由左至右核定運算元。
- 轉換每個運算元為布林值，若結果為 `true`，停止核定並回傳該運算元原始的值。
- 若所有運算元皆已被核定（意即，皆為 `false`），回傳最後一個運算元。

回傳值是其原始型式，而非轉換的結果。

<<<<<<< HEAD
也就是說，一連串 OR `||` 回傳第一個真值，或在都沒有找到真值時回傳最後一個值。
=======
In other words, a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

舉個例：

```js run
<<<<<<< HEAD
alert( 1 || 0 ); // 1（1 是真值）
alert( true || 'no matter what' ); //（true 是真值）

alert( null || 1 ); // 1（1 是第一個真值）
alert( null || 0 || 1 ); // 1（第一個真值）
alert( undefined || null || 0 ); // 0（皆為虛值，回傳最後一個值）
=======
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
>>>>>>> 6989312841d843f2350803ab552d9082437be569
```

這導致一些跟 "純粹傳統布林限定 OR" 不太一樣的有趣用法。

1. **取得一串變數或表達式中的第一個真值。**

<<<<<<< HEAD
    想像我們有一串變數，之中包含著資料或者 `null/undefined`。我們要如何找到第一筆資料？

    我們可以使用 OR `||`:
=======
    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional (i.e. can be undefined or have falsy values).

    Let's use OR `||` to choose the one that has the data and show it (or `"Anonymous"` if nothing set):
>>>>>>> 6989312841d843f2350803ab552d9082437be569

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
<<<<<<< HEAD

    alert( name ); // 選出 "John" - 第一個真值
    ```

    `currentUser` 和 `defaultUser` 皆為虛值時，結果就會是 `"unnamed"`。

2. **短路核定（Short-circuit evaluation）。**

    運算元不只可以為值，也可以為任意表達式，OR 由左至右核定測試運算元。核定會在第一個真值被找到時停止，並且回傳該值。這個過程就是所謂的 "短路核定"，因為過程由左至右盡可能的少。

    當表達式作為第二個引數，並帶有像是變數指定等副作用（side effect）的時候，就可以很清楚地看出來。

    底下的例子中，`x` 沒有被給值：
=======
    ```

    If all variables were falsy, `"Anonymous"` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

    The importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

<<<<<<< HEAD
    alert(x); // undefined，因為（x = 1）沒有被核定
    ```

    然而，若第一個引數是 `false`，`||` 將核定第二個引數，那麼賦值就會被執行：
=======
    In the example below, only the second message is printed:
>>>>>>> 6989312841d843f2350803ab552d9082437be569

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

<<<<<<< HEAD
    賦值是個很簡單的例子。也許內含副作用，但在沒被核定之前它們不會出現。

    如果我們所見，這種用法是 "簡短版 `if`"。第一個運算元被轉換成布林值，如果其為假，第二個運算元才被接著核定。

    大部分時間使用 "正規的" `if` 會比較好，能讓程式碼更容易被理解，但有時候這麼做滿方便的就是。
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

## &&（AND）

AND 運算子使用兩個和號 `&&` 來表示：

```js
result = a && b;
```

傳統程式設計中，在兩個運算元皆為真值時 AND 回傳 `true`，否則回傳 `false`：

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

用於 `if` 中的例子：

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

跟 OR 一樣，任何值都可作為 AND 的運算元：

```js run
if (1 && 0) { // 作為 true && false 進行核定
  alert( "won't work, because the result is falsy" );
}
```

## AND "&&" 找出第一個虛值

給予多個使用 AND 的值：

```js
result = value1 && value2 && value3;
```

AND `&&` 運算子做以下的事情：

- 由左至右核定運算元。
- 轉換每個運算元為布林值，若其值為 `false`，停止核定並回傳運算元的原始值。
- 若所有運算元皆已被核定（意即，皆為真值），回傳最後一個運算元。

換句話說，AND 回傳第一個虛值，或在都沒找到時回傳最後一個值。

上面的規則和 OR 很像，不同點在於 AND 回傳第一個 *虛值*，而 OR 回傳第一個 *真值*。

例如：

```js run
// 若第一個運算元為真值，
// AND 回傳第二個運算元：
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 若第一個運算元回虛值，
// AND 回傳它。第二個運算元則被忽略。
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

我們也可在一行程式碼中傳遞數個變數。來看第一個虛值是如何被回傳：

```js run
alert( 1 && 2 && null && 3 ); // null
```

當所有值都是真值時，最後一個值會被回傳：

```js run
alert( 1 && 2 && 3 ); // 3，最後一個值
```

````smart header="AND `&&` 的優先權比 OR `||` 還要高"
AND `&&` 運算子的優先權比 OR `||` 還高。

所以程式碼 `a && b || c && d` 本質上跟 `&&` 使用括號的表達式一樣：`(a && b) || (c && d)`。
````

<<<<<<< HEAD
跟 OR 一樣，AND `&&` 運算子有時可以取代 `if`。
=======
````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".
>>>>>>> 6989312841d843f2350803ab552d9082437be569

舉個例：

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

`&&` 右側的動作只在有進行核定時才會被執行到，也就是當 `(x > 0)` 為真時。

所以基本上我們有個類似的做法：

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

<<<<<<< HEAD
使用 `&&` 的方式看起來更簡短，但 `if` 更明顯易懂且多了那麼點可讀性。

所以我們建議根據用途使用不同的程式碼建構方式：要用條件式時選 `if`，要做 AND 運算時用 `&&`。
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````

>>>>>>> 6989312841d843f2350803ab552d9082437be569

## !（NOT）

布林運算的 NOT 運算子使用一個驚嘆號 `!` 表示。

語法很簡單：

```js
result = !value;
```

該運算子接收單一個引數並做以下的事：

1. 轉換運算元為布林類型：`true/false`。
2. 回傳其相反的值。

舉個例：

```js run
alert( !true ); // false
alert( !0 ); // true
```

兩個 NOT `!!` 有時被用於轉換一個值為布林類型：

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

意即，第一個 NOT 把值轉為布林值並回傳其相反值，接著第二個 NOT 再反轉一次。最後我們可以得到一個單純的方式把值轉成布林。

有個更詳細的方式做同樣的事情 -- 內建的 `Boolean` 函式：

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

NOT `!` 的優先權是邏輯運算子中最高的，所以它總是在 `&&` 或 `||` 之前執行。

