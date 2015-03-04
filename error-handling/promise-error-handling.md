# Promise Error Handling

## 約束されたエラー

----

# Promiseとエラーの基本

- Promise内で起きた例外は自動でキャッチされる
- エラー処理は`.catch(fn)`で行う

```javascript
var promise = new Promise(function(){
	throw new Error("例外");
});
promise.catch(function(error){
	// 例外をキャッチできる
});
```

----

# よくある問題

- `.catch(fn)` をしないとエラーログも出せない
- `.catch(fn)` をしわすれてエラーの握りつぶしが起きる
- = **unhandled rejection**　(`.catch`をしてないpromise)
- [4.6. Promise.prototype.done とは何か?](http://azu.github.io/promises-book/#promise-done "4.6. Promise.prototype.done とは何か?")


----

# 現状のunhandled rejectionへの対応

- **unhandled rejection**が発生した時にコンソールに出すかは実装依存
- FirefoxはGCのタイミング
- Chromeは開発者ツールが有効の場合
	- [v8-git-mirror/promise.js at 3709b9254e9d054796f6735b0f5cefed65ce69d3 · v8/v8-git-mirror](https://github.com/v8/v8-git-mirror/blob/3709b9254e9d054796f6735b0f5cefed65ce69d3/src/promise.js "v8-git-mirror/promise.js at 3709b9254e9d054796f6735b0f5cefed65ce69d3 · v8/v8-git-mirror")
- bluebirdやypromiseはコンソールへ出す
- Node.jsは何も言わない?

----

# 今日のテーマ: unhandledRejection

- unhandled rejectionは予期せぬ出来事
- 少なくてもエラーのログは取りたい
	- `Promise.prototype.done`を実装するのは本質的ではない
- `'unhandledRejection'`,  `'rejectionHandled'` というイベントの実装が進められているという話
- ECMAScript 6の仕様ではありません

----

# unhandledRejection / rejectionHandled

### bluebirdが主導してるの例はbluebird


-----

# unhandledRejection イベント

```javascript
var bluebird = require("bluebird");
process.on("unhandledRejection", function (reason, promise) {
    console.log("unhandledRejection");
});

var resolved = bluebird.resolve();
resolved.then(function () {
    throw new Error("Yay!");
});
```

-----

# unhandledRejection イベント

- `catch`してないPromiseでエラーが発生すると発行されるイベント
- `.catch` してないpromiseオブジェクトを見つけるのを助ける
- `window.onerror`みたいなもの

```javascript
process.on("unhandledRejection", function (reason, promise) {
	// エラー理由とpromiseがやってくる
});
```

-----

# rejectionHandled イベント

```javascript
var Promise = require("bluebird");
process.on("rejectionHandled", function (promise) {
    console.log("rejectionHandled");
});
var rejected = Promise.reject(new Error("Error Promise"));
setTimeout(function () {
    rejected.catch(function () {
        // rejected済みのpromiseに`catch`する
    });
},100);
```


----

# rejectionHandled イベント

- rejected済みのpromiseに`catch`した時に起きるイベント
- 呼ばれることがない`catch`の発見に役立つ

----

# 実際の使い方

- unhandledRejectionのログを取りたい場合

```javascript
var unhandledRejections = new Set();
process.on('unhandledRejection', function(reason, p) {
  unhandledRejections.add(p);
});
process.on('rejectionHandled', function(p) {
  unhandledRejections.delete(p);
});
```

-----

# unhandledRejection & rejectionHandled

- なぜ`unhandledRejection`だけ欲しいのに`rejectionHandled`も見るの?
- => `rejectionHandled` が起きるケースは`unhandledRejection`が先に起きてる事がある

----

# unhandledRejection & rejectionHandledパータン


```js
var rejected = Promise.reject();
setTimeout(()=>{
    // 2. rejectionHandledイベント
    rejected.catch(()=>{});
}, 100);
// 1. unhandledRejectionイベント
```


-----

# unhandledRejection & rejectionHandled

- unhandledRejection と rejectionHandled は基本セットで使う
- rejectionHandled単体の使い道はあんまりなさそう?

-----

# 使い方とドキュメント

参考資料

- [process io.js Manual &amp; Documentation](https://iojs.org/api/process.html#process_event_uncaughtexception "process io.js v1.4.3 Manual &amp; Documentation")
- [Promise unhandled rejection tracking global handler hook](https://gist.github.com/benjamingr/0237932cee84712951a2 "Promise unhandled rejection tracking global handler hook")
- [Global rejection events - bluebird](https://github.com/petkaantonov/bluebird/blob/master/API.md#global-rejection-events "Global rejection events")

----

# 実装

----

# ことのはじまり

- bluebirdの実装提案
	- [Difficult to get onPossiblyUnhandledRejection to work all of the time in Node.js due to submodules · Issue #357 · petkaantonov/bluebird](https://github.com/petkaantonov/bluebird/issues/357 "Difficult to get onPossiblyUnhandledRejection to work all of the time in Node.js due to submodules · Issue #357 · petkaantonov/bluebird")
- [@benjamingr](https://github.com/benjamingr "benjamingr")さんが色々[利用状況](https://github.com/petkaantonov/bluebird/issues/357#issuecomment-68995997)を調べてプロポーサルを書いた
- [Promise unhandled rejection tracking global handler hook](https://gist.github.com/benjamingr/0237932cee84712951a2 "Promise unhandled rejection tracking global handler hook")

----

# ライブラリの実装

- [bluebird v2.7.0](https://github.com/petkaantonov/bluebird/releases/tag/v2.7.0 "Release v2.7.0 · petkaantonov/bluebird")で実装
- [when.js  v3.7.0](https://github.com/cujojs/when/releases/tag/3.7.0 "Release 3.7.0: Add cross-lib debugging events · cujojs/when")で実装
- [io.js v1.4.1](https://github.com/iojs/io.js/blob/v1.x/CHANGELOG.md#2015-02-26-version-141-rvagg "Version 1.4.1")で実装 by [@petkaantonov](https://github.com/petkaantonov "petkaantonov")
	- [Consider exposing promise unhandled rejection hook · Issue #256 · iojs/io.js](https://github.com/iojs/io.js/issues/256 "Consider exposing promise unhandled rejection hook · Issue #256 · iojs/io.js")
	- [Implement unhandled rejection tracking by petkaantonov · Pull Request #758 · iojs/io.js](https://github.com/iojs/io.js/pull/758 "Implement unhandled rejection tracking by petkaantonov · Pull Request #758 · iojs/io.js")


-----

# 小さいプロポーサルからの実装

- Promise/A+の頃から同じような話はあった
	- [Library hooks · Issue #3 · promises-aplus/unhandled-rejections-spec](https://github.com/promises-aplus/unhandled-rejections-spec/issues/3 "Library hooks · Issue #3 · promises-aplus/unhandled-rejections-spec")
- DOM/ECMAScript Promiseでも話があった程度
	- 実際に仕様としては入ることはなかった
	- [[whatwg] An API for unhandled promise rejections from Domenic Denicola on 2014-09-12 (public-whatwg-archive@w3.org from September 2014)](https://lists.w3.org/Archives/Public/public-whatwg-archive/2014Sep/0024.html "[whatwg] An API for unhandled promise rejections from Domenic Denicola on 2014-09-12 (public-whatwg-archive@w3.org from September 2014)")

-----

# Implementation in userland

> Implementation in userland
> -- [Consider exposing promise unhandled rejection hook · Issue #256 · iojs/io.js](https://github.com/iojs/io.js/issues/256 "Consider exposing promise unhandled rejection hook · Issue #256 · iojs/io.js")

----

# Implementation in userland

- ユーザランドでの実装から始まっている面白い動き
	- Promise自体もコミュニティ仕様からECMAScript仕様に入った
- io.js にも入ったため、他のPromiseライブラリにも実装が進んでいきそうな空気がある
	- コミュニティ標準から仕様へ?

----

# まとめ

- Promiseでエラーの握りつぶしがよく起きてる
- 現状ではunhandled rejectionの扱いは実装依存
- unhandled rejectionが起きた時に発行するイベントを定義したコミュニティプロポーサルがでた
- bluebirdやio.jsなどで実装された
- ECMAScript仕様の話はまだない