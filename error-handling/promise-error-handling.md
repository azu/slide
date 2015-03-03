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