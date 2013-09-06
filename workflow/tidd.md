# チケット駆動開発

---

## チケット駆動とは?

* Redmine/JIRA/Trac等のチケット管理するツールが必須
* 今回は**Redmine**をベースに進める
* コードを書く前にチケットを切る
	* Ticket First
	* チケットがないコミットはしない(例外はありそうだけど)
* チケットは閉じられる事が前提とする
* やることが全部チケット化されてるのが理想
* コードとチケットを関係付ける
	* コミットメッセージ Fixed #123 

---

## 注意点


* チケットは仕様ではない
	* 仕様は仕様でドキュメントにおとすべき
* チケットで全てを管理しようとしない
	* できるだけ、チケットを作って閉じるだけを意識できるようなものがいい
* チケットを放置する状況を作らない
	* 重すぎるチケットの分割
	* 期限切れのチケットの退避
	* [TiDD に scrum 混ぜると幸せになれるんじゃない？ - かおるんダイアリー](http://d.hatena.ne.jp/kaorun55/20091128/1259424680 "TiDD に scrum 混ぜると幸せになれるんじゃない？ - かおるんダイアリー")
	* [TiDD初心者によく聞かれる質問part1～チケットが放置されがちです #tidd: プログラマの思索](http://forza.cocolog-nifty.com/blog/2011/03/tiddpart1-tidd-.html "TiDD初心者によく聞かれる質問part1～チケットが放置されがちです #tidd: プログラマの思索")
	* [チケット駆動開発のアンチパターン: プログラマの思索](http://forza.cocolog-nifty.com/blog/2009/11/post-9cda.html "チケット駆動開発のアンチパターン: プログラマの思索")


---

## チケットの簡略化

* チケットステータスの簡易化
	* 新規
	* <del>進行中</del>
	* <del>解決</del>
	* <del>フィードバック</del>
	* 終了
	* 却下
* 進行中がずっと続くほどチケットは大きくしない(やるなら自動化)
* 解決したら直ぐチケットを閉じる
	* レビューをするなら、レビューのチケットを新規で作る
* 却下はあってもいいけど、あんまり使う機会無い気もする(管理する人向けなのかも)
* チケットの進行度は0%か100%でいい
	* "新規"/"終了"と被るので操作しなくてもいい

---

## メリット

* タスクが分割できる
* GTDに似てる
	* 最初にやりたいことを吐き出しておく
* 並行処理がしやすい
* 1日に処理できる量が見えてくる
* 他の人がチケットを見て作業内容を把握しやすい
* 意外とやってると楽しい
	* [[Software]辞めていった人達が作ったシステムの保守を楽しいものにする - ariyasacca(2012-03-18)](http://sangoukan.xrea.jp/cgi-bin/tDiary/?date=20120318#p01 "[Software]辞めていった人達が作ったシステムの保守を楽しいものにする - ariyasacca(2012-03-18)")
	* チケットを処理する**リズム**が生まれると開発がスムーズに進む

---

## チケットの粒度

* チケットを処理をするリズムを生む粒度にするのが大事
* チケットを見て、チケットの終了条件(ゴール)が分かる大きさ
	* チケットを見てゴールが複雑だと思ったらそのチケットは分割
	* 複数のゴールがあるなら、できるだけ一つのゴールにする
* チケットは細分化して、放置されるようなタスクのサイズにしない
	* 一日で終わらないようなチケットは作らない
* 大きなチケットがある場合は分割する
	* 大きなチケット(親チケット)の下に子チケットを作って分割する
	* 子チケットを全部処理すれば親チケットも終わる
	* 子、孫とネストが深くなりすぎるなら、親チケット自体を分割した方がいい
* 感覚的には数コミットの範囲で終わるチケットになる気がする
* [TiDD初心者によく聞かれる質問part2～チケットの粒度はどれくらいが妥当ですか？: プログラマの思索](http://forza.cocolog-nifty.com/blog/2011/04/tiddpart2-55ff.html "TiDD初心者によく聞かれる質問part2～チケットの粒度はどれくらいが妥当ですか？: プログラマの思索")

---

## チケット例

### typo

* 動作に影響がない程度の小さなものならそのままコミット
	* チケットは作らないでそのままdevlopブランチにコミット
* 必要なら、`git commit --amend` や `git rebase -i` などでコミットをまとめる
* バグにつながってるものなら、チケットを立てる

### bugfix

* バグについてはできるだけチケットを作っておく
* バグの再現手順などをチケットに書いておくといい
* バグの原因/解決はコミットメッセージにも書く

### 機能別

* 画面は結構大きな単位
	* その画面のゴールが見えてないなら"画面"単位のチケットは避ける
	* 客観的に終わりという線が敷きにくい

---

## チケット例-2

### コード

* プログラマ以外も利用するなら、コードに深く入りすぎたチケット名は避ける
* あまりプログラムによりすぎないチケットにした方がいい
	* 若干利用者視点
* プログラムについてはコミットメッセージ等に書く

### 他

* 他の人が見ても何を書いてあるのか分かるようにする
* ゴールが分かるような説明にする

---

## 参考

* [3年使ったRedmineの使い方について共有したい10のこと | 世界 - daipresents!!](http://daipresents.com/2011/redmine%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E8%A9%A6%E8%A1%8C%E9%8C%AF%E8%AA%A4%E3%81%97%E3%81%9F10%E3%81%AE%E3%81%93%E3%81%A8/ "3年使ったRedmineの使い方について共有したい10のこと | 世界 - daipresents!!")
	* redmineで運用するために役立つこと
* [離れた場所で働くチームのつくり方〜１年間のアイルランドでの実践で学んだこと - Social Change!](http://kuranuki.sonicgarden.jp/2012/08/post-81.html "離れた場所で働くチームのつくり方〜１年間のアイルランドでの実践で学んだこと - Social Change!")
	* リモート開発と開発スタイルについて
* [チケット駆動開発で Pivotal Tracker を上手に使うための4つのポイント - Social Change!](http://kuranuki.sonicgarden.jp/2012/06/pivotal-tracker.html "チケット駆動開発で Pivotal Tracker を上手に使うための4つのポイント - Social Change!")
	* TiDDの方向性や粒度、注意点等よくまとまってる