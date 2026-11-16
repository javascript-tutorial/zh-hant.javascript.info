有許多演算法可以完成這次課題。

使用一個巢狀迴圈的虛擬碼：

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

使用標籤的程式碼：

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}
```

有很多可以優化的空間。舉個例，我們可以從 `2` 到 `i` 的平方根中尋找除數。但總之，若我們想要在大區間內具有高效運算，我們必須改變作法，且依賴高階數學與複雜演算法，像是：[Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve)、[General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) 等等。

