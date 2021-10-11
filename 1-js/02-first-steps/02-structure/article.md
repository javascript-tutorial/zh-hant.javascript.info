# 程式碼結構

我們該知道的第一件事是建立程式碼區塊

## 述句（Statements）

述句是執行操作的語法結構與命令。

我們已經看過 `alert('Hello, world!')` 這個用來顯示 "Hello, world!" 訊息的述句。

我們可以在程式碼中撰寫任何數量的述句，用分號加以區隔。

例如，在這裡我們把 "Hello World" 分為兩段：

```js run no-beautify
alert('Hello'); alert('World');
```

述句通常寫在不同行內使程式碼更為易讀：

```js run no-beautify
alert('Hello');
alert('World');
```

## 分號（Semicolons）[#semicolon]

大多情況下當斷行存在時分號可省略。

所以這樣也行：

```js run no-beautify
alert('Hello')
alert('World')
```

在這裡 JavaScript 直譯（interprets）斷行為 "隱性" 分號。這也被稱為 [自動分號插入（automatic semicolon insertion）](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)。

**大多數情況，一個換行代表著一個分號，但 "大多數情況" 不代表 "總是如此"！**

某些情況下有換行並不代表有分號，如：

```js run no-beautify
alert(3 +
1
+ 2);
```

<<<<<<< HEAD
此程式碼輸出 `6`，因為 JavaScript 沒有在內插入分號。直觀上，當某行程式以 `"+"` 結束時，它是個 "不完整的表達式（incomplete expression）" 而不需要分號，如此一來這個例子才會以我們所想像的方式運作。
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

**但有些情況下 JavaScript 對於分號是否真的被需要會假設 "失敗"**

這些情況下的錯誤很難被找到且修正。

````smart header="錯誤的例子"
如果你想看個這種錯誤的例子，來看這段程式碼：

```js run
alert("Hello");

[1, 2].forEach(alert);
```

<<<<<<< HEAD
先不用思考方括號 `[]` 跟 `forEach` 的意義，我們晚點會介紹。現在只要記得這段程式碼的執行結果：先顯示 `1` 接著是 `2`。

現在來加入一個 `alert` 在這段程式碼之前且 *不要* 以分號做結。
=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```

<<<<<<< HEAD
若我們執行這段程式碼，只有第一個 `alert` 會被顯示出來並有錯誤產生！

但若我們在 `alert` 之後加入分號，一切又恢復正常：
```js run
alert("All fine now");
=======
The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

<<<<<<< HEAD
現在我們有 "All fine now" 的訊息並伴隨著 `1` 和 `2` 顯示。

在沒有分號時會有錯誤，是因為 JavaScript 不假設方括號 `[...]` 之前要有分號。

因為分號沒有被自動插入，所以第一個例子內的程式碼被視為單獨一行述句。這是引擎是怎麼看它的樣子：
=======
That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

<<<<<<< HEAD
但程式應該要有兩個分開的述句而非單獨一個，本例中的合併是錯誤的所以導致錯誤，這在很多其他情況下也可能發生。
=======
Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
````

我們建議即使是依據換行分開的述句也要標上分號，這個規則被社群廣為採納。再次強調 -- 大多時間 *可能* 可以省略分號，但加上分號會更安全，尤其對新手而言。

<<<<<<< HEAD
## 註解 [#code-comments]
=======
## Comments [#code-comments]
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

程式碼會隨著時間變得越來越複雜，有其必要加入 *註解* 來解釋程式在做什麼且為什麼這麼做。

註解可以加在腳本內任意位置，這不影響腳本運行因為引擎會直接忽略它們。

**單行註解由兩個正斜線字元（forward slash characters）開始 `//`。**

此行剩餘部分就是註解，它可以佔據整行或是寫在某個述句之後。

像這樣:
```js run
// 此註解佔據自身整行
alert('Hello');

alert('World'); // 此註解寫在一個述句之後
```

**多行註解由一個正斜線字元加上一個星號開始 <code>/&#42;</code> 並以一個星號加上正斜線字元作結 <code>&#42;/</code>。**

像這樣:

```js run
/* 顯示兩個訊息的例子。
這是一個多行註解。
*/
alert('Hello');
alert('World');
```

因為註解中的內容會被忽略，所以我們若放程式碼在 <code>/&#42; ... &#42;/</code> 之內將不會被執行。

偶爾需要暫時把一段程式拿掉時很有用：

```js run
/* 註解掉程式碼
alert('Hello');
*/
alert('World');
```

<<<<<<< HEAD
```smart header="用熱鍵！"
大多數編輯器中，可以按下 `key:Ctrl+/` 這個熱鍵來註解掉單行程式碼，而 `key:Ctrl+Shift+/` 可以註解多行（選取一段程式碼後按下熱鍵）。Mac 則使用 `key:Cmd` 取代 `key:Ctrl`；`key:Option` 取代 ｀key:Shift`。
=======
```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
```

````warn header="不支援巢狀註解！"
不能在 `/*...*/` 之內嵌入另一個 `/*...*/`。

這樣的程式碼會掛點並產生錯誤：

```js run no-beautify
/*
  /* 巢狀註解？！？ */
*/
alert( 'World' );
```
````

請別猶豫快點開始註解你的程式碼。

註解雖會增加整體程式碼數量，但那根本不是問題。有許多工具可以在推上正式伺服器前先最小化你的程式碼，它們會移除註解所以不會出現在運行的腳本上。因此，註解對於正式版來說根本沒負面影響。

本教程之後有個章節 <info:code-quality> 將解釋如何寫出更好的註解。

