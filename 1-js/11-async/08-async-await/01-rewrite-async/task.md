
# Rewrite using async/await

Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

<<<<<<< HEAD
loadJson('no-such-user.json')
=======
loadJson('https://javascript.info/no-such-user.json')
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
  .catch(alert); // Error: 404
```
