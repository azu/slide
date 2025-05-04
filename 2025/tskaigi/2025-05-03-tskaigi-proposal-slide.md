
# 技術書をソフトウェア開発する
## jsprimer の 10 年から学ぶ継続的メンテナンスの技術

@azu
tskaigi

---

## 自己紹介

![アイコン right](https://github.com/azu.png)

- azu ([@azu_re](https://twitter.com/azu_re))
- JavaScript Primer ([jsprimer.net](https://jsprimer.net/)) という JavaScript 入門書を 10 年近く書いています

---

## なぜ TS Kaigi で JavaScript の話？

> TypeScript は JavaScript に型を付けた言語

TypeScript の土台である JavaScript の進化と、
それを追い続けることの重要性について話します。

---

## JavaScript Primer (jsprimer)

[jsprimer.net](https://jsprimer.net/)

- 約 10 年、6 つのメジャーバージョンを経て更新され続けている JavaScript 入門書
- ウェブ版は無料公開、OSS ([github.com/asciidwango/js-primer](https://github.com/asciidwango/js-primer))

---

## 本日のテーマ

- **Why:** なぜ jsprimer は始まり、更新され続けるのか？
- **How:** どうやって更新を実現しているのか？
- **What:** 技術書を「ソフトウェア開発」する視点

---

## なぜ JSPrimer は始まったのか？ (Why)

---

### 時代背景 (2015 年頃)

- ECMAScript 2015 (ES6) の登場
- JavaScript の大きな転換期

---

### 当時の課題

- ES2015 ベースの現代的な入門書が不足
- 古い情報や書き方が混在し、初学者が混乱
  - _(参照: [efcl.info/2020/04/27/jsprimer/](https://efcl.info/2020/04/27/jsprimer/) - なぜ「書き方」「作り方」「学び方」なのか？)_

---

### JSPrimer の初期目的

- 「これ読んでおいて！」と渡せる、現代的な JavaScript の入門書
- **書き方:** 基本文法を体系的に学ぶ
- **作り方:** 学んだ知識で実際にアプリを作る
- **学び方:** JavaScript の進化に自ら追従できる素養を身につける

---

### コンセプト

- 変化を前提とする
- 継続的にメンテナンスできる OSS として開発

---

## なぜ JSPrimer は更新され続けるのか？ (Why)

---

### JavaScript は "Living Standard"

- ECMAScript は毎年更新
- 実行環境 (ブラウザ, Node.js) も進化
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - JavaScript Primer は変化を前提にした書籍のプロジェクト)_

---

### 技術文書の宿命

- 何もしなければ情報は古くなり、コードは動かなくなる
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 静的なコード vs アクティブなコードの話)_

---

### JSPrimer の目的 (再確認)

> 変化に対応できる基礎を身につける

- そのためには、書籍自体が変化に対応し続ける必要がある
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - JavaScript Primer の目的)_

---

### ウェブ版 (Living) と書籍版 (Snapshot)

- ECMAScript 仕様のモデルに倣う
  - 常に最新のウェブ版 (Living)
  - 安定版としての書籍版 (Snapshot)
- _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 静的な書籍版とアクティブなウェブ版)_

---

## どうやって更新しているか？ (How)
### 技術書をソフトウェア開発する技術

---

### 1. 変化を前提とした「設計」

- **スコープ管理:** 「目的ではないこと」を明確化し、**依存**を減らす
  - ライブラリ解説ではなく、基礎的な言語機能にフォーカス
  - **依存が少ない静的なコードは変化しにくい**
  - **依存が多いアクティブなコードは、自身が変わらなくても周囲の変化で動かなくなる**
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 本書の目的ではないこと, 静的なコード vs アクティブなコードの話)_

---

### 1. 変化を前提とした「設計」(続き)

- **読みやすさの設計:**
  - 読むコストを下げる工夫 (構成、表現統一)
  - _(メモより: 書くより読む回数の方が多い)_
  - _(参照: [efcl.info/2020/04/27/jsprimer/](https://efcl.info/2020/04/27/jsprimer/) - 第一部: 基本文法)_

---

### 2. 品質を担保する「自動テスト」

- **ドキュメントのテスト:**
  - `textlint` (TypeScript 製): 文章校正、表現統一
  - `power-doctest` (TypeScript 製): サンプルコードの動作検証
- **CI/CD:** GitHub Actions でテストを自動化し、品質を維持
- _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 更新をしやすくするための工夫)_

---

### 3. 変化に追従する「プロセス」

- **ECMAScript 年次更新:** Issue でタスク管理し、計画的に対応
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 毎年の対応 Issue リンク)_
- **大きな変更への対応:** Design Doc (OUTLINE.md) で設計・議論
  - 例: Iterator Helpers 対応 ([#1782](https://github.com/asciidwango/js-primer/issues/1782), [OUTLINE](https://github.com/asciidwango/js-primer/blob/master/source/basic/iterator-generator/OUTLINE.md), [#1801](https://github.com/asciidwango/js-primer/pull/1801))
- **バージョン管理:** ウェブ版と書籍版のライフサイクル

---

### 4. 持続可能性を高める「コミュニティ」

- **OSS としての開発:** 誰でも参加可能
- **貢献の促進:**
  - Contribution Guide
  - Issue/PR 文化
  - ブラウザでの修正案内
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - オープンソースへ Contribute できる)_
- **経済的支援:**
  - 書籍販売、GitHub Sponsors、Open Collective
  - _(参照: [efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - どうやって JavaScript Primer の更新を続けるのか)_

---

## まとめ

---

### 技術書開発から学べること

- 変化が激しい領域では「変化を前提とした設計とプロセス」が不可欠
- 自動テストやコミュニティは、品質と持続可能性を高める
- これはソフトウェア開発にも通じる考え方

---

### TypeScript 開発者へのメッセージ

- JavaScript の基礎と進化を理解することは、TypeScript をより深く使う上で重要
- JSPrimer はそのための信頼できるリソース

---

## Call to Action

- **読んでみる:** [jsprimer.net](https://jsprimer.net/)
- **フィードバックする:** GitHub Issue/PR
- **コントリビュートする:** 一緒に更新しませんか？
- **支援する:** 書籍購入、レビュー、Sponsors、Open Collective

---

## JSPrimer を通して、
## 変化に強い開発者になりましょう！

---

## Q&A

