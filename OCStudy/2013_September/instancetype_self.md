# instacetype と self

-----

# instancetype型

* 返り値のid型の推論
* ``id``型の代わりにメソッドの返り値に指定する
* メソッドの返り値以外の場所では使用できない

* [Clang Language Extensions — Clang 3.4 documentation](http://clang.llvm.org/docs/LanguageExtensions.html "Clang Language Extensions — Clang 3.4 documentation")


----

## instancetypeの例

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">A</span>
<span class="k">+</span> <span class="p">(</span><span class="n">instancetype</span><span class="p">)</span><span class="nf">constructAnA</span><span class="p">;</span>
<span class="k">@end</span>
</pre></div>

は、以下と同じになる

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">A</span>
<span class="k">+</span> <span class="p">(</span><span class="n">A</span> <span class="o">*</span><span class="p">)</span><span class="nf">constructAnA</span><span class="p">;</span>
<span class="k">@end</span>
</pre></div>

-----

## protocolでも

<div class="highlight"><pre><span class="k">@protocol</span> <span class="nc">ConvenienceConstructor</span>

<span class="k">+</span> <span class="p">(</span><span class="n">instancetype</span><span class="p">)</span><span class="nf">defaultObject</span><span class="p">;</span>

<span class="k">@end</span>

<span class="k">@interface</span> <span class="nc">Clazz</span> : <span class="nc">NSObject</span> <span class="o">&lt;</span><span class="n">ConvenienceConstructor</span><span class="o">&gt;</span>

<span class="k">@end</span>
</pre></div>

* [Objective-Cにおけるinstancetype型について - Takebayashi.Asia](http://takebayashi.asia/blog/2012/02/19/instancetype-in-objective-c "Objective-Cにおけるinstancetype型について - Takebayashi.Asia")

-----

## instancetype継承

* 継承した時に、 ``[ChildZ defaultObject]`` が ``ChildZ *``を返せる

<div class="highlight"><pre><span class="k">@interface</span> <span class="nc">Clazz</span> : <span class="nc">NSObject</span>
<span class="k">+</span> <span class="p">(</span><span class="n">instancetype</span><span class="p">)</span><span class="nf">defaultObject</span><span class="p">;</span>
<span class="k">@end</span>

<span class="k">@interface</span> <span class="nc">ChildZ</span> : <span class="nc">Clazz</span>
<span class="k">@end</span>
</pre></div>

-----

## 自分自身のallloc

* ``KnowledgeModel`` クラス

Bad : 

<div class="highlight"><pre><span class="k">+</span> <span class="p">(</span><span class="n">instancetype</span><span class="p">)</span><span class="nf">modelObjectWithDictionary:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span><span class="nv">dict</span>
<span class="p">{</span>
    <span class="kt">id</span> <span class="n">instance</span> <span class="o">=</span> <span class="p">[[</span><span class="n">Knowledge</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">initWithDictionary</span><span class="o">:</span><span class="n">dict</span><span class="p">];</span>
    <span class="k">return</span> <span class="n">instance</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>


Good :

<div class="highlight"><pre><span class="k">+</span> <span class="p">(</span><span class="n">instancetype</span><span class="p">)</span><span class="nf">modelObjectWithDictionary:</span><span class="p">(</span><span class="n">NSDictionary</span> <span class="o">*</span><span class="p">)</span><span class="nv">dict</span>
<span class="p">{</span>
    <span class="kt">id</span> <span class="n">instance</span> <span class="o">=</span> <span class="p">[[[</span><span class="n">self</span> <span class="n">class</span><span class="p">]</span> <span class="n">alloc</span><span class="p">]</span> <span class="n">initWithDictionary</span><span class="o">:</span><span class="n">dict</span><span class="p">];</span>
    <span class="k">return</span> <span class="n">instance</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>

Example code from [JSON Accelerator](http://www.nerdery.com/json-accelerator "JSON Accelerator")

----


# typeof(self)

* 自分自身のクラス型のweak selfを取得する例

<div class="highlight"><pre><span class="n">__weak</span> <span class="n">typeof</span><span class="p">(</span><span class="n">self</span><span class="p">)</span> <span class="n">wself</span> <span class="o">=</span> <span class="n">self</span><span class="p">;</span>
</pre></div>

* Blocksの循環参照対策に便利
