
那是因為 `map.keys()` 傳回的是可迭代的物件，但不是一個陣列。

我們可以轉換它變成陣列使用 `Array.from`：


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
