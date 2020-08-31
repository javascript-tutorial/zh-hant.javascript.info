
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

兩個檢查都是真值時，迴圈 `do..while` 將重複：

1. 檢查 `num <= 100` -- 意即，輸入的值尚未大於 `100`。
2. 檢查 `&& num`，只有在 `num` 為 `null` 或空字串時才為假，此時 `while` 迴圈也會停止。

註：若 `num` 為 `null`，則 `num <= 100` 是 `true`。所以如果沒有第二層檢查，該迴圈在使用者點下 CANCEL 後將不會停止，故兩個檢查都是必要的。

