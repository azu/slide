# 便利なGit Tools

---

## gitconfig

見ておくと便利な設定

[push &amp; rebase &amp; merge](https://gist.github.com/teppeis/4117588#push--rebase--merge "push &amp; rebase &amp; merge") あたりは要設定

* [天下一gitconfig大会](https://gist.github.com/teppeis/4117588 "天下一gitconfig大会")
* [git merge が、必ずエディタをひらいてきてウザい件 - tokuhirom's blog.](http://blog.64p.org/entry/2013/03/13/144008 "git merge が、必ずエディタをひらいてきてウザい件 - tokuhirom's blog.")

[Git v1.7.10](https://raw.github.com/gitster/git/master/Documentation/RelNotes/1.7.10.txt "Git v1.7.10") 以降はconfigを分割してincludeできる

* [.gitconfigにinclude書くと捗る - かるぱねるらすたいる](http://karupanerura.hateblo.jp/entry/2012/07/19/190313 ".gitconfigにinclude書くと捗る - かるぱねるらすたいる")

---

## .gitignore

言語/ソフト別の ``.gitignore`` 

* [github/gitignore · GitHub](https://github.com/github/gitignore "github/gitignore · GitHub")

上記をコマンドラインからまとめて適応するツール

* [simonwhitaker/gitignore-boilerplates · GitHub](https://github.com/simonwhitaker/gitignore-boilerplates "simonwhitaker/gitignore-boilerplates · GitHub")
* [.gitignore のテンプレートを出力する git-ignore-template 作った](https://gist.github.com/mitukiii/4286831 ".gitignore のテンプレートを出力する git-ignore-template 作った")

---

## alias

* 自分はあんまり使わない
* zshの設定に直接書いてしまう
* logは[SourceTree]で見たり、コミット等は[IDE](http://www.jetbrains.com/objc/)から直接やる事多い

``git cancel`` は結構使うのでaliasに入れてる

* [git reset --hard HEAD を安全にした - 永遠に未完成](http://d.hatena.ne.jp/thinca/20120924/1348491052 "git reset --hard HEAD を安全にした - 永遠に未完成")

---

## SourceTree

[![Source Tree](http://www.sourcetreeapp.com/images/logoSourceTree.png)](http://www.sourcetreeapp.com/)

* Windows/Mac 対応のGit GUI
* **[SourceTree]**
* git flow も対応

---

## tig

![tig](http://take.ms/ITJTe3)

* Git CLI Browser
* [jonas/tig · GitHub](https://github.com/jonas/tig "jonas/tig · GitHub")
* [git を CUI 環境で操作する tig が必須ツールだった - まちゅダイアリー(2013-01-13)](http://www.machu.jp/diary/20130113.html#p01 "git を CUI 環境で操作する tig が必須ツールだった - まちゅダイアリー(2013-01-13)")

---

## git flow

* [nvie/gitflow](https://github.com/nvie/gitflow/ "nvie/gitflow")
	* gitのブランチモデルを補助するコマンドラインツール
* [git-flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/ "git-flow cheatsheet")

more …

* [Git+Redmine+チケット駆動開発のワークフロー](https://azu.github.io/slide/workflow/git-redmine-tidd.html#slide1 "Git+Redmine+チケット駆動開発のワークフロー")

---

## HubFlow

* [HubFlow: GitFlow For GitHub](http://datasift.github.io/gitflow/ "HubFlow: GitFlow For GitHub")
	* Github flowを補助するコマンドラインツール
* [GitHub Flow (Japanese translation)](https://gist.github.com/Gab-km/3705015 "GitHub Flow (Japanese translation)")	

---

## git now

* [iwata/git-now · GitHub](https://github.com/iwata/git-now "iwata/git-now · GitHub")
* [tmp コミットのための独自サブコマンド git-now - アジャイルSEを目指すブログ](http://d.hatena.ne.jp/sinsoku/20101208/1291770514 "tmp コミットのための独自サブコマンド git-now - アジャイルSEを目指すブログ")

とりあえずコミットして、後からrebaseでまとめるCLIツール

本当にとりあえずコミットだけでも便利

---

## git issue

* [yuroyoro/git-issue · GitHub](https://github.com/yuroyoro/git-issue "yuroyoro/git-issue · GitHub")
* [git-issue : CLIでRedmine/Github-issuesのticketをbrows/editできるgitサブコマンド - ( ꒪⌓꒪) ゆるよろ日記](http://yuroyoro.hatenablog.com/entry/20120301/1330580453 "git-issue : CLIでRedmine/Github-issuesのticketをbrows/editできるgitサブコマンド - ( ꒪⌓꒪) ゆるよろ日記")

Redmine/Github Issueをコマンドラインから扱うツール

他のCLIと合わせるとWebインターフェイスを使わないで済むので便利

* [git-flowとgit-issueを使ったTiDD環境について | Technology-Gym](http://tech-gym.com/2012/05/git/747.html "git-flowとgit-issueを使ったTiDD環境について | Technology-Gym")
* [percolとgit-issueを使って、redmineのチケットをブランチに切って作業するのが捗る設定 | Technology-Gym](http://tech-gym.com/2012/07/shell/825.html "percolとgit-issueを使って、redmineのチケットをブランチに切って作業するのが捗る設定 | Technology-Gym")

---

## git-browse-remote

* [Git リポジトリの Web サイト (GitHub とか) を簡単に開けるコマンドを作った - NaN days - subtech](http://subtech.g.hatena.ne.jp/motemen/20120917/1347889804 "Git リポジトリの Web サイト (GitHub とか) を簡単に開けるコマンドを作った - NaN days - subtech")

コマンドラインからレポジトリを開けるツール

* カスタマイズできるので開きたい方法で開ける
* エディタから選択してる行数を指定して開く等

---

## git subtree push

* 特定のディレクトリをrootにした別ブランチをpushする
* git subtreeは複雑になりやすいので使いドコロが難しい

Githubのgh-pagesを作るのに便利

	Project # master ブランチ
	└── dist # gh-pages ブランチ
	    ├── files...
	    ├── files...
	  	
* [Deployment · yeoman/yeoman Wiki](https://github.com/yeoman/yeoman/wiki/Deployment "Deployment · yeoman/yeoman Wiki")
* [submoduleとsubtree-mergingの使い分け #git - Qiita](http://qiita.com/items/d02e7d5ff8ed7c2c4b95 "submoduleとsubtree-mergingの使い分け #git - Qiita")

---

## git-new-workdir

* ワーキングディレクトリを複数作れる
* Aディレクトリはmaster、Bディレクトリはdevlopみたいなことができる

docsブランチをdocsディレクトリに作って、new-workdirで分ける例 : 
[git-refresh-workdir.sh](https://gist.github.com/azu/5308313 "git-refresh-workdir.sh") 


	!bash
	#!/bin/sh
	branch=$1
	prev_branch=$(git rev-parse --abbrev-ref HEAD)
	test -z $branch && echo "branch required." 1>&2 && exit 1
	# git-fresh-branch
	git symbolic-ref HEAD refs/heads/$branch
	rm .git/index
	git clean -fdx
	# create branch
	git commit -q --allow-empty -m 'Initialize ${branch}'
	git checkout ${prev_branch}
	git-new-workdir . ${branch} ${branch}
	echo "${branch}/" > .gitignore
	
* [Git で複数ブランチを同時に扱いたいなら git-new-workdir が便利 - てっく煮ブログ](http://tech.nitoyon.com/ja/blog/2013/03/29/git-new-workdir/ "Git で複数ブランチを同時に扱いたいなら git-new-workdir が便利 - てっく煮ブログ")

---

## git bisect

* [git bisect で問題箇所を特定する #git #AdventCalendar - Qiita](http://qiita.com/items/cce867b3b139ea5568a6 "git bisect で問題箇所を特定する #git #AdventCalendar - Qiita")

__LIVE CODING...__

* カンペ :  [“git-bisect.pdf”](http://monosnap.com/file/RHesTYrIjUW1mcJc1Fmutc3Zufb0nn "“git-bisect.pdf”")

---

## git bisect(2)

壊れたコミットが入ったことにすぐ気づくには…

* ファイル監視 + テスト
	* ファイルが変更されたらテストを走らせる
	* コンパイルに時間がかかる言語は向いてない
	* [Test'em](https://github.com/airportyh/testem "Test'em") /[karma-runner](https://github.com/karma-runner/karma "karma-runner/karma · GitHub")
* コミット時テスト
	* コミットするときにテストする(同期的)
	* git-hook
* 検証済みマージ
	* CIサーバにテストしたいコミットを投げる(結果は非同期)
	* [Jenkins+Gitによる検証済みマージ(30分版)](http://www.slideshare.net/kohsuke/jenkinsgit30 "Jenkins+Gitによる検証済みマージ(30分版)")

---

## git hook

Gitでコミットやpushなどをするときにスクリプトを動かす機能

* [Git - Git フック](http://git-scm.com/book/ja/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF "Git - Git フック")
* [Git hooks まとめ #git - Qiita](http://qiita.com/items/dfe1ec9d82c0ed5da7c6 "Git hooks まとめ #git - Qiita")

コミットするときやpushするときになど処理をするgit hookを簡単にインストールできるようにするツール(名前同じ)

* [Lightweight git hook management tool その名も git-hook を作りました - 鳩舎](http://rosylilly.hatenablog.com/entry/2012/07/30/082748 "Lightweight git hook management tool その名も git-hook を作りました - 鳩舎")
* [rosylilly/git-hook · GitHub](https://github.com/rosylilly/git-hook "rosylilly/git-hook · GitHub")

---

# おわり

[AppCode]: http://www.jetbrains.com/objc/  "JetBrains AppCode: Objective-C IDE done right"
[SourceTree]: http://www.sourcetreeapp.com/  "Free Mercurial and Git Client for Windows and Mac | Atlassian SourceTree"