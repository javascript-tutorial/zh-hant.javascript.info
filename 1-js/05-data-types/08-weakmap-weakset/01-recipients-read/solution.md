讓我們將已讀的訊息存在 `WeakSet` 中：

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// 兩個訊息已經被讀取了
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages 有兩個元素

// ...讓我們再次讀取第一個訊息！
readMessages.add(messages[0]);
// readMessages 依然有兩個唯一的元素

// 回答：message[0] 是否已被讀取？
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// 現在 readMessages 只有一個元素（技術上來說，記憶體可能會在稍後才被清理）
```

<<<<<<< HEAD
`WeakSet` 允許儲存訊息的集合，且能簡單地檢查一個訊息是否存在於集合內。
=======
The `WeakSet` allows to store a set of messages and easily check for the existence of a message in it.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

它會自動清理自己，但代價是我們不能夠迭代它，無法直接取得 "所有已讀訊息"。但我們可以透過迭代所有訊息，並過濾掉那些存在集合中的訊息來達到同樣目的。

另外一個不同的解法可以是當訊息被讀取後，增加一個屬性，像 `message.isRead=true` 到訊息中。當訊息物件被其他程式碼管理時，這樣的作法一般是不建議的，但我們可以用 Symbol 屬性來避免衝突。

像這樣：
```js
// Symbol 屬性只會在我們的程式碼中被認得
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

現在第三方程式碼可能不會看到我們的額外屬性。

雖然 Symbol 可以降低問題發生的機率，但從架構的觀點來看，使用 `WeakSet` 是比較好的。
