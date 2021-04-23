importance: 5

---

# 解構賦值

我們有個物件：

```js
let user = {
  name: "John",
  years: 30
};
```

閱讀以下內容，撰寫解構賦值：

- `name` 屬性變成變數 `name`.
- `years` 屬性變成變數 `age`.
- `isAdmin` 屬性變成變數 `isAdmin` (false, 如果沒有屬性)

這是值在你指派之後的範例程式碼片段：

```js
let user = { name: "John", years: 30 };

// 你的程式碼會在左側：
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
