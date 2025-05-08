autoscale: true
slidenumbers: true

# 技術書をソフトウェア開発する

## jsprimer の 10 年から学ぶ継続的メンテナンスの技術

---

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://x.com/azu_re)
- Website: [Web scratch](https://efcl.info/), [JSer.info](https://jser.info/)

---

# JavaScript Primer (jsprimer) とは

![jsprimer cover, right, fit](./img/cover-optimized.jpg)

- 約 10 年、6 つのメジャーバージョンを経て更新され続けている JavaScript 入門書
- 書籍版 ([amazon.co.jp/dp/4048931105](https://www.amazon.co.jp/dp/4048931105/)) も販売中
- ウェブ版 ([jsprimer.net](https://jsprimer.net/)) は無料で公開
- GitHub: [asciidwango/js-primer](https://github.com/asciidwango/js-primer)
- 書籍版とウェブ版の内容に違いはなく、オープンソースで開発中

---

## 簡単年表

| ECMAScript | jsprimer                   |
| ---------- | -------------------------- |
| 2015       | 開発開始                   |
| 2016       | ウェブで公開               |
| ...        | ...                        |
| 2019       | v1 / 書籍の第 1 版リリース |
| 2020       | v2                         |
| 2021       | v3                         |
| 2022       | v4 / 書籍の第 2 版リリース |
| 2023       | v5                         |
| 2024       | v6                         |
| 2025       | v7                         |

---

# 本日のテーマ

- **Why:** なぜ jsprimer は始まり、更新され続けるのか？
- **How:** どうやって更新を実現しているのか？
- **Learn:** 技術書を「ソフトウェア開発」することから得られる知見
- **Future:** これからの jsprimer の展望

---

# そもそも: TSkaigi で JavaScript の話をする理由

---

# [fit] `$ node --experimental-strip-types`

^

<!-- erasableSyntaxOnlyについて扱ってるセッション

https://2025.tskaigi.org/talks/yamanoku
https://2025.tskaigi.org/talks/makky12

-->

^ [ts-blank-space](https://bloomberg.github.io/ts-blank-space/)で発見された
^ TypeScript の Design Goal として JavaScript と非互換な機能や変更を入れることはしないようになっています
^ [https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)
^ TypeScript の `erasableSyntaxOnly` や Node.js の `--experimental-strip-types` フラグなどもあり、TypeScript ファイルを JavaScript として直接実行できるようになってきた

---

![fit, strip-type](./img/strip-type.png)

---

![fit, strip-type at code](./img/strip-type-code.png)

---

![fit, strip-type at talk](./img/strip-type-talk.png)

---

# TypeScript から型を取り除けば JavaScript

---

# [fit] `$ tskaigi --experimental-strip-types`

---

# TSKaigi 2025

## TypeScript から 型(の話)を<br>取り除けば JavaScript(の話)が<br>できるカンファレンス

---

# Why: なぜ jsprimer は書かれたのか?

---

## 時代背景 (2015 年頃)

- ECMAScript 2015 (ES6) の登場
- JavaScript の大きな転換期
- ES2015 ベースの現代的な入門書が不足
- 「これ読んでおいて！」と渡せる現代的な書籍が必要

---

# jsprimer の目的

「書き方」「作り方」「学び方」の 3 つの原則に基づく設計

- **書き方**: 基本文法を体系的に学ぶ
- **作り方**: 学んだ知識で実際にアプリを作る
- **学び方**: JavaScript の変化に対応できる素養を身につける

---

# Why: なぜ JSPrimer は更新され続けるのか？

---

# JavaScript は "Living Standard"

- JavaScript の仕様である ECMAScript は毎年更新
- 実行環境 (ブラウザ, Node.js) も進化

---

> 変化に対応できる基礎を身につけるため、書籍自体が変化に対応し続ける必要がある
>
> -- [JavaScript Primer 改訂 2 版をリリースしました！/JavaScript Primer はなぜ更新され続けるのか？ | Web Scratch](https://efcl.info/2023/06/09/jsprimer-v2/)

---

# 技術文書の宿命

> 依存がない静的なコードは時間で変化はしにくい、依存があるアクティブなコードは、コードが変わらなくても依存関係である周りが変化します。そのため 5 年間触っていないコードが、最新の環境ではそのままは動かないのはこれが理由です。
>
> -- Working in Public

---

# 技術書の宿命

- JavaScript 周りのエコシステムは変化し続ける
- エコシステムを扱った書籍は、ものすごい速さで古くなる

---

# Working in Public

> 「The key insight that Jacob Thornton identified is that code has two different states that are worth paying attention to: static state and active state.」¹

(Jacob Thornton が特定した重要な洞察は、コードには注目すべき二つの異なる状態があるということ、それは静的な状態とアクティブな状態です。)

> 「Code in static state is like a commodity. A piece of code published on GitHub today would look exactly the same fifty years from now, even if its author never touches it.」¹

(静的な状態のコードは商品のようなものです。今日 GitHub に公開されたコードは、作者がそれに全く触れなくても、50 年後も全く同じに見えるでしょう。)

---

> 「Active code depends on other things, and other things depend on it for their survival.」¹

(アクティブなコードは他のものに依存し、他のものもそのコードに依存して存続します。)

> 「The problem with active code is that even if your code never changes, everything else around it does.」¹

(アクティブなコードの問題は、たとえあなたのコードが全く変わらなくても、その周囲のすべてが変化することです。)

---

> 「Over time, the code becomes out of sync with its dependencies, and will become incompatible with new versions.」¹

(時間とともに、コードはその依存関係と同期がずれていき、新しいバージョンとの互換性がなくなります。)

> 「This is why code that hasn’t been touched for five years may not run on a current machine without some updates」¹

(これが、5 年間触られていないコードが、最新のマシンではいくつかのアップデートなしには実行できない可能性がある理由です。)

---

# コードの状態と時間経過の課題

- コードには「静的状態」と「アクティブ状態」がある
  - 静的状態: 依存がなく、時間が経っても内容が変わらない
  - アクティブ状態: 外部のライブラリや環境に依存し、周囲の変化に影響される
- アクティブなコードは、依存先のバージョンアップなどで「ズレ」が生じ、動かなくなるリスクが高い
- 動かすには、コードや依存の更新、または当時の環境を再現する必要がある
- 価値を保つには、継続的なメンテナンスが不可欠

---

# 書籍もコードと同じ

- 書籍も「静的状態」と「アクティブ状態」がある
  - 静的状態: 依存がなく、時間が経っても内容が変わらない
  - アクティブ状態: 外部のライブラリや環境に依存し、周囲の変化に影響される
- 書籍が何にも依存してないことはほぼない
  - → アクティブ状態であるが、いかに依存を綺麗に保つがメンテナンス的に重要

---

# 静的な書籍版とアクティブなウェブ版

- ECMAScript 仕様のモデルに真似る:
- **Living Standard**: ウェブ版 ([jsprimer.net](https://jsprimer.net/))
  - 常に最新版を維持
  - GitHub で共同編集
- **Snapshot**: 書籍版
  - 安定版として時々リリース
  - 読みやすさに特化した最適化

---

# How: どうやって更新を実現しているのか？

---

# 1. 変化を前提とした設計

- **スコープ管理:** 「目的ではないこと」を明確化し、**依存**を減らす。
  - ライブラリ解説ではなく、基礎的な言語機能にフォーカス
  - 依存関係の少ないコードを重視
  - [本書の目的 · Issue #103 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/103)

![fit right, no-purpose](./img/no-purpose.png)

---

# 2. 読みやすさを優先する

- 書きやすさよりも、読みやすさを重視
- 更新を継続的に行うには、何度も読む必要がある
- 書くより読む回数の方が多い
- 読むコストを下げる工夫 (構成、表現統一)

^ 圧倒的に読む回数の方が多い
^ 今回の ES2025 の対応でも一度全部読み直して何を削るかを考えた
^ 何度も読むためには、読みやすさを重視する必要がある
^ コードもこれは基本的に同じになると思う
^ 今は、書きやすさは圧倒的に有利になってきているけど、レビューをしていくことで、どこまで削れるかが大事になる

---

# 既知の言葉で未知を説明する

- 既知な情報から未知な情報へと書く[^known-new contract]

> 「"known-new contract"とは、読者がすでに知っていること（以前に提示された情報）を最初に提示してから新しい情報を導入することで、書き手が文章間の結束をどのように達成するかを説明するために使われる言語学的概念である。議論を構築するにしても、情景を描写するにしても、概念を分析するにしても、ある文章から次の文章へと論理的に進行することが重要である。明確な文から文への進行は、読者の集中力を維持し、推論のパターンを容易に追うことを可能にする。」

[^known-new contract]: 英語だと"known-new contract"という概念が近いもの。[既知から未知に書く](https://note.com/logicalskill/n/n77ff3391a74d)から引用

---

# 既知から道へ

具体的な例をいくつか挙げてみます。

- jsprimer という書籍は前から後ろに順番に読んでいく構造です。そのため、未知の言葉がいきなり出てこないように、既知 -> 未知の順となるように説明している
- コードを書いていくときに、関数の定義をしてから利用する
  - JSはhoistingがあるので、実行的にはこれは回避できしまう
  - 一方でファイルが膨れたといにメインが下にあるのが嫌という人もいるが、それはエントリーを分ければいい
  - これが問題になるのはReactコンポーネントみたいな、同じファイルに

```js
// 数字の文字列を二つ受け取り、合計を返す関数
function sumNumStrings(a, b) {
  const aNumber = safeParseInt(a);
  const bNumber = safeParseInt(b);
  return aNumber + bNumber;
}

// 数値の文字列を受け取り数値を返す関数

function safeParseInt(numStr) {
  const num = parseInt(numStr, 10);
  if (Number.isNaN(num)) {
    throw new Error(`${numStr} is not a number`);
  }
  return num;
}
```

よりも

```js
// 数値の文字列を受け取り数値を返す関数
function safeParseInt(numStr) {
  const num = parseInt(numStr, 10);
  if (Number.isNaN(num)) {
    throw new Error(`${numStr} is not a number`);
  }
  return num;
}

// 数字の文字列を二つ受け取り、合計を返す関数
function sumNumStrings(a, b) {
  const aNumber = safeParseInt(a);
  const bNumber = safeParseInt(b);
  return aNumber + bNumber;
}
```

の方が既知 → 未知となる

- 人間のコンテキスト小さいので、章をまたぐとすぐに未知となってしまう言葉が出てくる。このような場合、章が変わるたびに重要なものは未知であるという前提で毎回説明する

このようなパターンをそれぞれ図にしていきたいです

# 既知 から 未知 へ

[.column]

```js
// 数値の文字列を受け取り数値を返す関数
function safeParseInt(numStr) {
  const num = parseInt(numStr, 10);
  if (Number.isNaN(num)) {
    throw new Error(`${numStr} is not a number`);
  }
  return num;
}
// 数字の文字列を二つ受け取り、合計を返す関数
function sumNumStrings(a, b) {
  const aNumber = safeParseInt(a);
  const bNumber = safeParseInt(b);
  return aNumber + bNumber;
}
```

[.column]

```markdown
次のコードでは、数値の文字列を二つ受け取り、合計を返す関数を定義しています。

{{コード}}

この関数は、数値の文字列を受け取り、数値に変換する `safeParseInt` 関数を使用しています。
`safeParseInt` 関数は、数値の文字列を受け取り、数値に変換します。もし変換できない場合は、エラーをスローします。
```

---

# 3. テスト

- **ドキュメントの自動テスト:**
  - `textlint`: 文章校正、表現統一
  - `power-doctest`: サンプルコードの動作検証
- **CI/CDでの継続的なテスト:** GitHub Actions でテストを自動化し、品質を維持
  - サンプルコードの検証、Integration Testの実装
- **読みやすさ分析:** `textstat` による文章の複雑さの可視化

---

- [ ] textlint の話

^ textlintは機械学習のツールが来ても結局はプロフェッショナルルールが消えることはないという前提で書かれている。
^ これは機械学習の結果は確率的な話なので９9%の精度だと問題があって、Lintに求められるのは確率とはことなるものがある
^ AIを使ってても、ESLintなどを併用しているように、AIを使ってても、textlintは併用していくと思う

---

# power-doctest

- 書籍におけるサンプルコードは動くのが正解なコード、エラーになることが正解のコードがある
- どちらも実行してその結果が期待通りかを確認するテストが必要
- [power-doctest](https://github.com/azu/power-doctest)は、文章の中にあるコードをテストする

---


[.column]

## 元の文章

次のコードは、数値の文字列を二つ受け取り、合計を返す関数を定義しています。

```js
const sum = (a, b) => a + b;
console.log(sum(1, 2)); // => 3
```


[.column]

## [fit] power-doctestによる変換

- コードを抽出して、Assertionに変換してテストとして実行する

```js
const sum = (a, b) => a + b;
assert.strictEqual(sum(1, 2), 3);
```

---
[.column]

## 元の文章

変数名に数字を含めることはできますが、変数名を数字から開始することはできません。
これは変数名と数値が区別できなくなってしまうためです。

\<!-- doctest:SyntaxError -->
```js
let 1st; // NG: 数字から始まっている
let 123; // NG: 数字のみで構成されている
```

[.column]

## [fit] power-doctestによるテスト

- コードブロックを抽出して、実行した結果の期待値をコメントから取得
- 実行した結果が `SyntaxError` になることを確認する

---

# textstatでの可視化

- 文章を書いていくと、巨大になって流れが難しくなる
- フローを分析するようなツールが必要
- → textstatを書いて文章の依存関係や文字数を可視化した
- [章ごとのページ量を可視化する · Issue #554 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/554)

---

![fit, jsprimer 文字数のカウント](./img/jsprimer-count.png)

---

![fix, jsprimer 依存のSankeyダイアグラム](./img/jsprimer-sankey.png)

---

# 4. 変化の追従プロセス

![es2025 issue right, fit](./img//es2025-issue.png)

- Issue でタスク管理し計画的に対応
  - [ES2025 の対応 · Issue #1778 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/issues/1778)
- **大きな変更への対応:** Design Doc (OUTLINE.md) で設計・議論
  - 例: Iterator Helpers 対応
    ([#1782](https://github.com/asciidwango/js-primer/issues/1782), [OUTLINE](https://github.com/asciidwango/js-primer/blob/master/source/basic/iterator-generator/OUTLINE.md))

---

- [ ] このプロセスの話はもっと詳しく

---

# 5. オープンソースとしての開発

- **オープンソースとしての開発:**
- 書籍として出版予定のものとして書いていた
- ただし、最初からオープンソースとして公開しながら開発した
- すべての意思決定が GitHub 上にある
- すべての議事録が GitHub 上にある

---

# Deep Wiki

- [ ] Deep Wiki でなぜ、これ、こうしたかがわかる様子
- [ ] これができるのは、議事録が全てリポジトリにあるため

---

# 6. コミュニティの力

- Contribute のハードルをどれだけ下げられるか
  - [文章の間違いに気づいたら · JavaScript Primer #jsprimer](https://jsprimer.net/intro/feedback/)
  - 明確な [Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)
  - 初めて GitHub 使う人も多いので、ブラウザだけで修正できる方法の案内をする
  - 繰り返す

---

# 7. 経済的支援モデル

- 書籍販売、[GitHub Sponsors](https://github.com/sponsors/azu)、[Open Collective](https://opencollective.com/jsprimer)

---

# Open Collective

- [ ] Open Colllective の話

---

# Thanks to Sponsors

- [ ] Open Collective の画像

---

# 技術書をソフトウェア開発する

---

## 技術的なメンテナンス基盤の構築

- 自動テスト・CI による品質担保
- バージョン管理による変更の追跡
- Issue と Pull Request による透明性の高い開発
- 外部からの貢献を促す環境整備

---

## 変化に強い設計思想の採用

- 依存関係を最小化する設計
- 構成の見直しと再構築
- 目的と範囲の明確化
- 「読みやすさ」を中心とした設計

---

## 継続的な改善サイクルの確立

- 読者/ユーザーからのフィードバック収集
- 定期的な更新スケジュール
- メトリクスによる改善点の可視化
- コミュニティベースの運営モデル

---

# まとめ

## 真面目に技術書書くのと

## 真面目にソフトウェア開発するのは同じ！
