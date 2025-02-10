我們不能 "替換" 第一個字母，因為 Javascript 的字串是永遠不變的。

但我們可以根據已有的字串，創建一個首字母大寫的新字串：

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

但仍然有個小問題。若 `str` 為空，則 `str[0]` 會是 `undefined`。而 `undefined` 不會有 `toUpperCase()` 方法，我們會得到錯誤。

<<<<<<< HEAD
有兩種處理方式：

1. 使用 `str.charAt(0)`，它會永遠回傳一個字串 (可能為空) 。
2. 為空字串添加一個測試。

這是第二個作法：
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
