# Testium

## #e2e_sushi

----


# 自己紹介

![right](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

## azu
## @[azu_re](https://twitter.com/azu_re)
###  [Web scratch], [JSer.info]


[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----
# 概要

- [Testium](https://github.com/groupon-testium/testium "Testium")って何？
- 同期的なWebDriver API
- PageObjectパターン

----

# Testium

- グルーポンが作ってるE2Eテストフレームワーク
- 同期的なWebDriver APIが特徴

----

# 同期的なWebDriver

- `click()` などのブラウザ操作が同期的な処理になってる
- [groupon-testium/webdriver-http-sync](https://github.com/groupon-testium/webdriver-http-sync "groupon-testium/webdriver-http-sync")
- testiumの`brorser` APIはこれをラップしたもの
- Nodeには同期HTTP APIがないので[request-sync](https://www.npmjs.com/package/request-sync "request-sync")を使ってる

----

# なぜ同期的(なぜ非同期)?

- 非同期だとコールバック地獄が多発
- それを解消するためにPromiseやメソッドチェーンを多様する
	- Jasmineの`expect(promise)`のような特殊なassertが必要
	- テストフレームワークが密接になってしまう
- そもそもUIの操作が非同期であって嬉しい感じではない...

-----

# [coding-kata/todo-app-jquery-to-backbone](https://github.com/coding-kata/todo-app-jquery-to-backbone/ "coding-kata/todo-app-jquery-to-backbone")

## E2Eテストを使ったリファクタリングのサンプル

----

# 素で書いたE2Eテスト

```js
var injectBrowser = require('testium/mocha');
var assert = require("power-assert");
var browser;
function addTodo(text) {
    browser.setValue('.todoText', text);
    browser.click('.todoBtn');
}
describe("app-test", function () {
    var text = 'todo text';
    before(injectBrowser());
    beforeEach(function () {
        browser = this.browser;
        this.browser.navigateTo("/");
    });
    context("when テキストボックスに文字を入れて送信した時", function () {
        beforeEach(function () {
            addTodo(text)
        });
        it("should li要素が作成されている", function () {
            var list = browser.getElements('.todoList li');
            assert(list.length > 0);
        });

        it("should リストアイテムのテキストは送信したものと一致している", function () {
            browser.assert.elementHasText('.todoList li', text)
        });
    });
});
```

----

# 素で書いたE2Eテスト

- セレクタが直接出てくる
- アプリをリファクタリングして構造が変わると一瞬で壊れる
- 画面や操作を抽象化するリファクタリングが必要
- E2Eテストのリファクタリング => PageObjectパターン?

----

# PageObjectパターン

- The public methods represent the services that the page offers（publicメソッドは、ページが提供するサービスを表す）
- Try not to expose the the internals of the page （ページの内部を公開しないこと）

....  [PageObjectデザインパターンを利用して画面変更に強いUIテストを作成する](http://softwaretest.jp/labo/tech/labo-292/ "PageObjectデザインパターンを利用して画面変更に強いUIテストを作成する│ソフトウェアテストラボ｜アプリテスト｜スマートフォンテスト｜株式会社シフト")
----

# Element.prototype.getElement

- `context.querySelector` みたいなものがなかった
- Page Object的な事をやるのに欲しかった
- => 実装してPRした
- [Implement Element.prototype.getElement(s) by azu · Pull Request #22 · groupon-testium/webdriver-http-sync](https://github.com/groupon-testium/webdriver-http-sync/pull/22 "Implement Element.prototype.getElement(s) by azu · Pull Request #22 · groupon-testium/webdriver-http-sync")

----

# PageObjectで書きなおしたもの

## AppのPageObject

```js
function AppPage(browser) {
    this.browser = browser;
    this.browser.navigateTo("/");// Constructorで移動
}
AppPage.prototype.addTodo = function (text) {
    this.browser.setValue('.todoText', text);
    this.browser.click('.todoBtn');// Todoを追加
};
AppPage.prototype.getTodoItems = function () {
    return this.browser.getElements('.todoList li');
};
AppPage.prototype.toggleTodo = function (todo) {
    var input = todo.getElement('input[type="checkbox"]');
    input.click();
};
AppPage.prototype.removeTodo = function (todo) {
    var input = todo.getElement('.removeBtn');
    input.click();
};
module.exports = AppPage;
```

-----

# PageObjectを使ったテスト

```js
var AppPage = require("./page-objects/app-page");
describe("app-test", function () {
    var inputText = 'todo text';
    var page;
    before(injectBrowser());
    beforeEach(function () {
    	// ページの遷移をnew Pageで表せる
        page = new AppPage(this.browser);
    });
    context("when テキストボックスに文字を入れて送信した時", function () {
        beforeEach(function () {
            page.addTodo(inputText)
        });
        it("should li要素が作成されている", function () {
            var list = page.getTodoItems();
            assert(list.length === 1);
        });

        it("should リストアイテムのテキストは送信したものと一致している", function () {
            var todo = page.getTodoItems()[0];
            var text = todo.get("text");
            assert.equal(text, inputText);
        });
    });
})
```

----

# PageObject?

- PageのObject と ComponentのObjectがある
	- Componentで分けても良さそう
- `new Page(driver)` が必ずしも画面遷移ではない