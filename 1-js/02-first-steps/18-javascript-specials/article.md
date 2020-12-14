# JavaScript 特性

本章節簡要的回顧一下我們到目前為止所學的，並特別著重在一些細節上。

## 程式碼結構


述語（Statements）用分號隔開:

```js run no-beautify
alert('Hello'); alert('World');
```

通常，換行符號也被視為分隔符號， 因此也能這樣分隔述語：

```js run no-beautify
alert('Hello')
alert('World')
```

這是所謂的 "自動分號插入"。但有時它不起作用，例如：

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

大多數程式碼風格指南都認為我們應該在每個述語後加上分號。

在像是程式碼區塊和迴圈之類，有用到 `{...}` 的語法之後，不需要加上分號：

```js
function f() {
  // 函數宣告後不需要分號
}

for(;;) {
  // 迴圈述語後不需要分號
}
```

...但即使我們在某處放了 "額外" 的分號，這也不會造成錯誤。它會被忽略。

更多資訊： <info:structure>。


## 嚴格模式（Strict mode）

為了完全啟用現代 JavaScript 的所有功能，我們應該以 `"use strict"` 指令作為腳本開頭。

```js
'use strict';

...
```

該指令必須放在 JavaScript 腳本的頂部或是函數的開頭。

沒有使用 `"use strict"`，一切依然能正常運行，但是某些特性會以 "兼容" 舊式的方式表現，我們通常偏好使用現代的方式。

語言內有些現代功能與特性（像是我們將來要學的類別）會隱式地啟用嚴格模式。

更多資訊： <info:strict-mode>.

## 變數（Variables）

可以用下列方式聲明變數：

- `let`
- `const` （常數，宣告後不可改變）
- `var` （舊的寫法，稍後會看到）

一個變數名稱可以包含：
- 字母與數字，但變數名的第一個字元不能是數字。
- 字元 `$` 和 `_` 是允許且正常的，用法同字母。
- 非拉丁字母與象形文字也是允許的，但通常不會使用。

變數是會動態被賦予型別的，他們可以儲存任何的值：

```js
let x = 5;
x = "John";
```

<<<<<<< HEAD:1-js/02-first-steps/17-javascript-specials/article.md
有 8 種資料類型：

- `number` 可以是浮點數或是整數。
- `bigint` 任意長度的整數。
- `string` 字串類型。
- `boolean` 表達邏輯的值： `true/false`。
- `null` -- 具有單一值 `null` 的類型，代表 "空的" 或 "不存在"。
- `undefined` -- 具有單一值 `undefined` 的類型，代表 "未指定"。
- `object` 與 `symbol` -- 用於複雜的資料結構和唯一識別符號，我們還沒學習這個類型。

`typeof` 運算子會回傳值的類型，但有兩個例外：
=======
There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/02-first-steps/18-javascript-specials/article.md

```js
typeof null == "object" // 語言本身的錯誤
typeof function(){} == "function" // 函式被特別對待
```

更多資訊： <info:variables> 和 <info:types>。

## 互動（Interaction）

我們使用瀏覽器作為工作環境，所以基本的 UI 功能會是：

[`prompt(question, [default])`](mdn:api/Window/prompt)
: 詢問一個 `question`，並回傳使用者輸入的內容，若使用者按下 "取消"，則回傳 `null` 。

[`confirm(question)`](mdn:api/Window/confirm)
: 詢問一個 `question`，並提供在 Ok 與 Cancel 間進行選擇。選擇結果以 `true/false` 回傳。

[`alert(message)`](mdn:api/Window/alert)
: 輸出一個 `message`。

所有這些函式都是 *模態*，他們會暫停程式碼執行並阻擋使用者與頁面互動，直到使用者回應模態。

舉例來說:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

更多資訊： <info:alert-prompt-confirm>.

## 運算子（Operators）

JavaScript 支援以下運算子：

算術運算子（Arithmetical）
： 常規的運算子如： `* + - /`，以及取餘數操作的 `%` 和次方運算的 `**`。

    二元加號 `+` 連結字串。如果任何一個操作運算元是字串，則另一個也會被轉換成字串：

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

