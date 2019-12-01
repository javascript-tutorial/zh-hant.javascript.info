importance: 5
重要程度：5

---

# Truncate the text 截斷文字

Create a function `truncate(str, maxlength)` that checks the length of the `str` and, if it exceeds `maxlength` -- replaces the end of `str` with the ellipsis character `"…"`, to make its length equal to `maxlength`.
建立一個函式 `truncate(str, maxlength)`，它可以檢查字串 `str` 的長度，且若超過 `maxlength` -- 替換 `str` 結尾為省略號字元 `"..."`，使它的長度等於 `maxlength`。

The result of the function should be the truncated (if needed) string.
函式的結果應該是被截斷的（如果有需要）字串。

For instance:
例如：

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
