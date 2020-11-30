這邊來解釋一下。

1. 這是正規的物件方法呼叫。

2. 同樣地，括號在此不變更操作順序，句點無論如何都會先執行。

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
3. 此處我們有個更為複雜的呼叫 `(expression).method()`。這個呼叫就像被拆成兩行一樣：
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

    ```js no-beautify
    f = obj.go; // 計算表達式
    f();        // 呼叫擁有的東西
    ```

    此處 `f()` 被視為函式執行，且不帶有 `this`。

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
4. 與 `(3)` 是類似的事情，在句點 `.` 左側我們有個表達式。
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

要解釋 `(3)` 和 `(4)` 的行為，我們需要回想屬性存取運算子（句點或方括號）回傳的是參考類型的值。

任何除了方法呼叫以外的任意操作（像是指定 `=` 或 `||`） 都會把它轉為不能設定 `this` 資訊的一般值。

