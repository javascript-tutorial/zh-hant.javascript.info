
```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

注意在 `prompt` 之前的一元正號 `+`，它將值立刻轉換為數值。

否則，`a` 和 `b` 是個字串，所以它們的加總將會是字串連接，也就是：`"1" + "2" = "12"`。

