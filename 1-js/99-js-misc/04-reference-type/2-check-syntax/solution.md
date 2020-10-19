**錯誤**！

試試看：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // 錯誤！
```

大多數瀏覽器的錯誤訊息不會說明是什麼出錯。

**該錯誤出現是因為，在 `user = {...}` 之後少了個分號。**

JavaScript 不會在 `(user.go)()` 前面自動插入分號，所以這段程式碼它看起來像這樣：

```js no-beautify
let user = { go:... }(user.go)()
```

然後我們也可以看到這種結合的表達式，依照語法將物件 `{ go: ... }` 視為函式，並使用引數 `(user.go)` 來呼叫。且同樣的情況發生在同一行的 `let user` 上，而 `user` 物件根本還沒完成定義，進而產生錯誤。

若我們加入一個分號，就都沒問題了：

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
請注意在圍繞著 `(user.go)` 的括號在這時根本沒作用。通常它們用在設定操作的順序，但此處的句點 `.` 無論如何都會先運行，所以沒效果。只有分號這件事較重要。
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
