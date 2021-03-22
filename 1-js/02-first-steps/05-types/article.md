# 資料類型

<<<<<<< HEAD
JavaScript 中的變數可包含任意資料，一個變數可以在某時間點是字串然後在另一個時間點是數值：
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```js
// 沒有出錯
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
若允許這麼做的程式語言，稱其具有 "動態類型（dynamically typed）"，意思是變數不會綁定任一種資料類型。

JavaScript 中有八種基礎的資料類型，在此我們會稍微介紹下它們，然後在接下來的章節中我們會逐一介紹其細節：

## 數值（A number）
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```js
let n = 123;
n = 12.345;
```

*數值（number）* 類型用於表示整數（integer）與浮點數（floating point numbers）。

數值有許多運算方式，像是：乘法 `*`、除法 `/`、加法 `+`、減法 `-` 等等。

除了正常的數值外，還有些稱為 "特殊數值"，也是屬於此種資料類型：`Infinity`、`-Infinity` 和 `NaN`。

- `Infinity` 代表著數學上的 [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞ ，它是個比任何數都大的特殊值。

    我們可以透過除以零的結果來得到它：

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    或是直接取用它：

    ```js run
    alert( Infinity ); // Infinity
    ```

- `NaN` 代表著計算上的錯誤，不正確或是未定義的數學運算結果，像是：

    ```js run
    alert( "not a number" / 2 ); // NaN，這種除法是錯誤的
    ```

    `NaN` 具有黏性。任何對 `NaN` 的進一步運算都會回傳 `NaN`：

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    所以如果數學表示式中有個 `NaN`，就會傳播至整個運算結果上。

```smart header="數學運算很安全"
操作數學運算在 JavaScript 是 "安全的"。我們可以做任何事情：除以零、把不是數值的字串當作數值等等。

腳本永遠不會因為數學運算導致致命錯誤（fatal error）而停止（"死亡"），最糟只會得到 `NaN` 這個結果而已。
```

特殊數值是屬於 "數值" 類型的一員，當然它們在世間的常識中並不是數值。

我們會在章節 <info:number> 中看到更多使用數值的方式。

## BigInt 類型

<<<<<<< HEAD
在 JavaScript 中，"number" 類型沒辦法代表大於 <code>2<sup>53</sup></code> （或小於 <code>-2<sup>53</sup></code> ）的整數，這是其內部表示系統上的技術限制。這大約是 16 位十進位數字，在大多數的情況下，這個限制都不是問題，但有時我們真的需要很大的數字，例如用於密碼學或是精準度到 microsecond 的時間戳記。
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

`BigInt` 類型最近被加入到 JavaScript 語言中，用於表示任意長度的整數。

可以通過將 `n` 加入整數字面值的尾部來創建 `BigInt`：

```js
// 有個 "n" 在其尾部，代表這是一個 BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we devoted them a separate chapter <info:bigint>.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox and Chrome, but not in Safari/IE/Edge.
```

## 字串（String）

JavaScript 中的字串（string）必須被引號（quotes）所環繞。

```js
let str = "Hello";
<<<<<<< HEAD
let str2 = 'Single quotes are ok too（單引號也可以）';
let phrase = `can embed ${str}（字串可被 \${內嵌}）`;
=======
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
```

在 JavaScript 中，有三種引號。

1. 雙引號：`"Hello"`。
2. 單引號：`'Hello'`。
3. 反引號：<code>&#96;Hello&#96;</code>。

<<<<<<< HEAD
單雙引號都是 "簡易的" 引號，在 JavaScript 中它們沒有差異。
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

反引號是 "功能擴展" 引號，讓我們可以在字串中利用 `${...}` 嵌入變數或是表達式，例如：

```js run
let name = "John";

// 嵌入變數
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// 嵌入表達式 
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

在 `${...}` 中的表達式會被運算，其結果會被作為字串的一部分。我們可以在內放入任何東西：一個名為 `name` 的變數、數學運算式 `1 + 2` 或其他更複雜的東西。

請注意這只在反引號中有作用，其他引號不具此種內嵌功能！
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2}（雙引號什麼都沒做）
```

我們會在章節 <info:string> 中介紹更多細節。

<<<<<<< HEAD
```smart header="不存在 *字元（character）* 類型"
在一些語言中，單一字元有個特殊的 "字元" 類型，像是在 C 語言或是 Java 中的 `char`。

在 JavaScript 中沒有這種類型，只有一種 `字串` 類型。一串字串可以只有一個或擁有多個字元在內。
```

## 布林（Boolean）（邏輯類型）
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

布林（boolean）類型只有兩種值：`true` 和 `false`。

這種類型通常運於儲存 yes 或 no 的值：`true` 代表 "yes、正確"，而 `false` 代表 "no、不正確"。

例如：

```js
let nameFieldChecked = true; // yes, name 欄位已確認過
let ageFieldChecked = false; // no, age 欄位尚未確認
```

布林值也可作為比較的結果：

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true（比較的結果是 "yes"）
```

