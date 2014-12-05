# QUnit 2.xで変わること

# ![logo,inline](img/logo-qunit.png)
----

# QUnit 2.xで変わること

## 現バージョン: QUnit 1.16.0

-----

# 基本方針

- 2.0 では互換レイヤーを入れて互換性を維持
	- 既存のメソッド名の変更もDeprecatedだが動く
- 2.1で互換レイヤーを破棄して完全に移行
- 詳しくは [QUnit 2.x Upgrade Guide | QUnit](http://qunitjs.com/upgrade-guide-2.x/ "QUnit 2.x Upgrade Guide | QUnit") を読む

-----

# Try Own

- [azu/qunit-examples](https://github.com/azu/qunit-examples "azu/qunit-examples")
- 今回でてきたサンプルコード

----

# Avoid Global

- グローバルに合ったものが`Qunit.*`に移動

```js
// OLD Style
module("module name");
test("old test", function (assert) {
    expect(1);// 1つのassertがあるという宣言
    assert.ok(true);
});
```

-----

# Avoid Global

- グローバルに合ったものが`Qunit.*`に移動

```js
// NEW Style
QUnit.module("module name");
QUnit.test("new test", function (assert) {
    assert.expect(1);// 1つのassertがあるという宣言
    assert.ok(1);
});
```


------

# Avoid Global

 deepEqual(), equal(), notDeepEqual(), notEqual(), notPropEqual(), notStrictEqual(), ok(), propEqual(), strictEqual(), throws()

などのassertionも`assert.*`に移動

------

# `done`での非同期テストの導入

- `asyncTest`や`start`などはDeprecatedに

```js
asyncTest("old async test", function (assert) {
    setTimeout(function () {
        assert.ok(true);
        start();
    }, 16);
});
```


------

# `done`での非同期テストの導入


- `assert.async`の返り値が`done`関数
- `asyncTest`という宣言は不要

```js
QUnit.test("new async test", function (assert) {
    var done = assert.async();
    setTimeout(function () {
        assert.ok(1);
        done();
    }, 16);
});
```


-----

# setup/teardown のリネーム

- setup/teardown が  beforeEach/afterEach にリネーム

```js
QUnit.module( "router", {
    setup: function( assert ) {
        this.router = new Router();
    },
    teardown: function( assert ) {
        this.router.destroy();
    }
});
```

----

# setup/teardown のリネーム

- setup/teardown が  beforeEach/afterEach にリネーム

```js
QUnit.module( "router", {
    beforeEach: function( assert ) {
        this.router = new Router();
    },
    afterEach: function( assert ) {
        this.router.destroy();
    }
});
```


----

# Promiseサポート

- MochaやBuster.jsなどで採用されてるスタイル
- `reutrn promise;`というかんじで[Thenable](http://azu.github.io/promises-book/ "Thenable")を返すと認識

```js
QUnit.test("fulfilled Promise", function (assert) {
    return Promise.resolve("value").then(function (value) {
        assert.equal(value, "value")
    });
});
```



-----

# Promiseテスト

- `assert.expect`が動く！(利用assert数を宣言する機能)
- [意図しないテスト結果](http://azu.github.io/promises-book/#mocha-promise "意図しないテスト結果") となるのを宣言で防止出来る

```js
QUnit.test("fulfilled Promise", function (assert) {
    assert.expect(1);// it's work!
    return Promise.resolve("value").then(function (value) {
        assert.equal(value, "value")
    });
});
```

----

# Promiseテスト

- `assert`がひとつも呼ばれないテストは自動で失敗する!
- Promiseテストのミスがかなり軽減される GREATE!

```js
QUnit.test("Year! Fail test", function (assert) {
    // `resolve`なので`catch`は呼ばれない
    return Promise.resolve().catch(function (value) {
        assert.equal(value, "value")
    });
});
```


----

# レポーターの標準化

- [js-reporters/js-reporters](https://github.com/js-reporters/js-reporters "js-reporters/js-reporters")
- テストフレームワークのレポーターの標準化活動
- [テスト結果のStatusの標準化](https://github.com/js-reporters/js-reporters/issues/4 "test status") - Pass/Fail/Pending...
- [テストのHook Eventの標準化](https://github.com/js-reporters/js-reporters/issues/1#issuecomment-54572441 "Standard Events/Hooks · Issue #1 · js-reporters/js-reporters") - SuiteStart/testEnd...
- [レポーターAPIの標準化](https://github.com/js-reporters/js-reporters/issues/3 "Standard API · Issue #3 · js-reporters/js-reporters") - イベントベース?

----

# まとめ

- グローバル空間には`QUnit`のみ
- `done`を使った非同期テストのサポート
- `return promise`でのPromiseテストのサポート
- `assert.expect`とPromiseテストの相性が良い
- 2.0では互換レイヤーあり、2.1で完全移行
- 続きは [QUnit 2.x Upgrade Guide | QUnit](http://qunitjs.com/upgrade-guide-2.x/ "QUnit 2.x Upgrade Guide | QUnit") で

----

# [azu/qunit-examples](https://github.com/azu/qunit-examples "azu/qunit-examples")