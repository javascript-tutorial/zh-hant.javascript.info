# 陣列（Arrays）

物件允許你儲存鍵配對值的群集，很好。

但時常我們發現要的是個 *有序群集*，也就是我們有有第一、第二、第三個元素等等。例如，我們需要這樣的東西來儲存一個列表，像是：使用者、商品、HTML 元素等等。

這種情況使用物件不那麼方便，因為它沒有提供方法來管理物件的序列。我們不能在已存在的屬性 "之間" 插入某個新的屬性，物件不是被這麼用的。

有個特殊的資料結構名為 `陣列（Array）`，用於儲存有序群集。

## 宣告

有兩種建立空陣列的語法：

```js
let arr = new Array();
let arr = [];
```

絕大多數情況，都會使用第二種語法。我們可以在括號內提供初始元素們：

```js
let fruits = ["Apple", "Orange", "Plum"];
```

陣列元素是編號過的，從零開始。

我們可以透過在方括號內給予對應編號來獲取一個元素：

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

我們可以替換某個元素：

```js
fruits[2] = 'Pear'; // 現在 ["Apple", "Orange", "Pear"]
```

...或者加入一個新的元素到該陣列中：

```js
fruits[3] = 'Lemon'; // 現在 ["Apple", "Orange", "Pear", "Lemon"]
```

陣列內的元素總數是它的 `length` 屬性：

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

我們也可以使用 `alert` 來顯示整個陣列。

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

一個陣列可以儲存任意類型的元素。

舉個例：

```js run no-beautify
// 混合值
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// 由索引值 1 獲取物件並顯示其 name 屬性
alert( arr[1].name ); // John

// 由索引值 3 獲取函式並執行它
arr[3](); // hello
```

````smart header="尾部逗號"
陣列就像物件一樣，可以以逗號結尾：
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

該 "尾部逗號" 風格讓它更容易 插入/移除 項目，因為每一行都變得很相似。
````

## pop/push 和 shift/unshift 方法

[佇列（queue）](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) 是陣列最常見的用途之一。在計算機科學中，這代表著支援這兩種操作的有序群集元素：

- `push` 附加一個元素於末端。
- `shift` 從最前端獲得一個元素，推進該佇列，因此第二個元素變成了第一個。

![](queue.svg)

陣列兩種操作皆支援。

實際上我們很常會需要它，例如，需要在螢幕上顯示的訊息佇列。

有另一種陣列的使用情境 -- 被稱為 [堆疊（stack）](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) 的資料結構。

它支援兩種操作：

- `push` 加入一個元素於末端。
- `pop` 由末端取得一個元素。

所以新元素總是由 "末端" 被加入或取得。

堆疊通常被形容為一疊卡片：新的卡片被加在最頂端或由最頂端取得：

![](stack.svg)

對於堆疊而言，最後被放入的物品會最早被取得，也被稱為 LIFO (Last-In-First-Out) 原則。對於佇列而言，則是 FIFO (First-In-First-Out)。

JavaScript 中的陣列被視為佇列與堆疊兩者皆可。它們允許你 加入/移除 元素 至/由 最前端或最末端都可以。

