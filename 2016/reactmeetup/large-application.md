autoscale: true
theme: Plain Jane,5

# 複雑なJavaScriptアプリケーションを考えながら作る話

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----

# [#jsprimer](https://asciidwango.github.io/js-primer/)書いています

## JavaScriptの入門書に興味ある人はウォッチ


----

# :warning: 注意 :warning:

- 作成するアプリケーションによって必要な構造は異なります
- 今回の話はある程度の規模で複雑性を持つクライアントサイド
	- ライブラリ抜きで数万LOC >=
- 長期的にメンテンナンスや変更が発生するアプリケーション
- サーバサイドレンダリングはしないクライアントアプリケーション

-----
# 3行でOK

- 複雑なJavaScriptアプリケーションを作るにあたり[ドメインモデルをどう実装するか悩んだ](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html)
- [色々](http://azu.github.io/slide/2016/make-arch/js-css-architecture.html)と[試行錯誤](http://azu.github.io/slide/2016/bikeshedjs/javascript-read-write-stack.html "Read/Write Stack | JavaScriptアーキテクチャ")した[結果](http://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html)として[Almin.js](https://github.com/almin/almin "Almin.js")を作った
- まあ半年ぐらい議論しながら開発してできた[ガイドライン](TODO)、[Reactらしい]()実装、[CSSの実装ガイド]()とかの[参考資料](ここ)はここに置いてあるよ


-----

# 対象

- Flux(util)やReduxを使って何か作った事がある人
- Flux実装を書いたことがある人

-----

# 目的

- 難しいものを簡単には作れない
- 難しいものは考えて作るしかない
- 考えて作っていくためには、議論できる言語化されたコードが必要
- そのためには構造化が必要
- ルールは明確に、でも最初から明確なワケではない
- どうやってそれらを行っていったかについて

-----

# 構造化の目的

- 長期的に動くものを書くため
- 属人性が高くならないように、議論して開発できる構造が必要
- 最初から完成している設計はない
	- 立ち上げ時は方向性を決めてコアドメインを作る
	- [20151110 ドメイン駆動設計によるサービス開発](http://www.slideshare.net/maoohnishi3/20151110-54980095 "20151110 ドメイン駆動設計によるサービス開発")
- ドメインモデルも時間で変化する、そのため考え続けないといけない

------

# [Flux](http://facebook.github.io/flux/ "Flux")

## /flˈʌks/


-----

![fit, overview](img/flux-overview.png)

-----

![10min-flux, inline](./img/10min-flux.png)

## [azu.github.io/slide/react-meetup/flux.html](http://azu.github.io/slide/react-meetup/flux.html "10分で実装するFlux")

----

# Fluxのデータフローはわかった

- でも、ドメイン、ロジックはどこに書くの?
- ActionCreator or Store?
- StoreはViewModelのようなViewに対するStateを管理する場所にも見える
  - Reduxの中でもその答えがあるわけではない
- ドメインモデルはどこにいるのか?
  - ここでいうドメインモデルはデータと振る舞いを持ったモデル

-----

# Fluxの中でのロジック

- ActionCreator or Store or Componnet?

> Stores contain the application state and logic.
> -- [Flux | Application Architecture for Building User Interfaces](https://facebook.github.io/flux/docs/overview.html "Flux | Application Architecture for Building User Interfaces")

Storeはデータとロジックを持つ

----

# [How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html "How to work as a Team") @ 2016/02/23 [#reject_sushi](http://efcl.info/2016/02/23/reject-sushi/)

----

![inline How to work as as Team 1](./img/t1.png)

----

![inline How to work as as Team 2](./img/t2.png)

----


![inline How to work as as Team 3](./img/t3.png)

----


![inline How to work as as Team 4](./img/t4.png)

-----

## ここまで

- Fluxは一方通行のデータフローを定めている
- Storeの役割が直感的ではないという意見
- ただのStateを持つObservableな箱とした方が分かりやすい

-----

# 少しFluxの見方を変える

-----

# FluxをDomain Modelに置き直してみる

- View(プレゼンテーション層)
- ActionCreator(アプリケーション層)
- Store(アプリケーション層)
- Store？？？(ドメイン層)
- Web API(インフラストラクチャ層)

-----

# Domain Model

- Fluxでは明確なDomain Layerがない
- Storeがアプリケーションのドメイン、状態(State)を[合わせ持つ](https://facebook.github.io/flux/docs/overview.html)
- ActionCreatorがInfraを使うので、永続化の問題をどうするか別途考える必要がある
	- WebSocketで繋ぐAPIとかを考えると分かりやすい

![flux layer, right](img/flux-layer.png)

----

# Fluxのいいところ(確認)

- データフローが一方通行になってる

----
# Fluxの曖昧なところ

- Domain Layerが曖昧
- Storeがアプリケーションの状態とViewの状態とロジックを含んでいる
- Fluxのまま構造化をするなら、Storeの中で構造化が必要
- Storeを構造化する例: [FluxとDDDの統合方法 - かとじゅんの技術日誌](http://blog.j5ik2o.me/entry/2016/09/09/200643 "FluxとDDDの統合方法 - かとじゅんの技術日誌")

![flux layer, right](img/flux-layer.png)

----

# Storeの曖昧さ

- FluxのStoreは2つの側面を持っている
	- Actionを受け取りデータを更新(**Write**)
	- Viewからの要求によりデータを返す(**Read**)
- せっかく一方通行なので、Storeがやることも一つの方向にしたい
- この2つを出来る限り切り離したい

-----

# ショッピングカート
## Storeが曖昧な例
## [voronianski/flux-comparison](https://github.com/voronianski/flux-comparison "voronianski/flux-comparison")

![fit shopping cart](img/shopping.png)

-----

# ショッピングカート


![right, fit, shopping cart](img/shopping.png)

- ショッピングカートはStoreの2つの側面を見るいい例
- 商品の在庫とカートの中身を同時に扱わないと行けない問題を含んでいる


-----
# ショッピングカートのStore

![right,fit, shopping cart](img/shopping-store.png)


- ProductStore
	- アイテム
	- 在庫数
- CartStore
	- カートのアイテム × 数
	- 合計金額


-----
# 前提の話

- 前提
	- Viewにロジックは書かない
	- CartStoreからカートのStateを取れる、ProductStoreからは商品のStateが取れる(StoreはViewへのマッピングもしてる)
	- 在庫がない場合はカートに入れることはできない(Sold Out)

-----

# 依存の問題

- CartStoreにアイテムを追加するときに、ProductStoreに在庫があるかを確認しないといけない
- CartStoreはProductStoreに依存している

![fit, right, shopping cart](img/shopping-store-deps.png)

----

# 依存の問題

- Storeを完全に独立したものとして実装してしまうと問題が起きる
- "カートにアイテムを入れる"というAction
	- ProductStoreから在庫を減らす
	- CartStoreにアイテムを追加する
- Product -> Cartの順番で行わないと在庫がないのにカートにアイテムが入るなどの問題を起こしがち


----

# 問題の解決方法

- Redux
	- Storeは1つ = [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")
	- 1つなので、CartはProductを知っている
- Facebook/flux
	- `waitFor` - dispatchされたActionの処理順を明示する
- 他: [voronianski/flux-comparison](https://github.com/voronianski/flux-comparison "voronianski/flux-comparison")

-----

#　問題の原因

- 1つのモデル(Storeのこと)で2つの方向の処理を行っているのが複雑な原因
	- Actionを受け取り処理(ロジック) と Viewに対する状態の作成
- **ロジックの処理**と**View向けの状態の作成**の両方を1つのStoreの中で処理している
	- 複雑度が N × N になる
- **ロジックの処理**と**View向けの状態の作成**向けに2つのモデルを用意すればもっと単純化できる?
	- 複雑度が N + N になる

-----

# CQRS

-----

![fit CQRS](./img/CQRS.png)

-----

# CQRS(コマンドクエリ責務分離)

- Command Query Responsibility Segregation
- 構造をコマンド(**Write**)とクエリ(**Read**)で縦に割る
- クエリ(**Read**)は読み取りのみなので単純化する
- 詳しくは[.NETのエンタープライズアプリケーションアーキテクチャ　第2版](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版")

----

# FluxのWriteとRead

- Storeの中で構造化するため上手く割り切れない
- Action(Command)がStoreに書き込む(Write)
- ViewがStoreからState(Query)を読み取る(Read)

![right, flux-layer-cqrs.png](./img/flux-layer-cqrs.png)

-----

# やっと本題

-----

# [Almin.js](https://github.com/almin/almin "almin/almin")

![fit Almin.js](https://almin.github.io/media/logo/logo.png)

-----

# ここからの話

- [Almin.js](https://github.com/almin/almin "Almin.js")を作るまでに考えた設計の概念的な話
	- 理想的な形をクライアントサイドで動く現実の形に落とす話
- コードの解説ではないです
	- ドキュメントを見て
	- [https://almin.js.org](https://almin.js.org/)

-----


# 考えるポイント

- クライアントサイドで問題点となるのはオブジェクトの永続化
	- シングルトンがでてくる問題
- Write StackとRead Stackを分離 = CQRS
	- 複雑度の掛け算をなくす
- ドメインモデルを書ける構造を作る

----


# 全体像(Simple版)

![right,fit, Simple Data Flow](./img/almin-layer.png)

## 画像は概念イメージ

-----


![fit, Almin Layer](./img/almin-layer.png)

-----


## 登場人物

- View(React Component)
- Write Stack
	- UseCase
	- Domain
	- Repository :arrow_left: 同一かも
- Read Stack
	- Store
	- Repository :arrow_right: 同一かも


----

# Alminが提供してるのこれだけ

![Alminが提供してる所,fit,right](img/almin-layer-usecase-store.png)

- いわゆるFluxライブラリと対して変わらない
- しかしこの構造を強く意識作り、ドキュメント
- ここからの話はあくまでパターンにすぎないので、ライブラリに依存した何かではないはず

----

# View

-----

## View


- Reactを使う
- PoastCSS使ってる
- 以上

-----

# Write Stack(コマンド)

-----
# Write Stack

![right,fit, Almin Layer](./img/almin-layer.png)

-----

> **Start from the Use Cases**
> The best place to start when trying to understand a new domain is by mapping out use cases.
> -- [Patterns, Principles, and Practices of Domain-Driven Design](http://www.wrox.com/WileyCDA/WroxTitle/Patterns-Principles-and-Practices-of-Domain-Driven-Design.productCd-1118714709.html "Patterns, Principles, and Practices of Domain-Driven Design")


^ ドメインはアプリケーション毎に複雑さがあり、ドメインを理解するにはどういうユースケースがあるかを考える所から始めるのが良いという話

-----


# UseCase

-----

## UseCase

![right,fit, Almin Layer](./img/almin-layer.png)


- ViewからUseCaseを発行(ActionCreatorと類似) [^UseCase]
- ドメインを使った**処理の流れ**を記述する
- ここに処理の内容を全部書くとトランザクションスクリプト
- UseCaseと対になるFactoryを持ってる
	- Factoryはテストのため(コンストラクタによる依存解決)

[^UseCase]: アクターがシステムに対して何をしたいかを書く場所

-----

## トランザクションスクリプトとドメインモデル

![inline, ビジネスロジックの複雑さ](http://image.itmedia.co.jp/im/articles/0702/21/r5extend08_04.gif)

via [ドメイン層に最適なアーキテクチャを考える](http://www.itmedia.co.jp/im/articles/0702/21/news110_4.html "保守性・拡張性に優れたシステムを作る（8）：ドメイン層に最適なアーキテクチャを考える (4/4) - ITmedia エンタープライズ") 元はPoEAA

-----

> トランザクションスクリプトで始めた場合は、ドメインモデルの方向へためらわずにリファクタリングしてほしい   (中略)
> これらの3つのパターンは相互に排他的な選択肢ではない。実際にドメインロジックの一部にトランザクションスクリプトを使用し、それ以外にテーブルモジュールまたはドメインモデルを使用することは珍しくない。[^PoEAA, p33]

-----

## UseCaseの例

Todoを追加する

- `TodoRepository`から`TodoList`のインスタンスを取り出す
- `TodoList`に`TodoItem`を追加する
- `TodoRepository`に`TodoList`を保存する

-----

## AlminのUseCase例

```js
import {UseCase} from "almin";
export class AddTodoItemUseCase extends UseCase {
    execute(title) {
        // ユースケースの内容を書く
        // TodoListにTodoItemを追加するというロジック
        // ここに全部書いちゃうとトランザクションスクリプトっぽい
    }
}
```

----

# Domain Model

----

## Domain Model

![right,fit, Almin Layer](./img/almin-layer.png)


- 作ろうとしてるものを表現するオブジェクト[^図]
- モデルクラス
- ここでは、データと**振る舞い**を持ったクラス
- できるだけPOJO(Plain Old JavaScript)である
- [いまさらきけない「ドメインモデル」と「トランザクションスクリプト」](http://d.hatena.ne.jp/higayasuo/20080519/1211183826 "いまさらきけない「ドメインモデル」と「トランザクションスクリプト」")

[^図]: 概念にすぎず、データや処理の流れを表すものではありません


----

## モデルとは…

![inline model](./img/model.jpeg)

via [.NETのエンタープライズアプリケーションアーキテクチャ](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版")

^ モデルは人やアーキテクチャによって多重定義された用語です。
ここでは、データと**振る舞い**を持ったクラスのことをモデルと呼んでいます。

-----

![models](./img/models.png)


-----

# モデル例: Todo

- `TodoList`: TodoItemを管理する
- `TodoItem`: TodoItemのオブジェクト

> TodoList に TodoItem を追加する

```js
function addNewTodo(title){
    // TODO: 毎回TodoListを作ってるのはおかしいけど…
    const todoList = new TodoList();
    const todoItem = new TodoItem({title});
    todoList.addItem(todoItem);
}
```

-----

# TODOを追加するUseCase

```js
import {UseCase} from "almin";
export class AddTodoItemUseCase extends UseCase {
    execute(title) {
        const todoList = new TodoList();
        const todoItem = new TodoItem({title});
        todoList.addItem(todoItem);
    }
}
```


-----

# モデルの永続化

- モデルをPOJOで書けることは分かる
- モデルはどこでだれが永続化するの?
- => Repositoryが永続化を考える層
- モデルは自身の永続化の方法をしらない(関心がない)

-----

# Repository

-----


## Repositoryとは :memo:

ここでは、ドメインモデルの永続化に対処する層のこと

![inline, fit,Term repository](./img/term-repository.png)


-----

# Repository

![right,fit, Almin Layer](./img/almin-layer.png)

- ドメインモデルのインタンスを永続化する場所 [^図r]
	- Repositoryパターン
- Repository自体はシングルトン！でインスタンス化する
- `findById(id)`/`save(model)`/`delete(model)` などAPIからはコレクションっぽい

[^図r]: 概念にすぎず、データや処理の流れを表すものではありません

-----



# Repositoryの保存先?

-----

# Database


![right,fit, Almin database](./img/almin-layer-database.png)

- Repositoryの実装毎に保存先は違う
- メモリ上でいいならただの`Map`オブジェクトでいい
	- localStorageとかIndexedDBなど色々
- Databaseが変更の検知はRepositoryでやる

-----


```js
import {UseCase} from "almin";
export class AddTodoItemUseCase extends UseCase {
    constructor({todoListRepository}) {
        super();
        this.todoListRepository = todoListRepository;
    }
    execute(title) {
        // RepositoryからTodoListのインスタンスを取得
        const todoList = this.todoListRepository.findById(todoListId);
        const todoItem = new TodoItem({title});
        todoList.addItem(todoItem);
        // RepositoryにTodoListを保存する
        this.todoListRepository.save(todoList);
    }
}
```

-----

# Repositoryのインスタンス化の問題

![right,fit, Almin database](./img/almin-layer-database.png)

- クライアントサイドJavaScriptでは永続化が難しい
- どこでインスタンス化するの?問題
	- それへの現実解としてシングルトンが出てくる
- DomainはRepositoryに依存させない
- => **依存関係逆転の原則(DIP)**
- UseCaseのコンストラクタに引数(依存)としてrepositoryを渡す
	- ここではUseCaseのFactoryがそのための存在

-----

# 依存関係逆転の原則(DIP)

> 上位のモジュールは下位のモジュールに依存してはならない。どちらのモジュールも「抽象」に依存すべきである。
> 「抽象」は実装の詳細に依存してはならない。実装の詳細が「抽象」に依存すべきである。
> -- [依存関係逆転の原則（DIP） - Strategic Choice](http://d.hatena.ne.jp/asakichy/20090128/1233144989 "依存関係逆転の原則（DIP） - Strategic Choice")

-----

![fit, Almin DIP](./img/almin-layer-dip.png)

-----


```js
import {UseCase} from "almin";
// シングルトンを渡すだけのFactoryクラス
import todoListRepository from "../infra/TodoRepository"
export class AddTodoItemUseCaseFactory {
    static create() {
        return new AddTodoItemUseCase({ todoListRepository });
    }
}
// テストする際は直接`UseCase`クラスを使う
export class AddTodoItemUseCase extends UseCase {
    constructor({ todoListRepository }) {
        super();
        this.todoListRepository = todoListRepository;
    }
    execute({ title }) {
        // ... ユースケースの内容
    }
}
```

-----

# 依存関係逆転の原則(DIP)

- Factoryが依存をUseCaseへ渡す
- UseCaseやドメインがリポジトリに依存しなくて良い
- ドメインがちゃんと永続化できる
	- シングルトンのリポジトリは常に存在するから
- テスト時はUseCaseのコンストラクタにDIすることでテストもできる

![right,fit, Almin DIP](./img/almin-layer-dip.png)


-----


# Read Stack(クエリ)

-----

![fit CQRS](./img/domain-model-vs-cqrs.png)

-----

# Write(Command)とRead(Query)

- CQRS (Command Query Responsibility Segregation)
- ざっくり: WriteとReadを層として分けて責務を分離する
- 一方通行のデータフロー
- FluxとかReduxでやっていることと同じ

-----

![fit, flux](./img/flux.png)

-----

# Read Stack

![left, fit, Almin Layer State](./img/almin-layer-state.png)

- ReadはRepository経由でデータを読み込んでView用のデータを作って渡すだけ[^図]
- 読み取り専用(保存したデータの変更はしない)ので色々簡略化できる
- 縦に別れたので、テスト依存関係が簡略化できる！

[^図]: やっぱりただの概念で、依存のフローという話ではない

----

## Read Stack


![left, fit, Almin Layer State](./img/almin-layer-state.png)

- Repository
	- Write Stackと同じものを参照するでも良い
- Read Model(State)
	- Writeのドメインから振るまいを消したモデルを作ってもよい
	- ドメインモデル貧血症にわざとしても良い = Viewのためのモデルなので
- Store
	- FluxのStoreと同じだけど、Read Stackでは一番重要
	- ここではStateを格納してる入れ物という感じ


[^図]: ご自由に考えて

----

# Store

![left, fit, Almin Layer State](./img/almin-layer-state.png)

- StoreはStateを持つオブジェクト[^図]
- StateをUIに渡してUIはそれを使って更新する
- StoreはStateが更新された事をUIに伝える

[^図]: Storeは入れ物、Stateは中身という考え方

----

# クライアントサイドで多発する問題:warning:

-----
# クライアントサイドで多発する問題

- これはRepositoryを経由したStore/Stateの更新までの流れ
- クライアントサイドではStateを直に更新して、UIにすぐ反映されて欲しいことがある
	- 1F以内にアクションがViewに反映されて欲しいケース
	- ローディング、モーダル、アニメーション
	- 「ほんのいっとき」が許されないケースはクライアントサイドにはある
	- コンポーネントに閉じ込めるというのあり
- そのため縦(Read/Writeの層)じゃなくて、横のルールも必要

----

![inline p299](./img/p299.png)

via [.NETのエンタープライズアプリケーションアーキテクチャ　第2版](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版") p299


-----

# UseCase -> Store

![right, fit, almin-flux.png](./img/almin-layer-usecase-store.png)


- UseCaseからdispatchしたイベントが、Storeに届く横のルート
	- 抜け穴感があるので慎重に取り扱いたい
- FluxやReduxはこのルートが基本的な流れ

-----

# [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")

- Alminでも基本的には[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")
- Storeをまとめる`StoreGroup`という概念を持ってる
	- 一つのアプリはStoreはたくさん存在する
	- Storeが同期的に一斉にemitChangeすると、何回もUIが更新されてしまう
	- StoreGroupは同時に発生したemitChangeを一つにまとめる
		- `requestAnimationFrame`などで間引く or UseCaseの実行が終わったら確認する
		- イベントを間引く役 = UI層に近い

-----

## 実装したもの

- [Almin.js](https://github.com/almin/almin "Almin.js")
	- このスライドで書いた内容大体そのまま実装
	- [Counter](https://github.com/almin/almin/tree/master/docs/counter "Counter Example")
	- [TodoMVC](https://github.com/almin/almin/tree/master/example/todomvc "TodoMVC")
	- [Shopping Cart](https://github.com/almin/almin/tree/master/example/shopping-cart "almin/example/shopping-cart at master · almin/almin")

-----

# まとめ

- Fluxと呼ばれてるものが、CQRSとどのような点で同じで異なるのかを示した
- イベントソーシングは抜いてCQRSについて考えAlminを実装した
- ドメイン/ビジネスロジックをちゃんと考えて実装できるような状況を作った
	- コアドメインについてはちゃんと考えて、相談しながら作らないできない

-----

# まとめ

- アプリケーションの種類毎に適当なアーキテクチャは異なる
	- アーキテクチャが良くできていても、ステートフルなDOMという巨大なモデルとの戦いは存在する
	- Reactでは吸収できない状態はある `<audio>`とか`<video>`とか`<canvas>`
- 万能なアーキテクチャは存在しない

-----

# まとめ

- 今回はイベントソーシングではなくステートソーシング
	- 複雑なものをイベントソーシングで上手くやるイメージがまだない
	- Entity自体はImmutableで実装した方が良い(Readでのモデルの共有とか考えるなら尚更)


-----

## Write Code Thinking :)

-----


## 時系列

- [10分で実装するFlux](http://azu.github.io/slide/react-meetup/flux.html)
- [How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html)
- [JavaScriptのアーキテクチャ](http://azu.github.io/slide/2016/make-arch/js-css-architecture.html)
- [Read/Write Stack | JavaScriptアーキテクチャ](http://azu.github.io/slide/2016/bikeshedjs/javascript-read-write-stack.html)
- [Almin.js | JavaScriptアーキテクチャ](http://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html)

-----

## 実装

- [Introduction · Almin.js](https://almin.js.org/ "Introduction · Almin.js")
	- CQRSなどを考えて作ったライブラリ
- [almin/example/shopping-cart at master · almin/almin](https://github.com/almin/almin/tree/master/example/shopping-cart "almin/example/shopping-cart at master · almin/almin")
	- ショッピングカートをAlminで実装したもの