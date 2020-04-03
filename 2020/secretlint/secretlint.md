autoscale: true

# Secretlint

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- GitHub : @[azu](https://github.com/azu)
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----

# What's Secretlint?

----

## What's Secretlint?

パスワードやAPIアクセストークンなど公開してはいけないデータにチェックに特化したLintツール

<https://github.com/secretlint/secretlint>

----

# Why Secretlint?

----

## Why Secretlint?

- 既存のツールは過剰検知する(検知件数を増やすため)
- プロジェクトに導入しやすくしたい
- プラグインで拡張できるようにしたい

----

# How to use Secretlint?

----

## How to use Secretlint?

- プロジェクトに導入する
    - Node.jsのエコシステムに載る: [Husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)
    - <https://github.com/secretlint/secretlint#pre-commit-hook-per-project>
- 個人の設定として導入する
    - Git 2.9+の`core.hooksPath`を設定するとGitコミット時に常にチェックできる
    - <https://github.com/secretlint/secretlint#pre-commit-hook-globally>

----

# DEMO

----


# 検知できるもの

- [npmトークン](https://www.npmjs.com/package/@secretlint/secretlint-rule-npm)
- [AWSのアクセストークン](https://www.npmjs.com/package/@secretlint/secretlint-rule-aws)
- [GCPのアクセストークン](https://www.npmjs.com/package/@secretlint/secretlint-rule-gcp)
- [SSHの秘密鍵](https://www.npmjs.com/package/@secretlint/secretlint-rule-privatekey)
- [ベーシック認証のパスワード](https://www.npmjs.com/package/@secretlint/secretlint-rule-basicauth)
- [SlackのトークンやWebhook](https://www.npmjs.com/package/@secretlint/secretlint-rule-slack)
- add your rules

-----

# Welcome to Contribute!

- GitHub: <https://github.com/secretlint/secretlint>
- Twitter: <https://twitter.com/secretlint>