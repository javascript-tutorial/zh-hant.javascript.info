# JavaScript 特性

本章節簡要回顧我們到目前為止所學的 JavaScript 特性，並針對一些細節特別注意。

## 程式碼結構


述句（Statements）用分號隔開:

```js run no-beautify
alert('Hello'); alert('World');
```

通常，換行符號也被視為分隔符號， 因此也能這樣分隔述句：

```js run no-beautify
alert('Hello')
alert('World')
```

這是所謂的 "自動分號插入"。但有時它不起作用，例如：

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

大多數程式碼風格指南都認為我們應該在每個述句後加上分號。

在程式碼區塊 `{...}` 和迴圈述句後不需要加上分號：

```js
function f() {
  // 函數宣告後不需要分號
}

for(;;) {
  // 迴圈述句後不需要分號
}
```

...但即使我們在某處放了 "額外" 的分號，這也不會造成錯誤。它會被忽略。

更多資訊： <info:structure>。


## 嚴格模式（Strict mode）

為了完全啟用現在 JavaScript 的所有功能，我們應該使用 `"use strict"` 指令。

```js
'use strict';

...
```

該指令必須放在 JavaScript 腳本的頂部或是函數的開頭。

沒有使用 `"use strict"`，一切依然能正常運行，但是某些特性會以 "兼容" 舊式的方式表現，我們通常偏好使用現代的方式。

有些語言的現代功能與特性（像是我們將來要學的類別）會隱式地啟用嚴格模式。

更多資訊： <info:strict-mode>.

## 變數（Variables）

可以用下列方式聲明變數：

- `let`
- `const` （常數，宣告後不可改變）
- `var` （舊式，稍後會看到）

一個變數名稱可以包含：
- 字母與數字，但變數名的第一個字元不能是數字。
- 字元 `$` 和 `_` 是允許且正常的，用法同字母。
- 非拉丁字母與象形文字也是允許的，但通常不會使用。

變數的值是可以動態更改其類型的，他們可以儲存任何的值：

```js
let x = 5;
x = "John";
```

有 7 種資料類型：

- `number` 可以是浮點數或是整數。
- `string` 字串類型。
- `boolean` 表達邏輯的值： `true/false`。
- `null` -- 具有單一值 `null` 的類型，代表 "空的" 或 "不存在"。
- `undefined` -- 具有單一值 `undefined` 的類型，代表 "未指定"。
- `object` 與 `symbol` -- 用於複雜的資料結構和唯一識別符號，我們還沒學習這個類型。

`typeof` 運算子會回傳值的類型，但有兩個例外：

```js
typeof null == "object" // 語言中的錯誤
typeof function(){} == "function" // 函數是特別的類型
```

更多資訊： <info:variables> 和 <info:types>。

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

More in: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>.

## Loops

- We covered 3 types of loops:

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

- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Function Expression: the function in the context of an expression

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Arrow functions:

    ```js
    // expression at the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```


- Functions may have local variables: those declared inside its body. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:function-expressions-arrows>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
