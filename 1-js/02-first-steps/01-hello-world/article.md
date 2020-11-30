# Hello, world!

這部份的教程是關於 JavaScript 的核心，討論的是這個語言自身。

話雖如此，我們還是需要一個執行環境來運行我們的腳本（scripts）。由於本書是線上教學，瀏覽器做為執行環境看起來是一個好選擇。我們會盡可能地減少僅限於瀏覽器的指令（像是 `alert`），讓你在其他環境（像是 Node.js）運行時，不必多花心力在這些指令上面。有關於 JavaScript 在瀏覽器中運行的細節會在[之後的章節](/ui)介紹。

首先，讓我們看看如何在一個網頁中添加腳本。在伺服器端（像是 Node.js），你可以用 `"node my.js"` 來運行你的指令。


## "script" 標籤

<<<<<<< HEAD
JavaScript 程式可以使用 `<script>` 標籤插入到 HTML 文件的任何地方。
=======
JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

舉例來說：

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
你可以透過點擊上面方框右上角的 "播放" 按鈕來執行這個範例。
```

當瀏覽器遇到了 `<script>` 標籤，這個標籤中所包含的 JavaScript 程式碼會被自動執行。


## 現代化標記

`<script>` 標籤尚有一些不常用的屬性，你可以在陳年的程式碼中見到它們：

<<<<<<< HEAD
`type` 屬性：<code>&lt;script <u>type</u>=...&gt;</code>
: 在舊的 HTML4 標準中，`<script>` 標籤中的 `type` 屬性是必填的，通常它的值會是 `type="text/javascript"`，目前這個屬性已經不是必填了。而且在現今的 HTML 標準中，這個屬性的內在含義已經完全不同，現在這個屬性可以被用於 JavaScript 模組（modules），這是一個進階的主題，我們會在另外的章節詳細介紹。
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic, we'll talk about modules in another part of the tutorial.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

`language` 屬性：<code>&lt;script <u>language</u>=...&gt;</code>
: 這個屬性是為了表示此腳本所用的語言。在 JavaScript 如今已經變成了預設語言的情況下，這個屬性已沒有意義且不再使用了。

腳本前後的註解
: 在真的很古早的書籍和指南中，你或許可以在 `<script>` 標籤內看到註解（comments），像是：

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    此用法在現代的 JavaScript 已不復見。這些註解是為了替不支援 `<script>` 標籤的瀏覽器隱藏 JavaScript 程式碼。而由於近 15 年來的瀏覽器都不會有這個問題，這種註解反倒可以幫你分辨真正過時的程式碼。

## 外部腳本

如果我們有大量的 JavaScript 程式碼，我們可以將它們放在一個單獨的檔案中。

腳本檔案可以通過 `src` 屬性添加到 HTML 檔案中：

```html
<script src="/path/to/script.js"></script>
```

這邊的 `/path/to/script.js` 代表從網站根目錄開始，腳本檔案的絕對路徑，我們也可以提供相對於當前頁面的相對路徑。舉例來說，`src="script.js"` 指的是目前資料夾中的一個 `"script.js"` 檔案。

我們也可以提供完整的 URL，例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

如果要添加多個腳本，請使用多個標籤：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
一般來說，只有簡單的腳本適合直接寫在 HTML 中。比較複雜的腳本請放在獨立的檔案。 

使用獨立的檔案的好處是，瀏覽器會下載它且將之存入 [快取（cache）](https://en.wikipedia.org/wiki/Web_cache)。

而當其他頁面需要使用同一份腳本時，就會省略下載而從快取中拿取，這個腳本實際上只被下載了一次。

這可以減少流量而使頁面讀取變快。
```

````warn header="如果 `src` 屬性被設置了，`script` 標籤中的內容將會被忽略"
`<script>` 標籤不能同時含有 `src` 屬性以及包在其中的程式碼。

這樣寫不會有作用：

```html
<script *!*src*/!*="file.js">
  alert(1); // 因為 src 被設置了，此段內容將會被忽略
</script>
```

我們只能在二者中擇一，選擇引用外部資源像是 `<script src="…">` ，或是直接編寫程式碼在 `<script>` 中。

如果要讓上方的範例可以正常運行，請分開寫成兩段：

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````


## 總結

- 使用 `<script>` 標籤在頁面上添加 JavaScript 程式碼。
- 不再需要 `type` 及 `language` 屬性了。
- 使用 `<script src="path/to/script.js"></script>` 來引入外部腳本。

對於瀏覽器和腳本在頁面上的交互作用還有很多等著我們學習。但請記得，此部份的教程還是關注在 JavaScript 語言本身，我們暫時先不岔題到各個瀏覽器的實作。我們的確是用瀏覽器當做一種 JavaScript 的執行環境，只是因為在線上閱讀時更方便使用，但它只是多種環境的其中一種。
