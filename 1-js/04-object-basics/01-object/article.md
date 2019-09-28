# 物件（Objects）

如我們從 <info:types> 所知，JavaScript 內有七種資料類型。其中六種被稱為 "原生（primitive）"，因為它們的值只包含了單一種東西（是個字串或數值或什麼的）。

相對的，物件被用來儲存使用鍵配對的多種資料群集與更為複雜的實體。在 JavaScript，物件幾乎滲入該語言的各個方面，所以我們必須在更深入其它主題前先理解物件。

物件可以經由花括號 `{…}` 與一些可選的 *屬性（properties）* 來建立。一個屬性也是一組 "鍵（key）：值（value）" 配對，其中 `key` 是一串字串（也被稱為 "屬性名稱（property name）"），而 `value` 可以是任何東西。

我們可以把物件想成一個存放簽名檔案的櫃子，每段資料經由鍵存放於對應的檔案中，要透過檔案的名稱尋找檔案或 增加/移除 檔案都很容易。

![](object.svg)

一個空物件（"空櫃子"）可以使用兩種語法的其中一種來建立：

```js
let user = new Object(); // "物件建構子（object constructor）" 語法
let user = {};  // "物件字面值（object literal）" 語法
```

![](object-user-empty.svg)

通常會使用花括號 `{...}`，這種宣告被稱為 *物件字面值（object literal）*。

## 文字與屬性

我們可以以 "鍵：值" 的方式立刻放入某些屬性到 `{...}` 內：

```js
let user = {     // 一個物件
  name: "John",  // 經由 "name" 鍵，存放值 "John"
  age: 30        // 經由 "age" ，存放值 30
};
```

屬性有一個鍵（也被稱為 "名稱（name）" 或 "識別符（identifier）"）於分號 `":"` 之前，並在其右側有著它的值。

在 `user` 物件中，有兩個屬性：

1. 第一個屬性有著名稱 `"name"` 與值 `"John"`。
2. 第二個有著名稱 `"age"` 與值 `30`。

產生的 `user` 物件可以被想成一個櫃子有著兩份被標為 "name" 與 "age" 的簽名檔案。

![user object](object-user.svg)

我們可以在任意時間增加、移除或讀取檔案。

屬性值可以使用點號（dot notation）來存取：

```js
// 獲得物件的屬性值：
alert( user.name ); // John
alert( user.age ); // 30
```

值可以是任意類型，來加一個布林看看：

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

要移除一個屬性，我們可以用 `delete` 運算子：

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

我們也可以用多重詞彙作為屬性名稱，但它們必須置於引號內：

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // 多重詞彙屬性名稱必須置於引號內
};
```

![](object-user-props.svg)


列表中的最後一個屬性可以用逗號結尾：

```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```

這被稱為 "尾部逗號（trailing comma）" 或 "懸掛逗號（hanging comma）"，可以使得 增加/移除/移動 屬性更為簡單，因為每一行都很相似。

## 方括號

對於多重詞彙屬性，無法使用句點來存取：

```js run
// 這樣會語法錯誤
user.likes birds = true
```

這是因為句點需要鍵是個有效的變數識別符，也就是：沒有空格和其它某些限制。

作為替代，"方括號" 可用在任意字串上：

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

至此所有東西都沒問題了，請注意括號內的字串要置於引號內（哪種引號都可以）。

方括號也提供能以表達式的結果來獲取屬性名稱的方法 -- 相對於文字字串 -- 像是下面這樣由變數獲取：

```js
let key = "likes birds";

// 和 user["likes birds"] = true; 相同
user[key] = true;
```

在這裡，變數 `key` 可於執行期間被計算出來，或者經由使用者輸入得知。然後我們再使用它來存取屬性，這給了我們很大的彈性。

舉個例：

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// 經由變數存取
alert( user[key] ); // John （若輸入 "name"）
```

點號則不能用類似的方式：

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### 計算屬性（Computed properties）

我們可以在物件字面值使用方括號，這被稱為 *計算屬性（computed properties）*。

舉個例：

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // 屬性的名稱由變數 fruit 而來
*/!*
};

alert( bag.apple ); // 5，若 fruit="apple"
```

計算屬性的含義很簡單：`[fruit]` 代表著屬性名稱是由 `fruit` 而來。

所以，若訪問者輸入 `"apple"`，則 `bag` 就會變成 `{apple: 5}`。

實際上，這麼做也一樣：

```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// 屬性名稱由 fruit 變數而來
bag[fruit] = 5;
```

...但看起來更讚。

我們可以在方括號內使用較為複雜的表達式：

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

方括號比點號更為強大，它允許任意屬性名稱和變數，但寫起來也較累贅。

所以大多時候，當屬性名稱已知且單純時，用句點就好，而若我們需要某些較複雜的東西時，再轉用方括號即可。

````smart header="保留字可被允許用於屬性名稱"
變數不能使用語言保留字作為名稱，像是 "for"、"let"、"return" 等等。

但對於物件屬性而言，沒有這樣的限制，所有名稱都可以：

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

基本上，任何名稱都是允許的，但只有一個特例：`__proto__`，這是因為歷史因素而被特別對待。舉個例，我們不能將它設為非物件的值：

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object]，與預期的不同
```

如同我們由程式碼看到的，對其指定原生值 `5` 被忽略了。

