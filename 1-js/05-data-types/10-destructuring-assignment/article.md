# 解構賦值（Destructuring assignment）

在 JavaScript，兩個最常用到的資料結構是 `Object` 和 `Array`。

物件允許我們建立一個單一實體藉由鍵值去存放資料項目，而陣列允許我們匯集資料項目到有次序的群集中。

但當我們將它們傳遞給函式時，它可能並不需要整個物件/陣列，而是特定部份。

**解構賦值** 是一種允許我們 "拆開" 陣列或物件變成一些變數的特殊語法，有時這很方便。對於具有許多參數，默認值等的複雜函數，解構也非常有效。

## 陣列解構

陣列如何解構為變數的範例：

```js
// 我們有一個包含名稱和姓氏的陣列
let arr = ["Ilya", "Kantor"]

*!*
// 解構賦值
// 設 firstName = arr[0]
// 且 surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

現在我們可以使用變數來替換陣列成員了。

與 `split` 或其他會傳回陣列的方法結合使用時看起來很棒：

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"解構\" 不是指 \"拆解\"。"
之所以叫 "解構賦值", 是因為從複製的項目 "拆解結構" 成變數。但陣列本身並沒有被改動。

這只是一種較短的撰寫方式：
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="使用逗號忽略元素"
陣列中不需要的元素也可以通過額外的逗號捨棄：

```js run
*!*
// 第二個元素不需要
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

在上面的程式碼中，陣列的第二個元素被跳過了，而第三個元素則賦值給 `title`，其餘的陣列項目也被跳過（因為沒有他們的變數）。
````

````smart header="可用於任何在右側的可迭代物件"

...事實上，我們可以使用在任何可迭代物件，不只是陣列：

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="賦值給在左側的任何東西"

我們可以使用任何 "可賦值" 的東西在左側。

例如，物件屬性：
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header="與 .entries() 進行遍歷"

在前面的章節我們看到了 [Object.entries(obj)](mdn:js/Object/entries) 方法。

我們可以在物件中，鍵與值的遍歷過程中解構：

```js run
let user = {
  name: "John",
  age: 30
};

// 遍歷鍵和值
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

...map 也一樣：

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````
### 其餘部份 '...'

如果我們不只取得第一個值，還想匯集所有後續的值 -- 我們可以使用三個點 `"..."` 再增加一個取得 "其餘的" 參數：

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// 注意 `rest` 的類型是陣列。
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest` 的值是剩下的陣列元素組成的陣列。我們可以使用任何其他的變數名稱取代 `rest`，只要確定其有三個點在前面而且是解構賦值的最後一個。

### 預設值

如果陣列中的值少於賦值中的變數，則不會有錯誤。缺少的值會被認為是未定義的：

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

如果我們想要 "預設" 值取代缺少的部份，我們可以使用 `=` 提供：

```js run
*!*
// 預設值
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (來自陣列)
alert(surname); // Anonymous (預設使用)
```

預設值可以是更複雜的表達式，甚至可以是函式呼叫。它們只在沒提供值的時候才求值。

例如，這裡我們對兩個預設值使用 `prompt` 函式。但其將只會執行遺失的那一個：

```js run
// 只對 surname 執行 prompt
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (來自陣列)
alert(surname); // 任何從 prompt 拿到的
```



## 物件解構

解構賦值也適用於物件。

基本語法是：

```js
let {var1, var2} = {var1:…, var2:…}
```

我們有一個既存的物件在右側，我們想從其中分割變數。左側包含一個對應屬性的 "樣式"。在單純的情況下，`{...}` 中是變數的列表。

例如：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

`options.title`、`options.width` 和 `options.height` 被賦值到對應的變數上。順序不重要，這樣也可以：

```js
// 在 let {...} 中變更順序
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

左側的樣式可能更複雜，映射特定屬性和變數。

如果我們想為一個其他名稱的變數賦值一屬性，例如，`options.width` 賦值到名為 `w` 的變數中，則我們可以使用冒號來設定：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

冒號顯示 "啥 : 在這"。在上面的範例中，`w` 是屬性 `width`，`h` 是屬性 `height`，然後 `title` 則是設成了相同名稱。

對於可能缺少的屬性，我們可以使用 `"="` 設定預設值，像這樣：

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

就像是陣列或函式參數，預設值可以是任何表達式，甚至是函數呼叫。它們只在沒提供值的時候才求值。

在下面的程式碼中， `prompt` 要求 `width`，還不是 `title`：

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // （任何從 prompt 的結果）
```

我們也可以結合冒號和等號：

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

