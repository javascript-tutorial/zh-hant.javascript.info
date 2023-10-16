要獲得距離明天的毫秒數，我們可以從 "明天 00:00:00" 中減去當前日期。

首先，我們生成"明天"，然後減去當前日期：

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // 明天
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // 毫秒差
  return Math.round(diff / 1000); // 變成秒數
}
```

另一種解法：

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

請注意，許多國家實行夏令時制度（DST），因此可能有 23 小時或 25 小時的日子。我們可能需要單獨處理這些日子。
