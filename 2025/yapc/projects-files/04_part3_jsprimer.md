# Part 3: JavaScript Primer - 伝える技術から深まる循環（12分 / 13スライド）

---

## Slide 27: Part 2 → Part 3 への橋渡し

### ビジュアル
- textlint → JavaScript Primerへの矢印
- 個人→協働への変化を視覚化
- 一人のシルエットから複数のシルエットへ

### コンテンツ

```
個人から協働への質的変化

個人ツール（textlint）
     ↓
「相手」を意識する瞬間
     ↓
大規模協働プロジェクト（jsprimer）

一人で書く vs 100人以上のContributor

根本的に異なるアプローチ：
├─ 一人：自分の判断だけで進む
└─ Contributor：設計の共有、透明性、合意形成

次は「伝える技術」が中心の話
```

### スピーカーノート
- 「textlintは個人ツールでした。自分の問題を解決するために作りました」
- 「しかし、JavaScript Primerは違います。10年間で100人以上のContributorが参加したプロジェクトです」
- 「一人で書くのと、Contributorと書くのでは、根本的にアプローチが異なります」
- 「一人で書くときは、自分の判断だけで進められます」
- 「でも、Contributorと書くときは、設計を共有し、透明性を保ち、合意形成が必要です」
- 「これが『相手を意識する』ということです」
- 「Part 3では、この『伝える技術』について詳しくお話しします」
- 時間: 1分

---

## Slide 28: JavaScript Primerとは

### ビジュアル
- JavaScript Primerのロゴ・スクリーンショット
- Living Standardのイメージ（常に更新される様子）

### コンテンツ

```
JavaScript Primer

2015年：開発開始（@lacoと共同）

目的：
「JavaScriptの変化に対応できる
 基礎を身につける」

特徴：
• 読者を強く意識して書く
• lacoと共同でスタート
• 他プロジェクトとは異なる協業

Living Standard戦略：
• Web版：常に最新（jsprimer.net）
• 書籍版：年次スナップショット

10年間継続更新
100人以上のコントリビューター

https://jsprimer.net/
```

### スピーカーノート
- 「JavaScript Primerは、2015年に@lacoと共同で開発を開始した、JavaScriptの入門書です」
- 「目的は、『JavaScriptの変化に対応できる基礎を身につける』ことです」
- 「JSer.infoやtextlintとは異なり、lacoと一緒にスタートしたプロジェクトです」
- 「最大の特徴は、読者を強く意識して書いていることです」
- 「Living Standard戦略により、Web版は常に最新に更新され、書籍版は年次スナップショットとして出版されます」
- 「2015年から10年間、継続的に更新し続けています」
- 「そして、100人以上のコントリビューターと協働しています」
- 時間: 1分30秒

---

## Slide 29: jsprimerの本質 - 3つを継続的に提供

### ビジュアル
- 3つの柱を視覚化（書き方・作り方・学び方）
- JavaScriptのアンカー（基準点）のイメージ

### コンテンツ

```
3つを継続的に提供する

1. 書き方
   基本文法などのJavaScriptの書き方

2. 作り方
   JavaScriptを使った
   アプリケーションの作り方

3. 学び方
   JavaScriptの進化を
   自分で知る学び方

JavaScriptのアンカー（基準点）
ECMAScriptは毎年更新される
初心者の道標が必要
```

### スピーカーノート
- 「JavaScript Primerの本質は、3つを継続的に提供することです」
- 「1つ目は『書き方』。基本文法などのJavaScriptの書き方を学びます」
- 「2つ目は『作り方』。JavaScriptを使ったアプリケーションの作り方を学びます」
- 「3つ目が重要です。『学び方』です。JavaScriptの進化を自分で知る学び方を学びます」
- 「なぜ『学び方』が重要か？ECMAScriptは毎年更新されるからです」
- 「変化の激しいJavaScriptにおいて、初心者の道標、アンカーとなる存在が必要なんです」
- 「これがJavaScript Primerの本質です」
- 時間: 1分30秒

