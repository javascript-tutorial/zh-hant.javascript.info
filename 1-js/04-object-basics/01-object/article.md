# 物件（Objects）

如我們從 <info:types> 所知，JavaScript 內有八種資料類型。其中七種被稱為 "原生類型（primitive）"，因為它們的值只包含了單一種東西（是個字串或數值或什麼的）。

<<<<<<< HEAD
相對的，物件被用來儲存使用鍵配對的多種資料群集與更為複雜的實體。在 JavaScript，物件幾乎滲入該語言的各個方面，所以我們必須在更深入其它主題前先理解物件。
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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

<<<<<<< HEAD
這被稱為 "尾部逗號（trailing comma）" 或 "懸掛逗號（hanging comma）"，可以使得 增加/移除/移動 屬性更為簡單，因為每一行都很相似。
=======
````smart header="Object with const can be changed"
Please note: an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````

## Square brackets
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## 方括號

對於多重詞彙屬性，無法使用句點來存取：

```js run
// 這樣會語法錯誤
user.likes birds = true
```

<<<<<<< HEAD
JavaScript 無法理解這樣的語法。它會解析到 `user.likes`，接者遇到預期外的 `birds` 時，給予語法錯誤。

這是因為句點需要鍵是個有效的變數識別符，也就是：沒有空格、不是由數值為開頭，以及不包含特殊字元（`$` 和 `_` 可被允許）。
=======
JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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

<<<<<<< HEAD
我們可以在物件字面值使用方括號，這被稱為 *計算屬性（computed properties）*。
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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

<<<<<<< HEAD
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
=======
Square brackets are much more powerful than the dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

## Property value shorthand
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

舉個例：

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
<<<<<<< HEAD
    // ...其它屬性
=======
    // ...other properties
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
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
<<<<<<< HEAD
    name, // 和 name: name 相同
    age,  // 和 age: age 相同
=======
    name, // same as name: name
    age,  // same as age: age
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
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
>>>
```

<<<<<<< HEAD
## 屬性值命名限制

屬性值的名稱（keys）必須是字串或是符號（一種特殊類型的識別符，之後會介紹）。

其他類型會被自動轉換為字串。

舉例來說，一個數字 `0` 當用來當作屬性值的 key 時會變成字串 `"0"`：

```js run
let obj = {
  0: "test" // 等同於 "0": "test"
};

// 兩個 alerts 都接受一樣的屬性值（數字 0 被轉換為字串 "0"）
alert( obj["0"] ); // test
alert( obj[0] ); // test (同個屬性值)
```

**保留字元允許被作為屬性值名稱**

就如同我們已知的，一個變數的名稱不能與語言的保留字元相同，像是 "for"、"let"、"return" 等等。

但對於物件的屬性值，就沒有這樣的限制。任何的名稱都可以：

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

我們可以用任何字串當作鍵值，但有個特殊的屬性值 `__proto__` 由於歷史因素，擁有不同的待遇。

舉例來說，我們沒辦法將一個非物件的值賦值給它：

```js run
let obj = {};
obj.__proto__ = 5; // 將數字 5 賦值給它
alert(obj.__proto__); // [object Object] - 該值是一個物件, 不如預期運作
```

如同我們從程式碼看到的，原生值 `5` 的賦值動作被忽略了。

關於 `__proto__` 的一切會在後續章節仔細揭露 [](info:prototype-inheritance)。

至於現在，重要的是得知道 `__proto__` 這樣的行爲會導致一連串 bug
，如果我們想要將 user-provided 的鍵值放入物件，更可能導致安全性問題。

問題在於，訪問者可能會選擇 `__proto__` 作為鍵值，而其賦值的邏輯會被搞壞（像上面的程式所呈現的）。

有兩個 workarounds 可以用來解決這問題：
1. 修改物件對待 `__proto__` 的方式，將其改為一般的屬性值。我們會在章節 [](info:prototype-methods) 中學到怎麼做。
2. 使用支援隨意鍵值的 [Map](info:map-set) 資料結構，我們會在章節 <info:map-set> 中學到。

## 存在性確認，"in" 運作子

有個值得注意的物件功能是我們可以存取任意屬性，就算屬性不存在也不會有任何錯誤！存取一個不存在的屬性只會回傳 `undefined`，這提供了一個非常常見的方式來檢測屬性是否存在 -- 取得它並跟 undefined 做比較：
=======

## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true 代表 "沒有這個屬性"
```

