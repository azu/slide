# deprecated! deprecated!

-----

# 非推奨となったメソッド

* iOS6-7あたりで非推奨となったメソッドやプロパティ


<a href="http://www.flickr.com/photos/29346605@N08/10479230176/" title="use is deprecated for this architecture #raspberrypi #raspbian #linux #retinatattoo by consciousdreams_99, on Flickr"><img src="http://farm4.staticflickr.com/3819/10479230176_a88f298da4.jpg" width="500" height="500" alt="use is deprecated for this architecture #raspberrypi #raspbian #linux #retinatattoo"></a>

-----

# dealloc

* dealloc を使いましょう

<div class="highlight"><pre><span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">viewWillUnload</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">5</span><span class="n">_0</span><span class="p">,</span><span class="mi">6</span><span class="n">_0</span><span class="p">);</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">viewDidUnload</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">3</span><span class="n">_0</span><span class="p">,</span><span class="mi">6</span><span class="n">_0</span><span class="p">);</span> <span class="c1">// Called after the view controller&#39;s view is released and set to nil. For example, a memory warning which causes the view to be purged. Not invoked as a result of -dealloc.</span>
</pre></div>


-----

# modal view

* ``@property(nonatomic,readonly) UIViewController *presentedViewController`` を使いましょう

<div class="highlight"><pre><span class="c1">// This property has been replaced by presentedViewController.</span>
<span class="k">@property</span><span class="p">(</span><span class="n">nonatomic</span><span class="p">,</span><span class="n">readonly</span><span class="p">)</span> <span class="n">UIViewController</span> <span class="o">*</span><span class="n">modalViewController</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">6</span><span class="n">_0</span><span class="p">);</span>
</pre></div>

------

# display/dismiss modal

* それぞれ complete 付きの方を使いましょう

<div class="highlight"><pre><span class="c1">// Display another view controller as a modal child. Uses a vertical sheet transition if animated.This method has been replaced by presentViewController:animated:completion:</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">presentModalViewController:</span><span class="p">(</span><span class="n">UIViewController</span> <span class="o">*</span><span class="p">)</span><span class="nv">modalViewController</span> <span class="nf">animated:</span><span class="p">(</span><span class="kt">BOOL</span><span class="p">)</span><span class="nv">animated</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">6</span><span class="n">_0</span><span class="p">);</span>

<span class="c1">// Dismiss the current modal child. Uses a vertical sheet transition if animated. This method has been replaced by dismissViewControllerAnimated:completion:</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">dismissModalViewControllerAnimated:</span><span class="p">(</span><span class="kt">BOOL</span><span class="p">)</span><span class="nv">animated</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">6</span><span class="n">_0</span><span class="p">);</span>
</pre></div>

-----

# replace

	replace
	[self\s+dismissModalViewControllerAnimated:(YES|NO)\];
	to:
	[self dismissViewControllerAnimated:$1 completion:nil];

	replace: 
	\[self\s+presentModalViewController:(\w+)\s+animated:(YES|NO)\];
	to:
	[self presentViewController:$1 animated:$2 completion:nil];


-----

# UIStatuBar

<div class="highlight"><pre><span class="k">typedef</span> <span class="nf">NS_ENUM</span><span class="p">(</span><span class="n">NSInteger</span><span class="p">,</span> <span class="n">UIStatusBarStyle</span><span class="p">)</span> <span class="p">{</span>
    <span class="n">UIStatusBarStyleDefault</span>                                     <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="c1">// Dark content, for use on light backgrounds</span>
    <span class="n">UIStatusBarStyleLightContent</span>     <span class="n">NS_ENUM_AVAILABLE_IOS</span><span class="p">(</span><span class="mi">7</span><span class="n">_0</span><span class="p">)</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span> <span class="c1">// Light content, for use on dark backgrounds</span>
    
    <span class="n">UIStatusBarStyleBlackTranslucent</span> <span class="n">NS_ENUM_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">7</span><span class="n">_0</span><span class="p">,</span> <span class="s">&quot;Use UIStatusBarStyleLightContent&quot;</span><span class="p">)</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span>
    <span class="n">UIStatusBarStyleBlackOpaque</span>      <span class="n">NS_ENUM_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">7</span><span class="n">_0</span><span class="p">,</span> <span class="s">&quot;Use UIStatusBarStyleLightContent&quot;</span><span class="p">)</span> <span class="o">=</span> <span class="mi">2</span><span class="p">,</span>
<span class="p">};</span>
</pre></div>

