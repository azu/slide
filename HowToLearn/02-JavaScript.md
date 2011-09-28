# JavaScript

---

# JavaScriptを学ぶとは

- クライアントサイド
    - Web
    - ネイティブアプリ
        - Windows8、Titanium
    - [node.js]
        - クロスプラットフォームなツールもかける
- サーバサイド
    - [node.js]
    - [Ringo](http://ringojs.org/ "Ringo")
    - [wakanda](http://www.wakanda.org/ "wakanda")
    - see more [State of the art: Server-Side JavaScript (ParisJS)](http://www.slideshare.net/alexandre_morgaut/state-of-the-art-serverside-javascript-parisjs "State of the art: Server-Side JavaScript (ParisJS)")

[node.js]: http://nodejs.org/

---

# JavaScriptの変化

- JavaScriptは制限された言語？
    - マルチコア
    - GPU
    - バイナリ
    - 固定型
    - スレッド
    - 双方向通信
- [The evolution of the web - ウェブの進化](http://evolutionofweb.appspot.com/ "The evolution of the web - ウェブの進化")
    - ブラウザと共に変化が激しい時期
    - 新しいことが次々と起きている

---

# どうやって学ぶか

- 情報量は多すぎるぐらい
- 書籍
    - サイ本
        - [初めてのJavaScript 第2版](http://www.oreilly.co.jp/books/9784873114255/ "初めてのJavaScript 第2版")
        - [JavaScript: The Definitive Guide, Sixth Edition](http://shop.oreilly.com/product/9780596805531.do "JavaScript: The Definitive Guide, Sixth Edition")
    - [パーフェクトJavaScript](http://gihyo.jp/book/2011/978-4-7741-4813-7 "パーフェクトJavaScript")
    - [JavaScriptパターン](http://www.oreilly.co.jp/books/9784873114880/ "JavaScriptパターン")
        - [JavaScript: The Good Parts](http://www.oreilly.co.jp/books/9784873113913/ "JavaScript: The Good Parts")より好み

初心者向けの決定版はまだわからない

---

# 書籍の読み方

[英語が読めない人向け、英語技術書の読み方 | Web scratch](http://efcl.info/2010/1126/res2111/ "英語が読めない人向け、英語技術書の読み方 | Web scratch")

- 章ごとなどノルマを決めて読む
- 節ごとにメモを取る
	- 既知の事についてのメモは手を抜く
	- 気になることを調べてリンクを貼る
- インプットアウトプット

---

# オンラインのチュートリアル

- [Eloquent JavaScript](http://eloquentjavascript.net/ "Eloquent JavaScript")
    - 書籍版も、海外では鉄板的に
- [A re-introduction to JavaScript](https://developer.mozilla.org/ja/A_re-introduction_to_JavaScript "A re-introduction to JavaScript")
    - 中途半端な訳になってるが...
- [実践JavaScript](http://www.albert2005.co.jp/study/javascript/ "実践JavaScript")
    - 他言語をやってた人にちょうどいい
- [連載：これでできる！ クロスブラウザJavaScript入門｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/crossbrowser-javascript "連載：これでできる！ クロスブラウザJavaScript入門｜gihyo.jp … 技術評論社")
    - 実践JavaScriptと同じくos0xさんの連載


- [JavaScript入門講座](https://dl.dropbox.com/u/336104/slide/jstudy2/startupjs/index.html "JavaScript入門講座")のスライド
- [JavaScript入門-読むべきサイト -  prog*sig](http://efcl.info/adiary/JavaScript%E5%85%A5%E9%96%80-%E8%AA%AD%E3%82%80%E3%81%B9%E3%81%8D%E3%82%B5%E3%82%A4%E3%83%88)

なども参考に

---

# どうやって情報を探すか

- ググれ
- ブログ
- リファレンスサイト : [Mozilla Developer Network](https://developer.mozilla.org/ja/ "Mozilla Developer Network")(MDN,MDC)
    - [MSDN](http://msdn.microsoft.com/en-us/library/ms123401.aspx "MSDN"),[Dottoro](http://help.dottoro.com/ "Dottoro")
- ECMAScript仕様書
    - [Annotated ES5](http://es5.github.com/ "Annotated ES5")
    - [Under Translation of ECMA-262 3rd Edition](http://www2u.biglobe.ne.jp/~oz-07ams/prog/ecma262r3/ "Under Translation of ECMA-262 3rd Edition")
    - [ECMA-262第5版 日本語訳](http://dl.dropbox.com/u/9124140/tsoft/ecmascript.html "ECMA-262第5版 日本語訳")
- [JSReference](https://github.com/azu/KeySnail-Plugins/tree/master/JSReference "JSReference")
    - [JavaScriptリファレンスを高速検索するKeySnailプラグイン | Web scratch](http://efcl.info/2011/0606/res2830/ "JavaScriptリファレンスを高速検索するKeySnailプラグイン")
- **他人のコード**

---

調べる方法を調べる
=========================

- JavaScriptは調べるとやり方が見つかることが多い
    - 古いものと最近のものがまざってる
    - ごく最近〜未来のものは見つけにくい
- Twitter
    - JavaScripterはTwitterに多くいる
- 新しい情報の発信源を追う
    - [海外のJavaScript情報を見つけよう](http://efcl.info/2011/0116/res2185/ "海外のJavaScript情報を見つけよう")
    - [世界のJavaScript情報を読もう](http://efcl.info/2011/0117/res2229/ "世界のJavaScript情報を読もう")
    - [今からRSS購読すべきタグと検索結果](http://efcl.info/2010/1025/res2018/ "今からRSS購読すべきタグと検索結果")
    - [ブラウザの最新情報を知るために、Web開発者が読んでおくべきブログ](http://efcl.info/2011/0301/res2303/ "ブラウザの最新情報を知るために、Web開発者が読んでおくべきブログ")

Webの動きはとても早い

---


# コードリーディング?

- 他人のコードを読む(コードリーディング)
    - 読むためのツール
        - Wget(解説: [Site Reading - 4 Code Reading](http://sig.droppages.com/Site+Reading "Site Reading - 4 Code Reading"))
        - [WebStorm](http://www.jetbrains.com/webstorm/ "JavaScript IDE")(JavaScript IDE)
        - [Dafizilla ViewSourceWith :: Add-ons for Firefox](https://addons.mozilla.org/ja/firefox/addon/dafizilla-viewsourcewith/ "Dafizilla ViewSourceWith :: Add-ons for Firefox")
        - [Phoenix :: Add-ons for Firefox](https://addons.mozilla.org/en-US/firefox/addon/phoenix/ "Phoenix :: Add-ons for Firefox")
        - [Fiddler](http://www.fiddler2.com/fiddler2/ "Fiddler")(Web Debugging Proxy)
        - [dynaTrace](http://ajax.dynatrace.com/ajax/en/ "dynaTrace")
        - デバッガー(Firebug,Web Inspector,F12,Dragonfly)
    - 読むものを決める
        - 誰がどういう目的作成したもの
        - ライブラリ

---

# コードを読んで取り込み書きだす

- 読む目的を定める
    - 先になぜ読むのかを決めておいた方がいい
- 新しいことを知る
    - いいところをパクる
    - パターンを知る
    - クロスブラウザ対応処理(バットノウハウ多いけど)
- 知ったことを取り入れたコードを書く
    - 書いて自分のものにする
    - 車輪の再発明

自分の場合は、コード = Greasemonkeyで有ることが多かった。

---

# コードの質
- 速度
    - ブラウザの変化の影響を受けて速度も変化
    - [jsPerf](http://jsperf.com/ "jsPerf") を活用
        - [JavaScriptコードのパフォーマンス比較ができるWebサービスjsPerfの使い方](http://efcl.info/2011/0303/res2330/ "JavaScriptコードのパフォーマンス比較ができるWebサービス「jsPerf」の使い方 | Web scratch")
- 可読性
    - JavaScriptは自由にかける
- 保守性
    - 自由にやりすぎると扱いにくくなる
    - モジュール
    - クロスブラウザ

一般的なWebサイトなら速度よりも可読性や保守性を優先した方がよい場合も多い。

---