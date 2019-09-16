# 操作手冊和規格書

這本書是個 *教程*，主要是幫助你漸漸地學會這門語言，一旦你熟悉了基礎，你將會需要更多其他的資源。

## 規格書

[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) 規格書包含了 JavaScript 最深入、詳細以及形式化的資訊。事實上它就定義了這門語言。

<<<<<<< HEAD
但就因為它太形式化了，一開始你會很難讀得懂。如果你需要關於這門語言最可靠的資源，來看規格書就對了，但它不太適合你拿來日常使用。
=======
[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) contains the most in-depth, detailed and formalized information about JavaScript. It defines the language.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

每年都會有特定的新版本釋出，若想看不同的釋出版本的最新草案可以看這 <https://tc39.es/ecma262/>。

<<<<<<< HEAD
如果你想知道最尖端的功能，包含那些 "即將成為標準"（所謂 "stage 3"）的功能，可以看一下 <https://github.com/tc39/proposals>。
=======
A new specification version is released every year. In-between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

同樣地，假如你在開發瀏覽器相關的功能，我們也有在此教程的 [第二部分](info:browser-environment) 介紹相關的規格書。

## 操作手冊

- **MDN (Mozilla) JavaScript Reference** 是一個包含了範例以及其他資訊的操作手冊，很適合拿來獲取個別函式或是方法的深入資訊。

    你可以在這裡找到 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>。

    不過，透過網路搜尋通常會是較好的選擇。使用在搜尋列打入 "MDN [關鍵字]" 的方式，比如你要搜尋 `parseInt` 這個函式，可以用 <https://google.com/search?q=MDN+parseInt>。

- **MSDN** – 微軟釋出的操作手冊，包含了一堆 JavaScript（通常是指 JScript）的資訊。如果你需要開發跟 Internet Explorer 有關的功能，最好參考此處： <http://msdn.microsoft.com/>。

    當然，我們也可以透過網路搜尋來找到我們需要的資訊，比如 "RegExp MSDN" 或是 "RegExp MSDN jscript"。

## 兼容表

JavaScript 是一個持續開發中的語言，它定期會被加入一些新功能。

想知道瀏覽器或是其他引擎的支援程度，可以參考：

- <http://caniuse.com> - 列出每一個功能的支援程度，比如：查找哪個引擎支援現代的編碼功能：<http://caniuse.com/#feat=cryptography>。
- <https://kangax.github.io/compat-table> - 一個列出所有功能以及每個引擎支援程度的表。

所有這些資訊對於實務開發都是很有用的，因為他們包含了非常有價值的資訊，比如支援程度跟語言的細節等。

當你需要比較深入的資訊或是需要了解一些特定的功能時，請記得使用這些資訊（或是此頁）。

