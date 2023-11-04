# 全域物件 (Global object)

全域物件提供可以在任何地方使用的變數和函式。預設情況下，這些變數和函式是內建在語言或環境中的。

在瀏覽器中，它的名稱是 `window`，在 Node.js 中是 `global`，在其他環境中可能有其他名稱。

近期，`globalThins` 被加入到語言中，作為一個全域物件的標準名稱，所有主流環境中均應該支援。但在某些瀏覽器中，特別是非 Chromium Edge，雖尚未支援 `globalThis`，但可以很容易地進行 polyfilled。

這裡我們將使用 `window`，假設我們的環境是瀏覽器。如果你的腳本可能在其他環境中執行，最好使用 `globalThis`。

所有全域物件的屬性都可以直接存取：

```js run
alert("Hello");
// 與以下相同
window.alert("Hello");
```

在一個瀏覽器，使用 `var` (不是 `let/const`!) 宣告的全域函式和變數，會成為全域物件的屬性：

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (變數成為全域物件的屬性)
```

請不要依賴這個方式！這個行為是為了相容性而存在的。現代腳本使用 [JavaScript modules](info:modules)，來避免這種事情的發生。

如果我們使用 `let`，這種事情就不會發生：

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (沒有成為全域物件的屬性)
```

如果有一個值重要到你想要讓它在全域物件中使用，直接寫成屬性：

```js run
*!*
// 使目前使用者資訊成為全域物件，讓所有腳本都可以存取
window.currentUser = {
  name: "John"
};
*/!*

// 在其他腳本中
alert(currentUser.name);  // John

// 或者，如果我們有一個叫做 "currentUser" 的本地變數
// 從全域物件中取得它 (是安全的！)
alert(window.currentUser.name); // John
```

這樣說來，使用全域變數通常是不鼓勵的。應該盡可能少使用全域變數。一個函式接收"輸入"變數並產生某些"結果"的程式設計，比起使用外部或全域變數，更清楚、更不容易出錯，也更容易測試。

## 使用 polyfills

我們使用全域物件來測試對現代語言特性的支援。

例如，測試內建的 `Promise` 物件是否存在 (在舊的瀏覽器中並不存在)：

```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

如果沒有 (例如，我們在舊的瀏覽器中)，我們可以建立"polyfills"：加入一些在現代標準中存在，但環境不支援的函式。

```js run
if (!window.Promise) {
  window.Promise = ...// 自訂的現代語言特性實作
}
```

## 結論

- 全域物件包含所有環境中的內建變數。

  包含 JavaScript 內建的例如 `Array` 和環境特定的值，例如 `window.innerHeight` - 瀏覽器中的視窗高度。

- 全域物件有一個通用的名稱 `globalThis`。

  ...但更常見的是使用"舊的"環境特定名稱，例如 `window` (瀏覽器) 和 `global` (Node.js)。因為 `globalThis` 是最近的提案，所以在非 Chromium Edge 中並不支援 (但可以 polyfilled)。

- 我們應該只在真的需要時，才將值儲存在全域物件中。並且盡可能減少數量。
- 在瀏覽器中，除非我們使用 [modules](info:modules)，否則使用 `var` 宣告的全域函式和變數，會成為全域物件的屬性。
- 為了讓我們的程式碼具有未來的擴充性，並且更容易理解，我們應該直接存取全域物件的屬性，例如 `window.x`。
