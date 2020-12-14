# 數值（Numbers）

<<<<<<< HEAD
在現代 JavaScript 中，有兩種類型的數值：

1. 一般數值以 64 位元格式儲存 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) ，亦被稱為 "雙精度浮點數值"。 這種數值是我們最常使用的類型，而我們將會在這章節中討論它。
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers, to represent integers of arbitrary length. They are sometimes needed, because a regular number can't exceed <code>2<sup>53</sup></code> or be less than <code>-2<sup>53</sup></code>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

2. BigInt 數值，用來表示任意長度的整數。有時我們會需要它，因為一般數字無法超過<code>2<sup>53</sup></code> 或小於 <code>-2<sup>53</sup></code>。 由於 bigints 只用在少數幾個特殊領域，我們將用一個特殊章節來介紹它。 <info:bigint>.

所以這邊我們將會討論一般數值，來從我們已知的部分繼續延伸吧。

## 更多寫下數值的方式

想像我們需要寫 1 個十億，最顯而易見的方式是：

```js
let billion = 1000000000;
```

但現實生活中，我們通常避免寫下有這麼多零的長字串，因為太容易打錯了。同樣地，我們很懶惰，我們通常只想要寫 `"1bn"` 來代表一個十億或 `"7.3bn"` 來代表七十三億，對多數的大數字而言也是同樣態度。

JavaScript 中，我們對於數字附加一個字母 `"e"` 用以指定零的數量來縮短一個數值：

```js run
let billion = 1e9;  // 1 個十億，如字面所說：1 與 9 個零

alert( 7.3e9 );  // 7.3 個十億 (7,300,000,000)
```

換句話說，`"e"` 把該數字乘上 `1` 後面跟著指定數量的零。

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

<<<<<<< HEAD
現在來寫些非常小的數值吧，例如 1 微秒（百萬分之一秒）：
=======
Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js
let ms = 0.000001;
```

<<<<<<< HEAD
就跟之前一樣，使用 `"e"` 會有幫助。若我們想避免明確寫下那麼多零，我們可以：
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could say the same as:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js
let ms = 1e-6; // 在 1 左側有六個零
```

若我們在 `0.000001` 中數零的數量，會有 6 個，所以自然就是 `1e-6`。

換句話說，`"e"` 之後的負數代表除以 1 後面跟著指定數量的零：

```js
// -3 除以 1 後面跟著 3 個零
1e-3 = 1 / 1000 (=0.001)

// -6 除以 1 後面跟著 6 個零
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### 十六進位（hex）、二進位（binary）和八進位（octal）數值

[十六進位（Hexadecimal）](https://en.wikipedia.org/wiki/Hexadecimal) 數值在 JavaScript 中被廣泛地用來表示顏色、字元編碼和其它東西。所以很自然地，它們有個更簡短的寫法：`0x` 然後接該數字。

舉個例：

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255（一樣，大小寫沒差）
```

二進位與八進位數值系統很少被使用，但使用 `0b` 和 `0o` 前置也是支援的：

```js run
let a = 0b11111111; // 255 的二進位
let b = 0o377; // 255 的八進位

alert( a == b ); // true，兩邊都是 255 這個數值
```

只有三種數值系統有這種支援，對於其他數值系統，我們應該要使用函式 `parseInt`（在本章晚點會看到）。

## toString(base)

方法 `num.toString(base)` 回傳在給定 `base` 為基底的數值系統中，`num` 的字串表示法。

例如：

```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` 可以在 `2` 至 `36` 中變換，預設是 `10`。

常用的使用情境是：

- **base=16** 被用於十六進位顏色、字元編碼等，數字可以是 `0..9` 或 `A..F`。
- **base=2** 大多用於除錯以位元為單位的操作，數字可以是 `0` 或 `1`。
- **base=36** 是最大值，數字可以是 `0..9` 或 `A..Z`，整個拉丁字母表都被用來表示數值。對於 `36` 的一個有趣但有用的情境會發生在，當我們需要把一個長數值識別符轉為更簡短時，例如做個短 URL 的時候。使用 `36` 作為基底，可以簡單的在數值系統表示它：

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="兩個句點來呼叫方法"
請注意在 `123456..toString(36)` 中的兩個句點並非打錯字。若我們想直接在數值上呼叫像是上述的 `toString` 方法，那我們需要在其後放兩個句點 `..`。