我們將在章節 <info:logical-operators> 中涵蓋布林類型更深入的內容。

## "null" 值

這個特殊的 `null` 值不屬於之前提到的任一種類型。

它自己獨立成一個類型，其中只有 `null` 這個值。

```js
let age = null;
```

在 JavaScript 中， `null` 並不向其他語言一樣是個 "指到不存在的物件的參考" 或是一個 "null 指標"。

它就只是個代表著 "沒東西"、"空白" 或 "未知值" 的特殊值。

<<<<<<< HEAD
上面那段程式碼中的 `age`，就表示因為某些因素而未知或空白。
=======
The code above states that `age` is unknown.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

## "undefined" 值

這個特殊的 `undefined` 值同樣自成一格，自身的值擁有獨立的類型，就像 `null` 一樣。

`undefined` 的意義是 "值尚未指定"。

如果一個變數被宣告了但還沒被賦予值，那它的值就是 `undefined`：

```js run
let age;

<<<<<<< HEAD
alert(x); // 顯示 "undefined"
```

技術上來說，可以把 `undefined` 指定給任何變數：
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...但我們不建議這麼做。通常我們使用 `null` 來給一個變數 "空白" 或是 "未知" 的值，然後使用 `undefined` 來查看變數是否有被給過值。
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

## 物件（Objects）和符號（Symbols）

`物件（object）` 這個類型很特殊。

<<<<<<< HEAD
其它類型都稱為 "原生（primitive）" 類型，因為它們的值只可包含一種東西（一個字串或一個數值或一個其它東西），相對地，物件被用來儲存資料群集和更複雜的東西。再更充分了解原生類型後，我們晚點會在 <info:object> 這個章節中介紹它。

`符號（symbol）` 類型被用在為物件建立一個獨特的識別符（identifiers），為了完整性我們在此提到它，但會在介紹完物件後再來學習。
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

## typeof 運算子(typeof operator）[#type-typeof]

`typeof` 運算子會回傳其引數（argument）的類型。這在當我們想要分開處理不同類型的值，或只是想要快速檢查類型時，就會很有用。

它支援兩種語法格式：

1. 作為運算子：`typeof x`。
2. 作為函式：`typeof(x)`。

換句話說，有沒有括號都可以正常運作，結果也都一樣。

呼叫 `typeof x` 會回傳一個該類型名稱的字串：

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"（1）
*/!*

*!*
typeof null // "object"（2）
*/!*

*!*
typeof alert // "function"（3）
*/!*
```

最後三行可能需要額外解釋：

1. `Math` 是個用來提供數學運算的內建物件，我們會在 <info:number> 這個章節中介紹它，在這裡只是把它視為一個物件的範例。
2. `typeof null` 的結果是 `object`，這是錯誤的。這是個官方承認在 `typeof` 中的錯誤，保留它只是為了兼容性。`null` 當然不是一個物件，它是個有著自己類型的特殊值。再次強調，這是語言中的一個錯誤。
3. `typeof alert` 的結果是 `function`，因為 `alert` 是個函式。我們會在接下來的章節中學到函式，並了解 JavaScript 中沒有 "function" 這個特殊的類型。函式屬於物件類型的一種，但 `typeof` 視它們為不同兩者並回傳 `function`。這不那麼正確，但在實作中卻很方便。

<<<<<<< HEAD

## 總結
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

在 JavaScript 中有 8 種基礎資料類型：

<<<<<<< HEAD
- `number` 用於任何類型的數值：整數或浮點數。
- `bigint` 用於任意長度的整數。
- `string` 用於字串。一個字串可以包含一個或多個字元，但不獨立存在單一字元的類型。
- `boolean` 用於 `true` 或 `false`。
- `null` 用於未知的值 -- 只有一個值 `null` 的獨立類型。
- `undefined` 用於尚未指定值 -- 只有一個值 `undefined` 的獨立類型。
- `object` 用於更為複雜的資料結構。
- `symbol` 用於獨特的識別符。

`typeof` 運算子讓我們確認變數中儲存的類型。
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

- 兩種格式：`typeof x` 或 `typeof(x)`。
- 回傳一個類型名稱的字串，像是 `"string"`。
- 對於 `null` 回傳 `"object"` -- 這是語言中的錯誤，它實際上不是個物件。

接下來的章節中，我們將更專注於介紹原生類型，一旦對它們更熟悉了，就會開始來介紹物件。

