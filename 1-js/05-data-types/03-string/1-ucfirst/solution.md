We can't "replace" the first character, because strings in JavaScript are immutable.
我們不能 "替換" 第一個字母，因為 Javascript 的字串是不可改變的。

But we can make a new string based on the existing one, with the uppercased first character:
但我們可以根據已有的字串，創建一個首字母大寫的新字串：

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
但仍然有個小問題。若 `str` 為空，則 `str[0]` 會是 `undefined`。而 `undefined` 不會有 `toUpperCase()` 方法，我們會得到錯誤。

There are two variants here:
有兩種處理方式：

1. Use `str.charAt(0)`, as it always returns a string (maybe empty).
1. 使用 `str.charAt(0)`，它會永遠回傳一個字串 (可能為空) 。
2. Add a test for an empty string.
2. 為空字串添加一個測試。

Here's the 2nd variant:
這是第二個作法：

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

