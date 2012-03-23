# JavaScript Testing FrameworkのBusterJSを使う
	
---

# 鎌倉BusterJS

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
[BusterJS]:http://busterjs.org/ "Buster.JS"

---

# [BusterJS][]とは
* NodeJS製のJavaScript Testing Framweork
	* JsTestDriverによく似ている作り
* August Lilleaas と Christian Johansenが中心に作成(Githubで公開)
* ![Christian Johansen](https://img.skitch.com/20120323-qtr1r5t5puy6is28w9fnfke7g3.png)
* Christian Johansen
	* TDDJS(テスト駆動JavaScript)の著者、Sinon.js作者

---

## BusterJSの今

まだベータ段階なので、遊び程度で使うのが丁度いい

* Lastest : [Buster.JS Beta 2](http://busterjs.org/changelog/beta2/ "Buster.JS Beta 2")
	* まだベータ版、Windowsもまだ未サポート
	* 開発者向け for [Developers](http://busterjs.org/docs/developers/ "Developers")
* Update Information
	* [@buster_js](https://twitter.com/#!/buster_js "@buster_js")
	* [buster (buster) - Buster.JS](http://statusnet.busterjs.org/ "buster (buster) - Buster.JS")
	* [busterjs (Buster.JS)](https://github.com/busterjs "busterjs (Buster.JS)") Github
	
---

# BusterJSのテスト実行手順

1. `$ npm install -g buster`
2. config(`buster.js`)ファイルを作成
	* 実行環境で `browser` or `node` を指定できる(ハイブリッドも可能)
3. テストを書く
4. browserで実行する場合 `buster server` でローカルサーバを起動
	* http://localhost:1111/capture にブラウザでアクセスしてキャプチャー
4. `$ buster test` でconfigを元にファイルを読み込んでテストを実行 

QUnitやJasmineのように静的なHTMLとしてテストを実行する`$ buster static`もあります

* [Hands-on Unit Testing with Buster.JS](http://cjohansen.no/talks/2011/busterjs/#93 "Hands-on Unit Testing with Buster.JS")

---

# BusterJS と JsTestDriver
否定のassertionsの書き方が違う。
BusterJSは`refute`メソッドを使う


	!javascript
	// JsTestDriver
	assertNoException(function () {
        something()
    });
    // BusterJS
    refute.exception(function(){
        somthing();
    });


引数の順番が違う事がある

	!javascript
	// JsTestDriver
	assertClassName("js-tab-controller", this.tabs); 
	// BusterJS
	assert.className(this.tabs, "js-tab-controller");	
BusterJSはドキュメントが多い

---

## 類似点

* ✓ ブラウザでテストするのに、Captureする仕組み
	* これは色々参考にしたと言っていた
* ✓ メソッドの命名規則(refuteとかで違う点はあるけど大体似てる)


---

# 設定ファイル

設定ファイルもJavaScriptで定義する(`buster.js`というファイル名がよく使われる)

	!javascript
	var config = module.exports;
	
	config["My tests"] = {
	    env: "browser",        // or "node"
	    sources: [
	        "lib/mylib.js", // Paths are relative to config file
	        "src/**/*.js"   // Glob patterns supported
	    ],
	    tests: [
	        "test/*-test.js"
	    ]
	}

* [Buster.JS Configuration](http://busterjs.org/docs/configuration/ "Buster.JS Configuration")

---


# 基本的なテストの書き方

* buster.testCaseで囲む
* setUp,tearDown
* `"テスト名" : function(){ /* test code */ }`

strtime test


 	!javascript
	buster.testCase("Date strftime test", {
	    setUp: function () {
	        this.date = new Date(2009, 2, 11);
	    },
	
	    "%Y should be '2009'": function () {
	        assert.equals(this.date.strftime("%Y"), "2009");
	    },
	
	    "%y should be '09'": function () {
	        assert.equals(this.date.strftime("%y"), "09");
	    },
	
	    // ...
	});

---

# assert vs refute


* assert - trueであるならテストをパス
* refute - falseであるならテストをパス
	* assert <-> refure

assertとrefute以下にそれぞれ同じ用途のメソッドが入ってる

	!javascript
	assert(true);// PASS
	refure(false);// PASS
	
	assert.same("a","a");// PASS
	refute.same(1,"1");//===で比較するとfalseなので PASS 

---

# BDD Syntax

* BDD的な書き方も用意されている

e.g)

	!javascript
	buster.spec.expose(); // describe/it/itEventually/before/afterがグローバルに定義される

	describe("A module", function () {
	    it("states the obvious", function () {
	        expect(true).toEqual(true);
	    });
	});

---
# testCaseのネスト

ネストしたtestCase

	!javascript
	buster.testCase("Nested setup and teardown call order", {
	    setUp : function(){
	        buster.console.log("Setup #1")	;
	    },
	    tearDown : function(){
	        buster.console.log("Teardown #1");
	    },
	    "test #1" : function(){
	        buster.console.log("Test #1");
	    },
	    "context" : {
	    	setUp : function(){
	                buster.console.log("Setup #2");
	        },
	        "test #2" : function(){
	            buster.console.log("Test #2");
	        },
	        "context" : {
	            setUp : function(){
	                buster.console.log("Setup #3");
	            },
	            tearDown : function(){
	                buster.console.log("Teardown #3");
	            },
	            "//test #3" : function(){
	                buster.console.log("Test #3");
	            }
	        }
	    }
	});
	
---

## 実行結果

// から始まるテストは✎(コンソールだと-)となり実行されずに保留される

	✎ Nested setup and teardown call order context context test #3
    ✓ Nested setup and teardown call order context test #2
      [LOG] Setup #1  // <= ネストの親
      [LOG] Setup #2                
      [LOG] Test #2
      [LOG] Teardown #1 // <= ネストの親
    
    ✓ Nested setup and teardown call order test #1
      [LOG] Setup #1
      [LOG] Test #1
      [LOG] Teardown #1
    
    1 test case, 2 tests, 2 assertions, 0 failures, 0 errors, 0 timeouts, 1 deferred

---
# コンソールAPI

`buster.log()`を使う。`buster.console.log()`も同等

`jstestdriver.console.log()` に類似するコンソール出力用API

	!javascript
	buster.log(buster.console);
	// => コンソールにフォーマットされて出力される
    [LOG] {
		  contexts: { log: [undefined] },
		  debug: function () {},
		  error: function () {},
		  format: function () {},
		  level: "debug",
		  levels: ["error", "warn", "log", "debug"],
		  listeners: { log: [function () {}] },
		  log: function () {},
		  logFunctions: true,
		  warn: function () {}
		}

---

## コンソール出力の整形

`buster.log()`はpretty printされた形で出力される

	!javascript
	var fn = function innerFn(){
	    doSomthing();
	};
	var obj = {"a" : 1, b : {b1 : "in"}, c : [1, 2, 3]};
	buster.log(fn, "\n", obj);
    [LOG] function innerFn() {} 
	 { a: 1, b: { b1: "in" }, c: [1, 2, 3] }

Buster.JS core modulesの[buster.format](http://busterjs.org/docs/format/)を使って整形処理が行われている

* [buster.eventedLogger](http://busterjs.org/docs/evented-logger/)
* [buster.format](http://busterjs.org/docs/format/)

---

# テスト結果の出力形式
`$ buster test -h reporters`

実行結果をどういう形式で出力するかを決定できる.
独自の出力形式もJavaScriptで比較的簡単に作成できる

* specification
	* 結果をそれぞれ細かくコンソール表示
* jsonProxy
* quiet
* xml
* tap
* dots
	* デフォルトのコンソール出力
* html
* teamcity
	* JetBrainsのCIツール


---

# 非同期テスト

テストケースにそのまま非同期コードを書くと、assertされる前にテストが終わってします

	!javascript
    "test not asynchronous" : function(){
        setTimeout(function(){
            assert(true);
        }, 100);
    }
     ✖ My thing test not asynchronous
    No assertions!

* テストケースの引数で渡したdoneが実行されるまでテストケースが終了しない
* assertをおこなってdoneを実行したら終わり

正しいやり方の例	
	
	!javascript
    "test asynchronous" : function(done){
        setTimeout(function(){
            assert(true);
            done();
        }, 100);
    }
    ✓ My thing test asynchronous

---
## 非同期テスト - Promiss

Promissオブジェクトをテストケースで返して非同期テストを行う

	!javascript
    "test async, use promiss" : function(){
        var promise = { // then メソッドの有無が重要
            then : function(callback){
                this.callbacks = this.callbacks || [];
                this.callbacks.push(callback);
            }
        };
        
        setTimeout(function(){
            buster.assert(true);
            var callbacks = promise.callbacks || [];

            for (var i = 0, l = callbacks.length; i < l; ++i){
                callbacks[i]();
            }
        }, 100);
        // thenを持ったものを返す => promissと判断 (isPromise)
        return promise;
    }
    

* 自分でわざわざpromissを定義するのは面倒
	* When.js がビルドインで使えるので、when.jsでpromissを使う

---

## When.js

* CommonJS Promises/Aの実装ライブラリ 
* [when.js](https://github.com/cujojs/when "when.js")
* BusterJSに統合されている

When.js を使って先ほどと同じ非同期テストを書くと

	!javascript
    "test async ,use when.js" : function(){
        var deferred = when.defer();

        setTimeout(function(){
            buster.assert(true);
            deferred.resolver.resolve();
        }, 100);

        return deferred.promise;
    }

---

# Sinon.js

* Christian Johansenによるモック、スタブライブラリ
* [Sinon.JS](http://sinonjs.org/ "Sinon.JS")
	* BusterJSに統合されている

assertionにはSinon.jsと連動したものもいくつか含まれている。

	!javascript
	"test should call all observers" : function(){
        var spy1 = sinon.spy();
        this.observable.observe(spy1);
        this.observable.notify();

        assert.called(spy1);
    }
 

---

# testbed

![test page](https://img.skitch.com/20120323-ffhak1xwc6irwfqwbwys6gfw9r.png)

* テストを実行する場所について定義できる
	* 指定したHTML内でテストを実行する
	* 指定したパスにアクセスするとJSONを返すAPIを定義する etc
	* モックを別ファイルに分けることが可能

---

## テストを実行する場所

* 今のところは、configでresourcesの"/"を指定することで、testbedを差し替えできる。
* 将来的にはtestbedという設定プロパティ自体ができる予定

buster.js ...

	!javascript
    "resources" : [
        {// testbed
            "path" : "/",
            "file" : "fixtures/testbed.html",
            "headers" : {
                "Content-Type" : "text/html"
            }
        },
        {// JSON APIのモック
            "path" : "/res.json",
            "content" : JSON.stringify({
                text : "テキストー",
                id : 4
            }),
            "headers" : {
                "Content-Type" : "application/json"
            }
        }
    ]

* [Buster.JS Configuration](http://busterjs.org/docs/configuration/ "Buster.JS Configuration")
	* proxyやバックエンドの設定などもっと本番に近い環境で動かすことも多分できる

---

# BusterJSの拡張
* BusterJSにextensionの仕組みが備わってる
* [Buster extensions](http://busterjs.org/docs/extensions/ "Buster extensions")

Configのextensionsプロパティで必要な拡張を読み込む

	!javascript
	var config = module.exports;
	
	config["Browser tests"] = {
	    rootPath: "../",
	    sources: ["src/**/*.js"]
	    tests: ["test/**/*.js"],
	    extensions: [require("buster-jstestdriver")]
	};

---

# BusterJSの拡張紹介
* buster-jstestdriver
	* JsTestDriverのテストケースを実行できる
	* `:DOC`形式コメントもサポート
	* 逆にその部分だけ [buster-html-doc](https://github.com/busterjs/buster-html-doc "buster-html-doc")
* [buster-amd](https://github.com/johlrogge/buster-amd "buster-amd")
	* amdモジュールのテストを実行をサポート
	* AMDモジュールは少し工夫しないとテストしにくいのを勝手にやってくれる
	* [RequireJS + QUnit + QUnit-TAP + PhantomJSでのテスト構成について | Technology-Gym](http://tech-gym.com/2011/11/javascript/572.html "RequireJS + QUnit + QUnit-TAP + PhantomJSでのテスト構成について")
* [Buster extensions](http://busterjs.org/docs/extensions "Buster extensions")
* [Buster.JS Architecture overview](http://busterjs.org/docs/architecture/ "Buster.JS Architecture overview")
---

# Editor Integrate

* [Editor integration](http://busterjs.org/docs/overview/ "Editor integration")
* Christian Johansenは[Emacs](http://cjohansen.no/an-introduction-to-elisp "Emacs")使い
	* [buster-mode](https://gitorious.org/buster/buster-mode "buster-mode")

[WebStorm](http://www.jetbrains.com/webstorm/ "WebStorm")の場合

* JsTestDriverは公式プラグインでサポートされてる
* WebStormでも最低限BusterJSの補完ぐらいはできるようにしたい
* JSDocを書けばある程度補完はできるようになる
	* WebStromについて詳しくは [WebStorm指南書](http://azu.github.com/slide/webstorm/webstorm.html#slide1 "WebStorm指南書")参照
	
	
---

# WebStorm Integrate

### JSDoc for BusterJS

* [azu/BusterJSDoc](https://github.com/azu/BusterJSDoc "azu/BusterJSDoc")

BusterJSの構文についてのJSDocファイル

	!javascript
	/**
	* Fails if actual is falsy (0, "", null, undefined, NaN).
	* @param actual actual is falsy (0, "", null, undefined, NaN)
	* @param [message]
	
	*/
	buster.assertions.assert = function assert(actual, message){}
	/**
	* Fails if actual is not the same object (===) as expected
	* @param expected
	* @param actual
	* @param [message]
	*/
	buster.assertions.assert.same = function same(expected, actual, message){}
	
Webstormの　Settings -> JavaScript ->Libraries -> から参照する事でBusterJSのメソッドを補完候補に追加できる
 
---

## External Tools

* WebStormから外部プロセスを呼ぶ機能
* Open ConsoleでWebStormを閉じるまでプロセスを動かすこともできる

![Buster Test This](https://img.skitch.com/20120323-xk7ym37hyy4cxm2ybj483acsuq.png)

---

## External Tools for BusterJS

### BusterServer

選択したディレクトリで`buster server`を実行する

	Program: /Users/azu/.nodebrew/current/bin/node
	Parameter: /Users/azu/.nodebrew/current/bin/buster-server
	Working Directory: $FileDir$

### Open Browser

BusterJSのキャプチャURLを開くだけ

	Program: /usr/bin/open
	Parameter: http://localhost:1111/capture

	
### Buster Test This

選択してるテストファイルを実行する

	Program: /Users/azu/.nodebrew/current/bin/node
	Parameter: /Users/azu/.nodebrew/current/bin/buster-test --reporter specification -t $FilePath$
	Working Directory: $FileDir$

---


# 感想
* 思っていたよりassert/refuteは使い易い
* JsTestDriverと似ている部分は多い
* TDDJS本はBusterJSを試すのに向いている
	* 本の内容がフレームワークに反映されてる感じ
* ドキュメントが積極的に書かれてるのはGood
* まだベータ段階なので変更等は常にあります
