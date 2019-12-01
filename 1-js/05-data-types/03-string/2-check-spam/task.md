importance: 5
重要程度：5

---

# Check for spam 檢查 spam

Write a function `checkSpam(str)` that returns `true` if `str` contains 'viagra' or 'XXX', otherwise `false`.
寫一個函式 `checkSpam(str)` 若 `str` 包含 'vaigra' 或者 'XXX' 回傳 `true`，否則回傳 `false`

The function must be case-insensitive:
此函式不區分大小寫：

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```

