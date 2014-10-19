# JSer.info 200 回目記念イベント

----

# 改めてJSer.infoって何?

- 世界のJavaScriptについて週一で書くブログ
- 2011年1月16日 開始　

![right,fit](img/2014-10-01_19-35-39.jpg)


----

# 始めた目的

- Webの流れが早くなってる、情報量が膨大
- 海外には[JavaScript Weekly](http://javascriptweekly.com/ "JavaScript Weekly: A Free, Weekly Email Newsletter")や[DailyJS](http://dailyjs.com/ "DailyJS: A JavaScript Blog")があった
- 日本にも週間でJS情報をまとめてくれるサイトが欲しい
- => ないので作る

----

# これまでのJSer.info

### 紹介してきた記事数

- それぞれの記事の数

### 紹介してきたURL数

- 記事の数 + 関連リンク

----

# 記事数とURL数

![inline](img/2014-10-02_08-23-54.jpg)

----

# 2011年から2014年(10月)まで

![inline](img/total_url.png)

----

# 記事数とURL数の遷移

![fit](img/total_url_graph.png)

---

![](img/total_url_graph.png)

---

# 記事数とURL数の遷移

![right,fit](img/記事数とURL数.png)

- [2013年12月31日](http://jser.info/post/71734160602/2013-12-31-js-jshint-2-4-0-koa-selenium-builder/ "2013-12-31")から記事毎に関連URLを追加しだした
- 関連URLを入れてから記事数自体は少し減ってる
- 代わりに関連するURLの記載が増えてる
- 一つの記事についての情報量を増やす目的

----

# 栄枯衰退

- マイナーチェンジはありつつ JSer.info は続いています
- 2011年01月16日から3年半以上 = 1,385日!
	- 1週も欠けることなく毎週投稿中
- 続けるためには更新コストの最小化について常に考える

----

# 継続性

> 更新コストを小さくして、継続できる形を作る
> 開始するときにまず2年間は続けると決めた
-- [JSer.info 1年を迎えて](http://azu.github.io/slide/offline_study/jser_info.html#slide5 "JSer.info 1年を迎えて")

----

# 継続性

- (前提) 元から情報を集めるのは趣味
- これに 加える形で JSer.info を更新している
- どれだけ加えるコスト = 更新コスト を小さくするか
- 更新コストが小さいほど、継続しやすい
	- コストをコストと感じないように小さくする

----

# 更新ワークフロー

1. 記事を読む
2. Tombfixでメモ付きでブックマーク
3. 一週間ぐらい1,2を繰り返しで**紹介記事のデータ**を貯める
4. 貯めたアーカイブを整形
5. 整形した記事をコピペ(微修正、ピックアップを選ぶ)
6. 1へ戻る

----

# 更新ワークフロー

[2年前](http://azu.github.io/slide/offline_study/jser_info.html#slide8)と何も変わってない

- 普通にサイトをブックマークするのと同じ
- 紹介記事をちょっとづつ貯める = 心理的なコストが低い

	1. 記事を読む
	2. Tombfixでローカルブクマ
	3. 一週間ぐらい1,2を繰り返しで**紹介記事のデータ**を貯める

----

# 紹介記事データ

- ブクマしたデータはJSONに変換してGitHubにpushされる
- [jser/jser.info](https://github.com/jser/jser.info/ "jser/jser.info")にpushされたデータをTravis CIでLintする
- 副作用 = GitHubが芝ができやすい

![inline,fill](http://monosnap.com/image/QG2PjZPQ6Fuh5uDr59TWP1d3EltWlD.png)

----

# 記事の更新

- 貯めた記事をコピペするだけの簡単なお仕事です。

	4. 貯めたアーカイブを整形
	5. 整形した記事をコピペ(微修正、ピックアップを選ぶ)
	6. 1へ戻る

----

# 記事の更新

- 紹介記事データは[JSer.infoビューア](http://jser.info/jser.info/ "JSer.infoのアーカイブ")
- [JSer.infoビューア](http://jser.info/jser.info/ "JSer.infoのアーカイブ")で紹介したい記事を選ぶ
- Markdownを作ってくれるので、コピペ!
- ピックアップの紹介を書いたらPublish!
- 実質的な更新コスト = ピックアップ紹介を書く

----

# 更新フローの穴

----

# 更新フローの穴

- 更新までにまともなチェック機構が入ってない!
- 誤字脱字が多い!
	- 更新後に毎回 `fix typos` というPull Requestをマージ!
	- Thanks for @[syoichi](https://github.com/jser/jser.github.io/commits?author=syoichi "Commits · jser/jser.github.io")

----

# 今後改善していきたい

- Travis CIのチェックに構文だけじゃなくて日本語をチェックさせたい
- 事前編集をもっと楽にして、typosを減らしたい

----

# [Meta Weekly](http://azu.github.io/Meta-Weekly/ "Meta Weekly")

- 週間等で更新してるブログをまとめたサイト
- ここに載ってるサイトは等更新がとまったサイトがある
- 一時流行ったけど継続してるサイトとしてないサイトがある

----

# 環境の変化

- Tumblr -> GitHubへと移行した
- [JSer.infoをTumblrからGitHub Pagesに移行しました - JSer.info](http://jser.info/2014/08/03/renewal/ "JSer.infoをTumblrからGitHub Pagesに移行しました - JSer.info")
- GitHubに移行したので記事に対してPull Requestを行いやすくなった

----

# とりあえず続く
