# 值的比較

我們知道許多數學上的比較運算子：

- 大於/小於： <code>a &gt; b</code>, <code>a &lt; b</code>。
- 大於等於/小於等於：<code>a &gt;= b</code>, <code>a &lt;= b</code>。
- 等於：`a == b`（請注意這裡使用的是兩個等號 `=`。單一個等號 `a = b` 代表的是賦值。
- 不等於：在數學中我們使用 <code>&ne;</code> 來表示，但在 JavaScript 中，是透過在單一個等號前方加上驚嘆號作為表示：<code>a != b</code>。

## 比較結果為 Boolean 類型

如同其他運算子，一個比較運算會回傳一個值。在這個例子中，其回傳值的類型為布林值（Boolean）。

- `true` -- 代表 "yes（是）", "correct（正確）" 或 "the truth（真理）"。
- `false` -- means "no（否）", "wrong（錯誤）" 或 "not the truth（非真理）"。

範例:

```js run
alert( 2 > 1 );  // true (正確)
alert( 2 == 1 ); // false (錯誤)
alert( 2 != 1 ); // true (正確)
```

和其他類型的值一樣，比較運算的結果可以被賦值給任意變數：

```js run
let result = 5 > 4; // 將比較結果賦值給 result 變數
alert( result ); // true
```

## 字串比較

在比較字串間的大小時，JavaScript 採用所謂 "字典" 或是 "辭典" 順序進行判斷。

換句話說，字串是按照其字母（符）逐個進行比較的。

範例:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

字串比較的演算法很簡單：

1. 比較兩個字串的首位字符大小。
2. 若其中一方的第一個字符大於（或小於）另一個字串的第一個字符，則該字串大於（或小於）另一個字串，演算法結束。
3. 然而，若是兩個字串的首位字符相等，則取出各自的後一位字符，以同樣方法進行比較。
4. 重複上述步驟直到任一字串率先用完所有字符。
5. 如果兩個字串同時用完所有字符，也就是擁有相同長度，則可判定雙方為相等。否則，還有尚未比完字符的字串（長度較長）者為大。

在上面的範例中，`'Z' > 'A'` 的比較在第一步揍就取得結果，而字串 `"Glow"` 和 `"Glee"` 則繼續按字符逐個比較：

1. `G` 和 `G` 相等。
2. `l` 和 `l` 相等。
3. `o` 大於 `e`。演算法停止。第一個字串較大。

```smart header="並非真正的字典排序，而是 Unicode 順序"
上述的比較演算法跟字典或是電話簿中的排序演算法約莫相同，但並非完全ㄧ樣。

舉例來說，大小寫是有差異的。一個大寫的 `"A"` 與小寫的 `"a"` 並不相等。哪一個更大呢？小寫的 `"a"`。原因在於小寫字符在 JavaScript 使用的內部編碼表中（Unicode），擁有較大的索引值。我們會在 <info:string> 章節中討論更多相關細節。
```

## 不同類型間的比較

當比較不同類型的值時，JavaScript 會先將它們轉換為數字（number）再進行比較運算。

範例:

```js run
alert( '2' > 1 ); // true, 字串 '2' 轉換為數字 2
alert( '01' == 1 ); // true, 字串 '01' 轉換為數字 1
```

至於布林數值，`true` 變成 `1`，而 `false` 變為 `0`.

範例:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="有趣的結果"
有時候，以下狀況會同時發生：

- 兩個數值是相同的.
- 但若以布林值表示，其中一個是 `true`，另一個則為 `false`。

範例:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

從 JavaScript 的觀點來看，這樣的結果蠻正常的。比較運算會將值先轉成數字後才進行比較（因此，`"0"` 變成了 `0`，而明確的 `Boolean` 函式轉換則採用不同的規則。
````

## 嚴格相等

普通的相等性檢查 `==` 存在一個問題，它分辨不出 `0` 與 `false` 的差別：

```js run
alert( 0 == false ); // true
```

同樣無法區別空字串與 `false`：

```js run
alert( '' == false ); // true
```

這是因為在比較不同類型的值時，`==` 會將其兩側的值轉換為數字。空字串與 `false` 都會變成 0。

如果我們想要區分 `0` 與 `false` 的話該怎麼做呢？

**嚴格相等運算子 `===` 在比較運算時不進行類型轉換.**

換句話說，如果 `a` 與 `b` 屬於不同類型，那 `a === b` 會立即回傳 `false`，並不會執行任何類型轉換。

讓我們試試：

```js run
alert( 0 === false ); // false，因為類型不同。
```

同樣的，與 "不相等" 符號 `!=` 類似，"嚴格不相等" 表示為 `!==`。

嚴格相等運算子寫起來有點長，但它很清楚的表示了比較的意圖，並降低出錯的機率。

## 涉及 null 和 undefined 的比較

當使用 `null` 或 `undefined` 與其他值進行比較時，常會出現意料之外的結果。

若以嚴格相等 `===` 比較 `null` 與 `undefined`：它們是不相等的，因為各自屬於不同類型。

    ```js run
    alert( null === undefined ); // false
    ```

而若以非嚴格相等 `==` 比較兩者：JavaScript 存在一個特別的規則，讓它們就像是 "一對甜蜜情侶"：會判定它們相等於對方（在非嚴格相等 `==` 下），但並不相等於任何其他值。

    ```js run
    alert( null == undefined ); // true
    ```

對於數學式或其他比較方法 `< > <= >=`：`null/undefined` 會轉換為數字：`null` 變成 `0`，而 `undefined` 變成 `NaN`。

接著讓我們來看看，這些規則會帶來哪些有趣的現象。同時，更重要的是，我們該如何避免掉入這些陷阱。

### 奇怪的結果：null vs 0


Let's compare `null` with a zero:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.

### An incomparable undefined

The value `undefined` shouldn't be compared to other values:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.

### Evade problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:

Just treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.

Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.

## Summary

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
