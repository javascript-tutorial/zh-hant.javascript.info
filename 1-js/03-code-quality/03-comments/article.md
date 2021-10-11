# 註解

如我們從章節 <info:structure> 所學，註解可以是由 `//` 開始的單獨一行，或是使用 `/* ... */` 的多行註解。

我們通常使用它們來描述程式碼是如何與為什麼會運作。

第一次寫註解應該會覺得很簡單，但菜鳥程式設計師通常會錯誤地使用它們。

## 不佳的註解

初學者傾向於使用註解來解釋 "程式碼中發生什麼事"，像這樣：

```js
// 這段程式碼會這樣 (...) 和那樣 (...)
// ...但誰知道還有什麼其它事...
very;
complex;
code;
```

但在良好的程式碼中，這種 "解釋用途" 註解的數量應該要盡量少。嚴格來說，就算沒有這些註解，程式碼應該也要易於理解。

關於這點很棒的規則："若程式碼不清楚到需要幫它寫註解，那也許它應該要被改寫"。

### 訣竅：分解成函式

有時候將一段程式碼片段替換成函式會更有幫助，像這樣：

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // 確認 i 是否為質數
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

更好的寫法，使用分解出來的函式 `isPrime`：


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

現在我們可以更容易理解程式碼了。此函式本身變成了註解，這種程式碼被稱之為具有 *自我描述性（self-descriptive）*。

### 訣竅：建立函式

若我們有一個很長的 "程式碼片段（code sheet）"，像這樣：

```js
// 這邊我們加入威士忌
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// 這邊我們加入果汁
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

將它重構成函式會是更好的寫法，就像：

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

再次強調，函式本身就會告訴我們發生什麼事，所以不需要註解。而且拆開後的程式碼結構也變得更好了，它做了什麼、需要什麼和回傳什麼都變得很清楚。

事實上，我們無法完全避免 "解釋用途" 的註解。因為會有一些複雜的演算法，和一些做優化用的聰明 "調整" 存在。但一般來說我們應該試著維持程式碼簡單並具有自我描述性。

## 良好的程式碼

所以，解釋用途的註解通常不好，那怎樣才算是好？

描述架構
: 提供一個組件之間的高層次概況，它們是如何互動的，不同情況的控制流程是什麼... 簡單來說 -- 程式碼的鳥瞰圖。有種特殊的語言 [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) 可建立高層次架構圖用以解釋程式碼，值得一讀。

將函式參數和用途寫入文件
: 有個特殊的語法 [JSDoc](http://en.wikipedia.org/wiki/JSDoc) 可以幫函式寫文件：用途、參數和回傳值。

<<<<<<< HEAD
<<<<<<< HEAD
    舉個例：
    ```js
    /**
     * Returns x raised to the n-th power.
     *
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    function pow(x, n) {
      ...
    }
    ```

    這種註解讓我們理解函式的用途，並且不用看內部的程式碼就可以正確地使用它們。

    對了，很多編輯器如 [WebStorm](https://www.jetbrains.com/webstorm/) 也可以看懂它們，並且提供自動完成和一些自動程式碼檢查。

    同樣的，有些工具像是 [JSDoc 3](https://github.com/jsdoc3/jsdoc) 可以由註解產生 HTML 文件，你可以在 <http://usejsdoc.org/> 閱讀更多 JSDoc 的資訊。
=======
For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.
>>>>>>> 71120d5968cec3103743014cf563e0f7c8045a16

為什麼任務要用這種方式處理？
: 寫下了什麼是很重要的，但什麼 *沒被* 寫下的東西可能對於想理解發生什麼事來說更為重要。為什麼這個任務一定得使用這種方式處理？程式碼中可能得不到答案。
=======
For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

    若有多種解決任務的方法，為什麼選了這種？尤其當它並非是最明顯的一個時。

    沒有這種註解的話，底下這些情況就可能會發生：
    1. 你（或你同事）打開一段時間前寫的程式碼，並發現它 "並非最佳解"。
    2. 你想著："我當初怎麼這麼蠢，還好我現在聰明多了"，並且使用 "更明顯且正確" 的寫法改寫它。
    3. ...改寫的衝勁是好的，但在過程中你發現 "更明顯" 的解法其實有所不足，甚至你依稀想起為什麼不行，因為你很久之前早就試過了。接著你把程式碼恢復原樣，但時間早已被浪費掉。

    解釋解法的註解是非常重要的，它們有助於在正確的道路上開發。

程式碼中有著微妙的功能？它們被用在哪？
: 若程式碼內有任何微妙且違反直覺的東西，那就值得註解下來。

## 總結

一個良好開發者的重要指標之一就是其所寫的註解：知道何時該寫註解，何時不必寫。

良好的註解讓我們更好維護程式碼，在隔段時間後回來看它依然可以有效率的使用。

**註解這些：**

- 整體架構，高層次觀點。
- 函式的使用。
- 重要的解法，特別是那些不那麼立即明顯的。

**避免註解這些：**

- 告訴你 "程式碼如何運作" 和 "它做了什麼"。
- 只有在沒辦法讓程式碼夠簡單並具有自我描述性質的時候，才需要使用註解。

註解也可以被像是 JSDoc3 之類的自動文件工具所使用：可以讀懂註解並生成 HTML 文件（或其它格式）。

