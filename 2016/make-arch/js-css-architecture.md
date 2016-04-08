# JavaScriptのアーキテクチャ

----

## 概要

- DDD/CQRSベースなレイヤードアーキテクチャ
	- Write(コマンド)/Read(クエリ)
	- イベントソーシングはやってない
- DTO(データ変換オブジェクト)はまだ入れてない
	- なのでDomainのインスタンスがViewにそのまま渡す(Read Only)
- テストが可能


----


![fit Archtecture Flow](2016-04-08 10.44.12.jpg)

----

## 実装

- [azu/presentation-annotator: viewing presentation and annotate.](https://github.com/azu/presentation-annotator "azu/presentation-annotator: viewing presentation and annotate.")

----

## 登場人

- View(React Component)
- Write Stack
	- UseCase
	- Repository
	- Domain
- Read Stack
	- Store
- DataBase(Memory)

-----

## View

- React Component
- CSS Architecture(別途)
	- Container + Project Componentベース

-----

## Write Stack :arrow_left:

![fit, right, Archtecture Flow](2016-04-08 10.44.12.jpg)


- ViewからUseCaseを発行(Actionと類似)
- UseCaseと1対1のFactoryを持ってる
	- テストのためというのがメインだが薄いレイヤーがViewとUseCaseの間に欲しかった
	- FactoryがRepositoryのインスタンスをUseCaseに渡す(依存関係逆転の原則)

-----

## Write Stack :arrow_left:

![fit, right, Archtecture Flow](2016-04-08 10.44.12.jpg)

- UseCase
	- Repositoryから永続化されたDomainを取り出す
	- Domainモデルを使って操作する
	- Domainモデルを作ってRepositoryに保存する
- Domain
	- Domainモデル(EntityとValueObject)
	- ビジネスロジックのコア部分(UseCaseはこれを使う役)

-----

## Read Stack :arrow_right:

![fit, left, Archtecture Flow](2016-04-08 10.44.12.jpg)

- Read Modelからなる層
	- 読み込み + 変換がメイン
	- 読み込みのみなので、インフラでありドメインでありアプリである
- Database
	- Write Stackで保存されているデータがある
	- Read Stackから取り出す

-----

## Read Stack :arrow_right:

![fit, left, Archtecture Flow](2016-04-08 10.44.12.jpg)

- DataBaseから読み込んだデータをUIに向けて変換する
	- State, ViewModelに近い概念
- UIは必要になったらRead Stackからデータを取得する
	- 取得したデータを使ってUIを構築する


-----

## READ AND WRITE :left_right_arrow:

![fit, right, EventAggregator](2016-04-08 12.35.04.jpg)

- WriteとReadの協調はどうやるの?
- WriteはDBに書き込み、ReadはDBから読み込む
- DBが変更したことは誰がどう伝えるのか
- Event Aggregator :persevere:
	- シングルトンなEventEmitter
	- 差し替え可能なのでテスト可能に

-----

## 協調動作 :left_right_arrow:

![fit, right, EventAggregator](2016-04-08 12.35.04.jpg)

- EventPub/Sub(Event Aggregate)
  - シングルトンなDomain EventのPub/Sub
  - 実態は中にEventEmitterがいるだけ
  - 差し替え可能にしてテストできる
- ドメインモデルの変更を監視 <->> 監視してる人へ通知

-----

```js
import DomainEventEmitter from "./DomainEventEmitter";
export class DomainEventAggregator {
    constructor() {
        // テストはこれを置き換えちゃう
        this.eventEmitter = new DomainEventEmitter();
    }
    subscribe(EntityName, handler) {
        this.eventEmitter.subscribe(({type, value}) => {
            if (type === EntityName) {
                handler(value);
            }
        });
    }
    publish(EntityName, value) {
        this.eventEmitter.publish({
            type: EntityName,
            value
        });
    }
}
// シングルトン
export default new DomainEventAggregator();
```

----

## Read Stack

![fit, right, EventAggregator](2016-04-08 12.35.04.jpg)

- Store
  - DataBaseから読み込んだDomain + State
  - Viewに向けた形に変換しても良い
- Read(Store)Aggregate
  - Storeをまとめて、一つのでっかいStateとして返すもの
  - Factory の対っぽい役割も持ってる
  - [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth") inspiered by Flux

-----

## Shortcut UseCase -> Read Store

![fit, right, EventAggregator](2016-04-08 12.35.04.jpg)

- UseCaseからStoreへ値をdispatchする仕組みも備えてる
- Stateだけの変更をしたい場合にDomainを通さないで更新することができる


-----


## 課題点

- Factory:UseCase=1:1 はテストのためのコストがある
  - ギリギリ許容範囲かなと思ってるがもう少し意味的に適切な方法があるかも
- ネーミングイマイチ Store Aggregator
- DomainEventAggregator どうなん?
- Shortcut UseCase -> Read Store 使い分けがわかりにくそう

----

## 例) 新しい機能を実装する

[feat: marking specific page of presentation by azu · Pull Request #5 · azu/presentation-annotator](https://github.com/azu/presentation-annotator/pull/5 "feat: marking specific page of presentation by azu · Pull Request #5 · azu/presentation-annotator")

1. UseCaseを実装する
2. Storeを実装する
3. テストを実装する
4. Componentを実装する




-----

## 参考

- CQRS + ES
	- [CQRS+ESをAkka Persistenceを使って実装してみる。](http://www.slideshare.net/MatsushitaSatoshi/cqrsesakka-persistence)
	- [最新DDDアーキテクチャとAkkaでの実装ヒントについて // Speaker Deck](https://speakerdeck.com/j5ik2o/zui-xin-dddakitekutiyatoakkadefalseshi-zhuang-hintonituite)
- DDD クリーンアーキテクチャ
	- [DDD + Clean Architecture + UCDOM Essence版 // Speaker Deck](https://speakerdeck.com/yoskhdia/ddd-plus-clean-architecture-plus-ucdom-essenceban)
	- [Scalaで学ぶヘキサゴナルアーキテクチャ実践入門 // Speaker Deck](https://speakerdeck.com/kimutyam/scaladexue-buhekisagonaruakitekutiyashi-jian-ru-men)
- [レイヤー設計とか、オブジェクト指向とか、DDDとか、その辺 - まっつんの日記](http://mattun.hatenablog.com/entry/2014/07/19/135320)

----
## 参考 

- [[ Android ] – これからの「設計」の話をしよう – NET BIZ DIV. TECH BLOG](https://tech.recruit-mp.co.jp/mobile/android-architecture/)
- [CQRSの小さな演習(1) 現実の問題 - 考える場所](http://blog.fukuchiharuki.me/entry/2016/02/20/173233)

----

## 参考 MVVM

- [MVVMパターンとは？](http://www.slideboom.com/presentations/381148)
- [塹壕よりLivetとMVVM](http://www.slideshare.net/Posaune/livetmvvm)
- [MVVMのModelにまつわる誤解 - the sea of fertility](http://ugaya40.hateblo.jp/entry/model-mistake)
- [MVVMパターンの常識 ― 「M」「V」「VM」の役割とは？ － ＠IT](http://www.atmarkit.co.jp/fdotnet/chushin/greatblogentry_02/greatblogentry_02_01.html)
- [開発者が知っておくべき、6つのUIアーキテクチャ・パターン － ＠IT](http://www.atmarkit.co.jp/fdotnet/chushin/greatblogentry_10/greatblogentry_10_01.html)
