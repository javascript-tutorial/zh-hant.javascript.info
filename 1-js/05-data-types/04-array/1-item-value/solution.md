結果是 `4`：

```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

這是因為陣列是個物件，所以 `shoppingCart` 和 `fruits` 這兩者皆是對同一個陣列的參考。

