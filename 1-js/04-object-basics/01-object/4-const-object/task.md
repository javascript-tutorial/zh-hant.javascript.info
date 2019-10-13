importance: 5

---

# 常數物件？

有可能改變用 `const` 宣告的物件嗎？你怎麼想？

```js
const user = {
  name: "John"
};

*!*
// 這能運作嗎？
user.name = "Pete";
*/!*
```

