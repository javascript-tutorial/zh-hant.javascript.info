importance: 5

---

# 於陣列上下文內呼叫

這樣的結果是什麼？為什麼？

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