若我們只放一個句點：`123456.toString(36)`，那就會產生錯誤，因為 JavaScript 的語法中，在第一個句點之後意味著的是小數點部分。而若我們放置多於一個句點，那 JavaScript 就知道小數點部分為空，接下來的是方法。

也可寫成 `(123456).toString(36)`。
```

## 進位（Rounding）

使用數值時最常用的操作之一就是進位。

對於進位有幾個內建函式：

`Math.floor`
: 向下進位：`3.1` 變成 `3`，且  `-1.1` 變成 `-2`。

`Math.ceil`
: 向上進位：`3.1` 變成 `4`，且 `-1.1` 變成 `-1`。

`Math.round`
: 四捨五入進位至最近的整數：`3.1` 變成 `3`、`3.6` 變成 `4` 且 `-1.1` 變成 `-1`。

`Math.trunc`（Internet Explorer 不支援）
: 不進位直接捨去小數點之後的部分：`3.1` 變成 `3`，`-1.1` 變成 `-1`。

這邊的表總結了它們之間的差異：

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |

這些函式涵蓋處理一個數值其小數點部分的所有可能方法。但如果我們想要進位數值到小數點後 `第 n 位` 該怎麼辦？

舉個例，我們有個 `1.2345` 且想要進位它到小數點後第二個數字，只得到 `1.23`。

有兩種方式可以做到：

1. 乘法和除法。

    例如，要進位到該數值小數點後第二個數字，我們可以乘以數字 `100`，呼叫進位函式然後再除回來。

<<<<<<< HEAD
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100` (or a bigger power of 10), call the rounding function and then divide it back.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. 方法 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 進位數值到小數點後第 `n` 個數字，並回傳其結果的字串表示法。

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    這會向上或向下進位至最近的值，類似 `Math.round`：

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    請注意 `toFixed` 的結果是個字串，若小數點部分比要求的還短，結尾會被添加零：

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000"，加零來讓它剛好五個數字
    ```

    我們可以使用一元正號將它轉為數值或是呼叫 `Number()`：`+num.toFixed(5)`。

## 不精確計算

在內部，數值使用 64 位元格式表示 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision)，所以只有 64 個位元用來儲存一個數值：其中 52 個用來儲存數字部分，11 個用來儲存小數點位置（對整數來說都是零），且 1 個位元表示正負號。

若某個數值太大，它可能會溢出 64 位元的儲存空間，潛在地給出無窮大（infinity）：

```js run
alert( 1e500 ); // Infinity
```

精度的損失稍微沒那麼明顯但卻很常發生。

考慮這個（錯的！）測試：

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

沒錯，若我們確認 `0.1` 和 `0.2` 的總和是否為 `0.3`，會得到 `false`。

奇怪吧！如果不是 `0.3` 那它是什麼？

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

哎呀！這會造成比不正確的比較更為嚴重的後果。想像一下你正在製作電子商務網站，而訪問者放入 `$0.10` 和 `$0.20` 的商品到購物車內，但訂單總額卻是 `$0.30000000000000004`，那會讓任何人都感到驚訝。

但這為什麼會發生？

數值在記憶體中以二進位格式存放，一和零的一串位元。但像是 `0.1`、`0.2` 這樣在十進位數值系統內很簡單的小數點，實際上在二進位格式內是循環小數。

換句話說，什麼是 `0.1`？是一除以十 `1/10`，也就是十分之一，在十進位數值系統中要表示這種數值很簡單。但跟三分之一比較看看：`1/3`，就變成一個無窮循環小數了 `0.33333(3)`。

因此，除以 `10` 的次方數在十進位系統中保證運作良好，但除以 `3` 就不是了。同樣的原因，在二進位數值系統中，除以 `2` 的次方數保證可以運作，但 `1/10` 會變成一個無窮循環小數。

使用二進位系統的話，並沒有儲存 *精確 0.1* 或 *精確 0.2* 的方式，就像在十進位小數中沒有儲存三分之一的方式一樣。

IEEE-754 數值格式透過進位至最近的可能數值來解決這個問題，這些進位規則通常不會讓我們看到 "極微小精度損失"，但它確實存在。

我們這樣做就看的到：

```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

