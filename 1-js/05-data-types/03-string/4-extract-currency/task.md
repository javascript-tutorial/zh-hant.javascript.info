importance: 4
重要程度：4

---

# Extract the money 提取貨幣

We have a cost in the form `"$120"`. That is: the dollar sign goes first, and then the number.
我們以 `"$120"` 的形式表示一個費用，意味著：首先為貨幣符號，然後是數字。

Create a function `extractCurrencyValue(str)` that would extract the numeric value from such string and return it.
建立一個函式 `extractCurrencyValue(str)` 它將從這樣一個字串中，提取此數字的值，並回傳它。

The example:
一個例子：

```js
alert( extractCurrencyValue('$120') === 120 ); // true
```

