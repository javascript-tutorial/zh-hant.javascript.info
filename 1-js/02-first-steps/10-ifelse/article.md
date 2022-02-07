<<<<<<< HEAD
# 條件運算子：if、'?'
=======
# Conditional branching: if, '?'
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

有時候我們需要根據不同條件執行不同操作。

為此，我們可以使用 `if` 述語和也被稱為 "問號" 運算子的條件運算子 `?`。

## "if" 述語

`if(...)` 術語核定括號內的條件，如果結果是 `true` 則執行區塊內的程式碼。

例如：

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

在上面這個例子中，該條件只是個簡單的相等性檢查（`year == 2015`），但它也可以變得更為複雜。

如果想要執行多個述語，我們必須用大括號包裝程式碼區塊：

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

我們建議每次使用 `if` 述語時，都用大括號 `{}` 包裝你的程式碼區塊，就算只有一個述語要執行也一樣，這麼做可以提升可讀性。

## 布林（Boolean）轉換

`if(...)` 述語核定括號內的表達式並轉換其結果成為一個布林值。

讓我們從章節 <info:type-conversions> 中回想一下轉換規則。

- 數字 `0`、空字串 `""`、`null`、`undefined` 和 `NaN` 都會變成 `false`，也因此它們被稱為 "虛值（falsy）"。
- 其它值都會變成 `true`，所以它們被稱為 "真值（truthy）"。

所以，在這種條件下的程式碼永遠不會被執行：

```js
if (0) { // 0 is falsy
  ...
}
```

...而在這種條件 -- 總會執行：

```js
if (1) { // 1 is truthy
  ...
}
```

我們也可以給 `if` 一個尚未核定的布林值，像這樣：

```js
let cond = (year == 2015); // 核定相等性為真或假

if (cond) {
  ...
}
```

## "else" 語句

<<<<<<< HEAD
`if` 述語可以包含一個可選的 "else" 區塊，它會在條件為 false 時執行。

例如：
=======
The `if` statement may contain an optional "else" block. It executes when the condition is falsy.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // 2015 以外的任意值
}
```

## 多個條件："else if"

有時我們想要測試某個條件的多種變化，`else if` 語句讓我們可以這麼做。

例如：

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

上面的程式碼中，JavaScript 首先確認 `year < 2015`，如果為假則前進至下一個條件 `year > 2015`，若依然為假則顯示最後的 `alert`。

還可以有更多的 `else if` 區塊，最後的 `else` 是可選的。

## 條件運算子 '?'

有時候我們需要依照某條件指定一個變數。

舉個例：

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

某個被稱為 "條件" 或 "問號" 的運算子使我們用一種更簡短的方式達到目的。

該運算子使用問號 `?` 表示，因為有三個運算元，有時也被稱為 "三元運算子"。事實上它也是 JavaScript 中唯一的三元運算子。

語法為：

```js
let result = condition ? value1 : value2;
```

`condition` 先被核定：若其為真則回傳 `value1`，否則 `value2`。

例如：

```js
let accessAllowed = (age > 18) ? true : false;
```

技術上我們可以忽略包住 `age > 18` 的括號，問號運算子有著較低的優先權，所以它會在比較 `>` 之後被運行。

這個例子和前一個做一樣的事情：

```js
// 比較運算子 "age > 18" 先執行
// （不需要被包在括號中）
let accessAllowed = age > 18 ? true : false;
```

但括號使程式碼更具可讀性，所以我們建議使用它們。

````smart
上面的例子中，你可以避免使用問號運算子，因為比較運算本身就會回傳 `true/false`：

```js
// 同樣效果
let accessAllowed = age > 18;
```
````

## 多個 '?'

一系列的問號運算子 `?` 可以回傳根據多個條件核定後的結果。

舉個例：

```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

第一眼可能很難看出發生什麼事，但進一步細看，我們可以發現這只是普通的一連串檢查：

1. 第一個問號確認 `age < 3`。
2. 若為真 -- 回傳 `'Hi, baby!'`，否則進到冒號 `":"` 後的表達式，檢查 `age < 18`。
3. 若為真 -- 回傳 `'Hello!'`，否則進到下一個冒號 `":"` 後的表達式，檢查 `age < 100`。
4. 若為真 -- 回傳 `'Greetings!'`，否則進到最後一個冒號 `":"` 後的表達式，回傳 `'What an unusual age!'`。

使用 `if...else` 達到同樣效果的樣子：

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## '?' 的非傳統用法

有時問號運算子 `?` 被用來替代 `if`：

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

根據條件 `company == 'Netscape'`，問號後的第一或第二個表達式其中之一，會被執行並顯示。

我們不在這指定變數，而是根據不同條件執行不一樣的程式碼。

**不推薦這樣使用問號運算子。**

這種表示法比同效的 `if` 述語更簡短，可能會吸引某些程式設計師這麼做，但卻會造成閱讀困難。

使用 `if` 做比較的同效程式碼：

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

我們的眼睛是垂直地掃視程式碼，所以多行展開的程式碼區塊，會比冗長水平的指令集合更容易理解。

問號運算子 `?` 的用途是根據條件回傳二擇一的值，請正確使用它。當你需要執行不同分支的程式碼時請使用 `if`。

