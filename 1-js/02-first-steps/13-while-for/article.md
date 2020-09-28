# 迴圈：while 和 for

我們通常需要重複一些行為。

例如，從某串清單一個接一個輸出產品，或將數字 1 至 10 用來執行一段相同的程式碼。

*迴圈* 是種多次重複執行相同程式碼的方法。

## "while" 迴圈

`while` 迴圈有著以下語法：

```js
while (condition) {
  // 程式碼
  // 意即 "迴圈本體"
}
```

當 `condition` 為真值，迴圈本體的 `程式碼` 將被執行。

舉個例，底下的迴圈在 `i < 3` 時會輸出 `i`：

```js run
let i = 0;
while (i < 3) { // 顯示 0，接著1，然後 2
  alert( i );
  i++;
}
```

迴圈本體的一次執行稱之為一次 *迭代（iteration）*，上面例子的迴圈進行三次迭代。

若上面例子的 `i++` 漏掉了，迴圈將（理論上）永遠重複執行。實務上，瀏覽器提供了停止這類迴圈的做法，而在伺服器端的 JavaScript，我們可以終止該程序。

並非只有比較式，任何表達式或變數皆可作為迴圈條件：此條件將被 `while` 核定並轉換成布林值。

舉個例，`while (i != 0)` 的簡短寫法為 `while(i)`：

```js run
let i = 3;
*!*
while (i) { // 當 i 變成 0 時，條件變成虛值而迴圈停止
*/!*
  alert( i );
  i--;
}
```

````smart header="單行程式碼本體的大括號並非必要"
如果迴圈本體只有一條述語，我們可以省略大括號 `{...}`：

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" 迴圈

使用 `do..while` 語法，可將條件確認移至迴圈本體的 *下方*：

```js
do {
  // 迴圈本體
} while (condition);
```

該迴圈會先執行迴圈本體，然後才確認條件，並且在條件為真值時再次地執行迴圈本體。

例如：

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

這種語法應該只在你想要迴圈本體不論條件如何，都執行 **至少一次** 時才使用，通常較建議使用另一種形式 `while(...) {...}`。

## "for" 迴圈

`fop` 迴圈稍微複雜些，但它也是最常被使用的迴圈。

看起來長這樣：

```js
for (begin; condition; step) {
  // ... 迴圈本體（loop body）...
}
```

讓我們透過例子來了解這三個段的含義。底下的迴圈在 `i` 從 `0` 至 `3`（不包含）的時候執行 `alert(i)`：

```js run
for (let i = 0; i < 3; i++) { // 顯示 0，接著 1，然後 2
  alert(i);
}
```

讓我們一段一段來檢查 `for` 述語：

| 段落  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | 在進入迴圈時執行一次。                                      |
| condition | `i < 3`| 每次迴圈迭代開始前檢查，若為假則迴圈停止。              |
| body | `alert(i)`| 當條件是真值時，一直重複執行。                         |
| step| `i++`      | 每次迭代時會在本體之後才執行。 |

一般的迴圈演算法像這樣子運行：

```
執行 begin
→ (若 condition 為真 → 執行 body 再執行 step)
→ (若 condition 為真 → 執行 body 再執行 step)
→ (若 condition 為真 → 執行 body 再執行 step)
→ ...
```

也就是說，`begin` 執行一次，然後迭代開始：在每次的 `condition` 測試後，`body` 和 `step` 將被執行。

若你對於迴圈還不熟，把這個例子在紙上一步步重現其運作方式，將會很有幫助。

這是我們範例中實際發生的情況：

```js
// for (let i = 0; i < 3; i++) alert(i)

// 執行 begin
let i = 0
// 若 condition 為真 → 執行 body 再執行 step
if (i < 3) { alert(i); i++ }
// 若 condition 為真 → 執行 body 再執行 step
if (i < 3) { alert(i); i++ }
// 若 condition 為真 → 執行 body 再執行 step
if (i < 3) { alert(i); i++ }
// ...結束，因為現在 i == 3
```

````smart header="行內變數宣告（Inline variable declaration）"
在此，該 "計數器" 變數 `i` 只在迴圈內被宣告，這被稱為一個 "行內（inline）" 變數宣告，該種類變數的可視範圍只在迴圈內部。

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // 錯誤，沒有該變數
```

除了定義新的變數，我們也可以使用已存在的某個變數：

```js run
let i = 0;

for (i = 0; i < 3; i++) { // 使用某個已存在的變數
  alert(i); // 0, 1, 2
}

alert(i); // 3，可被看見，因為是在迴圈之外被宣告的
```

````

### 省略某幾段

`for` 的任何一段都可被省略。

例如，當我們不需要在迴圈開始時做任何事，就可以忽略 `begin`。

像這樣：

```js run
let i = 0; // 我們已宣告並指定 i 了

