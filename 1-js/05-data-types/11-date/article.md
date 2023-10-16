# 日期和時間

讓我們來認識一個新的內建物件：[Date](mdn:js/Date)。它可以儲存日期和時間，並提供日期和時間管理的方法。

例如，我們可以使用它來儲存創建/修改時間，計算時間，或者只是顯示當前日期。

## 創建

要創建一個新的 `Date` 物件，請使用以下其中一個引數呼叫 `new Date()`：

`new Date()`
: 沒有引數 -- 創建一個 `Date` 物件，表示當前日期和時間：

    ```js run
    let now = new Date();
    alert( now ); // 顯示目前日期和時間
    ```

`new Date(毫秒數)`
: 創建一個 `Date` 物件，表示從 1970 年 1 月 1 日 UTC+0 開始經過的毫秒數（1/1000 秒）。

    ```js run
    // 0 表示 1970 年 1 月 1 日 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // 加上 24 小時，得到 1970 年 1 月 2 日 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    一個整數表示從 1970 年開始經過的毫秒數稱為*時間戳記*。

    它是日期的一個輕量級數值表示法。我們可以使用 `new Date(時間戳記)` 從時間戳記創建日期，並使用 `date.getTime()` 方法將現有的 `Date` 物件轉換為時間戳記（見下文）。

    1970 年 1 月 1 日之前的日期具有負的時間戳記，例如：
    ```js run
    // 1969 年 12 月 31 日
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(日期字串)`
: 如果只有一個參數，且為字串，則會自動解析該字串。解析的演算法與 `Date.parse` 使用的相同，我們稍後會介紹。

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // 時間未設定，所以假設為 GMT 的午夜，並根據程式碼執行的時區進行調整
    // 因此結果可能是
    // 2017 年 1月 2 日星期四 11:00:00 GMT+1100（澳大利亞東部夏令時間）
    // 或是
    // 2017 年 1 月 25 日星期三 16:00:00 GMT-0800（太平洋標準時間）
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: 在本地時區使用給定的組件創建日期。只有前兩個引數是必需的。

    - `year` 必須是 4 位數字：`2013` 是可以的，`98` 不行。
    - `month` 從 `0` (一月) 開始計算，到 `11` (十二月)。
    - `date` 參數實際上是月份中的日期，如果省略則假設為 `1`。
    - 如果 `hours/minutes/seconds/ms` 省略，則假設它們都是 `0`。

    例如：

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 2011 年 1 月 1 日, 00:00:00
    new Date(2011, 0, 1); // 同樣是這個日期，預設的小時等都是 0
    ```

    最小精度為 1 毫秒 (1/1000 秒)：

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 2011 年 1 月 1 日, 02:03:04.567
    ```

## 存取日期組件

有一些方法可以從 `Date` 物件中存取年、月等等：

[getFullYear()](mdn:js/Date/getFullYear)
: 取得年份 (4 位數字)

[getMonth()](mdn:js/Date/getMonth)
: 取得月份，**從 0 到 11**。

[getDate()](mdn:js/Date/getDate)
: 取得月份中的日期，從 1 到 31，這個方法的名稱看起來有點奇怪。

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: 取得相對應的時間組件。

```warn header="不是 `getYear()`，而是 `getFullYear()`"
許多 JavaScript 引擎實現了一個非標準的方法 `getYear()`。這個方法已被棄用。它有時會返回 2 位數的年份。請永遠不要使用它。有 `getFullYear()` 來取得年份。
```

此外，我們還可以獲取星期幾：

[getDay()](mdn:js/Date/getDay)
: 取得星期幾，從 `0` (星期日) 到 `6` (星期六)。第一天始終是星期日，在某些國家可能不是這樣，但無法更改。

**上述所有方法都返回相對於本地時區的組件。**

還有它們的 UTC 對應方法，可以返回 UTC+0 時區的日期、月份、年份等等：[getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay)。只需在 `"get"` 後面插入 `"UTC"`。

如果您的本地時區相對於 UTC 有偏移，那麼下面的程式碼將顯示不同的小時數：

```js run
// 目前日期
let date = new Date();

// 您目前時區的小時數
alert( date.getHours() );

