

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

答案解析:

1. 數字間的大小比較，很顯然答案為 true。
2. 按字典順序比較，因此為 false。
3. 與上題相同，按字典順序比較，第一個字母 `"2"` 大於另一個字串的第一個字母 `"1"`。
4. `null` 與 `undefined` 彼此相等。
5. 嚴格比較下，比較不同類別的值會得到 false。
6. 與`（4）` 相仿，`null` 只與 `undefined` 相等。
7. 嚴格比較下，不同類別的值會直接回傳 false。
