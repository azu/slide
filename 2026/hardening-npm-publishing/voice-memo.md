# Hardening npm Publishing - 音声メモ

発表「Hardening npm Publishing」（OSS開発者は今何をするべきか？ソフトウェアサプライチェーン侵害対策を考える、flatt.connpass.com/event/395359、2026-06-23）の元ネタ。録音の文字起こしと参照URLの内容を整理したもの。文字起こしの誤認識は修正済み。

## 全体の考え方

攻撃者の立場で見ると、どこか1箇所をインジェクトするだけで全部が抜けるなら、一番弱い部分が狙われる。だから「魔法の弾丸（single magic bullet）」は存在せず、ローカルから公開までの一連のフローを1個ずつ塞いで、最弱点を作らないようにする。どこかが壊れたときに別のどこかで止める、多層防御の発想で考える。

技術的には最小権限と手順の話に集約され、特別に難しいことをやるわけではない。1個ずつちゃんとやる。

## ローカルのToken管理

生のcredentialをローカルに置かないのが第一前提。infostealerでローカルファイルが抜かれても投稿（公開）権限が漏れないようにする。昔書いたパスワード（secret）をローカルファイルに保存しない、という話の延長。

GitHubはclassic PATをローカルでのみ使い、CIでは使わない。CIでclassicを使う場面はほぼ100%ない（GitHub AppやActionsなど別の手段がある）。常用するトークンには、全リソースにwriteできる強いclassic PATはほぼ不要。

- fine-grained PATはリソースオーナーに紐づくのでやや面倒だが、特定リポジトリへのwrite/read権限に絞れる
- 課題: Checks APIがfine-grained PATに未対応で、fallbackとしてclassic PATが必要になる（community discussion #129512）。これが直れば常用トークンから強いclassicをほぼ消せる

npmはアクセストークンを一切持たない（0個）。新パッケージはWebから追加できないため、Trusted Publisher設定のために一時的にトークンを発行し、設定し終えたら消す運用。さらに "Require two-factor authentication and disallow tokens" を有効化し、既存パッケージはトークンでは公開できない状態にしている。結果、公開は必ずOIDC trusted publishing（GitHub Actions経由）でしか行えない。

## トークンレスnpm（OIDC Trusted Publishing）

長期トークンをやめ、short-lived・workflow固有の署名付きトークンで公開する（efcl.info/2025/09/07/npm-oidc/）。GitHub ActionsとnpmレジストリがOIDCで信頼関係を結び、共有シークレットなしに「特定リポジトリの特定workflowからの実行」を暗号的に証明する。

- npm 11.5.1+ が必須（Node v24.8.0+ が npm v11.6.0 を同梱）
- workflowに `permissions: id-token: write` を付与し、`npm publish --provenance` で公開
- npmjs.com側でTrusted Publisherとして org/repo/workflowファイル名、任意でEnvironment名を登録

## GitHub Actionsの構成（Rulesets / Environments / Deployment protection）

公開フローはrelease PR方式。create release PRでリリース用PRを作り、マージ後に "Type: Release" ラベルが付いたときだけ release.yml が動く（github.com/azu/simple-oidc-example-package）。リリースは必ずPR経由を強制する。

- 外部Actionはほぼ使わない。GitHub公式のcheckout / setup-nodeのみで、setup-nodeのcacheも使わない。リポジトリ操作はghコマンドやgitコマンドで行う。Action imageが侵害されたときの影響を独立させる意識
- cacheを使わない理由はcache poisoning。GitHub Actionsのcacheは権限に関係なくどのworkflowからも読み書きでき、信頼境界を越える。低権限・PR側で汚染したcacheをリリースworkflowが復元して実行してしまう。TanStack侵害（2026-05）は pull_request_target でcacheを汚染 → release.yml が復元 → Runner.Workerのメモリからmint済みOIDCトークンを抽出 → 84個の悪性バージョンを公開、という連鎖だった。secretを扱うworkflowではcacheを消費しないのが対策（tanstack postmortem / adnanthekhan clinejection）
- `environment: npm` を作成し、required reviewersのapproveがないと動かないようにする
- npm側のTrusted Publisherでworkflowファイル名（release.yml）に加えてEnvironment名（npm）まで指定する。これにより、release.ymlを改変して動かしてもenvironment npmが使えず、reviewerがapproveしない限りOIDCトークンを交換できない

## OIDCと権限昇格（Bitwarden CLI事例）

OIDCトークンを盗む攻撃が増えている。Bitwarden CLIの侵害（socket.dev/blog/bitwarden-cli-compromised）では、CI/CDパイプラインが侵害され、Runner.Workerのメモリスクレイピングや環境変数からGitHub/npmトークン・クラウド認証情報が窃取された。攻撃者は `.github/workflows/` 配下に不正なworkflowを作成し、transient branch上で未承認workflowを実行して検出を回避した。

ここで重要なのはenvironmentを使っていなかった点。workflow名さえ合っていれば、pushでworkflowを走らせてnpmとOIDC交換しトークンを引き出せてしまう。つまりGitHubを侵害するだけでnpmも侵害できる権限カスケード（権限昇格）が起きる。

