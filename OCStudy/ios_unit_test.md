# iOS Unit Test

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


----

# ロジックテスト / アプリケーションテスト

## ロジックテスト

* iOSシミュレータSDKベースだが、iPhoneシミュレータでは実行しない
* テスト対象のコードは対応するターゲットのビルドフェーズの間に実行
* 実機では動かせない(そこまで挙動が違うケースがないのであまり困らないかもしれないけど)
* faaasssttttt!!

> 例 ) OCUnit(SenTestingKit)、 [Kiwi]

-----

## アプリケーションテスト

* iOSアプリとしてテストを実行する
* 実機でも動く(アプリに関連付けて実行されるので)

> 例 ) OCUnit、[GHUnit]

### sea also…

* [Xcodeユニットテストガイド (TP40002143 3.1) - UnitTesting.pdf](https://developer.apple.com/jp/devcenter/ios/library/documentation/UnitTesting.pdf "Xcodeユニットテストガイド (TP40002143 3.1) - UnitTesting.pdf")
* [iPhone開発ガイド - iPhone_Development.pdf](https://developer.apple.com/jp/devcenter/ios/library/documentation/iPhone_Development.pdf "iPhone開発ガイド - iPhone_Development.pdf")	Chapter : `アプリケーションの単体テスト` 
* [A-Liaison BLOG: Jenkins を iOS アプリ開発に導入してみた (GHUnit編)](http://akisute.com/2012/01/jenkins-ios-ghunit.html "A-Liaison BLOG: Jenkins を iOS アプリ開発に導入してみた (GHUnit編)")

----

# OCUnitでもアプリケーションテスト

* Xcodeのプロジェクト作成で ``Include Unit Test`` にチェック
* この時のTest Bundleには自動でアプリケーションテストの設定がされている

![Xcode : Create Project](http://take.ms/nmwRQ5)

----

# ロジックテスト to アプリケーションテスト

*　``Add Target`` から Test Bundleを追加した場合、ロジックテストになってる

<img src="http://take.ms/MJ3Dlu" height="400" />

----


# ロジックテスト to アプリケーションテスト

* Test Bundleの設定を幾つか加えるだけでできる

1. ``Bundle Loader`` の設定
2. ``Test Host`` の設定
3. SchemeのTests の設定

詳細 :

* [Xcode Application Unit Testセットアップ #iOS #test #Xcode - Qiita [キータ]](http://qiita.com/items/16f24d2f61a52b3acd62 "Xcode Application Unit Testセットアップ #iOS #test #Xcode - Qiita [キータ]")
* [アプリケーションユニットテストのセットアップ](https://developer.apple.com/jp/devcenter/ios/library/documentation/UnitTesting.pdf#page=15 "アプリケーションユニットテストのセットアップ")
* [Moving OCUnit tests between Logic and Application tests | iOS Unit Testing](http://iosunittesting.com/moving-ocunit-tests-between-logic-and-application-tests/ "Moving OCUnit tests between Logic and Application tests | iOS Unit Testing")

----

# 結局アプリケーションテストって?

* ``Bundle Loader`` が設定されている
* ビルド時のテストじゃなくてアプリ上でテストが動く
* 実機でも動作するテストが書ける
* このスライドでは ``アプリケーションテスト`` は Appleの用語の方を示す

## 一般的なイメージ

* [GHUnit] みたいなテストコンソールが見えるアプリ!!
* Viewをテスト方法

----


## テスト可能なコードの記述

[iPhone開発ガイド - iPhone_Development.pdf](https://developer.apple.com/jp/devcenter/ios/library/documentation/iPhone_Development.pdf "iPhone開発ガイド - iPhone_Development.pdf") より

* APIの要件を定義する
* コードを記述するときにテストケースを記述する
* 境界条件をチェックする
* ネガティブテストを使用する
* 網羅的なテストケースを記述する
* バグ修正をテストケースでカバーする
	* > バグを修正したら、修正結果を確認するテストケース を1つまたは複数記述します。

----

# テストライブラリ

* [iOS 向けTDD/BDDフレームワークやモックフレームワークの現状 - laiso - iPhoneアプリ開発グループ](http://iphone-dev.g.hatena.ne.jp/laiso/20120324/1332505862 "iOS 向けTDD/BDDフレームワークやモックフレームワークの現状 - laiso - iPhoneアプリ開発グループ")

追加: 

* [jacksonh/NSUnit · GitHub](https://github.com/jacksonh/NSUnit "jacksonh/NSUnit · GitHub")
* [rdavies/Specify · GitHub](https://github.com/rdavies/Specify "rdavies/Specify · GitHub")
* [robb/Stubbilino · GitHub](https://github.com/robb/Stubbilino "robb/Stubbilino · GitHub")
* [lukeredpath/LRMocky · GitHub](https://github.com/lukeredpath/LRMocky "lukeredpath/LRMocky · GitHub")
* [itsthejb/TestPilot · GitHub](https://github.com/itsthejb/TestPilot "itsthejb/TestPilot · GitHub")


----


# Kiwi

* [Kiwi] はBDDなテストライブラリ
* Mock/Stub/Async 等ひと通り揃ってる
* テストの導入として無難で比較的安定している(OCUnit以外において)
* AppCodeもKiwiをサポートしている

### see also

* [Test Driving iOS Development with Kiwi](https://itunes.apple.com/ca/book/test-driving-ios-development/id502345143?mt=11 "Test Driving iOS Development with Kiwi")
* [KiwiとSpectaの比較 - yaakaito.org](http://yaakaito.org/blog/2012/10/22/kiwi-vs-specta/ "KiwiとSpectaの比較 - yaakaito.org")
* [Introduction to Kiwi Testing - YouTube](http://www.youtube.com/watch?v=I2HSyf_yFYM "Introduction to Kiwi Testing - YouTube") Kiwiの構文解説
----

## CocoaPodsでの導入

* [CocoaPods](http://cocoapods.org/ "CocoaPods") はCocoaのライブラリ管理ツール
* Cocoaに則ったアプリなら利用しない理由はあんまりない
* (テスト)ライブラリの導入が手軽になる

.notes: [VendorKit](http://vendorkit.com/ "VendorKit") なんてなかった

### see also…

* [開発レシピ：Objective-Cのライブラリ管理ツール CocoaPods | iOS開発者@日本](http://www.iosjp.com/dev/archives/451 "開発レシピ：Objective-Cのライブラリ管理ツール CocoaPods | iOS開発者@日本")
* [CocoaPodsでPodの利用＆作成のメモ #Objective-C #CocoaPods - Qiita [キータ]](http://qiita.com/items/edf758a67bd4c2ba5b7a "CocoaPodsでPodの利用＆作成のメモ #Objective-C #CocoaPods - Qiita [キータ]")
* [Introduction to CocoaPods - Ray Wenderlich](http://www.raywenderlich.com/12139/introduction-to-cocoapods "Introduction to CocoaPods - Ray Wenderlich")

----

## CocoaPodsでKiwiを導入する例

``Tests`` target に ``Kiwi`` をインストールする

	!ruby
	platform :ios
	
	target :Tests, :exclusive => true do
		pod 'Kiwi'
	end

----

# テストの実行

## XCode

* Product -> Test
* Cmd + U 

----

## [AppCode]

* Test SchemeのRun

----

## AppCode の 利点

* 見やすい結果表示
* 単独のテストケースの実行
* FileWatcher
* テストファイルと実行ファイルの切り替えショートカット


### note

Xcodeも類似のテスト切り替えの機能を加えるPlugin

* [thoughtbot/spectacular · GitHub](https://github.com/thoughtbot/spectacular "thoughtbot/spectacular · GitHub")


----

# あるあるロジックテスト

----

## main bundleが使えない

テスト内で ``[[NSBundle mainBundle] pathForResource:@"fname" ofType:@"plist"];``や　``[UIImage imageNamed:@"default.png"];`` が ``null`` となってしまう

* ロジックテストは ``Bundle Loader``` 示す場所がアプリケーションテストと異なる

コードで置き換えるなら

	[NSBundle mainBundle];
	の代わりに
	[NSBundle bundleForClass:[self class]];
	を使う

### 別の解法

* Test Bundleをアプリケーションテストにする

----

## データベースのテスト

* setup/teardownでデータベースが初期化されるようにする

## CoreData

* [CoreDataをUnitTestとかしたい - yaakaito's diary](http://yaakaito.hatenablog.com/entry/20111208/1323341753 "CoreDataをUnitTestとかしたい - yaakaito's diary")
* [CoreDataのテストをシンプルに書こう #AdventCalendar #iOS - Qiita [キータ]](http://qiita.com/items/bee07ca72597256840d0 "CoreDataのテストをシンプルに書こう #AdventCalendar #iOS - Qiita [キータ]")

## MagicalRecord

* [Unit Testing with Core Data | Cocoa Is My GirlfriendCocoa Is My Girlfriend](http://www.cimgf.com/2012/05/15/unit-testing-with-core-data/ "Unit Testing with Core Data | Cocoa Is My GirlfriendCocoa Is My Girlfriend")

## FMDB

* [FMDBを使ったテストのセットアップ | Technology-Gym](http://tech-gym.com/2013/05/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/1230.html "FMDBを使ったテストのセットアップ | Technology-Gym")

----

# CI と CLI

-----

## Travis CI

* [Travis CI] はiOSのテストが実行できる
* ``language: objective-c`` を指定するとOS Xを利用できる
* ライブラリとか公開するならTravis CIでテストを回しておくと安心
	* 利用者的にも作成者的にも

### see also...

* [iOSのライブラリにTravis CIを導入する - blog.ishkawa.org](http://blog.ishkawa.org/blog/2013/04/14/travis-ci-ios/ "iOSのライブラリにTravis CIを導入する - blog.ishkawa.org")
* [Travis CI: Introducing Mac, iOS and RubyMotion Testing on Travis CI](http://about.travis-ci.org/blog/introducing-mac-ios-rubymotion-testing/ "Travis CI: Introducing Mac, iOS and RubyMotion Testing on Travis CI")

-----

## [xctool]

* [xctool] Facebookが最近だした ``xcodebuild`` の代わりになるCLIツール
* ``xcodebuild`` よりわかりやすいオプション
* アプリケーションテストのテストもちゃんと実行できる
* reporter がある(pretty,json,JUnit等)
* [Configuration (.xctool-args)](https://github.com/facebook/xctool#configuration-xctool-args "Configuration (.xctool-args)") という設定ファイル

.notes: まだ CocoaPods との相性が不完全

----

# どこからテスト始める問題

----

## これからテストを始める場合

* テスト書いてる人から学ぶと早い(ペアプロとか)
* とりあえず書かないと始まらない
* 楽しく書き始められる環境づくり大切j

# テストで学ぶObjective-C

* テストを習慣化するためにはとりあえずテストを書き始めることが大切
* テストを書きながらObjective-Cも学べれば一石二鳥

そんなプロジェクト

* [azu/objc-assessment · GitHub](https://github.com/azu/objc-assessment "azu/objc-assessment · GitHub")

----

# 何でテストを学ぶ?

TDDのスクリーンキャスト

* [Intro to Objective-C TDD [Screencast] - Quality Coding](http://qualitycoding.org/objective-c-tdd/ "Intro to Objective-C TDD [Screencast] - Quality Coding")

* [Unit testing on iOS - Stewart Gleadow - Melbourne Cocoaheads November 2011 on Vimeo](http://vimeo.com/34321087 "Unit testing on iOS - Stewart Gleadow - Melbourne Cocoaheads November 2011 on Vimeo")
* [iOS Unit Testing](http://www.slideshare.net/sgleadow/ios-unit-testing "iOS Unit Testing")

----

# DEMO

* [azu/AZDateBuilder · GitHub]

- NSArrayのカテゴリテスト
    - firstObject
    - lastObjectに合わせて見る
    - Categoryのoverwriteチェック
    - xctoolを使っての実行
      OBJC_PRINT_REPLACED_METHOD でのカテゴリ衝突

      http://blog.clickablebliss.com/2010/01/19/finding-colliding-cate
      gory-methods/

- アプリケーションテストで端末特有の動作を見る
    - NSDateFormatter
    - iOSの設定に依存する ``HH:mm`` 等の挙動
    - [guess what?: iOSの日付処理まとめ](http://aqubiblog.blogspot.jp/2012/11/ios.html "guess what?: iOSの日付処理まとめ")


----

# ref.

* [iOS 向けTDD/BDDフレームワークやモックフレームワークの現状 - laiso - iPhoneアプリ開発グループ](http://iphone-dev.g.hatena.ne.jp/laiso/20120324/1332505862 "iOS 向けTDD/BDDフレームワークやモックフレームワークの現状 - laiso - iPhoneアプリ開発グループ")
* [iOS Unit Testing | It's about TDD, unit testing, and creating bug free iOS code on iOS.](http://iosunittesting.com/ "iOS Unit Testing | It's about TDD, unit testing, and creating bug free iOS code on iOS.")
	* iOSのユニットテストについて扱ってるブログ
* [blazingcloud/sealant · GitHub](https://github.com/blazingcloud/sealant/tree/master/Testable "blazingcloud/sealant · GitHub")
	* iOSのテスト環境について
	* [Home · blazingcloud/sealant Wiki](https://github.com/blazingcloud/sealant/wiki "Home · blazingcloud/sealant Wiki")
* [Stewart Gleadow's Blog](http://www.stewgleadow.com/ "Stewart Gleadow's Blog")

---


[Kiwi]: https://github.com/allending/Kiwi  "allending/Kiwi · GitHub"
[GHUnit]: https://github.com/gabriel/gh-unit  "gabriel/gh-unit · GitHub"
[AppCode]: http://www.jetbrains.com/objc/  "JetBrains AppCode: Objective-C IDE done right"
[xctool]: https://github.com/facebook/xctool  "facebook/xctool · GitHub"

[Travis CI]: https://travis-ci.org/  "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community"

[azu/AZDateBuilder · GitHub]: https://github.com/azu/AZDateBuilder  "Contribute to AZDateBuilder development by creating an account on GitHub."