// UTC+0 時區的小時數（倫敦時間，不考慮日光節約時間）
alert( date.getUTCHours() );
```

除了給定的方法外，還有兩個特殊的方法沒有對應的 UTC 版本：

[getTime()](mdn:js/Date/getTime)
: 返回日期的時間戳記 - 從 1970 年 1 月 1 日 UTC+0 開始的毫秒數。

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: 返回 UTC 和本地時區之間的差異，以分鐘為單位：

    ```js run
    // 如果您在 UTC-1 時區，顯示 60
    // 如果您在 UTC+3 時區，顯示 -180
    alert( new Date().getTimezoneOffset() );

    ```

## 設置日期組件

以下方法允許設置日期/時間組件：

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime)（通過自 1970 年 1 月 1 日 UTC 以來的毫秒數設置整個日期）

除了 `setTime()` 之外，它們每個方法都有一個對應的 UTC 版本，例如：`setUTCHours()`。

正如我們所見，一些方法可以同時設置多個組件，例如`setHours`。未提及的組件不會被修改。

例如：

```js run
let today = new Date();

today.setHours(0);
alert(today); // 仍然是今天，但小時數被更改為 0

today.setHours(0, 0, 0, 0);
alert(today); // 仍然是今天，現在是 00:00:00
```

## 自動校正

*自動校正*是 `Date` 物件的一個非常方便的功能。我們可以設置超出範圍的值，它會自動調整自己。

例如：

```js run
let date = new Date(2013, 0, *!*32*/!*); // 2013 年 1 月 32 日 ?!?
alert(date); // ...是 2013 年 2 月 1 日!
```

超出範圍的日期元件會自動分配。

假設我們需要將日期「2016 年 2 月 28 日」增加 2 天。在閏年的情況下，可能是「3 月 2 日」或「3 月 1 日」。我們不需要考慮這個問題，只需增加 2 天。`Date` 物件會處理其餘的部分：

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 2016 年 3 月 1 日
```

這個功能常用於獲取指定時間段後的日期。例如，讓我們獲取「現在時間後 70 秒」的日期：

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // 顯示正確的日期
```

我們也可以設置零值甚至負值。例如：

```js run
let date = new Date(2016, 0, 2); // 2016 年 1 月 2 日

date.setDate(1); // 設置為該月的第 1 天
alert( date );

date.setDate(0); // 最小的日期是 1，所以假設為上個月的最後一天
alert( date ); // 2015 年 12 月 31 日
```

## 日期轉換為數字，日期差異

當將 `Date` 物件轉換為數字時，它會變成與 `date.getTime()` 相同的時間戳記：

```js run
let date = new Date();
alert(+date); // 毫秒數，與 date.getTime() 相同
```

重要的副作用是，日期可以相減，結果是它們之間的毫秒差異。

這可以用於時間測量：

```js run
let start = new Date(); // 開始測量時間

// 做一些工作
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // 結束測量時間

alert( `The loop took ${end - start} ms` );
```

## Date.now()

如果我們只想測量時間，不需要使用 `Date` 物件。

有一個特殊的方法 `Date.now()` 可以返回當前的時間戳記。

它在語義上等同於 `new Date().getTime()`，但它不會創建中間的 `Date` 物件。因此它更快，並且不會對垃圾回收機制 (garbage collection) 造成壓力。

它主要用於方便性或在性能要求高的情況下使用，例如在 JavaScript 遊戲或其他專門的應用中。

所以這樣可能更好：

```js run
*!*
let start = Date.now(); // 從 1970 年 1 月 1 日開始計算的毫秒數
*/!*

// 做一些工作
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // 完成
*/!*

alert( `The loop took ${end - start} ms` ); // 減去數字，而不是日期
```

## 基準測試

如果我們想要一個可靠的 CPU-hungry 函數的基準測試，我們應該小心。

例如，讓我們測量兩個計算兩個日期之間差異的函數：哪個更快？

這樣的性能測量通常被稱為「基準測試」。

```js
// 我們有 date1 和 date2，哪個函數更快地返回它們之間的差異（以毫秒為單位）？
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// 或者
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

這兩個函數完全相同，但其中一個使用了明確的 `date.getTime()` 來獲取以毫秒為單位的日期，而另一個則依賴於日期到數字的轉換。它們的結果始終相同。

那麼，哪個更快呢？

第一個想法可能是連續運行它們多次並測量時間差異。對於我們的情況，函數非常簡單，所以我們至少要執行 100000 次。

