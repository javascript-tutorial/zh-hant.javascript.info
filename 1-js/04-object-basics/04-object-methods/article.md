# 物件方法（Object methods）與 "this"

物件通常被建立在表現真實世界的實體，像是使用者、訂單等等：

```js
let user = {
  name: "John",
  age: 30
};
```

此外，在真實事件中，使用者可以 *動作*：由購物車選東西、登入、登出等等。

動作在 JavaScript 中是經由置於屬性中的函式來表現。

## 方法範例

一開始，從教教 `user` 說個哈囉開始：

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

<<<<<<< HEAD
這邊我們已使用函式表達式來建立函式並指定為該物件的屬性 `user.sayHi`。

接著可以呼叫它，使用者就會說話了！

函式若為某個物件的屬性，則稱它為 *方法（method）*。
=======
Here we've just used a Function Expression to create a function and assign it to the property `user.sayHi` of the object.

Then we can call it as `user.sayHi()`. The user can now speak!

A function that is a property of an object is called its *method*.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

所以，這邊我們得到物件 `user` 的一個方法 `sayHi`。

當然，我們可以使用某個事先宣告的函式作為方法，像這樣：

```js run
let user = {
  // ...
};

*!*
// 先宣告
function sayHi() {
  alert("Hello!");
};

// 然後加進去做為方法
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="物件導向程式設計"
當我們使用物件寫程式碼來表現實體時，被稱為 [物件導向程式設計（object-oriented programming）](https://en.wikipedia.org/wiki/Object-oriented_programming)，簡稱為："OOP"。

<<<<<<< HEAD
OOP 是門很大的學問，本身就是個有趣的科學。要怎麼選擇正確的實體？如何組織兩者間的交互作用？這就是架構，且有些很棒的書在探討這個議題，像是 E.Gamma, R.Helm, R.Johnson, J.Vissides 的 "Design Patterns: Elements of Reusable Object-Oriented Software" 或 G.Booch 的 "Object-Oriented Analysis and Design with Applications" 等等。
=======
OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```

### 方法簡寫

方法有個物件字面值（object literal）的簡寫語法：

```js
// 這些物件做一樣的事

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 物件簡寫看起來更讚，對吧？
user = {
*!*
  sayHi() { // 與 "sayHi: function()" 相同
*/!*
    alert("Hello");
  }
};
```

如所示，我們可以省略 `"function"` 而只寫 `sayHi()`。

老實說，這兩種表示法不是完全相同，在物件繼承上（晚點會提）依然有些微妙的差別，但現在它們沒差。大多情況下簡短語法會更受青睞。

## 方法中的 "this"

很常看到某個物件方法需要操作存放它的物件的資訊，用來做些工作。

舉個例，`user.sayHi()` 內的程式碼也許需要 `user` 的 name。

**要存取該物件，方法可以使用 `this` 關鍵字。**

`this` 的值會是 "在句點之前" 的那個物件，也就是用於呼叫方法的那個。

舉個例：

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" 是 "當前的物件"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

在這邊，於 `user.sayHi()` 的執行期間內，`this` 的值將會是 `user`。

技術上來說，不使用 `this` 來存取該物件也是可能的，經由變數來參考它也行：

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // 用 "user" 而非 "this"
*/!*
  }

};
```

...但這種程式碼並不可靠。若我們決定複製 `user` 到另一個變數，如 `admin = user`，並用別的東西覆蓋 `user`，則它將會拿到錯的物件。

如下所示：

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // 會導致錯誤
*/!*
  }

};


let admin = user;
user = null; // 將其覆蓋使情況更明顯

<<<<<<< HEAD
admin.sayHi(); // 哎呀！在 sayHi() 內使用了舊的變數名！錯了！
=======
*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
```

若我們使用 `this.name` 而非 `user.name` 於 `alert` 中，則程式碼就可正常運作。

## "this" 沒被綁定

<<<<<<< HEAD
JavaScript 中，關鍵字 `this` 的行為不像其它大多數程式語言一樣，它可以被用於任何函式內。
=======
In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

底下例子不會有語法錯誤：

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`this` 的值會在執行期間（run-time）被計算，取決於上下文是什麼。

舉個例，這邊的同個函式會被指定給兩個不同物件，且當呼叫時會有著不同的 "this"：

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// 在兩個物件中使用同個函式
user.f = sayHi;
admin.f = sayHi;
*/!*

// 這邊的呼叫會有不同的 this
// 函式內的 "this" 是 "在句點之前" 的那個物件
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin（用句點或方括號存取方法沒差）
```

規則很簡單：若 `obj.f()` 被呼叫，則在呼叫 `f` 的期間 `this` 就是 `obj`。所以它在上例中會是 `user` 或 `admin` 其一。

````smart header="不使用物件呼叫時：`this == undefined`"
我們甚至可以完全不使用物件來呼叫函式：

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

在這個情況底下 `this` 在嚴格模式（strict mode）中是 `undefined`，若我們試著存取 `this.name`，就會產生錯誤。

非嚴格模式（non-strict mode）內，`this` 的值在這個情況會是 *全域物件（global object）*（瀏覽器中是 `window`，我們晚點會在章節 [](info:global-object) 看到）。這個有歷史淵源的行為可使用 `"use strict"` 修正。

通常這種呼叫是程式編寫錯誤，若函式有 `this` 在內，它預期的是在某個物件的上下文（object context）中被呼叫。
````

```smart header="未綁定 `this` 的後果"
若你由別的程式語言而來，那你也許已經習慣了 "已綁定 `this`" 的概念，也就是某物件中定義的方法總是會將 `this` 參考至該物件。

