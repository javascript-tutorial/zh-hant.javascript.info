# 現代化模式 "use strict"

長久以來，JavaScript 的發展上沒有出現相容性問題，新的功能加入後舊的功能依然沒變。

這麼做的好處是不會弄壞現存的程式碼，但缺點是 JavaScript 創造者們產生的任何錯誤或不佳的決定會永遠留在這個語言內。

這情形一直存在，直至 2009 年 ECMAScript 5（ES5）出現為止。ES5 增加且修改了一些這個語言中的功能，為了讓舊的程式碼也可以運作，修改大部分預設是關閉的。你需要明確地用一個指令來開啟這些功能：`"use strict"`。

## "use strict"

這個指令看起來是個字串：`"use strict"` 或 `'use strict'`。當它被置於腳本最頂端時，整個腳本會以 "現代化" 方式運行。

例如：

```js
"use strict";

// 程式碼以現代化方式運行
...
```

<<<<<<< HEAD
我們很快會學到函式（functions）（一種組合命令的方式），所以先說一下，注意 `"use strict"` 可以被放在函式本體的最前面，而不用是整個腳本的最前方。這麼做可以使嚴格模式（strict mode）只作用在函式之中，但通常大家都會用於整個腳本上。

````warn header="確保 \"use strict\" 至於最頂端"
請確保 `"use strict"` 至於你腳本的最頂端，否則嚴格模式可能不會被啟用。
=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

這裡嚴格模式就沒有被啟用：

```js no-strict
alert("some code");
// "use strict" 底下的 "use strict" 會被忽略 -- 必須得至於最頂端

"use strict";

// 嚴格模式沒有啟動
```

只有註解可以出現在 `"use strict"` 之前。
````

```warn header="沒有取消 `use strict` 的方式"
沒有像是 `"no use strict"` 之類使得引擎回復舊行為的指令

<<<<<<< HEAD
一旦我們開啟嚴格模式，就不能回頭。
=======
Once we enter strict mode, there's no going back.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```

## 瀏覽器主控台

<<<<<<< HEAD
未來當你使用瀏覽器主控台來測試功能時，請注意它並沒有預設開啟 `use strict`。
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

有時候 `use strict` 造成的不同會讓你得到不正確的結果。

<<<<<<< HEAD
你可以試著按下 `key:Shift+Enter` 來輸入多行，然後把 `use strict` 放在在最上方，像這樣：
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
'use strict'; <Shift+Enter 換行>
//  ...你的程式碼
<Enter 執行>
```

這在大多數瀏覽器，Firefox 和 Chrome，都可以運作。

<<<<<<< HEAD
如果不行，開啟 `use strict` 最有效的方式是輸入像下面這樣的程式碼到主控台內：
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...你的程式碼...
})()
```

## 總是使用 "use strict"

我們尚未提到嚴格模式與 "預設" 模式的差別。

在接下來的章節中學習新的語言功能時，我們會提出嚴格和預設模式之間的差異。好險沒差很多且確實為我們帶來便利。

總之現在了解這些就夠了：

1. `"use strict"` 指令讓引擎切換至 "現代化" 模式，並改變一些內建功能的行為。在之後的教程我們會看到更多細節。
2. 嚴格模式要在腳本或函式的最頂端放置 `"use strict"` 才會被開啟。有些語言功能，像是 "類別（classes）" 和 "模組（modules）" 會自動開啟嚴格模式。
3. 所有現代化瀏覽器都支援嚴格模式。
4. 我們建議腳本最好總是以 `"use strict"` 起始。除了非常少的指定情境以外，本教程中所有範例都預設使用嚴格模式。
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
