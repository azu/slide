# Devlop iOS Library

----

## iOSのライブラリを作った話

[NSDate-Escort] という ``NSDate`` のカテゴリライブラリを作った話

-----

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info], [MemeTodo], [prog*sig]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"
[MemeTodo]: http://meme.efcl.info/ "MemeTodo"
[prog*sig]: http://efcl.info/adiary/ "prog*sig"

----
## 目次

1. [NSDate-Escort]
2. テスト
3. カバレッジ
4. モチベーション
5. ライセンス
6. CocoaPodsでの公開方法

----

# [NSDate-Escort]

* NSDateのカテゴリライブラリ
* 面倒なところをやってくれるAPIを持ったもの
	* 直で書くにはNSDateComponentを経由するようなもの
* [NSDate-Extensions] というライブラリと互換性のあるAPIを持つ

----

## [NSDate-Escort] の例

	!objc
	#import <NSDate+Escort.h>
	    
	// today から 7日後 のNSDateを取得する
	NSDate *today = [NSDate date];
	NSDate *nextWeekDate = [today dateByAddingDays:7];

	// 2つの NSDateを比較した真偽値を取得する
	NSDate *yesterday = [NSDate dateYesterday];
	BOOL isEarlier = [yesterday isEarlierThanDate:today];// => YES	

----

## [NSDate-Escort] まとめ

* [NSDate-Extensions] と互換性のあるAPIを持ってる
* 中身はスクラッチで実装
* いくつか追加したメソッドを持ってる
* 全てのメソッドを通るテストが書かれてる
	* => コードカバレッジ 100%

----

## もっとくわしく

