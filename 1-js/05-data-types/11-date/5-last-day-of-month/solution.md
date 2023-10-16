讓我們使用下個月來創建一個日期，但將天數設為零：
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

通常，日期從 1 開始，但從技術上講，我們可以傳遞任何數字，日期將自動調整。所以當我們傳遞 0 時，它表示"月份第一天前的一天"，換句話說："上個月的最後一天"。
