
# Map and 集合

現在，我們已經了解了以下複雜的資料結構：

- 物件，儲放有鍵值的群集
- 陣列，儲放有順序的群集

但事實上這還不夠。這就是為什麼還有 `Map` 和 `Set`。

## Map

[Map](mdn:js/Map) 是有鍵值的資料群集，就跟一個 `Object` 一樣。主要的區別是 `Map` 允許任何類型的鍵值。

方法和屬性有：

- `new Map()` -- 建立一個 map。
- `map.set(key, value)` -- 儲放值藉由鍵值。
- `map.get(key)` -- 傳回值藉由鍵值，如果 `key` 不存在於 map 則是 `undefined`。
- `map.has(key)` -- 如果鍵值存在傳回 `true`，反之則是 `false`。
- `map.delete(key)` -- 移除值藉由鍵值。
- `map.clear()` -- 移除所有值。
- `map.size` -- 傳回現在元素數量。

例如：

```js run
let map = new Map();

map.set('1', 'str1');   // 一個字串鍵值
map.set(1, 'num1');     // 一個數值鍵值
map.set(true, 'bool1'); // 一個布林值鍵值

// 記得一般的物件嗎？它會將鍵值轉換成字串
// map 會保持原本的型別，所以這兩者是不同的：
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

有此可見，不同於物件，鍵值不會轉換成字串。任何類型的鍵值都是可行的。

```smart header="`map[key]` 不是 `Map` 的正確使用方法"
雖然 `map[key]` 也會動，例如我們可以設置 `map[key] = 2`，這會將 `map` 當作一般的 JavaScript 物件，所以，會有相應的限制（物件的鍵值等等）。

所以我們應該使用 `map` 方法：`set`、`get` 等等。
```

**map 可以將物件作為鍵值。**

例如：

```js run
let john = { name: "John" };

// 供全部用戶，讓我們來存放他們的拜訪計數
let visitsCountMap = new Map();

// john 是 map 的鍵值
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

將物件作為鍵值是 `Map` 最著名且重要的功能之一。以字串鍵值來說，`Object` 就可以，但如果是物件的鍵值就不是了。

讓我們來試試：

```js run
let john = { name: "John" };

let visitsCountObj = {}; // 嘗試使用物件

visitsCountObj[john] = 123; // 嘗試使用 john 物件作為鍵值

*!*
// 這寫入了這個！
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

由於 `visitsCountObj` 是一個物件，他會將所有的鍵值轉換成字串（像是 `john`）因此我們得到了字串鍵值 `"[object Object]"`。 絕對不是我們所要的。

```smart header="`Map` 如何比較鍵值"
為了測試鍵值相等，`Map` 使用演算法 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)。它大致與嚴格等於 `===` 相同，但不同的地方是 `NaN` 視同 `NaN`。所以 `NaN` 也可以作為鍵值。

這個演算法不可以被改變或自訂。
```

````smart header="串鏈"
每個 `map.set` 呼叫都會傳回 map 自己，所以我們可以 "串鏈" 這些呼叫：

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## 在 map 上迭代

要遍歷整個 map，有 3 個方法：

- `map.keys()` -- 傳回一個可迭代鍵值的物件，
- `map.values()` -- 傳回一個可迭代值的物件
- `map.entries()` -- 傳回一個可迭代條目 `[key, value]`，它可以用在 `for..of`。

例如：

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 迭代全部的鍵值（蔬菜）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 迭代全部的值（價格）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 迭代全部的 [key, value] 條目
for (let entry of recipeMap) { // 這等同於 recipeMap.entries()
  alert(entry); // cucumber,500（等等）
}
```

```smart header="依照插入順序"
迭代的順序與插入值的順序相同。 與一般的 `Object` 不同，`Map` 保留了此順序。
```

除此之外，`Map` 有內建的 `forEach` 方法，類似於 `Array`：

```js
// 執行函數時每次傳入一對鍵與值
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 等等
});
```

## Object.entries: 從 Object 建立 Map

當建立一個 `Map` 時，我們可以傳入一個鍵/值組合的陣列（或可迭代的物件）進行初始化，如下：

