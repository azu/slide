autoscale: true

# Read/Write Stack | JavaScriptアーキテクチャ

-----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----

# 中規模以上のJavaScript

- 設計が必要になる
- 正しい設計はない [Bikeshed.js](http://connpass.com/event/29019/ "Bikeshed.js") :bike:
	- 人、目的、何を作るかによってアーキテクチャは異なる
- 前回の続き? : [How to work as a Team](http://azu.github.io/slide/2016/reject-sushi/how-to-work-team.html "How to work as a Team")


-----


# 用語

![fit ドメインモデル](./img/ドメインモデル.png)

------


![fit ドメインモデル](./img/ドメインモデル.png)


-----

# 設計の目的

- 中規模以上のウェブアプリ
	- SPAよりは画面が複雑なElectronアプリのようなイメージ
- スケーラブル
	- 人、機能追加、柔軟性、独立性
- 見た目上複雑ではないアーキテクチャ
	- 書き方が特殊ではなく見て分かるもの

-----

# 設計の目的

- テストが自然に書ける
	- パーツごとに無理なく依存を切り離せる
- 新しい機能を追加するときにどこに何があるかが分かる
- ドメインモデルを持てるようにする
	- わかりやすいモデルがありビジネスロジックを持つ
	- Fluxにおける「ドメインロジックをどこに実装するか」問題

-----

# 要求にもとづいてアーキテクチャを作成する

> 要求にもとづいて作業をしていないアーキテクトは、  
> 実際上「大仕掛なハッキング」をしているだけです。

via [オブジェクト開発の神髄](http://bpstore.nikkeibp.co.jp/item/books/P82370.html "オブジェクト開発の神髄")

![inline オブジェクト開発の神髄](http://ec2.images-amazon.com/images/I/51SE5K29G8L._SL500_AA300_.jpg)

-----


# 実装例

[New framework by azu · Pull Request #7 · azu/presentation-annotator](https://github.com/azu/presentation-annotator/pull/7 "New framework by azu · Pull Request #7 · azu/presentation-annotator")

-----
# 考えるポイント

- クライアントサイドで問題点となるのはオブジェクトの永続化
	- シングルトンがでてくる問題
- Write StackとRead Stackを隔離する
	- データの流れがシンプルになる
- 結果統合性のみでは解決しない物がクライアントサイドにある
	- CQRS + Event Sourcing

----

# 全体像(Simple版)

![right fit, workflow-simple.jpg](./img/workflow-simple.jpg)


----

# 全体像(Simple版)


![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

-----


## 登場人物

- View(React Component)
- Write Stack
	- UseCase
	- Domain
	- Repository :arrow_left:
- Read Stack
	- Store
	- Repository :arrow_right:


----

# View

-----

## View


- Reactを使う 以上
- React ComponentとCSSの設計も色々ある
	- コンポーネントなCSS
	- SUIT CSS
	- コンポーネントの分類と命名規則
	- 長いので省略


-----

# Write Stack 

-----
# Write Stack

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

-----


# UseCase

-----

## UseCase

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)


- ViewからUseCaseを発行(ActionCreatorと類似)
- 振るまいの流れを記述する
- トランザクションスクリプトっぽくもある(アプリケーション層)
- UseCaseと対になるFactoryを持ってる
	- Factoryはテストのため
	- FactoryがRepositoryのインスタンスをUseCaseに渡す(依存関係逆転の原則)
- `execute()`にユースケース実装する
-----

# Domain Model

----


## Domain Model

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

- 作ろうとしてるものを表現するオブジェクト
- モデルクラス
- ここでは、データと**振る舞い**を持ったクラス
- できるだけPOJO(Plain Old JavaScript)である
- [いまさらきけない「ドメインモデル」と「トランザクションスクリプト」](http://d.hatena.ne.jp/higayasuo/20080519/1211183826 "いまさらきけない「ドメインモデル」と「トランザクションスクリプト」")

----

## モデルとは…

![inline model](./img/model.jpeg)

via [.NETのエンタープライズアプリケーションアーキテクチャ](http://ec.nikkeibp.co.jp/item/books/P98480.html ".NETのエンタープライズアプリケーションアーキテクチャ　第2版")

----

## :memo: 言葉を定義するのも設計

-----

# Repository

-----

# Repository

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

- ドメインモデルのインタンスを永続化するレイヤー
	- Repositoryパターン
- シングルトン！！！
- `find(id)`/`save(model)`/`delete(model)` 表からはコレクションっぽい
	- JavaScriptの場合はメモリ(ただのMap)として保持する

-----

# Repositoryの永続化問題

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

- クライアントサイドJavaScriptでは永続化が難しい
- どこでインスタンス化するの?問題
- そのためシングルトンなどを使う
- 依存関係逆転の原則
- UseCaseのコンストラクタに引数(依存)としてrepositoryを渡す
	- Factoryはそのための存在


-----

# :memo: 設計の進め方

- 理想のAPIを擬似コードで書くのはあくまで参考
- クライアントサイドでは永続化の持ち方の問題が付きまとう
	- サーバならどっかにプロセス立てて、プロセス同士で通信みたいなことができる
- 実際にデータの流れと状態の持ち方を書いてみて、設計することが重要

-----

> 処理の流れではなく、
> データの流れを定義 
> -- http://www.slideshare.net/MasashiSakurai/javascript-js-53219222

-----

# DataBase

-----

# DataBase

![right,fit, Simple Data Flow](./img/dataflow-architecture.png)

- ただの`Map`オブジェクト
- Repositoryをできるだけシンプルに保つため、データベースもシンプルに
	- `key` : `value` だと簡単で良い
- `localStorage`とかに入れても良い
- 変更されたら変更したことを通知する(実際はrepositoryが投げてる)
	- `emit("Changed")`


-----

## UseCaseで処理の流れを記述

```js
export class UpdatePageNoteUseCase {
    constructor({documentRepository}) {
        this.documentRepository = documentRepository;
    }
    execute({note, pageNumber}) {
        const document = this.documentRepository.lastUsed();
        document.updateNodeAtPage(note, pageNumber);
        this.documentRepository.save(document);// => onChange
    }
}
```

----

## Factory


```js
import documentRepository from "../infra/DocumentRepository";
export class UpdatePageNoteFactory {
    static create() {
        return new UpdatePageNoteUseCase({
            documentRepository
        });
    }
}
```

-----

## Async UseCase

```js
export class AddTodoItemUseCase{
    constructor({todoListRepository, todoBackendServer}) {
        this.todoListRepository = todoListRepository;
        this.todoBackendServer = todoBackendServer;
    }
    execute({title}) {
        const todoList = this.todoListRepository.lastUsed();
        const todoItem = todoList.addItem({title});
        return this.todoBackendServer.add(todoItem).then(() => {
            this.todoListRepository.save(todoList);
        });
    }
}
````

-----

## Transaction UseCase(再利用性)


```js
export class TransactionTodoUseCase {
	//...
    async execute({title}) {
        const options = {
            todoListRepository: this.todoListRepository,
            todoBackendServer: this.todoBackendServer
        };
        const addTodo = new AddTodoItemUseCase(options);
        const updateTodoItem = new UpdateTodoItemTitleUseCase(options);
        const removeTodoItem = new RemoveTodoItemUseCase(options);
        // Add => Update => Remove
        await addTodo.execute({title});
        await updateTodoItem.execute({itemId: todoItem.id, title: "UPDATING TITLE"});
        await removeTodoItem.execute({itemId: todoItem.id});
    }
}
````



-----

## 参考

- [今日からはじめる情報設計](http://www.bnn.co.jp/dl/mess/ "今日からはじめる情報設計")
- .net
- IDDD
-  オブジェクト開発の神髄