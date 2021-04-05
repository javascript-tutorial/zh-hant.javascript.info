**答案：一個錯誤。**

試試看：

```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

這是因為設定 `this` 的規則並不看物件定義，只有呼叫那一刻才是重要的。

此處在 `makeUser()` 中 `this` 的值是 `undefined`，因為它被視為一個函式來呼叫，而不是使用 "句點" 語法呼叫的一個方法。

`this` 的值是對於整個函式而言的，程式碼區塊跟物件字面值皆不會影響它。

因此 `ref: this` 實際上拿到當前函式的 `this`。

<<<<<<< HEAD
這邊有個相反的情況：
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

現在它可以正常運作了，因為 `user.ref()` 是個方法，且 `this` 的值被設定為在句點 `.` 之前的那個物件。

