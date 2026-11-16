importance: 2

---

# 鏈接呼叫（Chaining）

<<<<<<< HEAD
有個 `ladder` 物件允許向上或向下：
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // 顯示目前階梯
    alert( this.step );
  }
};
```

<<<<<<< HEAD
現在，若我們需要依序發出多個呼叫，可以像這樣做：
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
修改 `up`、`down` 和 `showStep` 的程式碼以使得呼叫為鏈接方式，像這樣：
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
這種作法在 JavaScript 函式庫內被廣泛地使用著。

=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
