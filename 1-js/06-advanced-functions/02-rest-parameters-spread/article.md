# Rest 參數與 Spread 語法

許多 JavaScript 內建函式支援任意數量的參數。

例如:

- `Math.max(arg1, arg2, ..., argN)` -- 返回參數中最大的值。
- `Object.assign(dest, src1, ..., srcN)` -- 複製 `src1..N` 的屬性到 `dest`。
- ...等。

在本章中，我們將學習如何做到這一點。 並且，如何將陣列作為參數傳遞給這樣的函式。

## Rest 參數 `...`

一個函式可以被任意數量的參數呼叫，不管它是如何定義的。

如下:

```js run
function sum(a, b) {
	return a + b;
}

alert(sum(1, 2, 3, 4, 5));
```

這裡並不會因為過多的參數而產生錯誤。 但這裡的結果只會計算前兩個。

剩下的參數可以在函式定義中使用三個點 `...` 並跟著包含它們的陣列名稱。 這些點字面上意味著「將剩餘的參數收集到陣列中」。

例如，將所有參數收集到陣列 `args` 中:

```js run
function sumAll(...args) {
	// args 是陣列的名稱
	let sum = 0;

	for (let arg of args) sum += arg;

	return sum;
}

alert(sumAll(1)); // 1
alert(sumAll(1, 2)); // 3
alert(sumAll(1, 2, 3)); // 6
```

我們可以選擇將第一個參數作為變數，並只收集剩下的參數。

這裡的前兩個參數會進入變數，其餘的則會進入 `titles` 陣列:

```js run
function showName(firstName, lastName, ...titles) {
	alert(firstName + " " + lastName); // Julius Caesar

	// 剩餘的參數會被收集到陣列中
	// i.e. titles = ["Consul", "Imperator"]
	alert(titles[0]); // Consul
	alert(titles[1]); // Imperator
	alert(titles.length); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="剩餘的參數必須在最後"
Rest 參數會收集所有剩餘的參數，所以以下的寫法是不合理的，並會產生錯誤:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

`...rest` 必須在參數最後。
````

## "arguments" 變數

這裡也有一個名為 `arguments` 的特殊陣列式物件，它按索引包含所有參數。

例如:

```js run
function showName() {
	alert(arguments.length);
	alert(arguments[0]);
	alert(arguments[1]);

	// 可遍歷的
	// for(let arg of arguments) alert(arg);
}

// 依序顯示: 2, Julius, Caesar
showName("Julius", "Caesar");

// 依序顯示: 1, Ilya, undefined (無第二個參數)
showName("Ilya");
```

過去，rest 參數並不存在於 JavaScript 中，使用 `arguments` 是取得函式所有參數的唯一方法。 這仍然有效，我們可以在舊程式碼中找到它。

````warn header="`arguments` 是可遍歷的，但不是陣列"
但缺點是，`arguments`同時是陣列式的和可遍歷的，但它不是陣列。 因此不支援陣列方法，所以我們不能呼叫`arguments.map(...)` 等方法。

`````

此外，它包含所有參數。 我們無法像使用 rest 參數只擷取部分參數。

因此，當我們需要這些功能時，建議優先使用 rest 參數。

````smart header="箭頭函式沒有 `\"arguments\"`"

如果我們在箭頭函式中存取 `arguments` 物件，它會從外部「正常」函式中取得。


例如:

```js run
function f() {
	let showArg = () => alert(arguments[0]);
	showArg();
}

f(1); // 1
```

還記得嗎？箭頭函式沒有自己的 `this`。現在我們知道它們也沒有特殊的 `arguments` 物件。

`````

## Spread syntax [#spread-syntax]

我們已經看到如何從參數列表中取得陣列。

但有時候我們也需要做相反的事情。

例如, 內建函式 [Math.max](mdn:js/Math/max) 會返回列表中最大數值:

```js run
alert(Math.max(3, 5, 1)); // 5
```

Now let's say we have an array `[3, 5, 1]`. How do we call `Math.max` with it?

Passing it "as is" won't work, because `Math.max` expects a list of numeric arguments, not a single array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

And surely we can't manually list items in the code `Math.max(arr[0], arr[1], arr[2])`, because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

_Spread syntax_ to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.

When `...arr` is used in the function call, it "expands" an iterable object `arr` into the list of arguments.

For `Math.max`:

```js run
let arr = [3, 5, 1];

alert(Math.max(...arr)); // 5 (spread turns array into a list of arguments)
```

We also can pass multiple iterables this way:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(...arr1, ...arr2)); // 8
```

We can even combine the spread syntax with normal values:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25
```

Also, the spread syntax can be used to merge arrays:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```

In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:

```js run
let str = "Hello";

alert([...str]); // H,e,l,l,o
```

The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.

So, for a string, `for..of` returns characters and `...str` becomes `"H","e","l","l","o"`. The list of characters is passed to array initializer `[...str]`.

For this particular task we could also use `Array.from`, because it converts an iterable (like a string) into an array:

```js run
let str = "Hello";

// Array.from converts an iterable into an array
alert(Array.from(str)); // H,e,l,l,o
```

The result is the same as `[...str]`.

But there's a subtle difference between `Array.from(obj)` and `[...obj]`:

- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.

So, for the task of turning something into an array, `Array.from` tends to be more universal.

## Get a new copy of an object/array

Remember when we talked about `Object.assign()` [in the past](https://javascript.info/object#cloning-and-merging-object-assign)?

It is possible to do the same thing with the spread operator!

```js run
let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters
// then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Note that it is possible to do the same thing to make a copy of an object:

```js run
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
// then return the result in a new object

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

This way of copying an object is much shorter than `let objCopy = Object.assign({}, obj);` or for an array `let arrCopy = Object.assign([], arr);` so we prefer to use it whenever we can.

## Summary

When we see `"..."` in the code, it is either rest parameters or the spread syntax.

There's an easy way to distinguish between them:

- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.

Use patterns:

- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in "old-style" `arguments`: array-like iterable object.

```

```
