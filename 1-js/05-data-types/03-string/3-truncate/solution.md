最大的長度必須是 `maxlength`，因此我們需將其剪短一點，為省略號留岀空間。

注意，省略號實際上是一個單獨的 unicode 字元，那不是三個點。

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
