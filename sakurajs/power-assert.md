title: 5minで分かるpower-assert
author:
  name: azu
  twitter: azu_re  
  url: http://efcl.info/
theme: sudodoki/reveal-cleaver-theme
output: power-assert.html
--

# [power-assert](https://github.com/twada/power-assert "power-assert") [![t_wada](http://www.gravatar.com/avatar/9f3a83db74bee75a64b5e6ed106a775c.jpg?s=32)](https://github.com/twada)

5分ぐらいでわかるpower assert

--

## [power-assert](https://github.com/twada/power-assert "power-assert") [![t_wada](http://www.gravatar.com/avatar/9f3a83db74bee75a64b5e6ed106a775c.jpg?s=32)](https://github.com/twada)


<img src="power-assert.gif" />

--

## power assert

* `assert(a === b);` のような単純なアサーションのみ必要十分
* Assert失敗時(テストが通らなかった時)に分かりやすい情報を表示
*  沢山のアサーションを使い分けしなくていいというメリット

--

## そもそも何故アサーションの種類が豊富なのか?

* 例) [Chai](http://chaijs.com/ "Chai")の[expect](http://chaijs.com/api/bdd/ "expect")
* 33コもアサーションメソッドが存在
* `expect('foobar').to.contain('foo');`
* `contain` 含んでないから失敗した
* 失敗した時に何故失敗したのかを表示することが出来る

--

## どうやって動いてるの?

* power assert !== アサーションライブラリ
* コードを変換したりするのでツールに近いテストツール

Work flow

1. テストコードをpower-assert用に変換したコードを生成
2. power-assert化されたテストコードを実行
3. テストが失敗してる時は、ロードしてる`power-assert`モジュールが[整形して](https://github.com/twada/power-assert-formatter "twada/power-assert-formatter")エラー情報を出力

--

## 実行環境

キホンはMochaをベースに考える

* Node.js
* ブラウザ
* Browserify

--

## Node.js

* 一番お手軽
* [azu/intelli-espower-loader](https://github.com/azu/intelli-espower-loader "azu/intelli-espower-loader")
* `mocha --require intelli-espower-loader`

--

## ブラウザ

* `bower install power-assert`
* gulp or Grunt で テストコードをpower assert化
* power assert化(変換した)テストコードをブラウザで読みこんで実行
	* Example Project:  [azu/power-assert-testem-seed](https://github.com/azu/power-assert-testem-seed "azu/power-assert-testem-seed")

--

## ブラウザ on testem

<img src="http://efcl.info/wp-content/uploads/2014/04/power-.mov.gif" alt="Power mov" title="power-.mov.gif" border="0" width="600" height="400" />

* Testem 経由でブラウザテスト
* ファイル監視はgulp

-- 

# Browserify

node.jsをブラウザ向けのコードに変換するツール

--

## power assert + Browserify


* テストコードもnode.jsとして書ける
* Browserifyの変換プラグインとしてのpower assert
* [espowerify](https://github.com/twada/espowerify "espowerify")
* Browserifyで変換したテストコードをブラウザで実行

--

## Browserify + Karma

* [karma-browserifast](https://github.com/cjohansen/karma-browserifast "karma-browserifast")
* KarmaのプロプロセッサとしてBrowserifyで変換出来る
* 変換とファイルの監視はKarmaに任せる
* Example Project: [azu/power-assert-karma-seed](https://github.com/azu/power-assert-karma-seed "azu/power-assert-karma-seed")

--

![gif](http://i.gyazo.com/4daa1c15931e4de407a382c8fd895339.gif)

--

## まとめ

* power assertは単純な`assert`だけでも十分なエラー情報を出すツール
* テストコードを変換する処理が必要
* Node.jsの場合は気にならない手間
* ブラウザはちょっと準備が必要
* power assert is everywhere!

--

## 参考

* [▶ 新しいテストライブラリのご提案 #tng10 @t_wada - YouTube](https://www.youtube.com/watch?v=aDoQxqO_6rI "▶ 新しいテストライブラリのご提案 #tng10 @t_wada - YouTube")
* [power-assert in JavaScript](http://www.slideshare.net/t_wada/powerassert-in-javascript "power-assert in JavaScript")
* [カジュアルJavaScript AST](http://azu.github.io/slide/JSojisan/ "カジュアルJavaScript AST")