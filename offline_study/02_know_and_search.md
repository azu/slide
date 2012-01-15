# 知る・know ・探す・Search

---

# JavaScriptで知りたいことを調べる方法

- JavaScriptの機能について
    - 目的の挙動をするメソッドの探し方、メソッドの使い方
- JavaScriptライブラリについて
    - jQuery APIの使い方、ライブラリ内部の動作を調べる
- JavaScriptの速度、ベンチマークについて
    - どの方法が早いのか、どうやるのが最適なのか

---

# 調べる前にググれ

まずは**何事もググる!!!**

**ググる**は調べるに入らないぐらい自然な習慣

- JavaScriptの多くはググるだけで先例が見つかる、使い方が書かれている
    - 読む、試す で多くの場合は解決できる
- JavaScriptの高速化、ベンチマークについてはそのまま鵜呑みにしてはいけない
    - 使い方などに比べて、自分で試さないで満足する場合が多い
    - 昔は正しかった、けど今は異なる という場合も多い
    - JavaScriptエンジンorブラウザの性能は日進月歩

---

### 間違いが広まる実例

- <a href="http://news.mynavi.jp/news/2009/11/11/015/index.html">JavaScriptを高速化する6つのテクニック | エンタープライズ | マイナビニュース</a>
     - 間違った翻訳がいつまで修正されない例
   - <a href="http://nex.xrea.jp/?s=190">javascriptの高速化テク:三浦仮想研究所</a>  
     - 高速という文字に釣られてる例
   - <a href="http://d.hatena.ne.jp/namusyaka/20101118/1290095217">JavaScriptにおけるオブジェクト生成の高速化の話 - namusyaka日記</a>
     - 間違いであることに気づいて自分で調べる例

> 自分で動かして比較するのが正しい

- <a href="http://d.hatena.ne.jp/uupaa/20081005/1223196093">JavaScript の高速化その2 「全てを疑い、自分の目で確認すること」 - latest log</a>
     - ベンチマークの原則

---

# JavaScriptの機能についての調べ方

---

### リファレンスサイトを利用して調べる

