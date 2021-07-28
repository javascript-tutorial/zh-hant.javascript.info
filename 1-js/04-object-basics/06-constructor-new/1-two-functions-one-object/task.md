importance: 2

---

# 兩個函式 - 一個物件

<<<<<<< HEAD
有可能建立函式 `A` 和 `B` 使得 `new A()==new B()` 嗎？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

若可以，提供它們程式碼的例子。