* [NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch](http://efcl.info/2013/0801/res3366/ "NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch")

----

# ライブラリのテスト

* [UIならともかく](https://www.cocoacontrols.com/) ロジックを提供するライブラリでないのは辛い
* [NSDate-Extensions] にはテストがひとつもない…
* テストを書きましょう

----

# [NSDate-Escort] でのテスト

* テストフレームワークに [Kiwi] を使用
* 慣れてるから選択
* テストの中身というよりも、何をテストしたいかを書きたかった
* テストは境界値を意識して書いた

----

# QuickCheck

* テストしたい値は色々ある
	* 日にち、週、月、年 をまたいだ時...
	* 0を渡した時、マイナスの値を渡した時...
	* 全部考えるのは大変
* 一定の規則に合った適当な値でテストをして網羅性を高めたい
* QuickCheckの出番

----

## [NLTQuickCheck](https://github.com/yaakaito/NLTQuickCheck "yaakaito/NLTQuickCheck")

<blockquote cite="http://yaakaito.hatenablog.com/entry/2012/06/17/000510"
 title="ランダムテストライブラリ、NLTQuickCheck作った - yaakaito's diary">
<p>QuickCheckは、一定の規則に従った値をランダムに生成して、それを使って複数回(だいたい100回くらいっぽいです)のテストケースを実行する、という仕組みです。 ユースケースとしては何らかの不変なロジックに対して、自分で生成する分では補いきれないケースをランダムで生成し、テストしてくれる、</p>
<cite>
 <a href="http://yaakaito.hatenablog.com/entry/2012/06/17/000510">ランダムテストライブラリ、NLTQuickCheck作った - yaakaito's diary</a>
</cite>
</blockquote>

QuickCheckライブラリは [NLTQuickCheck](https://github.com/yaakaito/NLTQuickCheck "yaakaito/NLTQuickCheck") を使った

----

## QuickCheckするメソッド

* QuickCheckで補うようにテストする
* そのメソッドの性質は決まってる

例)

	引数に-1 を渡したら -1 される
	引数に 0 を渡したら +0 される
	引数に 1 を渡したら +1 される	
	…
	=> メソッドのロジックは不変、これを網羅するパターンを毎回書くのは大変

* [BDD on Haskell チュートリアル その2 : QuickCheck でランダムテスト](http://voqn.blogspot.jp/2012/01/bdd-on-haskell-2-quickcheck.html "BDD on Haskell チュートリアル その2 : QuickCheck でランダムテスト")
* QuickCheckでありがちな値をランダムで渡してチェックする
	* 0、大きい値、マイナスの値…	
* 重要な境界値やQuickCheckしにくいロジックについては、手動でテストケースを書いてテストする


----

## なぜテストがあるといいの?

* メンテナンスされてる感じがでる
* サンプルコードの代わりにもなる
	* ドキュメントは別にあったほうがベスト
* [Travis CI](https://travis-ci.org/ "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community")のバッチが貼れる! [![Build Status](https://travis-ci.org/azu/NSDate-Escort.png?branch=master)](https://travis-ci.org/azu/NSDate-Escort)
	* Pull Request受け入れるときに役に立つ

----

## [Travis CI](https://travis-ci.org/ "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community")

* [Objective-C Project](http://about.travis-ci.org/docs/user/languages/objective-c/ "Objective-C Project") も無料でテストを動かせる
* Pull Requestされた時に壊れてないかチェックできる
* 自分以外の環境で実行しておく価値(ビルドテスト)
	* Githubにコードを上げたつもりでも環境依存が起きてる場合がある
	* 第三者(Travis CI)でビルドできる事で依存性がないかを確認できる

----

# コードカバレッジ

----

## コードカバレッジを取る理由

1. テストを書きたいね
2. -> どうせならコードカバレッジも取りたいね
3. -> [Coveralls][] というサービス使いたいね
4. => [Coveralls][] のバッチが貼れる!! [![Coverage Status](https://coveralls.io/repos/azu/NSDate-Escort/badge.png?branch=master)](https://coveralls.io/r/azu/NSDate-Escort?branch=master)

[Coveralls] を使いためにコードカバレッジを取る!!

----

## コードカバレッジを取る方法


* [iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch](http://efcl.info/2013/0613/res3301/ "iOSアプリのテストをTravis CIで走らせて、コードカバレッジをCoverallsで取る方法 | Web scratch")
* [iOSのライブラリだってTravis CIとかCoverallsとか使うべき - TOKOROM BLOG](http://www.tokoro.me/2013/07/09/objc-travis-coveralls/ "iOSのライブラリだってTravis CIとかCoverallsとか使うべき - TOKOROM BLOG")

----

## コードカバレッジを取る意味

* [NSDate-Extensions][] の再実装との孤独な戦い…
	* 何か指標が合ったほうがいい
* APIを実装する -> カバレッジ率が上昇する
	* 目に見える変化があることでモチベーションを保てる
* [NSDate-Escort][] の場合は 0%から100% にすることを目標にした

----

<blockquote cite="http://blog.ishkawa.org/blog/2013/07/08/code-coverage/"
 title="コードカバレッジを計測してみた感想">
<p>コードカバレッジを計測してみる前は”目安に過ぎないから計測してもしなくても大差ない”というような気がしていたのですが、 計測してその結果を活用して開発をしてみると”無意味な変更でパーセンテージが変化する場合があるから目安”なのかなと思いました。 で、結局目安と言いながらも明らかにカバーできていない箇所を発見できたりして開発にとても役立つ</p>
<cite>
 <a href="http://blog.ishkawa.org/blog/2013/07/08/code-coverage/">コードカバレッジを計測してみた感想</a>
</cite>
</blockquote>

----

## Coveralls

Botと戯れる

![image](http://f.cl.ly/items/3F1r0D0Q1m0b2i2S020l/Image%202013.08.01%2018%3A03%3A23.png)

----

# ライセンス

----

## LICENSEファイルを作る

* ライセンスは必ず書きましょう
	* readme か ``LICENSE`` ファイルを作る
* Githubではリポジトリ作成時にライセンスが選べるようになった
	* [Choosing an Open Source License](https://github.com/blog/1530-choosing-an-open-source-license "Choosing an Open Source License")
* コマンドラインから ``LICENSE`` ファイルを生成する
	* [blaix/license-generator](https://github.com/blaix/license-generator "blaix/license-generator") が便利!
* CocoaPodsで公開する場合もライセンスは必須

----

# CocoaPods

----

## What's Podspec?

* CococPods経由でインストールするために必要な設定ファイル
* ビルドのオプション、ビルドするファイル、ARCの有無、依存するライブラリ/フレームワーク、ライセンスなどを記述
* ``pod spec create`` でテンプレートを作成できる
* [Cocoapods: Creating a Pod Spec - theonlylars](http://theonlylars.com/blog/2013/01/20/cocoapods-creating-a-pod-spec/ "Cocoapods: Creating a Pod Spec - theonlylars")
* [Objective-C - CocoaPodsでPodの利用＆作成のメモ - Qiita [キータ]](http://qiita.com/makoto_kw/items/edf758a67bd4c2ba5b7a "Objective-C - CocoaPodsでPodの利用＆作成のメモ - Qiita [キータ]")
* [Objective-C - CocoaPods podspec作成の逆引きいろいろ - Qiita [キータ]](http://qiita.com/makoto_kw/items/447448d8fcabc4a9e8e0 "Objective-C - CocoaPods podspec作成の逆引きいろいろ - Qiita [キータ]")

----

## Podspecの作り方

* ``pod spec create <Name>``
* リポジトリにtagを付ける(CocoaPods/Specする場合は合ったほうがいい)
* 項目を穴埋めする
* ``pod spec lint`` でWarningがなくなるまで繰り返す

----

## CocoaPods/SpecにPull Request

* CocoaPodsで公開するには [CocoaPods/Specs](https://github.com/CocoaPods/Specs "CocoaPods/Specs") へPullRequestする
* [Contributing to the master repo](http://docs.cocoapods.org/guides/contributing_to_the_master_repo.html "Contributing to the master repo") に説明がある

----

### 実際の流れ

``pod spec lint`` でエラーがでないpodspecを作る

	$ cd ~/.cocoapods/master
	$ hub fork
	$ cp ~/HOGEHOGE.podspec ~/.cocoapods/master/HOGEHOGE/VERSION/
	$ git push && Pull Request

* ブランチ切って書いてあるけど、masterでやってる人が殆ど
* ``pod spec lint`` でエラーが出てる場合ははじかれる 

----

### Pull Requestしない場合

* [CocoaPods/Specs](https://github.com/CocoaPods/Specs "CocoaPods/Specs") に公開しないでもpodspecは公開できる
* ``:git => 'リポジトリURL'`` を指定すれば、リポジトリにあるpodspecからインストールできる


Podfile に以下のように書く

	pod 'NSDate-Escort', :git => 'https://github.com/azu/NSDate-Escort.git'



----


# おわり

[NSDate-Extensions]: https://github.com/erica/NSDate-Extensions "NSDate-Extensions"
[NSDate-Escort]: https://github.com/azu/NSDate-Escort  "azu/NSDate-Escort"
[Coveralls]: https://coveralls.io/  "Your Repositories | Coveralls - Code Coverage History and Statistics"
[Kiwi]: https://github.com/allending/Kiwi  "allending/Kiwi"