<<<<<<< HEAD
同樣還有一個特殊的運算子 `"in"` 用來確認屬性是否存在。

語法是：
=======
There's also a special operator `"in"` for that.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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

<<<<<<< HEAD
若我們忽略引號，代表將使用某個變數包含的實際名稱來測試。舉個例：
=======
If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = { age: 30 };

let key = "age";
<<<<<<< HEAD
alert( *!*key*/!* in user ); // true，名稱由 key 而來，並檢查該屬性
```

````smart header="對儲存 `undefined` 的屬性使用 \"in\""
通常，使用嚴格比較 `"=== undefined"` 來確認屬性是否存在是沒問題的，然而有個特殊情況這麼做會失敗，但 `"in"` 能正確運作。
=======
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

就是當物件屬性存在，卻儲存著 `undefined` 時：

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // 這是 undefined，所以屬性不存在？

alert( "test" in obj ); // true，該屬性存在！
```

<<<<<<< HEAD
在上面的程式碼中，屬性 `obj.test` 技術上來說是存在的，所以 `in` 運算子運作正確。

類似的情況非常少發生，因為 `undefined` 通常不會被指定，我們對於 "未知" 或 "空白" 的值大多會使用 `null`，所以 `in` 運算子可以算是程式碼的過客。
````
=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.

>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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

<<<<<<< HEAD
同樣地，我們這裡可以使用另一個變數名稱而不用 `key`。例如，`"for (let prop in obj)"` 也很廣泛地使用。

### 像物件一樣排序
=======
### Ordered like an object
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

物件是否有序？換句話說，若我們巡迴物件，是否所有屬性都能同樣以當初加入的順序取得呢？我們能依賴這性質嗎？

簡短的答案是："特異的順序"：整數屬性為排序過的，其它則按照加入時的順序，細節在底下。

讓我們來考慮某個含有電話國碼的物件作為例子：

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

此物件被用來建議一個選項清單給使用者，假若我們正在建立以德國用戶為主的網站，那我們也許想要 `49` 為清單第一個選項。

但若我們執行程式，我們會看到完全不同的情景：

- USA (1) 最先出現。
- 然後是 Switzerland (41) 和其它等等。

因為電話國碼是整數，它們將會以升序出現。所以我們看到 `1, 41, 44, 49`。

````smart header="整數屬性？那是什麼？"
這邊的 "整數屬性" 詞彙代表著某種字串，可以在不被變更的情況下轉換為整數。

所以，"49" 是整數屬性名稱，因為當它被轉成整數值再轉回來時，依然保持一樣。但 "+49" 和 "1.2" 就不行：

```js run
// Math.trunc 是用來移除小數點部份的內建函式
alert( String(Math.trunc(Number("49"))) ); // "49"，一樣，是整數屬性
alert( String(Math.trunc(Number("+49"))) ); // "49"，跟 "+49" 不一樣 ⇒  非整數屬性
alert( String(Math.trunc(Number("1.2"))) ); // "1"，跟 "1.2" 不一樣 ⇒ 非整數屬性
```
````

...另一方面，若鍵並非整數，則它們會以加入時的順序被列出，舉個例：

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // 多加一個

*!*
// 非整數屬性為以加入時的順序被列出
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

所以，要修正電話國碼的問題，我們可以經由讓國碼變為非整數來 "作弊"，在每個國碼之前加上一個正號 `"+"` 即可。

像這樣：

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

現在它們會如預期般的運作了。

<<<<<<< HEAD
## 依照參考複製（Copying by reference）

