# The old "var"

```smart header="本篇文章主要是幫助理解舊的腳本"
本篇文章的資訊對於理解舊的腳本很有幫助。

但這不是我們寫新程式碼的方式
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
在[變數](info:variables)的第一章中，我們提到了三種變數宣告的方式：

1. `let`
2. `const`
3. `var`

在作用域環境 (Lexical Environments) 方面，`let` 和 `const` 的行為完全相同。

但 `var` 是一個非常不同的東西，它來自很久以前的時代。它通常不會在現代腳本中使用，但仍然潛伏在舊腳本中。

如果你不打算遇到這樣的腳本，你甚至可以跳過這一章或者推遲閱讀，但是以後它可能會反咬你一口。

從第一眼看來，`var` 的行為與 `let` 相似。也就是說，它宣告了一個變數：

```js run
function sayHi() {
  var phrase = "Hello"; // 局部變數 (local variable)，使用 "var" 而非 "let"

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // Error, phrase is not defined
```

...但是這裡有一些差異。

## "var" 沒有區塊作用域

Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
使用 `var` 宣告的變數，其作用域不是函式範圍，就是全域範圍。它們可以在區塊中被看見。

例如：

```js run
if (true) {
  var test = true; // 使用 "var" 而非 "let"
}

*!*
alert(test); // true, 變數在 if 後仍存在
*/!*
```

`var` 忽略了區塊，所以我們得到了一個全域變數 `test`。

如果我們使用 `let test` 而非 `var test`，那麼變數只會在 `if` 內可見：

```js run
if (true) {
  let test = true; // 使用 "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```

對於迴圈也是一樣的：`var` 不能是區塊或迴圈的區域變數：

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" 在迴圈結束後仍存在，它是全域變數
*/!*
```

If a code block is inside a function, then `var` becomes a function-level variable:
如果一個區塊在函式內部，那麼 `var` 就會變成函式層級的變數：

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 可行
}

sayHi();
alert(phrase); // Error: phrase is not defined (可透過開發者工具查看)
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript blocks had no Lexical Environments. And `var` is a remnant of that.
如同我們所見，`var` 穿透了 `if`、`for` 或其他區塊。這是因為在 JavaScript 中，區塊在很久以前沒有作用域環境 (Lexical Environments)。而 `var` 就是那個時代的遺物。

## "var" 宣告在函式開始時處理

`var` 宣告在函式開始時處理 (或全域範圍開始時處理)。

換句話說，`var` 變數在函式開始時就被定義了，不管它的定義在哪裡 (假設定義不在巢狀函式中)。

這段程式碼：

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...技術上與這個程式碼相同 (將 `var phrase` 移到上面)：

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...或者這樣 (記住，區塊是被忽略的)：

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

人們也稱這種行為作 "hoisting" (提升)，因為所有的 `var` 都被 "hoisted" (提升) 到函式的頂部。

因此在上面的例子中，`if (false)` 分支永遠不會執行，但這並不重要。它內部的 `var` 在函式開始時就被處理了，所以在 `(*)` 的時候變數已經存在了。

**宣告 (declarations) 會被提升，但賦值 (assignments) 不會。**

這個例子可以很好地說明：

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

`var phrase = "Hello"` 這一行有兩個動作：

1. 變數宣告 `var`
2. 變數賦值 `=`.

宣告在函式開始時處理 (提升)，但賦值總是在它出現的地方處理。所以程式碼實際上像這樣運作：

```js run
function sayHi() {
*!*
  var phrase; // 宣告在函式開始時處理...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...賦值 - 當程式執行到這裡時
*/!*
}

sayHi();
```

因為所有的 `var` 宣告都在函式開始時處理，所以我們可以在任何地方引用它們。但是變數在賦值之前都是未定義的。

在上面的兩個例子中，`alert` 都沒有錯誤，因為變數 `phrase` 存在。但它的值還沒有被賦值，所以它顯示 `undefined`。

### IIFE

過去只有 `var`，而且它沒有區塊層級的可見性，所以程式設計師發明了一種模擬它的方式，被稱為 "立即呼叫函式 (immediately-invoked function expressions)"。

這不是我們現在應該使用的東西，但你可以在舊的腳本中找到它們。

一個 IIFE 看起來像這樣：

```js run
(function () {
  let message = "Hello";

  alert(message); // Hello
})();
```

這裡建立了一個函式表達式 (Function Expression) 並立即呼叫它。所以程式碼立即執行，並且有它自己的私有變數。

函式表達式被括號 `(function {...})` 包裹，因為當 JavaScript 在主程式碼中遇到 `"function"` 時，它會將其視為函式宣告的開始。但是函式宣告必須有名字，所以這種程式碼會出錯：

```js run
// 嘗試宣告並立即呼叫函式
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

即使我們說："好吧，那就加一個名字"，但這也不會起作用，因為 JavaScript 不允許立即呼叫函式宣告：

```js run
// 因為下面的括號而導致語法錯誤
function go() {

}(); // <-- 不能立即呼叫函式宣告
```

因此，函式周圍的括號是一個技巧，可以告訴 JavaScript 函式是在另一個表達式的上下文中建立的，因此它是一個函式表達式：它不需要名字，並且可以立即呼叫。

除了括號之外，還有其他方法可以告訴 JavaScript 我們的意思是函式表達式：

```js run
// 建立 IIFE 的其他方式

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

在上述所有情況下，我們都宣告了一個函式表達式並立即執行它。再次注意：現在沒有理由寫這樣的程式碼。

## 結論

相較於 `let/const`，`var` 有兩個主要的差異：

1. `var` 變數沒有區塊區塊作用域，它們至少在函式層級可見。
2. `var` 宣告在函式開始時處理 (全域範圍開始時處理)。

還有一個與全域物件 (global object) 有關的非常小的差異，我們將在下一章中介紹。

這些差異使得 `var` 大多數時候比 `let` 差。區塊層級的變數是一件很棒的事情。這就是為什麼 `let` 很久以前就被引入標準中，並且現在是宣告變數的主要方式之一 (與 `const` 一起)。