且當我們相加兩個數值時，它們的 "精度損失" 也加上去了。

這也是為什麼 `0.1 + 0.2` 不是剛好為 `0.3`。

```smart header="不僅是 JavaScript 而已"
同樣的問題存在許多程式語言之中。

PHP、Java、C、Perl、Ruby 都給出同樣的結果，因為它們都以同一個數值格式為基底。
```

我們有辦法繞過這個問題嗎？當然，最可靠的做法就經由方法 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 的幫助將結果進位處理：

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

請注意 `toFixed` 總是回傳字串。它保證小數點後會有兩個數字。若我們有一個電子商務網站且需要顯示 `$0.30` 時，這實際上是很方便的。對於其它情境，我們可以使用一元正號以強制轉為數值：

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

我們也可以暫時將此數乘以 100（或一個更大的數）以將其轉成整數，做完運算後再除回來。然後在我們對整數做運算時，這個問題就會稍微減輕，但我們依然會在除法時遇到：

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

所以，乘/除 的作法雖然減少錯誤，但卻不能完全消除。

有時候我們可以試著完全避免分數。像是若我們在處理一個商店時，我們可以用美分而不是用美元來儲存價格。但若我們採用 30% 的折扣時怎麼辦？實際上，不太可能完全避免使用分數。就只能採取進位並在需要時切除 "尾部" 的作法了。

````smart header="有趣的事情"
試著執行這個看看：

```js run
// 哈囉！我是個自主遞增的數字！
alert( 9999999999999999 ); // shows 10000000000000000
```

這也來自於同樣的問題：精度損失。對於數值有 64 個位元，其中 52 個被用來存數字，但那並不夠。所以最低位的數字消失了。

JavaScript 在這種事件下不會觸發錯誤，它會盡全力讓數值符合所需要的格式，但很不幸的，這個格式並不夠大。
````

```smart header="兩個零"
另一個數值內部表現的有趣結果是，存在有兩個零：`0` 和 `-0`。

<<<<<<< HEAD
這是因為使用單一個位元來表示正負號，所以每個數值都可以為正或負，包括零。
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

在大多情況下不會注意到有這樣的區別，因為運算子對待它們一視同仁。
```

<<<<<<< HEAD
## 測試：isFinite 和 isNaN

還記得這兩個特別的數值嗎？

- `Infinity`（和 `-Infinity`）是個大於（小於）任何東西的特殊數值。
- `NaN` 表示有錯誤產生。
=======
## Tests: isFinite and isNaN
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

它們屬於 `數值` 類型，但並非 "一般" 數值，因此有特別的函式用來確認它們：

- `isNaN(value)` 轉換它的引數為數值，然後測試它是否為 `NaN`：

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    但我們需要這個函式嗎？不能只用 `=== NaN` 這樣的比較嗎？抱歉，答案是不行。`NaN` 這個值很特殊，它不會跟任何東西相等，包括它自己：

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` 轉換它的引數為一個數值，並在它是個普通的數值而非 `NaN/Infinity/-Infinity` 時回傳 `true`：

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false，因為是個特殊數值：NaN
    alert( isFinite(Infinity) ); // false，因為是個特殊數值：Infinity
    ```

有時候 `isFinite` 被用來檢驗字串的值是否是個普通數值：

```js run
let num = +prompt("Enter a number", '');

// 除非你輸入 Infinity、-Infinity 或非數值的東西，不然就會是 true
alert( isFinite(num) );
```

請注意空字串或是只有空格在內的字串，在包括 `isFinite` 在內的所有的數值函式中，都會被視為 `0`。

