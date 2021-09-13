

# 介紹： 回呼

```warn header="We use browser methods in examples here"
<<<<<<< HEAD
為了示範回呼、promise 及其他抽象概念的使用，我們將會使用一些瀏覽器的函式：更具體地說，載入腳本以及執行簡單的文件操作。

如果你並不熟悉這些方法，亦或是對於範例中的使用方式感到困惑，你可能會想要閱讀[下一部分](/document)教程中的一些章節。

儘管如此，我們還是會試著讓事情保持單純。不會有任何瀏覽器方面的複雜事物。
```

許多函式是由 JavaScript 的執行環境所提供，這些函式允許你安排*非同步*的動作。換句話說，我們現在啟動的動作，將在未來的某一刻完成。

舉例來說， `setTimeout` 就是一個這樣的函式。
=======
To demonstrate the use of callbacks, promises and other abstract concepts, we'll be using some browser methods: specifically, loading scripts and performing simple document manipulations.

If you're not familiar with these methods, and their usage in the examples is confusing, you may want to read a few chapters from the [next part](/document) of the tutorial.

Although, we'll try to make things clear anyway. There won't be anything really complex browser-wise.
```

Many functions are provided by JavaScript host environments that allow you to schedule *asynchronous* actions. In other words, actions that we initiate now, but they finish later.

For instance, one such function is the `setTimeout` function.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

真實世界中，還有其它非同步動作的例子。像是載入腳本及模組（我們會在後續的章節中介紹它們）。

看看下面的 `loadScript(src)` 函式，它載入了指定 `src` 位置的腳本：

```js
function loadScript(src) {
<<<<<<< HEAD
  // 建立一個 <script> 標籤，然後將它加到頁面上
  // 這會讓 src 位置的腳本，開始被載入，並且在載入完成後開始執行
=======
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

<<<<<<< HEAD
這新的、動態生成的標籤 `<script src="…">` 將從給予的 `src` 加到文件中。瀏覽器自動地開始載入它，並在載入完成後執行它。
=======
It inserts into the document a new, dynamically created, tag `<script src="…">` with the given `src`. The browser automatically starts loading it and executes when complete.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

我們可以像這樣使用這個函式：

```js
// 載入並執行給定路徑的腳本
loadScript('/my/script.js');
```

腳本以〝非同步〞的方式被執行，因為它現在開始被載入，但在函式已結束之後才會執行。

如果有任何程式碼在 `loadScript(…)` 下方，它不會等到腳本載入完成後才執行。

```js
loadScript('/my/script.js');
// 在 loadScript 下方的程式碼，不會等待腳本載入完成才執行
// ...
```

倘若我們想要在腳本載入完成後馬上使用它。也就是腳本宣告了新的函式，而我們想要執行它們。

但是如果我們馬上在 `loadScript(…)` 呼叫後這麼做，是行不通的。：

```js
loadScript('/my/script.js'); // 腳本有 "function newFunction() {…}"

*!*
newFunction(); // 沒有這個函式！
*/!*
```

顯然，瀏覽器沒有足夠的時間載入腳本。至此， `loadScript` 函式尚未提供某種方式來追蹤載入完成了沒。我們只知道，腳本終究會載入並執行。但我們希望知道完成的時機點，以便使用來自該腳本的新函式及新變數。

讓我們新增一個 `callback` 函式到 `loadScript` 中，作為第二個參數使用，這個函式應當在腳本載入完成後執行。：

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

現在，如果我們想要呼叫來自腳本的新函式，我們應該要將它寫在回呼當中：

```js
loadScript('/my/script.js', function() {
  // 回呼在腳本載入後執行
  newFunction(); // 現在，它能運作了
  ...
});
```

這就是它的概念：第二個參數是一個函式（通常是匿名的），它會在動作完成後被執行。

這是一個實際腳本的可執行範例：

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // 宣告在載入腳本的函式
});
*/!*
```

這被稱為〝基於回呼（callback-based）〞風格的非同步程式設計。執行某些非同步動作的函式，應該要提供一個 `callback` 引數，讓我們能在非同步函式完成時，執行我們傳入的回呼。

<<<<<<< HEAD
我們在 `loadScript` 中就是這樣做的，當然這是一個常見的方式。
=======
Here we did it in `loadScript`, but of course it's a general approach.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## 回呼中的回呼

我們要如何循序地載入兩個腳本：先是第一個，然後是在他之後的第二個？

直覺的解決方式就是在回呼中放入第二個 `loadScript`，像這樣：

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

在外層的 `loadScript` 完成後，回呼會啟動內層的函式。

如果我們想再多一個腳本呢‧‧‧？

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...在所有腳本載入後繼續執行
    });
*/!*

  });

});
```

