
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

解法較為複雜些，因為我們需要處理 `null`/空行。

因此我們實際上一直接收輸入的東西，直到它是個 "正常的數值" 為止。`null`（取消）和空行這兩者也都符合此條件，因為在數值格式中它們都是 `0`。

在我們停下來之後，需要是對 `null` 和空行特別對待（return `null`），因為轉換它們為數值將會回傳 `0`。

