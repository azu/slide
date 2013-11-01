# 最近作ったiOSのライブラリ紹介

----

# [NSDate-Escort](https://github.com/azu/NSDate-Escort "azu/NSDate-Escort · GitHub")

* NSDateカテゴリ
* 何日後の日付を取得した、月末の日付を取得したり…
* 大体のNSDateからの日付操作が出来るライブラリ
* [NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch](http://efcl.info/2013/0801/res3366/ "NSDateをもっと便利に使うためのライブラリ NSDate-Escortを書いた | Web scratch")

-----

# [AZDateBuilder](https://github.com/azu/AZDateBuilder "azu/AZDateBuilder · GitHub")

* 指定した日付のNSDateを簡単につくれるライブラリ

<div class="highlight"><pre><span class="c1">// 2010-1-1 11:10:05</span>
<span class="n">NSDate</span> <span class="o">*</span><span class="n">date</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSDate</span> <span class="n">AZ_dateByUnit</span><span class="o">:</span><span class="err">@</span><span class="p">{</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">year</span> <span class="o">:</span> <span class="mi">@2010</span><span class="p">,</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">month</span> <span class="o">:</span> <span class="mi">@1</span><span class="p">,</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">day</span> <span class="o">:</span> <span class="mi">@1</span><span class="p">,</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">hour</span> <span class="o">:</span> <span class="mi">@11</span><span class="p">,</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">minute</span> <span class="o">:</span> <span class="mi">@10</span><span class="p">,</span>
    <span class="n">AZ_DateUnit</span><span class="p">.</span><span class="n">second</span> <span class="o">:</span> <span class="mi">@5</span>
<span class="p">}];</span>
</pre></div>

----

# [SimpleUserDefaults](https://github.com/azu/SimpleUserDefaults "azu/SimpleUserDefaults · GitHub")

* NSUserDefaultsの読み書きを楽にするライブラリ
* プロパティがそのままNSUserDefaultsの読み書きに変わる
* ``objc/runtime.h`` は使わないで KVO で実装

----

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">ExampleConfig</span> : <span class="nc">SimpleUserDefaults</span>
<span class="k">@property</span> <span class="p">(</span><span class="n">nonatomic</span><span class="p">)</span> <span class="n">NSString</span> <span class="o">*</span><span class="n">name</span><span class="p">;</span><span class="c1">// &lt;- getter/setter access NSUserDefaults</span>
<span class="k">@property</span> <span class="p">(</span><span class="n">nonatomic</span><span class="p">)</span> <span class="kt">BOOL</span> <span class="n">hasBoolValue</span><span class="p">;</span>
<span class="k">@end</span>

<span class="k">@implementation</span> <span class="nc">ExampleConfig</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">id</span><span class="p">)</span><span class="nf">init</span> <span class="p">{</span>
    <span class="n">self</span> <span class="o">=</span> <span class="p">[</span><span class="n">super</span> <span class="n">init</span><span class="p">];</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">self</span> <span class="o">==</span> <span class="nb">nil</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nb">nil</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="c1">// initialize NSUserDefaults target</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">addObserverSelector</span><span class="o">:</span><span class="k">@selector</span><span class="p">(</span><span class="n">name</span><span class="p">)];</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">addObserverSelector</span><span class="o">:</span><span class="k">@selector</span><span class="p">(</span><span class="n">hasBoolValue</span><span class="p">)];</span>
    <span class="k">return</span> <span class="n">self</span><span class="p">;</span>
<span class="p">}</span>
<span class="k">@end</span>
</pre></div>

----

## パフォーマンス

