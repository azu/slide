# NSAttributedString

-----

# [Objective-C勉強会@東京 １１月 - Objective-C勉強会＠東京 | Doorkeeper](http://ocstudy.doorkeeper.jp/events/6543 "Objective-C勉強会@東京 １１月 - Objective-C勉強会＠東京 | Doorkeeper")

-----

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----

## What is NSAttributedString?

![Session_222_-_Introduction_to_Attributed_Strings_for_iOS](https://www.monosnap.com/image/oE3XN2PnbMqOoxahsyZuvY8rk.png)

via Session 222 Introduction to Attributed Strings for iOS

* 文字列をNSRangeで切って装飾できるクラス
* Cocoaには結構前からある

-----

## Style

![Style](https://www.monosnap.com/image/dLEfziSoYjBVeKOC6jngfpOLb.png)

via [Objective-C - NSAttributedString 属性付きのUIButtonや文字列の描画 - Qiita [キータ]](http://qiita.com/yusuga_/items/30ee7a851aea0447db06 "Objective-C - NSAttributedString 属性付きのUIButtonや文字列の描画 - Qiita [キータ]")

-----

### Style Attribute

<pre>
* NSBackgroundColorAttributeName 背景色
* NSFontAttributeName フォント名
* NSForegroundColorAttributeName 文字色
* NSKernAttributeName カーニング
* NSLigatureAttributeName リガチャ（合字）
* NSParagraphStyleAttributeName - NSParagraphStyle
* NSShadowAttributeName 影 NSShadowを使う
* NSStrikethroughStyleAttributeName 打ち消し線
* NSStrokeColorAttributeName 袋文字（中抜き文字）
	* NSStrokeWidthAttributeName 
* NSUnderlineStyleAttributeName アンダーライン"
</pre>

ref.

* [文字列に属性を付加する - RubyCocoa メモ](https://sites.google.com/site/rubycocoamemo/Home/tekisuto-guan-lian/wen-zi-lieni-shu-xingwo-fu-jiasuru "文字列に属性を付加する - RubyCocoa メモ")
* [NSAttributedStringを使ってみる | Tea Leaves](http://tea-leaves.co.jp/home/ja/article/1374929836 "NSAttributedStringを使ってみる | Tea Leaves")

-----

## NSParagraphStyle

* ``lineSpacing``
* ``paragraphSpacing``
* ``paragraphSpacingBefore``
* ``alignment``
* ``lineBreakMode``

<del>``lineHeght``</del>

* [Xcode - UILabelを使って行間や文字間を簡易的に調整する。 - Qiita [キータ]](http://qiita.com/Jacminik/items/21f87aadc3a4363b9802 "Xcode - UILabelを使って行間や文字間を簡易的に調整する。 - Qiita [キータ]")
* [iOS6のNSAttributedString // Speaker Deck](https://speakerdeck.com/umekun123/ios6falsensattributedstring "iOS6のNSAttributedString // Speaker Deck")

----

## Layout

* Indent
* TextDirection
* Paragraph間のspace
* [表示されるテキストによって高さを調整する](http://www.toyship.org/archives/1437 "表示されるテキストによって高さを調整する")

----

# Interface Builder

<img src="https://www.monosnap.com/image/W1wzUagRY8uD8GrKScjeDo69O.png" width="90%" alt="layout" />

----

<img src="https://www.monosnap.com/image/JoduEg5VlqwNBWH4Qgzeu0IgO.png" width="80%" alt="layout" />

----

## HTML Rendering?

* HTMLをレンダリングしたい
	* => CoreTextを使いましょう
	* => Webkitを使いましょう
* [mkino/Sayori](https://github.com/mkino/Sayori "mkino/Sayori")
* [Cocoanetics/DTCoreText](https://github.com/Cocoanetics/DTCoreText "Cocoanetics/DTCoreText")
* [appfarms/CoreTextLabel](https://github.com/appfarms/CoreTextLabel "appfarms/CoreTextLabel")

----

## DEMO

<table>
	<tr>
		<td><img src="http://gyazo.com/b5619abe667f0061997ef2a715d3e713.gif" /></td>
		<td>Markdown Syntax highlighting<br /><a href="https://github.com/azu/MarkdownSyntaxEditor">azu/MarkdownSyntaxEditor</a></td>
	</tr>
</table>
----

# そしてTextKitへ

----

## TextKit

### iOS6 Architecture

![iOS6 Architecture](http://cdn4.raywenderlich.com/wp-content/uploads/2013/09/TextRenderingArchitecture-iOS6.png)


via [Text Kit Tutorial | Ray Wenderlich](http://www.raywenderlich.com/50151/text-kit-tutorial "Text Kit Tutorial | Ray Wenderlich")

---

### iOS7 Architecture

![iOS7 Architecture](http://cdn3.raywenderlich.com/wp-content/uploads/2013/09/TextRenderingArchitecture-iOS7.png)

* UI テキスト系の描画に使われてる仕組みが変わった
* Mac から Port

----

## レンダリングの仕組み変更

* iOS7 から UILabl/UITextField/UITextViewは ``TextKit``
* UIWebViewのみが ``Webkit``

### iOS6

* NSParagraphStyle まわりにバグある
	* [NSParagraphStyleはiOS6だとlineHeightを解釈できない。 - なるようになるといいね](http://quesera2.hatenablog.jp/entry/2013/09/23/193407 "NSParagraphStyleはiOS6だとlineHeightを解釈できない。 - なるようになるといいね")

### iOS7

* UITextViewまわりにバグが多い
	* [untitled - iOS 7 のテキスト入力欄（UITextView）の問題について](http://manabuueno.tumblr.com/post/64781595021/ios-7-uitextview "untitled - iOS 7 のテキスト入力欄（UITextView）の問題について")


----

## [NSTextStorage](https://developer.apple.com/library/ios/documentation/UIKit/Reference/NSTextStorage_Class_TextKit/Reference/Reference.html "NSTextStorage Class Reference")

* ``@interface NSTextStorage : NSMutableAttributedString``
	* Available iOS7~
* NSTextStorageは文字とAttributesをASTとして保持してる
	* MVCでいうならModel
* NSAttributedStringのサブクラス

----

## Text Kit Objects

* NSTextStorage - テキストを保持。変更をNSLayoutManagerに通知
* NSLayoutManager - 中央で通知の管理など、glyphsを生成しContainerに描画できるか聞く
	* NSTextStrorage <- **NSLayoutManager** -> NSTextContainer
* NSTextContainer - テキストが書かれる領域を管理するクラス(円形にするとかも出来る)
* UITextView - よくみる子

<img src="https://www.monosnap.com/image/OVDNtsOeDyzLs7LFKe63sdma2.png" alt="NSTextStrorage Architecture" width="100%" />

----

## Mac Cocoaとの違い?

* UITextView <-> NSTextView
* NSTypesetter , NSGlyphGenerator はiOSにない
	* ``NSLayoutManager`` にマージされてる
* 細かな違いはあるが基本的に同じ
* なぜ今さら ``TextKit`` がiOSにきたのか 

=> 理由はシンプル

----

# [performance, performance, performance](http://www.objc.io/issue-5/getting-to-know-textkit.html "performance, performance, performance")

----

## パフォーマンス

* NSTextContainer で領域を可変に出来るということ
	* => reflowが大量に発生するということ
* 自由度が増える
	* 使用するメモリや計算量が増える

----

## より詳細な管理

* begin/endで明示的な変更を通知できるのでより効率的に処理できる

<pre>
- (void)beginEditing;
- (void)endEditing;
</pre>

* [Text Programming Guide for iOS: Using Text Kit to Draw and Manage Text](https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/CustomTextProcessing/CustomTextProcessing.html "Text Programming Guide for iOS: Using Text Kit to Draw and Manage Text")
* [NSTextView](http://hmdt.jp/cocoaProg/AppKit/NSTextView/NSTextView.html "NSTextView")
* [Text System Storage Layer Overview](http://www.mosa.gr.jp/wp-content/uploads/2007/01/textsystemstoragelayeroverview.pdf "T
ext System Storage Layer Overview")

----

# Example

* [Getting to Know TextKit – #5 – iOS 7](http://www.objc.io/issue-5/getting-to-know-textkit.html "Getting to Know TextKit – #5 – iOS 7")
* [objcio/issue-5-textkit](https://github.com/objcio/issue-5-textkit "objcio/issue-5-textkit")

----

* 上にベースとなるUITextView(NSTextStorageもViewから)
* 下に2枚のUITextViewと対となるNSTextContainerが2つ

![gif](http://gyazo.com/d463249736bdd3524d8536372d99c21c.gif)

----

![NSTextContainer multi](https://www.monosnap.com/image/lNBULtE0fyjhWBlJCH0h6xQ9E.png)

----

## 一つのデータで複数の描画

* NSLayoutManager は 上下1枚づつで2枚ある
	* それぞれが参照する NSTextStorage は同じもの
	* つまり、NSTextStorageを変更すれば、上下のViewに入るテキストも同時に変わる
* 1つのテキストデータを使って、複数のUITextViewに対して描画を行える
	* 描画するの領域は NSTextContainer で決定出来る
* CSS [Regions](http://html.adobe.com/jp/webplatform/layout/regions/ "領域 | レイアウト | Adobe &amp; HTML")と似た感じ

----

## NSTextContainerの``exclusionPaths``

![NSTextContainer](http://gyazo.com/71e0478d2f1f0db9b32b3979c23b3a57.gif)

----

# 参考

* [Getting to Know TextKit – #5 – iOS 7](http://www.objc.io/issue-5/getting-to-know-textkit.html "Getting to Know TextKit – #5 – iOS 7")
* [iOS 6 By Tutorials | Ray Wenderlich](http://www.raywenderlich.com/store/ios-6-by-tutorials "iOS 6 By Tutorials | Ray Wenderlich")
* [Text Programming Guide for iOS: Using Text Kit to Draw and Manage Text](https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/CustomTextProcessing/CustomTextProcessing.html "Text Programming Guide for iOS: Using Text Kit to Draw and Manage Text")
* [新しいCSSの仕様を色々調べてみた](http://www.slideshare.net/hiromitsuuuuu/html5jbigginercss3newspec "新しいCSSの仕様を色々調べてみた")