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

# Issue/PRを探す

- compare tag -> git commmit
- GitHub search

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