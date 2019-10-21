該測試演示了開發者在寫測試時遇到的某種嘗試。

這邊我們實際上有三個測試，但卻只用單一個函式來寫三句斷言。

有時候這種方式更容易寫，但若問題產生時，想知道是什麼出問題也就更不明顯了。

若錯誤發生在複雜執行流程的中間，那我們得知道那個時間點的資料是什麼。我們實際上就必須 *除錯該測試*。

將測試打散為多個清楚寫下輸出輸入的 `it` 區塊會更好。

像這樣：

```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

我們替換單一個 `it` 成 `describe` 並組合 `it` 區塊們。現在若有東西失敗了，我們將可以清楚看出資料是什麼。

同樣地，我們可以經由寫下 `it.only` 而非 `it`，以分離單一測試並在獨立模式中執行它：

```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha 將只運行這個區塊
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