在計算機科學中，允許這種運作的資料結構被稱為 [雙端佇列（deque）](https://en.wikipedia.org/wiki/Double-ended_queue)。

**運作於陣列末端的方法：**

`pop`
: 抽取陣列最後一個元素並回傳它：

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // 移除 "Pear" 並 alert 它

    alert( fruits ); // Apple, Orange
    ```

`push`
: 附加元素至陣列末端：

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    呼叫 `fruits.push(...)` 等同於 `fruits[fruits.length] = ...`。

**運作於陣列最前端的方法：**

`shift`
: 抽取陣列第一個元素並回傳它：

    ```js
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // 移除 Apple 並 alert 它

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: 於陣列最前端加上該元素：

    ```js
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

`push` 和 `unshift` 方法可以一次加入多個元素：

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## 內部情況

陣列是一種特殊的物件。方括號被用於存取某個屬性，`arr[0]` 實際上來自於物件的語法，這本質上與 `obj[key]` 相同，其中 `arr` 是其物件，而數字則作為鍵使用。

它們延伸了物件，提供特殊方法以使得有序群集資料可以運作，並給予 `length` 屬性，但其核心依然是個物件。

要記得，JavaScript 內只有 7 種基本類型。陣列是個物件類型，因此會產生像是物件的行為。

舉個例，它是經由參考被複製的：

```js run
let fruits = ["Banana"]

let arr = fruits; // 經由參考複製（兩個變數參考至同個陣列）

alert( arr === fruits ); // true

arr.push("Pear"); // 經由參考修改陣列

alert( fruits ); // Banana, Pear - 現在有兩個物品
```

...但使陣列真的變得特殊的是它們的內部表示方式。引擎試圖以連續記憶體區塊，一個接一個儲存它的元素，就像本章插圖描繪的那樣。同樣也存在其他優化方法，來讓陣列可以很快地運作。

但若我們放棄以 "有序群集" 的方式來操作陣列，並開始將它視為正規物件來使用時，這些優化就都不會生效了。

舉個例，技術上我們可以這麼做：

```js
let fruits = []; // 建立一個陣列

fruits[99999] = 5; // 指定一個索引值遠大於其 length 的屬性

fruits.age = 25; // 以任意名稱建立一個屬性
```

這是可行的，因為陣列根本上是個物件，我們可以對它們加入任意屬性。

但引擎會發現我們以正規物件的方式來操作陣列，陣列相關的優化將不再適用於這些情況，因此優化會被關閉，它們的優勢也就消失了。

陣列的誤用方式：

- 增加非數值的屬性，像是 `arr.test = 5`。
- 留洞，像是：加入 `arr[0]` 然後再 `arr[1000]`（兩者之間沒有任何東西）。
- 以相反順序填入陣列，像是 `arr[1000]`、`arr[999]` 等等。

請將陣列視為運作 *有序資料* 的特殊結構，它們對其提供特殊的方法。在 JavaScript 引擎內部陣列被精心調整用於連續有序資料上，請以此方式使用它們。而若你需要能夠使用任意的鍵，有很高機率你實際上需要的是一個正規物件 `{}`。

## Performance

Methods `push/pop` run fast, while `shift/unshift` are slow.

![](array-speed.svg)

Why is it faster to work with the end of an array than with its beginning? Let's see what happens during the execution:

```js
fruits.shift(); // take 1 element from the start
```

It's not enough to take and remove the element with the number `0`. Other elements need to be renumbered as well.

The `shift` operation must do 3 things:

1. Remove the element with the index `0`.
2. Move all elements to the left, renumber them from the index `1` to `0`, from `2` to `1` and so on.
3. Update the `length` property.

![](array-shift.svg)

**The more elements in the array, the more time to move them, more in-memory operations.**

The similar thing happens with `unshift`: to add an element to the beginning of the array, we need first to move existing elements to the right, increasing their indexes.

And what's with `push/pop`? They do not need to move anything. To extract an element from the end, the `pop` method cleans the index and shortens `length`.

The actions for the `pop` operation:

```js
fruits.pop(); // take 1 element from the end
```

![](array-pop.svg)

**The `pop` method does not need to move anything, because other elements keep their indexes. That's why it's blazingly fast.**

The similar thing with the `push` method.

## Loops

One of the oldest ways to cycle array items is the `for` loop over indexes:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

But for arrays there is another form of loop, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
```

The `for..of` doesn't give access to the number of the current element, just its value, but in most cases that's enough. And it's shorter.

Technically, because arrays are objects, it is also possible to use `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

But that's actually a bad idea. There are potential problems with it:

1. The loop `for..in` iterates over *all properties*, not only the numeric ones.

    There are so-called "array-like" objects in the browser and in other environments, that *look like arrays*. That is, they have `length` and indexes properties, but they may also have other non-numeric properties and methods, which we usually don't need. The `for..in` loop will list them though. So if we need to work with array-like objects, then these "extra" properties can become a problem.

2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.

Generally, we shouldn't use `for..in` for arrays.


## A word about "length"

The `length` property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.

For instance, a single element with a large index gives a big length:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Note that we usually don't use arrays like that.

Another interesting thing about the `length` property is that it's writable.

If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible, here's the example:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return
```

So, the simplest way to clear the array is: `arr.length = 0;`.


## new Array() [#new-array]

There is one more syntax to create an array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

It's rarely used, because square brackets `[]` are shorter. Also there's a tricky feature with it.

If `new Array` is called with a single argument which is a number, then it creates an array *without items, but with the given length*.

Let's see how one can shoot themself in the foot:

```js run
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
```

In the code above, `new Array(number)` has all elements `undefined`.

To evade such surprises, we usually use square brackets, unless we really know what we're doing.

## Multidimensional arrays

Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5, the central element
```

## toString

Arrays have their own implementation of `toString` method that returns a comma-separated list of elements.

For instance:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Also, let's try this:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Arrays do not have `Symbol.toPrimitive`, neither a viable `valueOf`, they implement only `toString` conversion, so here `[]` becomes an empty string, `[1]` becomes `"1"` and `[1,2]` becomes `"1,2"`.

When the binary plus `"+"` operator adds something to a string, it converts it to a string as well, so the next step looks like this:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Summary

Array is a special kind of object, suited to storing and managing ordered data items.

- The declaration:

    ```js
    // square brackets (usual)
    let arr = [item1, item2...];

    // new Array (exceptionally rare)
    let arr = new Array(item1, item2...);
    ```

    The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.

We can use an array as a deque with the following operations:

- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.

To loop over the elements of the array:
  - `for (let i=0; i<arr.length; i++)` -- works fastest, old-browser-compatible.
  - `for (let item of arr)` -- the modern syntax for items only,
  - `for (let i in arr)` -- never use.

We will return to arrays and study more methods to add, remove, extract elements and sort arrays in the chapter <info:array-methods>.
