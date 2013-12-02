title: JSer.info 2013
author:
  name: azu
  twitter: azu_re
  url: http://efcl.info/
output: okonomi_js.html

--

# [power-doctest](https://github.com/azu/power-doctest "azu/power-doctest")

--

## [power-doctest](https://github.com/azu/power-doctest "azu/power-doctest")

* doctest風のJavaScriptテストツール

	評価したい式; // => 期待する評価結果

<img src="http://efcl.info/wp-content/uploads/2013/12/Effective_JavaScript-2013-12-01-21-49-24.jpg" alt="Effective JavaScript 2013 12 01 21 49 24" title="Effective_JavaScript] 2013-12-01 21-49-24.jpg" border="0" width="600" height="304" />

--

## 目的

* 書籍の写経補助 (not for production)
* エディタから離れずにコードを評価出来る
* [twada/power-assert](https://github.com/twada/power-assert "twada/power-assert") 利用なので、間違いが見やすい
* サンプルコード と テストコードが一緒にあっても違和感がない構文

--

![ScreenShot](http://gyazo.com/56ea3848bb1a419d7d0ed47d111b39fc.gif)

--

## 仕組み

Transform JavaScript AST


	評価したい式; // => 期待する評価結果
	
-> 

	assert(評価したい式 === 期待する評価結果);
	
--

## 仕組み(実行)

* nodeの[vm](http://nodejs.jp/nodejs.org_ja/api/vm.html "vm")モジュール
	 * like eval, but not eval
* ファイルから読み込んだのと同じように実行できる
	* [実行コンテキスト](http://d.hatena.ne.jp/vividcode/20110430/1304182281 "実行コンテキスト")をすり替えられる
	* グローバル空間にあるものをモックに変えたりできる
	* 逆に実行コンテキストを取得出来るので
	* [Nodeでプライベートな(exportsされてない)メソッドのテスト - ぶれすとつーる](http://nazomikan.hateblo.jp/entry/2013/04/10/032410 "Nodeでプライベートな(exportsされてない)メソッドのテスト - ぶれすとつーる")
	
--

# JS testing everywhere!