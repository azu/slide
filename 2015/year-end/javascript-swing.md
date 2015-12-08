# JavaScriptの素振りする技術

----

## ライブラリをちょっと試す

-----

## ライブラリをブラウザで試す

- JavaScriptライブラリはデモを置いてることも多い
- デモがないとローカルで動かすのは面倒くさい
	- わざわざローカルで`npm install`して...
- ちょっとしたこと試す時に使えるツール

-----

## npmをその場で試す

![right, fit](https://monosnap.com/file/xKGVwkjuxArDwEj7OslITBRPef5Yxe.png)

- [Tonic: a better REPL for node.js](https://tonicdev.com/ "Tonic: a better REPL for node.js")
- Browserify + REPLのようなサービス
- npmからリンクが貼られてる!
- 例: [Tonic: npm on Tonic](https://tonicdev.com/npm/lodash "Tonic: npm on Tonic")

-----

## 他にも色々

- [RequireBin](http://requirebin.com/ "RequireBin")
	- Browserify + JSFiddle的なサービス
- Firefox DevTools
	- URLをページにインジェクト出来る
	- [開発ツールバー](https://developer.mozilla.org/ja/docs/Tools/GCLI "開発ツールバー")の `inject` コマンド
	- ライブラリを読み込ませてConsoleで叩く

-----

# [JS Envy](http://jsenvy.com/ "JS Envy")

![js envy](https://monosnap.com/file/5xnaU8dqIJgcOPjwTk9mWDZIQlxq4D.png)

-----

# ライブラリをちょっと試すまとめ

- ライブラリをちょっと試すだけならブラウザだけでイケる
- 説明文をそのまま鵜呑みよりは一行でも実行する
- 実行するためのツールは色々充実してきている
- Node.js向けでもBrowserifyで動くレベルならブラウザでREPLができる

-----

# ライブラリの新しい機能を試す

- ライブラリで新しい機能追加された
- リリースノートに細かいことが書かれてない
- 関連: [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")
- ちょっと探しても見つからなかったら実際に試す

-----

## 例) Jasmineのランダムテスト

- [2015-12-07のJS: Jasmine 2.4.0、Redux入門、Firefox Platform Status - JSer.info](http://jser.info/2015/12/07/jasmine2.4-redux-firefox/ "2015-12-07のJS: Jasmine 2.4.0、Redux入門、Firefox Platform Status - JSer.info")
	- Jasmine 2.4.0で追加されたランダムテストの紹介
- [Release Notes](https://github.com/jasmine/jasmine/blob/master/release_notes/2.4.0.md "Release Notes")には細かいことが書かれない
- 実際に試さないと正確なことが書けなかった

-----

## 動かす前の認識

> Run jasmine's specs in random order

デフォルトでランダム実行になった?

> Add support for returning run details for reporting randomness

どういう意味?


-----

## 動かす

```sh
$ mkdev jasmine-random-example
$ npm install -g jasmine
$ jasmine init
$ jasmine examples
$ jasmine # run
```

- `jasmine.json`に`"random": false`というのが増えていた
	- => デフォルトは`false`だった

-----
## 動かす

- Node.jsのjasmineだと`true`にしても何故かランダムじゃない
- jasmineはHTML上で動かせる事を思い出した
- HTMLで動かしたら設定を見つけた！
- _run details for reporting randomness_は`seed`値のパーマネントを作るという意味


![right](https://monosnap.com/file/irp2XkqW8cuWDcQGxyotfqhvghviGE.png)


------

## 動かした後の認識

- デフォルトではランダム順序の実行ではなかった

> Add support for returning run details for reporting randomness

これは`seed`値が失敗した時にでるという意味だと分かった

-----

## 動かすことで得たもの

- 10分ぐらいで適当に動かせて認識を正すことができた
- ついでにそのままGitHubにpushして動くサンプルを作れた
- https://github.com/azu/jasmine-random-example/
- http://azu.github.io/jasmine-random-example/?random=true

------

# |壁|

-----

# 実際に動かすまでには壁がある

- ライブラリを読み込んで実行するまでに色々手順が必要
- 自分なり手順をテンプレ化しておく = 素振り
- npm install -> write code -> git push が大まかな流れ

-----

## @azu のケース

```sh
# ghqディレクトリにhogeを作ってhogeへ移動
mkdev hoge
# git, npm, license init
init-node.sh
### Development... ###
# Githubリポジトリを作成
hub create -d "description"
# git push -uのスクリプト
git pushup
```

-----
## 使用してるスクリプト

- https://gist.github.com/azu/09dd6f27f52e2e8d9978
- 基本的に覚えられるコマンドしか使わない
- `init-node.sh`はpecoで色々なパターンを選択して使う
- 大体どの言語でも同じパターンで作って公開してる

------

# ライブラリの使い勝手を試す

- 使い勝手を把握するのは実際に何かを書かないと分かりにくい
- コストが高いのであんまり多用できない
- でも、書かないと使い勝手を見るのは難しい

-----

![mizchi素振り](https://monosnap.com/file/9iqROc63qzR27m92owMJSPs1CD8veh.png)

------

## 何を持って使い勝手を試すか

- 結局素振り
- 書くものがないならElectronやNW.js
	- 環境が固定されてる、新しい機能が使いやすい
	- メンテを考えないならコンテキストが混ざってるNW.jsだと楽

-----

## とりあえず作る

- 作ってGitHubにあげる
- 完成しなくてもGitHubにあげる
- そのままローカルのゴミ箱に捨てるよりはGitHubに捨てる
- ゴミ箱に捨ててしまうと記憶からも無くなってしまう

------

# Issueを出す

- 問題がある時に一番いいのは再現可能なサンプル
	- 合わせてスクリーンショットなど
- 再現可能なサンプルを作って公開するのは面倒

-----

# Issueのサンプル

- JSFiddleみたいなパーマネントリンクだけ済むならそれを出す
- コマンドだったり、ファイルサイズみたいな問題だと実際にリポジトリを作る
- 素振りで慣れておけばサンプルをあげるのも5分かからない

-----

# Issueのサンプル : deku


- [Reduce build file size by azu · Pull Request #297 · dekujs/deku](https://github.com/dekujs/deku/pull/297 "Reduce build file size by azu · Pull Request #297 · dekujs/deku")
- [Add "browser" field for browserify by azu](https://github.com/component/type/pull/23 "Add &#34;browser&#34; field for browserify by azu · Pull Request #23 · component/type")
- Browserifyで使うとファイルサイズが50KB増える問題
- 実際にファイルサイズが50KBになるリポジトリへリンク
	- [azu/component-type-with-browserify-issue](https://github.com/azu/component-type-with-browserify-issue "azu/component-type-with-browserify-issue")

-----

# まとめ

- 実際にローカル環境を作らなくてもJavaScriptは動かせる
- ローカル環境でもパターン化してスグ動かせるように素振りしよう
- バグ報告には再現可能なサンプルを一緒に出そう
- ゴミはゴミ箱ではなくGitHubへ
- ライブラリ書く側は利用者にそんな事させないためにドキュメントを分かりやすく書こう、デモを作ろう