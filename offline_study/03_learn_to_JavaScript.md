# 学ぶ

---

# 何故JavaScript自体を学ぶか

- jQueryが便利だから生JavaScript書くのがだるい
- 今はCoffeeScriptなどが人気
- あえてJavaScript自体を知る必要はあるの?

---


# JavaScriptという枠	

JavaScriptはJavaScriptで書かれるとは限らない

### 別言語からの変換

- [altJS](http://altjs.org/ "altJS")
    - 別言語からJavaScriptへ変換するものをまとめたサイト
- 例)
	- CoffeeScript 
    - GWT Java -> JavaScript
    - Script# C# -> JavaScript
    - Emscripten 

---

### JavaScriptに別言語で入門する弊害

jQueryという別言語...

- jQuery語
	- 「jQueryでできて、JavaScriptでできないことは何ですか?」
	- プラグインモンキーになりやすい
	- jQueryを枠を出たJavaScriptの問題を解決できない
- CoffeeScript語 **new**
	- "JavaScriptのGood Partsを集めたもの"
	- JavaScriptに存在しないclassを持っている
		- classという言葉がJavaScriptに変換した際に持つ意味合いの違い
		- JavaScriptはprototype
	- CoffeeScriptだけでは本質までは見えない

---

### JavaScriptの本質を知る必要性

- JavaScript以外で書けても実行時はJavaScript
- SassでCSSの表現の本質が変わらないのと同じ
- 結局はJavaScriptを知らないと解決できない問題が存在

---

# JavaScriptを学ぶ

---

# 書籍から学ぶ

- サイ本
    - [初めてのJavaScript 第2版](http://www.oreilly.co.jp/books/9784873114255/ "初めてのJavaScript 第2版")
    - [JavaScript: The Definitive Guide, Sixth Edition](http://shop.oreilly.com/product/9780596805531.do "JavaScript: The Definitive Guide, Sixth Edition")

- [パーフェクトJavaScript](http://gihyo.jp/book/2011/978-4-7741-4813-7 "パーフェクトJavaScript") 
    - サイ本よりは読みやすく、普通の書籍よりも情報量も多め 
- [JavaScriptパターン](http://www.oreilly.co.jp/books/9784873114880/ "JavaScriptパターン")
    - [JavaScript: The Good Parts](http://www.oreilly.co.jp/books/9784873113913/ "JavaScript: The Good Parts")より説明がわかりやすい書籍 
- <a href="http://www.amazon.co.jp/dp/4048707868/">テスト駆動JavaScript</a> 
    - 学習テスト
    - JSTestDriverについて最も詳しい
    - JavaScript自体についての解説も書かれている


初心者向けの決定版はまだわからない

---

# 書籍の読み方

[英語が読めない人向け、英語技術書の読み方 | Web scratch](http://efcl.info/2010/1126/res2111/ "英語が読めない人向け、英語技術書の読み方 | Web scratch")

- 章ごとなどノルマを決めて読む
- 節ごとにメモを取る
      - 既知の事についてのメモは手を抜く
      - 気になることを調べてリンクを貼る
- インプットアウトプット
      1. 読む
      2. 理解
      3. 書く

---



# 学習テスト

学習テスト via <a href="http://tddjs.com/">Test-Driven JavaScript Development</a>

* 外で学んだ知恵の定着
       * 他人のコード・論文・書籍からえた知恵の学習テストを書くと頭に定着しやすい
* 奇妙なふるまいの調査
       * ブラウザの奇妙なふるまいにハマった時に対処法を学習テストに記録しておくと、同じ所でハマる事はなくなる
* 新しいブラウザの調査
       * 書きためた学習テストは、新しいブラウザのふるまいの調査に流用できる
* フレームワークの調査
       * 新たに導入するフレームワークはまず学習テストを書いてみる
       * 本番コード前にフレームワークの使い方が身につく

---

# オンラインのチュートリアル

- [Eloquent JavaScript](http://eloquentjavascript.net/ "Eloquent JavaScript")
    - 書籍版も、海外では鉄板的に
- [JavaScript Garden](http://bonsaiden.github.com/JavaScript-Garden/ "JavaScript Garden")
    - 日本語版も完成したので必読
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


# コードリーディング

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
        - 興味があるライブラリ

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
    - 車輪の再発明で学ぶ

自分の場合は、コード = Greasemonkeyで有ることが多かった。

---

# コードの質
- 実行速度
    - ブラウザの変化の影響を受けて速度も変化
    - [jsPerf](http://jsperf.com/ "jsPerf") を活用
        - [JavaScriptコードのパフォーマンス比較ができるWebサービスjsPerfの使い方](http://efcl.info/2011/0303/res2330/ "JavaScriptコードのパフォーマンス比較ができるWebサービス「jsPerf」の使い方 | Web scratch")
- 可読性
    - JavaScriptは自由にかけるので注意
    - <a href="http://efcl.info/2011/0527/res2764/">JavaScriptのいろいろなコーディングルールをまとめてみた</a>
- 保守性
    - 自由にやりすぎると扱いにくくなる
    - モジュール
    - クロスブラウザ

一般的なWebサイトなら速度よりも可読性や保守性を優先した方がよい場合も多い。

---

# まとめのまとめ

* 見る(何を見る、どこを見る)
    * Web, ブラウザのアップデートも高速化
       * 新しい情報がどんどん増えている
    * ソーシャルサービスやSBMなどを上手く使って情報を得る
    * メールマガジンや週間のまとめサイトが急増
* 知る(何を知りたい、探す、情報の取捨選択)
    * とりあえずぐぐってみる
    * 何が正しい情報なのかを知る
    * リファレンスサイトなどを上手く使う
    * テストケースやベンチマークは今を知るツール
* 学ぶ(何からどう学ぶ、学習方法)
    * JavaScriptの本質を学ぶ事は大事
    * 学習テスト
    * 書いて学ぶ
    * コードリーディング

---

#おわり

