# 原生類型的方法

JavaScript 允許我們像物件一樣來使用原生類型（字串、數值等等），它們也提供類似的呼叫方法。我們很快會學到，但首先要來看看它是怎麼運作的，沒錯，因為原生類型並不真的是物件（且在此我們要來把它弄得更清楚點）。

來看看原生類型與物件之間的關鍵區別吧。

原生值

<<<<<<< HEAD
- 是個原生類型的值。
- 有六種原生類型：`字串（string）`、`數值（number）`、`布林（boolean）`、`符號（symbol）`、`null` 和 `undefined`。
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.
<<<<<<< HEAD
>>>>>>> 71120d5968cec3103743014cf563e0f7c8045a16
=======
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

物件

- 能夠儲存多個值作為屬性。
- 可以經由 `{}` 建立，例如：`{name: "John", age: 30}`。在 JavaScript 中還有其它種類的物件：例如函式就是物件。

物件最棒的事情之一就是我們可以存放函式作為它的屬性。

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

在這我們已經建立一個有著 `sayHi` 方法的物件 `john` 了。

已存在許多內建物件，像是用來處理日期、錯誤、HTML 元素等等的，它們有著不一樣的屬性與方法。

但是，這些功能是有代價的！

物件比原生類型 "更笨重"，它們需要額外資源來支援內部機制。

## 作為物件的原生類型

JavaScript 的建立者們面臨了這樣的一個矛盾：

<<<<<<< HEAD
- 人們想對字串或數值這樣的原生類型做許多事，若能透過其方法來存取就太棒了。
- 原生類型應該要盡可能的快速和輕量化。
=======
- There are many things one would want to do with a primitive like a string or a number. It would be great to access them using methods.
- Primitives must be as fast and lightweight as possible.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

解法看起來有點笨，但就是這樣：

1. 原生類型依然是原生的，與預期相同，一個簡單的值。
2. 語言允許存取字串、數值、布林與符號的方法與屬性。
3. 為了要讓其可以運作，建立一個特殊的 "物件包裝" 並提供額外的功能，然後運作後再銷毀。

<<<<<<< HEAD
"物件包裝" 對於每種原生類型都不同，名為：`String`、`Number`、`Boolean` 和 `Symbol`。因此，它們提供不同的方法集合。
=======
The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean`, `Symbol` and `BigInt`. Thus, they provide different sets of methods.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

舉個例，有個字串方法 [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) 回傳被大寫的 `str`。

這邊是它的用法：

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

簡單，對吧？這邊是實際上在 `str.toUpperCase()` 內到底發生了什麼事：

1. 字串 `str` 是個原生數值，所以在存取它屬性的當下，建立一個知道字串值的特殊物件，並包含有用的方法，像是 `toUpperCase()`。
2. 該方法被執行且回傳一個新字串（被 `alert` 顯示）。
3. 該特殊物件被銷毀，獨自留下原生類型 `str`。

因此原生類型可以提供方法，但它們依然維持輕量化。

JavaScript 引擎高度優化這個過程，它甚至會完全跳過建立額外的物件，但仍必須堅守規格且表現的像是它有建立一樣。

數值有著自己的方法，例如，[toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 四捨五入至給予的精度：

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

我們將會在章節 <info:number> 和 <info:string> 看到更多特定的方法。

````warn header="建構子 `String/Number/Boolean` 僅供內部使用"
有些像是 Java 的語言允許我們使用像是 `new Number(1)` 或 `new Boolean(false)` 的語法，來對原生類型明確建立 "包裝物件"

在 JavaScript，因為歷史因素的關係也可以這麼做，但極度 **不建議**，這樣做的話在很多地方的東西可能會變得讓人抓狂。

舉個例：

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

物件在 `if` 中永遠是真值，所以這邊的 alert 將會被顯示：

```js run
let zero = new Number(0);

if (zero) { // zero 是 true，因為它是物件
  alert( "zero is truthy!?!" );
}
```

另一方面，不透過 `new` 而使用同樣的函式 `String/Number/Boolean` 是明智且有用的用法，它們將值轉換為對應的類型：字串、數值或布林（原生類型）。

例如，這樣完全有效：

```js
let num = Number("123"); // 轉換字串為數值
```
````


````warn header="null/undefined 沒有任何方法"
特殊的原生類型 `null` 和 `undefined` 是例外。它們沒有對應的 "包裝物件" 且沒有提供任何方法。在否種意義上，它們 "最原生"。

試圖存取這種值的屬性將會給予錯誤：

```js run
alert(null.test); // error
````

## 總結

- 除了 `null` 和 `undefined` 以外的原生類型提供許多有幫助的方法，我們會在接下來的章節學習它們。
- 正確地說，這些方法經由臨時物件來運作，但 JavaScript 引擎已經對此做了良好的調整來內部優化。所以它們呼叫起來資源消耗不高。

