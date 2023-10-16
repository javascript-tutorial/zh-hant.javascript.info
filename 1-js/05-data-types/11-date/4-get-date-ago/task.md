importance: 4

---

# 多少天前是這個月的哪一天？

創建一個函數 `getDateAgo(date, days)`，回傳從 `date` 開始算起 `days` 天前的那一天的日期。

例如，如果今天是 20 號，那麼 `getDateAgo(new Date(), 1)` 應該是 19 號，`getDateAgo(new Date(), 2)` 應該是 18 號。

應該對 `days=365` 或更多天的情況也能正常運作：

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (2015 年 1 月 1 號)
alert( getDateAgo(date, 2) ); // 31, (2014 年 12 月 31 號)
alert( getDateAgo(date, 365) ); // 2, (2014 年 1 月 2 號)
```

附註：該函數不應修改給定的 `date`。
