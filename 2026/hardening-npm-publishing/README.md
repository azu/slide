# Hardening npm Publishing

発表「Hardening npm Publishing」の音声メモとDeckSetスライド。

- イベント: [OSS開発者は今何をするべきか？ソフトウェアサプライチェーン侵害対策を考える](https://flatt.connpass.com/event/395359/)（2026-06-23）
- 発表者: azu（ほかに Yusuke Wada、Kyohei）

## 成果物

| ファイル | 内容 |
|---|---|
| [voice-memo.md](./voice-memo.md) | 録音の文字起こし＋参照URLを整理したまとめ（スライドの元ネタ） |
| [slide.md](./slide.md) | DeckSet用スライド（`img/` の画像を参照） |
| [img/](./img/) | スライド用画像（PNG） |

## スライドの構成

ローカルから公開までのフローを段階ごとに制御する話。

1. ローカルのToken管理（生credentialを置かない / classic PAT非常用 / npmトークン0個）
2. トークンレスnpm（OIDC Trusted Publishing）
3. GitHub Actions（Release PR / 外部Action非依存 / Environment Approve）
4. OIDCとpublish権限（Bitwarden CLI事例 / pull_request_target仕様変更）
5. npm staged publishing（公開直前のApprove / 課題）
6. SLSAの流れで振り返る

## 画像

公開ページはPlaywright、認証が必要な設定画面はazuのキャプチャ（chronixd-capture）からブラウザchromeを除いてクロップした。

| ファイル | 内容 | 出典 | 取得方法 |
|---|---|---|---|
| `npm-tokens-zero` | npmアクセストークン0個 | npmjs.com Access Tokens | キャプチャ |
| `npm-trusted-publisher` | Trusted Publisher登録フォーム | npmjs.com パッケージ設定 | キャプチャ |
| `flow-diagram` | Release PRの流れ図（Version Up→Merge→Approve→Publish） | flow-diagram.html / flow-diagram.svg | Playwright / ImageMagick |
| `github-release-pr` | バージョンアップPR（Type: Releaseラベル） | github.com PR | キャプチャ |
| `release-yml` | release.yml | github.com/azu/simple-oidc-example-package | Playwright |
| `github-environment` | Environment Approve設定（Required reviewers） | github.com Settings | キャプチャ |
| `github-review-deployments` | Review pending deploymentsのApprove | github.com Actions | キャプチャ |
| `slsa-threats` | SLSA脅威図 | slsa.dev/spec/v1.2/threats | Playwright |
| `gh-changelog` | pull_request_target仕様変更 | github.blog changelog 2025-11-07 | Playwright |
| `staged-publishing-flow` | staged publishingの流れ図（Submit→Inspect→Approve） | 生成画像 | ImageMagick |
| `npm-staged-packages` | Staged PackagesのApprove | npmjs.com Staged Packages | キャプチャ |

## メモ

- 画像はPNG。webpは扱わない
- 録音中の「サルサ」はSLSA（slsa.dev）の聞き取り。salasecure.com は無関係なので除外
- バージョンfloorは別機能なので混同しない: OIDC trusted publishing=npm 11.5.1+ / staged publishing=npm 11.15.0+・Node 22.14.0+
