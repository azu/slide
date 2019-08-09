# UILocalNotificationのパターンとテスト

-----

# [Objective-C勉強会@東京 ９月 - Objective-C勉強会＠東京 | Doorkeeper](http://ocstudy.doorkeeper.jp/events/5336 "Objective-C勉強会@東京 ９月 - Objective-C勉強会＠東京 | Doorkeeper")

-----

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----

# アウトライン

通知 = ローカル通知（UILocalNotification）

* 通知登録の前にキャンセル
* 通知時間のチェック
* 通知の繰り返しの方法
* いつ通知を登録するか?
* 通知登録とマルチスレッド
* 通知の管理クラス
* 通知のロジックテスト

-----

# 通知登録の前にキャンセル

* キャンセル方法

<div class="highlight"><pre><span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">cancelLocalNotification:</span><span class="p">(</span><span class="n">UILocalNotification</span> <span class="o">*</span><span class="p">)</span><span class="nv">notification</span><span class="p">;</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">cancelAllLocalNotifications</span><span class="p">;</span>
</pre></div>

## なぜ?

* 追加分だけローカル通知を登録するのは管理が難しい
* キャンセルしてから登録し直すほうが単純化できる
* アプリを再インストールした時に、前回の通知が残ってしまうため
	* [iphone - UILocalNotification fires after reinstalling the app - Stack Overflow](http://stackoverflow.com/questions/4923028/uilocalnotification-fires-after-reinstalling-the-app "iphone - UILocalNotification fires after reinstalling the app - Stack Overflow")

-----

# 通知時間のチェック

* 過去の時間をfireDateに設定すると登録した瞬間に通知が発生する
* nilを設定した場合も同様

<div class="highlight"><pre><span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">localNotification</span> <span class="o">=</span> <span class="p">[[</span><span class="n">UILocalNotification</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
<span class="n">localNotification</span><span class="p">.</span><span class="n">fireDate</span> <span class="o">=</span> <span class="n">PAST_DATE</span><span class="p">;</span>
<span class="n">localNotification</span><span class="p">.</span><span class="n">alertBody</span> <span class="o">=</span> <span class="s">@&quot;Fire!&quot;</span><span class="p">;</span>
<span class="p">[[</span><span class="n">UIApplication</span> <span class="n">sharedApplication</span><span class="p">]</span> <span class="n">scheduleLocalNotification</span><span class="o">:</span><span class="n">localNotification</span><span class="p">];</span>
</pre></div>

## 対処法

* 登録する前に ``fireDate`` が現在より後なのかをチェックする

-----

## fireDate のチェック

* fireDateを設定する前に、``NSDate`` をチェックする

<div class="highlight"><pre>    <span class="k">if</span> <span class="p">(</span><span class="n">fireDate</span> <span class="o">==</span> <span class="nb">nil</span> <span class="o">||</span> <span class="p">[</span><span class="n">fireDate</span> <span class="n">timeIntervalSinceNow</span><span class="p">]</span> <span class="o">&lt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span><span class="p">;// 現在より前なのでreturnする</span>
    <span class="p">}</span>
</pre></div>

## 毎回チェック?

* 毎回nilチェックは大変
* 直接通知登録する代わりにラッパーを経由して登録する

-----

## 登録用のhelperを作る

<div class="highlight"><pre><span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">makeNotification:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">fireDate</span> <span class="o">==</span> <span class="nb">nil</span> <span class="o">||</span> <span class="p">[</span><span class="n">fireDate</span> <span class="n">timeIntervalSinceNow</span><span class="p">]</span> <span class="o">&lt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">schedule</span><span class="o">:</span><span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="n">userInfo</span><span class="p">];</span>
<span class="p">}</span>

