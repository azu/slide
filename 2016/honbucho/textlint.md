# 最近のtextlint !

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

-----

# 最近のtextlint


-----

# [textlint 7.0リリース、フィルタールールの追加 | Web Scratch](http://efcl.info/2016/06/30/textlint7.0/ "textlint 7.0リリース、フィルタールールの追加 | Web Scratch")

-----

# [Filter Rule](https://github.com/textlint/textlint/blob/master/docs/filter-rule.md)

- 無視するためのルールを書けるようになった
- [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments")

	<!-- textlint-disable -->

	この部分はtextlintのチェックでエラーがあっても無視される

	<!-- textlint-enable -->

------
# Filter Rule

- textlintは無視する領域を決めるAPIを提供するだけ
	- `shouldInogre(range)`
- 何を無視するのかはプラガブルなルールとして実装する
	- [textlint-filter-rule-node-types](https://github.com/textlint/textlint-filter-rule-node-types "textlint-filter-rule-node-types")
	- [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments")
		- 無視するためのコメント記法を提供する

------


![fit, ast-explorer for textlint](https://raw.githubusercontent.com/textlint/textlint/master/docs/resources/ast-explorer.png)

-----

# [AST explorer for textlint](https://textlint.github.io/astexplorer/ "AST explorer for textlint")


- AST explorerのtextlint版を作った
- textlint(がパースした結果)のASTを見たり、ルールをその場で作れる
- ルールを作りたい人はここみて書けばいい

------

# [技術書向けのルールセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)

- [js-primer](https://github.com/asciidwango/js-primer "js-primer")や[JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture "JavaScript Plugin Architecture")で使ってるルールをまとめたもの
- 技術文書向けに簡潔に書くためのルールセット
- [技術文書を書くためのtextlint校正ルールセット | Web Scratch](http://efcl.info/2016/07/13/textlint-rule-preset-ja-technical-writing/ "技術文書を書くためのtextlint校正ルールセット | Web Scratch")

-----

# [スペース周りのルールセット](https://github.com/textlint-ja/textlint-rule-spacing)

- 半角文字と全角文字の間にスペース入れない
- インラインコードの周りにスペースを入れる?
- カタカナ語間は全角スペース入れない
- かっこの外側、内側ともにスペースを入れない
- 感嘆符、疑問符の後ろに続くスペース
- etc....

------

# スペース周りのルールセット

- こんなの人間が気にするのは時間の無駄
- => [textlint-rule-preset-ja-spacing](https://github.com/textlint-ja/textlint-rule-spacing "textlint-rule-preset-ja-spacing")
- ESLintにもスペース周りのルールがある
	- けど場所がバラバラで分かりにくい
- プリセットにしてまとめた

----

# textlint-ja

- [textlint-ja/textlint-ja: textlintの日本語コミュニティ](https://github.com/textlint-ja/textlint-ja "textlint-ja/textlint-ja: textlintの日本語コミュニティ")
- 日本語で話せるコミュニティ


-----

# Gitter

- [textlint-ja/textlint-ja - Gitter](https://gitter.im/textlint-ja/textlint-ja "textlint-ja/textlint-ja - Gitter")


-----