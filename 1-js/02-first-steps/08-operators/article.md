<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# 運算子（Operators）
=======
# Basic operators, maths
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

我們從學校學到許多運算子，像是加法 `+`、乘法 `*`、減法 `-` 等等。

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
在本章，我們會更專注有別於學校算術運算涵蓋的部分。
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

## 術語："一元運算子（unary）"、“二元運算子（binary）"、"運算元（operand）"

在我們開始之前，來看看一些常用的術語。

- *運算元（operand）* -- 是運算子套用的對象。例如在乘法` 5 * 2` 之中有兩個運算元：左側運算元是 `5` 而右側運算元是 `2`，有時候人們稱之為 "引數 (arguments)" 而非 "運算元"。
- 運算子若只有單獨一個運算元，稱之為 *一元運算子（unary）*，例如，一元負號運算子 `-` 用於對數值正負轉換：

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1，套用一元負號運算子
    ```
- 運算子若有兩個運算元則稱之為 *二元運算子（binary）*，減號也有二元運算子的形式：

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2，二元減號運算子套用減法
    ```

    正式地說，上例中的兩種不同運算子使用同一個符號：一元負號運算子（單一個運算元，正負轉換）和二元減號運算子（兩個運算元，一對一的數值減法）。

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## 字串連接，二元運算子 +

現在來看看學校沒教的 JavaScript 特殊功能運算子。
=======
## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
alert( 8 % 3 ); // 2, a remainder of 8 divided by 3
```

### Exponentiation **

The exponentiation operator `a ** b` multiplies `a` by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 multiplied by itself 2 times)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 times)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 times)
```

Mathematically, the exponentiation is defined for non-integer numbers as well. For example, a square root is an exponentiation by `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

通常加法運算子 `+` 用於加總數值。

但如果此二元運算子 `+` 被用在字串上，它將合併（連接）字串們：

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
注意只要某一側運算元是字串，另一側將會被轉換成字串類型。
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

例如：

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
看吧，它並不在意字串是第一個還是第二個運算元，規則就是如此簡單：若一側運算元是字串，另一側就也會被轉成字串。

然而要注意由左到右一系列的運算。如果是兩個數值運算然後才接著字串，數值們會在被轉成字串前先被加總：
=======
See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

```js run
alert(2 + 2 + '1' ); // "41" 而非 "221"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
字串連結與轉換是二元加法運算子的一個特殊功能。其他算術運算只用於數值上，且總是會將它們的運算元轉為數值。

例如，減法和除法：
=======
Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = 41`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## 數值轉換，一元運算子 +

加法 `+` 存在兩種型式：上面提到的二元運算子型式與一元運算子型式。

一元正號運算子，或者說套用在單一個值上的加法運算子，不會對數值做任何事。但如果運算元不是個數值，一元正號運算子就會將它轉為數值。

例如：

```js run
// 對數值沒有作用
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// 轉換非數值
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

事實上它做的事和 `Number(...)` 相同，只是更簡短。

從字串轉成數值的需求常會出現，例如我們從 HTML 表格欄位中拿出的值通常會是字串，我們該怎麼加總它們？

二元加法運算子會將兩者都作為字串連接：

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23"，二元加法運算子連結字串們
```

若我們想要視其為數值，就需要轉換後再加總：

```js run
let apples = "2";
let oranges = "3";

*!*
// 在二元加法運算子運作前，把兩個值都轉成數值
alert( +apples + +oranges ); // 5
*/!*