若我們試圖在物件儲存任意鍵值配對，並允許訪問者指定其鍵，將會變成錯誤甚至漏洞的來源。

在這個例子中，訪問者想選擇 `__proto__` 作為鍵，但指定的邏輯就會失效（如上所顯示）。

有個辦法可以使物件視 `__proto__` 為一般的屬性，這我們晚點會提到，但首先我們需要知道更多關於物件的內容。

也存在另一種資料結構 [Map](info:map-set)，我們將於章節 <info:map-set> 中學到，能夠支援任意的鍵。
````

## 屬性值簡寫

在真正寫程式時我們常使用現存的變數作為屬性名稱的值。

舉個例：

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...其它屬性
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

上面的例子中，屬性和變數有著一樣的名稱。這種從變數建立屬性的使用情境非常常見，因此有個特別的 *屬性值簡寫* 讓它更簡短。

我們可以只用 `name` 而非 `name:name`，像這樣：

```js
function makeUser(name, age) {
*!*
  return {
    name, // 和 name: name 相同
    age   // 和 age: age 相同
    // ...
  };
*/!*
}
```

我們可以在同一個物件內同時使用常規屬性和簡寫：

```js
let user = {
  name,  // 和 name:name 相同
  age: 30
};
```

## 存在性確認

有個值得注意的物件功能是我們可以存取任意屬性，就算屬性不存在也不會有任何錯誤！存取一個不存在的屬性只會回傳 `undefined`，這提供了一個非常常見的方式來檢測屬性是否存在 -- 取得它並跟 undefined 做比較：

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true 代表 "沒有這個屬性"
```

同樣還有一個特殊的運算子 `"in"` 用來確認屬性是否存在。

語法是：

```js
"key" in object
```

舉個例：

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true，user.age 存在
alert( "blabla" in user ); // false，user.blabla 不存在
```

請注意 `in` 的左側必須要是個 *屬性名稱*，通常是個置於引號內的字串。

若我們忽略引號，代表將使用某個變數包含的實際名稱來測試。舉個例：

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true，名稱由 key 而來，並檢查該屬性
```

````smart header="對儲存 `undefined` 的屬性使用 \"in\""
通常，使用嚴格比較 `"=== undefined"` 來確認屬性是否存在是沒問題的，然而有個特殊情況這麼做會失敗，但 `"in"` 能正確運作。

就是當物件屬性存在，卻儲存著 `undefined` 時：

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // 這是 undefined，所以屬性不存在？

alert( "test" in obj ); // true，該屬性存在！
```

在上面的程式碼中，屬性 `obj.test` 技術上來說是存在的，所以 `in` 運算子運作正確。

類似的情況非常少發生，因為 `undefined` 通常不會被指定，我們對於 "未知" 或 "空白" 的值大多會使用 `null`，所以 `in` 運算子可以算是程式碼的過客。
````

## "for..in" 迴圈

要走遍物件的所有鍵，有個特殊的迴圈型式可用： `for..in`。這是完全不同於我們曾經讀過的 `for(;;)` 的構造。

語法：

```js
for (key in object) {
  // 對每個物件中的 key 屬性執行程式碼本體
}
```

舉個例，來輸出 `user` 的所有屬性：

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

要注意所有 "for" 構造皆允許我們在迴圈內部宣告迴圈變數，像是這裡的 `let key`。

同樣地，我們這裡可以使用另一個變數名稱而不用 `key`。例如，`"for (let prop in obj)"` 也很廣泛地使用。

### Ordered like an object

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.

As an example, let's consider an object with the phone codes:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
The "integer property" term here means a string that can be converted to-and-from an integer without a change.

So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
````

...On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Now it works as intended.

## Copying by reference

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**

If we imagine an object as a cabinet, then a variable is a key to it. Copying a variable duplicates the key, but not the cabinet itself.

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the cabinet and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use the other key (`user`) we would see changes.

### Comparison by reference

The equality `==` and strict equality `===` operators for objects work exactly the same.

**Two objects are equal only if they are the same object.**

For instance, if two variables reference the same object, they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though both are empty:

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are necessary very rarely and usually are a result of a coding mistake.

### Const object

An object declared as `const` *can* be changed.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

It might seem that the line `(*)` would cause an error, but no, there's totally no problem. That's because `const` fixes only value of `user` itself. And here `user` stores the reference to the same object all the time. The line `(*)` goes *inside* the object, it doesn't reassign `user`.

The `const` would give an error if we try to set `user` to something else, for instance:

```js run
const user = {
  name: "John"
};

*!*
// Error (can't reassign user)
*/!*
user = {
  name: "Pete"
};
```

...But what if we want to make constant object properties? So that `user.age = 25` would give an error. That's possible too. We'll cover it in the chapter <info:property-descriptors>.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. Actually, that's rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Arguments `dest`, and `src1, ..., srcN` (can be as many as needed) are objects.
- It copies the properties of all objects `src1, ..., srcN` into `dest`. In other words, properties of all arguments starting from the 2nd are copied into the 1st. Then it returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the receiving object (`user`) already has the same named property, it will be overwritten:

```js
let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

We also can use `Object.assign` to replace the loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it. Actually, the same as the loop, but shorter.

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use the cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object. All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` or  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
