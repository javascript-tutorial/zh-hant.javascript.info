importance: 4

---

# 使用 '?' 或 '||' 改寫函式

底下的函式中，若參數 `age` 大於 `18` 則回傳 `true`。

否則它要求確認並回傳其結果。

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}
```

改寫它，使其在沒有 `if` 的情況下，以單獨一行就可以達到同樣的操作。

寫出兩種 `checkAge` 的不同做法：

1. 使用問號運算子 `?`
2. 使用 OR `||`

