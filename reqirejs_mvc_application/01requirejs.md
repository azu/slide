# モジュール管理
モジュール管理はモジュールローダーライブラリを[RequireJS][]を利用

- [RequireJS][]
	- JavaScriptの依存性解決をしてくれるライブラリ
	- AMDに則ったモジュールローダーライブラリ
	- [ParisJS #10 : RequireJS](http://www.slideshare.net/JulienZee/parisjs-10-requirejs-9111799 "ParisJS #10 : RequireJS")
	-[RequireJS moduleについて - 文殊堂](http://d.hatena.ne.jp/monjudoh/20101109/1289288066 "RequireJS moduleについて - 文殊堂")
	- [BPStudy#41 RequireJSとeventとUIコンポーネント - 文殊堂](http://d.hatena.ne.jp/monjudoh/20110128/1296205331 "BPStudy#41 RequireJSとeventとUIコンポーネント - 文殊堂")
- [Plugins](https://github.com/jrburke/requirejs/wiki/Plugins "Plugins")
	- text,json,images,i18n ...
 
---
# AMD

- AMD(Asynchronous Module Definition)とは
	- [Writing Modular JavaScript With AMD, CommonJS &amp; ES Harmony](http://addyosmani.com/writing-modular-js/ "Writing Modular JavaScript With AMD, CommonJS &amp; ES Harmony")
	- モジュール(jsファイル)をScriptタグで追加して読み込む
	- jQuery 1.7, Underscore.js 1.2.1などAMDモジュールとして読み込みに対応してるライブラリが増えている

**モジュールの定義方法**

    !javascript
    define(
    	module_id /*optional*/,
    	[dependencies] /*optional*/,
    	definition function /*関数 or オブジェクト*/
    );

**モジュールの利用方法**

    !javascript
	require(['foo', 'bar'], function ( foo, bar ) {
		// rest of your code here
		foo.doSomething();
	});
[RequireJS]:http://requirejs.org/ "RequireJS"

---

# 問題点

- [マスタリング非同期読み込み BPStudy#41](http://ss-o.net/event/js20110128/ "マスタリング非同期読み込み BPStudy#41")

> RequireJSは使えば使うほどファイルが細分化され、しかも非同期読み込みができなくなっていくという問題を抱えている

**解決方法**

- RequireJS用のビルドツール[r.js][]を使う
	- ファイルが一つにまとまる
	- RequireJSの利用を決定した要因

[r.js]: https://github.com/jrburke/r.js "r.js"

---

# [r.js][]での結合

- node.js or Javaでの実行環境がある
	- どのOSでも動かせるはず
- コンフィグファイルを書いて、r.jsでビルド
	- 依存関係を指定してファイルの結合(include/exclude)
	- Closure Compiler or uglifyJSで最適化
- [build/example.build.js at master from jrburke/r.js - GitHub](https://github.com/jrburke/r.js/blob/master/build/example.build.js "build/example.build.js - GitHub")
> r.js -o path/to/app.config.js

---

# MVC?

- Model-View-Controller
- [サバクラ両方で動く JavakScript の大規模開発を行うために — Gist](https://gist.github.com/1362110 "サバクラ両方で動く JavaScript の大規模開発を行うために — Gist")
- [Build a simple client-side MVC app with RequireJS | @verekia's blog](http://verekia.com/requirejs/build-simple-client-side-mvc-app-require-js "Build a simple client-side MVC app with RequireJS | @verekia's blog")
	- 1 controller = 1 view 
