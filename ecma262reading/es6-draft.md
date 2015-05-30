# ECMAScript 6 Draft Hisotry Repo

## ES6 DraftのGitリポジトリを作る

-----

# ECMAScript 6 ドラフト

![list,right,fit](img/es6-draft-list.png)

- [Draft Specification for ES.next (Ecma-262 Edition 6)](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts "Draft Specification for ES.next (Ecma-262 Edition 6)")
- Revision 38まである
- doc、pdfで公開されている
- 非公式のHTML版も公開されてる
	- [jorendorff/es-spec-html](https://github.com/jorendorff/es-spec-html "jorendorff/es-spec-html")


-----

# ECMAScript 6 ドラフトの問題点

- 一般的なバージョン管理がされてない
	- Wordの編集履歴とChangeLogのみ
- Revision同士の差分が取得できない
	- 例) Rev 16とRev 30を比較できない


----

# ES6ドラフトの差分を見たい

- Gitリポジトリとして更新されていればなー
	- Rev毎に変更点がコミットされたものがあれば
- ないなら作ってしまおう !!
- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)

-----

# どういうこと?

![repository,right](img/repository.png)

- ES6ドラフトをRev毎にテキストファイルに変換
- １つのテキストファイルの単一リポジトリとしてES6ドラフトの履歴を表現
- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)

-----

![repository](img/tig.png)

-----

# 作り方

1. ドラフトのdocファイルを全部ダウンロード
2. docファイルをテキストに変換する
3. GitにRevごとにコミットとして突っ込む
4. git log -S -i "search"とかで検索できる!

-----

# ドラフトのdocファイルを全部ダウンロード

- ダウンロードするURLの一覧
- [meta-ecmascript/es6-spec-changelog](https://github.com/meta-ecmascript/es6-spec-changelog "meta-ecmascript/es6-spec-changelog")
- ダウンロードするツール
- [meta-ecmascript/download-es6-spec](https://github.com/meta-ecmascript/download-es6-spec "meta-ecmascript/download-es6-spec")

----

![list,fit](img/es6-draft-list.png)

----

# docファイルをテキストに変換する

- docファイルを直接テキストに変換は難しい
- doc -> docx -> txt としてやる
- doc から docx への変換を安定してやるにはWordを使うしかない…
	- wordで開いてdocxで保存するマクロで変換

----

![word](img/es6-word.png)

----

![gif-word](http://embed.gyazo.com/68a583b43ea127b79973f6202f1a556e.gif)

----

#  GitにRevごとにコミットとする

- pandocでdocx -> txtとして変換
- revごとのテキストファイル作成
- es6-draft.txtにリネーム->コミット->次のRevでes6-draft.txtを上書き...
	- 繰り返してGitのコミット積み上げる

----

# 完成

![fit](img/st.png)


## [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision "meta-ecmascript/es6-draft-revision")


-----

![](img/annotation.jpg)

----

# (Gitリポジトリにすると)何が良いのか

- テキストファイルだから検索しやすい
- Gitを使った変更履歴の検索パターンが応用できる
	- [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")
- ドラフトのどのバージョンで変更があったのかが追いやすい
	- 関連するログを調べて何故そういう変更があったのかを調べるのに役立つ


-----

# DEMO

- `Reflect.construct`が何時入ったのかを探してみよう
- [26.1.2 Reflect.construct ( target, argumentsList [, newTarget] )](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-reflect.construct "26.1.2 Reflect.construct ( target, argumentsList [, newTarget] )")
- `new target` + 内部処理もできるReflrect API

^ `git log -S "Reflect.construct"`を検索
^ 横断的に検索できる
^ `tig grep "Reflect.construct"`で検索
^ `,`のショートカットで戻っていく


------
# Class - TypeScriptとBabel

- Classで定義したmethodの違い
- TypeScriptはmethodがenumerable
- Babelはmethodがnon-enumerable
- どっちが正しい?


-----

![typescript,inline](img/typescript-class.png)
![babel,inline](img/babel-class.png)


-----

# ClassMethodはnon-enumerable

- 現在の仕様ではClassのmethodはnon-enumerable
- Babelの方が仕様に沿ってる
- なぜこうした違いが生まれているのかを変更履歴から見る
	- DEMO:([やり方はこちら](http://efcl.info/2015/05/07/es6-draft-search/ "ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch"))

^ `PropertyDefinitionEvaluation`でこの列挙が定義されてる
^ tig grep -i "PropertyDefinitionEvaluation"で現在の仕様を見る
^ `b`でblameモードに入る
^ `,`でコミットを戻って変更を確認できる
^ Rev 26でその変更が入ったことがわかる


-----

![img](img/correct-class-method.png)


-----

# コミットを見つけたら

- Rev前後のミーティングノートやMLを探してみる
- [ES Discuss](https://esdiscuss.org/ "ES Discuss")
- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")
- [Bugzilla](https://bugs.ecmascript.org/describecomponents.cgi "Bugzilla")

-----

# 参考

- [われわれは、いかにして変更点を追うか](http://azu.github.io/slide/cto/changelog.html "われわれは、いかにして変更点を追うか")
- [インデントコミットで真犯人がわからなくなった場合の git blame - Qiita](http://qiita.com/sonots/items/b6852db6638cda233bc8 "インデントコミットで真犯人がわからなくなった場合の git blame - Qiita")
- [git logでコミットの差分の中身で絞り込む - Qiita](http://qiita.com/yuichielectric/items/cce64b5b5e0eacc02e64 "git logでコミットの差分の中身で絞り込む - Qiita")


-----

# 類似研究

- [dspinellis/unix-history-repo](https://github.com/dspinellis/unix-history-repo "dspinellis/unix-history-repo")
	-  Unixの歴史のgitレポジトリ

-----

# まとめ

- (Gitの)歴史は捏造できる
- Git向けのツールがそのまま転用できる
	- [ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch](http://efcl.info/2015/05/07/es6-draft-search/ "ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch")
	- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)
