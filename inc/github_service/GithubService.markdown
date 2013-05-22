# Githubでコードを公開する時に便利なサービス - いまならBadge付き -


----

# [Travis CI][] ![Build Status](https://travis-ci.org/azu/Browser_CI_as_a_Service.png?branch=master)


----

## [Travis CI][] / 特徴

* ``.travis.yml`` でビルドの設定を記述
* 一番良く使われているCIサービス
	* 設定サンプルを見つけやすい - [Search · extension:yml path:.travis.yml](https://github.com/search?q=extension%3Ayml+path%3A.travis.yml&amp;type=Code&amp;ref=searchresults "Search · extension:yml path:.travis.yml")
	* Travis CIと連携したサービスなどもある
* [Mac](http://about.travis-ci.org/blog/introducing-mac-ios-rubymotion-testing/ "Mac, iOS") 環境を使ったCIを動かせる
	* iOSのテストなどを実行できるようになってる(language : Objective-C)
* [CLI](https://github.com/travis-ci/travis "CLI and Ruby library)")がある
	* CLIからひと通りコマンドを叩いて操作できる

---- 

## [Travis CI][] / 特徴2

* ``sudo`` / ``apt-get`` 等使える
	* Chromeをインストールして動かす[例](http://efcl.info/2013/0321/res3234/ "CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch")

see also

* [CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch]
* [Travis CI 入門：GitHub + Travis CI で継続的インテグレーション « をぶろぐ](http://tetsuwo.tumblr.com/post/44706350593/github-travis-continuous-integration "Travis CI 入門：GitHub + Travis CI で継続的インテグレーション « をぶろぐ")
* [Travis needs your help](https://love.travis-ci.org/ "Travis needs your help")

----

# [drone.io][] [![drone.io Build Status](https://drone.io/github.com/azu/Browser_CI_as_a_Service/status.png)](https://drone.io/github.com/azu/Browser_CI_as_a_Service/latest)

----

## [drone.io][] / 特徴

* GoLang製
* github, bitbucket, Google Code対応
* CIだけではなくデプロイまでできる
* PublicならFreeで利用できる

<img src="http://efcl.info/wp-content/uploads/2013/03/repogitoriesAdmin-azu-2013-03-20-18-43-45.jpg" height="300px" />

---

## [drone.io][] / 特徴2

* ウェブサイト上でテストを動かすコマンドを書ける
* プロジェクトにCIサービス専用の設定ファイルは必要なし
* Travis CIと同じく、毎回環境はリセットされる
* CIを回した結果できたものをダウンロードできるようにする [Artifacts](http://docs.drone.io/artifacts.html "Artifacts") 機能
	* ビルドしたものをダウンロードする用途に使えそう
* ``sudo`` / ``apt-get`` 等使える

see also..

* [drone.ioで継続的インテグレーション — そこはかとなく書くよん。](http://tdoc.info/blog/2013/04/02/droneio.html "drone.ioで継続的インテグレーション — そこはかとなく書くよん。")
* [CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch]

----

# [BuildHive][] [![BuildHive Build Status](https://buildhive.cloudbees.com/job/azu/job/Browser_CI_as_a_Service/badge/icon)](https://buildhive.cloudbees.com/job/azu/job/Browser_CI_as_a_Service/)

----

## [BuildHive][] / 特徴

* Jenkinsを使ったCIサービス
* ビルド環境は継続する(Travis CI等と違ってリセットはされない)
* CIサービス自体にpushできる
	* [BuildHiveに直接プッシュできるようになりました - 川口耕介の日記](http://d.hatena.ne.jp/kkawa/20120604/p1 "BuildHiveに直接プッシュできるようになりました - 川口耕介の日記")
* ビルドのレスポンスが早い


see also..

* [CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch]

----

# [Coveralls][] ![Coverage Status](https://coveralls.io/repos/sferik/twitter/badge.png?branch=master)


----

## [Coveralls] / 特徴

* [Travis CI][] 等と連携できるコードカバレッジサービス
	* Travis CI以外でも連携出来る
	* [Supported Continuous Integration Servers](https://coveralls.io/docs/supported_continuous_integration "Supported Continuous Integration Servers")
* コードカバレッジ率をbadgeにして貼れる

see also

* [PHPでもCoverallsできるよ！ - satooshi@blog](http://blog.satooshi.jp/blog/2013/04/20/phper-now-can-use-coveralls/ "PHPでもCoverallsできるよ！ - satooshi@blog")
* [Travis CIと連携してカバレッジを測定するCoverallsがCandyCaneに炸裂した件 : candycane development blog](http://blog.candycane.jp/archives/1910 "Travis CIと連携してカバレッジを測定するCoverallsがCandyCaneに炸裂した件 : candycane development blog")
* [Documentation | Getting Started | Coveralls - Code Coverage History and Statistics](https://coveralls.io/docs "Documentation | Getting Started | Coveralls - Code Coverage History and Statistics")


----

# [Code Climate](https://codeclimate.com/ "Code Climate. Hosted static analysis for Ruby source code.") ![Code Climate](https://codeclimate.com/github/sferik/twitter.png)

----

# コードメトリクス

# [Code Climate](https://codeclimate.com/ "Code Climate. Hosted static analysis for Ruby source code.") 

* Rubyのコードメトリクスを出してくれる

### see also

* [プロトタイプ開発用のRailsプラグイン「Chanko」を2.0.0にアップデートしました | クックパッド開発者ブログ](http://techlife.cookpad.com/2013/04/10/chanko200/ "プロトタイプ開発用のRailsプラグイン「Chanko」を2.0.0にアップデートしました | クックパッド開発者ブログ")

----

# 依存モジュールのアップデート通知badgeサービス

### [Gemnasium][] ![Dependency Status](https://gemnasium.com/sferik/twitter.png?travis)

* 依存してるgemとnpmのアップデート通知badgeを貼れる

### [David][] ![David status](https://david-dm.org/bower/bower/dev-status.png)

* 依存してるnpmのアップデート通知badgeを貼れる

----

# アクセス解析

## [Bitdeli] ![image](https://bitdeli.com/assets/img/bitdeli_github_badge.png)

* Githubのreadmeにアクセス解析を入れるサービス
* Pull Requestで導入できるようになってる
* データは[card](https://bitdeli.com/docs/overview.html "card")単位になって[Card Editor](https://bitdeli.com/docs/editor.html#editor "Card Editor")で[Card Script](https://bitdeli.com/docs/overview.html "Card Script")を書くことで遊べる

----

# Ref.

* [最近GitHubのREADMEに貼ってある、バッジみたいなのいろいろ - tobioka.net](http://tobioka.net/791 "最近GitHubのREADMEに貼ってある、バッジみたいなのいろいろ - tobioka.net")
* [github.com の readme.md に貼ると格好いいbadge - HsbtDiary(2013-03-18)](http://www.hsbt.org/diary/20130318.html#p01 "github.com の readme.md に貼ると格好いいbadge - HsbtDiary(2013-03-18)")
* [CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch]
* [プロトタイプ開発用のRailsプラグイン「Chanko」を2.0.0にアップデートしました | クックパッド開発者ブログ](http://techlife.cookpad.com/2013/04/10/chanko200/ "プロトタイプ開発用のRailsプラグイン「Chanko」を2.0.0にアップデートしました | クックパッド開発者ブログ")

[Bitdeli]: https://bitdeli.com/free  "Custom Analytics Made Easy"
[CI as a Service – ブラウザを使ったJavaScriptのテストをCIサービスで動かす方法のまとめ | Web scratch]: http://efcl.info/2013/0321/res3234/  "CI as a Service Travis"
[Travis CI]: https://travis-ci.org/  "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community"
[drone.io]: https://drone.io/  "Hosted Continuous Integration and Deployment for your Github, Bitbucket and Google Code projects. Supports 12+ languages including Node, Scala, Dart, and Golang."
[BuildHive]: https://buildhive.cloudbees.com/  "BuildHive: Cloud Continuous Integration"
[Jepso CI]: https://jepso-ci.com/  "JEPSO CI"
[testling-ci]: https://ci.testling.com/  "testling-ci"
[Coveralls]: https://coveralls.io/  "Your Repositories | Coveralls - Code Coverage History and Statistics"
[Gemnasium]: https://gemnasium.com/  "Gemnasium keeps you up to date on the gems that matter to you. We parse your Ruby projects’ gem dependencies and notify you when new versions are released."
[David]: https://david-dm.org/  "Identifies your out of date project dependencies and shows the latest version you need to upgrade to"