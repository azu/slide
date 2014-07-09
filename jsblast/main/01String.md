# 変数の定義

- シンプルな変数宣言

> var name;

- 変数宣言と値の代入

> var name = value;

- ベストな宣言方法

	すべてのローカル変数はその関数のトップで宣言する。

.notes:  JavaScriptはブロックスコープではなく関数スコープ

---

# 変数の型

JavaScriptには6つの型が存在する

* String
* Number
* Boolean
* Object
* null
* undefined

# 特別な文字列

- ¥ escape character
- ¥¥ one backslash
- ¥' simple quote 
- ¥" double quote
- ¥n new line
- ¥r carriage return
- ¥t tabulator
- ¥u Unicode character, e.g.  ¥u042F ﾞ Я
 

---

# String オブジェクト

- Useful methods of the  String object
- toUpperCase(), toLowerCase(): like LotusScript
- charAt(position): character at given  position
- indexOf(searchString): searchStringの位置を返す
- indexOf(searchString, startPos): searchStringをstartPosから探索して位置を返す
- lastIndexOf(suchstring): indexOfを後ろから探索する
- substring(start, end): startから
- slice(start, end): like substring, but when 
end is negative, length is added (counts from  end)
- split(separator): 配列へ分割


---

# 文字列結合

- +演算子 や += で文字列結合する方が速い(しかし、IE7以下のブラウザは逆)
- IE7以下では array.join を使い文字列結合したほうが速い
- string.concat は殆どの場合  + or += などより遅い

そこまで劇的に差がでるケースではないなら好みでいいと思う
[IE6,7のためにArray.join(&quot;&quot;) による文字列連結を使うべき - 0xFF](http://d.hatena.ne.jp/os0x/20090829/1251535201 "IE6,7のためにArray.join(&quot;&quot;) による文字列連結を使うべき - 0xFF")


