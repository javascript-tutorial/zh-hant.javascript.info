# Rest 參數與 Spread 語法

許多 JavaScript 內建函式支援任意數量的參數。

例如:

- `Math.max(arg1, arg2, ..., argN)` -- 返回參數中最大的值。
- `Object.assign(dest, src1, ..., srcN)` -- 複製 `src1..N` 的屬性到 `dest`。
- ...等。

在本章中，我們將學習如何做到這一點。 並且，如何將陣列作為參數傳遞給這樣的函式。

## Rest 參數 `...`

一個函式可以被任意數量的參數呼叫，不管它是如何定義的。

如下:

```js run
function sum(a, b) {
  return a + b;
}

alert(sum(1, 2, 3, 4, 5));
```

這裡並不會因為過多的參數而產生錯誤。 但這裡的結果只會計算前兩個。

剩下的參數可以在函式定義中使用三個點 `...` 並跟著包含它們的陣列名稱。 這些點字面上意味著「將剩餘的參數收集到陣列中」。

例如，將所有參數收集到陣列 `args` 中:

```js run
function sumAll(...args) {
  // args 是陣列的名稱
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert(sumAll(1)); // 1
alert(sumAll(1, 2)); // 3
alert(sumAll(1, 2, 3)); // 6
```

我們可以選擇將第一個參數作為變數，並只收集剩下的參數。

這裡的前兩個參數會進入變數，其餘的則會進入 `titles` 陣列:

```js run
function showName(firstName, lastName, ...titles) {
  alert(firstName + " " + lastName); // Julius Caesar

  // 剩餘的參數會被收集到陣列中
  // i.e. titles = ["Consul", "Imperator"]
  alert(titles[0]); // Consul
  alert(titles[1]); // Imperator
  alert(titles.length); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="剩餘的參數必須在最後"
Rest 參數會收集所有剩餘的參數，所以以下的寫法是不合理的，並會產生錯誤:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

`...rest` 必須在參數最後。
````

## "arguments" 變數

這裡也有一個名為 `arguments` 的特殊陣列式物件，它按索引包含所有參數。

例如:

```js run
function showName() {
  alert(arguments.length);
  alert(arguments[0]);
  alert(arguments[1]);

  // 可遍歷的
  // for(let arg of arguments) alert(arg);
}

// 依序顯示: 2, Julius, Caesar
showName("Julius", "Caesar");

// 依序顯示: 1, Ilya, undefined (無第二個參數)
showName("Ilya");
```

過去，rest 參數並不存在於 JavaScript 中，使用 `arguments` 是取得函式所有參數的唯一方法。 這仍然有效，我們可以在舊程式碼中找到它。

````warn header="`arguments` 是可遍歷的，但不是陣列"
但缺點是，`arguments`同時是陣列式的和可遍歷的，但它不是陣列。 因此不支援陣列方法，所以我們不能呼叫`arguments.map(...)` 等方法。

`````

此外，它包含所有參數。 我們無法像使用 rest 參數只擷取部分參數。

因此，當我們需要這些功能時，建議優先使用 rest 參數。

````smart header="箭頭函式沒有 `\"arguments\"`"

如果我們在箭頭函式中存取 `arguments` 物件，它會從外部「正常」函式中取得。


例如:

```js run
function f() {
	let showArg = () => alert(arguments[0]);
	showArg();
}

f(1); // 1
```

還記得嗎？箭頭函式沒有自己的 `this`。現在我們知道它們也沒有特殊的 `arguments` 物件。