```js run
// [key, value] 組合的陣列
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

如果我們有一個普通的物件，並且想從該物件建立一個 `Map`，則可以使用內建方法 [Object.entries(obj)](mdn:js/Object/entries) ，傳回一個與其相同格式的鍵/值組合的陣列。

所以，我們可以從物件建立一個 map，如下：

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

在這裡，`Object.entries` 傳回一個鍵/值組合的陣列：`[ ["name","John"], ["age", 30] ]`。這是 `Map` 所需要的。


## Object.fromEntries: 從 Map 建立 Object

我們已經看到如何使用 `Object.entries(obj)` 從一般物件建立 `Map`。

有一個 `Object.fromEntries` 方法可以反過來：給定一個 `[key，value]` 組合的陣列，根據該陣列建立物件：

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// 現在 prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

我們可以使用 `Object.fromEntries` 從 `Map` 得到一個一般物件。

例如我們將數據儲放在 `Map` 中，但是我們需要將其傳給期望使用一般物件的第三方程式碼。

我們開始吧：

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // 做出一個一般物件 (*)
*/!*

// 好了！
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

呼叫 `map.entries()` 傳回一個鍵/值組合的陣列，與 `Object.fromEntries` 所需的格式相同。

我們可以將註解有 `(*)` 那行縮短：
```js
let obj = Object.fromEntries(map); // 忽略 .entries()
```

這是一樣的的，因為 `Object.fromEntries` 期望一個可迭代物件作為參數。不一定要是陣列。而 `map` 預設迭代會使用 `map.entries()` 傳回鍵/值組合，所以我們會得到一個跟 `map` 相同鍵/值組合的物件。

## 集合

`Set` 是一種特殊的類型群集 - "值的集合" (沒有鍵值)，其中每個值只會有一個。

他主要的方法有：

- `new Set(iterable)` -- 建立集合，然後如果有給 `iterable` 可迭代物件（通常是陣列），複製其值到該集合中。
- `set.add(value)` -- 新增一個值，傳回集合自己。
- `set.delete(value)` -- 移除該值，如果當下存在該值傳回 `true`，反之則是 `false`。
- `set.has(value)` -- 如果該值存在於集合中傳回 `true`，反之則是 `false`。
- `set.clear()` -- 移除所有值。
- `set.size` -- 傳回現在元素數量。

主要功能是重複呼叫具有相同值的 `set.add（value)` 時不會發生任何事。這就是每個值只在 `Set` 中出現一次的原因。

例如，我們有訪客來，然後我們想記住每個人。但是不該有重複的訪問。訪客只能被 "計入" 一次。

`Set` 正好是個正確的選擇：

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// 有些用戶來拜訪多次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// 集合只保留唯一值
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (然後 Pete 和 Mary)
}
```

`Set` 的替代方法可以是一個用戶陣列，使用 [arr.find](mdn:js/Array/find) 在每次插入時檢查重複。但是效率會很差，因為此方法遍歷整個陣列，檢查每個元素。`Set` 在內部有更好的優化進行唯一性檢查。

## 在集合上迭代

我們可以使用 `for..of` 或 `forEach` 遍歷一個集合：

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 同樣在 forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

有趣的是，在 `forEach` 中傳遞的回呼函式有 3 個參數：一個 `value`，然後是 **相同值** `valueAgain`，然後是目標物件。 實際上，相同的值在參數中出現兩次。

這是為了與 `Map` 兼容，在其中回呼傳遞的 `forEach` 具有三個參數。看起來確實有些奇怪。但是在某些情況下可以輕鬆地用 `Set` 替換 `Map`，反之亦然。

也支援與 `Map` 相同的迭代器方法：

- `set.keys()` -- 傳回一個可迭代值的物件，
- `set.values()` -- 同 `set.keys()`，為了與 `Map` 兼容，
- `set.entries()` -- 傳回一個可迭代條目 `[value, value]`，存在是為了與 `Map` 兼容。

## 總結

`Map` -- 是有鍵值的資料群集。

方法和屬性有：

- `new Map([iterable])` -- 建立一個 map，可以有 `[key,value]` 組合的 `iterable` 可迭代物件（像是陣列）供初始化。
- `map.set(key, value)` -- 儲放值藉由鍵值。
- `map.get(key)` -- 傳回值藉由鍵值，如果 `key` 不存在於 map 則是 `undefined`。
- `map.has(key)` -- 如果鍵值存在傳回 `true`，反之則是 `false`。
- `map.delete(key)` -- 移除值藉由鍵值。
- `map.clear()` -- 移除所有值。
- `map.size` -- 傳回現在元素數量。

不同於一般的 `Object`：

- 任何鍵值，物件也能當鍵值。
- 方便的額外方法，屬性 `size`。

`Set` -- 是唯一值的群集。

方法和屬性有：

- `new Set(iterable)` -- 建立集合，然後如果有給 `iterable` 可迭代物件（通常是陣列），複製其值到該集合中。
- `set.add(value)` -- 新增一個值，傳回集合自己。
- `set.delete(value)` -- 移除該值，如果當下存在該值傳回 `true`，反之則是 `false`。
- `set.has(value)` -- 如果該值存在於集合中傳回 `true`，反之則是 `false`。
- `set.clear()` -- 移除所有值。
- `set.size` -- 傳回現在元素數量。

`Map` 和 `Set` 上的迭代始終按插入順序進行，因此我們不能說這些群集是無序的，但是我們不能對元素進行重新排序或直接按其編號獲取元素。
