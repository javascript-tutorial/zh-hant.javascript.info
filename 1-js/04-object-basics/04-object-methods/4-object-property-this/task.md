importance: 5

---

# 在物件字面量上使用 "this"

這個函式 `makeUser` 回傳一個物件。

存取它的 `ref` 會得到什麼結果呢？為什麼？

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // 結果是什麼？
```

