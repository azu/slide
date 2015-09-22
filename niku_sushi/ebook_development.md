# 電子書籍の開発環境

----

# 自己紹介

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"


----

# [JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/ "JavaScript Plugin Architecture")

![fit, book](img/book.png)

----

# [JavaScript Plugin Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/ "JavaScript Plugin Architecture")


## 電子書籍の開発中にやったこと


----

# やりたかったこと

![fit, inline, aim](img/aim.png)


----

# [[Markdown] 電子書籍開発環境 · Issue #42](https://github.com/azu/azu/issues/42 "[Markdown] 電子書籍開発環境 · Issue #42 · azu/azu")

- Markdown/文章のLint
- インラインコードのLint
- ファイルのincludeするMarkdown拡張
- Markdown to HTML or PDF
- エディタ

----

# [[Markdown] 電子書籍開発環境 · Issue #42](https://github.com/azu/azu/issues/42 "[Markdown] 電子書籍開発環境 · Issue #42 · azu/azu")

- Markdown/文章のLint => [textlint](https://github.com/azu/textlint "textlint")
- インラインコードのLint => [ESLint](http://eslint.org/ "ESLint")
- ファイルのincludeするMarkdown拡張 => [GitBook](https://www.gitbook.com/)+プラグイン
- Markdown to HTML or PDF => [GitBook](https://www.gitbook.com/)
- エディタ => [GitBook Editor](https://www.gitbook.com/editor)

-----

# [GitBook](https://www.gitbook.com/)

![fit, gitbook](img/gitbook.jpg)

-----

# [GitBook](https://www.gitbook.com/)

- Markdownで電子書籍を書けるツール/プラットフォーム
- [GitbookIO/gitbook](https://github.com/GitbookIO/gitbook "GitbookIO/gitbook")
	- Markdown -> HTML/PDF/Epubの変換
	- 各章を書いてSUMMARY.mdにリンクを書くだけで作れる
	- プラグインで拡張できる

-----
# [gitbook.com](https://www.gitbook.com)

- GitBookの公開プラットフォーム
- とても良く出来てる
- HTML/PDF/Epubの自動生成、コミット毎プレビュー、販売/寄付、Oraganization、アップデート通知、オンラインエディタ
- GitHubとDeployment APIでhookして自動的に反映できる


-----

# ✔ [GitBook連携の設定 · Issue #4 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/4 "GitBook連携の設定 · Issue #4 · azu/JavaScript-Plugin-Architecture")

-----

# GitBookの構造

![fit, right](img/summary.png)

```
.
├── README.md
├── SUMMARY.md
└── book.json
```

- `SUMMARY.md` から各章へのMarkdownファイルへリンク
- `gitbook build` => 静的なHTMLが生成される

-----

# JavaScript Plugin Architectureの構造

```
├── README.md
├── SUMMARY.md
├── book.json
├── src(*.js)
│   └── jQuery
├── ja (*.md, *.png 文章関係)
│   └── jQuery
├── test (*-test.js)
│   └── jQuery
└── package.json
```

----

# ✔ [プロジェクト構造について · Issue #5 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/5 "プロジェクト構造について · Issue #5 · azu/JavaScript-Plugin-Architecture")

----


# [textlint](https://github.com/azu/textlint "textlint")

- Markdownやテキスト向けのLintツール
- テキスト版ESLintツール
	- ルールをJavaScriptで簡単に追加できる
- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

----

# textlint rule

- [textlint-rule-max-ten](https://github.com/azu/textlint-rule-max-ten)
	- 一文に利用できる`、`の数をチェックするルール
- [textlint-rule-spellcheck-tech-word](https://github.com/azu/textlint-rule-spellcheck-tech-word)
	- WEB+DB用語統一ルールベースの単語チェックするルール
- [textlint-rule-no-mix-dearu-desumasu](https://github.com/azu/textlint-rule-no-mix-dearu-desumasu)
	- 「ですます」調と「である」調の混在をチェックするルール

----

# textlint rule

- [textlint-rule-no-start-duplicated-conjunction](https://github.com/azu/textlint-rule-no-start-duplicated-conjunction "azu/textlint-rule-no-start-duplicated-conjunction")
	- 「しかし、〜　。 しかし、〜。」など同じ接続詞が連続してないかをチェックするルール
- textlintのルールは以下にまとめられている
	- [Collection of textlint rule · azu/textlint Wiki](https://github.com/azu/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · azu/textlint Wiki")

-----

# プロジェクト固有の表記揺れ

- 表記揺れのチェックに汎用的な辞書/ルールはない
	- 全ての表現が一意ならそもそも表記揺れなんて起きない
	- 書籍の中で一貫した表現を保証するためのもの
- プロジェクト固有のルールで表記揺れのチェックが必要

-----

# [textlint-rule-prh](https://github.com/azu/textlint-rule-prh "textlint-rule-prh")


- [vvakame/prh](https://github.com/vvakame/prh "vvakame/prh") を利用したtextlint rule
- yamlでルールを簡単に追加できる(正規表現や大文字小文字などよくある表記揺れは簡単に書ける仕組みがある)

```
rules:
  - expected: プラグインアーキテクチャ
    pattern:
      - プラグイン機構
      - プラグインのアーキテクチャ
```

-----

# [textlint-rule-prh](https://github.com/azu/textlint-rule-prh "textlint-rule-prh")


- textlint-rule-prhについては詳しくは以下の記事を参照
- [textlint + prhで表記ゆれを検出する | Web Scratch](http://efcl.info/2015/09/14/textlint-rule-prh/ "textlint + prhで表記ゆれを検出する | Web Scratch")


-----

# なぜプロジェクト毎に表記揺れルール？

- typoなどを見つけた場合にルールを追加して**から**修正できる
- [**C**onnectに統一しよう · Issue #48 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/48 "**C**onnectに統一しよう · Issue #48 · azu/JavaScript-Plugin-Architecture")
	- リグレッションテストと同じ意味合い
- 表記がルールとして明文化できるので[Contribute](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/CONTRIBUTING.md "Contribute")しやすい

-----

# GitBook + textlint

- GitBookは`SUMMARY.md`から各章の.mdへのリンクがある
- [azu/gitbook-summary-to-path](https://github.com/azu/gitbook-summary-to-path "azu/gitbook-summary-to-path")
- SUMMARY.mdに書かれているファイルを`textlint`する

```sh
$ summary-to-path SUMMARY.md | xargs textlint
# 全ての章がtextlintでLintできる
```

----

# ✔ [textlintの導入 · Issue #1 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/1 "textlintの導入 · Issue #1 · azu/JavaScript-Plugin-Architecture")

-----

# コードのLint

- コードを[ESLint](http://eslint.org/ "ESLint")でチェックしたい
- 技術書に載せるコードを書く方法は2種類
	- コードを外部ファイルとして書いて読み込む
	- インラインにコードを書く

----
# 外部ファイルのコード

- [azu/gitbook-plugin-include-codeblock](https://github.com/azu/gitbook-plugin-include-codeblock "azu/gitbook-plugin-include-codeblock")
- いい感じに外部ファイルをCodeBlockとして読み込むGitBookプラグイン


```
[include, test.js](fixtures/test.js)
```

と書けば、Code Blockとして展開される。
=> GitHub上ではただのコードへのリンクとなる(Fallback)


----

# 外部ファイルのコードをLint

- ESLintを使い単純にJavaScriptとしてLintを通す


## ✔ [ESLintの導入 · Issue #6 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/6 "ESLintの導入 · Issue #6 · azu/JavaScript-Plugin-Architecture")


----

# インラインコードのLint

	これは`a`という変数を定義している。
	```js
	var a = 1;
	```

- インラインに書かれているコードに対してもLintを行う
- インラインコードは実行されないのでtypoし易い

----

# インラインコードのLint

- [eslint/eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown "eslint/eslint-plugin-markdown")を利用
- ESLintのプラグインとしてインラインコードをLintできる
	- `js`や`javascript`といったCode Blockに対してLint


----

# インラインコードのLintの問題

- 問題: インラインコードは実行できないのが正常というケース！
- 説明するためにコードの一部を取り出す場合
	- コードとしては実行できない
	- コードブロックのみで見ると変数が未定義となってる
- => インラインコード専用のゆるいルールを作る


----

# インラインコード専用のゆるいルール

- 設定ファイルを分けることで解決！
- 通常のコード用: [.eslintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/.eslintrc ".eslintrc")
- インラインコード用: [.md.eslintrc](https://github.com/azu/JavaScript-Plugin-Architecture/blob/master/.md.eslintrc ".md.eslintrc")
	- .eslintrcを継承
	- `no-undef`や`no-unused-vars`などを無効化

----

# ✔ [ESLintでインラインコードのLint · Issue #7 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/7 "ESLintでインラインコードのLint · Issue #7 · azu/JavaScript-Plugin-Architecture")

----


# エディタ

- 殆ど素のMarkdownなので好きなエディタが使える
- GitBookの公式エディタもある
- WebStorm、Atom、Markdownエディタなどでよい


----

# WebStorm + File Watch + textlint


![inline](https://gyazo.com/28cf940bfb8e64e5efd6d1f969a2a967.gif)

-----

# Atom + [1000ch/linter-textlint](https://github.com/1000ch/linter-textlint "1000ch/linter-textlint")

![fit,inline, linter-textlint](https://gyazo.com/af14634690a0515c2c5ce56bd2fd6431.gif)

-----

# CONTRIBUTING.md

- [Contributing Guidelines](https://github.com/blog/1184-contributing-guidelines "Contributing Guidelines")を書いてみる
- 書こうと思うと、どういう手順でプレビューできるか、修正するか、文章を書いていくかの整理が必要になる
- 自分のためでもあり、Contributingする人のためになる


----


## ✔ [CONTRIBUTING.md · Issue #12 · azu/JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture/issues/12 "CONTRIBUTING.md · Issue #12 · azu/JavaScript-Plugin-Architecture")


----


# Issue/Pull Request駆動

![fit, pulse](img/pulse.png)

----

# Issue/Pull Request駆動

- 文章の正しさは人により異なるので根拠を残す
	- コードと違って曖昧成分が多い
	- 文章の自動チェックを入れた理由を残す
- Pull Request駆動で文章もCIを通してから
	- [検証済みマージ](http://d.hatena.ne.jp/kkawa/20120604/p1 "検証済みマージ") - マージされるとGitBookに自動反映


-----

# Issue駆動


- Issueで設計をしてから文章を書く
- 気になったことはとりあえずIssueとして置いておく
- [Githubで書く電子書籍](https://azu.github.io/slide/individual/ "Githubで書く電子書籍")