在 JavaScript 中 `this` 是 "自由的"，它的值會在呼叫時間（call-time）才被計算，且不取決於方法在何處被宣告，而是取決於哪個物件 "在句點之前"。

執行期間才計算 `this` 的這個概念有好有壞。某方面來說，函式可以在不同物件上被重複使用，另一方面，更多的彈性也讓產生錯誤的空間更大。

這邊我們的立場不是要判斷語言設計決定是好或壞，我們只要理解它如何運作，且怎麼使用好處並避免問題。
```

<<<<<<< HEAD
## 內部情況：參考類型（Reference Type）

```warn header="深入語言特性"
這個部分涵蓋進階的議題，用以更佳理解特定的邊緣案例。

若你想要更快學習，可以跳過它或晚點再看。
```

某個錯綜複雜的呼叫可能會失去 `this`，例如：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John（簡單的呼叫可以運作）

*!*
// 現在根據名稱來決定要呼叫 user.hi 或 user.bye
(user.name == "John" ? user.hi : user.bye)(); // 錯誤！
*/!*
```

在最後一行有個條件運算子來選擇是 `user.hi` 或 `user.bye` 的哪一個，在這個情況會是 `user.hi`。

然後該方法立刻被括號 `()` 呼叫了，但它不能正常運作！

如你所見，該呼叫導致錯誤，因為呼叫內部 `"this"` 的值變成了 `undefined`。

這樣可以運作（物件句點方法）
```js
user.hi();
```

這樣不行（計算出的方法）
```js
(user.name == "John" ? user.hi : user.bye)(); // 錯誤！
```

為什麼？若我們想要理解為什麼會這樣，來看看 `obj.method()` 檯面下的呼叫是如何運作的。

近點看，我們也許會注意到 `obj.method()` 述語內有兩個操作：

1. 首先，句點 `'.'` 提取屬性 `obj.method`。
2. 然後括號 `()` 執行它。

所以，關於 `this` 的資訊要如何從第一部分被傳遞到第二部分呢？

若我們將這些操作放在不同行，那 `this` 想當然就會丟失：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// 將該方法的取得與呼叫分為兩行
let hi = user.hi;
hi(); // 錯誤，因為 this 是 undefined
*/!*
```

這裡的 `hi = user.hi` 將函式放入變數中，然後最後一行是完全獨立的，所以不會有 `this`。

**要讓 `user.hi()` 呼叫順利，JavaScript 使用了一個技巧 -- 句點 `'.'` 回傳的不是個函式，而是個特殊 [參考類型（Reference Type）](https://tc39.github.io/ecma262/#sec-reference-specification-type) 的值。**

參考類型是個 "規格類型"，我們不能明確使用它，但它被語言內部所使用著。

參考類型的值是三種值的組合 `(base, name, strict)`，其中：

- `base` 是個物件。
- `name` 是屬性名稱。
- `strict` 若 `use strict` 生效時為真。

存取 `user.hi` 屬性的結果並非是個函式，而是個參考型態的值。在嚴格模式中，`user.hi` 是：

```js
// 參考類型值
(user, "hi", true)
```

當括號 `()` 在參考類型上被呼叫後，它們接收到關於該物件與其方法的完整資訊，且可以設定正確的 `this`（在此情境下 `=user`）。

參考類型是個特殊的 "中間" 內部值，用於傳遞從句點 `.` 而來的資訊給呼叫的括號 `()`。

其它像是指定 `hi = user.hi` 等等的操作會捨棄整個參考類型，拿取 `user.hi` 的值（一個函式）並傳遞它，所以任何更進一步的操作就會 "失去" `this`。

所以，作為結果，`this` 的值只有在函式被直接使用句點 `obj.method()` 或方括號 `obj['method']()` 語法呼叫時（它們在此做一樣的事），才會經過正確地途徑傳遞下去。在之後的教程中，我們將會學習多種解決此問題的方式，像是使用 [func.bind()](/bind#solution-2-bind)。

## 箭頭函式沒有 "this"
=======
## Arrow functions have no "this"
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

箭頭函式很特別：它們沒有 "自己的" `this`。若我們從這種函式參考了 `this`，會從更外層的 "正常" 函式中獲取其值。

舉個例，這邊的 `arrow()` 從外部的 `user.sayHi()` 方法使用 `this`：

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

這是個箭頭函式的特別功能，當我們實際上不想要有個分開的 `this`，而是想從外部的上下文中獲取它時，將會很有用。在之後的章節 <info:arrow-functions>，我們會更深入探討箭頭函式。

## 總結

- 儲存在物件屬性中的函式被稱為 "方法"。
- 方法允許物件像是 `object.doSomething()` 這樣 "動作"。
- 方法可以使用 `this` 參考該物件。

`this` 的值在執行期間才被定義。
- 當某個函式被宣告後，它也許會使用 `this`，但該 `this` 直到函式被呼叫前都沒有值。
- 函式可以在物件之間被複製。
- 當函式在 "方法" 的語法被呼叫時：`object.method()`，`this` 的值在該呼叫的期間就是 `object`。

請注意箭頭函式叫特殊：它們沒有 `this`。當 `this` 在箭頭函式內被取用時，它的值會由外部而來。

