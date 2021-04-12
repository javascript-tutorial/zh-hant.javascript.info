importance: 4

---

# 過濾易位構詞

[易位構詞](https://zh.wikipedia.org/wiki/易位構詞遊戲) 是具有相同數量字母但順序不同的單字。

例如：

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

撰寫一個函式 `aclean(arr)`，傳回不重複的易位構詞陣列。

例如：

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

在每個易位構詞群組中，無論哪個單字，都應只保留一個單字。

