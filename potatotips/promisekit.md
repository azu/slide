title: "Objective-CでのPromise処理"
author:
  name: azu
  twitter: azu_re  
  url: http://efcl.info/
theme: /Users/azu/Dropbox/workspace/slide/cleaver-scrolldeck.js
output: promisekit.html
---

# Promise Starter Kit

### PromiseKitについて

--

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

--

# Promises?

- PromiseKitはJavaScriptのPromise A/+を参照してる
- Promise A/+ は`then`メソッドについて取り決めたコミュニティ仕様
- JavaScriptの仕様としてはA/+をベースにES6 Promisesが策定された
- ES6については [JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本") で書いた
- Promiseの仕様自体はとても小さい

--

# Promises A/+

- ✔ then
- ✘ Wait (=>Promiseを使って可能)
- ✘ Deferred (=>Promiseを使って可能)
- ✘ Progress
- ✘ Cancel
- [Promises/A+ · Issue #7 · mxcl/PromiseKit](https://github.com/mxcl/PromiseKit/issues/7 "Promises/A+ · Issue #7 · mxcl/PromiseKit")

--

# Promiseライブラリ

- [PromiseKit](http://promisekit.org/ "PromiseKit")
- [RXPromise](https://github.com/couchdeveloper/RXPromise "couchdeveloper/RXPromise")
- ✘ [Bolts](https://github.com/BoltsFramework/Bolts-iOS "Bolts")はPromiseライクであってPromiseではない

--

# Promise Syntax

- Promiseの基本的な書き方

### NSURLConnectionの例

- `NSURLConnection#sendAsynchronousRequest`のラッパ
    - 非同期通信のPromiseラッパを書く
- `+ (PMKPromise *)getURL:(NSURL *) URL`
- 返り値はPromiseオブジェクト

--

# getURL

- PromiseコンストラクタからPromiseオブジェクト(インスタンス)を作り返す
- コンストラクタの中で(非同期)処理を行う
- 処理の成否によって、`fulfill` または `reject` を呼ぶ

```objectivec
+ (PMKPromise *)getURL:(NSURL *) URL {
    return [PMKPromise new:^(PMKPromiseFulfiller fulfiller, PMKPromiseRejecter rejecter) {
        NSURLRequest *request = [NSURLRequest requestWithURL:URL];
        [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue currentQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
            if (connectionError) {
                rejecter(connectionError);// 失敗
            }else {
                fulfiller(data);// 成功
            }
        }];
    }];
}
```

--

# Promiseオブジェクト

- promiseオブジェクトにはそれぞれのコールバックを登録
    - `then` で成功時に呼び出すコールバック(fulfillされた)
    - `catch` で失敗時に呼び出すコールバック(rejectされた)
- Promiseコンストラクタの処理結果によってどちらかが呼ばれる

``` objectivec
PMKPromise *httpPromise = [HTTPPromise getURL:[NSURL URLWithString:@"http://example.com/get"]];
httpPromise.then(^(NSData *result) {
   NSDictionary *object = [NSJSONSerialization JSONObjectWithData:result options:0 error:nil];
   NSLog(@"%@", object)
}).catch(^(NSError *error) {
   NSLog(@"%@", [error localizedDescription]);
});
```

--

# Promiseは値の器

- Promiseは値を抽象化したオブジェクト
- 将来的に **"正常な値"** or **"異常な値"** が入る事を予約したオブジェクト
- 値が入った時に `then` or `catch` を呼ぶという機能を持つ器

--

# Promiseの状態は3つだけ

![promise-state](http://azu.github.io/promises-book/Ch1_WhatsPromises/img/promise-states.png)


- Fulfilled
    - resolve(成功)した時。この時 thenで登録したコールバック が呼ばれる
- Rejected
    - reject(失敗)した時。この時 catchで登録したコールバック が呼ばれる
- Pending
    - resolveまたはrejectではない時。つまりpromiseオブジェクトが作成された初期状態

--

# Promiseは使い捨てオブジェクト

- promiseオブジェクトは一度状態が変更したらそれ以降は不変
- fulfilled or rejectedの事をsettled(不変)ということがある
- つまり、同じPromiseオブジェクトを使いまわさない(immutable)
- thenも常に新しいオブジェクトを作成して返す
- = そこそこコストはあるけど、費用対効果

--

# Promiseは連鎖的に書ける

- `then`や`catch`はメソッドチェーンなので連続で書ける
- `then`や`catch`は毎回新しいpromiseオブジェクトを返して連鎖する

```objectivec
PMKPromise *promise = [PMKPromise promiseWithValue:@0];
promise.then(^{
   NSLog(@"Task A");
}).then(^{
   NSLog(@"Task B");
}).catch(^(NSError *error) {
   // A or B でエラーがある場合はここでキャッチされる
   NSLog(@"error = %@", error);
}).then(^{
   NSLog(@"Final Task");
});
```

--

# Promiseチェインの図

- 先ほどの例はエラーが無いので`.catch`は呼ばれない
- A -> B -> Final Taskとなる


![flow](http://azu.github.io/promises-book/Ch2_HowToWrite/img/promise-then-catch-flow.png)

--

# 複数のリクエストを同時に?

- 複数のAPIを叩き、全て取得したら次の処理をしたい
- A,B,C のデータを取ってから次の処理へ
- Promise allを使うことが簡単に行える

``` objectivec
PMKPromise *aPromise = [HTTPPromise getURL:[NSURL URLWithString:@"http://example.com/a"]];
PMKPromise *bPromise = [HTTPPromise getURL:[NSURL URLWithString:@"http://example.com/b"]];
PMKPromise *cPromise = [HTTPPromise getURL:[NSURL URLWithString:@"http://example.com/c"]];
// a,b,c 全てがresolveされた時にコールバックが実行される
[PMKPromise all:@[aPromise, bPromise, cPromise]].then(^(NSArray *results) {
   NSData *aResult = results[0];// aのレスポンス
   NSData *bResult = results[1];// bのレスポンス
   NSData *cResult = results[2];// cのレスポンス
}).catch(^(NSError *error) {
   NSLog(@"error = %@", error);
})
```

--

# Promiseとエラーハンドリング

- Promiseを使う意義の一つ
- コンストラクタでreject、またはNSErrorの値を返すとcatchされる
- Promise内で起きたエラーは自動的に`try-catch`され、Promiseでcatchできる
    - 64bit環境なら`@try`はゼロコスト
    - [Objective-Cのtry-catchはスロー - まとーか鈴木](http://matouka-suzuki.hatenablog.com/entry/2014/07/15/012551 "Objective-Cのtry-catchはスロー - まとーか鈴木")
- それぞれ個別の処理からはエラーハンドリングがなくなる(rejectするだけ)
- Promiseを使うときにエラー処理を書くため処理が分散しにくくなる
- 逆に`.catch`を書き忘れると何も言わなくなってしまう
- Promiseでは非同期処理に目が行きがちだがエラーハンドリングの方を優先した方がいい

--

# then は新しいオブジェクトを返す?

- Promiseはメソッドチェーンできるが、毎回新しいオブジェクトを返す

``` objectivec
PMKPromise *promise = [PMKPromise promiseWithValue:@1];
PMKPromise *newPromise = promise.then(^{
    return @1;
});
XCTAssertNotEqualObjects(promise, newPromise);
```

--

# Promiseとスレッド

- Promiseの処理は非同期で開始される
- `.then`の中でUIアップデートは大丈夫?
    - PromiseKitが取り計らってmain threadで実行してくれる
    - thenもバックグラウンドでやりたい場合はthenOnを使う

--

# 完璧なPromiseはない

- Promise A/+はあくまでJavaScriptの世界
- Objective-Cのようなスレッドについての定義はない
- 他の言語に持ってくる場合はどうしても独自の解釈が必要
- PromiseKitはPromise A/+に合わせつつ、使い勝手を考慮した実装

--

# Promiseは万能ではない

- 非同期コールバックで実現できない事をPromiseでやろうとするのは辞めよう
    - JSのPromiseは既にある非同期関数を利用する一つの手段という立ち位置
- 何でもPromiseで解決しようとするのはよくない
- PromiseにはProgressは普通持ってない(何度も呼ぶ処理だし)
   - NSOperation + NSProgressの方がシンプルな事も
- Objective-CにはRunLoopがある
    - 同期的にやるなら(コールバックで実現できない)Promiseは使わない

--

# ユースケース

- 非同期APIで認証してからでないと叩けないAPIを使う時
    - ログインAPI + 非同期通信API
- [HealthKit等](https://github.com/azu/WriteHealthKit "azu/WriteHealthKit")(非同期で権限の取得 + データの取得も非同期)
- Promiseを使うことで、処理を抽象的な値として持つことが可能になる
    - それぞれの処理をPromiseでラップして、組み合わせるだけで良くなる
- 非同期処理のエラーハンドリングの簡潔化
    - NSOperationだと全て自分でやる必要がある

--

# まとめ

- [PromiseKit](http://promisekit.org/ "PromiseKit")はPromises A/+に独自機能を加えたもの
    - Promises A/+の仕様自体は小さい
- Promiseは非同期処理をPromiseオブジェクトとして扱える
    - 複数の非同期処理をまとめる時等に有効
- Promiseは強いエラーハンドリングを持ってる
    - エラーハンドリングをちゃんと書かないと迷子になる
- Promiseは万能ではないので、適材適所

--

# おわり

### 参考資料

- [PromiseKit](http://promisekit.org/ "PromiseKit")
- [JavaScript Promiseの本](http://azu.github.io/promises-book/ "JavaScript Promiseの本")

--
# その他

- 元の仕様は型がないJS向けだが、Objective-Cとの親和性は悪くない
- PromiseKitは[Swift](https://github.com/mxcl/PromiseKit#swift "Swift")版もある
- Swift版はジェネリクスとか色々
    - [PromiseKit/swiftを読んだ - naoty.to_s](http://naoty.hatenablog.com/entry/2014/08/13/021253 "PromiseKit/swiftを読んだ - naoty.to_s")
- SwiftはScalaの[Future](http://docs.scala-lang.org/ja/overviews/core/futures.html "Future")とか参考にした方がいいでのは

--

# エラーハンドリング忘れると…

- どこでエラーが起きたのかわからなくってしまう

## 対策

- [done](http://azu.github.io/promises-book/#promise-done "done")の使用
- ライブラリ側にunhandled rejectionの処理をいれてもらう
- デバッグ時にPromiseの実装をすり替えてログをださせる