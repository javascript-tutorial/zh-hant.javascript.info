
# 用箭頭函式重寫 

用箭頭函式取代下列程式碼中的函式表達式：

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
