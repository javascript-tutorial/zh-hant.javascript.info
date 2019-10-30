importance: 5

---

# 該測試中有什麼問題？

底下的 `pow` 測試有什麼問題？

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

註：語法上來說，該測試是正確且可通過的。

