可以，這是有可能的。

若函式回傳一個物件，則 `new` 會回傳它而非 `this`。

所以它們可以，舉個例，回傳相同的外部定義物件 `obj`：

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```

