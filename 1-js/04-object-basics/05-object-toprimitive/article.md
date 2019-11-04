# 物件轉換為原生類型

當物件相加 `obj1 + obj2`、相減 `obj1 - obj2` 或使用 `alert(obj)` 印出來時會發生什麼事呢？

在這種情況，物件被自動轉換為原生類型，並且操作會被執行。

在章節 <info:type-conversions> 我們已經看到數值、字串與布林等原生類型的轉換規則，但我們對於物件遺留了一些空白。現在，當我們知道方法和符號後，就該來填上它了。

1. 所有物件在布林上下文（boolean context）中皆為 `true`，所以就只會有數值與字串的轉換。
2. 當我們相減物件或套用數學函式時，數值轉換才會發生。舉個例，`Date` 物件（在章節 <info:date> 中會介紹）可以相減，而 `date1 - date2` 的結果是兩個日期之間的時間差。
3. 至於字串轉換 -- 它通常發生在當我們像是 `alert(obj)` 這樣輸出物件或類似的上下文中才會發生。

## ToPrimitive

我們可以使用特殊的物件方法來微調字串和數值的轉換。

有三種類型轉換的變化，被稱為 "提示（hints）"，被描述於 [規格](https://tc39.github.io/ecma262/#sec-toprimitive) 內：

`"string"`
: 物件至字串的轉換，發生在我們操作物件並預期得到一個字串時，像是 `alert`：

    ```js
    // 輸出
    alert(obj);

    // 使用物件作為屬性鍵
    anotherObj[obj] = 123;
    ```

`"number"`
: 物件至數值的轉換，發生在我們算數時：

    ```js
    // 明確轉換
    let num = Number(obj);

    // 數學（除了二進位加法之外）
    let n = +obj; // 一元正號
    let delta = date1 - date2;

    // 大於/小於 的比較
    let greater = user1 > user2;
    ```

`"default"`
: 發生於極少情況下，當 "不確定" 運算子會預期是什麼類型時。

<<<<<<< HEAD
    舉個例，二元加法 `+` 可以同時運作在字串（串接）和數值（相加）上，所以字串與數值兩者皆可使用。或當物件使用 `==` 比較字串、數值或符號時，哪種轉換會進行也很不清楚。

    ```js
    // 二元加法
    let total = car1 + car2;
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if the a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

<<<<<<< HEAD
    大於/小於 運算子 `<>` 一樣可以同時作用於字串和數值上。但它使用 "number" 提示而非 "default"，這是因為歷史因素。

    實際上，除了某種物件（`Date` 物件，我們晚點會學到），所有內建物件都實作了和 `"number"` 一樣的 `"default"` 轉換，且我們或許也該這樣做。

請注意 -- 只有三種提示，就那麼簡單，不存在 "布林" 提示（所有物件在布林上下文中都是 `true`）等其它的。且若我們對 `"default"` 和 `"number"` 一視同仁，如同大多內建物件那樣，那將只有兩種轉換了。
=======
    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

**要做轉換時，JavaScript 試著找尋並呼叫三種物件方法：**

1. 呼叫 `obj[Symbol.toPrimitive](hint)` - 若該方法存在時，會置於符號鍵 `Symbol.toPrimitive`（系統符號）之中。
2. 否則，若提示為 `"string"`
    - 嘗試呼叫 `obj.toString()` 和 `obj.valueOf()`，不論是哪個存在。
3. 否則，若提示為 `"number"` 或`"default"`
    - 嘗試呼叫 `obj.valueOf()` 和 `obj.toString()`，不論是哪個存在。

## Symbol.toPrimitive

來從第一個方法開始吧。有個內建的符號叫做 `Symbol.toPrimitive`，被用於命名轉換方法，像這樣：

```js
obj[Symbol.toPrimitive] = function(hint) {
  // 必須回傳一個原生類型值
  // hint = "string"、"number" 和 "default" 其中一個
};
```

舉個例，這個 `user` 物件實作了它：

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 轉換演示：
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

如我們從程式碼所見，`user` 依據轉換類型變成描述自己的字串或錢的總量。該單一方法 `user[Symbol.toPrimitive]` 處理了所有轉換情況。

## toString/valueOf

方法 `toString` 和 `valueOf` 來自古早時期。它們不是符號（那麼久之前符號根本還不存在），而是個 "普通的" 以字串命名的方法。它們提供一個替代的 "老派" 方式來實作轉換。

若沒有 `Symbol.toPrimitive`，則 JavaScript 會試圖找尋它們並以這樣的順序嘗試呼叫：

- 對於 "string" 提示，`toString -> valueOf`。
- 否則，`valueOf -> toString`。

<<<<<<< HEAD
舉個例，這個 `user` 採用 `toString` 與 `valueOf` 做了如同前述的事情：
=======
These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns an object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let user = {
  name: "John",
  money: 1000,

  // 對於 hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // 對於 hint="number" 或 "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

如我們所見，該行為與前一個使用 `Symbol.toPrimitive` 的例子相同。

通常我們會想要單一個 "全包" 的地方來處理所有原生類型的轉換。在這個情況，我們可以只實作 `toString`，像這樣：

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

在少了 `Symbol.toPrimitive` 與 `valueOf` 的情況下，`toString` 將會處理所有原生類型的轉換。

## 回傳類型

要理解關於原生類型轉換方法，有件很重要的事就是它們不需要回傳 "被提示" 的原生類型。

<<<<<<< HEAD
沒有限制 `toString()` 是否一定就得回傳一個字串，或 `Symbol.toPrimitive` 方法是否得對 "number" 提示回傳一個數值。
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

唯一強制的事情是：這些方法必須回傳原生類型，而非物件。

```smart header="歷史筆記"
由於歷史因素，若 `toString` 或 `valueOf` 回傳一個物件時不會產生錯誤，但該值將被忽略（就像此方法不存在一樣）。那是因為古早時期在 JavaScript 中並沒有好的 "錯誤" 觀念。

相對地，`Symbol.toPrimitive` *必須* 回傳一個原生類型，否則就會產生錯誤。
```

<<<<<<< HEAD
## 進一步的操作

一個發起轉換的運算獲得了原生類型，然後繼續運作，並在需要時再套用進一步的轉換。
=======
## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operatnds to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

舉個例：

<<<<<<< HEAD
- 數學運算，除了二元加法以外，將會轉換該原生類型為數值：

    ```js run
    let obj = {
      // 在少了其他方法的情況下，toString 處理所有的轉換
      toString() {
        return "2";
      }
    };

    alert(obj * 2); // 4，物件被轉為原生類型 "2"，然後乘法會讓它再變成一個數值
    ```

- 二元加法在同樣情境時會連接字串：
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22（轉換成原生類型會回傳一個字串 => 串接）
    ```
=======
```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## 總結

在許多預期使用原生類型作為值的函式和運算子中，物件轉換為原生類型是自動被呼叫的。

對其有三種類型（提示）：
- `"string"`（對於 `alert` 和其他需要字串的操作）
- `"number"` (對於數學運算)
- `"default"` (少數操作)

規格明確描述哪個運算子使用哪種提示。有極少運算 "不知如何預期" 就會使用 `"default"` 提示。通常對於內建物件來說，`"default"` 提示會採用跟 `"number"` 一樣的處理方式，所以實務上後兩者會被合併在一起。

轉換的演算法為：

1. 呼叫 `obj[Symbol.toPrimitive](hint)` 若該方法存在。
2. 否則若提示為 `"string"`
    - 嘗試 `obj.toString()` 和 `obj.valueOf`，不論是哪個存在。
3. 否則若提示為 `"number"` 或 `"default"`
    - 嘗試 `obj.valueOf` 和 `obj.toString()`，不論是哪個存在。

實際上，對於紀錄或除錯用途而言，通常只要實作 `obj.toString()` 作為 "全包" 所有轉換的方法，使其能回傳某物件 "人類能讀懂" 的表示型式就夠了。