<span class="o">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="n">schedule</span><span class="o">:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span> <span class="p">{</span>
    <span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">notification</span> <span class="o">=</span> <span class="p">[[</span><span class="n">UILocalNotification</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setFireDate</span><span class="o">:</span><span class="n">fireDate</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setTimeZone</span><span class="o">:</span><span class="p">[</span><span class="n">NSTimeZone</span> <span class="n">systemTimeZone</span><span class="p">]];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setAlertBody</span><span class="o">:</span><span class="n">alertBody</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setUserInfo</span><span class="o">:</span><span class="n">userInfo</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setSoundName</span><span class="o">:</span><span class="n">UILocalNotificationDefaultSoundName</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setAlertAction</span><span class="o">:</span><span class="s">@&quot;Open&quot;</span><span class="p">];</span>
    <span class="p">[[</span><span class="n">UIApplication</span> <span class="n">sharedApplication</span><span class="p">]</span> <span class="n">scheduleLocalNotification</span><span class="o">:</span><span class="n">notification</span><span class="p">];</span>
<span class="p">}</span>
</pre></div>

-----

## Example

<div class="highlight"><pre>    <span class="n">NSDate</span> <span class="o">*</span><span class="n">tomorrow</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSDate</span> <span class="n">dateTomorrow</span><span class="p">];</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">makeNotification</span><span class="o">:</span><span class="n">tomorrow</span> <span class="n">alertBody</span><span class="o">:</span><span class="s">@&quot;Fire!!&quot;</span> <span class="n">userInfo</span><span class="o">:</span><span class="nb">nil</span><span class="p">];</span>
</pre></div>

### メリット

* 通知を登録する毎回条件分岐を入れる必要がなくて済む

### デメリット

* 明らかに未来の日付でも、``NSDate`` をチェックするコストがある(多くても数ms程度…)

-----

# 登録された通知の一覧取得

* ``NSArray *scheduledLocalNotifications`` に登録済みの通知が入っている
* ``NSDate`` をコンソールに表示するときはNSDateFormatterを使うと表示される時間がずれない

