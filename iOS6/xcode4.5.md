# Xcode 4.5 の変更点について

---

* Lion & Mountain Lionが対象
* LLDB がデフォルトのデバッガーに
* LLDBがiOS端末でのハードウェアウォッチポイントに対応
* OpenGLのデバッガーとパフォーマンス解析がXcodeに統合
* デフォルトのテンプレートから@synthesizeがなくした
* iOS6 のAuto Layout をサポート

----

# XCode4.4からの強化点


* Objective-C の配列、辞書でsubscripting をサポート

``[ ]``を使って要素にアクセスする機能の事

	// 配列
	NSArray *array = @[@"a", @"b", @"c"];
    NSLog(@"%@ == %@", array[1], [array objectAtIndex:1]); // b == b
	// 辞書
	NSDictionary *dictionary = @{
    @"a":@1,
    @"b":@2
    };
    NSLog(@"%@ == %@", dictionary[@"a"], [dictionary objectForKey:@"a"]);// 1 == 1
    	

Xcode 4.5から入った機能だけど、4.4でもSubscriptingを実装して使うことはできる

* [Objective-Cで独自クラスに[]でアクセスする - TOKOROM BLOG](http://www.tokoro.me/2012/08/12/objc-subscripting/ "Objective-Cで独自クラスに[]でアクセスする - TOKOROM BLOG")
* [Using subscripting with Xcode 4.4 and iOS 4.3+ - Peter Steinberger](http://petersteinberger.com/blog/2012/using-subscripting-with-Xcode-4_4-and-iOS-4_3/ "Using subscripting with Xcode 4.4 and iOS 4.3+ - Peter Steinberger")


---

# その他
* armv6のサポート終了
* iOS Deployment Targetは4.3以上に
* 以下の端末に向けて標準の方法ではサポートができなくなった
    * iPod touch(1st generation)
    * iPod touch(2nd generation)
    * iPhone
    * iPhone 3G
* armv7sのサポート
	* サポートするには静的ライブラリもarmv7対応してないといけない
* C++11 標準への互換向上、lambda expressionsをサポート
* LLVM GCC compilerは最新のObjective-Cの機能を含んでないので、Apple LLVM Compilerを推奨

----

# 参考リンク


* [Xcode 4.5のテンプレートに@synthesizeがなくなった・・ | J7LG](http://www.j7lg.com/archives/1270 "Xcode 4.5のテンプレートに@synthesizeがなくなった・・ | J7LG")
* [アプリをiPhone5に対応する場合の地雷ポイント一覧 | fladdict](http://fladdict.net/blog/2012/09/jirai.html "アプリをiPhone5に対応する場合の地雷ポイント一覧 | fladdict")
* [アプリのiPhone5対応](http://www.toyship.org/archives/916 "アプリのiPhone5対応")
* [iPhone 5からはarmv7sアーキテクチャ | HMDT Blog](http://hmdt.jp/blog/?p=594 "iPhone 5からはarmv7sアーキテクチャ | HMDT Blog")
* [Corona: iOS 6 and Xcode 4.5 are GM! | Corona Labs](http://www.coronalabs.com/blog/2012/09/19/corona-ios-6-and-xcode-4-5-are-gm/# "Corona: iOS 6 and Xcode 4.5 are GM! | Corona Labs")