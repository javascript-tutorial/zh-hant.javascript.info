反引號把放在 `${...}` 中表達式的結果嵌入字串中。

```js run
let name = "Ilya";

// 表達式是數值 1
alert( `hello ${1}` ); // hello 1

// 表達式是字串 "name"
alert( `hello ${"name"}` ); // hello name

// 表達式是個變數，嵌入它
alert( `hello ${name}` ); // hello Ilya
```
