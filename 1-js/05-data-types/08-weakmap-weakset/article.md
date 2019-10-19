# WeakMap 和 WeakSet

如同我們從章節 <info:garbage-collection> 得知的，JavaScript 引擎會將可到達的（且有可能會被使用到的）值儲存在記憶體中。

舉例來說：

```js
let john = { name: "John" };

// 該物件可以被存取，john 為其參考。

// 覆寫其參考
john = null;

*!*
// 該物件將會從記憶體中被移除
*/!*
```

通常，一個物件的屬性，或陣列中的元素，或是其他資料結構會被視為可到達的，且當其在記憶體中時，會被保留於記憶體內。

例如，如果我們將一個物件放入一個陣列，當此陣列還活著時，該物件也將會活著，即使沒有其他參考指向它。

像這樣：

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 覆寫其參考

*!*
// john 被儲存於陣列內，所以它不會被垃圾回收掉。
// 我們可以透過 array[0] 來存取它。
*/!*
```

類似於此，如果我們將一個物件當作一個普通 `Map` 的鍵值，當 `Map` 存在時，該物件也會存在。它會佔據記憶體，且可能不會被垃圾回收。

例如：

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆寫其參考

*!*
// john 存在於 map 內，
// 我們可以用 map.keys() 來取得它
*/!*
```

`WeakMap` 在此方面有著根本上的不同。它並不會防止關鍵物件被垃圾回收。

讓我們從範例來看看這代表什麼意思。

## WeakMap

與 `Map` 的第一個差異是，`WeakMap` 一定要是物件，不能是原始類型數值：

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常運作 (物件當作鍵值)

*!*
// 不能用字串當作鍵值
weakMap.set("test", "Whoops"); // 錯誤, 因為 "test" 並非一個物件
*/!*
```

現在，如果我們在裡面用物件當作鍵值，且沒有其他參考指向該物件 -- 它將會自動的從記憶體中被移除（還有從 map 中移除）

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆寫參考

// john 從記憶體中被移除了！
```

與上面普通的 `Map` 範例比較。若現在 `john` 只在 `WeakMap` 中作為鍵值存在 -- 它將會自動地從 map（和記憶體）中刪除。

`WeakMap` 不支援迭代和方法 `keys()`、`values()`、`entries()`，所以沒有方法可以從中取得所有的鍵與值。

`WeakMap` 只有下面的方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

為什麼有這樣的限制？這是為了技術上的原因。如果一個物件喪失了其他所有的參考（如上述程式碼範例中的 `john`），那它會被自動垃圾回收掉。但技術上來說，並沒有明確指定 *何時要執行清理*。

由 JavaScript 引擎決定。它可能選擇立即執行記憶體清掃，或是等待晚點更多的刪除發生後再執行清理。所以，技術上來說，`WeakMap` 目前的元素數量是未知的。引擎可能會清理也可能不會，或是只做一部分。出於此因，不支援能夠存取所有鍵/值的方法。

好，那麼在哪種地方我們需要這樣的資料結構呢？

## 使用案例: 附加的資料

`WeakMap` 的主要應用領域是 *附加的資料儲存空間*。

如果我們正在操作一個 "屬於" 其他程式碼的物件，甚至可能是一個第三方套件，然後我們想要儲存一些資料，那些資料與此相關，但只有在物件活著時存在 - 那 `WeakMap` 就是我們需要的。

我們將資料放入一個 `WeakMap`，用物件當作鍵值，然後當物件被垃圾回收時，該資料也會自動消失。

```js
weakMap.set(john, "secret documents");
// 如果 john 死了，secret documents 將會被自動消滅。
```

讓我們來看一個範例。

例如，我們有一份程式碼，保持的使用者的訪問數量。該資訊是儲存於一個 map 中：一個 user 物件是一個鍵，而訪問數量是值。當一個使用者離開（它的物件被資料回收），我們也不會想要儲存著它的訪問數量了。

這裡是一個帶有 `Map` 的計算函式：

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => 訪問數量

// 增加訪問數量
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

這裡是程式碼的另一部分，可能是另一份檔案在使用它：

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // 它的訪問數量
countUser(john);

// 晚點 john 離開了我們
john = null;
```

現在 `john` 物件應該要被垃圾回收，但還是存在於記憶體中，是 `visitsCountMap` 中的一個鍵。

當我們移除使用者時，我們需要清理 `visitsCountMap`，否則記憶體會無窮擴大。在複雜的架構中，這樣的清潔可能會是一個繁瑣乏味的任務。

我們可以用 `WeakMap` 來取代並避免上述狀況：

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => 訪問數量

// 增加訪問數量
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

現在我們不用清理 `visitsCountMap`。當 `john` 物件變得不可存取，只剩下作為 `WeakMap` 的鍵後，它從記憶體中被移除，連同那些從 `WeakMap` 的鍵得來的資訊。

## Use case: caching

Another common example is caching: when a function result should be remembered ("cached"), so that future calls on the same object reuse it.

We can use `Map` to store results, like this:

```js run
// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears: the cached result will be removed from memory automatically after the object gets garbage collected.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

## WeakSet

`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being "weak", it also serves as an additional storage. But not for an arbitrary data, but rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Both of them do not support methods and properties that refer to all keys or their count. Only individual operations are allowed.

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "main" object storage. Once the object is removed from the main storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
