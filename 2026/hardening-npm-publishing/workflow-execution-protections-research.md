# Workflow execution protections 調査メモ

結論: `Workflow execution protections` は、この発表では GitHub Actions の実行前に置く repository / organization level の policy として扱うのがよい。`Environment Approve` や `npm staged publishing` の代替ではなく、workflow を起動できる actor と event を先に制限する補助的な緩和策として説明する。

## 確認した公式情報

GitHub は 2026-06-18 に `Workflow execution protections` を public preview として公開した。GitHub Actions の workflow を誰が起動できるか、どの event で起動できるかを allow list で制御する機能。GitHub Actions は workflow の実行前にこの rule を評価するため、許可されていない actor や event は実行まで到達しない。

最初に提供される rule は actor rule と event rule。actor rule は user、repository role、GitHub Apps、Copilot、Dependabot などを対象にできる。event rule は `push`、`pull_request`、`pull_request_target`、`workflow_dispatch` などを対象にできる。GitHub Docs は「デフォルトでは write 権限を持つユーザーが workflow を起動できる」と説明している。

設定場所は GitHub Actions settings の新しい `Policies` section。既存の `General` Actions settings とは別。docs では、enterprise、organization、repository levels で利用できると説明されている。public preview なので仕様変更の可能性はある。

重要な制約として、現在の actor rule / event rule は「この workflow はこの actor だけが起動できる」という workflow file 単位の対応表ではない。GitHub Docs は rulesets framework によって specific repositories へ scope できると説明しているが、workflow file 単位に scope するとは説明していない。また、「each workflow file individually」ではなく broad protections として enforcement できる、と説明している。つまり、repo 全体または repo 群に対して「この actor 群」「この event 群」を許可する機能として理解するのが安全。

`Restrict events` は event の allow list。許可リストから外した event は、policy の対象 repo / repo 群では workflow を起動できない。たとえば `pull_request_target` を許可しなければ、その repo では `pull_request_target` 起動の workflow は動かない。一方で、同じ repo 内の特定 workflow だけを例外にする機能としては扱えない。`pull_request_target` を必要とする workflow と release workflow が同じ repo に共存している場合、この policy は全 workflow に影響する。

実効条件は「誰が」と「どの event」を両方見るものとして説明できる。つまり、policy の対象 repo では、許可された actor が、許可された event で起動した場合だけ workflow 実行へ進む。ただし、UI上は actor allow list と event allow list が独立しており、「Aさんは `workflow_dispatch` だけ、Dependabot は `pull_request` だけ」のような actor-event の個別対応表としては見えない。

`deployment` event だけを許可する設定は、npm release flow の説明には向かない。GitHub Actions の `deployment` event は「deployment が作成されたとき」に workflow を起動する event であり、Environment の required reviewers による Approve そのものではない。現在の公開例の release workflow は `pull_request: closed` で起動し、その job が `environment: npm` を参照する構成なので、event allow list を `deployment` だけにすると release workflow 自体が起動しない可能性が高い。Environment Approve を制御したい場合は Actions policy ではなく Environment の required reviewers / prevent self-review / deployment branches and tags を使う。

## Release PR の出所検証に使う案

`workflow_dispatch` は release PR の署名にはならないが、release PR の出所を検証する材料にはできる。公開例では `create-release-pr.yml` が `workflow_dispatch` で `release/vX.Y.Z` branch と Release PR を作り、`release.yml` は `pull_request: closed` で起動する。GitHub API で確認した `Release v3.1.5` PR は `user: github-actions[bot]`、`head_ref: release/v3.1.5`、`labels: ["Type: Release"]` だった。

弱い検証としては、release workflow の先頭で次を確認する。

- PR author が `github-actions[bot]` または専用 GitHub App
- head repo が base repo と同じ
- head branch が `release/v*`
- `Type: Release` label がある
- 変更ファイルが release 用の範囲に収まっている
- PR body に `create-release-pr.yml` の workflow run URL / run id を入れ、API で `event: workflow_dispatch`、`path: .github/workflows/create-release-pr.yml`、`conclusion: success` を確認する

ただし、これは暗号的な署名ではない。PR body の run id は偽装できるし、`github-actions[bot]` は同じ repo の他 workflow からも使える。したがって、これだけで publish 権限を与えるのではなく、Environment Approve の前に置く追加チェックとして扱う。

強くするなら、branch ruleset を組み合わせる。`release/*` branch に `Restrict creations` と `Restrict updates` を設定し、bypass actor を release PR 作成用の GitHub App に限定する。GitHub Docs では、ruleset の bypass actor に GitHub Apps を指定でき、`Restrict creations` は bypass 権限を持つ主体だけが matching branch/tag を作れる、`Restrict updates` は bypass 権限を持つ主体だけが matching branch/tag に push できると説明されている。

