
# Object.keys, values, entries

我們先忽略個別資料結構，然後來討論關於在他們上面迭代這件事情。

在前面的章節我們看過 `map.keys()`、`map.values()`、`map.entries()` 方法。

這些方法是通用的，這裡通常允許資料結構去使用他們。如果我們曾經建立自有的資料結構，那我們也應該實作他們。

他們可以支援：

- `Map`
- `Set`
- `Array`

一般物件也支援類似的方法，但是語法有些不同。

## Object.keys, values, entries

對於一般物件，有以下的方法可以使用：

- [Object.keys(obj)](mdn:js/Object/keys) -- 傳回鍵值陣列。
- [Object.values(obj)](mdn:js/Object/values) -- 傳回值的陣列。
- [Object.entries(obj)](mdn:js/Object/entries) -- 傳回 `[key, value]` 組成的陣列。

請注意區別（相較於 map 的範例）：

|             | Map              | Object       |
|-------------|------------------|--------------|
| 呼叫語法 | `map.keys()`  | `Object.keys(obj)`，而不是 `obj.keys()` |
| 傳回     | 可迭代物件    | "實際的" 陣列                     |

第一個區別是我們必須呼叫 `Object.keys(obj)`，而不是 `obj.keys()`。

為何如此？主要原因是彈性。記住，在 JavaScript，所有複雜結構都是基於物件。所以我們可能自己有一個像是 `data` 的物件，該物件實作自有的 `data.values()` 方法。而且我們也可以對該物件呼叫 `Object.values(data)`。

第二個區別是 `Object.*` 的方法回傳 "實際的" 陣列物件，而不只是一個可迭代物件。這主要是歷史的原因。

例如：

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

這裡有一個使用 `Object.values` 去遍歷所有屬性值的範例：

```js run
let user = {
  name: "John",
  age: 30
};

// 遍歷所有屬性值
for (let value of Object.values(user)) {
  alert(value); // John, 然後是 30
}
```

```warn header="Object.keys/values/entries 會忽略符號的屬性"
就像 `for..in` 迴圈一樣，這些方法會忽略使用 `Symbol(...)` 作為鍵值的屬性。

通常來說這很方便。但是，如果我們也需要符號鍵值的話，則有一個區分的方法 [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)，其傳回只有符號鍵值的陣列。另外，還存在一種方法 [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys)，則傳回 **全部的** 鍵值。
```


## 轉換物件

物件缺乏許多存在於陣列的方法，例如 `map`、`filter` 等。

如果我們想應用它們，那麼我們可以使用 `Object.entries` 之後使用 `Object.fromEntries`：

1. 使用 `Object.entries(obj)` 從 `obj` 取得鍵與值組合的陣列。
2. 在該陣列上使用陣列方法，例如 `map`。
3. 在最終結果的陣列使用 `Object.fromEntries(array)` 轉回成一個物件。

例如，我們有個一些價格組成的物件，然後想把它們變兩倍：

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // 轉換成陣列，映射，然後以 fromEntries 回給物件
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

第一次看到時它看起來會很難懂，但是使用一兩次後，會變得很容易理解。我們可以用這個方式做出有力的轉換鏈式。
