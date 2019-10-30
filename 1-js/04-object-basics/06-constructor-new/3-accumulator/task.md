importance: 5

---

# 建立 new Accumulator

建立一個建構子函式 `Accumulator(startingValue)`。

它建立的物件應該要：

- 在屬性 `value` 中儲存 "現在的值"。起始值被設定為建構子的引數 `startingValue`。
- `read()` 方法應該使用 `prompt` 來讀取新的數值並將它加到 `value` 中。

換句話說，`value` 屬性是所有使用者輸入的值與起始值 `startingValue` 的總和。

這邊是演示的程式碼：

```js
let accumulator = new Accumulator(1); // 起始值 1

accumulator.read(); // 加入使用者輸入的值
accumulator.read(); // 加入使用者輸入的值

alert(accumulator.value); // 顯示這些值的總和
```

[demo]
