
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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  .catch(alert); // Error: 404
```
