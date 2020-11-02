
# 符號類型（Symbol Type）

根據規格，物件屬性鍵值只可能是字串類型或符號類型。不是數值類型、不是布林類型，只有字串或符號這兩種類型。

到目前為止，我們一直只用到字串。現在讓我們來看看 Symbol 能給我們帶來哪些好處。

## 符號（Symbol）

一個 "symbol" 代表唯一的識別符號。

可以用 `Symbol()` 來創建此類型的值：

```js
// id 是一個新的 Symbol
let id = Symbol();
```

創建後，我們可以給 Symbol 一個敘述（也稱為 Symbol 名稱），在進行除錯時大多很有用處：

```js
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
// id 是一個擁有敘述 "id" 的 Symbol
=======
// id is a symbol with the description "id"
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/04-object-basics/08-symbol/article.md
let id = Symbol("id");
```

Symbol 保證是唯一的。即使我們創建了許多擁有相同敘述的 Symbol，它們的值還是不同的。敘述只是一個標籤，不影響任何東西。

舉例來說，這裡有兩個擁有相同敘述的 Symbol -- 它們並不相等：

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

如果你熟悉 Ruby 或是其他也同樣擁有所謂 "Symbol" 的語言 -- 請不要被誤導。 JavaScript 的 Symbol 是不一樣的。

````warn header="Symbol 並不會被自動轉換成字串"
JavaScript 中，大部分的值都支援字串的隱性轉換。例如，我們可以 `alert` 幾乎任何值，且它可以正常運作。Symbol 是特殊的。它們不會自動轉換。

例如，這個 `alert` 會顯示錯誤：

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

這是一種防止混亂的 "語言防範（language guard）"，因為字串與 Symbol 有本質上的不同，不應該意外地將它們互相轉換。

如果我們真的想要顯示一個Symbol，我們需要在它上面明確地呼叫 `.toString()`，像這樣：

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), 現在它可以正常運作了
*/!*
```

或是取得 `symbol.description` 屬性來單純顯示敘述：
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "隱藏（Hidden）" 屬性

Symbol 允許我們創建物件的 "隱藏" 屬性，其他部分的程式碼都無法意外存取到或是覆寫它。

舉例來說，如果我們正在操作屬於第三方程式碼的 `user` 物件們。我們想要增加識別符到它們上。

讓我們用一個 Symbol 的鍵值來處理：

```js run
let user = { // 屬於另一份程式碼
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // 我們可以用 Symbol 當作鍵值來存取資料
```

比起用字串 `"id"`，用 `Symbol("id")` 我們可以獲得什麼好處？

當 `user` 物件屬於其他程式碼，且那些程式碼同樣會操作它時，我們不應該增加任何欄位到物件上。這樣不安全。但 Symbol 是沒辦法被意外存取的，第三方的程式碼甚至可能不會看到它，所以這麼做沒問題。

此外，想像一下此時有另一個腳本想要在 `user` 內放入它們自己的識別符號，用於它們自己的目的。那可能是另一個 JavaScript 套件，所以腳本之間完全不會意識到對方的存在。

然後該腳本可以創建自己的 `Symbol("id")`，像這樣：

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

這不會造成我們與其他腳本之間的識別符有任何衝突，因為 Symbol 永遠是不同的，即使他們有相同的名稱。

...但如果我們用字串 `"id"` 而非 Symbol，那麼 *就會* 發生衝突：

```js run
let user = { name: "John" };

// 我們的腳本使用 "id" 屬性
user.id = "Our id value";

// ...另一個腳本也想使用 "id"...

user.id = "Their id value"
// 碰！被另一個腳本給覆寫了！
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
### 字面值中的符號
=======
### Symbols in an object literal
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/04-object-basics/08-symbol/article.md

如果我們想要在物件字面值 `{...}` 中使用 Symbol，我們需要方括號包圍它。

像這樣：

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
  [id]: 123 // 不是 "id: 123"
=======
  [id]: 123 // not "id": 123
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/04-object-basics/08-symbol/article.md
*/!*
};
```

這是因為我們需要變數 `id` 的值當作鍵值，而非字串 "id"。

### 符號在 for..in 中被跳過

Symbol 類型的屬性並不參與 `for..in` 迴圈。

例如：

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age（沒有 Symbol）
*/!*

// 直接存取 Symbol 是沒問題的
alert( "Direct: " + user[id] );
```

`Object.keys(user)` 也會忽略它們。那是一般 Symbol 中 "隱藏屬性" 原則的一部分。如果另一個腳本或是一個套件在我們的物件上循環，它不會不小心存取到 Symbol 類型的屬性。

相反地，[Object.assign](mdn:js/Object/assign) 同時複製字串與 Symbol 屬性：


```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

這裡沒有矛盾，就是這樣設計的。想法是當我們複製一個物件，或是合併多個物件時，我們通常想要 *所有* 屬性都被複製（包含像 `id` 這樣的 Symbol ）。

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
````smart header="其他類別的屬性鍵值會被強行轉換成字串"
在物件中，我們只能使用字串或 Symbol 當作鍵值。其他類型都會被轉成字串。

舉例來說，當一個數值 `0` 被用來當作屬性健值時，它會變成一個字串 `"0"`：

```js run
let obj = {
  0: "test" // 跟 "0": "test" 一樣
};