所以，每一個新動作都在一個回呼內。在只有少數動作的情況下還好。但如果有很多動作的話，那就不好了。我們很快會看到其它變型。

## 錯誤處理

上述的範例中，我們並沒有考量到錯誤。如果腳本載入失敗的話，該怎麼辦？我們的回呼應該要能夠對此作出應對。

下面是 `loadScript` 的改良版本，追蹤了載入的錯誤：

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

成功時它呼叫 `callback(null, script)`，而失敗時它呼叫 `callback(error)`。

使用如下：
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 處理錯誤
  } else {
    // 成功載入腳本
  }
});
```

再強調一次，我們使用在 `loadScript` 的處理方式，其實相當常見。它被稱為〝錯誤優先回呼（error-first callback）〞的風格。

慣例如下：
1. `callback` 的第一個引數保留給錯誤，如果它有發生的話。然後呼叫 `callback(err)`。
2. 第二個引數（以及之後的其它引數）保留給成功的結果。然後呼叫 `callback(null, result1, result2…)`。

所以單一的 `callback` 函式，被同時用於錯誤回報以及回傳結果。

## 金字塔的詛咒（Pyramid of Doom）

第一眼看來，對於非同步程式設計來說，上述的方式是可行的。而它確實也是可行的。對於一到二層的巢狀呼叫來說，看起來還行。

但是對於一個接著一個的多個非同步動作，我們將會有像這樣的程式碼：

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...於所有腳本載入後執行 (*)
  */!*
          }
        });

      }
    });
  }
});
```

上述程式碼中：
1. 我們載入 `1.js`，然後如果沒有錯誤的話。
2. 我們載入 `2.js`，然後如果沒有錯誤的話。
3. 我們載入 `3.js`，然後如果沒有錯誤的話。 -- 做其它的事 `(*)`.

隨著呼叫的層次越多，程式碼變得越來越深，同時也增加了維護的難度，尤其是實際的程式碼中可能會有更多的迴圈、條件判斷等等。而不只是範例中的 `...` 。

這有時候被稱為〝回呼地獄（callback hell）〞或〝金字塔的詛咒（pyramid of doom）〞。

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

![](callback-hell.svg)

〝金字塔〞狀的巢狀呼叫，隨著每一個非同步動作向右成長。很快地失去控制。

因此這樣的程式撰寫方式並不夠好。

我們可以試著藉由將每一個動作獨立為一個函式來舒緩這個問題，像這樣：

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...在所有腳本載入後執行 (*)
  }
}
```

看到了嗎？它的功能相同，但它現在沒了過深的巢狀，因為我們將每個動作都做成獨立的全域函式。

這雖然可行，但程式碼看起來像被撕破的草稿。它很難閱讀，而且你大概也注意到了，讀者需要在閱讀時，在片段間做視線的跳躍。這很不方便，尤其是當讀者並不熟悉這段程式碼，而且不曉得視線要跳到哪裡。

此外，命名為 `step*` 的函式，全都只使用一次，它們被創造出來，只為了避免〝金字塔的詛咒〞。沒有任何一個函式會在動作鏈外，再被重新使用。因此這種方式有一點汙染了命名空間。

我們想要更好的。

幸運地，有其它方法能避免這樣的金字塔。其中一種最棒的方式，是使用〝promises〞，將在下一章節介紹。
