使用問號運算子 `'?'`：

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

使用 OR `||`（最短的做法）：

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

注意圍繞著 `age > 18` 的括號在此並非必要，它們存在的原因只是為了更佳的可讀性。

