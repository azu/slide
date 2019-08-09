autoscale: true

# ECMAScript Specification Suite

## ECMAScriptの国際標準化

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----

# ECMAScriptと国際標準

- デファクトスタンダード: 事実上の標準のこと
  - [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm "ECMA-262")("ECMAScript"と呼ばれるやつ)のこと。開発者はこっちを見る
- デジュールスタンダード(国際標準): ISO/IEC/ITUが標準化したもの
  - [ISO/IEC 16262](http://www.iso.org/iso/catalogue_detail.htm?csnumber=55755 "ISO/IEC 16262")のこと
  - 政府調達などの要件に国際標準化されたものを利用することが多い
  - 日本だと国際標準はJIS規格として翻訳されていることが多い

----

## 例: Unicode

- デファクトスタンダード: Unicode
- デジュールスタンダード: ISO/IEC 10646
- [FAQ - Unicode and ISO 10646](http://unicode.org/faq/unicode_iso.html "FAQ - Unicode and ISO 10646")

----


# ECMAScriptと国際標準

- デファクトスタンダード: Ecmaが決めるECMAScript
  - Ecmaの決めた標準化プロセスで標準化
  - 詳しくは[ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch](http://efcl.info/2015/10/18/ecmascript-paper/ "ECMAScriptの仕様策定に関するカンニングペーパー | Web Scratch")
- デジュールスタンダード: ECMAScriptをISO/IECで国際標準化したもの
  - ECMAScriptの場合は実際の中身はほぼ同じ
  - ISO/IECの標準化プロセスで標準化
  - 詳しくは[SC22 ECMAScript Ad hoc委員会](https://azu.github.io/slide/2016/jser5years/sc22-ecmascript-ahodc.html "SC22 ECMAScript Ad hoc委員会")

-----

# 国際標準

WTO/TBT協定

> 国家規格(法規)には、既に存在する国際標準を使うことを推奨する

WTO/GP協定

> (政府およびその関連機関が調達する物品の)性能に関する技術仕様については、既にそれが存在する場合、国際標準に基づいていなければならない

----

# 国際標準とは?

> WTOの協定で求められている「国際標準」とは、何なのでしょうか。実は、何も定義されていません。ISO(国際標準化機構)、IEC(国際電気標準会議)、およびITU(国際電気通信連合)の3つの国際組織が制定するものは、とりあえず「国際標準」と言ってよいであろうと、世界的に考えられています
> -- [標準化について | IPSJ/ITSCJ](https://www.itscj.ipsj.or.jp)

-----


# ECMAScript Specification Suite

-----

# ECMAScript Specification Suiteとは

- [ECMA-414 ECMAScript Specification Suite](https://www.ecma-international.org/publications/standards/Ecma-414.htm "Standard ECMA-414")
- ECMAScript言語に関する仕様スイート
- 広義のECMAScriptはいくつかの仕様から構成される
  - ECMAScriptの言語仕様、JSONの仕様、i18n APIの仕様など
- それぞれの仕様をコンポーネントと呼んでいる

----

# ECMAScript Specification Suite

- 次のコンポーネントから構成される
  - ECMA-262 - ECMAScript
  - ECMA-402 - Internationalization API Specification
  - ECMA-404 - JSON
  - [Informative] TR-104 - ECMAScript Test Suite

----

![ECMAScript-Specification-Suite](./img/ECMAScript-Specification-Suite.png)

----

# ECMAScript Specification Suiteを3行で

- ECMAScriptプログラミング言語の仕様とその仕様に関する必須または任意の組み込みライブラリを含んだ仕様スイート
- この仕様スイートはECMA-262、ECMA-402、ECMA-404の最新のバージョンを参照する
- 2011年に策定されたISO/IEC 16262:2011を置き換えるものとして、ISO/IECによる国際標準化を行なうこととなった(まだ決まってない)

----

## 目的

- 年次の更新をしていくにあたり、毎年ISO標準も更新していくのは現実的でない
- ECMAScriptの仕様そのものは、デファクトスタンダードの最新版を常に参照する
  - デファクトスタンダードを更新するたびに、ISO標準を毎回同期するのはコストが合わない
- [今のISO標準](https://www.iso.org/standard/55755.html)の代わりに、これをISO標準化(したい)
  - [ISO/IEC 16262:2011](https://www.iso.org/standard/55755.html "ISO/IEC 16262:2011 - Information technology -- Programming languages, their environments and system software interfaces -- ECMAScript language specification") => [ISO/IEC DIS 22275](https://www.iso.org/standard/73002.html "ISO/IEC DIS 22275 - Information Technology -- Programming languages, their environments, and system software interfaces -- ECMAScript® Specification Suite")(予定は未定)

----

## ECMAScript Specification Suiteの国際標準化の効果

- 構成されるコンポーネントの**最新版**を参照する仕様スイート
- コンポーネントが追加または削除されない限り仕様スイートのバージョンは変化しない
- 例)
  - ECMA-262が更新された場合、ECMAScript Specification Suite自体は更新されない
  - コンポーネントにECMA-XXXが追加された場合、ECMAScript Specification Suiteは更新される
  - コンポーネントからECMA-404が削除された場合、ECMAScript Specification Suiteは更新される

----

## ISO/IEC DIS 22275

- 国際標準もRapid Releaseに対応させるDRYな仕様
  - 国際標準はデファクトスタンダード(ECMAScript)を参照するという仕様
- :warning: この国際標準はまだ審議中なので未確定な内容です
  - [ISO/IEC DIS 22275 - Information Technology -- Programming languages, their environments, and system software interfaces -- ECMAScript® Specification Suite](https://www.iso.org/standard/73002.html "ISO/IEC DIS 22275 - Information Technology -- Programming languages, their environments, and system software interfaces -- ECMAScript® Specification Suite")

----

# まとめ

- ECMAScript(Ecma)は新しい国際標準の形を模索してる
- 背景にWeb標準の高速化がある = Living Standards化
- 本当の最新版は常に[tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にある
	- 一年ごとに出しているECMAScript 201Xもスナップショットにすぎない


----

## 参考

- [ECMA-414 ECMAScript Specification Suiteについて | Web Scratch](http://efcl.info/2017/02/27/ecma-414/ "ECMA-414 ECMAScript Specification Suiteについて | Web Scratch")
- <https://github.com/rwaldron/tc39-notes/blob/master/es7/2016-05/may-23.md>
- [SC22 ECMAScript Ad hoc委員会](https://azu.github.io/slide/2016/jser5years/sc22-ecmascript-ahodc.html "SC22 ECMAScript Ad hoc委員会")
- [標準化戦略としてのデファクトスタンダードとデジュールスタンダードとの使い分け](http://www.y-adagio.com/public/confs/mags/std_qualt/draft_ver6.htm "標準化戦略としてのデファクトスタンダードとデジュールスタンダードとの使い分け")
- [インターネット技術の標準化](https://www.w3.org/2007/Talks/0611-naist-fs/ "インターネット技術の標準化")