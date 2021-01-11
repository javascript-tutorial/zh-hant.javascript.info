# 使用 Mocha 自動化測試

自動化測試將會在未來的任務中被使用，且也會在真實專案上被廣泛地使用。

## 為什麼我們需要測試？

當我們寫下一個函式，我們通常可以想像它應該要做些什麼：哪些參數會給出哪些結果。

在開發中，我們可以經由執行它得到的結果來跟預期做比較，並檢查該函式。例如，我們可以在主控台中這樣做。

若有東西不對勁 -- 那我們會修復程式碼、再次執行並檢查結果 -- 持續這流程直到它運作正常。

但這種手動 "重新執行" 並不完美。

**當經由手動重新執行來測試一段程式碼時，很容易就會漏掉東西。**

舉個例，我們要建立一個函式 `f` 時，寫下一些程式碼並進行測試：`f(1)` 可以運作，但 `f(2)` 不運作。我們修復程式碼，現在 `f(2)` 可以運作了。看起來完成了嗎？但我們忘記重新再測一次 `f(1)`，那也許會導致錯誤。

這是非常典型的案例。當我們開發某些東西時，會在心中保有很多可能的使用情境。但很難預期程式設計師會在每次更動後，都手動去檢查全部。所以很容易會變成修好一個卻壞另一個的情況。

**自動測試意味著，測試是在程式碼之外被分開寫下的。它們會以多種方式執行我們的函式，並跟將結果跟預期做比較。**

## 行為驅動開發（Behavior Driven Development, BDD）

