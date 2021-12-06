答案是：`1`。

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

每次迴圈迭代後都會把 `i` 減少 `1`。當 `i = 0` 時，`while(i)` 這個檢查會停止迴圈。

因此，迴圈的步驟形成以下序列（"循環展開（loop unrolled）"）：

```js
let i = 3;

alert(i--); // 顯示 3，將 i 降至 2

alert(i--) // 顯示 2，將 i 降至 1

alert(i--) // 顯示 1，將 i 降至 0

// 完成，while(i) 檢查後會停止迴圈
```

