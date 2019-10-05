importance: 5

---

# 建立 new Calculator

建立一個建構子函式 `Calculator` 來建立有著三個方法的物件：

- `read()` 使用 `prompt` 詢問兩個值並記憶在物件屬性內。
- `sum()` 回傳這些屬性的加總。
- `mul()` 回傳這些屬性的乘積。

舉個例：

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