讓我們從一個稱為 [行為驅動開發（Behavior Driven Development）](http://en.wikipedia.org/wiki/Behavior-driven_development) ，或簡稱 BDD，這樣的技術開始吧。

**BDD 將三件事合一：測試、文件、範例。**

為了理解 BDD，我們要來檢視一個開發過程的實際案例

## "pow" 的開發：規格

若我們想要建立一個函式 `pow(x, n)` 來算 x 的整數 `n` 次方，假設 `n≥0`。

這個任務就只是個例子而已：JavaScript 有個 `**` 運算子可以做這件事，但這邊我們專注於開發的流程，這樣也可以套用在更複雜的任務上。

在建立 `pow` 的程式碼之前，我們想像該函式應該要做什麼並描述它。

這樣的描述被稱為 *規格（specification）*，或簡稱 spec，包含著使用情境的描述與它們的測試，像這樣：

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

從上面你可以發現一份規格有三個主要的建構區塊：

`describe("title", function() { ... })`
: 代表我們正在描述什麼樣的功能。在我們的例子中描述的是 `pow` 這個函式。用來組合 "workers" -- 也就是 `it` 區塊。

`it("use case description", function() { ... })`
: 在 `it` 的標題中，我們使用 *人類可讀的方式* 來描述特定的使用情境，而第二個引數是用來測試它的函式。

`assert.equal(value1, value2)`
: 在 `it` 區塊中的程式碼。若其實作正確，應該要執行無誤。

    函式 `assert.*` 用來檢查 `pow` 是否按照期望運作。在此我們使用其中的一種 -- `assert.equal`，它會比較引數們並在不相等時宣告錯誤，這邊它檢查了 `pow(2, 3)` 的結果是否等於 `8`。還有其它比較和檢查的類型，我們晚點會再加進來。

這份規格可以被執行，然後它會運行 `it` 區塊中的測試，我們晚點就會看到。

## 開發流程

開發流程通常看起來像這樣：

1. 寫下最初規格，測試最為基本的功能。
2. 建立最初實作。
3. 要檢查它是否運作，我們執行測試框架 [Mocha](http://mochajs.org/)（很快就有更多細節）來運行規格。當功能尚未完成時，錯誤會被顯示出來，我們得持續修正直到一切運作正常為止。
4. 現在我們有一份經過測試可運作的實作了。
5. 我們加入更多使用情境到規格中，也許某些在目前的實作中尚未支援，所以測試將會失敗。
6. 回到 3，更新實作直到測試無誤為止。
7. 重複步驟 3-6 直到功能齊全為止。

所以，開發是 *迭代的*。我們寫下規格、實作它、保證通過測試、然後再寫更多測試、確認它們無誤等等。最後我們將擁有運行正常的實作與其測試。

在我們的實際例子中來看看這個開發流程。

第一步已經完成了：對於 `pow` 我們已經有初始的規格。現在，在開始實作之前，來用些 JavaScript 函式庫運行測試，看看它們是否運作正常（全部都會失敗）。

## 實作規格

在教程中我們將使用以下 JavaScript 函式庫做測試：

- [Mocha](http://mochajs.org/) -- 核心框架：它提供包含 `describe` 和 `it` 的常見測試函式，與運行測試的主函式。
- [Chai](http://chaijs.com) -- 有許多斷言的函式庫。它可以使用很多不同的斷言，現在我們只需要 `assert.equal`。
- [Sinon](http://sinonjs.org/) -- 該函式庫可監控函式、模擬內建函式與其它功能，我們稍後會需要它。

這些函式庫用於瀏覽器端或是伺服器端的測試都很適合，在此我們用在瀏覽器上。

含有這些框架與 `pow` 規格的完整 HTML 頁面：

```html src="index.html"
```

該頁面可被分為四個部分：

1. `<head>` -- 增加測試的第三方函式庫與樣式。
2. `<script>` 內要被測試的函式，在我們的例子中是 -- `pow` 的程式碼。
3. 測試 -- 在我們的例子中是外部腳本 `test.js`，包含上述的 `describe("pow", ...)`。
4. HTML 元素 `<div id="mocha">` 將被用於輸出 Mocha 的結果。
5. 測試將由命令 `mocha.run()` 啟動。

結果：

[iframe height=250 src="pow-1" border=1 edit]

目前，測試是失敗的，有個錯誤存在。這符合邏輯：我們只有一個空函式 `pow`，所以 `pow(2, 3)` 回傳 `undefined` 而非 `8`。

為了將來，讓我們留意一下還有更多高層次的測試工具，像是 [karma](https://karma-runner.github.io/) 和其它，可以簡單地自動執行多種測試。

## 初始實作

為了讓測試通過，來簡單實作一下 `pow` 吧：

```js
function pow(x, n) {
  return 8; // :) 我們作個弊！
}
```

哇喔，現在它運作了！

[iframe height=250 src="pow-min" border=1 edit]

## 改進規格

我們做的事絕對是作弊，函式不會有作用：嘗試計算 `pow(3, 4)` 就會給出不對的結果，但測試卻通過了。

...然而這種情況卻是相當典型的，在實際中常發生。測試通過，但函式運行錯誤。我們的規格不完美，需要為它增加更多的使用情境。

來多加一個測試檢查 `pow(3, 4) = 81` 吧。

這裡我們可以兩個方法選一個來組織測試：

1. 第一種 -- 多加一個 `assert` 到同樣的 `it` 內：

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. 第二種 -- 製作兩個測試：

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

原則上的不同在於當 `assert` 觸發錯誤時，`it` 區塊會立刻終止。所以，第一種寫法中，若第一個 `assert` 失敗了，那我們將永遠看不到第二個 `assert` 的結果。

讓測試分開對於獲取更多資訊是有幫助的，所以第二種寫法會更好。

此外，還有一個規則最好要遵守。

**一個測試檢查一件事。**

如果我們查看測試並發現兩個完全獨立的檢查，那最好將它拆分為兩個更簡單的測試。

所以，讓我們繼續用第二種寫法。

結果：

[iframe height=250 src="pow-2" edit border="1"]

<<<<<<< HEAD
<<<<<<< HEAD
如我們所預期，第二個測試失敗了。當然，我們的函式總是回傳 `8`，然而 `assert` 預期的是 `27`。
=======
As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.
>>>>>>> 71120d5968cec3103743014cf563e0f7c8045a16
=======
As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

## 改進實作

讓我們寫些更真實的東西讓測試通過：

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

要確認函式運作正常，我們來測試更多的值。除了手動寫下 `it` 區塊以外，我們可以在 `for` 內生成它們：

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

結果：

[iframe height=250 src="pow-3" edit border="1"]

## 巢狀 describe

我們要來增加更多測試，但在那之前，注意輔助函式 `makeTest` 和 `for` 應該要被組合再一起。我們不會在其它測試中用到 `makeTest`，這只在 `for` 中需要而已：它們共同的任務就是檢查 `pow` 如何提升給予的冪次。

利用巢狀 `describe` 可以完成組合：

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... 從這可以寫更多的測試， describe 和 it 皆可加入
});
```

巢狀 `describe` 定義一個新的測試 "子群組"。在輸出中我們可以看到有著標題的縮排：

[iframe height=250 src="pow-4" edit border="1"]

未來我們可以在最上層使用自己的輔助函式加入更多的 `it` 和 `describe`，它們不會看到 `makeTest`。

````smart header="`before/after` 和 `beforeEach/afterEach`"
我們可以設定 `before/after` 在函式運行測試 前/後 執行，且也可用 `beforeEach/afterEach` 函式在 *每個* `it` 前/後 執行。

舉個例：

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

運行順序將會是：

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="在沙盒模式中開啟範例。"]

通常，`beforeEach/afterEach` 和 `before/after` 被用於執行初始化、歸零計數器、或是做些測試（測試群組）之間額外要做的事情。
````

## 延伸規格

`pow` 基礎的功能已完成，第一次開發迭代已經做完了。當我們慶祝且喝完香檳後 -- 來繼續改進它吧。

如它所述，函式 `pow(x, n)` 意味著運作在正整數 `n` 之上。

要指出數學錯誤，JavaScript 函式通常回傳 `NaN`，我們來為無效的 `n` 值做同樣的事吧。

先加入這行為到規格內(!)：

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

新測試的結果：

[iframe height=530 src="pow-nan" edit border="1"]

新加入的測試失敗了，因為我們的實作尚未支援它們。這就是 BDD 如何作用的：首先我們寫下失敗的測試，然後再完成它們的實作。

```smart header="其它斷言"
請注意斷言 `assert.isNaN`：它用於確認 `NaN`。

[Chai](http://chaijs.com) 中也有其它斷言，例如：

- `assert.equal(value1, value2)` -- 確認相等 `value1 == value2`。
- `assert.strictEqual(value1, value2)` -- 確認嚴格相等 `value1 === value2`。
- `assert.notEqual`, `assert.notStrictEqual` -- 上述的相反檢查。
- `assert.isTrue(value)` -- 確認 `value === true`
- `assert.isFalse(value)` -- 確認 `value === false`
- ...完整的列表在 [文件](http://chaijs.com/api/assert/)
```

所以我們應該在 `pow` 多加幾行：

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

現在它可以運作了，所有測試都通過：

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="在沙盒中打開最後完整的例子。"]

## Summary

在 BDD 中，規格先行，實作在後，最後規格與程式碼並具。

規格可以三種方式被使用：

1. 作為 **測試** - 它們保證程式碼運作正確。
2. 作為 **文件** -- `describe` 和 `it` 的標題說明了函式在做什麼。
3. 作為 **範例** -- 測試實際上運行範例來顯示函式如何被使用。

有了規格，我們可以安全的改進、更動、甚至重頭寫函式，且保證其依然運作正確。

當函式被用在大型專案中的多處時更是特別重要。當我們改變一個函式，是沒辦法只用手動檢查是否各個使用它的地方都運作順利的。

沒有測試時，會有兩種作法：

1. 無論如何就是更改。然後我們的使用者遇到錯誤，因為我們也許在手動測試某些東西時失敗了。
2. 或者，若發生錯誤的代價很高時，因為沒有測試，人們會變得畏懼修改這些函式，進而程式碼變得過時且沒人想動它，這對開發來說很不好。

**自動化測試有助於避免這些問題！**

若專案被測試保護著，就不會有這些問題了。在任何修改之後，我們可以執行測試並在幾秒內看到一大堆檢查。

**此外，測試良好的程式碼會有著更好的架構。**

理所當然地，這是因為被自動測試的程式碼更易於修改增進，但也有著其它的原因。

要寫測試，程式碼應該要用某種方式組織起來，該方式會讓每個函式有著清晰的任務描述，與定義良好的輸入輸出。這代表著從一開始就有良好的程式架構。

在現實生活中也許沒那麼簡單，有時候在真的寫程式碼之前，很難寫下其規格，因為它該有的行為還沒那麼清楚。但一般來說寫測試可以使得開發更快更穩。

在稍後的教程中，你會遇到很多包含測試的課題，所以你可以看到更多實際的例子。

寫測試需要良好的 JavaScript 知識，但我們才正要開始學習它。所以，為了學完所有事情，在這之前你還不會被要求寫測試，但你應該要已經有能力閱讀它們，就算它們看起來比本章中更為複雜些。

