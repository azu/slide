# [fit] 多段SourceMapと統一的なインターフェース
 
----

# 自己紹介

![アイコン,](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----

 
# SourceMap?
 
![fit](http://efcl.info/wp-content/uploads/2014/09/basic-sourcemap.png)
 
----

![fit](http://efcl.info/wp-content/uploads/2014/09/basic-sourcemap.png)

---

# 1対1のSourceMap
 
- 問題ない
- 便利
 
----
 
# 多段SourceMap
 
![fit](http://efcl.info/wp-content/uploads/2014/09/multiple-sourcemap.png)

----

![fit](http://efcl.info/wp-content/uploads/2014/09/multiple-sourcemap.png)

----

# 変換後から元のファイルを辿れない

## AltJS -> JS -> 圧縮等で起きる問題

----

# 解決する方法を考えた

----

# [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap "multi-stage-sourcemap")

----

![fit](http://efcl.info/wp-content/uploads/2014/09/multiple-stage-sourcemap.png)

----

# multi-stage-sourcemap

- 中間のSourceMap自体はある(という前提)
- 中間のSourceMap同士を繋いで新たなSourceMapを作成
- => 最初と最後のソースを繋ぐSourceMapを作る

![fit](http://efcl.info/wp-content/uploads/2014/09/multiple-stage-sourcemap.png)

----

# 仕様書に載ってた

> The easy but lossy way is to ignore the intermediate steps in the process for the purposes of debugging, the source location information from the translation is either ignored or the source location information is carried through. 
-- [Source Map Revision 3 Proposal ](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit# "Source Map Revision 3 Proposal - Google ドキュメント")

----

# 実例

- [twada/power-assert](https://github.com/twada/power-assert "twada/power-assert")
	- [Release v0.9.0: Release 0.9.0 (2014-09-02) multi-stage sourcemaps · twada/power-assert](https://github.com/twada/power-assert/releases/tag/v0.9.0 "Release v0.9.0: Release 0.9.0 (2014-09-02) multi-stage sourcemaps · twada/power-assert")
	- [power-assert 多段 SourceMap 対応の方針](https://gist.github.com/twada/103d34a3237cecd463a6 "power-assert 多段 SourceMap 対応の方針")
	- [twada/battlefield-sourcemaps](https://github.com/twada/battlefield-sourcemaps "twada/battlefield-sourcemaps")
- [mishoo/UglifyJS2](https://github.com/mishoo/UglifyJS2 "mishoo/UglifyJS2")
	- [Multi-level Source maps | The CSS Ninja - All things CSS, JavaScript &amp; HTML](http://www.thecssninja.com/JavaScript/multi-level-sourcemaps "Multi-level Source maps | The CSS Ninja - All things CSS, JavaScript &amp; HTML")
	- 同じような手法を使って対応してる

----

[spy-js](http://spy-js.com/ "spy-js")

![img](http://monosnap.com/image/UK4sSqfcU7FYKRd4akcibJI6jiXF7o.png)

-- https://twitter.com/SpyDashJs/status/512503730625732608


Pull Requestもきたし多分載るのでは

----

# 多段SourceMapは戦場

- SourceMapの仕様には**多段で変換された**という情報がない
	- A -> B(a-b.js.map) -> C(b-c.js.map)
	- `b-c.js.map`にはAに関する情報は存在しない
- GruntやGulpなどプラグインの責務で変換を行う場合に問題が起きる
	- [twada/battlefield-sourcemaps](https://github.com/twada/battlefield-sourcemaps "twada/battlefield-sourcemaps")

----

## Grunt

> grunt では上流 SourceMap がどう来るか調べる必要がある。
> - js と同一ディレクトリに外部 .map ファイルのパターン
> - js ファイル末尾に base64 コメントで付いているパターン
> -- [power-assert 多段 SourceMap 対応の方針](https://gist.github.com/twada/103d34a3237cecd463a6 "power-assert 多段 SourceMap 対応の方針")

----

## Gulp

### [floridoo/gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps "floridoo/gulp-sourcemaps") に[対応](https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support "Plugins with gulp sourcemaps support · floridoo/gulp-sourcemaps Wiki")してればOK

## Browserify

### [独自のチェーンを持ってる](https://gist.github.com/twada/103d34a3237cecd463a6#espowerify "power-assert 多段 SourceMap 対応の方針")のでそれに対応する

----

# 世代を持つSourceMapを扱う統一インターフェースがない

----

# SourceMapのまとめ

- 多段SourceMapの対応は最初と最後を繋いだSourceMapを作ることで対応
- 中間結果は捨ててしまう
- 将来的に中間のバージョンも持つような仕組みが仕様に欲しい
	- [Beyond Source Maps](http://fitzgeraldnick.com/weblog/55/ "Beyond Source Maps")

----

# ここまで前置き

----

# 統一的なインターフェース(AST)

----

# [aster - AST-based code builder](http://rreverser.com/aster-ast-based-code-builder/ "aster - AST-based code builder")

- ASTを使ったツールの問題を解決しようとしてる
- それぞれのプラグイン(変換)ごとにパースと生成の処理が入ってる問題
	- ParseとGenerateはとても重たい処理

----

![fit](http://monosnap.com/image/MQJmxXkCRlIvOzq5x0bzyoytP5zZOl.png)

----

![fit](http://monosnap.com/image/kQhPiCykxgEsNZnr4CAYhDUjpw60YO.png)


----

# [fit] ASTを受け取りASTを返す

- [aster](http://rreverser.com/aster-ast-based-code-builder/ "aster - AST-based code builder")はASTをInput/Outputするプラグインを使う
- ASTを変換するプラグインはASTを返すインターフェースを持つ
- 効率的なASTの変換が行える

----

![fit](http://monosnap.com/image/9iwjh67u7SxayeMmmqTePdohvwGC0k.png)

----


# 現実

- ASTを使うモジュールがコードを受け取ってコードを返す
- ASTを受け取ってASTを返すAPIをPublicにしてないものが多い
- SourceMapと同じように扱う形式(SourceMap/AST)は決まってる
- それらを連続的に扱う方法については決まってないので自由に破壊されるケースが多い

----

# まとめ:我々の扱う入力/出力

- ソースコード
	- ファイルのコンテンツ
- SourceMap
	- ファイルのコンテンツ と ファイルパス
- AST
	- SpiderMonkey AST

----

# そのた

- [ASTを扱うツールの作り方 · Issue #19 · efcl/efcl.github.io](https://github.com/efcl/efcl.github.io/issues/19 "ASTを扱うツールの作り方 · Issue #19 · efcl/efcl.github.io")
- [多段SourceMapの対応方法とライブラリ | Web Scratch](http://efcl.info/2014/09/03/multi-stage-sourcemap/ "多段SourceMapの対応方法とライブラリ | Web Scratch")


