# 最近のASTパーサの動き

-----

# 自己紹介

![right](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

## azu
## @[azu_re](https://twitter.com/azu_re)
###  [Web scratch], [JSer.info]


[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----
# [Esprima](http://esprima.org/ "Esprima")

- Owner: [@ariya](https://github.com/ariya "ariya")
- Spidermonkey [Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API "Parser API")のASTを元に実装したJavaScriptパーサ
- JavaScriptパーサのデファクト的な立ち位置

-----
# Esprimaの問題

- Spidermonkey AST自体にはES6等の対応がない(ES6はまだだったので)
- Harmony Branchで実装FirstでES6対応をやっていた
	- 微妙にパーサ間でES6のASTに齟齬がでてきた
- 加えて[@ariya](https://github.com/ariya "ariya")が忙しいので対応に遅れがでてきた
- ([@ariya](https://github.com/ariya "ariya")は後述するShift ASTを推奨する方向)

-----

# [Esprima-FB](https://github.com/facebook/esprima "Esprima-FB")

- Owner: [Facebook](https://github.com/facebook "Facebook")
- JSX/FlowTypeサポート
- Esprima/Harmony Branchのfork
	-  Esprima/HarmonyへContributeしてる
- ECMAScript6についても一部サポート

-----

# [espree](https://github.com/eslint/espree "eslint/espree")

------


# [espree](https://github.com/eslint/espree "eslint/espree")

- Owner: [ESLint](http://eslint.org/ "ESLint")
- [ESLint](http://eslint.org/ "ESLint")プロジェクトの一つ
- Esprima(not Harmony branch)のfork
- 目的
	- ECMAScript 6のopt-inサポート
		- 対応する機能を`ecmaFeatures`で指定出来る
	- JSXのオプショナルサポート

----

# espree進捗

- [Add ECMAScript 6 features · Issue #10 · eslint/espree](https://github.com/eslint/espree/issues/10 "Add ECMAScript 6 features · Issue #10 · eslint/espree")
- Esprima-FB >= espree > Shift-ASTという感じの進捗

------

# [FAQ](https://github.com/eslint/espree#frequently-asked-questions "Frequently Asked Questions") of espree | Esprima

- Why Esprima fork?
	- Esprimaの進捗が遅い
	- Bug登録とかしたけど、反応がなかった

>I've also been filing bugs on the Esprima bug tracker and getting no updates and no indication if a fix is forthcoming. 
-- [Investigate supporting ES6/JSX · Issue #1291 · eslint/eslint](https://github.com/eslint/eslint/issues/1291#issuecomment-67259498 "Investigate supporting ES6/JSX · Issue #1291 · eslint/eslint")


-----

# [FAQ](https://github.com/eslint/espree#frequently-asked-questions "Frequently Asked Questions") of espree | Esprima-fb

- Why don't  use Esprima-fb fork?
	-  Esprima-fbはharmoneyベース
	- Harmony由来の問題があるのでパス(Esprimaの進捗の問題を引きずってしまう)
	- [Is there a reason why you don&#39;t contribute to esprima-fb](https://github.com/eslint/espree/issues/12 "Is there a reason why you don&#39;t contribute to esprima-fb · Issue #12 · eslint/espree")

-----

# [FAQ](https://github.com/eslint/espree#frequently-asked-questions "Frequently Asked Questions") of espree | acorn

- Why don't use Acorn?
	- ESLintはASTだけではなく詳細度の高い`token`にも依存してる
	- `tokens`はAcornとEsprimaで大きく異なるためパス
	- (コメントとかwhite spaceみたいなASTでは表現できない部分の違い)

------

# (Why not use Shift AST)?

- (個人の感想 :thought_balloon:)
	- 今はmoving forwardを優先
	- Shift ASTもまだES6対応は未完ではある
	- Acorn-jsx or Esprima-fbで消耗したので、自分でコントロール出来る場所にあったほうがいいという結論?
	- Shift ASTの完成度が変わるとespreeの動きがあるかも?

-----

# :memo: espree

- acorn [Pluggable extensions support? · Issue #168 · marijnh/acorn](https://github.com/marijnh/acorn/issues/168 "Pluggable extensions support? · Issue #168 · marijnh/acorn")
- jQuery Fundation [jQuery Foundation adopts Esprima · Issue #42 · eslint/espree](https://github.com/eslint/espree/issues/42 "jQuery Foundation adopts Esprima · Issue #42 · eslint/espree")
- Start point: [Investigate supporting ES6/JSX · Issue #1291 · eslint/eslint](https://github.com/eslint/eslint/issues/1291 "Investigate supporting ES6/JSX · Issue #1291 · eslint/eslint")
	- espree & Shift AST

-----

# Shift AST

- [Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification") by Sharp Security
- Sharp Securityは[@ariya](https://github.com/ariya "ariya")/[@michaelficarra](https://github.com/michaelficarra "michaelficarra")がいる会社
- [Shape Security Labs: Announcing the Shift JavaScript AST Specification](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html)
 

-----

# Shift Family

### Create

* [Shift Parser](https://github.com/shapesecurity/shift-parser-js)
* [Shift AST Constructors](https://github.com/shapesecurity/shift-ast-js)
* [Shift-SpiderMonkey Converter](https://github.com/shapesecurity/shift-spidermonkey-converter-js)
	* SpiderMonkey AST -> Shift AST

----

# Shift Family

### Transform

* [Shift Reducer](https://github.com/shapesecurity/shift-reducer-js)
* [Shift Code Generator](https://github.com/shapesecurity/shift-codegen-js)

-----

# Shift Family

### Analyse

* [Shift Validator](https://github.com/shapesecurity/shift-validator-js)
* [Shift Scope Analyzer](https://github.com/shapesecurity/shift-scope-js)

-----

# Shift AST & ES6

- [add support for ES6 · Issue #8 · shapesecurity/shift-parser-js](https://github.com/shapesecurity/shift-parser-js/issues/8 "add support for ES6 · Issue #8 · shapesecurity/shift-parser-js") (Implementation)
- まだES6の仕様策定も完全ではない
- [Shape Security Labs: A Technical Comparison of the Shift and SpiderMonkey AST Formats](http://engineering.shapesecurity.com/2015/01/a-technical-comparison-of-shift-and.html "Shape Security Labs: A Technical Comparison of the Shift and SpiderMonkey AST Formats")

-----

# Thought on Shift AST

- Ariya/Esprima
	- > This is not in the plan anymore. For the alternative syntax tree, check out https://github.com/shapesecurity/shift-spec.
	- Esprimaの後継はShift AST


-----
# Shift ASTトリビア

- 元の名前は"LaserBat AST"
- [change name to laserbat-spidermonkey-converter-js · Issue #1 · shapesecurity/shift-spidermonkey-converter-js](https://github.com/shapesecurity/shift-spidermonkey-converter-js/issues/1 "change name to laserbat-spidermonkey-converter-js · Issue #1 · shapesecurity/shift-spidermonkey-converter-js")
- [Renamed to Shift AST by dwightmulcahy · Pull Request #4 · shapesecurity/shift-java](https://github.com/shapesecurity/shift-java/pull/4 "Renamed to Shift AST by dwightmulcahy · Pull Request #4 · shapesecurity/shift-java")

-----

# [acorn](https://github.com/marijnh/acorn "acorn")

-----

# [acorn](https://github.com/marijnh/acorn "acorn")

- Owner: [@marijnh](https://github.com/marijnh "marijnh") (CodeMirror/tern)
- Esprimaとは別起源のJavaScriptパーサ
- ASTレベルではEsprimaだと大体の互換性がある
- Spidermonkey AST + ES6(こっちは空気感的な互換)

-----
# [acorn-jsx](https://github.com/RReverser/acorn-jsx "acorn-jsx") & [acorn-6to5](https://github.com/6to5/acorn-6to5/ "acorn-6to5")

- どちらも6to5の向け(パーサのみ)
	- ジェネレータについては用意してない
	- コンテキストが6to5に優先される
- 仕様とはあまり関わりがない
- :memo:  [Project scope and future · Issue #568 · 6to5/6to5](https://github.com/6to5/6to5/issues/568 "Project scope and future · Issue #568 · 6to5/6to5")


-----

# jQuery/Esprima?

- Airya -> jQuery Fundationに移管された
- [jQuery Foundation adopts Esprima | Official jQuery Blog](http://blog.jquery.com/2015/01/26/jquery-foundation-adopts-esprima/ "jQuery Foundation adopts Esprima | Official jQuery Blog")

-----

# 今後の見どころ

- jQuery/Esprimaとなった事で開発方式はどうなるか?
	- espree < 方向性が一緒ならばマージ出来るよう協力する
	- [jQuery Foundation adopts Esprima · Issue #42 · eslint/espree](https://github.com/eslint/espree/issues/42 "jQuery Foundation adopts Esprima · Issue #42 · eslint/espree")
- espree, 6to5はプロダクトがあるので開発急いでる感がある
	- Shift AST的な仕様の話にどうやって巻き込むかが大切そう
	- [Haha, Hasbro sending a cease and desist to an open source project would make a good headline.](https://github.com/6to5/6to5/issues/568 "Haha, Hasbro sending a cease and desist to an open source project would make a good headline.")

-----

# 今後の見どころ

- [Shift AST Specification](https://github.com/shapesecurity/shift-spec "Shift AST Specification")
	- 実装と仕様があるのは良い
	- 勢いが少し足りない
	- 他のASTを使ったプロダクトはちょっと勢いを求めてる感じ
	- 他が勢いのまま進んで、振り出しに戻る事ないようなポディションが必要そう

----

# Keep Track of People


- [The list of JavaScript AST-related person.](https://gist.github.com/azu/a44cc817c233c53a496c "The list of JavaScript AST-related person.")
- AST周りに関係ありそうな人たちのリスト