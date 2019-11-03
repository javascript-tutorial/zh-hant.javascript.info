請注意這個解法中微妙又重要的細節，我們不立刻在 `prompt` 之後轉換 `value` 為數值，因為在 `value = +value` 之後我們已經無法分辨空字串（停止的信號）和零（有效數值）。我們晚點再處理轉換這件事。

```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // 該終止了嗎？
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

