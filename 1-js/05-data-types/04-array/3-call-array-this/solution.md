呼叫 `arr[2]()` 語法上和 `obj[method]()` 相同，對應 `obj` 的是 `arr`，而 `method` 對應著 `2`。

所以我們有著視 `arr[2]` 為物件方法的函式呼叫。自然地，它接收參考至物件 `arr` 的 `this` 並輸出陣列：

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

該陣列有三個值：一開始有兩個，再加上該函式。