讓我們測量一下：

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

哇！使用 `getTime()` 要快得多！這是因為它不需要類型轉換，對於引擎來說更容易優化。進行優化。

好的，我們有了一些結果。但這還不是一個好的基準測試。

想像一下，在執行 `bench(diffSubtract)` 的同時，CPU 正在平行執行其他任務，佔用了一些資源。而在執行 `bench(diffGetTime)` 的時候，這些任務已經完成。

這是現代多行程作業系統中一個非常真實的情境。

結果是，第一個基準測試會比第二個測試使用更少的 CPU 資源，這可能導致錯誤的結果。

**為了更可靠的基準測試，整個測試集應該多次重新運行。**

例如，像這樣：

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// 執行 bench(diffSubtract) 和 bench(diffGetTime) 每個迴圈交替執行 10 次
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

現代的 JavaScript 引擎只會對執行多次的「熱門程式碼」進行高級優化（不需要對很少執行的程式碼進行優化）。所以，在上面的例子中，第一次執行並不會被很好地優化。我們可能需要添加一個預熱運行：

```js
// 添加「預熱」運行以進行主迴圈之前的預熱
bench(diffSubtract);
bench(diffGetTime);

// 現在進行基準測試
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="小心進行微基準測試"
現代的 JavaScript 引擎會進行許多優化。它們可能會調整「人工測試」的結果，與「正常使用」相比，特別是當我們測試非常小的東西，例如運算子的工作方式或內建函式。因此，如果您真的想了解性能，請先研究 JavaScript 引擎的工作原理。然後，您可能根本不需要進行微基準測試。

關於 V8 的一系列優秀文章可以在 <http://mrale.ph> 找到。
```

## 從字串解析日期

方法 [Date.parse(str)](mdn:js/Date/parse) 可以從字串中解析日期。

字串的格式應為：`YYYY-MM-DDTHH:mm:ss.sssZ`，其中：

- `YYYY-MM-DD` -- 日期：年-月-日。
- 字元 `"T"` 用作分隔符。
- `HH:mm:ss.sss` -- 時間：小時、分鐘、秒和毫秒。
- 可選的 `'Z'` 部分表示時區，格式為 `+-hh:mm`。單個字母 `Z` 表示 UTC+0。

也可以使用較短的變體，例如 `YYYY-MM-DD` 或 `YYYY-MM` 或甚至 `YYYY`。

呼叫 `Date.parse(str)` 會解析給定格式的字串並返回時間戳記（從 1970 年 1 月 1 日 UTC+0 起的毫秒數）。如果格式無效，則返回 `NaN`。

例如：

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (時間戳記)
```

我們可以立即從時間戳記創建一個 `new Date` 物件：

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## 摘要

- 在 JavaScript 中，日期和時間使用 [Date](mdn:js/Date) 物件表示。我們無法創建「僅日期」或「僅時間」：`Date` 物件始終包含兩者。
- 月份從零開始計數（是的，一月是零月）。
- `getDay()` 中的星期幾也從零開始計數（星期日為零）。
- 當設置超出範圍的組件時，`Date` 會自動修正。這對於添加/減去天數/月份/小時很有用。
- 可以將日期相減，以毫秒為單位獲得差異。這是因為將 `Date` 轉換為數字時，它變成了時間戳記。
- 使用 `Date.now()` 快速獲取當前時間戳記。

請注意，與許多其他系統不同，JavaScript 中的時間戳記以毫秒為單位，而不是以秒為單位。

有時我們需要更精確的時間測量。JavaScript 本身沒有以微秒（百萬分之一秒）為單位的時間測量方式，但大多數環境都提供了。例如，瀏覽器具有 [performance.now()](mdn:api/Performance/now)，它以微秒精度（小數點後 3 位）給出從頁面加載開始的毫秒數：

```js run
alert(`Loading started ${performance.now()}ms ago`);
// 類似於：「已經開始載入 34731.26000000001 毫秒前」
// .26 是微秒（260 微秒）
// 小數點後超過 3 位數是精度錯誤，但只有前 3 位是正確的
```

Node.js 有 `microtime` 模組和其他方法。從技術上講，幾乎任何設備和環境都可以獲得更高的精度，只是 `Date` 物件本身沒有提供這樣的功能。