`````

## Spread syntax [#spread-syntax]

我們已經看到如何從參數列表中取得陣列。

但有時候我們也需要做相反的事情。

例如, 內建函式 [Math.max](mdn:js/Math/max) 會返回列表中最大數值:

```js run
alert(Math.max(3, 5, 1)); // 5
```

假設我們有一組陣列 `[3, 5, 1]`。 我們如何使用它呼叫 `Math.max`?

原封不動地傳入這組陣列是不行的，因為 `Math.max` 預期的是一組數值參數，而不是單一個陣列:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

我們不能在程式碼中手動列出項目 `Math.max(arr[0], arr[1], arr[2])`，因為並不能確定有多少項，當程式碼執行時，可能有很多，也可能沒有，這會導致程式碼將變得很醜。

_Spread 語法_ 就是解方！ 它和 Rest 參數很像，也使用 `...`，但用途相反。

當 `...arr` 在函式呼叫中使用時，它會將可迭代物件 `arr` 展開成參數列表。

以 `Math.max` 為例:

```js run
let arr = [3, 5, 1];

alert(Math.max(...arr)); // 5 (spread 將陣列轉換為參數列表)
```

我們也可以這樣傳入多個可迭代物件:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(...arr1, ...arr2)); // 8
```

我們甚至可以將 spread 語法和正常的值結合:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25
```

另外，spread 語法也可以用來合併陣列:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, 接著是 arr, 然後是 2, 再接著是 arr2)
```

在這個範例中，我們使用陣列來展示 spread 語法，但任何可迭代物件都可以。

例如，這裡我們使用 spread 語法將字串轉換為字元陣列:

```js run
let str = "Hello";

alert([...str]); // H,e,l,l,o
```

spread 語法內部使用迭代器 (iterator) 來收集元素，就像 `for..of` 一樣。

因此，對於字串來說，`for...of` 會回傳字元，而 `...str` 則會變成 `"H","e","l","l","o"`。 字元列表會傳入陣列初始化器 `[...str]`。

針對這個特別的任務，我們也可以使用 `Array.from`，因為它會將可迭代物件(像是字串)轉換為陣列:

```js run
let str = "Hello";

// Array.from 將可迭代物件轉換為陣列
alert(Array.from(str)); // H,e,l,l,o
```

執行後結果和 `[...str]` 一致。

不過 `Array.from(obj)` 和 `[...obj]` 之間有一個微妙的差異:

- `Array.form` 可以操作陣列式物件和可迭代物件。
- Spread 語法只能操作可迭代物件。

因此，對於將"某些東西"轉換為陣列的任務，`Array.from` 通常更被廣泛使用。

## 複製物件 (object) / 陣列 (array)

還記得我們[先前](https://javascript.info/object#cloning-and-merging-object-assign)提到的 `Object.assign()` 嗎？

使用 spread 語法也可以做到相同的事情！(註：淺拷貝)

```js run
let arr = [1, 2, 3];
let arrCopy = [...arr]; // 將陣列展開成參數列表
// 在新陣列返回結果

// 兩個陣列的內容相同嗎？
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// 兩個陣列相等嗎？
alert(arr === arrCopy); // false (非同一個參考)

// 修改原始陣列不會影響副本:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

注意，用相同的方式來複製一個物件也是可行的。

```js run
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // 展開物件成參數列表
// 在新物件返回結果

// d兩個物件的內容相同嗎？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 兩個物件相等嗎？
alert(obj === objCopy); // false (not same reference)

// 修改原始物件不會影響副本:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

以這樣的方式複製一個物件比 `let objCopy = Object.assign({}, obj);` 或是複製一個陣列 `let arrCopy = Object.assign([], arr);` 來得簡潔，所以我們優先使用它。

## 結論

當我們在程式碼中看到 `...`，它可能是 rest 參數或是 spread 語法。

有一個簡單的方法可以區分它們:

- 當 `...` 在一個函式參數的最後，它是一個 "rest 參數"，並且會將參數列表中剩餘的參數收集到一個陣列中。
- 當 `...` 在函式呼叫或類似的地方出現時，它被稱為 "spread 語法"，並且會將陣列展開成參數列表。

應用場景：

- Rest 參數用來建立可以接受任意數量參數的函式。
- spread 語法用來將陣列傳入一個需要多個參數的函式。

兩者並行可以讓我們在陣列和參數列表之間輕鬆地切換。

所有函式呼叫的參數都可以在 "舊式" 的 `arguments` 中使用: 類似陣列的可迭代物件。
