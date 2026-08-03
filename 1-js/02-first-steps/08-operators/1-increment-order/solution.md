答案是：

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

```js run no-beautify
let a = 1, b = 1;

alert( ++a ); // 2，前置型式回傳新的值
alert( b++ ); // 1，後置型式回傳舊的值

alert( a ); // 2，遞增一次
alert( b ); // 2，遞增一次
```