---

## Slide 30: 読む技術 - ECMAScript仕様の追跡

### ビジュアル
- ECMAScriptの年次更新のタイムライン
- ES2015からES2025までの進化

### コンテンツ

```
ECMAScript仕様の追跡

毎年のECMAScript更新に対応：
• v6.0.0：ES2024対応（2024年）
• v7.0.0：ES2025対応（2025年8月）

10年間の継続的追跡

意図的な除外の判断：
Generator機能（2016-2019年、3年間の議論）
結論：「初心者には複雑すぎる」

設計：
何を書くか、何を書かないか

https://github.com/asciidwango/js-primer/releases
```

### スピーカーノート
- 「JavaScript Primerでは、毎年のECMAScript更新に対応しています」
- 「2024年にはES2024対応のv6.0.0を、2025年8月にはES2025対応のv7.0.0をリリースしました」
- 「10年間、継続的に追跡し続けています」
- 「興味深いのは、『意図的な除外』です」
- 「Generator機能について、2016年から2019年まで3年間議論しました」
- 「結論は『初心者には複雑すぎるので含めない』でした」
- 「設計とは、何を書くか、そして何を書かないかを決めることです」
- 「この判断プロセスは、すべてGitHub上で透明に記録されています」
- 時間: 1分30秒

**参考URL**:
- jsprimer releases: https://github.com/asciidwango/js-primer/releases
- Generator議論: https://github.com/asciidwango/js-primer/issues

---

## Slide 31: 書く技術 - Design Docによる設計

### ビジュアル
- ディレクトリ構造を視覚化
- OUTLINE.mdの例

### コンテンツ

```
Design Docによる設計

各章/
├── README.md（本文）
├── OUTLINE.md（設計文書）
└── 議論の履歴（Issue/PR）

OUTLINE.mdの役割：
• なぜこの章が必要か
• 何を学ぶか
• どう教えるか

「どう書くか」の迷いを軽減
100人との共通理解

https://github.com/asciidwango/js-primer/tree/master/source
```

### スピーカーノート
- 「JavaScript Primerでは、各章にOUTLINE.mdという設計文書があります」
- 「本文のREADME.mdを書く前に、まずOUTLINE.mdを作成します」
- 「OUTLINE.mdには、なぜこの章が必要か、何を学ぶか、どう教えるかを記述します」
- 「これにより、『どう書くか』で迷うことが減ります」
- 「そして、100人のコントリビューターとの共通理解が生まれます」
- 「『相手に伝える』ためには、まず『設計を共有』する必要があるんです」
- 時間: 1分

---

## Slide 32: AI活用 - Iterator Helpers章

### ビジュアル
- Design Doc → AI Agent → 初稿生成の流れ
- 2025年時点でのAI活用の進化

### コンテンツ

```
AI活用 - Iterator Helpers章

Design Doc
    ↓
AI Agentで初稿生成
    ↓
レビュー・修正
    ↓
完成

文章の「最初の一歩」は重い
このボトルネックをAIで軽減

2025年時点での持続可能性の進化：
AI時代の学習支援
継続のボトルネックをAIで解消

https://efcl.info/2025/08/18/jsprimer-v7/
```

### スピーカーノート
- 「2025年、Iterator Helpers章では、AIを活用しました」
- 「まず、Design Docを作成します。これは人間が書きます」
- 「次に、AI Agentに初稿を生成させます」
- 「そして、人間がレビューし、修正します」
- 「なぜこうするのか？文章の『最初の一歩』が一番重いからです」
- 「白紙から書き始めるのは大変です。でも、AIが作った初稿から始めるのは楽です」
- 「これが、2025年時点での持続可能性の進化です」
- 「AIはかなり冗長な文章を書くことが多いです。そのため、レビューと修正でかなりの行数を削減しています」
- 「AI時代においても、継続のボトルネックを解消し、学習支援を提供し続けています」
- 時間: 1分30秒

