title: mogenerator - potate tips
author:
  name: azu
  twitter: azu_re
  url: http://efcl.info/
output: mogenerator.html

--

<style>
section[data-page="0"]{
    background-image: url("./mogeneratorteam.png");
    background-repeat: no-repeat;
}
section[data-page="0"] h1{
    padding-left: 177px;
    margin : 0;
}
</style>

# mogeneratorでモデルクラス作成

--

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

--

# [mogenerator](http://rentzsch.github.io/mogenerator/ "mogenerator + Xmo’d")

--

## [mogenerator][]

* CoreDataのカスタムモデルクラスを生成するコマンドラインツール
* `.xcdatamodel` ファイルを元に自動生成
* 役割はXcodeの `Create NSManagedObject Subclass...` と同じ
	* xcdatamodelを更新しても安全 + 柔軟性がある

[mogenerator]: http://rentzsch.github.io/mogenerator/  "mogenerator + Xmo’"

--

## mogeneratorの基本

* 一つのEntityに対して `human` と `machine` の2種類のクラスを生成
	* `human` は `machine` のサブクラスとして実装されている
* モデル再作成時(mogenerator再実行時)
	* `human` は上書きされないのでユーザーがモデルに対して追加の実装を書ける
	* `machine` は実行する度に上書きされるのでユーザーは触らないクラス

--

**例)** CoreData.xcdatamodel に`Person`  というEntityがあるの場合

- `_Person.{h,m}`(machine)
- `Person.{h,m}` (human) 
- 合計4つのクラスが作成される

--

## mogeneratorのインストール

インストーラーでインストール

