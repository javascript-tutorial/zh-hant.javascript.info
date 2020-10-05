# 值的比較

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
我們知道許多數學上的比較運算子：

- 大於/小於：<code>a &gt; b</code>, <code>a &lt; b</code>。
- 大於等於/小於等於：<code>a &gt;= b</code>, <code>a &lt;= b</code>。
- 等於：`a == b`（請注意這裡使用的是兩個等號 `=`。單一個等號 `a = b` 代表的是賦值。
- 不等於：在數學中我們使用 <code>&ne;</code> 來表示，但在 JavaScript 中，是透過在單一個等號前方加上驚嘆號作為表示：<code>a != b</code>。
=======
We know many comparison operators from maths.

In JavaScript they are written like this:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b`, please note the double equality sign `==` means the equality test, while a single one `a = b` means an assignment.
- Not equals. In maths the notation is <code>&ne;</code>, but in JavaScript it's written as <code>a != b</code>.

In this article we'll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.

At the end you'll find a good recipe to avoid "JavaScript quirks"-related issues.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/02-first-steps/09-comparison/article.md

## 比較結果為布林（Boolean）類型

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
如同其他運算子，一個比較運算會回傳一個值。在這個例子中，其回傳值的類型為布林值（Boolean）。
=======
All comparison operators return a boolean value:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/02-first-steps/09-comparison/article.md

- `true` -- 代表 "yes（是）", "correct（正確）" 或 "the truth（真理）"。
- `false` -- means "no（否）", "wrong（錯誤）" 或 "not the truth（非真理）"。

範例:

```js run
alert( 2 > 1 );  // true（正確）
alert( 2 == 1 ); // false（錯誤）
alert( 2 != 1 ); // true（正確）
```

和其他類型的值一樣，比較運算的結果可以被指定給任意變數：

```js run
let result = 5 > 4; // 將比較結果指定給 result 變數
alert( result ); // true
```

## 字串比較

在比較字串間的大小時，JavaScript 採用所謂 "字典" 或是 "辭典" 順序進行判斷。

換句話說，字串是按照其字母（符）逐個進行比較的。

範例：

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

字串比較的演算法很簡單：

1. 比較兩個字串的首位字元大小。
2. 若其中一方的第一個字元大於（或小於）另一個字串的第一個字元，則該字串大於（或小於）另一個字串，演算法結束。
3. 然而，若是兩個字串的首位字元相等，則取出各自的下一位字元，以同樣方法進行比較。
4. 重複上述步驟直到任一字串率先用完所有字元。
5. 如果兩個字串同時比完所有字元，意即擁有相同長度，則可判定雙方為相等。否則，具有尚未比完字元的字串（長度較長）者為大。

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
在上面的範例中，`'Z' > 'A'` 在第一步驟就取得結果，而字串 `"Glow"` 和 `"Glee"` 則繼續按字元逐個比較：
=======
In the first example above, the comparison `'Z' > 'A'` gets to a result at the first step.

The second comparison `'Glow'` and `'Glee'` needs more steps as strings are compared character-by-character:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/02-first-steps/09-comparison/article.md

1. `G` 和 `G` 相等。
2. `l` 和 `l` 相等。
3. `o` 大於 `e`，演算法停止，第一個字串較大。

```smart header="並非真正的字典排序，而是 Unicode 順序"
上述的比較演算法跟字典或是電話簿中的排序演算法大致相同，但並非完全ㄧ樣。

