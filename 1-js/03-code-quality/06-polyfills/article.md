
# Polyfills and transpilers

    JavaScript 語言穩定發展。有關該語言的新提案會定期出現，他們會被分析，而且如果被認為有價值，則會新增到 <https://tc39.github.io/ecma262/> 的列表中，然後進展至 [規格](http://www.ecma-international.org/publications/standards/Ecma-262.htm)。

    JavaScript 引擎背後的團隊對於首先實現什麼有自己的想法。他們可能會決定先實做草案中的提案，反而推延規格中已經存在的提案，因為它們不那麼有趣或純粹只是比較難做。

    因此，引擎僅實現部分標準是很普遍的。

    <https://kangax.github.io/compat-table/es6/> 是一個很好的頁面，可以看到目前對語言功能的支援狀態（它很多，我們還有很多要研究）。

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
    當我們使用語言的現代功能時，某些引擎可能無法支援這類型的程式碼。就像之前說的，並非所有功能都在各處實現。

    Babel 是一帖良方。

    [Babel](https://babeljs.io) 是一個 [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)。它將現代的 JavaScript 程式碼重寫成符合舊版的標準。

    實際上，Babel 有兩個部分：

<<<<<<< HEAD
    1. 首先，是 transpiler 程序，該程序重寫程式碼。開發人員在自己的電腦上運行它。它將程式碼重寫為較舊的標準。然後將程式碼交付給用戶的網站。諸如 [webpack](http://webpack.github.io/) 之類的現代專案建置系統提供了每次程式碼變更時自動運行 transpiler 的方法，因此極易整合到開發過程。
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that it's very easy to integrate into development process.
>>>>>>> 71120d5968cec3103743014cf563e0f7c8045a16

2. 第二，polyfill。

    新的語言功能可能包括新的內置函數和語法構件。
    Transpiler 重寫程式碼，將語法構件轉換為較舊的語法。但是對於新的內置函數，我們需要實現它們。JavaScript 是一種高度動態的語言，腳本可以新增／修改任何函式，以便它們按照現代標準運行。

更新/增加 新功能的腳本稱為 "polyfill"。它 "填補" 了差距，並增加了缺少的實作。

    兩個有趣的 polyfill 是：
    - [core js](https://github.com/zloirock/core-js) 支援很多功能，允許僅包含所需的功能。
    - [polyfill.io](http://polyfill.io) 服務根據功能和使用者的瀏覽器提供帶有 polyfills 的腳本。

因此，如果我們要使用現代語言功能，則需要 transpiler 和 polyfill。

## 教程中的範例

````online
大多數範例都可以在原地運行，如下所示：
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
只有您的瀏覽器支援時，使用現代 JS 的範例才有效。
````

```offline
在閱讀離線版本時，PDF 中的範例不可運行。在 EPUB 其中有一些可以運行。
```

Google Chrome 通常有最新的語言功能，可以很好地運行尖端的演示，而無需任何 transpiler，不過其他現代瀏覽器也運作得還可以。
=======
In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" langauge features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
