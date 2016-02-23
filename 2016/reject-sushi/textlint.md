
# 3分でわかるtextlint

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----


# [textlint](http://textlint.github.io/)

- 自然言語を扱うLintツール
- MarkdownやHTML、テキストファイルを扱える
- ファイルをASTとしてパースするため誤検知しない

----

![online](img/textlint.png)


----

## オンラインデモ


- [textlint.github.io/](http://textlint.github.io/)
- JavaScript(Node.js)で書かれているので当然ブラウザでも動かせる
- サイトはDeku v2 + Redux + SUIT CSS
	- Reduxを理解するならDekuと合わせて使ったほうが簡単
- CodeMirrorプラグイン
	- [azu/codemirror-textlint: CodeMirror with textlint](https://github.com/azu/codemirror-textlint "azu/codemirror-textlint: CodeMirror with textlint")

-----

## 英語向けルール

- [textlint-rule-rousseau](https://github.com/azu/textlint-rule-rousseau "textlint-rule-rousseau")
	- 英文法の簡易チェック
- [textlint-rule-alex](https://github.com/azu/textlint-rule-alex "textlint-rule-alex")
	- ポリティカルコネストな用語のチェック

-----

## 日本語向けルール

- [textlint-rule-preset-japanese](https://github.com/azu/textlint-rule-preset-japanese "textlint-rule-preset-japanese")
	- 日本語向けルール詰め合わせ
- [textlint-rule-preset-JTF-style](https://github.com/azu/textlint-rule-preset-JTF-style "textlint-rule-preset-JTF-style")
	- JTF日本語標準スタイルガイド


-----

## ルール

- [Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")
- 総ルール数は100ぐらいある
	- プリセットでまとまってるので見かけは少ないめ

-----

## フォーマット


- Markdown
- txt
- HTML
- [Re:VIEW](https://github.com/orangain/textlint-plugin-review "Re:VIEW")

-----

![ast](img/textlint-ast.png)



-----

## Textmate to AST


- [azu/textlint-plugin-asciidoc: WIP](https://github.com/azu/textlint-plugin-asciidoc "azu/textlint-plugin-asciidoc: WIP")
- Textmate bundleはシンタックスハイライトのための定義を持ってる
- 正規表現ベースだけど、よく出来たbundleは必要な部分の解析出来る
	- textlint的に欲しいのは文章部分
- Textmate bundle -> [Microsoft/vscode-textmate](https://github.com/Microsoft/vscode-textmate "2193Microsoft/vscode-textmate") -> tokenはできた
- tokenからASTに組み上げるのは作る必要がある…


-----

# 色々な使い方


- [textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch](http://efcl.info/2016/01/12/textlint-coverage/ "textlintで文章カバレッジレポートを継続的に見ていく | Web Scratch")
	- 文章のコードカバレッジを取る


-----

# 今後

- もっと面白いルールを書ける土壌を作る