// 更長的寫法
// alert( Number(apples) + Number(oranges) ); // 5
```

從一個數學家的角度，大量的加號看起來很怪，但從一個程式設計師的角度，這沒什麼特別的：一元正號運算子會先被套用，把字串轉換成數值，然後二元加法運算子才加總起來。

為什麼一元正號運算子會在二元加法運算子之前被套用在值上？這就是我們即將要討論的，因為它們 *有著更高的優先權*。

## 運算子優先權（precedence）

如果一個表達式有多於一個運算子，執行順序會依據它們的 *優先權* 決定，換句話說，運算子們有預設的優先權順序。

在學校時，我們都知道在算式 `1 + 2 * 2` 中的乘法會在加法前先被計算，這就是優先權的概念，乘法被認為有著比加法 *更高的優先權*。

小括號會改寫優先權，所以如果我們無法滿足於預設的順序，我們可以用小括號來變更，例如這樣寫 `(1 + 2) * 2`。

JavaScript 中有許多運算子，每個運算子都有個對應的優先權號碼，更大號碼的運算子會更早執行。若優先權相同，則按照左至右的方式執行。

這個表格來自於 [優先權列表](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)（你不需要記憶這個表，只要注意一元運算子都比對應的二元運算子有更高權限就好）：

| 優先權 | 名稱 | 符號 |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 17 | 一元正號 | `+` |
| 17 | 一元負號 | `-` |
| 15 | 乘法 | `*` |
| 15 | 除法 | `/` |
| 13 | 加法 | `+` |
| 13 | 減法 | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 16 | exponentiation | `**` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md
| ... | ... | ... |
| 3 | 指定 | `=` |
| ... | ... | ... |

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
我們可以看到，"一元正號運算子" 有著優先權號碼 `17`，比 "加法（二元加法運算子）" 的 `13` 還高。這也是為什麼在表達式 `"+apples + +oranges"` 中，一元正號運算子比加法還要更早運作。
=======
As we can see, the "unary plus" has a priority of `17` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

## 指定運算子（Assignment）

注意看指定符號 `=` 也是一個運算子，它也被列在優先權列表中，但只有非常低的優先權 `3`。

這就是為什麼當我們指定一個變數，像是 `x = 2 * 2 + 1` 時，計算會先完成然後才指定，把結果存入 `x` 中。

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
鏈結指定是可行的：

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

鏈結指定會由右至左進行。首先，最右邊的表達式 `2 + 2` 先被計算，然後再被指定給左側的變數們：`c`、`b` 和 `a`，最後所有的變數都會分享同一個值。

````smart header="指定運算子 `\"=\"` 會回傳一個值"
一個運算子總是會回傳一個值，這在大部分像是加法 `+` 或乘法 `*` 運算上都很明顯，而指定運算子也遵守這個規則。
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

Most operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

呼叫 `x = value` 把 `value` 寫進 `x` 內 *並且回傳 x*。

這裡演示了一段利用指定操作作為某個稍微複雜的表達式的一部分：

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

上面例子中，表達式 `(a = b + 1)` 的結果是 `a` 被指定的值 (也就是 `3`)，接著被用於進一步的運算上。

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
很有趣的程式碼對吧？我們應該了解它是如何運作的，因為有時候會在 JavaScript 函式庫中看到它。但我們不該自己寫成這樣，這種技巧真的不會讓程式碼變得更乾淨或易讀。
````

## 餘數運算子（Remainder）%

餘數運算子 `%` 和百分比沒關係，就算看起來長得很像。

`a % b` 的結果是 `a` 以整數除法除以 `b` 之後的餘數。

例如：

```js run
alert( 5 % 2 ); // 1 是 5 除以 2 的餘數
alert( 8 % 3 ); // 2 是 8 除以 3 的餘數
alert( 6 % 3 ); // 0 是 6 除以 3 的餘數
```

## 指數運算子（Exponentiation）**

指數運算子 `**` 近期才被加到這個語言之中。

對一個數 `b` 而言，`a ** b` 的結果是 `a` 與自己相乘共 `b` 次。

例如：
=======
Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
該運算子也可用於非整數上。

如：

```js run
alert( 4 ** (1/2) ); // 2（數學上 1/2 次方代表著開平方根）
alert( 8 ** (1/3) ); // 2（1/3 次方代表著開立方根）
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md
```

## 遞增（Increment）/ 遞減（decrement）

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

一次遞增或遞減一個數值幾乎是最常見到的數值運算。

因此有些特殊運算子存在：

- **Increment** `++` 使變數增加 1：

    ```js run no-beautify
    let counter = 2;
    counter++;        // 與 counter = counter + 1 相同，但更簡短
    alert( counter ); // 3
    ```
- **Decrement** `--` 使變數減少1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // 與 counter = counter - 1 相同，但更簡短
    alert( counter ); // 1
    ```

```warn
遞增/遞減 只可以套用在變數上，用在一般數值上，像是 `5++`，將會導致錯誤。
```

`++` 和 `--` 運算子 可被置於變數的前或後其中一位置。

- 當該運算子置於變數之後，視為 "後置型式 (postfix form)"：`counter++`。
- "前置型式 (prefix form)" 就是當該運算子放在變數之前時：`++counter`。

這兩種述語都做一樣的事：`counter` 加一。

有什麼差嗎？有，但只有使用 `++/--` 的回傳值時我們才看得出差異。

來說明一下吧。如我們所知，所有運算子都會回傳一個值，遞增/遞減 也不例外。前置型式回傳遞增後的新值，而後置型式回傳舊的值（在 遞增/遞減 之前）。

用這個例子來看看兩者的不同：

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

在 `(*)` 行中，*前置* 型式 `++counter` 遞增 `counter` 並回傳了新的值 `2`，所以 `alert` 顯示 `2`。

現在來使用後置型式看看：

```js run
let counter = 1;
let a = counter++; // (*) 由 ++counter 改成 counter++

