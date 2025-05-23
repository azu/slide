# tskaigi 発表スライド構成案 (別パターン: Why & How)

**発表タイトル:** 技術書をソフトウェア開発する - jsprimer の 10 年から学ぶ継続的メンテナンスの技術

**ターゲット:** TypeScript 開発者

**発表ゴール:**

- JSPrimer の事例を通して、変化に強いドキュメント/ソフトウェア開発・運用のヒントを得てもらう。
- TypeScript 開発者にとって JavaScript の基礎を学び続ける価値を再認識してもらう。
- JSPrimer へのコントリビュートや支援に関心を持ってもらう。

---

**スライド構成案 (全 30 分)**

**1. 表紙 (1 分)**

- タイトル: 技術書をソフトウェア開発する - jsprimer の 10 年から学ぶ継続的メンテナンスの技術
- 発表者: @azu
- 所属 (あれば)
- イベント名: tskaigi

**2. はじめに: なぜ TS Kaigi で JavaScript の話？ (2 分)**

- **自己紹介:** azu です。JSPrimer ([https://jsprimer.net/](https://jsprimer.net/)) という JavaScript 入門書を 10 年近く書いています。
- **問いかけ:** 「TypeScript から型を消せば JavaScript」。その JS、ちゃんと追えていますか？
- **JSPrimer 紹介:**
  - 約 10 年、6 つのメジャーバージョンを経て更新され続けている JavaScript 入門書。
  - ウェブ版は無料公開 ([https://jsprimer.net/](https://jsprimer.net/))、OSS ([https://github.com/asciidwango/js-primer](https://github.com/asciidwango/js-primer))。
- **本日のテーマ:** なぜこの本は始まり、なぜ更新され続け、それをどう実現しているのか？ 技術書を「ソフトウェア開発」する視点でお話しします。

**3. なぜ JSPrimer は始まったのか？ (4 分)**

- **時代背景 (2015 年頃):** ECMAScript 2015 (ES6) の登場。JavaScript の大きな転換期。
- **当時の課題:**
  - ES2015 ベースの現代的な入門書が不足していた。
  - 古い情報や書き方が混在し、初学者が混乱しやすい状況。
  - _(参照: [https://efcl.info/2020/04/27/jsprimer/](https://efcl.info/2020/04/27/jsprimer/) - なぜ「書き方」「作り方」「学び方」なのか？)_
- **JSPrimer の初期目的:**
  - 「これ読んでおいて！」と渡せる、現代的な JavaScript の入門書を作る。
  - **書き方:** 基本文法を体系的に学べる。
  - **作り方:** 学んだ知識で実際にアプリを作れる。
  - **学び方:** JavaScript の進化に自ら追従できる素養を身につける。
- **コンセプト:** 変化を前提とし、継続的にメンテナンスできる OSS として開発する。

**4. なぜ JSPrimer は更新され続けるのか？ (4 分)**

- **JavaScript は "Living Standard":**
  - ECMAScript は毎年更新される。
  - 実行環境 (ブラウザ, Node.js) も進化し続ける。
  - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - JavaScript Primer は変化を前提にした書籍のプロジェクト)_
- **技術文書の宿命:** 何もしなければ情報は古くなり、コードは動かなくなる。
  - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 静的なコード vs アクティブなコードの話)_
- **JSPrimer の目的 (再確認):** 「変化に対応できる基礎を身につける」こと。
  - そのためには、書籍自体が変化に対応し続ける必要がある。
  - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - JavaScript Primer の目的)_
- **ウェブ版 (Living) と書籍版 (Snapshot):**
  - ECMAScript 仕様のモデルに倣い、常に最新のウェブ版と、安定版としての書籍版を提供。
  - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 静的な書籍版とアクティブなウェブ版)_

**5. どうやって更新しているか？ - 技術書をソフトウェア開発する技術 (12 分)**

- **5-1. 変化を前提とした「設計」 (3 分)**
  - **スコープ管理:** 「目的ではないこと」を明確化し、**依存**を減らす。
    - ライブラリ解説ではなく、基礎的な言語機能にフォーカス。
    - **依存が少ない静的なコードは変化しにくいが、依存が多いアクティブなコードは、自身が変わらなくても周囲の変化で動かなくなる可能性がある。**
    - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 本書の目的ではないこと, 静的なコード vs アクティブなコードの話)_
  - **読みやすさの設計:**
    - 読むコストを下げる工夫 (構成、表現統一)。
    - _(メモより: 書くより読む回数の方が多い)_
    - _(参照: [https://efcl.info/2020/04/27/jsprimer/](https://efcl.info/2020/04/27/jsprimer/) - 第一部: 基本文法)_
- **5-2. 品質を担保する「自動テスト」 (3 分)**
  - **ドキュメントのテスト:**
    - `textlint` (TypeScript 製): 文章校正、表現統一。
    - `power-doctest` (TypeScript 製): サンプルコードの動作検証。
  - **CI/CD:** GitHub Actions でテストを自動化し、品質を維持。
  - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 更新をしやすくするための工夫)_
- **5-3. 変化に追従する「プロセス」 (3 分)**
  - **ECMAScript 年次更新:** Issue でタスク管理し、計画的に対応。
    - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - 毎年の対応 Issue リンク)_
  - **大きな変更への対応:** Design Doc (OUTLINE.md) で設計・議論してから実装。
    - 例: Iterator Helpers 対応 ([Issue #1782](https://github.com/asciidwango/js-primer/issues/1782), [OUTLINE.md](https://github.com/asciidwango/js-primer/blob/master/source/basic/iterator-generator/OUTLINE.md), [PR #1801](https://github.com/asciidwango/js-primer/pull/1801))
  - **バージョン管理:** ウェブ版と書籍版のライフサイクル管理。
- **5-4. 持続可能性を高める「コミュニティ」 (3 分)**
  - **OSS としての開発:** 誰でも参加可能。
  - **貢献の促進:** Contribution Guide、Issue/PR 文化、ブラウザでの修正案内。
    - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - オープンソースへ Contribute できる)_
  - **経済的支援:** 書籍販売、GitHub Sponsors、Open Collective。
    - _(参照: [https://efcl.info/2023/06/09/jsprimer-v2/](https://efcl.info/2023/06/09/jsprimer-v2/) - どうやって JavaScript Primer の更新を続けるのか)_

**6. まとめ & Call to Action (4 分)**

- **技術書開発から学べること:**
  - 変化が激しい領域では「変化を前提とした設計とプロセス」が不可欠。
  - 自動テストやコミュニティは、品質と持続可能性を高める。
  - これはソフトウェア開発にも通じる考え方。
- **TypeScript 開発者へのメッセージ:**
  - JavaScript の基礎と進化を理解することは、TypeScript をより深く使う上で重要。
  - JSPrimer はそのための信頼できるリソースです。
- **あなたにできること (Call to Action):**
  - **読んでみる:** [jsprimer.net](https://jsprimer.net/)
  - **フィードバックする:** GitHub Issue/PR
  - **コントリビュートする:** 一緒に更新しませんか？
  - **支援する:** 書籍購入、レビュー、Sponsors、Open Collective
- **最後のメッセージ:** JSPrimer を通して、変化に強い開発者になりましょう！

**7. Q&A (残り時間)**

---
