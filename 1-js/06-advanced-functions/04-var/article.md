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
如果一個區塊在函式內部，那麼 `var` 就會變成函式級別的變數：

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 可行
}

sayHi();
alert(phrase); // Error: phrase is not defined (Check the Developer Console)
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

...Or even as this (remember, code blocks are ignored):

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

People also call such behavior "hoisting" (raising), because all `var` are "hoisted" (raised) to the top of the function.

So in the example above, `if (false)` branch never executes, but that doesn't matter. The `var` inside it is processed in the beginning of the function, so at the moment of `(*)` the variable exists.

**Declarations are hoisted, but assignments are not.**

That's best demonstrated with an example:

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

The line `var phrase = "Hello"` has two actions in it:

1. Variable declaration `var`
2. Variable assignment `=`.

The declaration is processed at the start of function execution ("hoisted"), but the assignment always works at the place where it appears. So the code works essentially like this:

```js run
function sayHi() {
*!*
  var phrase; // declaration works at the start...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...assignment - when the execution reaches it.
*/!*
}

sayHi();
```

Because all `var` declarations are processed at the function start, we can reference them at any place. But variables are undefined until the assignments.

In both examples above `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function () {
  let message = "Hello";

  alert(message); // Hello
})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

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

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, they are visible minimum at the function level.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
