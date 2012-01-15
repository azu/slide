# Introduction 

---

# 自己紹介


- Name : azu
- Twitter : @azu_re
- <img src="simple320_320.png" />
- Website: Web Scratch, JSer.info, MemeTodo, prog*sig


---

# WebStorm

- Jetbrains製のIDE
    - Intelli J,PHPStorm, RubyMine, AppCode などの姉妹品
- シェアウェアだが使う価値がある

---

# コード解析
* JavaScriptのコードを静的解析して構造化
	* ファイル間を超えてコードが構造化
	* 特定のメソッドが利用されている場所を抽出
* 宣言した関数、変数へのジャンプ
	* コードリーディングに最適
* 解析したデータを元に補完候補を表示する

---

# 補完機能
* 現時点でほぼ最強
* (書き途中で)シンタックスが壊れてるコードからも補完候補を出す

e.g.) container.obj.publicMethod()の補完

	!javascript
    var container = {
      init: function() {},
    };
    container.obj = (function(){
      var namager = {
        publicMethod: function(){ },
      };
      return namager;
    })();

---

# ステートメント補完
- Complete Current Statement
	- Ctrl(Command) + Shift + Enter
- 現在いるステートメントを補完して終了する

以下なら、セミコロンを補完

> var hoge = fuga || ''

以下なら、{}を補完

> var f = function () 

=> after

	var f = function () {
		// |カーソル
	};

---

