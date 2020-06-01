importance: 3

---

# 解釋 "this" 的值

底下的程式碼我們試圖連續呼叫四次 `user.go()` 方法。

然而呼叫 `(1)` 和 `(2)` 運作起來與 `(3)` 和 `(4)` 有所不同，為什麼？

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

