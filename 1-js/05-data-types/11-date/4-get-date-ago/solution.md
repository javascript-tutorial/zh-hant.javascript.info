想法很簡單：從 `date` 中減去給定的天數：

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...但是，函數不應該改變 `date`。這是很重要的一點，因為給我們日期的外部程式不希望它被改變。

為了實作這一點，讓我們複製這個日期，像這樣：

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (2015 年 1 月 1 號)
alert( getDateAgo(date, 2) ); // 31, (2014 年 12 月 31 號)
alert( getDateAgo(date, 365) ); // 2, (2014 年 1 月 2 號)
```
