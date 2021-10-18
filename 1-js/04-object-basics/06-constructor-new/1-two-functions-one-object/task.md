importance: 2

---

# 兩個函式 - 一個物件

<<<<<<< HEAD
有可能建立函式 `A` 和 `B` 使得 `new A()==new B()` 嗎？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

若可以，提供它們程式碼的例子。

