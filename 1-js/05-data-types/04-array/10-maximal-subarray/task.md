importance: 2

---

# 最大子陣列

給予一個數值陣列，如 `arr = [1, -2, 3, 4, -9, 6]`。

此課題是：找出 `arr` 的某個項目連續的子陣列，其項目加總為最大。

寫一個函式 `getMaxSubSum(arr)` 並回傳該加總值。

<<<<<<< HEAD
舉個例：

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5（被標示項目的加總）
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6（全拿）
=======
For instance:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (take all)
```
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

若所有項目都是負值，代表我們不要拿任何東西（子陣列為空），所以加總為零：

```js
getMaxSubSum([-1, -2, -3]) = 0
```

請試著思考快速的解法：[O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) ，或者可以的話甚至可達 O(n)。

