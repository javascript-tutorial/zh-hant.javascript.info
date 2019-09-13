# 忍者程式碼（Ninja code）

```quote author="孔子"
學而不思則罔，思而不學則殆。
```

過去的程式忍者使用這些技巧來讓程式碼維護者的心思更加敏銳。

程式碼審查大師得在測試任務中尋找它們。

初學的開發者有時候將它們用的比程式忍者更好。

細心閱讀然後找出你的角色是 -- 程式忍者、初學者、或者程式碼審查者？

```warn header="偵查出諷刺意味"
很多人試著跟隨忍者的腳步，但很少有人成功。
```

## 要言不煩（Brevity is the soul of wit）

讓程式碼盡可能簡短，以顯示出你多麼聰明。

讓微妙的語言特性指引你。

舉例，看一下這個三元運算子 `'?'`：

```js
// 從知名 javascript 函式庫取得的程式碼
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

酷，對吧？若你也像這樣寫，那些看到這一行程式碼並試圖理解 `i` 值的開發者們，將會有個美好的時光，接著就會來找你尋求答案。

告訴他們更短總是更好，引領他們進入忍者之路。

## 單一字母變數

```quote author="老子（道德經）"
道隱無名。夫唯道，善貸且成。
completed.
```

另一個寫程式更快的方式是到處使用單一字母的變數名稱，像是 `a`、`b` 或 `c`。

短變數會像個真正的忍者處於森林中一樣，消失於程式碼之中，沒有人能夠使用編輯器的 "搜尋" 找到它們。即使有人辦得到，他們也無法 "破譯" `a` 或 `b` 的名字意義。

...但有個例外，一個真正的忍者永遠不會在 `"for"` 迴圈內使用 `i` 作為計數器。任何地方都行，就是這裡不可以。觀察四周看看，還有其他像是 `x` 或 `y` 這種異樣的字母呢。

若迴圈本體有 1-2 頁這麼長（若可以就讓它盡量長），那麼以異樣的變數作為迴圈計數器會是特別的酷。然後若有人深入迴圈內部，他們將無法快速知道以 `x` 為名的變數就是迴圈計數器。

## 使用縮寫

若團隊規則禁止使用單一字母或模糊的名字 -- 盡量縮短它們，使用縮寫吧。

像這樣：

- `list` -> `lst`。
- `userAgent` -> `ua`。
- `browser` -> `brsr`。
- ...等等

只有真正擁有良好直覺的人才有辦法理解這些名字。盡量縮短一切事物，只有天選之人才夠格接手你的程式開發。

## 突破天際的抽象化

```quote author="老子（道德經）"
大方無隅，<br>
大器晚成，<br>
大音希聲，<br>
大象無形。
```

在選擇一個名字時，試著使用最為抽象的詞，像是 `obj`、`data`、`value`、`item` 和 `elem` 等等。

- **變數的理想名字是 `data`。** 在任何能用地方都用，每個變數都確實都有 *data* 不是嗎？

    ...但如果 `data` 已經被用過了怎麼辦？試著使用 `value`，它也很普遍，畢竟一個變數最終總會得到一個 *value*。

- **使用變數類型命名：`str`、`num`...**

    嘗試看看，新手可能會懷疑 -- 這種名字真的對成為忍者有用嗎？是的，就是會！

    確實，該變數名字依然含有意義。它說明了變數內部有些什麼：一串字串、一個數值或其它東西。但當外部使用者試著理解程式碼時，他們會驚訝地發現事實上根本不具有任何資訊！且最終將無法改變你精思熟慮過的程式碼。

    值的類型很容易就可以經由除錯得知，但此變數的意義呢？它儲存著哪種 字串/數值？

    不經過良好的冥想是無法理解的！

- **...但如果這種名字不夠用怎麼辦？** 加個數字就好了：`data1, item2, elem5`...

## 注意力測試

只有真正細心的程式設計師才夠格理解你的程式碼，要如何確認？

**其中一個方法 -- 使用相似的名字，像是：`date` 和 `data`。**

盡可能的混合在一起。

快速閱讀這種程式碼是不可能的，而且當還有錯字時... 嗯... 我們卡在這很久了，來喝個茶吧。

## 聰明的同義詞

```quote author="孔子"
最困難的事是在黑暗的房間內尋找一隻黑貓，尤其當那裡根本沒有貓時。<br>
（譯者註：這則引用應是個烏龍，孔子沒有說過這句話，可上網查詢相關來源）
```

對 *同件* 事情使用 *相似* 的名字使得生活更為有趣，並向大眾顯示出你的創意。

例如，函式前置。若某個函式在螢幕上顯示一段訊息 -- 使用 `display...` 開頭，像是 `displayMessage`。然後若另一個函式在螢幕上顯示別的東西，像是使用者名字，就用 `show...` 開頭（像是 `showName`）。

暗示這些函式之間有些微妙的不同，而其實並沒有。

與團隊中的忍者夥伴達成一個協議：若 John 在程式碼中用 `display...` 作為 "顯示" 函式的起始，那 Peter 可以用 `render..`，而 Ann 就用 `paint...`，注意看看程式碼會變得多麼有趣且多樣化啊。

...接著是帽子戲法！

對於兩個有著重要差異的函式 -- 使用同樣的前置！

舉個例，函式 `printPage(page)` 將會用到印表機，而函式 `printText(text)` 將會把文字放到螢幕上。讓某個不熟悉的讀者思考一下這個相似的函式名稱 `printMessage`："它會把訊息丟到哪去？印表機還是螢幕上？" 為了讓它更為耀眼，`printMessage(message)` 應該要輸出訊息到新的視窗中！

## Reuse names

```quote author="Laozi (Tao Te Ching)"
Once the whole is divided, the parts<br>
need names.<br>
There are already enough names.<br>
One must know when to stop.
```

Add a new variable only when absolutely necessary.

Instead, reuse existing names. Just write new values into them.

In a function try to use only variables passed as parameters.

That would make it really hard to identify what's exactly in the variable *now*. And also where it comes from. The purpose is to develop the intuition and memory of a person reading the code. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike in the middle of a loop or a function.**

For instance:

```js
function ninjaFunction(elem) {
  // 20 lines of code working with elem

  elem = clone(elem);

  // 20 more lines, now working with the clone of the elem!
}
```

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code they will find out that they're working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja.

## Underscores for fun

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you knew their meaning. Or, better, add them just for fun, without particular meaning at all. Or different meanings in different places.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## Show your love

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten a reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two of their paid working time.


## Overlap outer variables

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Use same names for variables inside and outside a function. As simple. No efforts to invent new names.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- a programmer wants to work with user here and...
  ...
}
```

A programmer who jumps inside the `render` will probably fail to notice that there's a local `user` shadowing the outer one.

Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... The trap is sprung! Hello, debugger...


## Side-effects everywhere!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without "side-effects".

**A really beautiful trick is to add a "useful" action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn't work. Tell them: "Read the docs!". And give this article.


## Powerful functions!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Don't limit the function by what's written in its name. Be broader.

For instance, a function `validateEmail(email)` could (besides checking the email for correctness) show an error message and ask to re-enter the email.

Additional actions should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit them. So they won't break your meditation by asking anything about it.

## Summary

All "pieces of advice" above are from the real code... Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them, and your code will become full of surprises.
- Follow many of them, and your code will become truly yours, no one would want to change it.
- Follow all, and your code will become a valuable lesson for young developers looking for enlightenment.
