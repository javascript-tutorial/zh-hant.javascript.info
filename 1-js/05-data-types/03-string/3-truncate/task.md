重要程度：5

---

# 截斷文字

建立一個函式 `truncate(str, maxlength)`，它可以檢查該傳入字串 `str` 的長度，且若超過 `maxlength` -- 替換 `str` 結尾為省略號字元 `"..."`，使它的長度等於 `maxlength`。

函式的結果應該是被截斷（如果有需要）的字串。

例如：

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
