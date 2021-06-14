
# 模組 (Modules) 簡介

當程式規模變大, 就會切分成多個檔案, 這每個檔案就是所謂的『模組』, 每個模組通常就包含一個類別或是函式庫。

長久以來, JavaScript 在語言層次上並沒有模組的語法, 這並不會造成問題, 因為原本腳本都很小也不複雜, 因此並不需要模組。

不過腳本終究越來越複雜, 於是社群就發明了多種將程式碼組織成模組, 以及在需要時載入模組的特殊用途函式庫。

例如：

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- 早期的模組系統之一, 一開始是以 [require.js](http://requirejs.org/) 函式庫的形式實作。
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js 伺服器所建立的模組系統。
- [UMD](https://github.com/umdjs/umd) -- 與 AMD 及 CommonJS 相容的另一種模組系統, 提出來作為一統模組系統的方案。

上述這些都已慢慢成為歷史, 但在舊的腳本中還是會看到它們的蹤跡。

語言層次的模組系統是在 2015 年的標準中現身, 逐漸成為主流瀏覽器與 Node 都支援的功能, 因此我們要學的就是這一種模組系統。

## 模組是什麼？

簡而言之, 模組就是單一個檔案, 單一個腳本檔就是模組。

模組可以相互載入, 並且使用 `export` 與 `import` 特殊指示詞來交換功能, 叫用其他模組中的函式：

- `export` 關鍵字可以標示要讓模組外部使用的變數與函式。
- `import` 可以從其他模組中匯入功能。

舉例來說, 如果檔案 `sayHi.js` 匯出一個函式：

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...那在在其他檔案中就可以匯入並使用這個函式：

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

`import` 指示詞會載入由相對於目前檔案的 `./sayHi.js` 路徑指定的模組, 並將該模組匯出的函式 `sayHi` 匯入成對應的變數。

讓我們在瀏覽器中執行看看這個範例。

由於模組支援特殊的關鍵字與功能, 我們必須使用 `<script type="module">` 屬性讓瀏覽器將這個腳本視為模組。

像是這樣：

[codetabs src="say" height="140" current="index.html"]

瀏覽器會自動擷取並執行匯入的模組 (以及模組內匯入的模組), 然後再執行腳本。

## 模組的核心功能

那麼模組與一般的腳本主要的差別是什麼呢？

不論是在瀏覽器或是伺服端 JavaScript, 模組都具有兩個主要特性。

### 固定會套用 "use strict"

模組固定會套用 `use strict`, 所以如果設值給未宣告的變數就會出錯。

```html run
<script type="module">
  a = 5; // error
</script>
```

### 模組層次的作用域

每個模組都有自己的頂層作用域, 也就是說, 模組內頂層的變數與函式在其他的腳本中都是看不到的。

底下的範例匯入了兩個模組, 其中 `hello.js` 企圖使用宣告在 `user.js` 中的 `user` 變數, 因此失敗：

[codetabs src="scopes" height="140" current="index.html"]

模組必須將要讓外界使用的項目用 `export` 匯出, 在外部腳本中比需用 `import` 匯入想要使用的項目。

因此, 我們必須將 `user.js` 匯入到 `hello.js` 中才能取得需要的功能, 而不是使用全域變數。

正確的寫法是這樣：

[codetabs src="scopes-working" height="140" current="hello.js"]

在瀏覽器中, 個別的 `<script type="module">` 也有自己單獨的頂層作用域：

```html run
<script type="module">
  // 這個變數只能在這個模組腳本中使用
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

如果想要一個視窗層級的全域變數, 就必須將該變數加入到  `window` 物件, 並且用 `window.user` 來取用。不過除非有充分的理由, 否則不應該這樣用。

### 模組只會在第一次匯入時執行一次

如果在多個模組中匯入同一個模組, 它的程式碼只會在第一次匯入時執行, 所有該模組匯出的項目會提供給其他匯入同一模組的地方共用。

這會導致很重要的一個結果, 讓我們用範例來說明：

首先, 如果執行模組的程式碼會有副作用, 像是會顯示訊息, 那麼即使匯入多次, 副作用也只會發生一次, 也就是在第一次匯入的時候：

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// 在不同模組中匯入同一個模組

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (不會顯示任何訊息)
```

實務上, 頂層模組的程式碼是用來完成初始準備工作, 建立內部的資料結構等等, 如果有想讓外部重複利用的部分, 就應該將之匯出。

接著來看一個進階的範例。

假設模組會匯出一個物件：

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

若是在多個檔案中匯入此模組, 這個模組只會執行一次, 建立一個 `admin` 物件, 並共用於其他匯入同一模組的地方。

所有匯入該模組的地方用到的都是同一個 `admin` 物件:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// 1.js and 2.js 匯入的是同一個物件
// 在 1.js 做的修改在 2.js 中也會生效
*/!*
```

讓我們複習一下, 模組只會執行一次, 建立要匯出的項目, 並在所有匯入該模組的地方共用。因此, 如果在某個地方修改了 `admin` 物件, 在其他地方也會生效。

這樣的行為方式讓我們可以在第一次匯入的時候 *設定* 模組, 只要設定好屬性值一次, 其他匯入的地方就可以直接使用了。

舉例來說, 在 `admin.js` 模組中可以提供特定的功能, 但讓所需的特定資料 (例如認證資訊) 由模組外部提供給 `admin` 物件：

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

在我們程式的第一個腳本 `init.js` 中, 設定好 `admin.name`, 這樣在其他匯入相同模組的地方都會生效, 包含在 `admin.js` 自己內部也一樣：

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

在別的模組中一樣會看到設定好的 `admin.name`:

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

### import.meta

`import.meta` 包含有目前模組的相關資訊。

它的內容會隨所在環境而異, 在瀏覽器中, 包含有腳本或是在網頁的 url：

```html run height=0
<script type="module">
  alert(import.meta.url); // 腳本的 url (或行內腳本所在網頁的 url)
</script>
```

### "this" 在模組中沒有定義

這雖然是個小差異, 不過為了完整性, 我們還是得提一下。

在模組中, 頂層的 `this` 是未定義的。

在非模組的腳本中, `this` 是全域的物件：

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## 瀏覽器中的特別差異

在瀏覽器中, 加上 `type="module"` 的腳本與一般的腳本還有一些特別的差異。

如果您是第一次閱讀本書, 或是並不會在瀏覽器中使用 JavaScript, 可以先略過這一節的內容。

### 模組腳本會被延遲執行

不論是外部還是行內模組腳本, 都 *會被* 延遲執行, 如同加上 `defer` 屬性 (會在 [](info:script-async-defer) 說明) 那樣。

也就是說：
- 下載外部模組腳本檔案 `<script type="module" src="...">` 並不會擱置 HTML 內容的處理, 而是同時進行。
- 模組腳本會等到 HTML 文件完全備妥 (即使模組腳本再小、載入的時間比 HTML 內容短) 才執行。
- 模組腳本會依照它們在文件內的相對順序執行。

這使得模組可以看到完整載入的 HTML 頁面內容, 即使是文件中在模組後面才出現的元素也一樣。

例如：

```html run
<script type="module">
*!*
  alert(typeof button); // object: 腳本可以看到下面才出現的 button
*/!*
  // 由於模組是延遲執行, 因此是在網頁完全載入後才執行
</script>

如果和底下非模組版本的腳本相比：

<script>
*!*
  alert(typeof button); // Error: 由於腳本看不到出現在底下的內容, 所以 button 尚未定義
*/!*
  // 一般腳本會在網頁其餘內容處理完之前就立即執行
</script>

<button id="button">Button</button>
```

請注意：第二個腳本會比第一個腳本先執行, 所以實際執行時, 會先看到第二個腳本顯示的 `undefined` , 然後才會看到第二個腳本顯示的 `object`。

這就是因為模組會延遲執行, 因此是等到文件處理完才會執行, 但是非模組的腳本會立刻執行, 所以我們會先看到它的輸出結果。

在使用模組時, 我們要體認到 HTML 內容會先顯示出來才會執行模組內的腳本, 因此使用者會在 JavaScript 應用備妥可用前先看到網頁內容, 這時有些功能可能還無法使用, 請務必在畫面上顯示『載入中』的指示, 否則就必須確認不會造成使用者的困惑。

### 在行內腳本形式的模組中可以使用 Async

在非模組腳本中, `async` 屬性只能用在外部腳本, 會在載入完成後立刻執行, 不會等待其他腳本或是 HTML 文件內容完成。

對於模組腳本, 即使是行內腳本, 也可以套用 'async' 屬性。

例如以下的行內腳本就使用了 `async` 屬性, 所以並不會等待其他工作完成才執行。

它會執行擷取檔案 (`./analytics.js`), 並在擷取完成後立刻執行, 而不會等待 HTML 文件處理完成, 或是其他腳本執行結束。

這對不需依賴其他部分的功能, 像是計數、廣告、建立文件層次的監聽器等等就很方便。

```html
<!-- 所有相依項目都會被擷取 (analytics.js), 然後執行腳本 -->
<!-- 不會等待文件處理完或其他 <script> 標籤 -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### 外部腳本

加上 `type="module"` 的外部腳本會有兩個不一樣的地方：

1. 同樣 `src` 的外部腳本只會執行一次：
    ```html
    <!-- my.js 只會下載並執行一次 -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. 從其他來源 (例如其他網站) 下載外部腳本需要 [CORS](mdn:Web/HTTP/CORS) 表頭, 就像在 <info:fetch-crossorigin> 這章中所提到的。換句話說, 如果要從其他來源下載模組腳本檔, 遠端伺服器就必須在回應中加入 `Access-Control-Allow-Origin` 表頭, 允許瀏覽器執行該檔案。
    ```html
    <!-- 其他網站必須提供 Access-Control-Allow-Origin -->
    <!-- 否則這個腳本就不會執行 -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    這可以在預設情況下確保較佳的安全性。

### 不允許載入沒有路徑的模組

在瀏覽器中, `import` 只能用在指明相對或是絕對路徑的模組, 沒有指明路徑的模組稱為 "bare" 模組, 這種模組不能用在 `import` 中。

像是以下的 `import` 就不合語法：
```js
import {sayHi} from 'sayHi'; // Error, "bare" 模組
// 模組一定要指明相對或是絕對路徑
```

在特定的環境下, 像是 Node.js 或是打包工具中, 由於它們有自己自成體系的模組搜尋方式, 因此可以不指定模組的路徑, 但瀏覽器並不支援這樣的功能。

### 使用 "nomodule" 維持相容性

舊式的瀏覽器並不支援 `type="module"`, 只會略過未知類型的腳本, 最好可以使用 `nomodule` 屬性作為退路：

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## 建置工具

在實務中, 我們很少直接使用原生的個別模組, 而是透過特殊的工具, 像是 [Webpack](https://webpack.js.org/) 將模組打包在一起後才部署到產品環境伺服器 (production server) 上。

使用打包工具的好處就是更能掌控要如何搜整模組, 包括 bare 模組以及 CSS/HTML 等不同形式的模組。

建置工具的工作流程如下：

1. 先決定一個主模組, 也就是會在 HTML 中以 `<script type="module">` 置入的模組。
2. 分析相依關係, 依照層級匯入各個模組。
3. 建置一個包含所有模組的單一檔案 (也可依照設定建置成多個檔案), 用打包工具的函式來取代原生的 `import`, 也支援像是 HTML/CSS 等的特殊類型模組。
4. 在上述過程中, 也可以套用各種轉換或是最佳化的功能：
    - 移除用不到的程式碼。
    - 移除不會用到的匯出項目 (這稱為 "tree-shaking").
    - 移除專門用在開發階段的敘述, 像是 `console`、 `debugger` 等。
    - 將最新式 JavaScript 語法轉換成舊式的語法, 類似 [Babel](https://babeljs.io/) 的功能。
    - 將最後結果的檔案盡量變小 (移除空白、將變數改用簡短的名字等等)。

如果採用打包工具, 由於會把所有的腳本包成單一 (或多個) 檔案, `import/export` 敘述會被打包工具內特殊的函式取代, 因此打包後的檔案內就不會出現 `import/export`, 也就不再需要 `type="module"` 屬性, 可以當成一般的腳本：

```html
<!-- 假設我們已經使用像是 Webpack 打包成 bundle.js -->
<script src="bundle.js"></script>
```

也就是說, 即使用到原生的模組經過轉換後也可以用在不支援模組的環境。在本教學中, 我們不會使用 Webpack, 之後若有需要你可以自己設定使用。

## 總結

以下總結核心概念：

1. 模組就是一個檔案。要使用 `import/export` 需要明確加上 `<script type="module">` 屬性。模組和一般腳本的差異如下：
    - 預設採用延遲執行。
    - 即使是行內腳本也可以使用 async。
    - 要從其他來源 (網域/協定/埠號) 下載外部腳本, 就必須具有CORS 表頭。
    - 重複載入外部腳本的動作會被忽略。
2. 模組有它自己的頂層作用域, 並且可以透過 `import/export` 與其他模組交換提供所需的功能。
3. 模組內固定會套用 `use strict`。
4. 模組內的程式碼只會執行一次, 匯出項目也只會建立一次, 並在其他匯入同一模組的地方共用。

應用模組時, 個別模組必須實作並匯出功能, 其他地方可以透過 `import` 直接匯入所需要的功能項目。瀏覽器會載入並自動執行模組內的腳本。

在產品階段, 由於效能或是其他因素的考量, 通常會用像是 [Webpack](https://webpack.js.org) 這類的打包工具將多個模組打包成單一檔案。

在下一章中, 我們會介紹更多模組的範例, 以及匯出/匯入項目的各種方法。