for (; i < 3; i++) { // 不需要 "begin"
  alert( i ); // 0, 1, 2
}
```

我們也可移除 `step` 這段：

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

這讓該迴圈與 `while (i < 3)` 等效。

事實上我們也可以移除所有東西，建立一個無窮迴圈：

```js
for (;;) {
  // 無限循環
}
```

請注意 `for` 中一定要有那兩個逗號 `;`，否則會產生語法錯誤。

## 中斷迴圈

通常，一個迴圈在當其條件為虛值時會離開。

但我們可以在任何時間點，使用特殊的 `break` 指令來強制離開。

例如，底下的迴圈詢問使用者一連串的數字，當沒有數字被輸入時將會 "中斷（breaking）"：

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

如果使用者輸入為空或取消輸入，`break` 指令將在 `(*)` 被啟動。它會立刻停止迴圈，將控制權傳遞給迴圈之後的第一行，也就是 `alert`。

當條件不能只在迴圈的頭尾被檢查，而是要在中間甚至本體多處檢查的情況下，組合 "無窮迴圈 + `break`" 將是個好做法。

## 繼續下一輪迭代 [#continue]

`continue` 指令是個 "輕量版" 的 `break`，它不會停止整個迴圈。反之，它只停止目前這一輪迭代並強迫迴圈開始新的一輪（若判斷條件依然成立時）。

我們可以在目前這輪迭代的事情已做完，想要開始進行下一輪迭代時使用它。

底下的迴圈使用 `continue` 來只輸出奇數：

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // 若為真，省略本體剩餘的部分
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1，然後 3、5、7、9
}
```

對 `i` 的偶數值而言，`continue` 指令停止本體執行並將控制權傳遞給 `for` （使用下一個數字）的下一輪迭代，所以 `alert` 將只有在奇數時會被呼叫。

````smart header="`continue` 指令有助於減少巢狀結構"
一個顯示奇數的迴圈也可以長這樣：

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

從技術角度上來看，這跟上面的例子是等效的。確實，我們可以將程式碼包裝在一個 `if` 區塊內，而不使用 `continue`。

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
但這麼做有副作用，它會建立多一層的巢狀結構（大括號內的 `alert` 呼叫）。若 `if` 內的程式碼不只短短幾行，就會降低整體的可讀性。
=======
But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d:1-js/02-first-steps/13-while-for/article.md
````

````warn header="不能在 '?' 右側使用 `break/continue`"
請注意這種並非表達式的語法結構，禁止被使用在三元運算子 `?` 上，特別像是 `break/continue` 這類的指令。

例如，將這段程式碼：

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...改寫成使用問號：

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue 不允許出現在這
```

...這麼做會因為存在語法錯誤而停止運作。

這也是另一個別使用問號運算子 `?` 取代 `if` 的例子。
````

## break/continue 的標籤

有時候我們需要一次從多個巢狀迴圈內中斷跳出。

例如底下的程式碼中，我們在 `i` 和 `j` 之間循環，從 `(0,0)` 至 `(2,2)` 提示座標 `(i, j)`：

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 若我想從這邊離開到（底下的）Done 該怎麼做？
  }
}

alert('Done!');
```

我們需要一個若使用者取消輸入時，用來結束運行的方式。

一般在 `input` 之後放入 `break` 只會中斷內部的迴圈，這還不夠 -- 可以用 "標籤" 來幫助我們！

一個 *標籤（label）* 是一個在迴圈前有著冒號的識別符：

```js
labelName: for (...) {
  ...
}
```

底下迴圈中的 `break <labelName>` 述語將中斷並跳出該標籤：

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 若輸入一個空字串或取消輸入，則兩個迴圈都中斷並跳出
    if (!input) *!*break outer*/!*; // (*)

    // 用輸入的值做些事情...
  }
}
alert('Done!');
```

上面的程式碼中，`break outer` 向上尋找名為 `outer` 的標籤，並中斷跳出該對應迴圈。

所以控制權將直接從 `(*)` 傳遞至 `alert('Done!')`。

我們也可以將標籤移至單獨的一行：

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` 指令也可以和標籤一起使用，在這種情況下，程式碼會跳至被標註的迴圈，並開始執行下一輪的迭代。

````warn header="標籤不是用來 \"跳到\" 任意位置的"
標籤並不允許我們跳至程式碼中任何想要的位置。

例如，不能這麼做：

```js
break label; // 不能跳到下面的標籤

label: for (...)
```

只有在迴圈內部才可呼叫 `break/continue`，且標籤必須在該指令的上方某處。
````

## 總結

我們涵蓋了三種類的迴圈：

- `while` -- 在每一輪的迭代之前確認條件。
- `do..while` -- 在每一輪的迭代之後確認條件。
- `for (;;)` -- 在每一輪的迭代之前確認條件，可使用額外的設定。

通常使用 `while(true)` 架構來建立 "無窮" 迴圈，這種迴圈就像其它一樣，可以被 `break` 指令中斷。

若我們不想再在這一輪迭代中做任何事，可以使用 `continue` 指令來進行下一輪。

`break/continue` 支援在迴圈前加上標籤，使用標籤是 `break/continue` 跳脫巢狀迴圈回到外層的唯一方式。