* [mogenerator + Xmo’d](http://rentzsch.github.io/mogenerator/ "mogenerator + Xmo’d") からpkgでインストール

Homebrewでインストール

	brew install mogenerator

--

## mogeneratorの使い方

``` bash
$ mogenerator \
  --template-var arc=true \ # ARC有効のテンプレを使う
  -m /path/to/Model.xcdatamodeld \
  -O /path/to/output/
```

* `-m` で `.xcdatamodeld` を指定
* `-O` で  生成したモデルクラスの出力先を指定
* `--template-var arc=true` は テンプレートに `arc=true` という値を渡すという意味
	* ARCに対応したテンプレートが使われるために必要
	* テンプレートは自分で作ることも出来る

--

# 生成されたクラスを眺める

* [azu/mogenerator-example](https://github.com/azu/mogenerator-example "azu/mogenerator-example")
* [mogenerator-example/mogenerator-example/models](https://github.com/azu/mogenerator-example/tree/master/mogenerator-example/models "mogenerator-example/mogenerator-example/models at master · azu/mogenerator-example")

--

## Xcodeの_Create ... Subclass..._ との違い

* 基本的に便利なものが増えるだけ
* 拡張しやすいように人間が触るクラスと機械が更新するファイルに分かれる(human/machine)
* 各Attributesを取得する scalar と object 両方のメソッドがある
	* Xcodeは生成時に **片方** を選択する
* 各Attributes/relationshipの名前を文字列で取得出来る構造体が定義されている

--

* Entityの名前を取得出来るメソッドが増える
* `initializer` が増える
	* insertNewする際に文字列を指定することがなくなる
* mutableにNSOrderedSetを扱うメソッドが最初からある
	* [バグ？CoreData+OrderedSetに潜む問題の対処法](http://smartphone-ad.info/%E3%83%90%E3%82%B0%EF%BC%9Fcoredata%E3%81%AB%E6%BD%9C%E3%82%80%E5%95%8F%E9%A1%8C%E3%81%AE%E5%AF%BE%E5%87%A6%E6%B3%95/ "バグ？CoreData+OrderedSetに潜む問題の対処法DESIGN U&amp;ME Cocoa, PHP, WEB SERVICE | DESIGN U&amp;ME Cocoa, PHP, WEB SERVICE")

--

## Attributes structの利用例

``` objectivec
extern const struct EventAttributes {
	__unsafe_unretained NSString *sortIndex;
	__unsafe_unretained NSString *timeStamp;
} EventAttributes;
```

* 自動生成される構造体の定義を利用する
* 補完が効く、typoが減る、定義が更新されれば自動的にエラーにできる

``` objectivec
    NSDate *beginDate = ...;
    NSDate *endDate = ...;
    [NSPredicate predicateWithFormat:@"(%@ <= %K) AND (%K <= %@)",
                              beginDate,
                              EventAttributes.timeStamp,
                              EventAttributes.timeStamp,
                              endDate];
```


--

## 簡単にまとめると

* 色々メソッドが増える
* CoreDataやNSPredicate等に使う文字列が定数的に使える
	* 定数を使えば xcdatamodeld 側の変更に追従してないところはコンパイルエラーにできる
* 人間用と機械用にわけられているので、モデルクラスを安全に更新できる
	* 人間用は上書きされない

--

# 発展編

--

## モデルの親クラスを指定する

* デフォルトは `NSManagedObject` がモデルの親クラス
* `--base-class 親クラス名` を指定すると、親クラスを指定出来る
	* インスタンス化するときに自動でUUIDを入れるとかそういう事したい時
	* [mogeneratorと識別子を使ったCoreDataのModelクラス作成パターン | Technology-Gym](http://tech-gym.com/2012/10/ios/890.html "mogeneratorと識別子を使ったCoreDataのModelクラス作成パターン | Technology-Gym")

`human -> machine -> base-class`

--

## template-var

- 公式のデフォルトテンプレート
- [mogenerator/templates at master · rentzsch/mogenerator](https://github.com/rentzsch/mogenerator/tree/master/templates "mogenerator/templates at master · rentzsch/mogenerator")
- `arc=true` で吐くものが変わるように分岐がある

```
<$if TemplateVar.arc$>
@property (nonatomic, strong) <$Relationship.immutableCollectionClassName$> *<$Relationship.name$>;
<$else$>
@property (nonatomic, retain) <$Relationship.immutableCollectionClassName$> *<$Relationship.name$>;
<$endif$>
```

--

## 自作のテンプレートを使う

- 公式のデフォルトテンプレートを参考にする
- [mogenerator/templates at master · rentzsch/mogenerator](https://github.com/rentzsch/mogenerator/tree/master/templates "mogenerator/templates at master · rentzsch/mogenerator")

テンプレートをいじれば

- NSObjectでNSManagedObjectと同じプロパティを持つモデルクラスを作る等
- [azu/mogenerator-template](https://github.com/azu/mogenerator-template "azu/mogenerator-template")
- Entityが持つAttributesの一覧を配列として取得するメソッドを付ける等

--

# おまけ

--

## JSONからモデルクラスを生成する

<div class="kwout" style="text-align: center;"><img src="http://kwout.com/cutout/u/hw/b6/t94.jpg" alt="http://nerdery.com/json-accelerator" title="JSON Accelerator | The Nerdery" width="600" height="211" style="border: none;" usemap="#map_uhwb6t94" /><map id="map_uhwb6t94" name="map_uhwb6t94"><area coords="314,168,416,192" href="http://itunes.apple.com/us/app/json-accelerator/id511324989?ls=1&mt=12" alt="" shape="rect" /><area coords="431,168,533,192" href="http://nerdery.com/json-accelerator-support" alt="" shape="rect" /></map><p style="margin-top: 10px; text-align: center;"><a href="http://nerdery.com/json-accelerator">JSON Accelerator | The Nerdery</a></p></div>

- JSONからObjC/Java/Python等のモデルに変換
- [thenerdery/JSONAccelerator](https://github.com/thenerdery/JSONAccelerator "thenerdery/JSONAccelerator")
	- オープンソースで公開されてる
	- 幾つかバグ修正を送った

--


## デコンパイルして勝手にモデルを作る

* `.momd` 、 `.mom` から `.xcdatamodel` などはデコンパイル出来る
* [atomicbird/momdec](https://github.com/atomicbird/momdec "atomicbird/momdec")
* 当然、デコンパイルした`.xcdatamodel`からはmogeneratorでモデルクラスを生成できる

--

## 参考

* [mogenerator + Xmo’d](http://rentzsch.github.io/mogenerator/ "mogenerator + Xmo’d")
* [documentation - How do the Mogenerator parameters work, which can I send via Xcode? - Stack Overflow](http://stackoverflow.com/questions/3589247/how-do-the-mogenerator-parameters-work-which-can-i-send-via-xcode "documentation - How do the Mogenerator parameters work, which can I send via Xcode? - Stack Overflow")
* [Mogenerator + MagicalRecordでCoreData入門 - Qiita [キータ]](http://qiita.com/key/items/35569f334528e225531e "Mogenerator + MagicalRecordでCoreData入門 - Qiita [キータ]")












