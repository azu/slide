# どうやって情報をたどっていくか

## ES7 TypedObjectを例に

-----

# [Typed Objects](https://github.com/dslomov-chromium/typed-objects-es7 "Typed Objects")

- [ES6+カジュアルトーク](http://connpass.com/event/9113/ "ES6+カジュアルトーク")向けにES7について調べてた
- [Typed Objects](https://github.com/dslomov-chromium/typed-objects-es7 "Typed Objects") というものが良くわからなかった
- 詳しく調べた流れ :blowfish:

----

# ES7の出発点は[rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")

----

#  ES7で提案されてる仕様は[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")に載ってる

----

# [dslomov-chromium/typed-objects-es7](https://github.com/dslomov-chromium/typed-objects-es7 "dslomov-chromium/typed-objects-es7") 

## GitHubの方は7ヶ月前に何か止まってる感じ

----

# 7ヶ月前に一番ちかいTC39 MTGは2014年4月

-----

# [agendas/04.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2014/04.md "agendas/04.md at master · tc39/agendas")のアジェンダにTyped Objectsの議論がある

-----

# [tc39-notes/es6/2014-04 at master · rwaldron/tc39-notes](https://github.com/rwaldron/tc39-notes/tree/master/es6/2014-04 "tc39-notes/es6/2014-04 at master · rwaldron/tc39-notes")に何か書いてあるはず！！

-----

# 一瞬出てきて何も書かれてない… 

-----

# だけど仕様の中心人物は分かった

## Dmitry Lomov, Niko Matsakis さんの二人

-----

# [fit] ググる!

-----

# [Nikoさんのブログ](http://smallcultfollowing.com/babysteps/ "Baby Steps")を見つけた! :sunglasses:

-----

# スバリな記事が4月頃にあった!

## [Typed Objects Status Report - Baby Steps](http://smallcultfollowing.com/babysteps/blog/2014/04/01/typed-objects-status-report/ "Typed Objects Status Report - Baby Steps")

-----

# [論文](http://smallcultfollowing.com/babysteps/pubs/2014.04.01-TypedObjects.pdf "2014.04.01-TypedObjects.pdf")を出して基本的な[Issue](https://bugzilla.mozilla.org/show_bug.cgi?id=973238 "973238 – Implement structural arrays for typed objects")を立てたとある

------

# 関連するIssue

![right](http://monosnap.com/image/atBHSUIeKSJFhSB5iiUzCCrdtc1YmL.png)

------

# 関連Issue [578700 – (harmony:typedobjects) [meta] Harmony typed objects (nés binary data)](https://bugzilla.mozilla.org/show_bug.cgi?id=578700 "578700 – (harmony:typedobjects) [meta] Harmony typed objects (nés binary data)") 

## ちょっとづつやってるんだなーという感じがわかった

------

# 答え合わせ

------

# [JavaScript documentation status - The MDN project | MDN](https://developer.mozilla.org/en-US/docs/MDN/Doc_status/JavaScript "JavaScript documentation status - The MDN project | MDN")に載ってた

-----

# 教訓

- Mozilla みたいな企業なら進捗は書いてある
- 仕様の中心人物を探す
	- リポジトリならOwnerを見ればいい
- オープンなものなら何らかのアピールはしてるはず
- ちゃんと検索していけばたどり着ける！