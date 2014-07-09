# ES6 Shims

* ECMAScript6等の機能のShims(Polyfill)
* 互換ライブラリで実装可能なものと不可能なものが存在する
* ブラウザが先行実装してるものもある

### ブラウザ

* Firefox
	* let, const 
	* WeakMap,Proxy
	* ES.next Library Extension(一部)
		* `String.prototype.startsWith`等
	* RegExp "y" flag
		* http://d.hatena.ne.jp/rikuba/20120731/1343708215
	* for of
* Chrome
	* --js-flags="--harmony"

### Shim


* [paulmillr/es6-shim](https://github.com/paulmillr/es6-shim "paulmillr/es6-shim")

ES6 Shims

    String.prototype.repeat
    String.prototype.startsWith
    String.prototype.endsWith
    String.prototype.contains
    
    Array.from
    Array.of

    Number.isFinite
    Number.isNaN
    Number.toInteger
    Number.isInteger

    Object.getOwnPropertyDescriptors
    Object.getPropertyDescriptor
    Object.getPropertyNames
    Object.is
    Object.isnt

* [WebReflection/es6-collections](https://github.com/WebReflection/es6-collections "WebReflection/es6-collections")
	* Maps, Sets WeakMaps

---


## Facade or Polyfills

### Facade 

* 異なるインターフェイスのAPIで同等の機能を提供
* ネイティブで既に実装されてる場合も利用できる

### Polyfill

* ネイティブ(仕様)と同じインターフェイスで同等の機能を提供
* 既に実装されている場合は何もしない

----

## Polyfillの弱点

* ネイティブの実装が仕様と異なる場合
* 全てのブラウザに同等の機能が提供できない




[Shim status of ES6 — Gist](https://gist.github.com/1665192 "Shim status of ES6 — Gist")