如果我們有個多屬性的複雜物件，我們可以只提取我們需要的：

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// 只提取變數 title
let { title } = options;

alert(title); // Menu
```

### 其餘部份的樣式 "..."

如果物件屬性多過我們有的變數的話？我們可以取一些，然後把 "其餘部份" 賦值到某個地方嗎？

我們可以使用其餘部份的樣式，就像我們使用陣列一樣。可以在現代瀏覽器使用，但一些較舊的瀏覽器不支援（IE，可用 Babel 去 polyfill）。

它看起來像這樣：

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = 叫做 title 的屬性
// rest = 物件其餘的屬性
let {title, ...rest} = options;
*/!*

// 現在 title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="抓到，如果沒有 `let`"
在上面的範例中，變數的宣告在右邊賦值：`let {…} = {…}`。當然，我們也可以使用現有的變數，而不用 `let`。但是有個陷阱。

這不會動：
```js run
let title, width, height;

// 在這行出錯
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

問題在於 JavaScript 對於 `{...}` 在主要程式碼的流程中（而不是在另外的表達式內部）視為程式碼區塊。這樣的程式碼區塊可用於把描述群組起來，像這樣：

```js run
{
  // 一個程式碼區塊
  let message = "Hello";
  // ...
  alert( message );
}
```

因此 JavaScript 在這裡認為我們有的是一個程式碼區塊，這就是為什麼出錯的原因。我們需要改成解構。

為了告訴 JavaScript 這不是程式碼區塊，我們可以將表達式包在括號 `(...)` 中：

```js run
let title, width, height;

// 現在可以了
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## 巢狀解構

如果一個物件或陣列包含其他巢狀的物件或陣列的話，我們可以用更多複雜的左側樣式去取更深的部份。

在下面的 `options` 程式碼中，`size` 屬性有另一個物件，`items` 屬性則有一個陣列。從相同結構的左側賦值樣式來取值：

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true   
};

// 解構賦值清晰的分割在多行
let {
  size: { // 放 size 在這
    width,
    height
  },
  items: [item1, item2], // 賦值 items 在這
  title = "Menu" // 沒有在物件中（使用了預設值）
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

`options` 物件的所有屬性除了 `extra` 在左側缺少外，都賦值到對應的變數：

![](destructuring-complex.svg)

最後，我們有 `width`、`height`、`item1`、`item2` 和預設值的 `title`。

注意這裡沒有 `size` 和 `items` 的變數，因為我們直接取得他們的內容。

## 智慧型函式參數

有時，當函式有很多參數的話，大多數是可選的。尤其在使用者介面上。想像一個建立選單的函式。它可能有寬度、高度、標題、項目列表等。

這裡有個不好的函式撰寫方法：

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

在現實生活中，如何記得參數的順序是個問題。通常 IDE 會嘗試協助我們，特別是在程式碼有好的文件時，但... 其他問題是如何呼叫一個很多預設值參數的函式。

像這樣？

```js
// undefined 會是預設值
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

這很醜。而且當我們處理更多參數時變得不好讀。

解構可以助你一臂之力！

我們可以傳遞一個物件的參數，然後函式直接把他們解構成變數：

```js run
// 我們傳遞物件到函式
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...然後直接把他們展開成變數
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – 從 options 拿的,
  // width, height – 預設使用
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

我們也可以對巢狀物件和冒號映射使用更複雜的解構：

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // w 是 width
  height: h = 200, // h 是 height
  items: [item1, item2] // item1 是 items 第一個元素, item2 是第二個
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

完整語法與解構賦值相同：
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

然後，對於是物件的參數來說，`incomingProperty` 屬性將變成 `varName` 變數，預設是 `defaultValue`。

請注意，這種解構認為 `showMenu()` 確實有一個參數。如果我們想要全部的值都可以預設，我們應該指定一個空物件：

```js
showMenu({}); // 好, 所有的值都是預設

showMenu(); // 這會給出錯誤
```

我們可以用 `{}` 作為物件參數的預設值修好這個：

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

在前面的程式碼中，整個參數物件預設為 `{}`，因此總會有東西可以解構。

## 總結

- 解構賦值允許即時將一個物件或陣列映射成多個變數。
- 用於物件的完整語法：
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    這是指 `prop` 屬性應該變成 `varName` 變數，如果屬性不存在，則應該使用 `default` 預設值。

    物件屬性有沒映射的可以複製成 `rest` 物件。

- 用於陣列的完整語法

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    第一個項目變成 `item1`；第二個變成 `item2`，其餘的變成 `rest` 陣列。

- 從巢狀的陣列/物件取資料是可以的，要這麼做的話左側必須跟右側的結構一樣。
