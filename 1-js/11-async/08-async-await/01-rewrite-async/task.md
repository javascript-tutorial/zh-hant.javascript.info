
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
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
  .catch(alert); // Error: 404
```
