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

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):

```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

  That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.

- The global object has a universal name `globalThis`.

  ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).

- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
