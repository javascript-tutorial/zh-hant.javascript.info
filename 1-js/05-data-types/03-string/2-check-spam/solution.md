To make the search case-insensitive, let's bring the string to lower case and then search:
為了使檢索不區分大小寫，我們將字串都改為小寫再檢索：

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

