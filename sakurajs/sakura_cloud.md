title: SAKURA(Internet Cloud).js
author:
  name: azu
  twitter: azu_re  
  url: http://efcl.info/
theme: azu/cleaver-ribbon
output: sakura_cloud.html
--

# 🌸SAKURA(Internet Cloud).js🌸

[さくらのクラウド](http://cloud.sakura.ad.jp/ "さくらのクラウド") の コマンドラインツールについて

![gfx](gfx.png)

--

## sacloud CLI


* さくらのクラウド のコマンドラインツールはNode.jsで書かれている
* オープンソース(MITライセンス)
* [sakura-internet/node-sacloud](https://github.com/sakura-internet/node-sacloud/ "sakura-internet/node-sacloud")
* [コマンドライン操作ツール「sacloud CLI」とNode.js用モジュールを公開しました | さくらのクラウドニュース](http://cloud-news.sakura.ad.jp/2013/05/01/sacloud-cli-release/ "コマンドライン操作ツール「sacloud CLI」とNode.js用モジュールを公開しました | さくらのクラウドニュース")

--

## HTTP通信

* HTTP通信のライブラリには[pwnall/node-xhr2](https://github.com/pwnall/node-xhr2 "pwnall/node-xhr2")を利用
* `XMLHttpRequest` をnode.jsでエミュレートするようなライブラリ
	* 類似ライブラリ : [ykzts/node-xmlhttprequest](https://github.com/ykzts/node-xmlhttprequest "ykzts/node-xmlhttprequest")
	* [W3Cに依る仕様に沿はせてNodeで動作するXMLHttpRequestを作成してみました - 人生が二度あれば](http://memo.overknee.info/post/25108537330 "W3Cに依る仕様に沿はせてNodeで動作するXMLHttpRequestを作成してみました - 人生が二度あれば")

--

## Table

![Screenshot](http://i.imgur.com/sYq4T.png)

* [kanreisa/cli-table](https://github.com/kanreisa/cli-table "kanreisa/cli-table") (forkしてマルチバイト文字対応?)
* CLIでよく見るテーブル表示を行うモジュールを利用

--

## Action

* `% sacloud show disk` のようなコマンド対応をどう実装してるか
* [command.requests.js](https://github.com/sakura-internet/node-sacloud/blob/master/lib/sacloud/command.requests.js "command.requests.js")
* ひたすら`switch`での分岐

``` javascript
switch (action) {
	case 'create':
		// ...
	case 'start':
	case 'shutdown':
		// …
}
```

--

## 他

* 先頭で`exports`するスタイル

``` javascript

/* expose */
var command = exports;

// main code…
```

* テストはなかった
* 意外とコードの量は少ない
* 殆どのコマンドはAPIを叩くだけ

--

## 最後に

* さくらのクラウド使ったことありません。
* これはただのコードを見た結果であることをご考慮下さい。


