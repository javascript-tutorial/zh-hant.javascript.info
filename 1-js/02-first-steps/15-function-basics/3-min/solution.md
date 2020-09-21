使用 `if` 的解法：

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

使用問號運算子 `'?'` 的解法：

```js
function min(a, b) {
  return a < b ? a : b;
}
```

註：在相等的情況 `a == b`，回傳哪一個就不重要了。

