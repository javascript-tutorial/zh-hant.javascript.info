importance: 5

---

# 檢查空物件

寫一個函式 `isEmpty(obj)`，若物件沒有屬性時回傳 `true`，否則回傳 `false`。

應該要像這樣運作：

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```

