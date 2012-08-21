# Git

---

## Gitの初め

* [サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ](http://www.backlog.jp/git-guide/ "サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ")
	* ビジュアル的にも丁寧でよくまとまっている
* [デザイナのための Git](https://github.com/hatena/Git-for-Designers "デザイナのための Git")
	* コマンドの要点がまとまったガイド
* [gitの基礎 (全22回) - ドットインストール](http://dotinstall.com/lessons/basic_git "gitの基礎 (全22回) - ドットインストール")
	* ドットインストールのスクリーンキャスト
* [Git - Book](http://git-scm.com/book "Git - Book") - いわゆる Pro Git
	* [Git - Book](http://git-scm.com/book/ja "Git - Book") - 日本語訳もある
	* [Pro Gitの日本語版PDF](http://subtech.g.hatena.ne.jp/h2u/20090925/1253881931 "Pro Gitの日本語版PDF")等
* [Gitのセットアップ - homebrewをフォークするためのGit&amp;GitHub入門 前編 - A Way of Code](http://toggtc.hatenablog.com/entry/2012/02/25/232434 "Gitのセットアップ - homebrewをフォークするためのGit&amp;GitHub入門 前編 - A Way of Code")
	* GitとGithubのセットアップ
* [ブランチもマージも簡単な分散型バージョン管理システム はじめてのGit](http://gihyo.jp/magazine/wdpress/archive/2009/vol50 "ブランチもマージも簡単な分散型バージョン管理システム はじめてのGit") - WEB+DB PRESS Vol.50
	* [WEB+DB PRESS 総集編](http://www.amazon.co.jp/dp/4774148318/ "WEB+DB PRESS 総集編") に含まれてる

---

## コミットメッセージ


	変更の短いサマリ
	
	2行目は空改行にして、3行目か詳細について書く
	この書き方は世界共通
	詳細部分はサマリだけで十分なら必要はない


* [見えないチカラ: 【翻訳】Gitのコミットメッセージに関する注意点](http://keijinsonyaban.blogspot.jp/2011/01/git.html "見えないチカラ: 【翻訳】Gitのコミットメッセージに関する注意点")
* [コミットメッセージの書き方 - ククログ(2012-02-21)](http://www.clear-code.com/blog/2012/2/21.html "コミットメッセージの書き方 - ククログ(2012-02-21)")
* [クリアなコードの作り方: 意図が伝わるコミットのしかた - ククログ(2012-03-13)](http://www.clear-code.com/blog/2012/3/13.html "クリアなコードの作り方: 意図が伝わるコミットのしかた - ククログ(2012-03-13)")
* [分かりやすいコミットログを書くこと - by shigemk2](http://d.hatena.ne.jp/shigemk2/20120611/1339394073 "分かりやすいコミットログを書くこと - by shigemk2")
* [コミットメッセージの作法 #Subversion #git - Qiita](http://qiita.com/items/b3619ddaa176fef519cb "コミットメッセージの作法 #Subversion #git - Qiita")
	* 命令形は宗派的なものだと思います
* 作法に囚われてコミットしないのが一番よくない
	

---


## 小さくコミット

c.f. **コミットメッセージのサマリで変更内容が説明できる粒度**

### メリット

* 何を変更/追加したのが客観的に分かりやすい
* 歴史改変の手助けになる
	* 間違った変更を戻す
		* [gitでアレを元に戻す108の方法 - TIM Labs](http://labs.timedia.co.jp/2011/08/git-undo-999.html "gitでアレを元に戻す108の方法 - TIM Labs")
		* [Gitの使い方あれこれ](http://www.slideshare.net/yalab/git-9518230 "Gitの使い方あれこれ")
	* どこでバグが入り込んだのか調べる
		* [git bisect で問題箇所を特定する #AdventCalendar #git - Qiita](http://qiita.com/items/cce867b3b139ea5568a6 "git bisect で問題箇所を特定する #AdventCalendar #git - Qiita")
* コミットを意識するようになる(コミットし忘れ防止)

---

## 小さくコミット - ミス修正

### コミットし忘れる/間違える

やろうと思えば修正できる、やり過ぎは体に毒

* [gitでありがちな問題の解決方法まとめ #git - Qiita](http://qiita.com/items/0d5364eae36ad1bb8e01 "gitでありがちな問題の解決方法まとめ #git - Qiita")
* [【派閥別】Gitのコミットを間違えたときの対処法まとめ - 本当は怖い情報科学](http://d.hatena.ne.jp/keisukefukuda/20111105/p1 "【派閥別】Gitのコミットを間違えたときの対処法まとめ - 本当は怖い情報科学")
* [Git初心者が絶対に覚えておくべきコマンド - idesaku blog](http://d.hatena.ne.jp/idesaku/20091106/1257507849 "Git初心者が絶対に覚えておくべきコマンド - idesaku blog")

コマンドで分かりにくい時は[SourceTree][]を使ってGUIで操作するのも手

* ググれば現実的に不可能な事以外はやり方が出てくる

---

## Gitの仕組み

* [見えないチカラ: 【翻訳】Gitをボトムアップから理解する](http://keijinsonyaban.blogspot.jp/2011/05/git.html "見えないチカラ: 【翻訳】Gitをボトムアップから理解する")
* [モデルから知るGit](http://www.slideshare.net/hiratara/git-7205454 "モデルから知るGit")
	* Gitの各コマンドの動きやref/remoteの動き等が図示されていて分かりやすい
* [Git Cheatsheet](http://ndpsoftware.com/git-cheatsheet.html#loc=index; "Git Cheatsheet")
	* Gitのステージの流れで見られるチートシート
* [Gitの仕組み - homebrewをフォークするためのGit&amp;GitHub入門 中編 - A Way of Code](http://toggtc.hatenablog.com/entry/2012/03/05/023137 "Gitの仕組み - homebrewをフォークするためのGit&amp;GitHub入門 中編 - A Way of Code")
	* コミットオブジェクトとか

## Git リファレンス

* [逆引きGit | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ](http://www.backlog.jp/git-guide/reference/ "逆引きGit | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ")
* [transitive.info - Git 使い方 見出し一覧](http://transitive.info/article/git/ "transitive.info - Git 使い方 見出し一覧")
* [Gitによるバージョン管理 | オーム社eStore(β)](http://estore.ohmsha.co.jp/titles/978427406864P "Gitによるバージョン管理 | オーム社eStore(β)")
* bash/zshのgit補完

[SourceTree]: http://www.sourcetreeapp.com/ "SourceTree"