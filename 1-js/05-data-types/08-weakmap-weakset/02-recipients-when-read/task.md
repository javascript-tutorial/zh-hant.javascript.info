importance: 5

---

# 儲存已讀日期

像 [previous task](info:task/recipients-read)，有個訊息陣列。類似的情境。

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

現在的問題是：你建議用哪個資料結構來儲存這個資訊："訊息在何時被讀取？"。

在前一個任務中，我們只需要儲存 "是/否" 的事實陳述，現在我們需要儲存日期，且它應該只能在訊息被垃圾回收前存在。

P.S. 日期可以以內建 `Date` 類別的物件來儲存，我們晚點會介紹。
