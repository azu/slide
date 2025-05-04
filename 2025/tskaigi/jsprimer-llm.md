autoscale: true
# 技術書をソフトウェア開発する
## jsprimer の 10 年から学ぶ継続的メンテナンスの技術

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch](https://efcl.info/), [JSer.info](https://jser.info/)
- JavaScript Primer ([jsprimer.net](https://jsprimer.net/)) を 10 年近く書いています

----

# なぜ TS Kaigi で JavaScript の話？

> TypeScript は JavaScript に型を付けた言語

TypeScript の土台である JavaScript の進化と、
それを追い続けることの重要性について話します。

----

# JavaScript Primer (jsprimer) とは

- 約 10 年、6 つのメジャーバージョンを経て更新され続けている JavaScript 入門書
- 累計 1000 万 PV 以上、月間アクティブユーザー 40 万以上（2024 年時点）
- 書籍版 ([amazon.co.jp/dp/4048931105](https://www.amazon.co.jp/dp/4048931105/)) も販売中
- ウェブ版 ([jsprimer.net](https://jsprimer.net/)) は無料で公開（OSS）

----

# 本日のテーマ

- **Why:** なぜ jsprimer は始まり、更新され続けるのか？
- **How:** どうやって更新を実現しているのか？
- **Learn:** 技術書を「ソフトウェア開発」することから得られる知見

----

# Why: なぜ JSPrimer は始まったのか？

----

## 時代背景 (2015 年頃)

- ECMAScript 2015 (ES6) の登場
- JavaScript の大きな転換期
- ES2015 ベースの現代的な入門書が不足
- 「これ読んでおいて！」と渡せる現代的な書籍が必要

----

## JSPrimer の目的

「書き方」「作り方」「学び方」の3つの原則に基づく設計

- **書き方**: 基本文法を体系的に学ぶ
- **作り方**: 学んだ知識で実際にアプリを作る
- **学び方**: JavaScript の進化に自ら追従できる素養を身につける

----

# Why: なぜ JSPrimer は更新され続けるのか？

----

## JavaScript は "Living Standard"

- ECMAScript は毎年更新
- 実行環境 (ブラウザ, Node.js) も進化

> 変化に対応できる基礎を身につけるため、書籍自体が変化に対応し続ける必要がある

----

## 技術文書の宿命

> (依存がない)静的なコードは時間で変化はしにくい、依存があるアクティブなコードは、コードが変わらなくても依存関係である周りが変化します。そのため5年間触っていないコードが、最新の環境ではそのままは動かないという話が書かれています。
> 
> -- <cite>Working in Public</cite>

----

## 静的な書籍版とアクティブなウェブ版

ECMAScript 仕様のモデルに倣う:

- **Living Standard**: ウェブ版 ([jsprimer.net](https://jsprimer.net/))
  - 常に最新版を維持
  - GitHub で共同編集
- **Snapshot**: 書籍版
  - 安定版として時々リリース
  - 読みやすさに特化した最適化

----

# How: どうやって更新を実現しているのか？

----

## 1. 変化を前提とした「設計」

- **スコープ管理:**「目的ではないこと」の明確化
  - ライブラリ解説ではなく、基礎的な言語機能にフォーカス
  - 依存関係の少ないコードを重視
- **読みやすさの設計:**
  - 章の配置やバランスを調整
  - 表現の統一

----

## 2. 品質を担保する「自動テスト」

- **ドキュメントのテスト:**
  - `textlint`: 文章校正、表現統一
  - `power-doctest`: サンプルコードの動作検証
- **CI/CD:** GitHub Actions による自動テスト
- **読みやすさ分析:** `textstat` による文章の複雑さの可視化

![テキストの分析例](https://github.com/asciidwango/js-primer/raw/master/meetings/2018-01-18/metrics.png)

----

## 3. 変化に追従する「プロセス」

- **ECMAScript 年次更新:** Issue でタスク管理し計画的に対応
  ```
  - [ECMAScript 2023の対応](https://github.com/asciidwango/js-primer/issues/1658)
  - [ECMAScript 2022の対応](https://github.com/asciidwango/js-primer/issues/1337)
  - [ECMAScript 2021の対応](https://github.com/asciidwango/js-primer/issues/1220)
  ```
- **大きな変更への対応:** Design Doc (OUTLINE.md) で設計・議論
  - 例: Iterator Helpers 対応 
    ([#1782](https://github.com/asciidwango/js-primer/issues/1782), 
    [OUTLINE](https://github.com/asciidwango/js-primer/blob/master/source/basic/iterator-generator/OUTLINE.md))

----

## 4. 持続可能性を高める「コミュニティ」

- **OSS としての開発:**
  - GitHub で開発 ([github.com/asciidwango/js-primer](https://github.com/asciidwango/js-primer))
  - 130 名以上のコントリビューター
- **貢献のハードルを下げる:**
  - 明確な [Contribution Guide](https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md)
  - ブラウザだけで修正できる方法の案内
- **経済的支援モデル:**
  - 書籍販売、[GitHub Sponsors](https://github.com/sponsors/azu)、[Open Collective](https://opencollective.com/jsprimer)

----

# Learn: 技術書をソフトウェア開発することから得られる知見

----

## 技術的なメンテナンス基盤の構築

- 自動テスト・CI による品質担保
- バージョン管理による変更の追跡
- Issue と Pull Request による透明性の高い開発
- 外部からの貢献を促す環境整備

----

## 変化に強い設計思想の採用

- 依存関係を最小化する設計
- 構成の見直しと再構築
- 目的と範囲の明確化
- 「読みやすさ」を中心とした設計

----

## 継続的な改善サイクルの確立

- 読者/ユーザーからのフィードバック収集
- 定期的な更新スケジュール
- メトリクスによる改善点の可視化
- コミュニティベースの運営モデル

----

# まとめ

----

## 技術書とソフトウェア開発の共通点

- **設計**: 明確な目的と範囲設定
- **品質**: 自動テストと継続的改善
- **プロセス**: 計画的な変更管理
- **持続可能性**: コミュニティとサポートの重要性

----

## TypeScript 開発者へのメッセージ

- JavaScript の基礎と進化を理解することは、TypeScript をより深く使う上で重要
- OSS の運営方法や継続的メンテナンスの手法は、あらゆる技術プロジェクトに応用可能

----

## これから技術書・ドキュメントを書く人へ

- 「変化を前提とした設計」を取り入れる
- 「読む人」を中心に考え、構成を最適化する
- ソフトウェア開発のプラクティスを積極的に採用する

----

## Call to Action

- **読んでみる:** [jsprimer.net](https://jsprimer.net/)
- **フィードバックする:** GitHub Issue/PR
- **コントリビュートする:** 一緒に更新しませんか？
- **支援する:** 書籍購入、レビュー、Sponsors、Open Collective

----