// 兩個 alerts 都存取到同樣的屬性（數值 0 被轉換成字串 "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test (同樣的屬性)
```
````

## 全局符號
=======
## Global symbols
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/04-object-basics/08-symbol/article.md

正如我們所見，通常所有的 Symbol 都是不同的，即使它們擁有相同的名稱。但是有時候我們想要擁有相同名稱的 Symbol 被當作相同的物體。例如，我們應用程式中的不同部分想用Symbol `"id"` 存取到完全相同的屬性。

為此，存在一個 *全域 Symbol 註冊表（global symbol registry）*。我們可以在其中創建 Symbol 並在稍後存取它們，而這確保我們每次存取相同名稱都會回傳相同的 Symbol。。

為了從註冊表中讀取（如果不存在就創建）Symbol，請使用 `Symbol.for(key)`。

該呼叫會檢查全域註冊表，若有個描述為 `key` 的 Symbol 存在，則回傳該 Symbol，否則就以 `Symbol(key)` 創建新的 Symbol，並將其以 `key` 儲存到註冊表中。

舉個例子：

```js run
// 從全域註冊表中讀取
let id = Symbol.for("id"); // 如果該 Symbol 不存在，就創建它

// 再次讀取它（或許從程式碼的另一個部分）
let idAgain = Symbol.for("id");

// 同樣的 Symbol
alert( id === idAgain ); // true
```

註冊表內的 Symbols 稱為 *全域 Symbol*。如果我們想要一個應用程序範圍內的 Symbol，可以在程式碼中隨處存取 -- 這就是它們的用途。

```smart header="這聽起來像是 Ruby"
在某些程式語言中，像是 Ruby，每個名稱都只有單一個 symbol。

在 JavaScript 中，如我們所見，只有全域 Symbol 才是如此。
```

### Symbol.keyFor

對於全域 Symbol，不止有 `Symbol.for(key)` 可以根據某個名稱回傳其 Symbol，還有個反向呼叫，`Symbol.keyFor(sym)` 做反過來的事：根據一個全域 Symbol 回傳其名稱。

例如：

```js run
// 根據名稱取得 Symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 根據 Symbol 取得名稱
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
`Symbol.keyFor` 在內部使用全域 Symbol 註冊表來查詢 Symbol 的鍵值。所以它並不適用於非全域的 Symbol。如果某個 Symbol 不是全域的，此方法將無法找到它，並會回傳 `undefined`。
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d:1-js/04-object-basics/08-symbol/article.md

是說，任何 Symbol 都有 `description` 屬性。

例如：

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, 全局 symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, 非全域

alert( localSymbol.description ); // name
```

## 系統符號

JavaScript 內部存在許多 "系統" Symbol，我們可以使用它們來微調物件的各種方面。

它們列在規格中的 [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) 表格內：

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...等等。

例如，`Symbol.toPrimitive` 允許我們將物件描述為原生值轉換。我們很快就會看到怎麼使用它。

當我們研讀相應的語言特性時，也將會更熟悉其他 Symbol。

## 總結

`Symbol` 是用於標示唯一識別符號的原生類別。

Symbol 使用 `Symbol()` 與一個可選的敘述（名稱）作為參數來創建。

Symbol 永遠是不同的值，即使它們擁有相同的名稱。如果我們想要同名的 Symbol 也相等，那我們應該使用全域註冊表：`Symbol.for(key)` 回傳（如果需要的話創建）一個以 `key` 作為名稱的全域 Symbol。以相同的 `key` 用 `Symbol.for` 多次進行呼叫，都會回傳完全相同的 Symbol。

Symbol 有兩個主要使用場景：

1. "隱藏" 物件屬性。
    如果我們想要增加一個屬性到 "屬於" 其他腳本或是套件的物件之中，我們可以創建一個 Symbol 並用它當作屬性的鍵值。Symbol 屬性不會出現在 `for..in` 中，所以他不會不小心被其他屬性一起處理。此外它也不能被直接存取，因為其他腳本不擁有我們的 Symbol。所以該屬性將會被保護，以防意外被存取或覆寫。

    所以我們可以使用 Symbol 屬性， "秘密地" 將一些我們需要，但其他人不需要的東西藏進物件中。

2. JavaScript 內部使用了許多系統 Symbol，以類似 `Symbol.*` 的形式被存取。我們可以使用它們來更改一些內建的行為。舉例來說，在之後的教程我們將會在 [迭代（iterables）](info:iterable) 中使用 `Symbol.iterator`，設定 [物件轉換原生值（object-to-primitive conversion）](info:object-toprimitive) 時使用 `Symbol.toPrimitive`，等等。

從技術上來說，Symbol 並非 100% 隱藏。有一個內建方法 [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) 允許我們取得所有的 Symbol。另外，還有個方法叫做 [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 會回傳物件中的 *所有* 鍵值，包含 Symbol。所以它們並非真的被隱藏。但大多套件、內建函式和語法結構都不會使用這些方法。
