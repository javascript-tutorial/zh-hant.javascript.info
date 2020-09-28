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

<<<<<<< HEAD:1-js/04-object-basics/05-object-toprimitive/article.md
    舉個例，二元加法 `+` 可以同時運作在字串（串接）和數值（相加）上，所以字串與數值兩者皆可使用。因此若二元加法以物件作為引數時，它會使用 `"default"` 提示來轉換。
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d:1-js/04-object-basics/09-object-toprimitive/article.md

    同樣地，若物件使用 `==` 比較字串、數值或符號時，哪種轉換會進行也很不清楚，所以會使用 `"default"` 提示。

    ```js
    // 使用 "default" 提示的二元加法
    let total = obj1 + obj2;

    // obj == number 使用 "default" 提示
    if (user == 1) { ... };
    ```

    大於/小於 運算子 `<>` 一樣可以同時作用於字串和數值上。但它仍使用 "number" 提示而非 "default"，這是因為歷史因素。

    實際上，我們不需要記住這些罕見的細節，因為除了某種例外（`Date` 物件，我們晚點會學到），所有內建物件都實作了和 `"number"` 一樣的 `"default"` 轉換，所以可以同樣方式運作。

```smart header="No `\"boolean\"` hint"
請注意 -- 只有三種提示，就那麼簡單。

不存在 "布林" 提示（所有物件在布林上下文中都是 `true`）等等其它的轉換。且若我們將 `"default"` 和 `"number"` 一視同仁，如同大多內建物件那樣，那將只有兩種轉換了。
```

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

這些方法必須回傳一個原生值，若 `toString` 或 `valueOf` 回傳一個物件，則它將被忽略（視同根本不存在這個方法）。

每個物件會有下列預設的 `toString` 與 `valueOf` 方法：

- `toString` 方法回傳一個字串 `"[object Object]"`。
- `valueOf` 方法回傳物件自身。

在此演示一下：

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

所以若我們試圖將某個物件作為字串使用，像是用於 `alert` 等其它地方，那我們預設將看到 `[object Object]`。

為了避免搞混，而在這邊提到預設的 `valueOf` 只是為了完整性考量。如同你所見，它回傳了該物件本身從而被忽略了。別問我為什麼，那是歷史因素。所以我們可以假設它根本不存在。

來實作這些方法吧。

舉個例，這個 `user` 使用 `toString` 和 `valueOf` 的組合做了如同上述的事，而不是用 `Symbol.toPrimitive`：

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

沒有限制 `toString()` 是否一定就得回傳一個字串，或 `Symbol.toPrimitive` 方法是否得對 "number" 提示回傳一個數值。

唯一強制的事情是：這些方法必須回傳原生類型，而非物件。

```smart header="歷史筆記"
由於歷史因素，若 `toString` 或 `valueOf` 回傳一個物件時不會產生錯誤，但該值將被忽略（就像此方法不存在一樣）。那是因為古早時期在 JavaScript 中並沒有好的 "錯誤" 觀念。

相對地，`Symbol.toPrimitive` *必須* 回傳一個原生類型，否則就會產生錯誤。
```

## 進一步的轉換

如同我們所知的，許多運算子與函式都會做類型轉換，像是：乘法 `*` 會轉換運算元為數值。

若我們傳入一個物件作為引數，那將會進行兩個步驟：
1. 物件被轉為原生值（使用上述的規則）。
2. 若轉完的原生值並非正確類型，就再進行轉換。

舉個例：

```js run
let obj = {
  // 在少了其他方法的情況下，toString 處理所有的轉換
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4，物件被轉為原生類型 "2"，然後乘法會讓它再變成一個數值
```

1. `obj * 2` 的乘法運算會先轉換該物件為原生值（也就是變成一個字串 `"2"`）。
2. 然後 `"2" * 2` 會變成 `2 * 2`（字串被轉換為數值）。

二元加法在同樣情境時會連接字串，並欣然接受轉完的字串：

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22（"2" + 2），轉換為原生值時回傳一個字串 => 串接
```

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

