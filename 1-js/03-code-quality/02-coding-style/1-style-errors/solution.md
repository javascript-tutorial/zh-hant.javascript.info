
你可以注意到以下幾點：

```js no-beautify
function pow(x,n)  // <- 引數間沒有空格
{  // <- 大括號自成一行了
  let result=1;   // <- = 前後沒有空格
  for(let i=0;i<n;i++) {result*=x;}   // <- 沒有空格
  // { ... } 的內容應該要在新的一行
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- 技術上雖可行，
// 但最好還是拆成兩行，此外也沒有空格，又缺少分號 ;
if (n<0)  // <- 在 (n < 0) 缺少空格，而且應該在上方要有額外的一行
{   // <- 大括號自成一行了
  // 底下這行太長了，可以拆分成多行以增加可讀性
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- 可以像這樣 "} else {" 寫成一行
{
  alert(pow(x,n))  // 沒有空格且缺少分號 ;
}
```

修改後的寫法：

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```

