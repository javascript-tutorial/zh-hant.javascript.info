importance: 3

---

<<<<<<< HEAD
# 數值屬性都乘以 2

建立一個函式 `multiplyNumeric(obj)` 來把 `obj` 的所有數值屬性都乘以 2。
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

舉個例：

```js
// 在呼叫前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 在呼叫後
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

請注意 `multiplyNumeric` 不需要回傳任何東西，它應該要原地（in place）修改物件。

註：使用 `typeof` 來辨別數值類型。

