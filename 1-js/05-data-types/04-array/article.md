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

<<<<<<< HEAD
在計算機科學中，允許這種運作的資料結構被稱為 [雙端佇列（deque）](https://en.wikipedia.org/wiki/Double-ended_queue)。
=======
In computer science the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

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

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // 移除 Apple 並 alert 它

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: 於陣列最前端加上該元素：

    ```js run
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

<<<<<<< HEAD
要記得，JavaScript 內只有 7 種基本類型。陣列是個物件類型，因此會產生像是物件的行為。
=======
Remember, there are only eight basic data types in JavaScript (see the [Data types](info:types) chapter for more info). Array is an object and thus behaves like an object.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

舉個例，它是經由參考被複製的：

```js run
let fruits = ["Banana"]

let arr = fruits; // 經由參考複製（兩個變數參考至同個陣列）

alert( arr === fruits ); // true

arr.push("Pear"); // 經由參考修改陣列

alert( fruits ); // Banana, Pear - 現在有兩個物品
```

...但使陣列真的變得特殊的是它們的內部表示方式。引擎試圖以連續記憶體區塊，一個接一個儲存它的元素，就像本章插圖描繪的那樣。同樣也存在其他優化方法，來讓陣列可以很快地運作。

但若我們放棄以 "有序群集" 的方式來操作陣列，並開始將它視為普通物件來使用時，這些優化就都不會生效了。

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

請將陣列視為運作 *有序資料* 的特殊結構，它們對其提供特殊的方法。在 JavaScript 引擎內部陣列被精心調整用於連續有序資料上，請以此方式使用它們。而若你需要能夠使用任意的鍵，有很高機率你實際上需要的是一個普通物件 `{}`。

## 效能

`push/pop` 方法執行較快，而 `shift/unshift` 則較慢。

![](array-speed.svg)

為什麼操作陣列末端會比操作最前端還要更快呢？來看看執行時發生了什麼事：

```js
fruits.shift(); // 由前端取出 1 個元素
```

只取出並移除編號 `0` 的元素還不夠，其它元素也需要被重新編號。

`shift` 操作必須做三件事情：

1. 移除索引值為 `0` 的元素。
2. 將所有元素向左邊移動，以索引值由 `1` 至 `0`、由 `2` 至 `1` 等等的方式來重新編號。
3. 更新 `length` 屬性。

![](array-shift.svg)

**陣列裡元素越多，移動它們就越花時間，也需要更多對記憶體的操作。**

同樣的事情發生在 `unshift` 上：要從陣列最前端加上一個元素，我們首先需要向右移動現存的元素，也就是增加它們的索引值。

而 `push/pop` 做了什麼呢？它們不需要移動任何東西。要從末端抽取一個元素，使用 `pop` 方法清空該索引值並縮短 `length` 即可。

`pop` 操作的動作是：

```js
fruits.pop(); // 由末端取得 1 元素
```

![](array-pop.svg)

**`pop` 方法不需要移動任何東西，因為其它元素依然保持它們的索引值，這也是為什麼它如此快的原因。**

同樣的事發生在 `push` 方法上。

## 迴圈

最古早遍歷陣列元素的方式之一，是對其索引值使用 `for` 迴圈：

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

但對陣列而言有另一種迴圈形式，`for..of`：

```js run
let fruits = ["Apple", "Orange", "Plum"];

// 對陣列元素迭代
for (let fruit of fruits) {
  alert( fruit );
}
```

`for..of` 不能存取目前元素的編號，只能拿到它的值。但大多數情況這就夠了，且它更為簡短。

技術上來說，因為陣列是個物件，它也可以使用 `for..in`：

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

但那事實上是個爛主意，這麼做有些潛在的問題：

1. `for..in` 迴圈對於 *所有屬性* 迭代，而非只有數值屬性。

    在瀏覽器和其它環境中有些被稱為 "類陣列（array-like）" 的物件，它們 *看起來向陣列*。也就是說，它們有 `length` 和索引值的屬性，但它們也會有其它非數值的屬性和方法，這些通常我們不會需要，然而 `for..in` 迴圈卻會列出它們。所以若我們需要操作類陣列的物件時，這些 "額外的" 屬性就會變成問題。

2. `for..in` 迴圈在一般物件上被優化，但在陣列上沒有，而且會慢上10 到 100 倍。當然，它依舊很快，只有在面臨效能瓶頸時這些加速才會比較重要，但我們依然應該注意到它們的差別。

一般來說，我們不該對陣列使用 `for..in`。

## 有關 "length" 這個字

`length` 屬性在我們修改陣列時會自動更新，精確地說，它實際上並非計數陣列中的值有幾個，而是把最大的數值索引值再加上一。

舉個例，若陣列只有單一元素但其有很大的索引值，也會給出很大的 length：

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

要注意我們通常不會像這樣使用陣列。

另一個關於 `length` 的有趣事情是它可以被寫入。

若我們手動增加它，什麼微妙的事都不會發生。但若我們減少它，那麼陣列就會被截斷。此過程是不可逆的，這邊有個例子：

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // 截斷至只剩 2 個元素
alert( arr ); // [1, 2]

arr.length = 5; // 把 length 改回來
alert( arr[3] ); // undefined：值回不來了
```

所以，要清除陣列最簡單的方法就是：`arr.length = 0;`。

## new Array() [#new-array]

還有另一種建立陣列的語法：

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

這很少被用到，因為中括號 `[]` 較簡短，且這語法還有個微妙的特性。

若 `new Array` 使用單一數值作為引數來呼叫，那它會建立一個 *內部沒有項目而只有給定 length* 的陣列。

來看看這會如何拿石頭砸自己的腳：

```js run
let arr = new Array(2); // 它會建立 [2] 這樣的陣列嗎？

alert( arr[0] ); // 是 undefined！沒有元素在內。

alert( arr.length ); // 但 length 是 2
```

在上面的程式碼中，`new Array(number)` 的所有元素都是 `undefined`。

要避免這種驚喜，我們通常使用中括號語法就好，除非我們真的知道自己在做什麼。

## 多維度陣列

陣列內的項目也可以是陣列，我們用來它來表示多維度陣列，例如儲存矩陣：

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5，最中央的元素
```

## toString

陣列有它們自己的 `toString` 實作，會回傳一個以逗號分隔元素的清單。

舉個例：

```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

同樣地，試試這個：

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

陣列並沒有 `Symbol.toPrimitive`，也沒有可用的 `valueOf`，它們只實作 `toString` 轉換，所以這邊的 `[]` 變成空字串、`[1]` 變成 `"1"` 而 `[1,2]` 變成 `"1,2"`。

當二元加號 `"+"` 運算子對字串加東西時，會把它也轉成字串，所以下一步看起來就像這樣：

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

<<<<<<< HEAD
## 總結
=======
## Don't compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn't be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let's recall the rules:

- Two objects are equal `==` only if they're references to the same object.
- If one of arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types. 

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

These arrays are technically different objects. So they aren't equal. The `==` operator doesn't do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`. 

Then the comparison process goes on with the primitives, as described in the chapter <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

So, how to compare arrays?

That's simple: don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## Summary
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

陣列是個特殊的物件，適合儲存管理有序的資料項目。

- 宣告：

    ```js
    // 中括號（通常用這個）
    let arr = [item1, item2...];

    // new Array（極為少用）
    let arr = new Array(item1, item2...);
    ```

    呼叫 `new Array(number)` 會建立一個有著指定 length 的陣列，但其內都沒有元素。

- `length` 屬性是陣列長度，或更精準地說，是它的最大數值索引值再加上一。它由陣列的方法自動調整。
- 若我們手動縮短 `length`，則陣列會被截斷。

我們可以將陣列視為雙端佇列來使用以下操作：

- `push(...items)` 增加 `items` 至末端。
- `pop()` 由末端移除元素並回傳。
- `shift()` 由最前端移除元素並回傳。
- `unshift(...items)` 增加 `items` 至最前端。

想要遍歷陣列的元素時：
  - `for (let i=0; i<arr.length; i++)` -- 執行最快，兼容古老的瀏覽器。
  - `for (let item of arr)` -- 只看 items 的現代化語法。
  - `for (let i in arr)` -- 別用。

我們會在章節 <info:array-methods> 中回顧陣列，並學習更多像是增加、移除、取出元素和排序陣列等的方法。

<<<<<<< HEAD
=======
To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it's not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter <info:array-methods>.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