物件與原生類型之間有個本質上的差異，就是物件是 "依照參考（by reference）" 被儲存和複製。

原生值如：字串、數值、布林 -- 都是 "以完整的值" 被 指定/複製 的。

舉個例：

```js
let message = "Hello!";
let phrase = message;
```

結果是我們得到兩個完全獨立的變數，每個都存著字串 `"Hello!"`。

![](variable-copy-value.svg)

物件與這不同。

**變數儲存的不只物件本身，還有它的 "記憶體位址（address in memory）"，換句話說就是對於它的 "參考（reference）"**

這是關於物件的圖：

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

這在裡，物件被儲存在記憶體某處，且變數 `user` 擁有一個對於它的 "參考"。

**當物件的變數被複製時 -- 只有參考被複製了，但物件並沒有被複製。**

若我們想像物件為一個櫃子，則變數就是它的鑰匙。複製變數時重鑄了另一把鑰匙，但並不是櫃子本身。

舉個例：

```js no-beautify
let user = { name: "John" };

let admin = user; // 複製參考
```

現在我們有兩個變數，每個都參考至同樣的物件：

![](variable-copy-reference.svg)

我們可以使用任意變數來存取櫃子並修改其內容：

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // 經由 "admin" 參考來更改
*/!*

alert(*!*user.name*/!*); // 'Pete'，從 "user" 的參考可以看到變動
```

上面的例子演示了此處只有一個物件存在。像是我們有一個櫃子與兩把鑰匙，在使用其中一把 (`admin`) 來存取後，我們晚點用另一把 (`user`) 時就可以看到變化。

### 依照參考比較（Comparison by reference）

相等 `==` 和嚴格相等 `===` 運算子對物件來說運作起來都一樣。

**兩個物件只有在它們是同一個物件時才會相等。**

舉個例，若兩個變數參考至同一個物件，它們會是相等的：

```js run
let a = {};
let b = a; // 複製參考

alert( a == b ); // true，兩個變數參考至同一個物件
alert( a === b ); // true
```

而這邊兩個獨立的物件就不相等，就算兩者皆為空也是：

```js run
let a = {};
let b = {}; // 兩個獨立物件

alert( a == b ); // false
```

對於像是 `obj1 > obj2` 的比較或是與原生類型的比較 `obj == 5`，物件會被轉換為原生類型，我們很快會學習到物件轉換是如何運作的。但老實說，這種比較極少會需要，且通常是程式寫錯的結果。

### 常數物件

物件被宣告為 `const` *可以* 被改變。

舉個例：

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

看起來 `(*)` 這行會導致錯誤，但沒有，那完全不會有問題。這是因為 `const` 只固定了 `user` 本身的值，而這邊 `user` 始終都儲存了同一份物件的參考。`(*)` 行 *進入* 物件，它沒有重新指定 `user`。

若我們試著設定`user` 給其它東西時，`const` 將會產生錯誤，舉個例：

```js run
const user = {
  name: "John"
};

*!*
// 錯誤（不能重新指定 user）
*/!*
user = {
  name: "Pete"
};
```

...但若我們想建立常數物件屬性怎麼辦？怎麼做才可以讓 `user.age = 25` 產生錯誤。這也是有可能的，我們將會在章節 <info:property-descriptors> 中提到怎麼做。

## 複製與合併，Object.assign

所以，複製某物件變數會多建立一個對相同物件的參考。

但若我們需要複製整個物件呢？怎麼建立獨立的複本，克隆體？

這也是可行的，但稍微有點難度，因為 JavaScript 中沒有內建方法來做到這件事。事實上，很少需要這樣做，依照參考複製在大多時候就很好用了。

但若我們真的需要這麼做，那我們需要建立一個新的物件，並經由迭代現存物件的屬性並在原生類型層面上進行複製，才能複製其整體結構，

像這樣：

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // 新的空物件

// 來對其複製整個 user 的屬性吧
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// 現在 clone 是個完整的獨立克隆體了
clone.name = "Pete"; // 改變它的資料

alert( user.name ); // 原本的物件內依然是 John
```

