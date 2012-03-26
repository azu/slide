# テスト

プログラミングミスを発見したら

- まずはその失敗するテストケースを書く
- コードを修正する
- テストがグリーン

https://twitter.com/#!/dekokun/status/140428178211602434

---

# e.g)レガシーなモジュール

- 最初はレガシーな感じのモジュール
- 後でリファクタリングする予定だった

sampleモジュール

    !javascript
    define(function () {
        var module = {};
        // pos+2番目の文字列を取り出すメソッド
        module.getCharacterAt = function (str, pos) {
            return str.substr(pos+1, 1);// 0,1,2...
        }
        return module;
    });

---

# e.g)テストコード

パスしていたsampleモジュールテストコード

    !javascript
    define(["src/sample"], function (module) {
        test("getCharacterAt", function () {
            var str = "STRING";
            equal(module.getCharacterAt(str, 0), "T");
            equal(module.getCharacterAt("STRING", 2), "I");
            equal(module.getCharacterAt(str, str.length - 2), "G");
        });
    });

---

# e.g)実際に呼び出すときにのコード

- sampleモジュールを使用時のコード
- 第二引数に**文字列**で数値を指定していた

この時は偶然にも想定した動作になっていた

    !javascript
    define(["src/sample"], function (module) {
        var char = module.getCharacterAt("STRING", "1");
        console.log(char);// R
    });

---

# e.g)リファクタリングしたモジュール

- charAtで書き換えた
- 先ほどのテストコードはパスする

書き換えたモジュール

    !javascript
    define(function () {
        var module = {};
        // pos + 2番目
        module.getCharacterAt = function (str, pos) {
            return str.charAt(pos + 1);
        }
        return module;
    });

---

# e.g) 実際の実行結果は?

- おかしな返り値になっていた
- テストが網羅できてない範囲のバグあった

getCharacterAtの第ニ引数に文字列で値をしてみると…

    !javascript
    module.getCharacterAt("STRING", "1");
    // (an empty string) 空文字

---

# e.g)原因

文字列 + 数値 => 結合された文字列

    !javascript
    "STRING".charAt(1);// T
    "STRING".charAt("1"+1);// empty string
    // "1"+1 => "11"

対策

- 引数を数値に変換してから加算する
- 引数が数値な場合だけ受け入れる

など

---

# e.g)コードの修正 の前に テストの修正

- コード修正の前に、失敗するテストケースを追加する
- テストを実行 -> レッド になるのが正しい!

テストモジュール

    !javascript
    define(["src/sample"], function (module) {
        test("getCharacterAt", function () {
            var str = "STRING";
            equal(module.getCharacterAt(str, 0), "T");
            equal(module.getCharacterAt("STRING", 2), "I");
            equal(module.getCharacterAt(str, str.length - 2), "G");
            // 第2引数が文字列の時は失敗 -> 第2引数は数値のみ受け入れる
            notEqual(module.getCharacterAt(str, "0"), "T");
        });
    });

---
file:///Users/azu/Dropbox/Public/information/slide/reqirejs_mvc_application/presentation.html#slide1
# e.g)テストを追加->コードを修正

追加したテストに合わせた実装に変更する

    !javascript
    define(function () {
        var module = {};
        module.getCharacterAt = function (str, pos) {
            if (!(typeof pos === 'number' && isFinite(pos))) {
                return;// 第ニ引数が数値でないなら中止
            }
            return str.charAt(pos + 1);
        }
        return module;
    });


---

# まとめ

- TDDにおけるバグの修正
    - バグを再現するテスト
    - テストがレッドになることを確認
    - コードを修正
    - テストがグリーンになることを確認

