importance: 4

---

# "else" 是否必須？

底下的函式中，若參數 `age` 大於 `18` 時會回傳 `true`。

否則它會要求確認並回傳結果：

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

若把 `else` 刪掉，此函式是否會以不同方式運作？

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

這兩種做法在行為上是否有任何不同？

