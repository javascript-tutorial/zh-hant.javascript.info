找到所有易位構詞（anagrams）讓我們分解每個單字為字母並為其排序。當排序好字母時，所有易位構詞是相同的。

例如：

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

我們將使用字母排序後的變動值作為對應鍵值，每個鍵值僅存儲一個值：

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // 分解單字成字母，排序他們之後在合併起來
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

字母排序是藉由呼叫串鏈，那行後面註解有個 `(*)`。

為了方便了解，我們分解成多行：

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

收到 `'PAN'` 和 `'nap'` 兩個不同單字為相同字母排列形式 `'anp'`。

在下一行把這些單字放入 map：

```js
map.set(sorted, word);
```

如果我們再次遇到相同字母排列形式的單字，那麼該單字將會在 map 的鍵值上覆蓋原先的值。因此，每個字母形式最多只能有一個單字。

最後 `Array.from(map.values())`  對 map 中的值進行迭代（我們不需要鍵值）並傳回它們的陣列。

在這裡我們也可以使用一個普通物件而不是 `Map`，因為鍵值是字串。

這就是解決方案供參：

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