```smart header="和 `Object.is` 相比"

<<<<<<< HEAD
有個特殊的內建方法 [Object.is](mdn:js/Object/is) 以像是 `===` 的方式來比較值，但對於這兩種邊緣案例而言會更可靠：
=======
There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

1. `NaN` 適用：`Object.is(NaN, NaN) === true`，這是件好事。
2. 值 `0` 和 `-0` 是不同的：`Object.is(0, -0) === false`，技術上來說這是對的，因為在數值內部有個正負號位元不同，就算其它位元都為零。

在其它情況下，`Object.is(a, b)` 與 `a === b` 相同。

這種比較方式通常用於 JavaScript 規格內，當一個內部演算法需要比較兩個值是否完全相等時，會使用 `Object.is`（內部稱為[SameValue](https://tc39.github.io/ecma262/#sec-samevalue)）。
```

## parseInt 和 parseFloat

數值轉換使用一個正號 `+` 或 `Number()` 是嚴格的做法。若其值不完全是個數值，就會失敗：

```js run
alert( +"100px" ); // NaN
```

唯一的例外是字串起始或結尾的空格，它們會被忽略。

但在現實世界裡數字通常會給單位，像是 CSS 內的 `"100px"` 或 `"12pt"`。在許多國家貨幣符號也會放在數量之後，所以我們可能會有 `"19€"` 並想把其中的數值抽出來的情況。

這就是 `parseInt` 和 `parseFloat` 要處理的。

它們從字串中盡可能 "讀取" 一個數值直到不行為止。若有錯誤，被收集的數值依然會被回傳。函式 `parseInt` 回傳整數，而 `parseFloat` 會回傳浮點數：

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12，只有整數部分被回傳
alert( parseFloat('12.3.4') ); // 12.3，第二個句點停止讀取
```

有些情況 `parseInt/parseFloat` 會回傳 `NaN`，這發生在沒有任何數字可以被讀取時：

```js run
alert( parseInt('a123') ); // NaN，第一個符號就停止處理
```

````smart header="`parseInt(str, radix)` 的第二個引數"
`parseInt()` 函式有個可選的第二個參數，它指定數值系統的基底，所以 `parseInt` 也可以解析十六進位、二進位等等數值的字串：

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，沒有 0x 也行

alert( parseInt('2n9c', 36) ); // 123456
```
````

## 其它數學函式

JavaScript 有個內建的 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 物件包含了小型的數學函式庫與常數。

幾個例子：

`Math.random()`
: 回傳由 0 至 1 的隨機數值（不包含 1）

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ...（其它隨機數值）
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: 回傳引數中的 最大值/最小值。

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: 回傳 `n` 的給定次方數

    ```js run
    alert( Math.pow(2, 10) ); // 2 的 10 次方 = 1024
    ```

<<<<<<< HEAD
在 `Math` 物件中有更多的函式與常數，包括三角函數，你可以在 [Math 的文件](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 中找到。

## 總結
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

要寫一個擁有許多零的數值：

<<<<<<< HEAD
- 附加 `"e"` 與零的數量到數值後方，像是：`123e6` 是 `123` 後有 6 個零。
- `"e"` 之後的負數會使得數值除以 1 的後面帶有給定數量的零，像是百萬分之一這樣。

對於不同的數值系統：
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

- 可以直接寫十六進位（`0x`）、八進位（`0o`）和二進位（`0b`）系統。
- `parseInt(str, base)` 於給定 `base` 為基底的數值系統內，將字串 `str` 解析為整數，其中 `2 ≤ base ≤ 36`。
- `num.toString(base)` 於給定 `base` 為基底的數值系統內，將數值轉換為字串。

<<<<<<< HEAD
要轉換像是 `12pt` 和 `100px` 的值為數值：
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

- 對於 "軟性" 轉換使用 `parseInt/parseFloat`，這會從字串讀取數值且在錯誤之前回傳它盡可能讀取到的值。

對於分數：

- 進位使用 `Math.floor`、`Math.ceil`、`Math.trunc`、`Math.round` 或 `num.toFixed(precision)`。
- 使用分數時，要記得會有精度損失。

更多數學函式：

- 當你需要時，查看 [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) 物件，這個函式庫很小，但涵蓋基礎的需求。