---

## Slide 33: 排除した心理的プレッシャー

### ビジュアル
- 4つのプレッシャーを×印で表示
- Living Standardとデザインで解決

### コンテンツ

```
4つの心理的プレッシャー排除

❌ 1. 「完璧な本を一度で書く」
✅ Living Standardで継続更新前提

❌ 2. 「どう書くか」で迷う
✅ Design Docで方向性明確化

❌ 3. 「ECMAScriptに追従する」
✅ 書きながら学ぶ構造

❌ 4. 「自分で全て書く」
✅ コントリビューターを毎年募集、
   コミュニティに委ねる

プレッシャーを設計で排除
→ 10年継続可能に
```

### スピーカーノート
- 「JavaScript Primerでも、心理的プレッシャーを排除する設計をしています」
- 「1つ目は『完璧な本を一度で書く』というプレッシャーです」
- 「これはLiving Standardで解決しました。最初から完璧である必要はありません。継続的に更新すればいいんです」
- 「2つ目は『どう書くか』で迷うプレッシャーです」
- 「これはDesign Docで解決しました。書く前に方向性を明確化します」
- 「3つ目は『ECMAScriptに追従する』プレッシャーです」
- 「これは『書きながら学ぶ』構造で解決しました。新しい仕様が出たら、Issue立てて、Proposalや仕様を読んで、理解しながら書きます」
- 「4つ目は『自分で全て書く』というプレッシャーです」
- 「これはコントリビューターを毎年募集することで解決しました。コミュニティに委ねることで、心理的負担が軽減されます」
- 「このように、プレッシャーを設計で排除することで、10年継続できています」
- 時間: 2分

---

## Slide 34: 伝える技術 - 既知→未知の原則

### ビジュアル
- 既知から未知への階段のイメージ
- 読者の現在地から出発する図

### コンテンツ

```
既知→未知の原則

読者を強く意識して書く

❌ 「これを覚えろ」
   上から目線の教え方

✅ 「あなたが知っているXは、
    実はYという仕組みです」
   既知から未知へ導く

書きやすさより読みやすさ優先

何十回も読み返す：
読まないと書けない
読者の視点に立つ

https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md
```

### スピーカーノート
- 「伝える技術で最も重要なのは『既知→未知の原則』です」
- 「これは、読者を強く意識して書く、ということです」
- 「『これを覚えろ』という上から目線の教え方ではなく」
- 「『あなたが知っているXは、実はYという仕組みです』という既知から未知へ導く教え方です」
- 「これは『書きやすさより読みやすさ優先』という原則でもあります」
- 「書きやすさを優先すると、著者の視点になりがちです」
- 「読みやすさを優先すると、読者の視点に立てます」
- 「実際に私はjsprimerを何十回も読み返しています」
- 「なぜなら、読まないと書けないからです」
- 「読者の視点に立つためには、読者として読むことが重要なんです」
- 時間: 1分30秒

---

## Slide 35: 自動テストによる品質保証

### ビジュアル
- 3層の品質チェックを視覚化
- CI/CDパイプライン

### コンテンツ

```
自動テストによる品質保証

3層の品質チェック：

1. textlint：文章品質
   表記揺れ、文章スタイル
      ↓
2. power-doctest：コード検証
   サンプルコードの動作確認
      ↓
3. textstat：複雑度管理
   文章の読みやすさ

すべてCI/CDで自動実行
継続的な品質維持

https://github.com/asciidwango/js-primer/blob/master/.textlintrc.js
```

