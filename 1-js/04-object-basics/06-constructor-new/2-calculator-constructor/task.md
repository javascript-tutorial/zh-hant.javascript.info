importance: 5

---

# 建立 new Calculator

建立一個建構子函式 `Calculator` 來建立有著三個方法的物件：

<<<<<<< HEAD
- `read()` 使用 `prompt` 詢問兩個值並記憶在物件屬性內。
- `sum()` 回傳這些屬性的加總。
- `mul()` 回傳這些屬性的乘積。
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

舉個例：

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
