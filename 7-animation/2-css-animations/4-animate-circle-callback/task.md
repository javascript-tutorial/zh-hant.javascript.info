
# 使用回呼的動畫圈圈

在課題 <info:task/animate-circle> 中，成長的圈圈以動畫呈現。

現在，假設我們需要的不只是圈圈，還要在裡面顯示訊息。訊息應該要出現在動畫完成（圈圈完全地成長）*之後*，否則它看起來會很醜。

在該項課題的解答中，函式 `showCircle(cx, cy, radius)` 畫了圈圈，但沒有提供追蹤它完成的方法。

增加一個回呼參數：`showCircle(cx, cy, radius, callback)` 讓它在動畫完成後被呼叫。 `callback` 應該要接收圈圈的 `<div>` 作為引數。

範例如下：

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

演示：

[iframe src="solution" height=260]

將該課題的解答 <info:task/animate-circle> 當作基底。