譬如大小寫是有差異的，一個大寫的 `"A"` 與小寫的 `"a"` 並不相等。哪一個更大呢？是小寫的 `"a"`。原因在於小寫字符在 JavaScript 使用的內部編碼表中（Unicode）擁有較大的索引值，我們會在 <info:string> 章節中討論更多相關細節。
```

## 不同類型間的比較

當比較不同類型的值時，JavaScript 會先將它們轉換為數值（number）再進行比較。

範例:

```js run
alert( '2' > 1 ); // true, 字串 '2' 轉換為數值 2
alert( '01' == 1 ); // true, 字串 '01' 轉換為數值 1
```

至於布林值，`true` 變成 `1`，而 `false` 變為 `0`。

範例:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="有趣的結果"
有時候，以下狀況會同時發生：

- 兩者值相同。
- 但若以布林值表示，其中一個是 `true`，另一個則為 `false`。

範例:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

從 JavaScript 的觀點來看，這樣的結果還算正常的。比較運算會將值先轉成數值後才進行比較（因此，`"0"` 變成了 `0`，而明確的 `Boolean` 函式則採用不同的轉換規則。
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

這是因為不同類型的運算元會被等號運算子 `==` 轉換成數值，空字串與 `false` 都會變成 0。

如果我們想要區分 `0` 與 `false` 的話該怎麼做呢？

**嚴格相等運算子 `===` 在比較運算時不進行類型轉換。**

換句話說，如果 `a` 與 `b` 屬於不同類型，那 `a === b` 會立即回傳 `false`，並不會執行任何類型轉換。

讓我們試試：

```js run
alert( 0 === false ); // false，因為類型不同。
```

也有與 `!=` 類似的 "嚴格不相等" 運算子 `!==`。

嚴格相等運算子寫起來有點長，但它很清楚的表示了比較的意圖，並降低出錯的機率。

## 涉及 null 和 undefined 的比較

當使用 `null` 或 `undefined` 與其他值進行比較時，常會出現意料之外的結果。

若以嚴格相等 `===` 做比較
: `null` 與 `undefined` 是不相等的，因為各自屬於不同類型。

    ```js run
    alert( null === undefined ); // false
    ```

若以非嚴格相等 `==` 做比較
: 存在一個特殊規則是，這兩者被視為一對 "甜蜜情侶"：它們彼此相同（在非嚴格相等 `==` 下），但並不相等於其它任何值。

    ```js run
    alert( null == undefined ); // true
    ```

對於數學式或其他比較方法 `< > <= >=`
: `null/undefined` 會轉換為數值：`null` 變成 `0`，而 `undefined` 變成 `NaN`。

接著讓我們來看看，這些規則會帶來哪些有趣的現象。同時，更重要的是，我們該如何避免掉入這些陷阱。

### 奇怪的結果：null vs 0

我們來比較 `null` 與 0：

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

從數學的角度來看，上面的結果很奇怪。最後一行程式碼的執行結果顯示 "`null` 大於等於 0"，既然如此，第一與第二行程式碼中，必定有一個的結果為 `true`，然而事實表明其結果皆為 false。

之所以會出現這個奇怪的結果，是因為相等性檢查 `==` 與比較運算子 `> < >= <=` 的運作邏輯是不同的，比較運算會將 `null` 轉成數值並將其視為 `0`。這就是為何 （3）`null >= 0` 的結果為 true，而（1）`null > 0` 為 false。

另一方面，`undefined` 與 `null` 在相等性檢查中，被定義為不進行任何類型轉換，且它們除了彼此相等外，不會相等於其他類型的值。這解釋了為什麼（2）`null == 0` 的結果是 false。

### 無法比較的 undefined

`undefined` 不應該用來與任何值比較：

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

為何它如此討厭 0？總是回傳 false！

原因如下：

- 比較式 `（1）`與`（2）`回傳 `false`，因為 `undefined` 在進行比較時，被轉換成了 `NaN`，而 `NaN` 是一個特殊的數字類型，它與任何值比較都會回傳 `false`。
- 相等性檢查 `（3）`回傳 `false`，因為在定義中， `undefined` 只與 `null` 和 `undefined` 相等，不會與其他值相等。

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
### 避免錯誤

為何我們要研究上述範例呢？我們應該要時刻記住這些奇怪的規則嗎？其實並不需要。實際上，隨著時間，你會對這些奇怪的事情漸漸熟悉，但有個更為可靠的方式可以用來避免這方面的問題：

除了嚴格相等 `===` 以外，其他凡是有 `undefined/null` 參與的比較運算，多放點心思注意一下。

除非你非常清楚自己在做什麼，否則不要使用 `>= > < <=` 去比較一個可能為 `null/undefined` 的變數。如果一個變數可能會是 `null/undefined`，將這兩者的可能情況分開檢查。
=======
### Avoid problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to avoid problems with them:

- Treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.
- Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:1-js/02-first-steps/09-comparison/article.md

## 總結

- 比較運算子總是回傳布林值。
- 字串間的比較是按照 "字典" 順序逐個字符（母）比較。
- 當不同類型的值互相比較時，他們會先被轉換成數值類型（不包含嚴格相等檢查）再進行比較。
- 在非嚴格相等 `==` 下，`null` 與 `undefined` 彼此相等且不等於任何其他值。
- 在使用 `>` 或 `<` 比較時，要小心變數可能為 `null/undefined` 的情況。各別檢查變數是否為 `null/undefined` 會是個好方法。

