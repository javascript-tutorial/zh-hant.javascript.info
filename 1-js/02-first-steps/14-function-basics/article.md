# 函式（Functions）

我們常常會需要在腳本的很多地方執行類似的動作。

例如，我們需要在使用者登入、登出或做其他事情時，顯示一則美觀的訊息。

函式是程式主要的 "建構區塊"，它們允許程式碼被不重複地多次呼叫。

我們已經看過一些內建函式的例子，像是 `alert(message)`、`prompt(message, default)` 和 `confirm(question)`，不過我們也可以自己來建立函式。

## 函式宣告（Function Declaration）

要建立一個函式，我們可以使用 *函式宣告（function declaration）*。

它長得像這樣：

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

`function` 關鍵字寫在最前面，然後是 *函式的名字*，接著一串在小括號內的 *參數（parameters）*（用逗號分開，上面的例子中為空），最後在大括號之間的是函式的程式碼，也被稱為 "函式本體（function body）"。

```js
function name(parameters) {
  ...body...
}
```

我們的新函式可以使用它的名字來呼叫：`showMessage()`。

舉個例：

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

呼叫 `showMessage()` 執行函式的程式碼，這邊我們會看到兩次該則訊息。

這個例子清楚演示了函式主要的功能之一：避免重複的程式碼。

若我們還需要改變該則訊息內容或是被顯示的方式，那改一個地方的程式碼就可以了：也就是函式用來輸出它的部分。

## 區域變數（Local variables）

一個在函式內被宣告的變數只有在函式內是可視（visible）的。

例如：

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // 區域變數
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- 錯誤！該變數是函式的區域變數
```

## 外部變數（Outer variables）

函式也可以存取外部變數，例如：

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

函式有著完整存取外部變數的權限，也可以修改它。

舉個例：

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // （1）改變外部變數

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* 呼叫函式前

showMessage();

alert( userName ); // *!*Bob*/!*，值被函式修改了
```

只有不存在相同名字的區域變數時，才會用到該名字的外部變數。

若有個相同名字的變數在函式內被宣告，則它會 *遮蔽（shadows）* 外部的那個。舉個例，底下的程式碼中，函式使用區域的 `userName`，而外部的將會被忽略：

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // 宣告區域變數
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// 函式會建立並使用自己的 userName
showMessage();

alert( userName ); // *!*John*/!* 維持不變，函式並沒有存取外部變數
```

```smart header="全域變數（Global variables）"
宣告在任何函式之外的變數，像是上面程式碼中位於外部的 `userName`，被稱之為 *全域*。

全域變數在任何函式內都可視（除非被區域變數遮蔽）。

減少使用全域變數是個良好做法。目前流行的程式碼中很少或甚至不使用全域變數，大多數變數存在函式之中，但有時它們被用在儲存專案等級的資料時會很有用。
```

## 參數（Parameters）

我們可以使用參數，或稱為 *函式引數（function arguments）*，來傳遞任意資料給函式。

在上面的例子中，函式有兩個參數：`from` 和 `text`。

```js run
function showMessage(*!*from, text*/!*) { // 引數：from、text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

當函式在 `(*)` 和 `(**)` 被呼叫時，被給予的值將會被複製到區域變數 `from` 和 `text` 中，然後函式才使用它們。

這裡有另一個例子：我們把一個變數 `from` 傳遞給函式。請注意，此函式改變了 `from`，但這個改變在外部看不到，因為函式總是使用該值的複製品：

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // 讓 "from" 變得更好看
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// "from" 的值維持原樣，因為函式修改的是身為區域變數的複製品
alert( from ); // Ann
```

## 預設值

若參數沒被提供，它的值會變成 `undefined`。

舉個例，前述的函式 `showMessage(from, text)` 可以使用單一個引數來呼叫：

```js
showMessage("Ann");
```

那並非錯誤，這種呼叫方式會輸出 `"Ann: undefined"`。因為沒有 `text`，所以它預設成 `text === undefined`。

如果在這種情況想使用一個 "預設的" `text`，那我們可以加個 `=` 並在其後指定預設值：

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

若現在沒有傳遞 `text` 參數，它將會拿到值 `"no text given"`。

這邊的 `"no text given"` 是一個字串，但它可以是更為複雜的表達式，該表達式只在未給予參數時才會被計算和指定。所以這麼做是可以的：

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() 只有在沒給 text 的時候會被執行
  // 其結果會變成 text 的值
}
```

```smart header="預設參數的計算"
在 JavaScript 中，每次呼叫函式卻沒帶對應參數時，該預設參數才會被計算。

上面的例子中，在呼叫 `showMessage()` 卻沒帶 `text` 參數時，才會去呼叫 `anotherFunction()`。
```

````smart header="舊風格的預設參數"
舊版本的 JavaScript 不支援預設參數，所以有幾種替代方案來支援，你可以在大多數老舊的腳本中找到。

舉個例，明確檢查 `undefined`：

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...或使用 `||` 運算子：

```js
function showMessage(from, text) {
  // 若 text 為虛值，則 text 會得到其 "預設" 值
  text = text || 'no text given';
  ...
}
```
````

## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

An empty `return` is also the same as `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally functions names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
