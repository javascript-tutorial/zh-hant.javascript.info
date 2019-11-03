我們需要 "對應" 0..1 區間內的所有值至 `min` 到 `max` 之間的值上。

可在兩步驟內完成：

1. 若我們對 `max-min` 乘上一個在 0..1 之間的隨機數，則可能值的區間會由 `0..1` 增加至 `0..max-min`。 
2. 現在若我們加上 `min`，則區間將變成 `min` 至 `max`。

該函式：

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

