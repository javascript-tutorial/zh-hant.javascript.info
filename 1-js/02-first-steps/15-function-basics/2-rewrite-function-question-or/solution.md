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

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/2-rewrite-function-question-or/solution.md
注意圍繞著 `age > 18` 的括號在此並非必要，它們存在的原因只是為了更佳的可讀性。

=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/15-function-basics/2-rewrite-function-question-or/solution.md