alert(a); // *!*1*/!*
```

在 `(*)` 行中，*後置* 型式 `counter++` 也遞增了 `counter`，但回傳的是 *舊* 的值，所以 `alert` 顯示 `1`。

總結一下：

- 如果 遞增/遞減 的結果沒被使用，兩者之間將沒有區別：

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2 上面兩行做一樣的事
    ```
- 如果我們想遞增一個值 *並* 立刻使用運算結果，需要使用前置型式：

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- 如果我們想遞增一個值但使用原先的值，需要使用後置型式：

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="遞增/遞減 用於其他運算子"
`++/--` 運算子也可被用於表達式中，它們的優先權比大部分數學運算都還高。

例如：

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

與此相比：

```js run
let counter = 1;
alert( 2 * counter++ ); // 2，因為 counter++ 回傳 "舊" 值
```

儘管技術上沒問題，這種寫法通常讓程式碼閱讀性變差。一行做多件事 -- 不太好。

當閱讀程式碼時，眼光快速地 "垂直" 掃視很容易忽略像是 `counter++` 這種東西，以至於變數有遞增變的不明顯。

我們建議採用 "一行 -- 一動作" 的風格：

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## 位元運算子 (Bitwise operators)

位元運算子視引數為 32 位元整數值，並在其二進位表示的層面上運作。

這些運算子不是 JavaScript 特有的，大多數的程式語言都有支援。

這類運算子列表：

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
這些運算子很少被使用，為了理解它們，我們必須得鑽研數值的底層表示方式，但現在不是個好時機，尤其是我們不會很快需要使用它們時。如果你有興趣，可以閱讀 MDN 上的這篇文章 [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)。在有具體需求時再來查看比較實際。

## 原地修改 (Modify-in-place)

我們常常需要在一個變數上套用某運算子，然後把新的值存入同樣的變數內。

例如：

```js
let n = 2;
n = n + 5;
n = n * 2;
```

使用 `+=` 和 `*=` 運算子的寫法會更簡潔：

```js run
let n = 2;
n += 5; // 現在 n = 7（與 n = n + 5 相同）
n *= 2; // 現在 n = 14（與 n = n * 2 相同）

alert( n ); // 14
```

簡短的 "修改並指定" 運算子在所有數學與位元運算子都適用：`/=`、`-=` 等。

該運算子有著與指定運算子相同的優先權，所以會在其它運算之後才執行：

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16（右側先被計算，與 n *= 8 相同）
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN when a need arises.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/08-operators/article.md

## 逗號運算子

逗號運算子 `,` 是最少看到且最不成被使用的運算子之一，但有時它被用於寫出更簡短的程式碼，所以我們需要了解它才會知道發生什麼事。

逗號運算子允許我們計算多個表達式，以逗號 `,` 分開。每個表達式分開計算，但只有最後一個的結果會被回傳。

例如：

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7（3 + 4 的結果）
```

在此，第一個表達式 `1 + 2` 被計算但結果被拋棄，然後 `3 + 4` 被計算後回傳其結果。

```smart header="逗號的優先權非常低"
請注意逗號運算子有著非常低的優先權，比 `=` 還更低，所以在上面的例子中括號非常重要。

少了括號的話：`a = 1 + 2, 3 + 4` 會先計算 `+`，將值相加得到 `a = 3, 7` 後，指定運算子`=` 指定 `a = 3`，剩下的就被忽略了。整個看來就像是 `(a = 1 + 2), 3 + 4`。
```

我們為什麼需要一個會拋棄，除了最後的表達式以外，運算結果的運算子？

有時候人們會在更複雜的結構上使用它，來把多個動作放入一行內。

例如：

```js
// 一行做三個運算
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

這種技巧在很多 JavaScript 框架中被使用，這也是我們為什麼要提到它。但通常這並不會增加程式碼的可讀性，所以我們在使用前要審慎思考過。

