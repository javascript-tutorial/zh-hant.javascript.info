# 簡單但錯誤的解法

最簡單卻錯誤的解法，是產生由 `min` 至 `max` 的值，再進位它：

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

這個函式可以運行，但它不正確。得到邊緣值 `min` 和 `max` 的機率比其它值還要少了兩倍。

若你執行上述範例許多次，你將會很容易就看到 `2` 較常出現。

那是因為 `Math.round()` 由區間 `1..3` 之間得到隨機數，並像下面這樣進位：

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

現在我們可以清楚看到 `1` 比 `2` 還少了兩倍，且同樣情況對 `3` 也是。

# 正確的解法

對此課題有許多正確的解法，其中一種是調整區間邊界。要保證同樣的區間，我們可以從 `0.5 至 3.5` 之間來生成值，故此可讓邊緣加上所需要的機率：

```js run
*!*
function randomInteger(min, max) {
  // 現在 隨機值從（min-0.5）到（max+0.5）
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

另一個替代的做法是對於 `min` 與 `max+1` 之間的隨機數使用 `Math.floor`：

```js run
*!*
function randomInteger(min, max) {
  // 這邊的隨機值由 min 到（max+1）
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

現在所有區間以這樣的方式被對應：

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

所有區間有著同樣的長度，使得最後結果是均勻分佈的。

