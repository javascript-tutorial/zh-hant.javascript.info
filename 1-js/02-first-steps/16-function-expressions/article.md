# 函式表達式

在 JavaScript 中，函式不是一個 "神奇的語言結構"，而是一種特殊的值。

我們之前所使用的語法稱為 *函式宣告（Function Declaration）*：

```js
function sayHi() {
  alert( "Hello" );
}
```

有另一種創建函式的語法，稱之為 *函式表達式（Function Expression）*。

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions/article.md
寫法如下：
=======
It allows to create a new function in the middle of any expression.

For example:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269:1-js/02-first-steps/16-function-expressions/article.md

```js
let sayHi = function() {
  alert( "Hello" );
};
```

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions/article.md
在這邊，函式被創建，並像其他值ㄧ樣，明確地指定給一個變數。無論函式是如何被定義的，它只是一個儲存於變數 `sayHi` 的值。

這兩段程式碼範例的意思是相同的："創造一個函式，並將其放入變數 `sayHi`"。
=======
Here we can see a variable `sayHi` getting a value, the new function, created as `function() { alert("Hello"); }`.

As the function creation happens in the context of the assignment expression (to the right side of `=`), this is a *Function Expression*.

Please note, there's no name after the `function` keyword. Omitting a name is allowed for Function Expressions.

Here we immediately assign it to the variable, so the meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

In more advanced situations, that we'll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

## Function is a value

Let's reiterate: no matter how the function is created, a function is a value. Both examples above store a function is `sayHi` variable.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269:1-js/02-first-steps/16-function-expressions/article.md

我們甚至可以利用 `alert` 將其值印出：

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // 顯現函式程式碼
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
```suggestion
2. 行 `(2)` 將其複製給變數 `func`。請注意：`sayHi` 後面沒有括號。如果有括號，`func = sayHi()` 會將 `sayHi()` *呼叫的結果* 寫入 `func`，而非 `sayHi` 函式本身。
3. 現在 `sayHi()` 與 `func()` 都可以呼叫到同個函式。

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions/article.md
注意這裡的第一行中，我們也可以使用函式表達式來宣告 `sayHi`：
=======
We could also have used a Function Expression to declare `sayHi`, in the first line:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269:1-js/02-first-steps/16-function-expressions/article.md

```js
let sayHi = function() { // (1) create
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

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions/article.md
答案很簡單：
- 在使用像是 `if { ... }`、`for { }`、`function f { }` 等的程式碼區塊與語法結構時，並不需要在結尾放上 `;`。
- 函式表達式通常使用在述語中： `let sayHi = ...;`，像個變數。這並不是一個程式碼區塊，而是一段指定運算。不管是什麼值，建議總是在述語結尾處加上分號 `;`。所以這裡的分號與函式表達式本身沒有關係，他只是用來終止述語。
=======
The answer is simple: a Function Expression is created here as `function(…) {…}` inside the assignment statement: `let sayHi = …;`. The semicolon `;` is recommended at the end of the statement, it's not a part of the function syntax.

The semicolon would be there for a simpler assignment, such as `let sayHi = 5;`, and it's also there for a function assignment.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269:1-js/02-first-steps/16-function-expressions/article.md
````

## 回呼函式（Callback functions）

讓我們來看更多將函式以值的方式傳遞與使用函式表達式的範例。

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

**`ask` 的引數 `showOk` 與 `showCancel` 稱作 *回呼函數* 或就叫 *回乎*。**

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

這裡的函式直接宣告在 `ask(...)` 的呼叫內。他們沒有名字，所以被稱為 *匿名函式 (anonymous)*。這樣的函式無法在 `ask` 外被呼叫（因為沒有被分配給變數），但那正是我們目前想要的。

這樣的程式碼很自然地會出現在我們的腳本中，這就是 JavaScript 的精髓。

```smart header="一個函式是一個代表 \"動作\" 的值"

字串或數字等常規值代表 *資料（data）*。

一個函式可以被視為一個 *動作（action）*。

我們可以在變數之間傳遞他們，並在想要時執行。
```

## 函式表達式（Function Expression）與函式宣告式（Function Declaration）

讓我們來闡述函式表達式與函式宣告式的關鍵差異。

首先是語法：如何在程式碼中區別他們。

- *函式宣告式：* 一個函式，在主程式碼中分開宣告的述語。

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

更多細微的差別在於 JavaScript 引擎 *何時* 創建函式。

**函式表達式在程式執行到達時創建，並從那時候起才可以使用。**

一旦執行到指定運算 `let sum = function...` 的右側，該函式就會被創建並從此可以被使用（指定、呼叫，等等）。

函式宣告式則不同。

**函式宣告式的呼叫可以早於其宣告**

舉例來說，一個全域函式宣告式的作用域包含整個腳本，無論它在腳本中的何處。

這是由於內部的演算法。當 JavaScript 準備運行腳本時，它會先找尋其中的全域函式宣告式，並將其創建。我們可以將其視為 "初始化階段"。

在所有函式宣告式都處理完後，程式碼才開始執行。所以這些函式可以被存取。

例如下面的例子，這樣是可以正常運行的：

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

函式宣告 `sayHi` 在 JavaScript 準備啟動腳本時被創建，並且在任何地方都是可視的。

...如果它是一個函式表達式，它就無法正常執行：

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) 不再有神奇的事情發生
  alert( `Hello, ${name}` );
};
```

函式表達式在程式執行到時才會被創建。也就是只會在 line `(*)` 發生，為時已晚。

函式宣告式另一個特別的功能是他們的區塊作用域。

**嚴格模式下，當一個函式宣告式在一個程式碼區塊中時，它在區塊內的任何地方都是可視的，區塊外則不可視。**

例如，讓我們想像我們需要宣告一個函式 `welcome()`，它依賴一個我們在執行時間才能取得的變數 `age`，且我們隨後會在某些時候用到該變數。

如果我們使用函式宣告式，以下程式碼不會如願運作：

```js run
let age = prompt("What is your age?", 18);

