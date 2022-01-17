# 介紹 JavaScript

<<<<<<< HEAD
一起來看看 JavaScript 有什麼特別的，我們能做些什麼，與哪些配合不錯的技術。
=======
Let's see what's so special about JavaScript, what we can achieve with it, and what other technologies play well with it.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

## 什麼是 JavaScript?

<<<<<<< HEAD
*JavaScript* 最初是為了 *"賦予網頁活力"* 而創造的。
=======
*JavaScript* was initially created to "make web pages alive".
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

這種程式語言我們稱之為 *腳本*，它們可以被寫入網頁 HTML 中，並在頁面讀取時自動執行。

腳本以純文字檔的型式被提供並執行，它們不需要特別的前置作業或編譯即可運作。

在這方面，JavaScript 和另一個稱為 [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) 的程式語言有很大的不同。

```smart header="為什麼叫 <u>Java</u>Script?"
當 JavaScript 剛誕生時原先有另一個名字： "LiveScript"。但 Java 在那時非常流行，因此被定位成一個 Java 的 "小弟" 將有助於推廣。

但隨著它發展，JavaScript 變成一個完全獨立的語言並有其規範 [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) ，現在它與 Java 之間沒有任何關係。
```

現在，JavaScript 不僅可執行於瀏覽器中，還可運作於伺服器上，或任何具有 [JavaScript 引擎](https://en.wikipedia.org/wiki/JavaScript_engine) 的裝置內。

瀏覽器內嵌有 JavaScript 引擎，有時也被稱為 "JavaScript 虛擬機"（JavaScript virtual machine）。

不同的引擎有不同的 "代號（codenames）"。例如：

<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome 和 Opera 內的引擎。
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox 內的引擎。
- ... 還有其他代號，像是不同版本 IE 使用的 "Trident" 與 "Chakra"、微軟 Edge 的 "ChakraCore"、Safari 的 "Nitro" 與 "SquirrelFish"，等等。

上面提到的代號最好可以記住，因為這些代號常被用於網路上的開發者文章，就像我們一樣。如："V8 支援某個 X 功能"，代表該功能在 Chrome 和 Opera 上應該可以運作。
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

```smart header="引擎怎麼運作的？"

引擎很複雜，但概念很簡單。

1. 引擎（瀏覽器內建）讀取（"解析"）腳本
2. 接著轉換（"編譯"）腳本為機器語言
3. 然後機器語言極快地執行

引擎會對流程中每個階段進行優化。甚至會在執行時監看編譯好的腳本，分析其資料流，並以此再優化機器碼。
```

## 瀏覽器中的 JavaScript 可以做什麼？

現代化 JavaScript 是個 "安全" 的程式語言。它不提供對記憶體或 CPU 的低階存取，因為它原生是為了瀏覽器而建立，所以不需要。

JavaScript 的能力很大一部分取決於執行它的環境。例如 [Node.js](https://wikipedia.org/wiki/Node.js) 提供 JavaScript 可以讀寫任意檔案與發送網路請求（network requests）等功能。

瀏覽器中的 JavaScript 可以做與網頁操作、使用者互動和網頁伺服器相關的任何事情。

例如，瀏覽器中的 JavaScript 能夠：

- 在頁面加入新的 HTML ，改變既有內容與樣式
- 與使用者互動，執行滑鼠點擊、游標移動和按鍵按壓
- 經由網路發送請求給遠端伺服器，下載並上傳檔案（亦稱為 [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) 和 [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) 技術）
- 取得與設定 cookies、詢問訪客和顯示訊息
- 記得客戶端（client-side）的資料（"local storage"）

## 瀏覽器中的 JavaScript **不能**做什麼？

<<<<<<< HEAD
為了使用者的資訊安全，JavaScript 在瀏覽器內的功能被限制。此為防範惡意網頁獲取私人資訊或損害使用者資料。
=======
JavaScript's abilities in the browser are limited for the sake of a user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

這些限制範例如下：

<<<<<<< HEAD
- 網頁上的 JavaScript 無法讀寫、複製和執行硬碟內任意檔案。它也沒有直接存取作業系統的功能。
=======
- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

    現代化瀏覽器允許 JavaScript 有限制地操作檔案，且只有在使用者做特定動作時提供，像是："拖曳" 一個檔案至瀏覽器視窗，或經由 `<input>` 標籤選取。

    JavaScript 有些方法可與相機、麥克風或其他裝置互動，但都需要使用者明確地授權。所以啟用 JavaScript 的網頁不會偷偷開啟相機觀察周遭並傳資料給 [美國國家安全局（NSA）](https://en.wikipedia.org/wiki/National_Security_Agency)。
- 不同的瀏覽器分頁/視窗基本上不知道彼此，但有時例外，例如：當一個視窗使用 JavaScript 開啟另一個視窗時。但就算如此，開啟不同網站（不同域名、通訊協定或埠）的頁面，其中的 JavaScript 亦無法溝通。

    這被稱為 "同源政策"（Same Origin Policy）。為了解決它，*兩個頁面* 都必須同意資料交換和包含一隻特殊的 JavaScript 程式碼來處理這件事。我們的教程將會包含這部分。

    再次強調，這個限制是為了使用者的資安考量。一個使用者從 `http://anysite.com` 打開的頁面不該能存取另一個瀏覽器分頁 `http://gmail.com` 內的資訊。
- JavaScript 可以簡單地經由網路與目前頁面來源的伺服器溝通。但它從別的網站/域名接收資料的能力受到限制。儘管可以也需要遠端明確地授權（在 HTTP headers 中）。再一次強調，這是為了資安而限制。

![](limitations.svg)

在瀏覽器以外的 JavaScript 就沒有這些限制，如：伺服器上的 JavaScript。現代化瀏覽器也允許插件/擴充套件要求額外權限。

## 是什麼讓 JavaScript 如此獨特？

至少有 *三項* JavaScript 很棒的事：

```compare
<<<<<<< HEAD
+ 與 HTML/CSS 完整整合
+ 簡單的事能夠簡單地完成
+ 所有主要瀏覽器支援且預設開啟
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad
```
在瀏覽器技術中，只有 JavaScript 能唯一滿足這三項。

這造就 JavaScript 如此獨特。這也是為什麼它是建立瀏覽器介面最為廣泛的工具。

此外，JavaScript 也可以建立伺服器和手機應用程式等等。

## JavaScript "之上" 的語言

JavaScript 的語法並不符合每個人的要求，不同人想要不同功能。

這是預期中的，因為每個人的計畫和需求都不一樣。

所以最近有大量新語言出現，它們在被瀏覽器執行前，都被 *轉譯*（transpiled）成 JavaScript。

現代化的工具讓轉譯迅速且透明，且實際上使開發者用另一種語言寫程式，再被自行轉換成 JavaScript。

例如這些語言：

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) 是組 JavaScript 的 "語法糖"。它有更簡短的語法，可以讓我們寫出更清楚且精確的程式碼，通常 Ruby 開發者愛用。
- [TypeScript](http://www.typescriptlang.org/) 致力於增加 "強型態確認（strict data typing）" 來簡化開發與支援複雜的系統，為微軟所開發。
- [Flow](http://flow.org/) 同樣增加型態確認但使用不同方式，為臉書所開發。
- [Dart](https://www.dartlang.org/) 是一種擁有自己引擎的獨立語言，它執行在非瀏覽器環境上（像是手機應用程式），但也可以轉譯成 JavaScript，為谷歌所開發。
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

還有更多其他語言。當然，就算我們使用某種轉譯式語言，我們應該也要了解 JavaScript 來真正知道我們在做什麼。

## 總結

- JavaScript 最初被建為只用在瀏覽器上的語言，但現在也被其他多種環境所使用。
- 至今 JavaScript 有著獨特的地位，它是在瀏覽器上最被廣泛採用的語言且與 HTML/CSS 完整整合。
- 有許多語言可被 "轉譯" 成 JavaScript 並提供特定的功能。建議在掌握 JavaScript 後可以稍微看看。

<<<<<<< HEAD
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad
