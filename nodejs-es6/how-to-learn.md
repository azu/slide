# どうやってECMAScript 6を学び始めるか

^ 自分でちゃんと見て読んで大丈夫というものしか出してないので、かなり最小限の紹介です。

-----

# 自己紹介

![azu](img/azu.png)

----

# ECMAScript 5を知る

-----

# ES6 の前に ES5 大丈夫?

- Property Descriptor
- Object.create()
- Strict Mode
- [Thinking About ECMAScript 5 Parts - Tech.pro](http://tech.pro/tutorial/1671/thinking-about-ecmascript-5-parts "Thinking About ECMAScript 5 Parts - Tech.pro")

-----


# [Speaking JavaScript](http://speakingjs.com/ "Speaking JavaScript")

![fit, speaking js](img/speaking-javascript.jpg)


^ Dr.Axelが書いたES5についての書籍。
^ オンライン版は無料で読めて、とても良くまとまっている。

-----

# なぜ ES5 が大事か?

- (恐らく)学ぶ過程で[Babel](http://babeljs.io/ "Babel")のようなTranspilerに手を出してしまう
- TranspilerはES5の機能を使いきって実装されている
- [JavaScript Transformation - JSConf 2015 // Speaker Deck](https://speakerdeck.com/sebmck/javascript-transformation-jsconf-2015 "JavaScript Transformation - JSConf 2015 // Speaker Deck")

^ ES5の機能が分かってないとTranspilerを使うときに誤解する


-----

# ES6の概要を知る

-----

# [WEB+DB PRESS Vol.87](http://developer.cybozu.co.jp/tech/?p=9081 "WEB+DB PRESS Vol.87")

![Web+DB](img/71LmJzHcVOL.jpg)


-----

# [git.io/es6features](https://github.com/lukehoban/es6features "git.io/es6features")

![git-es6features.png](img/git-es6features.png)


----

# 実行環境

^ 文章でよみだけで理解するのは大変です。
^ ES6はまだ承認されたばかりですが、大部分は既に動かす手段が用意されいます。

----

# 実行環境を揃える

- Browser(推奨)
	- MSEdge、Firefox、Chrome、Safari(Webkit JSC)
- Babel(Transpiler)

----

# Browserへの実装状況

----

# [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/ "ECMAScript 6 compatibility table")

![compat-table.png](img/compat-table.png)

^ 定番: ある機能のブラウザやTranspilerで実装されているかを一覧できる

----

# [Big JS-Compatibility-Table](http://compatibility.shwups-cms.ch/en/home? "Big JS-Compatibility-Table")

![js-compatibibility-table.png](img/js-compatibibility-table.png)

^ 補足: DOMオブジェクトにあるプロパティがあるかどうか、またそのプロパティのtypeof何かを一覧できる

----


# Transpilerを使う前に

----


![dont use , inline](img/JavaScript_transformation.png)

[JavaScript Transformation - JSConf 2015](https://speakerdeck.com/sebmck/javascript-transformation-jsconf-2015 "JavaScript Transformation - JSConf 2015 // Speaker Deck")

^ Babelの作者であるsebmckもTranspilerは完全に再現できないケースがあるので、Transpiler**のみ**で言語機能を学ぶのはやめようといってる

----


# Transpiler is not Learning Tool


- 以下の分類が何を基準にしてるか、分からない場合はTranspilerで学ぶのは危険が伴う


-----

```
╔═══════════════════════╤═════════════════════╗
║           A           │          B          ║
╠═══════════════════════╪═════════════════════╣
║ Classes               │ SubClassing         ║
╟───────────────────────┼─────────────────────╢
║ spread (...) operator │ Proxy               ║
╟───────────────────────┼─────────────────────╢
║ Map                   │ WeakMap             ║
╟───────────────────────┼─────────────────────╢
║ Set                   │ WeakSet             ║
╟───────────────────────┼─────────────────────╢
║ Promise               │ Symbol              ║
╟───────────────────────┼─────────────────────╢
║ Template Strings      │ Temporary Dead Zone ║
╟───────────────────────┼─────────────────────╢
║ Math Extension        │     .....           ║
╚═══════════════════════╧═════════════════════╝
```	


^ TranspilerやPolyfillで再現できる機能かどうかの分類

-----

# :beginner: ES6を学ぶ前に

- ES5がわからない
	- => ES5を学ぶ
- Transpilerの動作原理がわからない
	- => ブラウザが対応してる機能を優先して学ぶ
- Transpilerがではできないことも理解してる
	- => 容量用法を持って正しく使いましょう


-----

# ES6を学ぶ

----


# [es6-features.org](http://es6-features.org/)

![es6-features](img/es60features.png)

^ 簡単に機能を一覧できる
^ Transpilerでできるかどうか = ES5でも可能かどうか

----

# [Exploring ES6](http://exploringjs.com/ "Exploring ES6")

![fit, exploreres6.jpg](img/exploreres6.jpg)

^ Dr.AxelによるES6についての書籍
^ 2015-06-26現在もっと良いES6の書籍

----

# [getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS "getify/You-Dont-Know-JS")

![doyouknow.png](img/doyouknow.png)

^ getify氏のYou Don't Know JSシリーズ
^ 仕様や議論についても拾っているので、読んでいて発見がある

----

# ES6を書く

----

# [tower-of-babel](https://github.com/yosuke-furukawa/tower-of-babel "yosuke-furukawa/tower-of-babel")

![tower-of-babel.png](img/tower-of-babel.png)


----

# 書く

- [Learn ES2015 · Babel](http://babeljs.io/docs/learn-es2015/ "Learn ES2015 · Babel")
- [ライブラリをES6で書いて公開する所から始めよう](http://efcl.info/2015/01/09/write-es6/ "ライブラリをES6で書いて公開する所から始めよう")
- [NW.js](http://nwjs.io/ "NW.js")や[Electron](http://electron.atom.io/ "Electron")で動くアプリを書く
	- io.js(V8)が入ってる


----

# 仕様を読む


----

# [Standard ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm "Standard ECMA-262")


----

# [ECMAScript仕様書を読む · Issue #47 · azu/azu](https://github.com/azu/azu/issues/47 "ECMAScript仕様書を読む · Issue #47 · azu/azu")

----

# [ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch](http://efcl.info/2015/05/07/es6-draft-search/ "ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch")

-----

# :arrow_forward: ECMAScript Next 

----

# プロポーサル一覧


- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")
- [Stage 0 Proposals](https://github.com/tc39/ecma262/blob/master/stage0.md "Stage 0 Proposals")
- [ecmarkup](https://github.com/bterlson/ecmarkup "ecmarkup")でプロポーサルを書き、GitHubに置く
	- + [ES Discuss](https://esdiscuss.org/ "ES Discuss")
	- 議論の場所を議論中: [Move es-discuss to discuss.webplatform.org?](https://esdiscuss.org/topic/move-es-discuss-to-discuss-webplatform-org "Move es-discuss to discuss.webplatform.org?")



----

# [tc39/tc39-notes](https://github.com/tc39/tc39-notes/ "tc39/tc39-notes")

- ECMAScriptを作成する委員会(TC39)のミーティングノート
- 大体3ヶ月に1度開催
- [#TC39MTG](https://tc39-mtg.doorkeeper.jp/ "TC39 MTG Notes MTG | Doorkeeper")で一人読書会をやってます
- ミーティングに参加してないけどコミットしてる 

![tc39, right,fit](img/tc39-notes.png)

----

# [明日には使えなくなるES7トーク](http://azu.github.io/slide/es6talks/ "明日には使えなくなるES7トーク")

- 賞味期限 まで 後
- ES7以降の仕様策定の流れ
- Stageって何か?

-----


# まとめ

- [WEB+DB PRESS Vol.87](http://developer.cybozu.co.jp/tech/?p=9081 "WEB+DB PRESS Vol.87")で概要を把握
- [es6-features.org](http://es6-features.org/)で簡単にどんな機能が増えたのかを見る
- [tower-of-babel](https://github.com/yosuke-furukawa/tower-of-babel "tower-of-babel")で実際に書いてみる
- もっと深く知りたい場合は[Exploring ES6](http://exploringjs.com/ "Exploring ES6")を読む
