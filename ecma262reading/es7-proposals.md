# ECMA-262 7th Edition and beyondを眺める

-----

# ES7のプロポーサル

- ECMAScript 7は機能ごとに仕様を策定していく
- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")にプロポーサル一覧
- 手順を守れば誰でもアイデアを提案できる
- [TC39 Process - Google ドキュメント](https://docs.google.com/document/d/1QbEE0BsO4lvl7NFTn5WXWeiEIBfaVUF7Dk0hpPpPDzU/edit "TC39 Process - Google ドキュメント")


-----

# [ECMAScript 7の策定プロセス](https://docs.google.com/document/d/1QbEE0BsO4lvl7NFTn5WXWeiEIBfaVUF7Dk0hpPpPDzU/edit "TC39 Process")

- Stage 0. `Strawman` : ESに入れたいアイデアを議論する段階
- Stage 1. `Proposal` : `Strawman`を具体化、デモ作成、分析
- Stage 2. `Draft` : 正式な仕様定義の形式で仕様書を書く段階
- Stage 3. `Candidate`: Draftの実装等をしてフィードバック
- Stage 4. `Finished`: ECMAScriptに正式採用、[Test262](https://github.com/tc39/test262 "Test262")


------

# 今あるプロポーサル

------

|🚀| Proposal                                                                                             | Champion      | Stage
|---|------------------------------------------------------------------------------------                 |-------------- | ------|------
| | [Defensible Classes](http://wiki.ecmascript.org/doku.php?id=strawman:defensible_classes) | Mark Miller & Doug Crockford | 0
| | [Relationships](http://wiki.ecmascript.org/doku.php?id=strawman:relationships) | Mark Miller & Waldemar Horwat | 0
|🚀| [String padding](http://wiki.ecmascript.org/doku.php?id=strawman:string_padding) | Kevin Grandon, Rick Waldron & Dave Herman | 0     |
|🚀| [`String.prototype.at`](https://github.com/mathiasbynens/String.prototype.at) | Mathias Bynens & Rick Waldron | 0     |
| | [Structured Clone](https://github.com/dslomov-chromium/ecmascript-structured-clone)       |Dmitry Lomov   |0
| | [Weak References](http://wiki.ecmascript.org/doku.php?id=strawman:weakreferences) | Mark Miller & Dave Herman | 0
|🚀| [Object.getOwnPropertyDescriptors](https://gist.github.com/WebReflection/9353781) | Rick Waldron & Andrea Giammarchi | 0
|🚀| [Set/Map.prototype.toJSON](https://github.com/DavidBruant/Map-Set.prototype.toJSON) | David Bruant ? | 0
| | Annex B - HTML Attribute Event Handlers| Allen Wirfs-Brock | 0
| | [Class Property Declarations](https://gist.github.com/jeffmo/054df782c05639da2adb)| Jeff Morrison| 0
| | [Reflect.isCallable/Reflect.isConstructor](https://github.com/caitp/TC39-Proposals/blob/master/tc39-reflect-isconstructor-iscallable.md)| Caitlin Potter| 0
| | [Additional metaproperties](https://github.com/allenwb/ESideas/blob/master/ES7MetaProps.md)| Allen Wirfs-Brock| 0

------

- [agendas/05.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2015/05.md)
- [ecma262/stage0.md at master · tc39/ecma262](https://github.com/tc39/ecma262/blob/master/stage0.md)
- [tc39/ecma262](https://github.com/tc39/ecma262)

-----