<pre>
:Name                                              :Total(s)  :Avg.(s)
-[Bench test_benchSimpleUserDefaults_init]         0.01163    0.00001    (1/1000)
-[Bench test_benchSimpleUserDefaults_read]         0.00019    0.00000    (1/1000)
-[Bench test_benchSimpleUserDefaults_write]        0.00020    0.00000    (1/1000)
// 素の実装
-[Bench test_benchStandardUserDefaults_init]       0.00129    0.00000    (1/1000)
-[Bench test_benchStandardUserDefaults_read]       0.00087    0.00000    (1/1000)
-[Bench test_benchStandardUserDefaults_write]      0.00021    0.00000    (1/1000)
// runtimeの実装
-[Bench test_benchGVUserDefaults_init]             0.02315    0.00002    (1/1000)
-[Bench test_benchGVUserDefaults_read]             0.00021    0.00000    (1/1000)
-[Bench test_benchGVUserDefaults_write]            0.01373    0.00001    (1/1000)
</pre>

-----

# [BenchmarkTestCase](https://github.com/azu/BenchmarkTestCase "azu/BenchmarkTestCase · GitHub")

* テストと同じようにベンチマークが書けるライラぶらり
	* go test インスパイア
* ``XCTestCase`` のサブクラスとして実装
* 動的にテストケースを生成して、ベンチマークをテストとして実装できる

-----

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">YourBenchmarkTestCase</span> : <span class="nc">AZBenchmarkTestCase</span>

<span class="k">@end</span>
<span class="k">@implementation</span> <span class="nc">YourBenchmarkTestCase</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">benchYourTest</span><span class="p">{</span>
    <span class="c1">// ベンチを取りたい処理を書く</span>
<span class="p">}</span>
<span class="k">@end</span>
</pre></div>

-----

# [OperationPromise](https://github.com/azu/OperationPromise "azu/OperationPromise")

* NSOperation同士の依存関係を簡単に示すためのライブラリ
* Promiseっぽい `then` や `when` を使う


