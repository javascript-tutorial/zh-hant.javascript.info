importance: 5

---

# 可迭代鍵值

我們想在變數中獲得一個執行 `map.keys()` 後的陣列，然後使用陣列的方法，像是 `.push`。

但那是不會動的：

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

為什麼？我們該如何修改程式碼使 `keys.push` 能動？
