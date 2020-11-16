# 開發者控制台

程式碼容易產生錯誤。你也將可能寫出錯誤程式... 喔，我在說什麼？只要你是正常人類，你將 *一定會* 寫出錯誤程式，除非你是 [機器人（robot）](https://en.wikipedia.org/wiki/Bender_(Futurama))。

但瀏覽器之中，使用者預設看不到錯誤。所以腳本若有錯，我們看不到是什麼壞了且無從修正。

為了看到腳本的錯誤和其他較多有用訊息，"開發者工具" 被內嵌於瀏覽器之中。

大部分開發者傾向用 Chrome 或 Firefox 開發，因為它們擁有最佳的開發者工具。其他瀏覽器也有提供開發者工具，有時甚至有特殊功能，但通常這些瀏覽器都還在 "趕上" Chrome 或 Firefox。所以大多數的開發者會有自己 "最喜歡" 的瀏覽器，然後在問題只發生在特定瀏覽器上時才切換過去。

<<<<<<< HEAD
開發者工具強大且有很多功能。一開始我們將學習如果開啟它們、查看錯誤並執行 JavaScript 指令。
=======
Developer tools are potent, they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Google Chrome

打開頁面 [bug.html](bug.html)。

裡面的 JavaScript 程式碼存在一個錯誤，但他被隱藏在一般使用者眼皮底下，所以現在來打開開發者工具看看這個錯誤吧。

按下 `key:F12`，若你使用 Mac 則用 `key:Cmd+Opt+J`。

開發者工具將會預設開啟於主控台（Console）分頁。

看起來像這樣：

![chrome](chrome.png)

開發者工具的具體樣貌取決於你的 Chrome 版本，它會隨著時間改變但應該都長差不多。

- 在這裡我們可以看到紅色標註的錯誤訊息，這個例子中，腳本內有一個未知的 "lalala" 指令。
- 在右邊有一個可以點擊連至原始碼的連結 `bug.html:12`，伴隨著產生錯誤的程式行數。

<<<<<<< HEAD
錯誤訊息底下，有一個藍色 `>` 符號，它代表著我們可以輸入 JavaScript 的 "命令行"。按下 `key:Enter` 來執行它們（用 `key:Shift+Enter` 來輸入多行指令）。
=======
Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

現在我們可以看到錯誤就夠了，晚點會於章節 <info:debugging-chrome> 再回到開發者工具並深入探討除錯這件事。

<<<<<<< HEAD
## Firefox、Edge 與其他
=======
```smart header="Multi-line input"
Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`. This way one can enter long fragments of JavaScript code.
```
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

多數其他瀏覽器使用 `key:F12` 打開開發者工具。

它們的觀感都差不多，一旦你知道怎麼使用其中一種（可以從 Chrome 開始），就可以輕鬆於其它之間切換。

## Safari

Safari（Mac 瀏覽器，Windows/Linux 不支援）有點不太一樣，我們需要先開啟 "開發者選單（Develop menu）"。

打開偏好設定（Preferences）並至 "進階（Advanced）" 面板，底部有一個勾選欄位：

![safari](safari.png)

現在 `key:Cmd+Opt+C` 可以開啟控制台。同樣地，注意最上方出現一個新的選單名為 "開發（Develop）"，有著許多指令與選項。

<<<<<<< HEAD
```smart header="輸入多行"
通常當我們輸入一行程式碼到控制台並按下 `key:Enter`，它就執行了。

要插入多行程式，按下 `key:Shift+Enter`，這樣就可以輸入長片段的 JavaScript 程式碼。
```

## 總結

- 開發者工具允許我們看到錯誤、執行指令、查看變數（variables）與更多其它事。
- 大多數 Windows 的瀏覽器可以經由按下 `key:F12` 開啟。Mac 上的 Chrome 需要 `key:Cmd+Opt+J`；Safari 要用 `key:Cmd+Opt+C`（需先啟用）。
=======
## Summary
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

現在我們準備好環境了，下一章開始我們將來闡述 JavaScript。

