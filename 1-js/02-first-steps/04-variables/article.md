# 變數（Variables）

通常，JavaScript 應用程式需要資訊來運作，這裡有兩個例子：
1. 一家網購商店 -- 資訊包括要賣的商品和購物車
2. 聊天應用程式 -- 資訊包括使用者、訊息和其他更多東西。

變數就是用來儲存這些資訊。

## 一個變數

一個 [變數](https://en.wikipedia.org/wiki/Variable_(computer_science)) 是一份資料 "被命名的儲存區"。我們可以使用變數來儲存商品、訪客和其他資料。

在 JavaScript 中建立一個變數要使用 `let` 關鍵字。

底下的述語建立（或者說：*宣告*）了一個名為 "message" 的變數：

```js
let message;
```

現在我們使用指定運算子 `=` 來放一些資料進去：

```js
let message;

*!*
message = 'Hello'; // 儲存該字串
*/!*
```

這個字串現在被存進與這個變數相關的記憶體區塊中，我們可以使用變數名稱來存取它：

```js run
let message;
message = 'Hello!';

*!*
alert(message); // 顯示變數內容
*/!*
```

若要更精簡，我們可以合併變數宣告和指定，成為單獨一行：

```js run
let message = 'Hello!'; // 定義變數並指定值

alert(message); // Hello!
```

我們也可以在一行中宣告多個變數：

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

這樣看上去雖然更簡短，但我們並不推薦這麼做。為了更好的可讀性，請一行宣告一個變數。

多行變數雖然長了一點，但更易於閱讀：

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

有些人也會這樣子來宣告多行變數：

```js no-beautify
let user = 'John',
    age = 25,
    message = 'Hello';
```

... 或甚至使用 "逗號優先" 的樣式

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

<<<<<<< HEAD
技術上來說，這些變化在都做一樣的事，所以這只是個人的喜好與美學而已。

````smart header="用 `var` 而非 `let`"
在一些較舊的腳本中，你也許會發現另一個關鍵字：`var` 而非 `let`：
=======
Technically, all these variants do the same thing. So, it's a matter of personal taste and aesthetics.

````smart header="`var` instead of `let`"
In older scripts, you may also find another keyword: `var` instead of `let`:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
*!*var*/!* message = 'Hello';
```

`var` 關鍵字 *幾乎* 等同於 `let`，它一樣宣告變數，但有一點點的那麼 "老派" 的差異。

`let` 和 `var` 之間有著微妙的差異，但現在對我們來說還沒什麼，我們將會在 <info:var> 這個章節內涵蓋這些細節。
````

## 一個現實世界的比喻

若把它想像成一個上面貼有獨特命名貼紙的資料 "盒"，我們可以更簡單地掌握 "變數" 這個概念。

例如，變數 `message` 可以被想像成一個被標註上 `"message"` 的盒子，裡面裝著 `"Hello!"` 的值：

![](variable.svg)

我們可以在盒內放入任意值。

我們也可以隨意改變放入的值：

```js run
let message;

message = 'Hello!';

message = 'World!'; // 值被改了

alert(message);
```

當值被改變時，舊的資料將從變數中被移除：

![](variable-change.svg)

我們也可以宣告兩個變數並從某個變數中複製資料到另外一個內。

```js run
let hello = 'Hello world!';

let message;

*!*
// 從 hello 中複製 'Hello world' 到 message 內
message = hello;
*/!*

// 現在兩個變數握有相同的資料
alert(hello); // Hello world!
alert(message); // Hello world!
```

<<<<<<< HEAD
```smart header="函數式語言（Functional languages）"
值得注意的是，有種叫 [函式編程（functional programming）](https://en.wikipedia.org/wiki/Functional_programming) 的語言，像是 [Scala](http://www.scala-lang.org/) 或 [Erlang](http://www.erlang.org/)，禁止更改變數值。
=======
````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
It's interesting to note that there exist [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages, like [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/) that forbid changing variable values.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

在這些語言中，一旦值被 "裝箱" 就永遠在那了，如果我們需要存到別的地方，這種語言強制我們建立一個新的箱子（宣告一個新變數），我們不能再使用舊的。

雖然第一次看起來有點怪，但這些語言更有足夠能力勝任正規的開發，甚至在像是平行計算的領域內，有這些限制反而更好。建議可以研讀一門這樣的語言（即使你近期還沒打算開始用），有助於增廣見聞。
```

## 變數命名 [#variable-naming]

JavaScript 中的變數命名有兩個限制：

1. 命名必須只能包含字母、數字、符號 `$` 和符號 `_`
2. 第一個字元一定不為能數字

有效的命名如下：

```js
let userName;
let test123;
```

當命名包含多個字節時，通常會使用 [駝峰式命名法（camelCase）](https://en.wikipedia.org/wiki/CamelCase)。意即，字節連著字節，除了第一個字節以外，剩下的都以大寫開頭：`myVeryLongName`。

有趣的是 -- 錢字號 `'$'` 和底線 `'_'` 也可以被用來命名。它們像字母一樣只是一般的符號，沒有其他特殊含義。

這些命名是有效的：

```js run untrusted
let $ = 1; // 以 "$" 為名宣告一個變數
let _ = 2; // 用 "_" 作為名稱的變數

alert($ + _); // 3
```

無效的命名如下：

```js no-beautify
let 1a; // 不能以數字開頭

let my-name; // 連字號 '-' 不能用於命名
```

```smart header="大小寫有差"
用 `apple` 和 `AppLE` 命名的變數是不同的。
```

````smart header="可以使用非拉丁字母，但並不建議"
可以使用任意語言，包括西里爾（cyrillic）字母甚至象形文字，像這樣：

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
技術上這樣不會有問題，這些名稱都是被允許的，但國際傳統是使用英文來命名。就算我們只是寫個很小的腳本，它可能也會存活很久，到時其他國家的人也許會需要閱讀它。
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
````

````warn header="保留字（Reserved names）"
這張 [保留字列表](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords) 列出不能用作為變數名稱的字，因為它先被語言使用了。

像是：`let`、`class`、`return` 和 `function` 都被保留。

以下程式碼有語法錯誤：

```js run no-beautify
let let = 5; // 錯誤！不能以 `let` 命名變數。
let return = 5; // 錯誤！也不能用 `return` 命名。
```
````

````warn header="未使用 `use strict` 時的賦值"
一般來說，我們需要在使用變數前定義它。但在舊語法時期，技術上來說可以不使用 `let`，直接靠著給定值來建立變數。若我們不在腳本前面放上 `use strict` 的話，這依然可以運作，用以兼容並維護舊腳本。

```js run no-strict
// 注意：這個例子中未使用 "use strict"

num = 5; // 變數 "num" 若不存在將會被建立

alert(num); // 5
```

這是個糟糕的做法，嚴格模式下會產生錯誤：

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````

## 常數（Constants）
要宣告一個（不可變的）常數，要使用 `const` 而非 `let`：

```js
const myBirthday = '18.04.1982';
```

使用 `const` 宣告的變數稱為 "常數"，它們不可再被重新指定，嘗試去指定的話會產生錯誤：

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // 錯誤，不能對常數重新賦值！
```

當程式設計師確認一個變數將不會再被更動，就可以用 `const` 宣告它以確保並清楚地告知他人這件事。

### 大寫常數

有個普遍的做法是，使用常數作為那些執行程式前就已知有夠難記的值的別名。

這些常數使用大寫字母與底線來命名。

例如，使用常數來代表那些被稱為 "web"（十六進位）格式的顏色：

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...當需要選個顏色時
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

好處：

- `COLOR_ORANGE` 比 `"#FF7F00"` 好記多了。
- `"#FF7F00"` 比 `COLOR_ORANGE` 更容易手殘打錯。
- 閱讀程式碼時，`COLOR_ORANGE` 比 `#FF7F00` 更有意義。

什麼時候我們該使用大寫命名常數，什麼時候正常命名就好？讓我們弄更清楚吧。

作為一個 "常數" 就代表變數的值永不再變動，但有些常數是早在執行程式前就已知的（像代表紅色的十六進位數值），而有些要在執行時期才內被 *計算* 出來，但在賦予值之後就不會被更動。

例如：
```js
const pageLoadTime = /* 載入網頁時間 */;
```

`pageLoadTime` 的值在載入頁面之前是未知的，所以用正常命名就好。但它依然是一個常數，因為被給定值後就不會再變動。

換句話說，大寫命名的常數只作為那些 "被寫死" 的值的別名。

## 正確命名變數

說到變數，還有一件很重要的事。

一個變數名稱應該要有著清楚且明確的含義，用以描述儲存在內的資料。

變數名稱是學習寫程式的過程中，最重要且困難的技巧之一。一眼掃過變數名稱就可以區分出程式碼是新手還是有經驗的老手寫的。

在真實專案中，大部分時間都花在修改且擴展一套現存的程式碼，而非從頭開始寫完全不相干的東西。當我們做了些其他事情後再回來看某段程式碼時，被良好標示過的資訊會是更易於閱讀的，也就是變數有被很好地命名時。

請在宣告變數前花點時間思考一個變數的正確名字，這麼做將會有很好地回報。

一些最好要遵守的規則是：

- 使用人類易讀的名字，像是 `userName` 或 `shoppingCart`。
- 避免使用縮寫或短名稱，像是 `a`、`b` 和 `c`，除非你真的知道你在做什麼。
- 讓名字盡量具有描述性且精簡。`data` 和 `value` 是不良的例子，這些名字沒有含義，只有在程式碼上下文可以特別清楚知道 `data` 或 `value` 是從哪來時才會較適合使用。
- 腦中的字彙應該要與團隊保持一致，若一個網站訪客稱為 "user" 那我們就該命名相關的變數為 `currentUser` 或 `newUser` 而非 `currentVisitor` 或 `newManInTown`。

聽起來很簡單？用聽的當然簡單，但要實際建立一個具描述性且精簡的變數名字就沒那麼簡單，試試看吧。

```smart header="重複使用或建個新的？"
最後一點，有些懶惰的程式員傾向重複使用現有的變數而不宣告一個新的。

這樣的後果是，他們的變數就像被丟了不同東西到箱子裡卻沒有更換箱上的貼紙。現在箱子內有什麼？誰知道。我們需要靠近檢查才行。

這些程式員在變數宣告上省了點時間，但卻會在除錯時失去十倍以上的時間。

一個額外的變數是好的。

現在的 JavaScript 壓縮器（minifiers）和瀏覽器對於程式碼的優化已經夠好了，所以不會產生效能問題。對不同的值使用不同變數甚至可以幫助引擎優化你的程式碼
```

## 總結

我們可以使用關鍵字 `var`、`let` 或 `const` 來宣告變數並儲存資料。

- `let` -- 是現代化變數宣告方式。
- `var` -- 是較老派的變數宣告方式，通常不再使用它。但我們依然會在章節 <info:var> 中介紹它與 `let` 之間的微妙差別，以防你有需要用到它們。
- `const` -- 就像 `let` 但儲存在變數中的值不能再更動。

變數應該要以一種讓大家更容易了解裡面放了什麼的方式命名。

