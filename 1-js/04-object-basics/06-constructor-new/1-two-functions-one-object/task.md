importance: 2

---

# 兩個函式 - 一個物件

<<<<<<< HEAD
有可能建立函式 `A` 和 `B` 使得 `new A()==new B()` 嗎？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

若可以，提供它們程式碼的例子。

