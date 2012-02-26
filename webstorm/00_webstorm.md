# WebStorm指南書

---

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : azu
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info], [MemeTodo], [prog*sig]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"
[MemeTodo]: http://meme.efcl.info/ "MemeTodo"
[prog*sig]: http://efcl.info/adiary/ "prog*sig"
[WebStorm]: http://www.jetbrains.com/webstorm/ "WebStorm"
---

# [WebStorm][]
		
![WebStom](http://www.jetbrains.com/img/logos/webstorm_logo.gif)

* HTML/CSS/JS 対応のIDE
	* JSON/Node/CoffeeScript/SCSS/LESS/HAML
* Windows/Linux/Mac クロスプラットフォーム対応
* Jetbrains製のIDE
    * Intelli J,PHPStorm, RubyMine, AppCode などの姉妹品
* <del>$69</del> $49 / 年間 (2012年2月中)
	* 1年間有効でその間のアップデートは無償	
* シェアウェアだが使う価値がある

---

# アジェンダ

> ここがすごいよ [WebStorm][]

* 静的コード解析
* 補完機能
* コード整形/コードスタイル
* Quick Fix/Refactor/Debugger
	* Code Inspections, JSLint, JSHint
* バージョン管理システム連携
	* Git,Github
* 最新のWebへの追従

---

# WebStorm利用環境

* Mac OSX 1.0.6.8 & Windows Vista, 7
* WebStorm 4 EAP-114.158 を利用
	* EAP - Early Access Preview builds
	* つまりα版なので、まだ変更があるビルドバージョン
* EAPは30日以内に次のビルドがリリース


---

# まず最初に検索

---

## 機能の検索

**Find Action**(Ctrl+Shift+A)

![Find Action](https://img.skitch.com/20120225-xg6eaibi39qnfax7924jprqym9.png)

機能を説明する際に、ショートカットキーよりもAction名で説明したほうが分かりやすいので、まず最初に覚える。


* __コマンド__を検索する
* 最初に知っておくとやりたい事が見つけやすい
* 大抵適当な英語でやりたい事が見つかる

---

## 設定の検索

![Setting Search](https://img.skitch.com/20120225-dn6xi7rk2jcsaref5p8bsjutrw.png)

UIは英語だが、検索がよくできてるのでなんとかなることもある

* 設定の目次だけではなく、中の項目も検索範囲に含まれる
* 設定の解説は左下のヘルプボタンで見られる

![無効化](https://img.skitch.com/20120225-rwttbcxn9xa18f5ihgabyuwq8r.png)

* Lint系の機能はその場から無効化もできるようになっている

---

## 設定項目のヘルプ(解説)

![Help Window](https://img.skitch.com/20120225-fespc76k429yphshbu662hac99.png)

左下のヘルプボタンから直接項目のヘルプが見られる

* WebStormのヘルプはきちんと書かれている
* [Getting Help](http://www.jetbrains.com/webstorm/webhelp/getting-help.html "Getting Help")
	* オンラインでもヘルプは閲覧できる

---

## ヘルプその他

* [JetBrains WebStorm Support](http://www.jetbrains.com/support/webstorm/ "JetBrains WebStorm Support")
	* フォーラム検索
* [WebStorm Docs & Demo](http://www.jetbrains.com/webstorm/documentation/index.html "WebStorm")
	* ショートカットチートシートや動作デモが置いてある
* [PhpStorm &amp; WebStorm FAQ](http://confluence.jetbrains.net/pages/viewpage.action?pageId=15803859 "PhpStorm &amp; WebStorm FAQ - Web IDE - Confluence") 
	* よくある質問がまとめられている

---

# ショートカットキーの設定

![preset](https://img.skitch.com/20120225-jt3ecew5dmppxxaqcs9diyj2b6.png)

* デフォルトでプリセットがいくつか用意されている
	* マウスクリックなどに対しても動作を設定できる
* Vim風の動作は[IdeaVIM](http://plugins.intellij.net/plugin/?id=164 "IdeaVIM")プラグインで
	* 最近になって[JetBrains / ideavim](https://github.com/JetBrains/ideavim "JetBrains / ideavim")と公式プラグイン化
* 設定(ショートカット以外も含めて)はExport/ImportでOSを超えた環境移行できる

---	

# スライドの見方

![Screen Shot](https://img.skitch.com/20120225-xjt422pxfrrmeyu2c8guywwa8y.png)

* スライドでは **コマンド名**(仮ショートカットキー) という表記をしてる
* 環境(OSもある)によって違うので基本的にAction Nameベースで解説

---

# WebStorm Feature

---

# 静的コード解析

* JavaScriptのコードを静的解析して構造化
	* ファイル間を超えてコードが構造化される
* この静的コード解析によりWebStormのいろんな機能が機能する
* .ideaディレクトリにキャシュされる	
* コード補完の候補にも利用される

---

## コードのアウトライン

**Structure**

![Structure](https://img.skitch.com/20120225-ttp2sbbxg6eacu5tjtsxjj9jff.png)

* Structureパネルでコードのアウトラインを表示

---

## 宣言元へのジャンプ

**Jump to Source**(Ctrl+B)

![Jump to Source](https://img.skitch.com/20120225-qtgytxyhgq4b7mc8b4sq9dkq4.png)

* カーソル位置にある関数や変数から、宣言してる場所までジャンプ
	* ファイル間を超える宣言元へ移動できる
* コード把握/コードリーディングに最適

---

## 関数/変数の利用箇所を検索

**Find Usages**(Alt+F7)

![Find Usages](https://img.skitch.com/20120225-bxp7w9yjbrurpa277i54yiegya.png)

* 指定した変数や関数を利用している場所を一覧表示
	* __Jump to Source__の逆の役割
	* 静的コード解析の結果が利用されるので、単純な辞書検索ではない
* 検索対象のスコープ(プロフジェクト/ファイル/ディレクトリ)を指定できる

---

# 補完機能

**Completion**

![Completion](https://img.skitch.com/20120225-eikc3qixpwiqnj7b4c8e36j5hd.png)

![Host Object](https://img.skitch.com/20120225-nda62wfxh2wu261fgy139muh8c.png)

* ネイティブの機能もコードとして書かれたものが補完候補になっている
* 自分で補完候補の追加もできる
	* (JSDoc形式の)JavaScriptを書くだけ
	* [WebStormのコード補完に新しく候補を追加する方法](http://efcl.info/2010/1203/res2152/ "WebStormのコード補完に新しく候補を追加する方法")	

---

## 静的コード解析とコード補完

e.g.) container.obj.publicMethod()の補完

![public](http://efcl.info/wp-content/uploads/2010/10/ss-2010-10-27-4.png)

	!javascript
	var container = {
	    init : function(){
	    }
	};
	container.obj = (function(){
	    var manager = {
	        publicMethod : function(){
	            alert("Public");
	        }
	    };
	    return manager;
	})();
---

# ステートメント補完
**Complete Current Statement**( Ctrl + Shift + Enter)

現在いるステートメントを補完して終了する

以下なら、セミコロンを補完

	!javascript
	var hoge = fuga || ''
	// => After
	var hoge = fuga || '';


以下なら、{};を補完

	!javascript
	var fn = function () 
	// => After
	var fn = function () {
		// |カーソル|
	};

以下なら、{}を補完

	!javascript
	if(typeof foo === "undefined")
	// => After
	if(typeof foo === "undefined"){
		// |カーソル|
	}

---

## コード補完まとめ

* ECMAScript/DOM/ブラウザ独自のオブジェクトに対応
	* E4X/ECMAScript6(traceurCompiler)/WebGL
* 開いているプロジェクトのjsコードも静的コード解析をしてコード補完される
* プロジェクトに依存しない独自の補完候補も追加可能
	* JavaScriptのコードを書いて設定の“JavaScript Libraries”に追加するだけ		
	* JSDocライクに属性を指定できる
	* [WebStormのコード補完に新しく候補を追加する方法](http://efcl.info/2010/1203/res2152/ "WebStormのコード補完に新しく候補を追加する方法")
* **Complete Current Statement**でステートメントを補完して完了できる
	* ショートカットを叩くだけで、次のステートメントに入れるのでリズムができる

---

# **コード整形**/コードスタイル

**Reformatting Source Code**( Ctrl+Alt+L)

![Refomat Code](http://www.jetbrains.com/ruby/features/screenshots/js/JS_code_formatting.gif)

* HTML/CSS/JavaScript/CoffeeScript/SCSS/LESS/JSONなどのフォーマットに対応
* コーディングスタイルが統一しやすい

---

# コード整形/**コードスタイル** 

![Seeting -> Code Style](https://img.skitch.com/20120225-xsgisrbpjxdjmfe1a23dcxxpqg.png)

* コード整形の形式は設定で細かく指定できる
* 自分でコーディングルールを考えるよりコードスタイルを設定した方がいい
	* コーディングスタイルが崩れにくい + Code Inspectionsと連携して安全
* WebStorm 4EAPでは[CoffeeScript整形時に崩れる問題](http://d.hatena.ne.jp/vvakame/20111224%231324696047?sid=5085d516e50fe97e "CoffeeScript導入に必要なこと - @vvakame の日記")が直ってる

---

# **Quick Fix**/Refactor/Debugger

**Quick Fixes**(Alt+Enter)

![Quick Fixes](https://img.skitch.com/20120225-bbubtjb1md96p4imahgm1iadf8.png)

* コードでおかしな所にはマークが付く
* Alt+Enterで 修正方法 を提案してくれる

![Quick Fixed](https://img.skitch.com/20120225-qfcrmc7tqsemafmg2uffjpadyg.png)

* 間違い のみじゃなくてスペルミスやif文のマージやいろいろ提案される

---

# Quick Fix/**Refactor**/Debugger

![Refacotr Menu](https://img.skitch.com/20120225-tru38jyhrg6epf115di28kxtym.png)

<style>
table.keytable {
	border-collapse: collapse;
}
table.bigger {
	font-size : 24px;
}
.keytable th {
	border: solid 1px #666666;
	color: #000000;
	background-color: #ff9999;
}
.keytable td {
	border: solid 1px #666666;
	color: #000000;
	background-color: #ffffff;
}
</style>
<table class="keytable">
	<thead>
		<tr>
			<th>
				Function
			</th>
			<th>
				Keyboard shortcut
			</th>
			<th>
				Use this shortcut to...
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				Rename
			</td>
			<td>
				Shift F6 
			</td>
			<td>
				変数や関数名やファイル名等を参照してるもの全てリネーム
			</td>
		</tr>
		<tr>
			<td>
				Change Method Signature
			</td>
			<td>
				Ctrl F6 
			</td>
			<td>
				選択したメソッドのシグネチャーを参照してるもの全て変更
			</td>
		</tr>
		<tr>
			<td>
				Move
			</td>
			<td>
				F6 
			</td>
			<td>
				Move a selected class/package/static member to another package/class and correct all references.
			</td>
		</tr>
		<tr>
			<td>
				Copy
			</td>
			<td>
				F5 
			</td>
			<td>
				Create a selected class/file/directory copy in the same or different package.
			</td>
		</tr>
		<tr>
			<td>
				Clone
			</td>
			<td>
				Shift F5 
			</td>
			<td>
				Create a selected class copy in the same package.
			</td>
		</tr>
		<tr>
			<td>
				Safe Delete
			</td>
			<td>
				Ctrl Delete 
			</td>
			<td>
				Usageをチェックして、安全にファイル/変数を削除する
			</td>
		</tr>
		<tr>
			<td>
				Extract Method
			</td>
			<td>
				Ctrl Alt M 
			</td>
			<td>
				選択してるコードをメソッドにする　
			</td>
		</tr>
		<tr>
			<td>
				Extract Variable
			</td>
			<td>
				Ctrl Alt V 
			</td>
			<td>
				選択してる式の結果を変数にする
			</td>
		</tr>
		<tr>
			<td>
				Introduce Parameter
			</td>
			<td>
				Ctrl Alt P 
			</td>
			<td>
				選択してる式の結果を関数のパラメータにする
			</td>
		</tr>
		<tr>
			<td>
				Inline
			</td>
			<td>
				Ctrl Alt N 
			</td>
			<td>
				選択してる変数やメソッドを利用してる場所をインライン化したものにする
			</td>
		</tr>
	</tbody>
</table>

---

# Quick Fix/**Refactor**/Debugger

**Refactor This**(Ctrl+Shift+Alt+t)

![Refactor This](https://img.skitch.com/20120225-du4pymwx3yer178m635i42sgdm.png)

* WebStorm 4あたりから使えるようになった
* 基本的には同じだけど、メニュー経由しないで使える

---

# Quick Fix/Refactor/**Debugger**

![Debugger Browser](http://blog.jetbrains.com/webide/files/2011/04/chrome-debugging.png)

Firefox/Chromeが対応

![Debugger](http://blogs.jetbrains.com/idea/wp-content/uploads/2011/03/debugtoolwindow.png)

WebStorm内にブレークポイントを貼って実行できる	

---

# Code Inspections, JSLint, JSHint

![Intection](https://img.skitch.com/20120225-kikxttw8g5j99s7akh6anjk521.png)

* WebStormは現在3種類のCode Inspectionsを利用できる
	* Code Intections(内蔵されいるいくつかのプラグインで構成される)
	* [JSLint](http://www.jslint.com/ "JSLint")
	* [JSHint](http://www.jshint.com/ "JSHint")

---

## Code Inspectionsの種類

<table class="keytable bigger">
	<thead>
		<tr>
			<th>
				種類
			</th>
			<th>
				Lintの厳しさ
			</th>
			<th>
				Lintの種類
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				Intections
			</td>
			<td>
				うるさくない程度、解決策も提案
			</td>
			<td>
				HTML/CSS/JS等対応
			</td>
		</tr>
		<tr>
			<td>
				JSHint
			</td>
			<td>
				JSLintより優しい、たまにうるさい
			</td>
			<td>
				JavaScript
			</td>
		</tr>
		<tr>
			<td>
				JSLint
			</td>
			<td>
				厳しさ : ダグラス
			</td>
			<td>
				JavaScript
			</td>
		</tr>
	</tbody>
</table>

* Code Inspectionsは併用可能
	* Intections+JSHintみたいなのも可能
* コードを書きながらベストプラクティスを学べる	

---

# バージョン管理連携

WebStormが対応してるバージョン管理システム

* Local History(ローカルの変更履歴)
* Git
* Mercurial
* SVN
	* SVN 1.7(WebStorm 4 EAP)
* THF
* Perforce
* CVS

> Gitしか使ってないのでGit周りについて

---

## Git

* 基本的なGitコマンドは行える

![Git Command](https://img.skitch.com/20120225-r16ye33853i5r8m1cm2umbm858.png)

---

## Git

![annotations](https://img.skitch.com/20120225-erx8fcxkj4tad178bt82b3msjx.png)

コードにgit blameを表示する感じ

* .gitを直接Webからインポート
* WebStormがSSHクライアントを持っているので、Windowsでの自動パスワード入力が楽
* Githubに対応
	* Githubアカウントにログイン

---

## Github連携

**Clone repositories from GitHub**

![Github Clone](https://img.skitch.com/20120225-rj5da22eadtg638spc1nm2n39n.png)

自分のアカウントでログインしてcloneできる	

**Publish your projects on GitHub**

![Github Share](https://img.skitch.com/20120225-q1dp35te4e3w78y7d6ampax81g.png)

* WebStormのプロジェクトをそのままGithubに公開できる
	* Markdownプラグインもあり、WebStorm内でGithubへの公開まで完結する

---

## Gist連携

**Share code snippets through Git gists**

![gist](https://img.skitch.com/20120225-b27sd2c3hgry4f8j25q6jj6m88.png)

コードを選択してる状態で右クリックから[Gist](https://gist.github.com/ "Gist")へコードを公開できる

![gist prompt](https://img.skitch.com/20120225-hs52r7s6itr7y5ehpmm8awwse.png)

公開ダイアログも丁寧な作り

---

# WebStorm 4 EAP

---

## ECMAScript 6 (Harmony)

![ECMAScript Harmony](https://img.skitch.com/20120225-8pf6cgn2d4pure2xrpwyjmsc5.png)

主たる意味は構文的なサポート。まだまだ完全ではない

内部的に[Traceur](http://code.google.com/p/traceur-compiler/ "Traceur")が使われてる

* 分割代入
* let , const
* for of
* [Quasi-literals](http://www.2ality.com/2011/09/quasi-literals.html "Quasi-literals")

> [ECMAScript 6 support in Mozilla - MDN](https://developer.mozilla.org/en/JavaScript/ECMAScript_6_support_in_Mozilla "ECMAScript 6 support in Mozilla - MDN")

---

## Project generation

![Project Template](https://img.skitch.com/20120225-jwgb5fik756b82mgf8quji2hjb.png)

* プロジェクト作成時にHTML5 boilerplateのようなテンプレートを導入できる

以前からあったもの

* File Template
	* ファイル作成のテンプレート
* Live Template
	* コードに挿入するスニペット的なもの
	* 応用でZen Cordingで実装されてる
	* ![zen coding](https://img.skitch.com/20120226-rn4wt2cekaxu7wesygqyupchhx.png)
  
---

# 最新のWebへの追従

![WebStorm Updates](https://img.skitch.com/20120225-m6ahhne5w1g9xercrfadq2761u.png)

* WebStormのアップデート頻度
	* 月に2-4回、安定してアップデートしている(EAP含めて)
* CoffeeScript/SCSS/LESSのようなものにも積極的に対応
	* [NodeJS](http://plugins.intellij.net/plugin/?webide&amp;id=6098 "NodeJS")や[Dart](http://plugins.intellij.net/plugin/?webide&amp;id=6351 "Dart")等プラグインとして対応始めるものもある
	* さすがにVimやEmacsほど範囲は広くないが、安定したバージョンになると強い

---

# WebStormの楽しさ

* ES6のような最新の仕様へも対応していってる
* ワクワクする機能もどんどん入っていく
	* Github連携
	* Test,Code Coverageサポート
		* 現在はJsTestDriverに対応している
	* JavaScriptライブラリのドキュメント表示
* Webの流れは早いのでそれに対応していけるエディタ or IDEが求められる

---

# Fin.

---

# Slide Resources

* [webstorm at gh-pages from azu/slide - GitHub](https://github.com/azu/slide/tree/gh-pages/webstorm "webstorm at gh-pages from azu/slide - GitHub")
	* 本日のスライド
	* mhtml風にリソースをhtmlにまとめてるので、オフラインでも見られる作り
* [adamzap/landslide - GitHub](https://github.com/adamzap/landslide "adamzap/landslide - GitHub")
	* [azu/landslide-theme - GitHub](https://github.com/azu/landslide-theme "azu/landslide-theme - GitHub")
	* スライドジェネレーター
* [Skitch](http://skitch.com/jp/ "Skitch")
