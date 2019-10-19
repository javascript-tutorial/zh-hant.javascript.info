
# 符號型別（Symbol type）

根據規格，物件屬性鍵值只可能是字串型別或符號型別。不是數值型別、不是布林型別，只有字串或符號這兩種類型。

到目前為止，我們一直只用到字串。現在讓我們來看看符號能給我們帶來哪些好處。

## 符號（Symbol）

一個 "symbol" 代表唯一的識別符號。

可以用 `Symbol()` 來創建此類型的值：

```js
// id 是一個型的符號
let id = Symbol();
```

創建後，我們可以給符號一個敘述（也稱為符號名稱），在進行除錯時大多很有用處：

```js run
// id 是一個擁有敘述 "id" 的符號
let id = Symbol("id");
```

符號保證是唯一的。即使我們創建了許多擁有相同敘述的符號，他們的值還是不同的。敘述只是一個標籤，不影響任何東西。

舉例來說，這裡有兩個擁有相同敘述的符號 -- 他們並不相等：

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

如果你熟悉 Ruby 或是其他也同樣擁有所謂 "符號" 的語言 -- 請不要被誤導。 JavaScript 的符號是不一樣的。

````warn header="符號並不會被自動轉換成字串"
JavaScript 中，大部分的值都支援字串的隱性轉換。例如，我們可以 `alert` 幾乎任何值，且它可以正常運作。符號是特殊的。他們不會自動轉換。

例如，這個 `alert` 會顯示錯誤：

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

這是一種防止混亂的 "語言防範（language guard）"，因為字串與符號有本質上的不同，不應該意外的將它們互相轉換。

如果我們真的想要顯示一個符號，我們需要在它上面明確的呼叫 `.toString()`，像這樣：

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

符號允許我們創建物件的 "隱藏" 屬性，其他部分的程式碼都無法意外存取到或是覆寫它。

舉例來說，如果我們正在操作一個屬於第三方程式碼的 `user` 物件們。我們想要增加屬性到它們上。

讓我們用一個符號鍵來處理：

```js run
let user = { // 屬於另一份程式碼
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // 我們可以用符號當作鍵值來存取資料
```

比起用字串 `"id"`，用 `Symbol("id")` 我們可以獲得什麼好處？

當 `user` 物件屬於其他程式碼，且那些程式碼同樣會操作它時，我們不應該增加任何欄位到物件上。這樣不安全。但符號是沒辦法被意外存取的，第三方的程式碼甚至可能不會看到它，所以這麼做沒問題。

此外，想像一下此時有另一個腳本想要在 `user` 內放入他們自己的識別符號，用於他們自己的目的。那可能是另一個 JavaScript 套件，所以腳本之間完全不會意識到對方的存在。

然後該腳本可以創建自己的 `Symbol("id")`，像這樣：

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

這不會造成我們與其他腳本之間有任何衝突，因為符號永遠是不同的，即使他們有相同的名稱。

...但如果我們用字串 `"id"` 而非符號，那麼 *就會* 發生衝突：

```js run
let user = { name: "John" };

// 我們的腳本使用 "id" 屬性
user.id = "Our id value";

// ...另一個腳本也想使用 "id"...

user.id = "Their id value"
// Boom! 被另一個腳本給覆寫了！
```

### 字面值中的符號

如果我們想要在物件字面值 `{...}` 中使用符號，我們需要方括號包圍它。

像這樣：

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // 不是 "id: 123"
*/!*
};
```

這是因為我們需要變數 `id` 的值當作鍵值，而非字串 "id"。

### 符號在 for..in 中被跳過

符號型別的屬性並不參與 `for..in` 迴圈。

例如：

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age（沒有符號）
*/!*

// 直接存取符號是沒問題的
alert( "Direct: " + user[id] );
```

`Object.keys(user)` 也會忽略它們。那是一般 "隱藏符號屬性" 原則的一部分。如果另一個腳本或是一個套件在我們的物件上循環，他不會不小心存取到符號型別的屬性。

相反的 [Object.assign](mdn:js/Object/assign) 同時複製字串與符號屬性：


```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

這裡沒有悖論。就是這樣設計的。想法是當我們複製一個物件，或是合併多個物件時，我們通常想要 *所有* 屬性都被複製（包含像 `id` 這樣的符號）。

````smart header="其他類別的屬性件值會被強行轉換成字串"
在物件中，我們只能使用字串或符號當作鍵值。其他型別都會被轉成字串。

舉例來說，當一個數字 `0` 被用來當作屬性健值時，它會變成一個字串 `"0"`：

```js run
let obj = {
  0: "test" // 跟 "0": "test" 一樣
};

// 兩個 alerts 都存取到同樣的屬性（數字 0 被轉換成字串 "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test (同樣的屬性)
```
````

## 全局符號（Global symbols）

正如我們所見，通常所有的符號都是不同的，即使他們擁有相同的名稱。但是有時候我們想要擁有相同名稱的符號被當作相同的物體。例如，我們應用程式中的不同部分想用符號 `"id"` 存取到完全相同的屬性。

為此，存在一個 *全局符號註冊表*。我們可以創建符號
To achieve that, there exists a *global symbol registry*. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.

That call checks the global registry, and if there's a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`.

For instance:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

Symbols inside the registry are called *global symbols*. If we want an application-wide symbol, accessible everywhere in the code -- that's what they are for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name.

In JavaScript, as we can see, that's right for global symbols.
```

### Symbol.keyFor

For global symbols, not only `Symbol.for(key)` returns a symbol by name, but there's a reverse call: `Symbol.keyFor(sym)`, that does the reverse: returns a name by a global symbol.

For instance:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and return `undefined`.

That said, any symbols have `description` property.

For instance:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## System symbols

There exist many "system" symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We'll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## Summary

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.
