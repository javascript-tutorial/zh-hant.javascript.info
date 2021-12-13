importance: 4

---

# Create keyed object from array

<<<<<<< HEAD
Let's say we received an array of users in the form `{id:..., name:..., age... }`.
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

Create a function `groupById(arr)` that creates an object from it, with `id` as the key, and array items as values.

For example:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// after the call we should have:

usersById = {
<<<<<<< HEAD
  john: {id: 'john', name: "John Smith", age: 20}
=======
  john: {id: 'john', name: "John Smith", age: 20},
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Such function is really handy when working with server data.

In this task we assume that `id` is unique. There may be no two array items with the same `id`.

Please use array `.reduce` method in the solution.
