
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

兩個檢查都是真值時，迴圈 `do..while` 將重複：

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. 檢查 `num <= 100` -- 意即，輸入的值尚未大於 `100`。
2. 檢查 `&& num`，只有在 `num` 為 `null` 或空字串時才為假，此時 `while` 迴圈也會停止。

註：若 `num` 為 `null`，則 `num <= 100` 是 `true`。所以如果沒有第二層檢查，該迴圈在使用者點下 CANCEL 後將不會停止，故兩個檢查都是必要的。
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md

