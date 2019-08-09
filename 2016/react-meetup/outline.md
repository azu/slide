# アウトライン

- Fluxのもやもやするところ
- Fluxにはロジックを書く場所が明確にあるわけではない
- ドメインモデルを作ろうとすると難しさがでてくる
- MV*からFluxへの飛躍があるきがしている
- どこにドメインモデルをかくべきなのかというのを、ドメインモデルのパターンに従って考える
    - UI層
    - アプリケーション層
    - ドメイン層
    - Infra層
- それぞれをFluxのコンポーネントで当てはめてみる
- Storeの役割がアプリケーション層とドメイン層を掛け持ちしている
- この役割が分割されていないのが一つの原因だと考える
    - Reduxについては考えてないけどそんな違いはない
- Storeについてもう少し考える
- CQRSというパターンが存在するが、Storeは書き込みと読み込みの両方を持っている
- ここを書き込みと読み込みで分けることができたならStoreはもっとシンプルな存在となるのではと考えた
- Store#getState はかなり定式化した存在なので、Storeは読み込みを主軸とした存在とする
- また、Fluxにおいてはシステムの状態とViewの状態が混同しやすい
- ここでいうシステムの状態とは、すなわちドメインモデルで表現されている状態
- [Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")は信頼できるソースは一つにするというパターン
- 複数の箇所を1つのアクションで更新して統合性の問題がでることは、ショッピングカートを実装することで確認できる
- ショッピングカートのサンプルでは、商品リストと在庫、カートに入った商品の数がある
- 商品リストから1つアイテムをカートに移動したとき
    - 商品の在庫を-1
    - カートの商品+1
    - ということを単純に行うことは難しい
    - 在庫がなければ在庫を減らせないし、在庫が減らせることを確認してから商品をカートに入れる必要がある
    - つまりカートと商品の動作に依存が発生している
    - そのため、商品カタログのような在庫とカートのもととなる[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")が必要となる
- このショッピングカートの例にする場合、CartStoreとProductStoreを作ると思う
- しかしこのCartとProductは独立してるワケではなく依存しあってる
    - Productが減ることを確認してからCartの中身を増やさないといけない
    - 在庫がないのにCartをの中身を増やすのはおかしいので
    - waitForやReduxのように[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")を作り、それをnormalizeするという手段もある
- Reduxの場合は一つのStoreしかないという前提にして、ReducerをProductとCartに分けることで解決してる
    - つまりCartStoreはProductStoreに依存しているということ
- このような問題は、ドメインを[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth "Single source of truth")として、StoreとStateはViewのために形を変えた一時的な情報とすることで解決できる
    - システムの状態 = ドメイン、 Viewの状態 = Store/State と形式化する
- このStoreが独立してもまったく問題無いケースというのは、それぞれが異なるBoudary Contextにあるということ
- ドメインからStateを作り出す DTO のような役割をStoreは持っていることにする
- 毎回変換層を書く必要がでるため冗長となるが、複雑なアプリケーションでは複雑な状態ができてしまうので、そうなる前に状態をできるだけ分けておくトレードオフを設けている
- システムの状態は読み書きする Write/Readな層で
- Storeは読み込みのためにデータの形を変えるだけの層へと単純化できる(実際にはViewだけの状態が存在するため、簡単ではないが)
- Storeの役割はViewからの要求に対して、ドメインからStateを作成し返すことに集中できるようになる
- このStateの形なども最適化を考えて色々するわけだけど、StoreGroupみたいなものを用意してあるのでそれ見る感じ

## CQRSの導入

FluxのStoreは適当にやるとWrite(コマンド)とRead(クエリ)で同じモデルを使うように書いちゃうから難しさがある。

Flux: 同じものをRead/Writeで使う -> Read/Writeで異なるモデルを意識して使うにしていく

よりも

CQRS: 最初からRead/Writeで異なるものとして -> Read/Writeで簡略化のために同じモデルを共有しても良い

とした方が分割統治できるんじゃないかという話

=> あとは https://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html