<div class="highlight"><pre><span class="n">NSMutableArray</span> <span class="o">*</span><span class="n">race</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSMutableArray</span> <span class="n">array</span><span class="p">];</span>
<span class="n">NSBlockOperation</span> <span class="o">*</span><span class="n">blockOperation1</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSBlockOperation</span> <span class="n">blockOperationWithBlock</span><span class="o">:^</span><span class="p">{</span>
    <span class="p">[</span><span class="n">race</span> <span class="n">addObject</span><span class="o">:</span><span class="mi">@1</span><span class="p">];</span>
<span class="p">}];</span>
<span class="n">NSBlockOperation</span> <span class="o">*</span><span class="n">blockOperation2</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSBlockOperation</span> <span class="n">blockOperationWithBlock</span><span class="o">:^</span><span class="p">{</span>
    <span class="p">[</span><span class="n">race</span> <span class="n">addObject</span><span class="o">:</span><span class="mi">@2</span><span class="p">];</span>
<span class="p">}];</span>
<span class="n">NSBlockOperation</span> <span class="o">*</span><span class="n">blockOperation3</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSBlockOperation</span> <span class="n">blockOperationWithBlock</span><span class="o">:^</span><span class="p">{</span>
    <span class="p">[</span><span class="n">race</span> <span class="n">addObject</span><span class="o">:</span><span class="mi">@3</span><span class="p">];</span>
<span class="p">}];</span>
<span class="n">NSOperationQueue</span> <span class="o">*</span><span class="n">queue</span> <span class="o">=</span> <span class="p">[[</span><span class="n">NSOperationQueue</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>

<span class="p">[</span><span class="n">OperationPromise</span> <span class="n">promise</span><span class="o">:</span><span class="n">queue</span><span class="p">]</span>
    <span class="p">.</span><span class="n">then</span><span class="p">(</span><span class="n">blockOperation1</span><span class="p">)</span>
    <span class="p">.</span><span class="n">then</span><span class="p">(</span><span class="n">blockOperation2</span><span class="p">)</span>
    <span class="p">.</span><span class="n">then</span><span class="p">(</span><span class="n">blockOperation3</span><span class="p">)</span>
    <span class="p">.</span><span class="n">start</span><span class="p">();</span>
<span class="c1">// @1 -&gt; @2 -&gt; @3 という順番で実行される</span>
</pre></div>

-----

# [UITextSubClass](https://github.com/azu/UITextSubClass "azu/UITextSubClass · GitHub")

* UITextField / UITextView のサブクラスライブラリ郡
* Toolbarを自動でつけたり、数値入力専用、UIDatePickerをキーボード部分に表示する
* サブクラスなのでInterface Builderのサブクラスを指定するだけ使える

-----

# [XUIRoundedRectButton](https://github.com/azu/XUIRoundedRectButton "azu/XUIRoundedRectButton · GitHub")

* iOS7でもiOS6の ``UIButtonTypeRoundedRect`` 風のボタンを使える
* UIButtonのサブクラスとして実装

![ScreenShot](https://www.monosnap.com/image/zirPSLa1ZhROY41l0PvqzL96H.png)

----

# [AAMFeedback](https://github.com/azu/AAMFeedback "azu/AAMFeedback · GitHub")

* お問い合わせ画面を表示するライブラリ
	* [fladdict/AAMFeedback](https://github.com/fladdict/AAMFeedback "fladdict/AAMFeedback · GitHub") のfork
* ちゃんとメンテ続けてて、この間KIFのテストを追加した
* CocoaPods対応、ローカライズのカスタマイズの対応などの機能追加

----

![screenshot](http://f.cl.ly/items/291A0A2u0R2B3u3V0b3H/screenshot.png)

----

# [ManagedMappingObject](https://github.com/azu/ManagedMappingObject "azu/ManagedMappingObject · GitHub")


* ``NSManagedObject`` <-> ``NSDictionary``
	* CoreDataとNSDictionaryのオブジェクトを相互変換補助
	* ``Mantle`` とか
* ライブラリ自体は100行以下でとてもシンプル
* [rentzsch/mogenerator · GitHub](https://github.com/rentzsch/mogenerator "rentzsch/mogenerator · GitHub") 、[JSON Accelerator ](http://www.nerdery.com/json-accelerator "JSON Accelerator ") と一緒に使うと効率的

----

# [CounterAgent](https://github.com/azu/CounterAgent "azu/CounterAgent · GitHub")

* 起動回数を数えて、指定回数だったらメソッドを呼ぶだけのライブラリ

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">CounterAgent</span> : <span class="nc">NSObject</span>
<span class="cp">#pragma mark - count</span>
<span class="k">-</span> <span class="p">(</span><span class="n">NSUInteger</span><span class="p">)</span><span class="nf">countOfCurrentVersion</span><span class="p">;</span>
<span class="cp">#pragma mark - count up</span>
<span class="k">+</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">countUp</span><span class="p">;</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">countUp</span><span class="p">;</span>
<span class="cp">#pragma mark - fire event</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">runObserver:</span><span class="p">(</span><span class="kt">id</span><span class="p">)</span> <span class="n">observer</span> <span class="n">selector</span><span class="o">:</span><span class="p">(</span><span class="kt">SEL</span><span class="p">)</span> <span class="n">selector</span> <span class="n">whenCount</span><span class="o">:</span><span class="p">(</span><span class="n">NSUInteger</span><span class="p">)</span> <span class="n">count</span><span class="p">;</span>
<span class="cp">#pragma mark - reset</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">resetCount</span><span class="p">;</span>
<span class="k">@end</span>
</pre></div>

----

# [azu/NavTintTester7 · GitHub](https://github.com/azu/NavTintTester7 "azu/NavTintTester7 · GitHub")

* ライブラリじゃない
* iOS7のナビゲーションバーの色変更等を確認するためのアプリ
* UIAppearanceとかをいじって色を確認出来る

----

![ss](https://www.monosnap.com/image/BGEdRmcU4x89Ncrrv7DcCQdB1.png)

-----


![ss](https://www.monosnap.com/image/H27c4LAnZYXhApy3twPbF2IW5.png)

----

