importance: 4

---

# 大寫常數？

檢查底下程式碼：

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
在這裡我們有個日期常數 `birthday`，和經由 `birthday` 與其他程式碼（為了保持簡化這邊不提供，因為也不重要）計算出的 `age` 常數。
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

對於 `birthday` 使用大寫命名是正確的嗎？對於 `age` 呢？或者乾脆兩者都用？

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // 用大寫命名?

const AGE = someCode(BIRTHDAY); // 用大寫命名？
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```