この場合でも、GitHub Actions 全体を bypass actor にすると他 workflow からも release branch を作れるので、できれば専用 GitHub App を使う。App の private key をどの workflow から読めるかは別の境界になるため、`.github/workflows/*` の変更には CODEOWNERS / PR review を要求する。つまり、release PR の「署名」に近づけるには、Actions policy だけではなく、branch ruleset、専用 App、workflow 変更 review、Environment Approve を組み合わせる。

公式情報:

- https://github.blog/changelog/2026-06-18-control-who-and-what-triggers-github-actions-workflows/
- https://docs.github.com/en/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/actions-policies/workflow-execution-protections

## 既存スライドとの対応

この発表の既存フローでは、`create-release-pr.yml` は `workflow_dispatch` で Release PR を作成し、`release.yml` は `pull_request: closed` と `Type: Release` label を条件にして `environment: npm` へ進む。公開例の `azu/simple-oidc-example-package` でもこの構成を確認した。

この構成で実践的に制限するなら、まず release 専用 repo または release workflow だけを持つ小さい repo では `workflow_dispatch` を maintainer や admin に限定する。Release PR 作成 workflow は `contents: write` と `pull-requests: write` を持つため、誰でも手動起動できる状態にしない。ただし、この制限は repository policy なので、同じ repo 内のほかの `workflow_dispatch` workflow にも影響する。

次に、release 用 repo では `pull_request_target` を原則として許可しない。GitHub の secure use reference は、`pull_request_target` と `workflow_run` が未信頼の pull request 内容と組み合わさると repository takeover につながる可能性があると説明している。必要な repo だけ例外にする形が説明しやすい。これも workflow 単位ではなく repo / repo 群単位の制限として扱う。既存 workflow が `pull_request_target` を使っている repo では、Evaluate mode で影響範囲を見てから active にする。

`release.yml` の `pull_request` は残す。ただし、workflow execution protections は workflow の起動可否を制御するだけで、特定 workflow の publish 権限を個別に縛る機能ではない。`Type: Release` label、Environment required reviewers、`refs/pull/*/merge` の Environment branch/tag rule、npm staged publishing は引き続き必要。

関連する既存根拠:

- GitHub Environment の required reviewers と deployment branches/tags: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments#deployment-branches-and-tags
- `pull_request` 系 event で Environment branch rule が `refs/pull/<number>/merge` を評価する変更: https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/
- GitHub Actions secure use reference: https://docs.github.com/en/actions/reference/security/secure-use
- 公開例 release workflow: https://github.com/azu/simple-oidc-example-package/blob/main/.github/workflows/release.yml
- 公開例 create release PR workflow: https://github.com/azu/simple-oidc-example-package/blob/main/.github/workflows/create-release-pr.yml

## スライドへの入れ方

入れる場所は「事例: OIDCだけでは止まらない」の後、または「EnvironmentでApproveとrefを制御する」の前がよい。ここで「workflow を改変されても、起動元を外側の policy で制限する。ただし workflow file 単位ではなく repo / repo 群単位の policy」という話を挟むと、Environment の説明につながる。

本文案:

```markdown
# Actions policyで起動元を制限する

- repo単位で actor / event を評価する
- workflow fileごとの許可ではない
- `pull_request_target` をrepo単位で制限できる
- Environment Approveの前段に置く
```

発表者ノート案:

```markdown
^ Workflow execution protectionsは、workflow YAMLの中ではなくGitHub Actionsのpolicyとして評価される。ここでは「workflowを起動できる主体」と「許可するevent」をrepo単位で制御する。eventはallow listなので、`pull_request_target`を許可しなければ対象repoではそのevent起動のworkflowが動かない。ただし、特定workflowだけを特定actor/eventに許可する対応表ではない。これはEnvironment Approveやstaged publishingの代替ではなく、workflow実行前の緩和策。public previewなので、本文では新しいpolicy候補として扱う。
```

参考リンクに追加するなら、次の1行で十分。

```markdown
- GitHub Actions policy: [Workflow execution protections](https://docs.github.com/en/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/actions-policies/workflow-execution-protections)
```

## 実践上の注意

この機能だけでは、許可された actor が悪い workflow を起動するケース、許可された event 経由で悪い package が作られるケース、build 中の cache poisoning、runner 内の OIDC credential 露出は防げない。さらに、同じ repo 内で「release workflow だけは admin、test workflow は write 権限者」というような workflow file 単位の分離にも使えない。したがって、スライドでは「repo 単位の workflow 実行前制限」として限定して説明する。

REST API での管理については、現時点で確認した公式 docs の `Workflow execution protections` ページには UI での設定手順だけが書かれていた。通常の repository rulesets REST API は `branch`、`tag`、`push` target を扱う説明になっており、この新しい Actions policy をそのまま管理する API としては説明されていない。自動化前提の手順としてはまだ扱わない方がよい。

この環境では `gh` CLI が `operation not permitted` で実行できなかったため、認証が必要な Actions permissions の実設定確認はできていない。一方で、公開 REST API で `azu/simple-oidc-example-package` の workflow 一覧、recent run の event、既存 branch ruleset は確認した。
