答案：先顯示 `1` 再顯示 `2`。

```js run
alert( alert(1) || 2 || alert(3) );
```

呼叫 `alert` 沒有回傳值。或者，換句話說，它回傳 `undefined`。

<<<<<<< HEAD
1. 第一個 OR `||` 核定它左側的運算元 `alert(1)`，它顯示第一段訊息 `1`。
2. 該 `alert` 回傳 `undefined`，接著 OR 來到第二個運算元尋找真值。
3. 第二個運算元 `2` 是真值，所以執行停止，`2` 被回傳並且被外部的 alert 顯示。
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

不會顯示 `3`，因為核定根本到不了 `alert(3)`。
