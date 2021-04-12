# BigInt

[recent caniuse="bigint"]

`BigInt` 是一種支援任意整數長度的特殊數值類型。

藉由增加 `n` 到整數字面的最後面建立一個大數（bigint）或藉由呼叫 `BigInt` 函式以字串、數字等建立大數。

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 等同 10n
```

## 數學運算子

`BigInt` 通常可以像一般數字使用，例如：

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

請注意：`5/2` 的除法傳回的是四捨五入後結果，不含小數部份。所有在大數上的操作皆傳回大數。

我們不能將大數和一般數字混用：

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

如果需要使用，我們應該明確轉換它們：使用 `BigInt()` 或 `Number()`，像這樣：

```js run
let bigint = 1n;
let number = 2;

// 數字轉大數
alert(bigint + BigInt(number)); // 3

// 大數轉數字
alert(Number(bigint) + number); // 3
```

轉換操作總是默認的，不會給出錯誤，但是如果大數數字大太無法適用在數字類型時，多出來的位元將被截斷，所以我們應該謹慎的進行這類的轉換。

````smart header="大數不支援一元加號"
一元加號運算子 `+value` 眾所皆知，是將 `value` 轉換為數字的方法。

為了避免混淆，在大數上是不支援的：
```js run
let bigint = 1n;

alert( +bigint ); // error
```
所以我們應該使用 `Number()` 去把大數轉換成數字。
````

## 比較

像是 `<`、`>` 的比較，用在大數和數字間是可以的：

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

但是请注意，由於數字跟大數屬於不同類型，因此它們可以等於 `==`，但不能嚴格等於 `===`：

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## 布林值操作

在 `if` 中或其他布林值操作，大數行為類似數字。

例如，在 `if` 中，大數 `0n` 是屬於假，其他值是屬於真：

```js run
if (0n) {
  // 永遠不會執行
}
```

布林值運算子，像是 `||` 、 `&&` 等也可以用在類似數字的大數：

```js run
alert( 1n || 2 ); // 1 (1n是屬於真)

alert( 0n || 2 ); // 2 (0n是屬於假)
```

## Polyfills

大數的 Polyfilling 是棘手的。原因是許多 JavaScript 運算子，像是 `+`、`-` 等的行為在大數和一般數字是不同的。

例如，大數的除法總是傳回大數（必要時會四捨五入）。

要模擬這些行為，這個 polyfill 需要分析程式碼，並使用其函式取代所有運算子。但是這樣很麻煩，而且還會浪費很多效率。

因此，沒有眾所皆知的好 polyfill。

儘管 [JSBI](https://github.com/GoogleChromeLabs/jsbi) 程式庫的開發者提供了其他解決辦法。

這個程式庫使用他們自有的方法實做大數。我們可以使用他們替換原生的大數：

| 操作 | 原生 `BigInt` | JSBI |
|-----------|-----------------|------|
| 以數字建立 | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| 加法 | `c = a + b` | `c = JSBI.add(a, b)` |
| 減法	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...然後使用 polyfill (Babel plugin) 將那些原生大數轉換成呼叫 JSBI ，使瀏覽器支援。

換句話說，這方式建議我們使用 JSBI 替代原生的大數來寫程式碼。JSBI 在內部將數字作為大數，按照規格接近的模擬，所以程式碼將 "可用於大數"。

對於大數支援與否，我們可以 "照原樣"  使用 JSBI 程式碼 - polyfill 將轉換呼叫原生大數。

## 參見

- [MDN 文件上的 BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [規格](https://tc39.es/ecma262/#sec-bigint-objects)
