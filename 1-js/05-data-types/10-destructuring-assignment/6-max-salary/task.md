importance: 5

---

# 最高薪水

這是一個 `salaries` 物件：

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

建立函式 `topSalary(salaries)` ，傳回薪水最高的人名。

- 如果 `salaries` 是空的，那應該傳回 `null`。
- 如果薪水最高的人有多個，傳回他們任意一個即可。

備註：使用 `Object.entries` 並在迭代全部鍵/值組合處解構。
