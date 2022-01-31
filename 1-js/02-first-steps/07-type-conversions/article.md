# 類型轉換

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
大多時候，運算子和函式會自動轉換給予它們的值為正確類型。
=======
Most of the time, operators and functions automatically convert the values given to them to the right type.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c:1-js/02-first-steps/07-type-conversions/article.md

例如，`alert` 自動將任何值轉換成字串並顯示，數學運算子會把值轉換成數值。

當然某些情況我們得明確地轉換一個值至預期的類型。

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
```smart header="還沒開始談到物件類型"
在這章節，我們將不會轉換物件類型，我們會從原生類型開始說起。等晚點我們學完物件後，會在章節 <info:object-toprimitive> 中談到物件是如何被轉換的。
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c:1-js/02-first-steps/07-type-conversions/article.md
```

## String Conversion

字串轉換發生在我們需要得到某個值的字串型態時。

例如，`alert(value)` 就做這件事並顯示其值。

我們也可以呼叫 `String(value)` 函式把一個值轉為字串：

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // 現在 value 是一個 "true" 字串
alert(typeof value); // string
*/!*
```

字串轉換通常很直觀，一個 `false` 變成 `"false"`，`null` 變成 `"null"` 等。

## Numeric Conversion

數值轉換自動發生在數學運算函式和表達式。

例如，當除法 `/` 被運用在非數值上時：

```js run
alert( "6" / "2" ); // 3，字串被轉成數值
```

我們可以使用 `Number(value)` 函式來明確地轉換一個 `value` 為一個數值：

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // 變成數值 123

alert(typeof num); // number
```

這種明確轉換通常用在，當我們從一個類似文字基底的來源讀取一個值，但預期它要被作為一個數值讀入時。

如果該字串不是個有效的數值，轉換的結果會是 `NaN`，如：

```js run
let age = Number("任何非數字的字串");

alert(age); // NaN，轉換失敗
```

數值轉換規則：

| 值 | 會變成... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;和&nbsp;false</code> | `1` 和 `0` |
| `string` | 先去除頭尾空白，如果剩下的字串是空字串則結果是 `0`，否則數值將被從剩下的字串中被 "讀取"，此時若有錯誤將產生 `NaN`。 |

例子：

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN（在 "z" 讀取數值時產生錯誤）
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

請注意 `null` 和 `undefined` 的行為在此處不同：`null` 會變成零，而 `undefined` 會變成 `NaN`。

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
````smart header="加法 '+' 連接字串們"
幾乎所有數學運算子都會將值轉成數值，而加法 `+` 是個值得一提的例外。如果加法某側運算元是個字串，另一側將也會被轉換成字串。

然後兩者將被連接：

```js run
alert( 1 + '2' ); // '12'（右側為字串）
alert( '1' + 2 ); // '12'（左側為字串）
```

這只發生在當至少一側的引數是字串時，否則值都會被轉為數值。
````
=======
Most mathematical operators also perform such conversion, we'll see that in the next chapter.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c:1-js/02-first-steps/07-type-conversions/article.md

# Boolean Conversion

布林轉換是最簡單的一個。

它發生在邏輯運算（晚點我們將看到條件判斷和其它類似的東西），但也可以經由呼叫 `Boolean(value)` 來明確地轉換。

轉換規則是：

- 直觀上是 "空白" 的值，像是 `0`、空字串、`null`、`undefined` 和 `NaN`，都會變成 `false`。
- 其他值變成 `true`。

例如：

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="請注意：包含零的字串 `\"0\"` 將會是 `true`"
某些語言（如 PHP）視 `"0"` 為 `false`，但在 JavaScript 中，一個非空字串都會是 `true`。

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 空白，也是 true（任何非空字串都是 true）
```
````

## 總結

三種最為廣泛使用的類型轉換是：轉字串、轉數值和轉布林。

**`字串轉換`** -- 用於當我們輸出某些東西時，可使用 `String(value)` 來轉換，原生值的字串轉換通常是很直觀的。

**`數值轉換`** -- 用於數學運算，可使用 `Number(value)` 來轉換。

按照以下規則轉換：

| 值 | 會變成... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | 字串 "依原樣" 讀取並忽略頭尾空白，若為空字串則為 `0`，有錯誤則成為 `NaN`。 |

**`布林轉換`** -- 用於邏輯運算，可使用 `Boolean(value)` 來轉換。

規則是：

| 值 | 會變成... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|其它值| `true` |

這些規則大多容易理解記憶，值得一提的是，大家常常在這些地方犯錯：

- `undefined` 轉成數值是 `NaN` 而非 `0`。
- `"0"` 和像是 `"   "` 這種只包含空白的字串在轉成布林時是 true。

在此沒提到物件的轉換，我們將會晚點在專門介紹物件的章節 <info:object-toprimitive> 中提及，先讓我們了解更多 JavaScript 中基礎的內容。

