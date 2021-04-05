# 慢的解法

我們可以計算所有可能的子總和。

最簡單的方法是取出每個元素並計算所有由它開始的子陣列總和。

舉個例，如 `[-1, 2, 3, -9, 11]`：

```js no-beautify
// 由 -1 開始：
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// 由 2 開始：
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// 由 3 開始：
3
3 + (-9)
3 + (-9) + 11

// 由 -9 開始：
-9
-9 + 11

// 由 11 開始：
11
```

該程式碼事實上會是個巢狀迴圈：外部迴圈遍歷陣列元素，而內部的則計數由目前元素開始的子總和。

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // 若我們沒拿到元素，回傳零

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

<<<<<<< HEAD
該解法的時間複雜度為 [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) 。換句話說，若我們增加兩倍的陣列大小，該演算法就會多花四倍的時間。
=======
The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

對於大陣列來說（1000、10000 或更多項目）該演算法可能導致嚴重的延遲。

# 快的解法

我們來遍歷陣列並在變數 `s` 中維持目前的元素部分總和。若 `s` 在某個時間點變成負值，那就指定 `s=0`。所有 `s` 中的最大值將會是答案。

若這個描述太模糊了，請直接看程式碼，夠簡短了：

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for..of arr 的每個 item
    partialSum += item; // 將它加入 partialSum
    maxSum = Math.max(maxSum, partialSum); // 記住最大值
    if (partialSum < 0) partialSum = 0; // 若為負則指定零
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

該演算法只需要遍歷陣列恰好一次，所以時間複雜度為 O(n)。

你可以在這裡找到更多關於該演算法的細節資訊：[Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem)。若覺得對於它如何運作依然沒那麼明顯，請追蹤上述例子中的演算法來看看它是如何運作的，這麼做會比任何文字還要有用。

