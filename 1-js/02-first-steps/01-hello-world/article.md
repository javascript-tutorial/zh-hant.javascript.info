# Hello, world!

這部份的教學是關於 JavaScript 的核心，討論的是這個語言自身。

話雖如此，我們還是需要一個執行環境來運行我們的腳本 (scripts)，而由於本書是線上教學，瀏覽器做為執行環境看起來是一個好選擇。我們會盡可能地減少僅限於瀏覽器的指令 (像是 `alert`)，讓你在其他環境 (像是 Node.js) 運行時，不必多花心力在這些指令上面。有關於在 JavaScript 在瀏覽器中運行的細節會在[之後的章節](/ui)介紹。

首先，讓我們看看如何在一個網頁中添加腳本。在伺服器端 (像是 Node.js)，你可以用 `"node my.js"` 來運行你的指令。

## "script" 標籤

JavaScript 程式可以使用 `<script>` 標籤插入到 HTML 文件的任何地方。

舉例來說:

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

`<script>` 標籤尚有一些不常用的屬性，你可以在陳年的程式碼中見到它們:

`type` 屬性: <code>&lt;script <u>type</u>=...&gt;</code>
: 在舊的 HTML4 標準中，`<script>` 標籤中的 `type` 屬性是必填的。通當它的值會是 `type="text/javascript"`。 現在這個屬性已經不是必填。而且在現今的 HTML 標準中，這個屬性的內在含義已經完全不同了。現在這個屬性可以被用於 JavaScript 模組 (modules)，這是一個進階的主題，我們會在另外的章節詳細介紹。

`language` 屬性: <code>&lt;script <u>language</u>=...&gt;</code>
: 這個屬性是為了表示此腳本所用的語言。在 JavaScript 如今已經變成了預設語言的情況下，這個屬性已沒有意義且不再使用了。

腳本前後的註解
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    This trick isn't used in modern JavaScript. These comments hid JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.


## External scripts

If we have a lot of JavaScript code, we can put it into a separate file.

Script files are attached to HTML with the `src` attribute:

```html
<script src="/path/to/script.js"></script>
```

Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

To attach several scripts, use multiple tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
As a rule, only the simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.

This won't work:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

We must choose either an external `<script src="…">` or a regular `<script>` with code.

The example above can be split into two scripts to work:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## 總結

- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
