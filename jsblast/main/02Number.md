# Number オブジェクト

- 全ての数字64bit float point("double")
- Number.MAX_VALUE = 1.7976931348623157e+308
Number.MIN_VALUE = 5e-324
- Number.toString(basis)でn進数で表現できる。
  basisは基数

例えば
	
	var a = 100;
	a.toString(16)   "64"
	a.toString(2)   "1100100"

---
# Heads up: parseInt と 8進数

- 0x のprefixは16進数 e.g. 0xFF
- 0  のprefixは8進数 e.g. 014 (10進数で12)

---
##  parseInt()の使用上の注意
- parseInt("08")// 0 
	- 期待とは異なる
	- 不正な文字が来るまでパースする
- parseInt(08)  //  Error: 08 is not a legal ECMA-262 octal constantb

いつも第二引数の基数を指定しておくと安心

- parseInt("08", 10); // 8 

---
# Math Object
Mathオブジェクトに便利なメソッド

- Math.PI 3.141592653589793
- Math.E 2.718281828459045
- Math.SQRT2 1.4142135623730951
- Math.LN2 0.6931471805599453
- Math.LN10 2.302585092994046
- Math.random() 0以上1未満の数値がランダム
- Math.round(), Math.floor(), Math.ceil()
- Math.sin(), Math.cos(), Math.atan()
- Math.min(), Math.max()
- Math.pow(), Math.sqrt()

---

# NaN = Not a Number

- 何に対してもイコールではない(NaN自体に対しても)
	- [通常の数値かどうかはisNaN関数じゃなくてisFinite関数 - 三等兵](http://d.hatena.ne.jp/sandai/20100206/p1 "通常の数値かどうかはisNaN関数じゃなくてisFinite関数 - 三等兵")
	- [_.isNaN でドジをした - わからん](http://d.hatena.ne.jp/kitokitoki/20110607/p2 "_.isNaN でドジをした - わからん")
- isNaN(NaN);// true
- typeof NaN;// "number"

# Infinity

- 1/0 -> Infinity
- Infinity > Number.MAX_VALUE
- 1/Infinity -> 0
- Infinity/Infinity -> NaN(Not a Number)

