importance: 5

---

# 過濾掉重複的陣列成員

令 `arr` 為一個陣列。

建立一個傳回沒有重複項目的函式 `unique(arr)`。

例如：

```js
function unique(arr) {
  /* 你的程式碼 */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

附註：這裡雖然是用了字串，但也要可以是任何型別。

追加附註：使用 `Set` 去儲放不重複的值。
