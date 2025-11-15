# Deckset記法リファレンス（AI/Claude Code用）

Markdownから美しいプレゼンテーションを生成するDecksetの必須記法ガイド。

**参考:** https://docs.deckset.com/

---

## 基本構造

### スライド区切り
```markdown
---
```
- 前後に空白行必須
- または `slide-dividers: #, ##` で見出しレベルで自動分割

### ファイル構造
```markdown
theme: Fira
footer: © 2024
slidenumbers: true

---

# タイトル

---

## コンテンツ
```

### 1ページのコンテンツ量

- タイトル + 5-6行程度が目安
  - 長くなると文字が小さくなるので読めなくなる
  - カラム分割やページを分けることを検討
- 画像やコードは1点まで


---

## グローバル設定（ファイル冒頭）

```markdown
theme: Fira, 3              # テーマとカラー番号
footer: テキスト             # フッター
slidenumbers: true          # スライド番号
slidecount: true            # 総ページ数表示
build-lists: true           # リストを段階表示
autoscale: true             # 自動サイズ調整
slide-dividers: #, ##       # 見出しで自動分割
code-language: JavaScript   # デフォルトコード言語
background-image: bg.jpg    # 全体背景画像
```

---

## 見出しと強調

```markdown
# [fit] タイトル            # 画面にフィット
## 見出し2
### 見出し3

*イタリック* または _イタリック_
**太字** または __太字__
~~取り消し線~~
`インラインコード`
```

---

## 画像

### 基本
```markdown
![](image.jpg)              # 全画面背景
![fit](image.jpg)           # 画面にフィット
![left](image.jpg)          # 左寄せ（右にテキスト）
![right](image.jpg)         # 右寄せ（左にテキスト）
```

### インライン
```markdown
![inline](image.jpg)        # インライン表示
![inline 50%](image.jpg)    # サイズ指定
![inline fill](image.jpg)   # 画面いっぱい
```

### フィルター・効果
```markdown
![original](image.jpg)      # フィルターなし
![filtered](image.jpg)      # 強制フィルター
![original 250%](image.jpg) # ズーム
```

---

## 動画

```markdown
![](video.mov)              # ローカル動画
![](https://youtube.com/watch?v=ID)  # YouTube

# オプション
![autoplay mute loop](video.mov)     # 自動再生・ミュート・ループ
![autoadvance](video.mov)            # 終了後に次スライド
```

---

## リスト

```markdown
- 項目1
- 項目2
  - ネスト項目（4スペース）

1. 順序付き
1. すべて1.でOK
```

**段階表示:** グローバル設定で `build-lists: true`

---

## コードブロック

````markdown
```javascript
const x = 42;
```
````

### ハイライト
```markdown
[.code-highlight: 2]        # 2行目
[.code-highlight: 2, 6-8]   # 2行目と6-8行目
[.code-highlight: all]      # 全行
```

---

## テーブル

```markdown
| Left | Center | Right |
| --- | :---: | ---: |
| L1 | C1 | R1 |
| L2 | C2 | R2 |
```

---

## 数式

```markdown
$$E = mc^2$$                # ブロック数式
傾き$$a$$は...              # インライン数式
```

---

## スライド単位設定

```markdown
[.autoscale: false]         # このスライドのみ設定変更
[.build-lists: true]        # このスライドのみビルド有効
[.hide-footer]              # フッター非表示
[.background-color: #FF0000] # 背景色
```

---

## プレゼンターノート

`^` で始まる行はプレゼンターノートとして扱われ、スライドには表示されません。

```markdown
^ これはプレゼンターノート
^ 聴衆には見えない
```

---

## 実践例

```markdown
theme: Fira
footer: © 2024 Company
slidenumbers: true
build-lists: true

---

# [fit] プロジェクト名

---

## 概要

プロジェクトの説明文

![right](screenshot.jpg)

- ポイント1
- ポイント2
- ポイント3

---

## コード例

```javascript
function hello() {
  console.log("Hello");
}
```

^ ここで関数の説明をする

---

# [fit] ありがとう
```

---

## よくある間違い

❌ `---` の前後に空白行がない
❌ グローバル設定がファイル途中にある
❌ 画像ディレクティブの書式が間違っている（`![fit image.jpg]`など）
❌ リストのネストインデントが4スペースでない

---

## 参考リンク

- 公式ドキュメント: https://docs.deckset.com/
- Getting Started: https://docs.deckset.com/English.lproj/getting-started.html
- Configuration: https://docs.deckset.com/English.lproj/Customization/01-configuration-commands.html