### スピーカーノート
- 「品質保証も自動化しています」
- 「3層の品質チェックがあります」
- 「1層目はtextlintです。文章の品質をチェックします。表記揺れや文章スタイルを統一します」
- 「2層目はpower-doctestです。サンプルコードが実際に動くかをチェックします」
- 「3層目はtextstatです。文章の複雑度を管理します。難しすぎる文章を検出します」
- 「これらすべてがCI/CDで自動実行されます」<- textstatは手動実行
- 「この自動化により、100人のコントリビューターが安心して貢献できます」
- 「品質が自動的に保たれるからです」
- 時間: 1分

**参考URL**:
- textlint設定: https://github.com/asciidwango/js-primer/blob/master/.textlintrc.js
- CI/CD設定: https://github.com/asciidwango/js-primer/blob/master/.github/workflows/
- power-doctest: https://github.com/azu/power-doctest
- textstat: https://github.com/textlint/textstat

---

## Slide 36: Living Standard戦略

### ビジュアル
- 従来の書籍とLiving Standardの対比
- Web版と書籍版の関係

### コンテンツ

```
Living Standard戦略

従来の書籍：
スナップショット
出版したら終わり
    ↓
JavaScript Primer：
Living Standard
├─ Web版：常に最新
└─ 書籍版：年次スナップショット

教科書もLiving Standardであるべき

JavaScriptは毎年変化
古い情報は有害
変化に対応できる基礎を提供
```

### スピーカーノート
- 「従来の書籍は、スナップショットです」
- 「出版したら、それで終わりです。更新されません」
- 「しかし、JavaScriptは毎年変化します。古い情報は有害になります」
- 「だからこそ、教科書もLiving Standardであるべきだと考えました」
- 「JavaScript PrimerのWeb版は常に最新に更新されます」
- 「書籍版は、スナップショットとして出版されます」
- 「このLiving Standard戦略により、変化に対応できる基礎を提供し続けられます」
- 時間: 1分

---

## Slide 37: 100人以上のContributorとの協働

### ビジュアル
- コントリビューターの顔アイコン（多数）
- GitHub上での協働の様子

### コンテンツ

```
100人以上のContributorとの協働
Issueで方針を説明することから始まる

✓ Issueで方針を説明
  「なぜ必要か」「どう進めるか」

✓ OUTLINE.mdで具体的な設計
  「誰に」「何を」「どう」伝えるか

✓ Sandpackでブラウザ完結
  技術的ハードル最小化

✓ 透明な議論とオンボーディング
  すべてGitHub上で公開

10年間で100人以上が参加
Contributorも読者を意識して書く

https://github.com/asciidwango/js-primer/graphs/contributors
```

### スピーカーノート
- 「10年間で100人以上のContributorが参加しています。どうやって協働しているのか？」
- 「最も重要なのは、Issueで方針を説明することです」
- 「『なぜこの機能が必要か』『どういう方向性で進めるか』をIssueで明確にします」
- 「その次に、OUTLINE.mdで具体的な設計を行います。『誰に』『何を』『どう』伝えるかを明確にします」
- 「Sandpack統合で、ブラウザだけで編集・実行・確認ができます。技術的ハードルを最小化しました」
- 「すべての議論をGitHub上で公開し、初めてのContributorも支援します」
- 「これは単なる分担作業ではありません」
- 「Contributorも読者を意識して書く、これがjsprimerの特徴です」
- 時間: 2分

---

## Slide 38: 透明な経済モデル

### ビジュアル
- 年間コストと収入源の図
- Fibonacci報酬システムの説明

### コンテンツ

```
透明な経済モデル

年間コスト：
約30日分の労力（約70万円相当）

収入源：
├ 書籍売上
├ Open Collective
└ GitHub Sponsors

Fibonacci報酬システム：
タスク複雑度：1, 2, 3, 5, 8ポイント
1ポイント = 約$7

貢献度に応じた報酬
オープンな運営

https://opencollective.com/jsprimer
```

