# 建構子，"new" 運算子

普通的 `{...}` 語法可以建立一個物件，但通常我們需要建立許多類似的物件，像是多個使用者或選單物品等等。

這可以使用建構子函式和 `"new"` 運算子來完成。

## 建構子函式

建構子函式技術上是一般的函式，不過有兩個慣例：

1. 使用首個字母大寫來命名。
2. 應該只使用 `"new"` 運算子來執行。

舉個例：

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

當函式使用 `new` 被執行時，它會依照以下步驟：

1. 新的空物件被建立並指定到 `this`。
2. 函式本體被執行，通常它修改了 `this`，對它加上新的屬性。
3. `this` 的值被回傳。

換句話說，`new User(...)` 做了像這樣的事情：

```js
function User(name) {
*!*
  // this = {}; （隱性地）
*/!*

  // 加入屬性到 this 中
  this.name = name;
  this.isAdmin = false;

*!*
  // return this; （隱性地）
*/!*
}
```

所以 `let user = new User("Jack")` 給了同樣的結果：

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

現在若我們想要建立其它 users，可以呼叫 `new User("Ann")`、`new User("Alice")` 等等，會比每次都用字面值還要簡短，且更為易讀。

這也是建構子主要的用途 -- 實作可重複使用的建立物件程式碼。

<<<<<<< HEAD
再注意一下 -- 技術上，任何函式都可以作為建構子被使用。也就是：任何函式都可以使用 `new` 來運行，且它會執行上述的演算法。而 "首個字母大寫" 是個共識，來更清楚地表示該函式要使用 `new` 來運行。

````smart header="new function() { ... }"
若我們有許多行關於建立單一個複雜物件的程式碼，我們可以包裝它們在建構子函式內，像這樣：
=======
Let's note once again -- technically, any function (except arrow functions, as they don't have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The "capital letter first" is a common agreement, to make it clear that a function is to be run with `new`.

````smart header="new function() { ... }"
If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js
// create a function and immediately call it with new
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...其它建立 user 的程式碼
  // 也許有複雜的邏輯跟述語
  // 或是區域變數等
};
```

<<<<<<< HEAD
該建構子不能被再次呼叫，因為它還沒存在任何地方，就只是被建立並呼叫了而已。所以這個技巧主要用於封裝程式碼以建構單一物件，未來不會重複使用。
=======
This constructor can't be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
````

## 建構子模式測試：new.target

```smart header="進階議題"
這個部分的語法很少被使用，除非你想知道所有東西，不然可以省略這部分。
```

在函式中，我們可以使用一個特殊的 `new.target` 屬性，來確認它是否經由 `new` 被呼叫。

<<<<<<< HEAD
對於常規呼叫而言它會是空的，而若使用 `new` 呼叫則會相等於該函式：
=======
It is undefined for regular calls and equals the function if called with `new`:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
function User() {
  alert(new.target);
}

// 沒使用 "new"：
*!*
User(); // undefined
*/!*

// 使用 "new":
*!*
new User(); // function User { ... }
*/!*
```

這可以在函式內部使用，來知道是透過 `new`（"在建構子模式"）呼叫的，還是沒有（"在常規模式"）。

我們也可以讓 `new` 與常規呼叫做一樣的事，像這樣：

```js run
function User(name) {
  if (!new.target) { // 若不是透過 new 執行
    return new User(name); // ...那就來用 new 吧
  }

  this.name = name;
}

let john = User("John"); // 重新導向呼叫 new User
alert(john.name); // John
```

這個做法有時會在函式庫中被使用，來使得語法更為彈性，所以人們不論是否透過 `new` 來呼叫函式都可以運作。

到處這麼做也許不是件好事，因為省略 `new` 會使得發生了什麼事變得更不明顯一些，用了 `new` 可以讓我們知道有新物件被建立了。

## 由建構子回傳

通常，建構子不會有 `return` 述語。它們的任務是將所有需要的東西寫入 `this`，並自動變成結果。

但若有 `return` 述語，規則就很簡單了：

- 若 `return` 的是物件，則該物件會被回傳而非 `this`。
- 若 `return` 的是原生類型，就會被忽略。

換句話說，`return` 的若是物件，則回傳它，其它情況下回傳的是 `this`。

舉個例，這邊的 `return` 回傳一個物件覆蓋了 `this`：

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- 回傳這個物件
}

alert( new BigUser().name );  // Godzilla，得到那個物件
```

這邊有個 `return` 空白的例子（或者我們可以放個原生類型在後面，也沒差）：

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- 回傳 this
}

alert( new SmallUser().name );  // John
```

通常建構子不會有 `return` 述語，這邊我們提到回傳物件的這個特殊行為主要是為了完整性而言。

````smart header="省略括號"
順帶一提，若沒有引數的話，我們可以在 `new` 之後省略括號：

```js
let user = new User; // <-- 沒有括號
// 跟這一樣
let user = new User();
```

這樣省略括號不被認為是一種 "良好風格"，但規格准許這種語法。
````

## 建構子中的方法

使用建構子函式來建立物件可以給予很多的彈性，建構子函式可帶參數來定義如何建構物件，且要放些什麼在裡面。

當然，我們不只可以將屬性加到 `this`，也可以加入方法。

舉個例，底下的 `new User(name)` 用給予的 `name` 和 `sayHi` 方法來建立一個物件：

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

要建立複雜的物件，有個更進階的語法，[類別（classes）](info:classes)，我們晚點會提到。

## 總結

- 建構子函式，或簡稱建構子，是常規函式，但有個共識是使用首個字母大寫來命名。
- 建構子函式只應該被 `new` 所呼叫，這種呼叫意味著一開始建立一個空的 `this`，並在最後回傳填好資料的物件。

我們可以使用建構子函式來產生多個相似的物件。

JavaScript 對於許多語言內建的物件都有提供建構子函式：像是 `Date` 之於日期、`Set` 之於集合和其它我們預計會學習到的東西。

```smart header="物件，我們會再回來！"
這章我們只介紹關於物件與建構子的基礎。它們對於接下來的章節要學習的，更多關於資料類型與函式等內容來說很重要。

在我們學完那些東西，我們會回到物件並在章節 <info:prototypes> 和 <info:classes> 更深入地介紹它們。
```