<div class="highlight"><pre><span class="cp">#if DEBUG</span>
    <span class="n">NSDateFormatter</span> <span class="o">*</span><span class="n">dateFormatter</span> <span class="o">=</span> <span class="p">[[</span><span class="n">NSDateFormatter</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="p">[</span><span class="n">dateFormatter</span> <span class="n">setCalendar</span><span class="o">:</span><span class="p">[[</span><span class="n">NSCalendar</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">initWithCalendarIdentifier</span><span class="o">:</span><span class="n">NSGregorianCalendar</span><span class="p">]];</span>
    <span class="p">[</span><span class="n">dateFormatter</span> <span class="n">setDateFormat</span><span class="o">:</span><span class="s">@&quot;yyyy/MM/dd HH:mm:ss&quot;</span><span class="p">];</span>
    <span class="k">for</span> <span class="p">(</span><span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">notification</span> <span class="k">in</span> <span class="p">[[</span><span class="n">UIApplication</span> <span class="n">sharedApplication</span><span class="p">]</span> <span class="n">scheduledLocalNotifications</span><span class="p">])</span> <span class="p">{</span>
        <span class="n">NSLog</span><span class="p">(</span><span class="s">@&quot;Notifications : %@ &#39;%@&#39;&quot;</span><span class="p">,</span>
            <span class="p">[</span><span class="n">dateFormatter</span> <span class="n">stringFromDate</span><span class="o">:</span><span class="n">notification</span><span class="p">.</span><span class="n">fireDate</span><span class="p">],</span>
            <span class="n">notification</span><span class="p">.</span><span class="n">alertBody</span>
        <span class="p">);</span>
    <span class="p">}</span>
<span class="cp">#endif</span>
</pre></div>

-----

# 通知の繰り返し

* ``repeatInterval`` プロパティに ``NSCalendarUnit`` を設定
* **単純な繰り返し** のみしかサポートされていない
* 通知のダイアログから繰り返しを止める手段が用意されてない
	* 通知自体をキャンセルする必要がある

設定した ``fireData`` から


	NSMinuteCalendarUnit : 1分毎
	NSHourCalendarUnit   : 1時間毎
	NSWeekCalendarUnit   : 1日毎
	NSDayCalendarUnit    : 1週間毎	


* [Repeating an iOS local notification - Use Your Loaf](http://useyourloaf.com/blog/2010/09/13/repeating-an-ios-local-notification.html "Repeating an iOS local notification - Use Your Loaf")
* [UILocalNotification | Akiの日々](http://akiiisuke.com:83/?p=32 "UILocalNotification | Akiの日々")

-----

## n分/n日ごとに通知を繰り返す

* ``repeatInterval`` ではサポートされてない
* プログラム的に、 n分ごとにずらした通知を設定していく

15 * 6 回 通知をつける例

<div class="highlight"><pre>    <span class="k">for</span> <span class="p">(</span><span class="kt">int</span> <span class="n">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="n">i</span> <span class="o">&lt;=</span> <span class="mi">6</span><span class="p">;</span> <span class="n">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
        <span class="n">NSDate</span> <span class="o">*</span><span class="n">fireDate</span> <span class="o">=</span> <span class="p">[</span><span class="n">basedFireDate</span> <span class="n">dateByAddingMinutes</span><span class="o">:</span><span class="n">i</span> <span class="o">*</span> <span class="mi">15</span><span class="p">];</span>
        <span class="p">[</span><span class="n">self</span> <span class="n">makeNotification</span><span class="o">:</span><span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="nb">nil</span><span class="p">];</span>
    <span class="p">}</span>
</pre></div>

----

## 無限に繰り返す通知

* そんなものはない
* アプリを起動する度に、余分に通知を設定
	* 擬似的な無限の期間を繰り返す
	* アプリが余分につけた期間を超えると通知はでなくなる
* 通知をキャンセルしてから付けるような仕組みじゃないとこのサイクルを保つのは難しい


----

## ずっと鳴り続ける通知

* 通知の音声ファイル(caf)指定する ``soundName``

<div class="highlight"><pre><span class="k">@property</span><span class="p">(</span><span class="n">nonatomic</span><span class="p">,</span><span class="n">copy</span><span class="p">)</span> <span class="n">NSString</span> <span class="o">*</span><span class="n">soundName</span><span class="p">;</span>
</pre></div>

* 音声が鳴り続けている間、通知バーで表示され続ける([最大30秒](https://developer.apple.com/library/ios/documentation/iPhone/Reference/UILocalNotification_Class/Reference/Reference.html#//apple_ref/occ/instp/UILocalNotification/soundName))

![NotificationBar](http://cl.ly/image/2f1n1I0C3R3z/26454_Screen-Shot-2011-10-02-at-7.10.59-PM.png)

-----

## 擬似的に鳴り続ける通知

* 最大の30秒の音声を指定する(無音でもOK)
* ``repeatInterval`` で 1分ごとに繰り返す

<div class="highlight"><pre>    <span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">notification</span> <span class="o">=</span> <span class="p">[[</span><span class="n">UILocalNotification</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setRepeatInterval</span><span class="o">:</span><span class="n">NSMinuteCalendarUnit</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setSoundName</span><span class="o">:</span><span class="s">@&quot;sound.caf&quot;</span><span class="p">];</span><span class="c1">// 30sec</span>
</pre></div>

### 結論

* 電池をモリモリ食べる通知が完成!

----

# いつ通知を登録するか?

* データを保存するたび?
	* 保存処理に、通知登録をし直す処理を毎回追加する必要がある
	* 一番厳密なやり方
* アプリを起動/フォアグランドするたび?
	* 登録する量が多いと他の処理と影響がでる
	* 別スレッドでの通知登録は後述
* アプリを終了/バックグランドするたび?
	* 他の処理と混ざりにくい
	* 同期処理で登録してもあまり問題がない

## おすすめ

* バックグランド移行時に登録するのがシンプル

----

## バックグランド移行時に登録

* [applicationDidEnterBackground:](https://developer.apple.com/library/ios/documentation/uikit/reference/UIApplicationDelegate_Protocol/Reference/Reference.html#//apple_ref/occ/intfm/UIApplicationDelegate/applicationDidEnterBackground: "applicationDidEnterBackground:") で通知の登録処理を呼び出す

<div class="highlight"><pre><span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">applicationDidEnterBackground:</span><span class="p">(</span><span class="n">UIApplication</span> <span class="o">*</span><span class="p">)</span><span class="nv">application</span> <span class="p">{</span>
    <span class="c1">// schedule UILocalNotification</span>
<span class="p">}</span>
</pre></div>

### メリット

* シンプル

### デメリット

* アプリ表示中にローカル通知を受け取って表示する処理がある等、条件によっては使えない

----

# 非同期の通知設定

* ``dispatch_async`` など別スレッドで通知の設定は可能

<div class="highlight"><pre><span class="n">dispatch_async</span><span class="p">(</span><span class="n">dispatch_get_global_queue</span><span class="p">(</span><span class="n">DISPATCH_QUEUE_PRIORITY_DEFAULT</span><span class="p">,</span> <span class="mi">0</span><span class="p">),</span> <span class="o">^</span><span class="p">{</span>
    <span class="c1">// 非同期で通知を設定する処理</span>
    <span class="n">dispatch_async</span><span class="p">(</span><span class="n">dispatch_get_main_queue</span><span class="p">(),</span> <span class="o">^</span><span class="p">{</span>
        <span class="cm">/* メインスレッドでのみ実行可能な処理 */</span>
    <span class="p">});</span>
<span class="p">});</span>
</pre></div>

## メリット

* UIスレッドが固まらずに済む

## デメリット

* マルチスレッドとCoreData等が絡むと面倒

----

# 通知の管理クラス

* ``LocalNotificationManager`` という通知管理するクラスを考える
* ローカル通知関係はこのクラスにまとめる
* ``scheduleLocalNotifications`` を呼べば、一度全てキャンセルして登録し直す
* バックグランドに移行時に、 ``scheduleLocalNotifications`` を呼ぶ

<div class="highlight"><pre><span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">applicationDidEnterBackground:</span><span class="p">(</span><span class="n">UIApplication</span> <span class="o">*</span><span class="p">)</span> <span class="n">application</span> <span class="p">{</span>
    <span class="c1">// バックグラウンドに移行際に通知を設定する</span>
    <span class="n">LocalNotificationManager</span> <span class="o">*</span><span class="n">manager</span> <span class="o">=</span> <span class="p">[[</span><span class="n">LocalNotificationManager</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="p">[</span><span class="n">manager</span> <span class="n">scheduleLocalNotifications</span><span class="p">];</span>
<span class="p">}</span>
</pre></div>


-----

## LocalNotificationManager 

<div class="highlight" style="overflow:auto;max-height:30em;"><pre><span class="k">@interface</span> <span class="nc">LocalNotificationManager</span> : <span class="nc">NSObject</span>
<span class="c1">// ローカル通知を登録する</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">scheduleLocalNotifications</span><span class="p">;</span>
<span class="k">@end</span>

<span class="k">@implementation</span> <span class="nc">LocalNotificationManager</span>
<span class="cp">#pragma mark - Scheduler</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">scheduleLocalNotifications</span> <span class="p">{</span>
    <span class="c1">// 一度通知を全てキャンセルする</span>
    <span class="p">[[</span><span class="n">UIApplication</span> <span class="n">sharedApplication</span><span class="p">]</span> <span class="n">cancelAllLocalNotifications</span><span class="p">];</span>
    <span class="c1">// 通知を設定していく...</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">scheduleWeeklyWork</span><span class="p">];</span>
<span class="p">}</span>

<span class="c1">// 例: weeklyWorkSchedule の時間を通知登録する</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">scheduleWeeklyWork</span> <span class="p">{</span>
    <span class="c1">// ...</span>
    <span class="c1">// makeNotification: を呼び出して通知を登録する</span>
<span class="p">}</span>

<span class="cp">#pragma mark - helper</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">makeNotification:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span> <span class="p">{</span>
    <span class="c1">// 現在より前の通知は設定しない</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">fireDate</span> <span class="o">==</span> <span class="nb">nil</span> <span class="o">||</span> <span class="p">[</span><span class="n">fireDate</span> <span class="n">timeIntervalSinceNow</span><span class="p">]</span> <span class="o">&lt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="p">[</span><span class="n">self</span> <span class="n">schedule</span><span class="o">:</span><span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="n">userInfo</span><span class="p">];</span>
<span class="p">}</span>

<span class="o">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="n">schedule</span><span class="o">:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span> <span class="p">{</span>
    <span class="c1">// ローカル通知を作成する</span>
    <span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">notification</span> <span class="o">=</span> <span class="p">[[</span><span class="n">UILocalNotification</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setFireDate</span><span class="o">:</span><span class="n">fireDate</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setTimeZone</span><span class="o">:</span><span class="p">[</span><span class="n">NSTimeZone</span> <span class="n">systemTimeZone</span><span class="p">]];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setAlertBody</span><span class="o">:</span><span class="n">alertBody</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setUserInfo</span><span class="o">:</span><span class="n">userInfo</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setSoundName</span><span class="o">:</span><span class="n">UILocalNotificationDefaultSoundName</span><span class="p">];</span>
    <span class="p">[</span><span class="n">notification</span> <span class="n">setAlertAction</span><span class="o">:</span><span class="s">@&quot;Open&quot;</span><span class="p">];</span>
    <span class="p">[[</span><span class="n">UIApplication</span> <span class="n">sharedApplication</span><span class="p">]</span> <span class="n">scheduleLocalNotification</span><span class="o">:</span><span class="n">notification</span><span class="p">];</span>
<span class="p">}</span>
<span class="k">@end</span>
</pre></div>

----

## LocalNotificationManager

* ``- (void)scheduleLocalNotifications``
	* 一度全ての通知をキャンセル
	* 通知の種類分、登録するメソッドを呼ぶ
* 通知の種類をわけて登録するメソッドを定義する
	* 分けた方がテストしやすい
	* 通知の登録はごちゃごちゃしがち
	* 個別に呼ぶことはないのでプライベートメソッド
	* [Objective-Cのテストクラスからプライベートメソッド/プロパティを参照したい - TOKOROM BLOG](http://www.tokoro.me/2012/09/12/objc-private-test/ "Objective-Cのテストクラスからプライベートメソッド/プロパティを参照したい - TOKOROM BLOG")

----

# UILocalNotificationのテスト

* **UI**LocalNotification / UIApplication
	* => ロジックテストから触れない - ref. [iOS Unit Test](https://azu.github.io/slide/OCStudy/ios_unit_test.html#slide1 "iOS Unit Test")
	* モックを作る必要がある
* ``LocalNotificationManager`` のサブクラスを作る
	* **UI-** は ``-[LocalNotificationManager schedule:alertBody:userInfo:]`` のhelperに閉じ込めてある
	* helperメソッドをテスト用に上書きしたサブクラスを用意すればいい!
* LocalNotificationManagerを継承した ``LocationNotificationManagerSpy`` を作る
	* ``schedule:alertBody:userInfo:`` を overwrite
	* 通知を登録する代わりに、登録された分の ``UILocalNotification`` をプロパティに貯める
	
----

# ManagerSpyクラス

<div class="highlight" style="font-size:90%; overflow:auto;max-height:35em;"><pre><span class="c1">// テスト用にLocalNotificationManagerを継承したモッククラスを作る</span>
<span class="k">@interface</span> <span class="nc">LocationNotificationManagerSpy</span> : <span class="nc">LocalNotificationManager</span>
<span class="k">@property</span><span class="p">(</span><span class="n">nonatomic</span><span class="p">)</span> <span class="n">NSMutableArray</span> <span class="o">*</span><span class="n">schedules</span><span class="p">;</span>
<span class="c1">// helper</span>
<span class="k">-</span> <span class="p">(</span><span class="n">UILocalNotification</span> <span class="o">*</span><span class="p">)</span><span class="nf">notificationAtIndex:</span><span class="p">(</span><span class="n">NSUInteger</span><span class="p">)</span> <span class="n">index</span><span class="p">;</span>
<span class="c1">// overwrite</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">schedule:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span><span class="p">;</span>
<span class="k">@end</span>

<span class="k">@implementation</span> <span class="nc">LocationNotificationManagerSpy</span>
<span class="k">-</span> <span class="p">(</span><span class="n">NSMutableArray</span> <span class="o">*</span><span class="p">)</span><span class="nf">schedules</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">_schedules</span> <span class="o">==</span> <span class="nb">nil</span><span class="p">)</span> <span class="p">{</span>
        <span class="n">_schedules</span> <span class="o">=</span> <span class="p">[</span><span class="n">NSMutableArray</span> <span class="n">array</span><span class="p">];</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="n">_schedules</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">-</span> <span class="p">(</span><span class="n">UILocalNotification</span> <span class="o">*</span><span class="p">)</span><span class="nf">notificationAtIndex:</span><span class="p">(</span><span class="n">NSUInteger</span><span class="p">)</span> <span class="n">index</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">index</span> <span class="o">&lt;</span> <span class="p">[</span><span class="n">self</span><span class="p">.</span><span class="n">schedules</span> <span class="n">count</span><span class="p">])</span> <span class="p">{</span>
        <span class="k">return</span> <span class="n">self</span><span class="p">.</span><span class="n">schedules</span><span class="p">[</span><span class="n">index</span><span class="p">];</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="nb">nil</span><span class="p">;</span>
<span class="p">}</span>

<span class="c1">// 通知を登録するメソッドを乗っ取り、呼ばれたことを記録する(いわゆるspy)</span>
<span class="o">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="n">schedule</span><span class="o">:</span><span class="p">(</span><span class="n">NSDate</span> <span class="o">*</span><span class="p">)</span> <span class="n">fireDate</span> <span class="n">alertBody</span><span class="o">:</span><span class="p">(</span><span class="n">NSString</span> <span class="o">*</span><span class="p">)</span> <span class="n">alertBody</span> <span class="n">userInfo</span><span class="o">:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span> <span class="n">userInfo</span> <span class="p">{</span>
    <span class="n">UILocalNotification</span> <span class="o">*</span><span class="n">notification</span> <span class="o">=</span> <span class="p">[[</span><span class="n">UILocalNotification</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">init</span><span class="p">];</span>
    <span class="n">notification</span><span class="p">.</span><span class="n">fireDate</span> <span class="o">=</span> <span class="n">fireDate</span><span class="p">;</span>
    <span class="n">notification</span><span class="p">.</span><span class="n">alertBody</span> <span class="o">=</span> <span class="n">alertBody</span><span class="p">;</span>
    <span class="n">notification</span><span class="p">.</span><span class="n">userInfo</span> <span class="o">=</span> <span class="n">userInfo</span><span class="p">;</span>
    <span class="p">[</span><span class="n">self</span><span class="p">.</span><span class="n">schedules</span> <span class="n">addObject</span><span class="o">:</span><span class="n">notification</span><span class="p">];</span>
<span class="p">}</span>
<span class="k">@end</span>
</pre></div>

----

# ManagerSpyクラスの中身

* 通知登録 ``scheduleLocalNotification:`` は実際には呼ばれない
* 通知登録の代わりに ``self.schedules`` に ``UILocalNotification`` が積まれていく

## テストの流れ

* 通常通り ``scheduleLocalNotifications `` を呼ぶ
* ``self.schedules`` に入った通知情報が意図通りかをテストする
	* ``UILocalNotification`` のfireDate や userInfo が一致するかなど
* ``- (UILocalNotification *)notificationAtIndex:`` はhelper

----

# サンプル

* [azu/LocalNotificationPattern](https://github.com/azu/LocalNotificationPattern "azu/LocalNotificationPattern")
	* 今回のパターン、テストがひと通り入った内容
* [azu/MondayWork](https://github.com/azu/MondayWork "azu/MondayWork")	* デモで使ったサンプル


# 参考

* [UILocalNotificationを使った通知の設定について — ios-practice 0.1 documentation](http://ios-practice.readthedocs.org/en/latest/docs/notification/ "UILocalNotificationを使った通知の設定について — ios-practice 0.1 documentation")
	* このスライドの内容を文章的にしたもの
	* [iOS Practice]

[iOS Practice]: http://ios-practice.readthedocs.org/en/latest/  "iOS Practice — ios-practice 0.1 documentation"
