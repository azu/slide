autoscale: true



# Webpagetestから始める継続的<br>パフォーマンス改善

## ページロードタイム編 :hourglass:

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch][], [JSer.info][]
- Create:  [textlint][], [Almin][]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"
[textlint]: https://textlint.github.io/ "textlint"
[Almin]: https://almin.js.org/ "Almin"

---



# アジェンダ



- パフォーマンス改善は指標を決めて行わないと迷子になる
- パフォーマンス改善を行うには継続的な計測を行う
  - 今回はページロードについて、ランタイムは範囲外
- パフォーマンス改善のアプローチ
- 継続的なパフォーマンス計測とリグレッションの検知



^ 目的はパフォーマンス改善には計測が必要という事実を知ること

^ パフォーマンス計測は継続的に行う必要がある

^ パフォーマンス改善は何を目的、指標にして改善するかを決めないと迷子になる

^ 目的をもって継続的にパフォーマンス改善を行い、パフォーマンス計測を改善する

----



# 「パフォーマンス」の定義



- 今回は「ページロードタイム」についての「パフォーマンス」の話
  - 「ページロード」 = URLにアクセスしてページが表示されるまで
- 「ランタイム」の話ではありません
  - 「ランタイム」= ページ表示後のUI操作やアニメーションなど
- 「パフォーマンス」と言った場合は大体「ページロードタイムにおけるパフォーマンス」と解釈



-----







# 「ページロードのパフォーマンスが良い」の定義



- すべてのコンテンツが読み終わることを早くするのが目的ではない = Fully Loaded が早くするわけじゃない
  - まあ早いのいいことだけど、これが目的ではない

- First (Content/Meaningful) Paintが早い
- どれだけ真っ白じゃなくて意味あるコンテンツをユーザー(ブラウザ)に表示させるのを早くするか
- => 「ページロードのパフォーマンス」を良くする



![](img/progressive-rendering.png)



----


## なぜ計測を自動化するの？



- 手元のDevToolsで図ることもできる
  - ただし、**高性能な開発者端末**で**安定したネットワーク**での結果の1つに過ぎない
  - ただし、他の作業を並行してるから結果が安定しない
- 手元で図った結果より悪い結果となる人も多い
- 定性的な値じゃないので比較できない
- 継続的に改善するには比較できる値が必要
- パフォーマンス計測もしよう

---

## 継続的に改善するために、計測も継続的に行う


- 継続的にパフォーマンスを改善するには、その計測も継続的に
- パフォーマンスは特にいつのまにかリグレッションが起きやすい
- 人間は0.1秒の変化は勝手に補完するので鈍感
- パフォーマンスを数値化して問題をに気づけるようにするが継続的な改善には必要

----


## 改善には指標が必要

---



- 改善する方向 = 指標がないと迷子になる
- 改善したつもりが相対的に悪化することがある
- システムはパフォーマンスだけじゃなくて様々に機能が存在する


----



- ウェブページのアーキテクチャはさまざまな要素からできてる
  - メンテナンス性、パフォーマンス、セキュリティ、スケーラビリティ、
- すべてを実現することはできない
- 例) 高パフォーマンスと高スケールの両方を実現することは簡単ではない
- そのようなアーキテクチャを決めるときにも指標をちゃんと数値として決める
- 指標や方向を持って変化して、それを確認するすべを持つ

> システムは決して部分の総和ではない。システムは部分の相互作用の成果だ。

