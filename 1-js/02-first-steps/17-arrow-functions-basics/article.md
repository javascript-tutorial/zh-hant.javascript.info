# 箭頭函式，基本觀念

創建函式還有一個非常簡潔的語法，通常比函式表達式更好。

它被稱為 "箭頭函式（arrow functions）"，因為它看起來像這樣：

```js
let func = (arg1, arg2, ..., argN) => expression
```

...這會創建一個接受引數 `arg1..argN` 的函式 `func`，運行右側的 `expression` 並回傳結果。

換句話說，它是這個的簡短版本：

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

讓我們來看個實際範例：

```js run
let sum = (a, b) => a + b;

/* 箭頭函式是簡短版的：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

如你所見，`(a, b) => a + b` 代表接收兩個名為 `a` 與 `b` 引數的函式。在執行時，它會運算 `a + b` 的表達式然後回傳結果。

- 如果我們只有一個引數，那麼參數旁的括號可以省略，讓它更短。

    例如:

    ```js run
    *!*
    let double = n => n * 2;
    // 大致上等同於：let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- 如果沒有任何引數，括號應該是空的（但他們應該被保留）：

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

箭頭函式的使用情境與函式宣告式相同。

例如，動態產生一個函式：

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

在剛開始使用箭頭函式時，可能會覺得不熟悉且閱讀性不那麼好，但習慣這種結構後，情況會迅速改變。

他們對於簡單的單行動作非常方便，尤其當我們發懶不想寫太多文字時。

## 多行箭頭函式

上述的範例拿取 `=>` 左側的引數並在右側的表達式中使用它們。

有時我們需要一些更複雜的東西，像是多個表達式或是述語。這也是可行的，但我們應該用大括弧將它們括起來。然後在其中使用普通的 `return`。

像這樣：

```js run
let sum = (a, b) => {  // 大括弧開啟多行函式
  let result = a + b;
*!*
  return result; // 如果我們使用大括弧，則需要明確的 "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="還有更多"
這裡我們稍微稱讚了箭頭函式。但那不是全部！

箭頭函式還有其他有趣的功能。

想更深入學習它們，我們首先需要了解 JavaScript 的其餘面向，因此我們會晚點再於章節 <info:arrow-functions> 中回來看箭頭函式。

至此，我們已經可以在單行動作與回呼中使用箭頭函式。
```

## 總結

箭頭函式對於單行動作來說非常方便，以下是它的兩個樣貌：

1. 沒有大括號：`(...args) => expression` -- 右側是一個表達式：函式執行它並回傳結果。
2. 有大括號：`(...args) => { body }` -- 括號允許我們在函式內撰寫多行述語，但我們需要用明確地 `return` 來回傳東西。