対策は、権限が上がる箇所（例: write権限しかないはずがnpm publish権限に化ける）に必ず1個承認フローを挟むこと。これはSLSA（録音の「サルサ」＝slsa.dev/spec/v1.2/threats）の考え方に対応する。

SLSA v1.2の脅威モデルは Source / Build / Usage の各段階に脅威カテゴリ（A〜I）を定義している（検証済み）。

- Source threats: (A) Producer, (B) Modifying the source, (C) Source code management
- Build threats: (D) External build parameters, (E) Build process, (F) Artifact publication, (G) Distribution channel
- Usage threats: (H) Package selection, (I) Usage
- ほかに Dependency / Availability / Verification threats

npm公開のhardeningが対応するのは主に **(F) Artifact publication**（公式ソースの意図を反映しないartifactのアップロード。SLSA曰く「最も直接的で最も簡単な脅威」で、緩和策がないと(D)(E)と区別できない）。OIDC trusted publishing・Environment承認・staged publishingはいずれもこの(F)を多層で固める対策。Bitwarden事例のCI/CD侵害は **(E) Build process**、PR必須化やCODEOWNERSは **(B)(C) Source** が補強になる。インジェクションできそうなレイヤーに対策を1個ずつ打っていく。

pull_request_targetとenvironment branch protectionの仕様変更（github.blog changelog 2025-11-07、2025-12-08適用）も関連する。pull_request系イベントでは環境ブランチ保護をマージ専用ブランチ `refs/pull/<number>/merge` に対して評価するようになった。攻撃者は必ずPR経由（分離されたコンテキスト）を通らされ、PRイベントで通知が飛ぶため、変なPRを立てると気づける。デプロイ（OIDC利用）はマージされたタイミングでしか参照できなくなる。

参考: OIDC設定ミスの悪用（YouTube r68fyFhkeV0「Abusing Misconfigured OIDC Authentication In Cloud Environments」, Christophe Tafani-Dereeper）。

## npm staged publishing

公開前にreview/approvalステップを追加する機能（docs.npmjs.com/staged-publishing）。npm 11.15.0+ / Node 22.14.0+ が必要で、OIDC（trusted publishing）でのみ使える。OIDCの「リポジトリ面を持っただけで公開できてしまう」問題を緩和する最後のレイヤー。

- `npm publish` は直接公開、`npm stage publish` はステージング領域に提出して承認待ち
- OIDC設定でnpm publish / npm stage publish のどちらか（または両方）を許可できる。stage publishのみ許可にすると、いきなりの公開（未承認publish）が弾かれる
- ステージされたものは Staged Packages に集まる。`npm stage list` / `npm stage view <id>` / `npm stage download <id>` で内容をチェックし、`npm stage approve <stage-id>`（CLI）またはWebのApproveで公開
- 承認には2FA（security key）が必須。stage publish自体は2FA不要だが、approveで必ずMFAが入る

課題: 承認が1パッケージずつしかできない。monorepoでは40個などが一度にデプロイされるため、1個ずつapproveしていたら現実的でない。CIから `npm stage approve <stage-id>` でアップロードする手もあるが、それができる＝npmトークンが漏れればstaged publishも突破される。したがってnpm / GitHubどちらかのトークンは完全に消し切るべきで、azuはnpmアクセストークン0個を実現している（パッケージは400〜900程度ある）。

staged publishingだけで守れるわけではなく順番がある。12ヶ月以内には1個ずつ課題が解決されていく見込み。

## 結論

ローカルのtoken管理 → トークンレスnpm（OIDC）→ GitHub Actions（Rulesets / Environments / Deployment protection）→ OIDCの権限昇格対策 → staged publishing、という一連の流れを1個ずつ塞ぐ。攻撃者にとっての最弱点を作らないことが本質で、どれか1個だけで守れる魔法の解決策はない。SLSAのレイヤーに沿って、逐次やっていく。

AIエージェント時代も同じで、マスターが全権限を持つのではなく、1タスク1エージェントで権限を分散し、それぞれの範囲でオーソライズする考え方になる。AIに全てやらせればAIが狙われやすくなるという当たり前のことが起きるだけ。

## 参照URL

- https://efcl.info/2025/09/07/npm-oidc/ - npm OIDC / Trusted Publishing 解説
- https://github.com/azu/simple-oidc-example-package（release.yml）- OIDC公開ワークフロー例
- https://github.com/azu/simple-npm-staged-publish-package-example - staged publishの例
- https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/ - pull_request_target / environment branch protection 仕様変更
- https://socket.dev/blog/bitwarden-cli-compromised - Bitwarden CLI侵害事例
- https://tanstack.com/blog/npm-supply-chain-compromise-postmortem - TanStack侵害（cache poisoning連鎖）
- https://adnanthekhan.com/posts/clinejection/ - GitHub Actions cache poisoningの解説
- https://slsa.dev/spec/v1.2/threats - SLSA Threats & mitigations
- https://docs.npmjs.com/staged-publishing - npm staged publishing
- https://github.com/orgs/community/discussions/129512 - Checks APIのfine-grained PT未対応
- YouTube r68fyFhkeV0 - Abusing Misconfigured OIDC Authentication In Cloud Environments

注: 録音中の「サルサ（salsa）」はSLSA（slsa.dev）の聞き取り。salasecure.com は無関係なフィンランドの認証スタートアップなので除外。