----

# UIBarStyle

* StatusBarと同じ

<div class="highlight"><pre><span class="k">typedef</span> <span class="nf">NS_ENUM</span><span class="p">(</span><span class="n">NSInteger</span><span class="p">,</span> <span class="n">UIBarStyle</span><span class="p">)</span> <span class="p">{</span>
    <span class="n">UIBarStyleDefault</span>          <span class="o">=</span> <span class="mi">0</span><span class="p">,</span>
    <span class="n">UIBarStyleBlack</span>            <span class="o">=</span> <span class="mi">1</span><span class="p">,</span>
    
    <span class="n">UIBarStyleBlackOpaque</span>      <span class="o">=</span> <span class="mi">1</span><span class="p">,</span> <span class="c1">// Deprecated. Use UIBarStyleBlack</span>
    <span class="n">UIBarStyleBlackTranslucent</span> <span class="o">=</span> <span class="mi">2</span><span class="p">,</span> <span class="c1">// Deprecated. Use UIBarStyleBlack and set the translucent property to YES</span>
<span class="p">};</span>
</pre></div>

----

# UIButton

* deprecated属性はついてないけど、``UIButtonTypeRoundedRect`` はなくなりました

<div class="highlight"><pre><span class="n">UIButtonTypeRoundedRect</span> <span class="o">=</span> <span class="n">UIButtonTypeSystem</span><span class="p">,</span>   <span class="c1">// Deprecated, use UIButtonTypeSystem instead</span>
</pre></div>

------

# UIFont

* ``minimumScaleFactor`` を使う

<div class="highlight"><pre><span class="k">@property</span><span class="p">(</span><span class="n">nonatomic</span><span class="p">)</span> <span class="n">CGFloat</span> <span class="n">minimumFontSize</span> <span class="n">NS_DEPRECATED_IOS</span><span class="p">(</span><span class="mi">2</span><span class="n">_0</span><span class="p">,</span> <span class="mi">6</span><span class="n">_0</span><span class="p">);</span> <span class="c1">// NOTE: deprecated - use minimumScaleFactor. default is 0.0</span>
</pre></div>

------

# NSString

* UILineBreakMode
	* NSLineBreakMode へ移行
* UITextAlignment
	* NSTextAlignment へ移行

fontを使うやつは ``NSAttributedString`` を使うものへ移行

	sizeWithFont:
	drawAtPoint:withFont:
	sizeWithFont:
	drawInRect:withFont:

----

## Use deprecated

* Availble Xcode5(iOS 7 SDK)
* 自分で非推奨属性をつける

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">LegacyClass</span> : <span class="nc">NSObject</span>
<span class="k">-</span> <span class="p">(</span><span class="kt">void</span><span class="p">)</span><span class="nf">attendDeathMarch</span> <span class="n">__deprecated_msg</span><span class="p">(</span><span class="s">&quot;this is deprecated&quot;</span><span class="p">);</span>
<span class="k">@end</span>
</pre></div>


* [Objective-C - プロパティやメソッドを非推奨にしてビルド時に警告メッセージを出す - Qiita [キータ]](http://qiita.com/laiso/items/e22e35e9b7a03fc39381 "Objective-C - プロパティやメソッドを非推奨にしてビルド時に警告メッセージを出す - Qiita [キータ]")

-----