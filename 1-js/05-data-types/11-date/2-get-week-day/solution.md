方法 `date.getDay()` 返回從星期日開始的星期幾的編號。

讓我們建立一個包含星期名稱的陣列，這樣我們就可以通過編號獲得相應的星期名稱：

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 2014 年 1 月 3 號
alert( getWeekDay(date) ); // FR
```