### スピーカーノート
- 「JavaScript Primerは、透明な経済モデルで運営されています」
- 「年間コストは、約30日分の労力、約70万円相当です」
- 「収入源は、書籍売上、Open Collective、GitHub Sponsorsです」
- 「特徴的なのは、Fibonacci報酬システムです」
- 「タスクの複雑度を1、2、3、5、8ポイントで評価します」
- 「今の1ポイントは約7ドルです。貢献度に応じて報酬を支払います」
- 「すべての収支は公開されています。これが透明な経済モデルです」
- 「このモデルにより、持続可能な運営が実現しています」
- 時間: 1分30秒

**参考URL**:
- Open Collective: https://opencollective.com/jsprimer
- Contributing Expenses Policy: https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING_EXPENSES_POLICY.md
- TSKaigi 2025発表: https://efcl.info/2025/05/24/tskaigi-2025-jsprimer/

---

## Slide 39: Part 3 まとめ - jsprimerの循環

### ビジュアル
- 読む→書く→伝えるの循環を図示
- 各ステップでの成果を記載

### コンテンツ

```
jsprimerの循環

読む技術：
• ECMAScript仕様追跡
• 意図的な除外判断
• Generator議論（3年）

     ↓ Design Doc、AI活用

書く技術：
• OUTLINE.md設計文書
• 3層の自動テスト
• 書きやすさより読みやすさ

     ↓ Living Standard

伝える技術：
• 既知→未知の原則
• 100人協働
• 透明な経済モデル

     ↓

10年継続 = 教育リソース = AI時代の学習支援
```

### スピーカーノート
- 「Part 3のまとめです」
- 「JavaScript Primerでは、読む・書く・伝えるの循環が、伝えることを中心に機能しています」
- 「読む技術では、ECMAScript仕様を追跡し、意図的な除外判断を行います」
- 「書く技術では、Design Docで設計し、3層の自動テストで品質を保ちます」
- 「伝える技術では、既知→未知の原則で読者に寄り添い、100人と協働し、透明な経済モデルで運営します」
- 「これらの循環により、10年間の継続が実現し、AI時代の学習支援につながりました」
- 「Part 1のJSer.infoは読むことが中心、Part 2のtextlintは書くことが中心、Part 3のJavaScript Primerは伝えることが中心でした」
- 「次のPart 4では、これらの循環がどのような複利効果を生んだのかをお話しします」
- 時間: 1分30秒

---

## Part 3 セクションサマリー

**合計時間**: 12分  
**スライド数**: 13枚（Slide 27-39）  

**キーメッセージ**:
1. 個人から協働への質的変化
2. 3つの心理的プレッシャーを設計で排除
3. 既知→未知の原則で読者に寄り添う
4. Living Standardで継続更新を実現
5. 透明な経済モデルで持続可能に

**重要な数字**:
- 2015年開始、10年継続
- 100人以上のコントリビューター
- 年間約70万円のコスト
- 3層の品質保証（textlint、power-doctest、textstat）

**技術的依存**:
- textlint（校正）
- HonKit（ビルド）
- power-doctest（コード検証）
- textstat（複雑度管理）
- Sandpack（ブラウザ内実行）

**参考URL**:
- JavaScript Primer: https://jsprimer.net/
- GitHub: https://github.com/asciidwango/js-primer
- Open Collective: https://opencollective.com/jsprimer
- TSKaigi 2025発表: https://efcl.info/2025/05/24/tskaigi-2025-jsprimer/
- TSKaigi 2025スライド: https://azu.github.io/slide/2025/tskaigi/jsprimer.html
- Contributing Guide: https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md
- Expenses Policy: https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING_EXPENSES_POLICY.md
- jsprimer v7リリース: https://efcl.info/2025/08/18/jsprimer-v7/
- jsprimer v2リリース: https://efcl.info/2023/06/09/jsprimer-v2/
- jsprimerを出版: https://efcl.info/2020/04/27/jsprimer/

**次のセクションへの移行**:
「3つのプロジェクトの循環を見てきました。次は、これらが生み出した複利効果についてお話しします」→ Part 4へ
