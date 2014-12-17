# #JavaScript忘年会

## 今年で忘れていいもの

-----

# ![logo inline](http://yuilibrary.com/img/yui-logo.png) [YUI Library](http://yuilibrary.com/ "YUI Library") :ghost:


------
# YUI

- [Important Announcement Regarding YUI | Yahoo Engineering](http://yahooeng.tumblr.com/post/96098168666/important-announcement-regarding-yui "Important Announcement Regarding YUI | Yahoo Engineering")
- YUIの開発は終了
- Yetiも開発終了? - [Future of YETI? · Issue #90 · yui/yeti](https://github.com/yui/yeti/issues/90 "Future of YETI? · Issue #90 · yui/yeti")
- [Pure.css](http://purecss.io/ "Pure")は継続 - [YUI is going away - what does this mean for Pure? · Issue #373 · yahoo/pure](https://github.com/yahoo/pure/issues/373 "YUI is going away - what does this mean for Pure? · Issue #373 · yahoo/pure")

-----

# iframeでクロスドメインハック :ghost:

# => postMessage :star:

-----

- `window.name`を使った方法
	- `<iframe src="http://example.com/" name="message">`
	- iframe内からは`window.name`で`"message"`を取れる
- XSSで使われる
	- [XSS例題（下書き中） - st4rdustの日記](http://d.hatena.ne.jp/st4rdust/20110329/1301386042 "XSS例題（下書き中） - st4rdustの日記")
	- [Masato Kinugawa Security Blog: Flashのlocal-with-filesystem Sandboxのバイパス](http://masatokinugawa.l0.cm/2014/12/flash-local-with-filesystem-sandbox-bypass.html "Masato Kinugawa Security Blog: Flashのlocal-with-filesystem Sandboxのバイパス")

----

- `location.hash`を使った方法
	- `http://example.com/#location.hash`
	- Detail : [Breaking The Cross Domain Barrier](http://www.slideshare.net/SlexAxton/breaking-the-cross-domain-barrier "Breaking The Cross Domain Barrier")

![img,inline](http://monosnap.com/image/LJqkrEH4uvI5G88csRelLsQn3QcpXT.png)


-----

# iframeでクロスドメインハック :ghost:

# => postMessageを使おう :+1:

- [第3回　localStorageとpostMessageの使いどころ（2）：フロントエンドWeb戦略室｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/front-end_web/000302 "第3回　localStorageとpostMessageの使いどころ（2）：フロントエンドWeb戦略室｜gihyo.jp … 技術評論社")
- [oyvindkinsey/easyXDM](https://github.com/oyvindkinsey/easyXDM "oyvindkinsey/easyXDM")


-----

# [JsTestDriver](https://code.google.com/p/js-test-driver/ "js-test-driver - Remote javascript console - Google Project Hosting") :ghost:

## Latest Release : Oct 5, 2012

# => testem/karma/Intern :star:

-----
## [airportyh/testem](https://github.com/airportyh/testem "airportyh/testem")

![testem,inline fill](img/testem.jpg)

-----

## [karma-runner/karma](https://github.com/karma-runner/karma "karma-runner/karma")

![karma, inline fill](img/karma.jpg)

-----

## [Intern: A next-generation JavaScript testing stack](http://theintern.io/ "Intern: A next-generation JavaScript testing stack")

![intern, inline fill](img/intern.jpg)

-----

# [Vows](http://vowsjs.org/ "Vows") :ghost:

## Node.js向けのBDDフレームワーク

# => Mocha :question:

-----

# [Vows](http://vowsjs.org/ "Vows") :ghost:

- [v1.0.0](https://github.com/vowsjs/vows/issues/318 "v1.0.0") に向けてコミット活発化

![vows inline](img/vows.jpg)


-----

# [Raphaël](http://raphaeljs.com/ "Raphaël") :ghost:

# => [Snap.svg](http://snapsvg.io/ "Snap.svg") :star:

-----

# [Raphaël](http://raphaeljs.com/ "Raphaël")

- [Raphaël](http://raphaeljs.com/ "Raphaël")はレガシーIE(IE8以下)に対応してる
- Raphaëlの新規開発はもう殆どない
- 同じ作者の[Snap.svg](http://snapsvg.io/ "Snap.svg")の方が開発が活発
- [Raphaël.jsとSnap.svgとの違い](http://www.h2.dion.ne.jp/~defghi/snapsvg/snapsvg.xhtml#section_26 "Raphaël.jsとSnap.svgとの違い")

----

# Raphaël.jsからSnap.svgに移行すべきか

> Raphaël.js前提のプロジェクトが既に構築済みの場合，無理にSnap.svgに移行する必要はありません
> ...
> なお開発の注力は既にSnap.svgに移っており，今後Raphaël.jsの機能向上はそれほど期待できません．特にこだわりが無い限り，Snap.svgをお勧めします．
> -- [Snap.svgの使い方まとめ](http://www.h2.dion.ne.jp/~defghi/snapsvg/snapsvg.xhtml#section_26 "Snap.svgの使い方まとめ")

----

# [json2.js](https://github.com/douglascrockford/JSON-js "json2.js") :ghost:

# => ネイティブ  `JSON` :star:

----

# [douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js "douglascrockford/JSON-js")

- IE8以降ならネイティブの`JSON.parse`が使える

-----

# WebSQL

## 仕様の策定が停止 

-----

# WebSQL

- Indexed Databaseを使う
- [モダンブラウザのストレージ容量と調査方法まとめ - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/offline/quota-research/ "モダンブラウザのストレージ容量と調査方法まとめ - HTML5 Rocks")

----

# [Component](https://github.com/componentjs/component "Component") :ghost:

# => [Duo](http://duojs.org/ "Duo") :star:

----

# [Component](https://github.com/componentjs/component "Component")

> The team and organization have undergone massive changes. In summary, jonathanong stopped developing Component and started with normalize.io and the guys from segmentio switched to using duo. Component will still be maintained and updated while it is in use. You can read more about Duo.js and Component here.


----

# [fit] `new ActiveXObject(’MSXML2.XMLHTTP.6.0’);` :ghost:

# => XMLHttpRequest :star:

----

# XMLHttpRequest

- IE7から利用できる
- [第12回　XMLHttpRequest入門：これでできる！ クロスブラウザJavaScript入門｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/crossbrowser-javascript/0012 "第12回　XMLHttpRequest入門：これでできる！ クロスブラウザJavaScript入門｜gihyo.jp … 技術評論社")

----

# attachEvent :ghost:

# => [addEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget.addEventListener "addEventListener") :star:

----

# [addEventListener](https://developer.mozilla.org/ja/docs/Web/API/EventTarget.addEventListener "addEventListener")

- IE9から使える
- [IE 6, IE 7, IE 8 が退場した未来 - latest log](http://uupaa.hatenablog.com/entry/2012/03/06/204911 "IE 6, IE 7, IE 8 が退場した未来 - latest log")

-----

# [jQuery Mobile](http://jquerymobile.com/ "jQuery Mobile") :ghost:

-----

# [Titanium](http://www.appcelerator.com/titanium/ "Titanium") :ghost:

-----

# まとめ

- IE8以下は忘れよう
	- [セールスフォース、2015年5月に「IE7」と「IE8」のサポートを打ち切りへ - ZDNet Japan](http://japan.zdnet.com/article/35057570/ "セールスフォース、2015年5月に「IE7」と「IE8」のサポートを打ち切りへ - ZDNet Japan")
	- [Dropping IE8 support in version 4 · Issue #14128 · twbs/bootstrap](https://github.com/twbs/bootstrap/issues/14128 "Dropping IE8 support in version 4 · Issue #14128 · twbs/bootstrap")
	- [IE 6, IE 7, IE 8 が退場した未来 - latest log](http://uupaa.hatenablog.com/entry/2012/03/06/204911 "IE 6, IE 7, IE 8 が退場した未来 - latest log")


-----

# まとめ

- 捨てる技術は捨てやすいように使おう
- polyfillを使える時は使おう
- テストフレームワークが死んだ時のことを考えよう
- ウェブ標準仕様化されてるならそれに反してないかをチェックしよう