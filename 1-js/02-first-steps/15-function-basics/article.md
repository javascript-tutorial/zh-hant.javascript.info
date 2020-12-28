# 函式（Functions）

我們常常會需要在腳本的很多地方執行類似的動作。

例如，我們需要在使用者登入、登出或做其他事情時，顯示一則美觀的訊息。

函式是程式主要的 "建構區塊"，它們允許程式碼被多次呼叫，無需重複撰寫。

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

我們可以呼叫函式名稱：`showMessage()` 來使用新函式。

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

若我們還需要改變該則訊息內容或是被顯示的方式，那改一個地方的程式碼就可以了：也就是輸出該訊息的函式。

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

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
那並非錯誤，這種呼叫方式會輸出 `"Ann: undefined"`。因為沒有 `text`，所以它預設成 `text === undefined`。
=======
That's not an error. Such a call would output `"*Ann*: undefined"`. There's no `text`, so it's assumed that `text === undefined`.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/02-first-steps/15-function-basics/article.md

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

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
````smart header="舊風格的預設參數"
舊版本的 JavaScript 不支援預設參數，所以有幾種替代方案來支援，你可以在大多數老舊的腳本中找到。

舉個例，明確檢查 `undefined`：
=======
### Alternative default parameters

Sometimes it makes sense to set default values for parameters not in the function declaration, but at a later stage, during its execution.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/02-first-steps/15-function-basics/article.md

