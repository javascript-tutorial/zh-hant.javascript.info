importance: 5

---

# 改寫 'if..else' 成 '?'

使用多個三元運算子 `'?'` 改寫 `if...else`。

為了閱讀性，建議把程式碼拆成多行。

```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```