- [Mozilla Developer Network](https://developer.mozilla.org/ja/ "Mozilla Developer Network") とてもお世話になる
    - <a href="https://dev.mozilla.jp/localmdc/">localmdc</a>にダウンロード版も存在
    - [JSAPI - JavaScript Reference Manual](http://jsapi.64p.org/ "JSAPI - JavaScript Reference Manual") 最速検索
- [MSDN](http://msdn.microsoft.com/en-us/library/ms123401.aspx "MSDN")
     - 日本語版はなかったことにする
- [Dottoro](http://help.dottoro.com/ "Dottoro") 
     - 他ではあまり見ないマイナーものについても載っている

---

### ECMAScriptの仕様書を当たる

- [Annotated ES5](http://es5.github.com/ "Annotated ES5")
   - ES5仕様書の見やすいWebページ
- [Under Translation of ECMA-262 3rd Edition](http://www2u.biglobe.ne.jp/~oz-07ams/prog/ecma262r3/ "Under Translation of ECMA-262 3rd Edition")
   - ES3仕様書の日本語訳
- [ECMA-262第5版 日本語訳](http://dl.dropbox.com/u/9124140/tsoft/ecmascript.html "ECMA-262第5版 日本語訳")
   - まだ未完
- <a href="http://www.w3.org/TR/">All Standards and Drafts - W3C</a>
　　- DOM仕様など

---

### JSReferenceで串刺し検索

- [JSReference](https://github.com/azu/KeySnail-Plugins/tree/master/JSReference "JSReference") (<a href="https://github.com/mooz/keysnail/wiki/keysnail-japanese">keysnail </a>プラグイン)

<img src="http://efcl.info/wp-content/uploads/2011/06/image_thumb8.png" alt="JSReference" />

リファレンスサイトや仕様書などをインデックス検索

##### 対応サイト

- [developer.mozilla.org]
- [jp.developer.mozilla.org]
- [www2u.biglobe.ne.jp/~oz-07ams/prog/ecma262r3/]
- [api.jquery.com]
- [es5.github.com]
- [msdn.microsoft.com]

[developer.mozilla.org]: http://developer.mozilla.org "Mozilla Developer Network"
[jp.developer.mozilla.org]: https://developer.mozilla.org/ja "Mozilla Developer Network日本語版"
[www2u.biglobe.ne.jp/~oz-07ams/prog/ecma262r3/]: http://www2u.biglobe.ne.jp/~oz-07ams/prog/ecma262r3/ "Under Translation of ECMA-262 3rd Edition"
[api.jquery.com]: http://api.jquery.com "jQuery API Document"
[es5.github.com]: http://es5.github.com/ "Annotated ECMAScript 5.1"
[msdn.microsoft.com]: http://msdn.microsoft.com/en-us/library/yek4tbz0%28v=VS.94%29.aspx "MSDN JavaScript Language Reference"

> [JavaScriptリファレンスを高速検索するKeySnailプラグイン | Web scratch](http://efcl.info/2011/0606/res2830/ "JavaScriptリファレンスを高速検索するKeySnailプラグイン")

---

# ブラウザの対応機能を調べる

> 書いて試すのが確実だが...

- <a href="https://developer.mozilla.org/ja/docs">Mozilla Developer Network</a>
    - <img src="https://img.skitch.com/20120114-8462d2qwysf33qrdpu81fecdsn.png" alt="互換表" />
- <a href="http://caniuse.com/#">When can I use... Support tables for HTML5, CSS3, etc</a>
    - ブラウザが対応している機能についてまとまっている
    - iOSやAndroidについても記載されてる。
    - 更新が頻繁で最新のバージョンについても書かれている
- <a href="http://kangax.github.com/es5-compat-table/">ECMAScript 5 compatibility table</a>
    - ES5の機能についての対応表
- <a href="http://pointedears.de/scripts/test/es-matrix/">ECMAScript Support Matrix</a>
    - ECMAScriptとJavaScriptのバージョンの対応関係がわかる

---

### 書いて試す

* <a href="http://jsdo.it/">jsdo.it</a> KAYAC
* <a href="http://jsfiddle.net/">jsFiddle</a> 高機能
    * <a href="http://tokkono.cute.coocan.jp/blog/slow/index.php/xhtmlcss/fun-with-jsfiddle/">jsFiddleをとことん楽しむために知っておくと良い15の事 | ゆっくりと…</a>
* <a href="http://jsbin.com/#javascript,html,live">JS Bin</a> no iframe
* <a href="http://pastehtml.com/">Paste HTML</a> Single Web Page 
* <a href="http://dabblet.com/">dabblet.com</a> CSS
* <a href="http://cssdesk.com/">CSSDesk</a> CSS

---

# ライブラリを調べる

---

### ドキュメント or ソースコード

#### APIドキュメントを読む

* <a href="http://api.jquery.com/">jQuery API</a> 公式
* <a href="http://jqapi.com/">jQAPI - Alternative jQuery Documentation</a> 非公式

#### ソースコードを読む

- <a href="http://james.padolsey.com/jquery/">jQuery source viewer</a>
- <a href="http://jsapi.info/">JS API info</a>
    * jQuery, Dojo, Mootools ,Underscore, YUI
    * メソッドごとにソースを表示
- <a href="http://www.keyframesandcode.com/resources/javascript/deconstructed/">JS Libs Deconstructed</a> 
    - jQuery, Prototype, MooToolsのソースコードの構造

---

# 実行速度・ベンチマークについて

- 自分でベンチマークを書くことが大事
	- ブラウザ事に特徴が違う
	- ブラウザアップデート後も再利用できるようにする
- <a href="http://jsperf.com/">jsPerf</a>
       * 計測値を貯めていける
       * <a href="http://efcl.info/2011/0303/res2330/">JavaScriptコードのパフォーマンス比較ができるWebサービス「jsPerf」の使い方 | Web scratch</a>

---

# 知る・探す - まとめ

- ググれ
- 動かして確認しろ
- リファレンスだけではなく仕様書も参考になる
    - ECMAScriptの仕様書はコンパクト
- ベンチは再利用できるようにする

> NEXT: JavaScriptを学ぶ方法