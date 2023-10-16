importance: 4

---

# 格式化相對日期

撰寫一個函數 `formatDate(date)`，應按照以下方式格式化 `date`：

- 如果從 `date` 到現在不足 1 秒，則顯示 `"right now"`。
- 否則，如果從 `date` 到現在不足 1 分鐘，則顯示 `"n sec. ago"`。
- 否則，如果不足一小時，則顯示 `"m min. ago"`。
- 否則，以 `"DD.MM.YY HH:mm"` 的格式顯示完整日期。即：`"day.month.year hours:minutes"`，全部使用 2 位數格式，例如 `31.12.16 10:00`。

例如：

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// 昨天的日期，例如 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
