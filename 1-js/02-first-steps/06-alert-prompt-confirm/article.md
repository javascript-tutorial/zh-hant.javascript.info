# 互動： alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
此部分的教程涵蓋 "原本" 的 JavaScript，不需對環境做特別調整。

但因為我們將使用瀏覽器做為演示環境，所以我們應該至少知道一些跟使用者互動的函式。在本章，我們將會對 `alert`、`prompt` 和 `confirm` 瀏覽器函式更為熟悉。

## alert

語法：

```js
alert(message);
```

會顯示一段訊息並中斷腳本執行直到使用者按下 "OK"。
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1:1-js/02-first-steps/06-alert-prompt-confirm/article.md

例如：

```js run
alert("Hello");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
該顯示訊息的迷你窗口稱之為 *模態視窗 （modal window）*。"模態 (modal)" 這個字代表使用者不能與頁面其他部分互動或按其他按鈕等，直到他們處理了這個視窗為止，在此處為 -- 直到它們按下 "OK"。
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

函式 `prompt` 接收兩個參數：

```js no-beautify
result = prompt(title, [default]);
```

會顯示一個帶有文字訊息的模態視窗，並有給訪問者輸入的欄位和 OK/Cancel 的按鈕。

`title`
: 顯示予使用者的文字。

`default`
: 可選的第二個參數，為輸入欄位的初始值。

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
訪問者可在 prompt 輸入欄位寫些東西然後按下 OK。或者可藉由按下 Cancel 或 `key:Esc` 按鍵取消輸入。
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1:1-js/02-first-steps/06-alert-prompt-confirm/article.md

呼叫 `prompt` 後會回傳輸入欄位的文字，或輸入被取消時則回傳 `null`。

舉個例：

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="在 IE：總是給個 `default`"
第二個參數是可選的，但如果我們沒給，Internet Explorer 會把 `"undefined"` 這個文字插入到 prompt 內。

在 Internet Explorer 執行此程式碼來看看：

```js run
let test = prompt("Test");
```

所以為了讓 IE 內的 prompt 看起來沒問題，我們建議總是提供第二個引數：

```js run
let test = prompt("Test", ''); // <-- 為了 IE
```
````

## confirm

語法為：

```js
result = confirm(question);
```

函式 `confirm` 顯示一個模態視窗，包含一個 `問題` 與兩個按鈕：OK 和 Cancel。 

若按下 OK 回傳結果是 `true` 否則為 `false`。

例如：

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // 若按下 OK 則為 true
```

## 總結

我們介紹三種瀏覽器相關的函式用來和訪問者互動：

`alert`
: 顯示訊息。

`prompt`
: 顯示訊息並要求使用者輸入文字並回傳該文字，若按下 Cancel 按鈕或 `key:Esc` 鍵時，則回傳 `null`。

`confirm`
: 顯示訊息並等待使用者按下 "OK" 或 "Cancel"，OK 時回傳 `true`，Cancel/`key:Esc` 時回傳 `false`。

這些方法都是模態：它們暫停腳本執行並讓訪問者無法和頁面其餘部分互動，直到視窗被關掉為止。

以上這些方法都有兩個限制：

1. 模態視窗確切的位置是由瀏覽器決定的，通常會是在中間。
2. 視窗確切的外觀也是由瀏覽器決定的，我們無法修改。

這就是簡單的代價，有其它顯示更好視窗和與使用者互動更為豐富的方法，但若不需要太多 "花俏華麗" 的介面，這些方法已經夠用了。

