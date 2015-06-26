# ECMAScript Async

-----

# ES6で初めてECMAScriptに非同期処理が入った

- JobQueue
- Promise


-----
# Generator

- Generator

----

# ES7 async/await

- tc39 リポジトリに移動

----

# ES7 Observable

- async-generatorから分離
- rxjs3はこれに
- generatorがベース

----

## リサーチ

- [async/await、Rx、observableのECMAScript近況](https://gist.github.com/azu/b426e536aa3f09d4283c "async/await、Rx、observableのECMAScript近況")
- [Node.js - 最近のjs非同期処理 PromiseとGeneratorの共存 - Qiita](http://qiita.com/kidach1/items/d997df84a0ede39d76ad "Node.js - 最近のjs非同期処理 PromiseとGeneratorの共存 - Qiita")
- [Exploring ES6: Upgrade to the next version of JavaScript](http://exploringjs.com/ "Exploring ES6: Upgrade to the next version of JavaScript")

----

# Stiory


- コールバックだけにしておけというのを若干迷う時代がやってきた
- コールバックがあるに越したことはない
- Promiseがネイティブに入ってきた
- Promise always async
- コールバックやイベントは非同期によく使われるけど、それ自体は非同期ではない
- PromiseとGeneratorは協調できる関係
- 協調した結果を上手く隠せるのがasync/await
- try-catchでのエラーハンドリングができて、同期的なシンタックスで書ける
- さらに発展してRxのObservable

```
{
onNext,
onFinish,
onError
}
```

- の3つを扱える。連続した値を扱えるPromiseみたいなもの
- Promiseはthenable
- Generatorはiterable
- => observableってのはどう?

> observable is an object or function with a subscribe method whose behavior conforms to this specification.

- "Observables A+"
- *ableとなっていく = 抽象インターフェースを揃えていく流れ
- スペックが小さいほど実装が簡単で、フィードバックがくる
- Proimseは大量のフィードバックがあった、それをObsersableでもしたい
- そもそもObservableなぜ欲しいの?
- Promiseは複数扱えない
- 複数のiteratorをしたい
- for on 構文 <= これ必要?
- for of でもいいのでは
- さらにObservableはNetflix系の仕様である。
- Rx自体がかなり大きいい
	- それはオペレータがある
- このObservableの流れにのって
- Netflix系のRxJS Nextが進行中
- プロポーサルに動作を合わせて、generatorを使う
- やっぱり新しい仕様もPromiseかGeneratorが根本に存在している
- 全く新しい構文やコア機能は簡単に入れるのはリスクが高い
	- なのでフィードバックを求めている
- これからは仕様の策定周期をもっと縮めるぞと頑張ってる
- 仕様が決まってからの意見を言ってもしょうがない
- 意見がある人はまずはGitHub Issueを見よう
- まずは何が起きてるかを把握しないと変化に気づけない

ES6は色々変化あったけど、いれたものはこからの仕様のベースとなってる。なのでES6について学ぶことはかなり大事

ES7のプロポーサルではpolyfillableという感じのが多く、現在の仕様へ落とせるものが多い。
今はそういう感じの流れなので、polyfillにしばられる仕様がいいのかは別の問題だけど、そういう