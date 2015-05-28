# ECMAScript 6 Draft Hisotry Repo

## ES6 Draftの歴史のGitリポジトリ

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
	- Rev 16と30を比較してどういう記述が変わったの家などがわからない


----

# ES6ドラフトの差分を見たい

- Gitリポジトリがあればなー
	- revごとに変更点がコミットされたものがあれば
- ないなら作ってしまおう !!
- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)

-----

# どういうこと?

- ES6ドラフトのファイルをテキストファイルに変換
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

![right](img/st.png)

- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision "meta-ecmascript/es6-draft-revision")

-----

# DEMO

- `Reflect.construct`が何時入ったのかを見てみよう


-----

# コミットを見つけたら

- Rev前後のミーティングノートやMLを探してみる
- [ES Discuss](https://esdiscuss.org/ "ES Discuss")
- [rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")
- [Bugzilla](https://bugs.ecmascript.org/describecomponents.cgi "Bugzilla")

-----

# 参考

- [インデントコミットで真犯人がわからなくなった場合の git blame - Qiita](http://qiita.com/sonots/items/b6852db6638cda233bc8 "インデントコミットで真犯人がわからなくなった場合の git blame - Qiita")
- [git logでコミットの差分の中身で絞り込む - Qiita](http://qiita.com/yuichielectric/items/cce64b5b5e0eacc02e64 "git logでコミットの差分の中身で絞り込む - Qiita")


-----

# 類似研究

- [dspinellis/unix-history-repo](https://github.com/dspinellis/unix-history-repo "dspinellis/unix-history-repo")
	-  Unixの歴史のgitレポジトリ

-----

# おわり

- [ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch](http://efcl.info/2015/05/07/es6-draft-search/ "ECMAScript 6ドラフトのDiff検索用リポジトリを作った | Web Scratch")
- [meta-ecmascript/es6-draft-revision](https://github.com/meta-ecmascript/es6-draft-revision)