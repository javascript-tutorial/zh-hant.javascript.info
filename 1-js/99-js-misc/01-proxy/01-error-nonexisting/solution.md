
```js run
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // John
<<<<<<< HEAD
alert(user.age); // ReferenceError: Property doesn't exist "age"
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
```