指定運算子（Assignments）
： 簡單的指定： `a = b` 和結合其他運算的指定運算 `a *= 2`。

<<<<<<< HEAD:1-js/02-first-steps/17-javascript-specials/article.md
位元操作（Bitwise）
： 位元操作在最底層的位元層面使用 32-bit 整數： 有需要時，請參閱 [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators)。
=======
Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#Bitwise) when they are needed.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/02-first-steps/18-javascript-specials/article.md

條件運算（Conditional）
： 唯一具有三個參數的操作： `cond ? resultA : resultB`. 如果 `cond` 是真值，則回傳 `resultA`否則回傳 `resultB`。

邏輯運算子（Logical operators）
： 邏輯的 AND `&&` 和 OR `||` 執行短路核定，然後回傳停止時的值（不一定為 `true`/`false`）。邏輯的 NOT `!` 轉換操作運算元成布林類型，並回傳相反的值。

<<<<<<< HEAD:1-js/02-first-steps/17-javascript-specials/article.md
比較運算子（Comparisons）
： 相等性檢查 `==` 將不同類型的值轉換成數值（除了 `null` 和 `undefined`，它們除了彼此相等外，不跟任何人相等），所以這些是相等的：
=======
Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/02-first-steps/18-javascript-specials/article.md

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    其他的比較也會轉換成數值。

    嚴格相等運算子 `===` 不會進行轉換：不同類型永遠代表不同的值。

    `null` 和 `undefined` 值比較特殊：他們只在 `==` 下相等。

    大於/小於 的比較運算，在比較字串時，是按照字元逐一比較，其他類型則會先轉換成數值。

其他運算子
： 有一些其他的運算子，像是逗號運算子。

<<<<<<< HEAD:1-js/02-first-steps/17-javascript-specials/article.md
更多資訊： <info:operators>, <info:comparison>, <info:logical-operators>.
=======
More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/02-first-steps/18-javascript-specials/article.md

## 迴圈

- 我們介紹了三種類型的迴圈:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- 在 `for(let...)` 迴圈中宣告的變數其作用域只在迴圈中但我們也能省略 `let` 並重用現有的變數。
- 指令 `break/continue` 允許退出整個 迴圈/當前迭代。使用標籤來打破巢狀迴圈。

更多資訊： <info:while-for>。

稍後我們將會學習更多類型的迴圈來處理物件。

## "switch" 結構

"switch" 結構可以取代多個 `if` 檢查。 它使用 `===` （嚴格相等） 進行比較。

例如：

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
<<<<<<< HEAD:1-js/02-first-steps/17-javascript-specials/article.md
    alert("Won't work"); // 提示的結果是一個字串，而非數字
=======
    alert("Won't work"); // the result of prompt is a string, not a number
    break;
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557:1-js/02-first-steps/18-javascript-specials/article.md

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

更多資訊： <info:switch>。

## 函式

我們介紹了三種在 JavaScript 中創建函式的方式：

1. 函式宣告: 主要程式流程中的函示

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. 函式表達式： 表達式上下文中的函式

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. 箭頭函式：

    ```js
    // 表達式在右邊
    let sum = (a, b) => a + b;

    // 或是帶有 { ... } 的多行語法，需要回傳：
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // 沒有引數
    let sayHi = () => alert("Hello");

    // 單一引數
    let double = n => n * 2;
    ```


- 函式可能有區域變數： 那些在函式內宣告的變數。 這類的變數其作用域只存在函式內部。
- 參數可以有預設值：`function sum(a = 1, b = 2) {...}`。
- 函式永遠會回傳一些東西。如果沒有 `return` 述語，則其結果為 `undefined`。

更多資訊：參見 <info:function-basics>、<info:arrow-functions-basics>。

## 還有更多

這是 JavaScript 特性的簡短概要。 截至目前，我們只學習了基礎知識。隨著教程的深入，你將會學習到 JavaScript 的更多特性與進階功能。
