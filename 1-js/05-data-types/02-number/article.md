# 數值（Numbers）

JavaScript 中所有數值都以 64 位元格式儲存 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) ，亦被稱為 "雙精度浮點數值"。

來從我們已知的部分繼續延伸吧。

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

現在來寫些非常小的數值吧，例如 1 微秒（百萬分之一秒）：

```js
let ms = 0.000001;
```

就跟之前一樣，使用 `"e"` 會有幫助。若我們想避免明確寫下那麼多零，我們可以：

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

We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

So, multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.

````smart header="The funny thing"
Try running this:

```js run
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```

This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, but that's not enough. So the least significant digits disappear.

JavaScript doesn't trigger an error in such events. It does its best to fit the number into the desired format, but unfortunately, this format is not big enough.
````

```smart header="Two zeroes"
Another funny consequence of the internal representation of numbers is the existence of two zeroes: `0` and `-0`.

That's because a sign is represented by a single bit, so every number can be positive or negative, including a zero.

In most cases the distinction is unnoticeable, because operators are suited to treat them as the same.
```



## Tests: isFinite and isNaN

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.

They belong to the type `number`, but are not "normal" numbers, so there are special functions to check for them:


- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    But do we need this function? Can't we just use the comparison `=== NaN`? Sorry, but the answer is no. The value `NaN` is unique in that it does not equal anything, including itself:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converts its argument to a number and returns `true` if it's a regular number, not `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

Sometimes `isFinite` is used to validate whether a string value is a regular number:


```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.  

```smart header="Compare with `Object.is`"

There is a special built-in method [Object.is](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's true, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.

This way of comparison is often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt and parseFloat

Numeric conversion using a plus `+` or `Number()` is strict. If a value is not exactly a number, it fails:

```js run
alert( +"100px" ); // NaN
```

The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

But in real life we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.

That's what `parseInt` and `parseFloat` are for.

They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

There are situations when `parseInt/parseFloat` will return `NaN`. It happens when no digits could be read:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

````smart header="The second argument of `parseInt(str, radix)`"
The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system, so `parseInt` can also parse strings of hex numbers, binary numbers and so on:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Other math functions

JavaScript has a built-in [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object which contains a small library of mathematical functions and constants.

A few examples:

`Math.random()`
: Returns a random number from 0 to 1 (not including 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Returns the greatest/smallest from the arbitrary number of arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Returns `n` raised the given power

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

## Summary

To write big numbers:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is `123` with 6 zeroes.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. That's for one-millionth or such.

For different numeral systems:

- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string and then returns the value they could read before the error.

For fractions:

- Round using `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` or `num.toFixed(precision)`.
- Make sure to remember there's a loss of precision when working with fractions.

More mathematical functions:

- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.
