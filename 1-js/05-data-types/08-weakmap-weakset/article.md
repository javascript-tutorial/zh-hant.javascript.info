# WeakMap 和 WeakSet

如同我們從章節 <info:garbage-collection> 得知的，JavaScript 引擎會將可達的（且有可能會被使用到的）值儲存在記憶體中。

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

通常，物件的屬性，陣列的元素或是其它資料結構，在其容器資料結構還存在記憶體中時，會被視為可達的並被持續留在記憶體中。

例如，如果我們將一個物件放入一個陣列，當此陣列還活著時，該物件也將會活著，即使沒有其他參考指向它。

像這樣：

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 覆寫其參考

*!*
<<<<<<< HEAD
// john 被儲存於陣列內，所以它不會被垃圾回收掉。
// 我們可以透過 array[0] 來存取它。
=======
// the object previously referenced by john is stored inside the array 
// therefore it won't be garbage-collected
// we can get it as array[0]
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
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

`WeakMap` 在此方面有著根本上的不同。它並不會防止鍵值物件被垃圾回收。

讓我們從範例來看看這代表什麼意思。

## WeakMap

與 `Map` 的第一個差異是，`WeakMap` 一定要是物件，不能是原生類型值：

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常運作 (物件當作鍵值)

*!*
// 不能用字串當作鍵值
weakMap.set("test", "Whoops"); // 錯誤, 因為 "test" 並非一個物件
*/!*
```

現在，如果我們在裡面用物件當作鍵值，且沒有其他參考指向該物件 -- 它將會自動從記憶體中被移除（還有從 map 中移除）

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆寫參考

// john 從記憶體中被移除了！
```

與上面普通的 `Map` 範例比較。若現在 `john` 僅存在於 `WeakMap` 的鍵之中 -- 它將會自動地從 map（和記憶體）中刪除。

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

例如，我們有一份程式碼，用於保留使用者們訪問的次數。該資訊儲存於一個 map 中：某個 user 物件做為鍵，而訪問次數是值。當有個使用者離開（它的物件被資料回收），我們就也不想儲存它的訪問次數了。

這是一個使用 `Map` 的計次函式：

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => 訪問次數

// 增加訪問次數
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

這裡是程式碼的另一部分，可能是另一份檔案在使用它：

```js
// 📁 main.js
let john = { name: "John" };

<<<<<<< HEAD
countUser(john); // 它的訪問次數
=======
countUser(john); // count his visits
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

// 晚點 john 離開了我們
john = null;
```

現在 `john` 物件應該要被垃圾回收，但卻還是作為 `visitsCountMap` 中的一個鍵存在於記憶體中。

當我們移除使用者時，我們需要清理 `visitsCountMap`，否則記憶體會無窮擴大。在複雜的架構中，這樣的清潔可能會是一個繁瑣乏味的任務。

我們可以用 `WeakMap` 來取代並避免上述狀況：

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => 訪問次數

// 增加訪問次數
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

現在我們不用清理 `visitsCountMap` 了。當 `john` 物件變成除了作為 `WeakMap` 的鍵值以外，其餘皆不可達的情況時，它就會連同那些從 `WeakMap` 的鍵得來的資訊，一起從記憶體中被移除。

##  使用案例: 快取（caching）

另一個常見的範例是快取：當一個函數的結果應該要被記憶住（"快取"），這樣之後呼叫相同物件時可以重複使用。

我們可以用 `Map` 來存結果，像這樣：

```js run
// 📁 cache.js
let cache = new Map();

// 計算並將結果記起來
function process(obj) {
  if (!cache.has(obj)) {
    let result; // = obj 的計算結果

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// 現在我們可以在另一個檔案中使用 process()：
*/!*

// 📁 main.js
let obj = {/* 假設我們有一個物件 */};

let result1 = process(obj); // 計算

// ...之後，從程式碼的別處
let result2 = process(obj); // 從快取中取出紀錄的結果

// ...之後，當物件不再被需要：
obj = null;

alert(cache.size); // 1（哎呦！該物件還是在快取中，佔據記憶體！）
```

針對同個物件多次呼叫 `process(obj)`，只有第一次會進行計算，之後就只從 `cache` 中取出結果。這樣做的缺點是，當物件不再被需要時，我們需要清除 `cache`。

如果我們用 `WeakMap` 取代 `Map`，那這問題就不復存在了：快取結果會在物件被垃圾回收後，自動從記憶體中被移除。

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// 計算且記住結果
function process(obj) {
  if (!cache.has(obj)) {
    let result; // = obj 的計算結果

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* 一些物件 */};

let result1 = process(obj);
let result2 = process(obj);

// ...之後，當物件不再被需要：
obj = null;

// 無法取得 cache.size，因為這是 WeakMp，
// 但它會是 0 或是很快就會是 0
// 當物件被垃圾回收，快取資料也會被一併移除。
```

## WeakSet

`WeakSet` 有類似的行為：

- 它類似於 `Set`，但我們只能將物件加入 `WeakSet`（原生值不行）。
- 當它還可從其他地方被存取時，物件就還會存在於集合中。
- 像是 `Set`，它支援 `add`、`has` 和 `delete`，但不支援 `size`、`keys()` 且沒有迭代。

身為 "weak"，它也可作為附加的儲存空間。但不是給隨意的資料使用，而是針對 "是/否" 這類的事實陳述。`WeakSet` 中的成員關係可能代表物件的某些資訊。

舉例來說，我們可以將使用者加入 `WeakSet` 來追蹤誰曾拜訪過我們的網站：

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John 拜訪過我們
visitedSet.add(pete); // 接著是 Pete
visitedSet.add(john); // John 再度拜訪

// visitedSet 現在有兩個使用者

// 檢查 John 是否拜訪過？
alert(visitedSet.has(john)); // true

// 檢查 Mary 是否拜訪過？
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 將會被自動清理。
```

`WeakMap` 與 `WeakSet` 最值得注意的限制是缺乏迭代功能，以及無法一次取得目前所有的內容。這可能很不方便，但並不影響 `WeakMap/WeakSet` 執行他們的主要工作 -- 為在另一個地方被儲存/管理的物件提供一個 "附加" 的儲存空間來儲存其資料。

## 總結

`WeakMap` 是一個類似 `Map` 的集合，只允許用物件當作鍵，且當其關聯的值不再能夠被存取時，會跟著一同被移除。

`WeakSet` 是一個類似 `Set` 的集合，只能儲存物件，且當該物件不再能夠被存取時，會跟著一同被移除。

它們兩個都不支援能夠存取所有鍵或是計數值的方法或屬性。只允許個別的操作。

`WeakMap` 和 `WeakSet` 被作為附加於 "主要" 物件儲存空間的 "次要" 資料結構。一但物件從主要儲存空間中被移除，如果該物件只被當作 `WeakMap` 的鍵，或是只存在於 `WeakSet` 中，那它將會自動被清除。
