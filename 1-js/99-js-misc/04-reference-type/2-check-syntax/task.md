importance: 2

---

# 語法確認

底下程式碼執行的結果為何？

```js no-beautify
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)()
```

註：有個小陷阱 :)

