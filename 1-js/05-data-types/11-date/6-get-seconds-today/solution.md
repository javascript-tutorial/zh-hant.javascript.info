要獲得秒數，我們可以使用當前日期和時間 00:00:00 生成一個日期，然後從"現在"中減去它。

差值是從一天開始的毫秒數，我們應該將其除以 1000 以獲得秒數：

```js run
function getSecondsToday() {
  let now = new Date();

  // 使用當前的 天/月/年 建立一個物件：
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // 毫秒差
  return Math.round(diff / 1000); // 變成秒數
}

alert( getSecondsToday() );
```

另一種解法是取得 小時/分鐘/秒 並將它們轉換為秒：

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
