importance: 5

---

# 把屬性加總

這裡有個 `salaries` 物件，有任意的薪水數字。

撰寫一個函式 `sumSalaries(salaries)`，該函式使用 `Object.values` 和 `for..of` 迴圈來傳回全部薪水的加總。

如果 `salaries` 是空的，那麼結果必須是 `0`。

例如：

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

