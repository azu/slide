#  われわれは、いかにして変更点を追うか

-----

# アジェンダ

![flow, fit right](flow.png)

- 変更点を
	- 探す
	- 見る
	- 見つける


-------

# アジェンダ

![flow,fit right](flow.png)

- 変更点を
	- 書く
	- まとめる
	- 作る

-----

# 変更点を追う :mouse:

-----

# ChangeLog

- [GitHubでライブラリのリリースを見ていくためのツールや方法](http://efcl.info/2014/07/30/find-github-release/ "GitHubでライブラリのリリースを見ていくためのツールや方法 | Web Scratch")に書いた

* リポジトリのWatch => [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* タイムライン => [azu/github-reader](https://github.com/azu/github-reader "azu/github-reader")
* Star => [starseeker](http://starseeker.so/ "starseeker")
* GitHub ReleaseのRSS => [azu/github-releases-to-feedly](https://github.com/azu/github-releases-to-feedly "azu/github-releases-to-feedly")
* GitHub Releaseの補助
    * [azu/check_changelog_from_release](https://github.com/azu/check_changelog_from_release "azu/check_changelog_from_release")
    * [azu/show-diff-from-release](https://github.com/azu/show-diff-from-release "azu/show-diff-from-release")


-----

# ChangeLogの問題

- 全ての変更がChangeLogからわかるわけじゃない
- 多くの人はめんどうなのでChangeLogを書かない
- ChangeLogがあってもそれはサマリなので、細かい内容が分からない
- ChangeLogより更に細かく見たい場合は**Issue/Pull Request**を探す

-----

# Issue/Pull Request

- 大きなライブラリほどIssueやPull Requestと関連付けてコミットされる
- ChangeLogにも該当Issueが書いてあることが多い
- => ChangeLogからIssue/PRを探すとより細かい情報が見られる
- ChangeLogにIssue/PRが書いてない場合は? 

-----

# Issue/PRの探し方 - 検索

-----

# GitHub検索

- GitHubのリポジトリ検索
- -> Issueも検索できるのでキーボードから探す
- 関連ファイルからの検索
- -> 関連するファイルから探す
- Twitter検索
- -> 関係ある人がそれに関係あるキーボードを書いてる可能性がある
- 公式サイト/ドキュメント
- ->真面目に書いてるならリリース時にドキュメントが更新されてる

-----

# Issue/PRの探し方

-----

# [Babel 5.3.0](https://github.com/babel/babel/blob/master/CHANGELOG.md#530 "5.3.0")の例

![Babel](img/babel.png)

-----

# Babel 5.3.0の変更点

![right,fit](img/babel5.3.0-full.jpg)

- 変更内容については書いてある
-  **[New Feature]**、**[Bug Fix]**、**[Spec Compliancy]**などジャンル分けされている
- "Speeeeed" とあるがどれくらい変わったのか書いてない
- IssueやPR、該当コミットへのリンクはない

-----

# Speeeeed??

## 具体的な速度の向上内容を知りたい!

------

# Speeeeed - 何がどう変わったのか

##  Twitterで検索

- https://github.com/babel/babel/blob/master/CHANGELOG.md#530 への言及から探す
- "Speeeeed Babel"で検索する
- [公式アカウント](https://twitter.com/babeljs)から探す

-----

# Speeeeed - 見つかった

- 20-40% ぐらい速度が上がったとのこと(公式アカウントより)

![inline](img/babel-speeeeed.jpg)

-----

# Speeeeed - Depth

![right,fit](img/babel-perf.jpg)

- パフォーマンスの向上は鵜呑みにしない :warning:
- 何が変更して、どういう計測方法で変わったのかを調べる
- 該当IssueやPRを見つけたい :seedling:
- :bulb: 公式アカウントへのレスで発見 ！ 

-----

# Speeeeed - 結果

- 以下のIssueを見ていけばいいことがわかった
- [Speeeeed · Issue #1486 · babel/babel](https://github.com/babel/babel/issues/1486)
- [Merge internal transformers into single traversal pass by sebmck · Pull Request #1472 · babel/babel](https://github.com/babel/babel/pull/1472)
	- 6.3.0でマージされたPR
	- 内部のtransformerを最適化する変更が入った

-----

# Speeeeed - 結果

![right,fit](img/babel-perf-own.jpg)

- tsserver.js、Traceur、Ember等を対象にして大体20-40%ぐらいコンパイル速度が上がった
- [Tweet](https://twitter.com/babeljs/status/598303570824421376)の根拠が分かった
- 根拠や理論は分かった => 実際に自分で計測する
- プロジェクトによっては誤差レベルだった

-----

# Speeeeed - 結論

- ChangelogからTwitter、GitHub Issueを探すことで
- [Merge internal transformers into single traversal pass by sebmck · Pull Request #1472 · babel/babel](https://github.com/babel/babel/pull/1472 "Merge internal transformers into single traversal pass by sebmck · Pull Request #1472 · babel/babel")
	- 複数のtransformerを1 passで通す変更が入った
- transformerを使うプロジェクトでは変換速度が上がった
- transformerを使ってないプロジェクトでは影響が少ない

-----

# Next: ファイルから探す

-----

## es7.trailingCommasの仕様への追従

![inline](img/babel5.3.0.jpg)

>     Allow trailing param commas for methods when using the es7.trailingCommas transformer.

どういう変更だったのか詳細を知りたい :thought_balloon:

-----

# es7.trailingCommasの仕様への追従

![right,fit](img/es7.trailingCommas.jpg)

- Babelでは`es7.trailingCommas`の変換するためのtransformerはファイルを分けて実装されてる
- GitHubでは"T"でファイル検索ができる
- [github のプロジェクトのページでファイルのインクリメンタル検索 - わからん](http://d.hatena.ne.jp/kitokitoki/20110212/p1 "github のプロジェクトのページでファイルのインクリメンタル検索 - わからん")

-----

# ファイルからコミットを探す

![inline](img/file-commiet-tree.jpg)

------
# コミットからIssueを探す

![right,fit](img/es7.trailingCommas-commit.jpg)

- [該当コミット](https://github.com/babel/babel/commit/6834cc5b468f4f76f0f03c2f103c5535e0a2b93f)からIssueへのリンクがあるかを見る
- GitHubではPull Requestでマージされたコミットに自動的にリンクが付く
- [Linking merged pull requests from commits](https://github.com/blog/1905-linking-merged-pull-requests-from-commits "Linking merged pull requests from commits")

-----

# ファイルから探す - 結論

-  変更履歴から関連するファイルを検索
- そのファイルについてのコミットを見る
- 該当コミットからPull Requestを発見出来た :bulb:
- [[es7.trailingFunctionCommas] Allow in new expressions by amasad · Pull Request #1487 · babel/babel](https://github.com/babel/babel/pull/1487 "[es7.trailingFunctionCommas] Allow in new expressions by amasad · Pull Request #1487 · babel/babel")

-----

# コミットレベルでの検索

## ここからはコマンドラインが必要

-----

# git bisect



----

# コミットメッセージの検索

----

# コミットのDiff検索

----

# git bisectを使った検索

- [git bisectでメソッドが削除されたコミットを探す - しんふぉにゃん](http://d.hatena.ne.jp/innx_hidenori/20110124/1295870463 "git bisectでメソッドが削除されたコミットを探す - しんふぉにゃん")


-----


# 変更点を作る :construction_worker:


-----

# 変更点を作る事で変更点を知る

-----

# conventional changelog

-----

# GitHub Release

-----

# Change Log

-----

# Pull Request駆動