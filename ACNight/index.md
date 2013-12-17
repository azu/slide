title: AppCode speeedy - OCNight
author:
  name: azu
  twitter: azu_re
  url: http://efcl.info/
output: acnight.html

--

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

--

## 開いてるファイルをプロジェクトツリーに表示

* Xcode
	* Navigation -> Reveal in Project Navigator
* AppCodeにはこの機能がない
	* UIにはあるけど、ショートカットは設定できない
	* マクロで似たような事ができる

--

## 開いてるファイルをプロジェクトツリーに表示

* このボタンをおした時の動作をショートカットからしたい

![この機能](https://www.monosnap.com/image/4SU0WqXzZOaX1XYU1NWtoO4xo.png)

--

## Reveal in Project Navigator

* Select In... -> 1(キー) のマクロを設定する

![select in file](https://www.monosnap.com/image/mi8WLvUBJBTU5h56evMm2iALT.png)

--

![動作風景](http://gyazo.com/16c1559d76d1d89aa6e04472feca33cd.gif)

--

## テストと実装の切り替え

* Navigate -> Test
* テストファイルと実装ファイルを切り替え出来る

![Test](https://www.monosnap.com/image/8qSoGqhMYJ4rebJOykYOCMad7.png)

--

![動作風景](http://gyazo.com/bd919dc7b12d3906c3fd09da04164f33.gif)

--

## テストと実装の切り替え on Xcode

* プラグインで同じような機能を持つものがある
* [thoughtbot/spectacular](https://github.com/thoughtbot/spectacular "thoughtbot/spectacular")

--

## Quick Lists

* 好きな機能をメニューにまとめる機能
* FindやUsage系をまとめておくと便利

![Quick List](https://www.monosnap.com/image/SjJX2kGIQJ1KqmbvEslpxqQaI.png)

--

![SS](https://www.monosnap.com/image/d6c6dh6GxQOuX6z8zrLbvlHen.png)

--

## AppCodeからXcodeを開く

* AppCodeとXcodeは併用する
* `Open Project in Xcode` で開ける

![xcode](https://www.monosnap.com/image/fQr76qbm9udg4qfj4hi3uvD0T.png)

--

1. AppCodeでコードを作業
2. GUIエディタが必要な所はXcodeを立ち上げる
3. GUI作業が終わったXcodeをkillする
4. 繰り返し

--