// 根據條件判斷來宣告不同內容的函式
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...在稍後使用
*!*
welcome(); // Error: welcome is not defined
*/!*
```

這是因為函式宣告式的作用域侷限於其所在的程式碼區塊內。

這裡是另一個範例：

```js run
let age = 16; // 拿 16 作為例子

if (age < 18) {
*!*
  welcome();               // \   (運行)
*/!*
                           //  |
  function welcome() {     //  |  
alert("Hello!");       //  |  函式宣告式可被存取於
}                        //  | 其所被宣告區塊內的任何地方
                           //  |
*!*
  welcome();               // /   (運行)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// 在這裡，我們在大括弧外面，
// 所以我們無法看見在括弧內創建的函式宣告式

*!*
welcome(); // Error: welcome is not defined
*/!*
```

我們該怎麼做才能讓 `welcome` 在 `if` 外可視？

正確的做法會是使用函式表達式，然後將 `welcome` 指定給一個宣告在 `if` 外部，且具有正確可視性的變數。

這段程式碼能如願執行：

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

或是我們可以用問號運算子 `?` 來進一步簡化它：

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```

```smart header="何時選擇函式宣告式或函式表達式？"
根據經驗，當我們需要宣告函式時，首先考慮的是函式宣告式語法。對於組織我們的程式碼上，它給了我們更多的自由，因為我們可以在這些函式被宣告前呼叫他們。

在可讀性上也更好，在程式碼中找尋 `function f(...) {...}` 比起 `let f = function(...) {...}` 更簡單。函式宣告式更能 "吸引目光"。

...但如果函式宣告式由於某些原因不適合我們，或是我們需要條件式宣告（我們剛剛才看過例子），那就應該使用函式表達式。
```

## 總結

- 函式是值。他們可以被指定、複製或在程式碼中任何地方被宣告。
- 如果函式在主程式碼中以分開的述語宣告，則稱為 "函式宣告式"。
- 如果函式作為表達式的一部分被創建，則稱為 "函式表達式"。
- 函式宣告式在程式碼區塊執行前被處理。他們在區塊內任何地方都是可視的。
- 函式表達式在執行流程到達它們時被創建。

在大多數情況下，當我們需要宣告一個函式時，我們偏好採用函式宣告式，因為它讓函式在宣告前就是可視的。這給了我們很多組織程式碼的彈性，通常也具有較佳的可讀性。

所以我們應該只在函式宣告式不適合任務時才採用函式表達式。我們在這章節中已經看到一些例子，將來會看到更多。