我們也可以使用 [Object.assign](mdn:js/Object/assign) 方法來處理。

語法是：

```js
Object.assign(dest, [src1, src2, src3...])
```

- 引數 `dest`，和 `src1, ..., srcN`（需要幾個都可以）皆為物件。
- 它會複製所有 `src1, ..., srcN` 物件的屬性到 `dest` 中。換句話說，從第二個位置開始的所有引數的屬性將會被複製到第一個引數內，然後回傳 `dest`。

舉個例，我們可以使用它來合併多個物件成一個：

```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// 從 permissions1 和 permissions2 複製所有屬性到 user 中
Object.assign(user, permissions1, permissions2);
*/!*

// 現在 user = { name: "John", canView: true, canEdit: true }
```

若接收的物件（`user`）已經有同樣名稱的屬性，則將會被覆蓋：

```js
let user = { name: "John" };

// 覆蓋 name，加入 isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// 現在 user = { name: "Pete", isAdmin: true }
```

我們也可以使用 `Object.assign` 來替換簡易複製之中的迴圈：

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

它複製 `user` 內的所有屬性到空物件中並回傳，事實上與迴圈相同，但更簡短。

至此我們只假設 `user` 的所有屬性皆為原生類型，但屬性也可以是其它物件的參考，這樣要怎麼做呢？

像這樣：

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

現在要複製 `clone.sizes = user.sizes` 就有所不足了，因為 `user.sizes` 是一個物件，它將會依照參考來複製，因此 `clone` 和 `user` 將會共享同一個 sizes：

像這樣：

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true，同一個物件

// user 和 clone 共享 sizes
user.sizes.width++;       // 從某邊改變某個屬性
alert(clone.sizes.width); // 51，將會從另一邊看到結果
```

要修正的話，我們應該使用複製迴圈來檢查每個 `user[key]` 的值，且若是個物件，則將它的架構也一起複製下來，這被稱為 "深層複製（deep cloning）"。

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

## 總結

物件具有些特殊特性的關聯矩陣。
=======
## Summary
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

它們儲存屬性（鍵值配對），其中：
- 屬性鍵必須為字串或符號（symbols）（通常為字串）。
- 值可以為任意類型。

要存取屬性，我們可以使用：
- 點號：`obj.property`。
- 方括號 `obj["property"]`。方括號允許鍵由某個變數而來，像是 `obj[varWithKey]`。

額外操作：
- 要刪除屬性：`delete obj.prop`。
- 要確認某個鍵的屬性是否存在：`"key" in obj`。
- 要迭代整個物件：`for (let key in obj)` 迴圈。

物件經由參考被被指定與複製，換句話說，變數儲存的並非 "物件值"，而是值的 "參考"（記憶體位址）。所以複製該變數或將它作為函式引數傳遞都只會複製參考，而非物件。所有經由複製的參考所做的操作（像是 新增/移除 屬性），都會在同一個物件上進行。

<<<<<<< HEAD
要建立一份 "真正的複本"（克隆體），我們可以使用 `Object.assign` 或 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)。

我們這章所學到的都被稱為 "普通物件（plain object）" 或就叫 `物件（Object）`。

JavaScript 中還有更多其它種類的物件：
=======
What we've studied in this chapter is called a "plain object", or just `Object`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

- `Array` 用來儲存有序的資料群集，
- `Date` 用來儲存日期與時間的資訊，
- `Error` 用來儲存關於錯誤的資訊。
- ...等等。

它們有著自身的特殊特性，我們晚點會讀到。有時候人們說了像是 "矩陣類型" 或 "日期類型"，但正式上這些都沒有自己的類型，而是屬於一個 "物件" 資料類型，且以多種方式對其延伸。

JavaScript 中的物件非常強大，在這裡我們只粗略描述其超巨大主題的外貌。我們將會在教程接下來的部分內，密切使用物件並學習更多關於它們的知識。

