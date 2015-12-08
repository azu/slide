# JavaScriptの素振りをする技術

----

# ライブラリを試す

-----

## ライブラリをブラウザで試す

- JavaScriptライブラリはデモを置いてることも多い
- デモがないとローカルで動かすのは面倒くさい
	- わざわざローカルで`npm install`して...
- そういう時に使えるツール

-----

## npmをその場で試す

![right, fit](https://monosnap.com/file/xKGVwkjuxArDwEj7OslITBRPef5Yxe.png)

- [Tonic: a better REPL for node.js](https://tonicdev.com/ "Tonic: a better REPL for node.js")
- Browserify + REPLのようなサービス
- npmからリンクが貼られてる!
- 例: [Tonic: npm on Tonic](https://tonicdev.com/npm/lodash "Tonic: npm on Tonic")

-----

## 他にも

- [RequireBin](http://requirebin.com/ "RequireBin")
	- Browserify + JSFiddle的なサービス
- Chrome DevTools
	- URLをページにインジェクト出来る
	- ライブラリを読み込ませてConsoleで叩くw

-----

# 新しい機能を試す

- ライブラリで新しい機能追加された
- 細かいことが書かれてない
- [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")
- ちょっと探しても見つからなかったら実際に試すのが早い


-----

## Jasmineのランダムテスト

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

-----


## Create example run example

## パフォーマンスの嘘

## Issue

## Fix

## MVP

<blockquote class="twitter-tweet" lang="en"><p lang="ja" dir="ltr">素振り専用のリポジトリ作ってめっちゃ素振りしているので結局コード書く速さも動く速さも書いた分量によると思うよ <a href="https://t.co/VCMl2uT6bA">https://t.co/VCMl2uT6bA</a></p>&mdash; ダイナモS+ (@mizchi) <a href="https://twitter.com/mizchi/status/532914332518989824">November 13, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

ELectron, NW.js