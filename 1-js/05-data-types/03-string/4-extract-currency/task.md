importance: 4

---

# 提取貨幣

我們以 `"$120"` 格式表示一個費用。即：首先為貨幣符號，然後是數字。

建立一個函式 `extractCurrencyValue(str)` 它將從這樣一個字串中，提取此數字的值，並回傳它。

一個例子：

```js
alert( extractCurrencyValue('$120') === 120 ); // true
```

