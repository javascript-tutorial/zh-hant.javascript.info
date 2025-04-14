
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
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
  .catch(alert); // Error: 404
```
