# 函式表達式和箭頭函式

在 JavaScript 中，函式不是一個神奇的語言結構，而是一種特殊的值。

我們之前所使用的語法稱為 *函式宣告（Function Declaration）*：

```js
function sayHi() {
  alert( "Hello" );
}
```

有另一種創建函式的語法，稱之為 *函式表達式（Function Expression）*。

寫法如下：

```js
let sayHi = function() {
  alert( "Hello" );
};
```

在這邊，函式被創建，並像其他值ㄧ樣，明確地指定給一個變數。
無論函式是如何被定義的，它只是一個儲存於變數 `sayHi` 的值。

這兩段程式碼範例的意思是相同的："創造一個函式，並將其放入變數 `sayHi`"。

我們甚至可以利用 `alert` 將其值印出：

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // 顯現函數程式碼
*/!*
```

請注意最後一行程式碼並沒有執行函式，因為 `sayHi` 後沒有括號。有些程式語言中，提到函式名稱時就會觸發執行，但 JavaScript 並非如此。

在 JavaScript 中，函式是一個值，所以我們可以將其當成值對待。上述的程式碼顯示了函式的字串表示式，也就是其原始碼。

的確，函式是一個特殊的值，我們可以像 `sayHi()` 這樣呼叫它。

但它依然是一個值，所以我們可以像使用其他類型的值一樣地操作它。

我們可以複製函式到其他變數：

```js run no-beautify
function sayHi() {   // (1) 創建
  alert( "Hello" );
}

let func = sayHi;    // (2) 複製

func(); // Hello     // (3) 運行複製的函式（運作正常！）
sayHi(); // Hello    //     這也能正常運作（怎麼會不行呢）
```

詳細解釋一下上述程式碼發生了什麼事：

1. `(1)` 中使用函式宣告創建函式，並把它放入變數 `sayHi`。
2. 行 `(2)` 將其複製給變數 `func`。請注意：`sayHi` 後面沒有括號。如果有括號，`func = sayHi()` 會將 `sayHi()` 呼叫的結果寫入 `func`，而非 `sayHi` 函式本身。
3. 現在 `sayHi()` 與 `func()` 都可以呼叫到同個函式。

注意這裡的第一行中，我們也可以使用函式表達式來宣告 `sayHi`：

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

這並不影響其餘運作，一切都與先前相同。

````smart header="為何函式表達式的結尾有個分號？"
你可能會好奇，為什麼函式表達式的結尾有個分號 `;`，而函式宣告式卻沒有：

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

答案很簡單：
- 在程式碼區塊與使用像 `if { ... }`、`for { }`、`function f { }` 等語法結構時，並不需要在結尾放上 `;`。
- 函式表達式通常使用在述語中： `let sayHi = ...;`，像個變數。這並不是一個程式碼區塊，而是一段指定運算。不管是什麼值，建議總是在述語結尾處加上分號 `;`。所以這裡的分號與函式表達式本身沒有關係，他只是用來終止述語。
````

## 回呼函式（Callback functions）

讓我們來看更多將函式以值的方式傳遞的範例。

我們將寫一個包含三個參數的函式 `ask(question, yes, no)`：

`question`
: question 的文字

`yes`
: 當答案為 "Yes" 時執行的函式

`no`
: 當答案為 "No" 時執行的函式

函式應該提出 `question` 然後根據使用者的答案，呼叫 `yes()` 或是 `no()`：

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// 用法: 函式 showOk、showCancel 作為參數傳入 `ask`
ask("Do you agree?", showOk, showCancel);
```

實務上，類似的函式挺有用的。現實生活中的 `ask` 實作與上述範例的主要差別在於，現實中的函式用更複雜的方式與使用者互動，而不是簡單的 `confirm` （確認）。在瀏覽器中，這樣的函式通常會繪製一個漂亮的問答窗口。但那牽扯到另一個主題了。

**`ask` 的引數 `showOk` 與 `showCancel` 稱作 *回呼函數* 或就叫 *回乎***

背後的想法是，我們傳遞一個函式，並期望稍後它能在必要時被 "回呼"。在我們的例子中，`showOk` 成為了 "yes" 答案的回呼，而 `showCancel` 則是對應 "no" 答案。

我們可以使用函式表達式來將其簡寫：

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

這裡的函式直接寫在 `ask(...)` 裡面。他們沒有名字，所以被稱為 *匿名函式 (anonymous)*。這樣的函式無法在 `ask` 外被呼叫（因為沒有被分配給變數），但那正是我們目前想要的。

這樣的程式碼很自然地會出現在我們的腳本中，這就是 JavaScript 的精髓。

```smart header="一個函式是一個代表 \"action\" 的值"

字串或數字等常規值代表 *數據（data）*。

一個函式可以被視為一個 *動作（action）*。

我們可以在變數之間傳遞他們，並在想要時執行。
```

## 函式表達式（Function Expression）與函式宣告式（Function Declaration）

讓我們來闡述函式表達式與函式宣告式的關鍵差異。

首先是語法：如何在程式碼中區別他們。

- *函式宣告：* 一個函式，在主程式碼中以單獨述語宣告。

    ```js
    // 函數宣告式
    function sum(a, b) {
      return a + b;
    }
    ```

- *函式表達式：* 一個函式，在一個表達式或另一個語法結構中創建。這邊的例子，函式在指定運算表達符號 `=` 的右側被創建：

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

更多細微的差別在於 JavaScript 引擎在何時創建函式。

**函式表達式在程式執行到達時創建，並從那時候起才可以使用。**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...If it were a Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```


## Arrow functions [#arrow-functions]

There's one more very simple and concise syntax for creating functions, that's often better than Function Expressions. It's called "arrow functions", because it looks like this:


```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that has arguments `arg1..argN`, evaluates the `expression` on the right side with their use and returns its result.

In other words, it's roughly the same as:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...But much more concise.

Let's see an example:

```js run
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

If we have only one argument, then parentheses around parameters can be omitted, making that even shorter:

```js run
// same as
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

If there are no arguments, parentheses should be empty (but they should be present):

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Arrow functions can be used in the same way as Function Expressions.

For instance, here's the rewritten example with `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

```smart header="Multiline arrow functions"

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all! Arrow functions have other interesting features. We'll return to them later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
