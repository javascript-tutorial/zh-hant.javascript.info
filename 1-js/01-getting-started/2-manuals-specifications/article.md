# 操作手冊和規格書

這本書是個 *教程*，主要是幫助你漸漸地學會這門語言，一旦你熟悉了基礎，你將會需要更多其他的資源。

## 規格書

[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) 規格書包含了 JavaScript 最深入、詳細以及形式化的資訊。它定義了這門語言。

但就因為它太形式化了，一開始你會很難讀得懂。如果你需要關於這門語言最可靠的資源，來看規格書就對了，但它不太適合你拿來日常使用。

每年都會有新規格版本釋出，這些釋出版本之間的最新規格草案在這 <https://tc39.es/ecma262/>。

如果你想知道最尖端的功能，包含那些 "即將成為標準"（所謂 "stage 3"）的功能，可以看一下 <https://github.com/tc39/proposals>。

同樣地，假如你在開發瀏覽器相關的功能，我們也有在此教程的 [第二部分](info:browser-environment) 介紹相關的規格書。

<<<<<<< HEAD
## 操作手冊
=======
Also, if you're developing for the browser, then there are other specifications covered in the [second part](info:browser-environment) of the tutorial.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

- **MDN (Mozilla) JavaScript Reference** 是一個包含了範例以及其他資訊的操作手冊，很適合拿來獲取個別函式或是方法的深入資訊。

<<<<<<< HEAD
    你可以在這裡找到 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>。
=======
- **MDN (Mozilla) JavaScript Reference** is the main manual with examples and other information. It's great to get in-depth information about individual language functions, methods etc.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

    不過，透過網路搜尋通常會是較好的選擇。使用在搜尋列打入 "MDN [關鍵字]" 的方式，比如你要搜尋 `parseInt` 這個函式，可以用 <https://google.com/search?q=MDN+parseInt>。

<<<<<<< HEAD
- **MSDN** – 微軟釋出的操作手冊，包含了一堆 JavaScript（通常是指 JScript）的資訊。如果你需要開發跟 Internet Explorer 有關的功能，最好參考此處： <http://msdn.microsoft.com/>。

    當然，我們也可以透過網路搜尋來找到我們需要的資訊，比如 "RegExp MSDN" 或是 "RegExp MSDN jscript"。

## 兼容表

JavaScript 是一個持續開發中的語言，它定期會被加入一些新功能。
=======
Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for `parseInt` function.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

想知道瀏覽器或是其他引擎的支援程度，可以參考：

- <http://caniuse.com> - 列出每一個功能的支援程度，比如：查找哪個引擎支援現代的編碼功能：<http://caniuse.com/#feat=cryptography>。
- <https://kangax.github.io/compat-table> - 一個列出所有功能以及每個引擎支援程度的表。

所有這些資訊對於實務開發都是很有用的，因為他們包含了非常有價值的資訊，比如支援程度跟語言的細節等。

當你需要比較深入的資訊或是需要了解一些特定的功能時，請記得使用這些資訊（或是此頁）。

