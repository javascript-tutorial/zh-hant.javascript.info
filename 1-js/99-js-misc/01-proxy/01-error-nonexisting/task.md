# Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
<<<<<<< HEAD
alert(user.age); // ReferenceError: Property doesn't exist "age"
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
*/!*
```