> -- [Building Evolutionary Architectures](http://shop.oreilly.com/product/0636920080237.do)([進化的アーキテクチャ](https://www.oreilly.co.jp/books/9784873118567/))

----

## システムはバランス

- フロントが遅いかバックエンドが遅いかネットワークが遅いか
- 結局はバランスの問題になる
- システムはそれぞれのコンポーネントの足し算じゃなくて、相互作用で成り立っている
  - フロントが遅いのを直せば、バックエンドへアクセスが増え負荷がかかるといったように
- それぞれをちゃんと計測しておいて、(あらゆる)修正ごとに何が変化したのを見られるような状態が正常



----



# 極端な例



> CDNのエッジサーバ上で動的にページを生成する仕組みを導入してフロント部分の高速化を行った所、今までTopページの速度が平均15秒ぐらいだったのが2〜3秒になって、その結果、アクセス数が殺到しちゃって、バックエンドのシステムが持たなくなっちゃった、なんてこともありました。その時は、バックエンドの修正コストが馬鹿にならなかったので、泣く泣く元に戻しましたけども（笑）。
>
> -- [UXとWebパフォーマンス、そののっぴきならない関係 – 竹洞陽一郎ロングインタビュー | HTML5Experts.jp](https://html5experts.jp/shumpei-shiraishi/11599/)



----



## ページロードに関するパフォーマンスはフロントの裁量が大きい



- フロント側だけをいくら早くしてもバックエンド側が遅いとダメ(逆も同じ)
- しかし、バックエンドの役割のほとんどはリソース配信
- 特にSPAなどのJavaScriptでUIを作る場合はフロント側の比率が高くなる傾向

-----



# エンドユーザーに対するレスポンスタイムのうち80％〜90％はWebフロントエンドで発生する



![right, fit, golden-waterfall.png](./img/golden-waterfall.png)



> 80-90% of the end-user response time is spent on the frontend. 
> Start there. [^note]
>
> -- [the Performance Golden Rule | High Performance Web Sites](http://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/)



[^note]: この分類はフロントエンドがコントロールできる領域が80-90%という意味で考えている

-----



# + ネットワーク

- フロントが8-9割は言い過ぎなので、
  もうすこし細かく見ると次の分類
  - フロントエンド
  - バックエンド 
  - **ネットワーク**

- [Front-end vs Back-end vs Network Performance | Web Performance](http://blog.catchpoint.com/2016/11/03/naming-conventions/)


![right, fit](./img/catchpoint-waterfall.png)



-----





![fit, img](./img/MetricClassification.png)

----



# フロントエンドのコントロール領域は広い



- NetWork
  - [Resource Hints](https://www.w3.org/TR/resource-hints/)での投機的取得
- Content Download
  - 不要なものを取捨選択、遅延ロード、Service Workerでのキャッシュ
- フロントエンドはどんなリソースを必要とするか知っていて、それをコントロールできる

- ページロードにおいてフロントエンドがコントロールできる領域が8割から9割と考える[^ex]



[^ex]: もちろんバックエンドやネットワークが絶望的に遅いとかだとこの比率は変わってしまう



----





## 指標は目的で異なる

- ページの表示速度を改善したい(ページロード)
    - URLにアクセスしてからできるだけコンテンツを早く表示したい => First MeaningFul Paint
    - URLにアクセスしてからできるだけ早くコンテンツを操作できるようにしたい => TTI
- 動作を高速にしたい(ランタイム)
    - 重たい操作があるのを軽くしたい
    - レスポンスのいい検索、メニューがすぐ切り替わる、ページ移動が早い
- 安定した動作をしてほしい
    - ストリーミング再生が安定して行える
    - いきなりクラッシュしないで
- モバイルでも動作が安定してほしい
    - ネットワーク帯域に気を配る


----



## 目的でも異なる

- 速度改善したい(能動的)
  - 改善した結果を統計的に可視化したい
- パフォーマンス落としたくない(受動的)
  - 死活監視みたいなもの



----


# 計測する指標

- FFFB
- LoadTime
- First Content Paint
- TTI



サイトによって何を指標にするかも異なる

----

## Onload is not 表示速度

----

# 合成モニタリングとリアルユーザーモニタリング

- 合成モニタリング(Synthetic Monitoring)
    - 計測用の仮想環境などから、同じ条件で定期的に繰り返し計測
    - 環境が同じ条件なら計測結果のゆらぎが少ない
- リアルユーザーモニタリング(RUM)
    - ユーザーがページを開いたときに記録を取ってログとして送る
    - ユーザー環境はバラバラなので計測結果のゆらぎは大きい
    - 一方でリアルなデータなので、KPIと値を組み合わせて分析といった用途に使える

----

# 表示速度と指標

- 表示速度を改善したいので、指標は合成モニタリングで集める
- 合成モニタリングなら同じ環境で継続的に計測できる
- => 値同士を比較して差分を見られる
- => 改善は相対で見たほうがわかりやすい(モニタリングなので通知とかできる)

----

# 合成モニタリングを行えるサービス

> Priceは2018年8月時の参考値、プランによりPriceは異なります。

- [WebPagetest](https://www.webpagetest.org/)(無料 - 制限200チェック/day)
    - OSSなのでSelf Hoistingもできる
- [SpeedCurve](https://speedcurve.com)(有料 - $20+/month)
- [Calibre](https://calibreapp.com/)(有料 – $29+/month)
- [New Relic Synthetics](https://newrelic.com/products/synthetics)(有料 – $69/month)
- [CatchPoint](https://www.catchpoint.com/)(有料 – $899/month)

----

## サービスによって計測できるものは違う

- サービスによって計測する対象、仕方が違うので比較はしにくい
- Webpagetestなどのデータは丸め込まれたデータなので分析用途ではない(Real Dataとしては捉えない)
- スコアは人間にとってわかりやすい値であるだけど、実データとは異なる
- [WebPagetest](https://www.webpagetest.org/)は計測するだけで継続的に変化を見るダッシュボードはない
  - 計測したデータは1ヶ月だけ保持される
- [SpeedCurve](https://speedcurve.com)、[Calibre](https://calibreapp.com/)は計測 + ダッシュボード + 通知など
  - 計測は大体AWS EC2のリージョン/マシン
  - <https://www.webpagetest.org/getLocations.php?f=html&k=A>
  - <http://support.speedcurve.com/synthetic-settings/test-agent-locationsregions>
  - <https://calibreapp.com/docs/site/agent-locations>
- CatchPointはISPとかネットワーク周りが詳細にとれる
  - [Synthetic Monitoring を活用したグローバルサービスのネットワークレイテンシの測定と改善 - クックパッド開発者ブログ](https://techlife.cookpad.com/entry/2017/09/21/080000)
  - 統計的に扱いやすいデータが集めやすい



----



- システムは複合的なものなので、計測したもので分析できるとは限らない



> A system is never the sum of its parts. It is the product of the interactions of itsparts.
> -- Dr. Russel Ackof





-----



# WebPagetest



- [WebPagetest](https://www.webpagetest.org/)は一度計測してその結果を返すだけのサービス
- WebPagetest自体には連続的なデータを見られる仕組みはない(比較はあるけど)
- そのため、WebPagetestを計測方法を管理したり、結果を見るダッシュボードや通知を提供するサービスがある
- gas-webpagetestで無料で結果をためて、Google DataStudioで可視化しよう



----



# [SpeedTracker](https://speedtracker.org/)



- WebPagetestで計測して、その結果をGitHubリポジトリに保存する
  - GitHubアカウントだけが必要
- 計測の柔軟性や計測回数は少ない(2回/1日)
  - 具体的には認証があるサイトなどは扱えない
- 個人で公開してるサイトを計測するにはお手軽



![right, fit, speedtracker.png](./img/speedtracker.png)

----



# [gas-webpagetest](https://github.com/uknmr/gas-webpagetest)


- WebPagetestで計測しその結果をGoogle SpreadSheetに記録する[Google Apps Scripts](https://developers.google.com/apps-script/)
  - [clasp](https://github.com/google/clasp) + [TypeScript](https://www.typescriptlang.org/)で書き直された
  - [Google Apps Scripts](https://developers.google.com/apps-script/)はCronや、Webサーバ、SpreadSheetの操作などいろいろできる
- コードで書かれてるのでWebPagetestでできる範囲のことは大抵できる



-----



## [gas-webpagetest](https://github.com/uknmr/gas-webpagetest) + [Google データスタジオ](https://datastudio.google.com/)



- [Google Data Studio](https://datastudio.google.com)は任意のリソースをもとにしたダッシュボードを作れるサービス
  - Google SpreadSheet、MySQL、、GitHubなど。
  - いわゆるBI(Business Intelligence)ツールで無料で利用できる
  - 最近複数のデータリソースを混ぜることもできるようになった
    - Google AnalyticsとSpreadSheetを一緒に扱うなども可能

- Spreadsheetに蓄積したデータのビジュアライズを[Google Data Studio](https://datastudio.google.com)で行う



----



# [SpeedCurve](https://speedcurve.com/)



- SpeedCurveの合成モニタリングはWebPagetestをベースにしている
  - [SpeedCurve | Synthetic: WebPageTest](https://speedcurve.com/features/synthetic/)でWebPagetest自体には計測の追跡や分析がないのでSpeedCurveが登場したという話が書かれている



----



## [Sitespeed.io - Welcome to the wonderful world of Web Performance](https://www.sitespeed.io/)



- 自前でSpeedCurveみたいなコントロールとをするツールキット
- WikiPedia(WikiMedia)が利用している



----

# 計測してどうする?

----



# 改善する



----



# 改善するために計測する

- ただ単に計測したデータを貯めてるだけではしょぼい死活監視にしかならない
- 貯めたデータはパフォーマンス改善の指標に使える
- ダッシュボードから問題を見つけることは難しい
  - Lighthouseとかを使ったほうが具体的な指示がでる
  - その指示とデータを照らし合わせてみる
- 比較対象を増やすことが大事
  - 似た機能を持つサイトと比較してみる



-----





## 具体的な例

- CSSのファイルサイズが極端に大きい
- 不要なものを読み込まない
- Lazy Load
    - Code Splitting
- preloadする

大体の改善はただの正常化である



---



# まずは大きな改善から始めよう



- マイクロな改善はページロードには小さな影響しかない
  - すごい遅いサイトは秒単位で遅い問題を持っている
  - まずは秒単位の問題を解決してから、ミリ秒単位の問題を解決していく
- クリティカルパスをブロックするようなクリティカルな問題から改善しよう
  - LightHouseなどでも見つけることができる
- サードパーティスクリプトがブロックしてないかを見る
- scriptはasyncでも大丈夫なのか
- 初期表示に必要なリソースを削っていく
  - 後でいいものは後で読む
- ウェブページのロードはウォータフォール
  - 一つでも重たいものがあるとそこで詰まる = クリティカル
  - 重たいものを取り除いていく = パフォーマンス改善
    - 既にあるものを早くするのではなく、ブロッカーを取り除く



------



## 何を改善するのかが難しい問題



- ダッシュボードで見られても何が問題がわからずに何もできない
  - Note: SpeedCurveはいろんなヒントを出してくれる
- 速くするのではなく遅くしないことの方が重要
  - ボトルネックを取り除いていく => パフォーマンス改善
  - と考えたほうが行動しやすい
- ボトルネックはいろいろなツールで見つけられる
  - [How To Think About Speed Tools  |  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/performance/speed-tools/)



------



## サイトA: 比較して問題を見つける例



- とりあえず計測してとりあえず可視化してみた
- ダッシュボードを見てもいまいち何が問題がわからない



----



![fit, site A page load times](img/site-a-page-load-time.png)



----

![fit, site A rendering times](img/site-a-rendering-time.png)



----



![fit, site A content size](img/site-a-content-size.png)

-----



## サイトA: 何が問題化を比較して見つける

- 比較対象があると問題が見つけやすい



----

# Competitorと比較して計測

- WebPagetestでは、結果の`testId`同士を比較できる
- SpeedCurveでは、登録する時に"比較対象のURL"を入力する



![right](img/speedcurve.png)

-----



## サイトA: サイトを比較してみるとCSSのサイズに問題

下記はgzipしたCSSのファイルサイズ

- **サイトA: 230kb** – 明らかにでかい！
- サイトX: 20kb
- サイトY: 33kb
- サイトZ: 37kb



----





## 一般的なサイトと比較する



- [HTTP Archive](https://httparchive.org/)で[Page Weight](https://httparchive.org/reports/page-weight)で有名なサイトのHTML, CSS, JSなどのファイルサイズを調査
- CSSは**50Kb**弱が一般的なサイズ



![inline, css byte](img/css-bytes.png)





-----



# サイトA: CSSの問題を分析する



- [TestMyCSS](http://www.testmycss.com/)というサービスではCSSに含まれるBase64のサイズやセレクタの複雑度、重複、空のルールなどを一覧できる
- サイトAのCSSはBase 64が**150kb**ぐらいあり異常に大きかった
- CSSにフォントがBase64化したものが含まれていた



----



## サイトA: CSSからフォントを取り除く 

- CSSからフォントを取り除いた: **230kb** -> **80kb**

![inline, CSSサイズの変化](img/site-a-css-size.png)





---



# 一つの改善がパフォーマンスに与える影響は大きくない



- ページロードに関係する機能を一つだけ早くしても、全体への影響は小さい
- 継続的に計測し改善を続ける必要がある



----



## 例) サイトB: SpeedIndexを指標にちょっとづつ改善した例



- サイトA:  Reactで作られたサイト

- クライアントサイドレンダリングのみ
  - JavaScriptが実行されるまで真っ白なのでファイルサイズをへらすことが、そのまま表示速度へ影響



-----



## 改善項目

- Babel 7 -> ランタイムコストが小さくなる
- babel-plugin-external-helpers -> helper関数がまとまってファイルサイズが小さくなる
- webpack 4 + "module"フィールドの対応
  - TreeShaking/Scope Hoistingでサイズとランタイムコストの減少
  - `es-lodash`の対応 - Tree Shakingで最終的にはファイルサイズが小さくなる
- 初期表示に不要なコンポーネントをCode Splitting
  - `import()`で動的にロードすることで、初期表示のbundleファイルサイズが小さくなる
- React 16へのアップデート -> ファイルサイズの減少
- サードパーティのCSSやJSの非同期ロード -> 初期表示には不要なので画面に表示されたタイミングでロード



----



![fit, speed index](img/example-speed-index.png)



----



![fit, file size](img/example-content-size.png)



----



## 劇的な変化を望む場合はアーキテクチャも変化を

- 劇的な変化を得るには全体的/根本的な変化が必要になる
- 泥団子にしているとアーキテクチャを変更することが難しくなる
  - システムに柔軟性がないとアーキテクチャを変更することができない

例) クライアントサイドレンダリング(CSR)だけだったのをサーバサイドレンダリング(SSR)もするように変更

- [インターネットテレビ局「AbemaTV」の表示速度が従来比3倍にアップ | 株式会社サイバーエージェント](https://www.cyberagent.co.jp/news/detail/id=21679)
- [AbemaTVはただのSSR じゃねぇんだよ - Speaker Deck](https://speakerdeck.com/ktknest/abematvhatadafalsessr-ziyaneendayo)



----



# パフォーマンスのリグレッションを検知する



- 人間は慣れてしまうので0.1秒とかの変化には気づきにくい
- 新しい機能を追加したときにパフォーマンスがリグレッションを起こしてもすぐには体感できない
- 合成モニタリングでパフォーマンスリグレッションを検知する



----



# 例) サイトC: 新しい機能を追加したらサイズが増えた



![inline, fit, regression](img/alert-regression.png)



----

## 新しい機能を追加したらサイズが増えた



- 新しい機能をリリースしたらjsのbundleサイズが200kbも増えた
  - 原因: ライブラリの依存してるライブラリがでかかった
- Wifiなどだとあまり違いを感じないがモバイルなどが影響が大きい
  - 開発者端末などだと気づきにくい
- このようなリグレッションに気づくのにも継続的にパフォーマンス計測が必要



-----



# サイズの問題を予防する



![right,fit ](img/bundlephobia.png)



- ライブラリを入れる時にファイルサイズを気にする
  - npmなら[BundlePhobia](https://bundlephobia.com/)が便利
- bundleを分析するなら[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)など
  - [Build Analysis](https://survivejs.com/webpack/optimizing/build-analysis/)を参照





----





# サイズの問題に気づく

- パフォーマンスモニタリングと[アラート](http://support.speedcurve.com/get-the-most-out-of-speedcurve/create-performance-budgets-and-set-alerts)
  - [Monitor your performance budgets | SpeedCurve Support](http://support.speedcurve.com/get-the-most-out-of-speedcurve/monitor-your-performance-budgets)
  - SaaSは大体アラート機能を持っている

- webpackの[performance.hints](https://webpack.js.org/configuration/performance/)オプション
- [size-limit](https://github.com/ai/size-limit)でファイルサイズをCIで計測する



-----



# ブラウザとパフォーマンス



- WebKitはパフォーマンスリグレッションはrevertする
  - [Performance Testing | WebKit](https://webkit.org/performance/)
- JavaScriptエンジンのベンチマークを比較するサイトをMozillaが管理している
  - [ARE WE FAST YET?](https://arewefastyet.com/)



---



## FAQ



- Lighthouseとかではダメなの?
  - WebPagetestはLighthouseの結果も含んでいる
  - パフォーマンス改善に必要なのは連続的値
  - スコアじゃなくて時間を計測する(スコアはルールが変わることがある)



-----



# まとめ



- 改善するために計測していく
- 継続的に改善するためには指標をちゃんと持つ
- 速くするのではなく遅くしない

  - システム全体で見ればパフォーマンスは1因子
  - 問題を正常化していけば、遠回りにパフォーマンスの問題は減っていく(特にサイズ)
- 基準値(Performance Budget)を決めてそこより遅くならないことをベースラインにする
- 計測方法も徐々に改善していく

----



## 参考



- [超速！ Webページ速度改善ガイド ──使いやすさは「速さ」から始まる：書籍案内｜技術評論社](http://gihyo.jp/book/2017/978-4-7741-9400-4)

- [WebパフォーマンスとプロダクトKPIの相関を可視化する話](https://developers.cyberagent.co.jp/blog/archives/9540/)
- [Performance/WebPageTest - Wikitech](https://wikitech.wikimedia.org/wiki/Performance/WebPageTest)
- [Using WebPageTest - O'Reilly Media](http://shop.oreilly.com/product/0636920033592.do)
- [speedtracker/speedtracker: 📉 Visualisation layer and data store for SpeedTracker](https://github.com/speedtracker/speedtracker)
- [Webサイトパフォーマンス管理の基礎知識](https://www.slideshare.net/takehora/web-59093011)
- [Synthetic vs Real User Monitoring : What to use when? | Tezify Blog](https://www.tezify.com/post/synthetic_vs_rum/)
- [最近の Web パフォーマンス改善について知っておきたいコト -HTML5 Conference 2017- - YouTube](https://www.youtube.com/watch?v=gJvOWw-l-gc)

- [Web クライアントサイドのパフォーマンスメトリクス — Speed Index、Paint Timing、TTI etc... ::ハブろぐ](https://havelog.ayumusato.com/develop/performance/e744-performance_metrics.html)



----



## メモ



- まずは計測を始めよう
  - gas-webpagetest + 好きなSaaSで2種類でやってみる
  - 残念ながらウェブパフォーマンス計測の標準フォーマットはない
- ある程度の数を計測した現状を把握しよう
  - ネットワーク系だとセンシティブだけど、ランタイムのパフォーマンスを考えるならそこまで
- 多くの計測データにはバイアスがかかっているので、分析には気をつけよう
  - 信頼区間とか統計的な手法をちゃんと考えよう
  - パフォーマンスは様々な因子がでてくる総合的なもの
  - 多くのモニタリングツールではすべての因子を見ることができない
- パフォーマンス計測を継続することは偉いこと
  - 決してその行為自体は否定はしてはいけない
  - パフォーマンス計測も徐々に改善していけばいい



-----



- CatchPointは明らかに他のサービスより広い範囲のデータを取っている
- その分明らかに値段も突出している
- CDNがakamai中心だった時代が終わるように、モニタリングも多様化して変化していく
  - [国内CDNシェア(2018年4月) | J-Stream CDN情報サイト](https://tech.jstream.jp/blog/cdn/cdn_share_apl_2018/)
- 必要性に応じてモニタリングも変化していく