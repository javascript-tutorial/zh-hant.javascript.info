當然可運作，沒問題。

`const` 只保護變數本身不被改變。

換句話說，`user` 儲存物件的參考，且其無法被改變。但物件的內容卻可以改變。

```js run
const user = {
  name: "John"
};

*!*
// 可運作
user.name = "Pete";
*/!*

// 錯誤
user = 123;
```