To check for an omitted parameter, we can compare it with `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
...或使用 `||` 運算子：

```js
function showMessage(from, text) {
  // 若 text 為虛值，則 text 會得到其 "預設" 值
  text = text || 'no text given';
  ...
}
```
````

## 回傳值
=======
...Or we could use the `||` operator:

```js
// if text parameter is omitted or "" is passed, set it to 'empty'
function showMessage(text) {
  text = text || 'empty';
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when falsy values, such as `0`, are considered regular:

```js run
// if there's no "count" parameter, show "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/02-first-steps/15-function-basics/article.md

函式可以回傳一個值給呼叫它的程式碼作為結果。

把兩個值相加的最簡單做法是利用函式：

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

`return` 指令可以放在函式中的任意位置，當執行到這個指令，函式將會停止並將值回傳給呼叫它的程式碼（將回傳值指定給上例中的 `result` ）。

一個函式中或許會有多個 `return`，舉個例：

```js run
function checkAge(age) {
  if (age >= 18) {
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

使用 `return` 但不回傳值也是可以的，這樣可以讓函式立刻離開返回。

例如：

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

上面的程式碼中，若 `checkAge(age)` 回傳 `false`，則 `showMovie` 不會繼續執行 `alert`。

````smart header="使用 `return ` 回傳空值或根本沒寫，該函式將會回傳 `undefined`"
若一個函式沒有回傳任何值，則意思跟回傳 `undefined` 一樣：

```js run
function doNothing() { /* 空的函式 */ }

alert( doNothing() === undefined ); // true
```

`return` 空值的意思也跟 `return undefined` 一樣：

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="不要在 `return` 和要回傳的值之間增加新行"
對於一個擁有冗長表達式的 `return`，可能會試圖將表達式放在分開的一行，像這樣：

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```

但這樣不行，因為 JavaScript 在 `return` 後會預判加入分號，所以運作起來像這樣：

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

所以它實際上變成回傳一個空值。

若我們想回傳一個能夠橫跨多行的表達式，我們應該把它寫在跟 `return` 同一行，或者至少使用小括號包起來：

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```

這樣它才能如預期般運作。
````

## 函式命名 [#function-naming]

函式意味著動作，所以它們的名字通常使用動詞。其名字應該要簡短並盡可能的精準描述它的行為，這樣別人讀程式碼時才能理解這個函式在做什麼。

一種普遍的做法是利用動詞前置作為命名起頭，該動詞大略的描述其行為，而團隊之間對於使用的動詞前置的意思應該要有個共識。

舉個例，使用 `show` 起頭的函式通常代表著顯示些什麼。

函式若起始於...

- `"get…"` -- 回傳一個值，
- `"calc…"` -- 計算什麼，
- `"create…"` -- 建立什麼，
- `"check…"` -- 檢查什麼並回傳一個布林值，等等。

該種類名字的例子有：

```js no-beautify
showMessage(..)     // 顯示訊息
getAge(..)          // 回傳年齡（從某處取得）
calcSum(..)         // 計算總和並回傳結果
createForm(..)      // 建立表格（通常也會回傳它）
checkPermission(..) // 確認權限，並回傳 true/false
```

自帶這種前置的話，看一眼函式名稱就可以理解到它在做什麼，且知道會回傳什麼。

```smart header="一個函式 -- 一個動作"
一個函式應該要就只做名稱提及的事情，別做多餘的事。

兩個獨立的動作通常需要使用兩個函式，就算它們時常互相呼叫（這種情況下，我們可以製作第三個函式來呼叫這兩者）。

幾個破壞此規則的範例：

- `getAge` -- 若它使用 `alert` 來顯示年齡就很糟（應該只有取得年齡而已）。
- `createForm` -- 若它修改了文件內容才把表格加在上面就很糟（應該只有建立表格並回傳）。
- `checkPermission` -- 若它顯示 `存取 核准/拒絕` 的訊息就很糟（應該只做檢查並回傳結果）。

這些例子假設該前置詞使用最常見的含義，你和你們團隊可以自由認定為其他種含義，但通常它們不會差太多。無論如何，你應該要確實理解該前置詞的意義，有哪些函式適合使用而哪些不適合。所有同個前置詞的函式應該都要遵守這些規則，且團隊應該也要知曉此事。
```

```smart header="極短函式名稱"
*很常* 被使用的函式有時有著極短的名稱。

例如，[jQuery](http://jquery.com) 框架使用 `$` 定義了一個函式。而 [Lodash](http://lodash.com/) 函式庫以 `_` 作為其核心函式的名稱。

這些都只是例外，一般的函式名稱應該要精簡易懂。
```

## 函式 == 註解

函式應該要簡短且就只做一件事，若這件事很大，或許該把該函式拆成多個較小的函式。有時候想遵守此規則沒這麼簡單，但這麼做絕對是件好事。

分開的函式不只更易於測試和除錯 -- 它的存在本身就是極好的註解！

舉個例，底下比較兩個函式 `showPrimes(n)`。每一個都會回傳直到 `n` 的 [質數（prime numbers）](https://en.wikipedia.org/wiki/Prime_number)。

第一個使用標籤：

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // 一個質數
  }
}
```

第二個使用額外的函式 `isPrime(n)` 來測試質數性質：

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // 一個質數
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

第二個寫法更為容易理解，對吧？我們看到的不是程式碼片段，而是一個具有名字的動作（`isPrime`），有時人們稱這種程式碼具有 *自我描述性（self-describing）*。

所以，就算我們不打算重用，也可以建立函式，它們建構了程式碼並讓其更具可讀性。

## 總結

函式宣告看起來像這樣：

```js
function name(parameters, delimited, by, comma) {
  /* 程式碼 */
}
```

- 傳遞給函式作為參數的值，將會被複製為函式的區域變數。
- 函式可以存取外部變數，但只有在由內而外時起作用。函式外部的程式碼看不到該函式的區域變數。
- 函式可以回傳一個值，若沒有回傳，則其回傳值為 `undefined`。

為了讓程式碼簡潔易懂，建議在函式中以使用區域變數和參數為主，少用外部變數。

比起沒有取得任何參數，直接修改外部變數作為副作用的做法，函式先獲取參數並對其操作再回傳結果，更容易讓人理解。

函式命名：

- 名稱應該清楚描述該函式做了什麼。在程式碼中看到呼叫函式時，良好的命名可以讓我們立刻知道它會做什麼且回傳什麼。
- 一個函式就是一個動作，所以函式名稱通常為動詞。
- 有許多知名的函式前置詞，像是：`create...`、`show...`、`get...` 和 `check...` 等等，使用它們可以提示函式的用途。

函式是主要建構腳本的區塊，現在我們理解其基礎了，所以可以來開始建立並使用它們。但這只是這條路的開始，我們將會在很多時間點回頭來看它們，並更深入理解它們的進階特性。

