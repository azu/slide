# Decorators進捗

## TypeScript / ECMAScript 7

-----


# 自己紹介

![right](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

## azu
## @[azu_re](https://twitter.com/azu_re)
###  [Web scratch], [JSer.info]


[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"


-----

# TypeScript進捗

- [Decorators · Issue #2249 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/issues/2249 "Decorators · Issue #2249 · Microsoft/TypeScript")
	- 仕様 Issue
	- 仕様 : [jonathandturner/brainstorming](https://github.com/jonathandturner/brainstorming "jonathandturner/brainstorming") 
- [Minimal implementation of Decorators by rbuckton · Pull Request #2399 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/pull/2399 "Minimal implementation of Decorators by rbuckton · Pull Request #2399 · Microsoft/TypeScript")
	- Origin: [Value decorators by rbuckton · Pull Request #2386 · Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/pull/2386 "Value decorators by rbuckton · Pull Request #2386 · Microsoft/TypeScript")

----

# ECMAScript 7(next?)

- [wycats/javascript-decorators](https://github.com/wycats/javascript-decorators "wycats/javascript-decorators")
	- by Yehuda Katz
	- [agendas/03.md at master · tc39/agendas](https://github.com/tc39/agendas/blob/master/2015/03.md "agendas/03.md at master · tc39/agendas")で提案予定


-----

# ES7 Decorators

```js
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
```

-----

```js
  @nonenumerable
  get kidCount() { return this.children.length; }
```


=> 以下のように定義が`nonenumerable`関数でラッパされる

```js
descriptor = nonenumerable(Person.prototype, 'kidCount', descriptor);
```

```
function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;// non emu
  return descriptor;
}
```

-----

# ES7 Decorator is suger

- Decorator は ただの糖衣構文

```js
@F("color")
class Foo {
}
// ====== //
var Foo = (function () {
  class Foo {
  }

  Foo = F("color")(Foo) || Foo;
  return Foo;
})();
```

-----

# @ confusing [zenparsing/es-private-fields](https://github.com/zenparsing/es-private-fields "zenparsing/es-private-fields")?

![img](https://avatars3.githubusercontent.com/u/5995084?v=3&s=400)

```js
class Point {
    @x;
    @y;
    constructor(x = 0, y = 0) {
        @x = +x;
        @y = +y;
    }
    get x() { return @x }
    set x(value) { @x = +value }
    get y() { return @y }
    set y(value) { @y = +value }
    toString() { return `Point<${ this.@x },${ this.@y }>` }
}
```


----

- [zenparsing/es-private-fields](https://github.com/zenparsing/es-private-fields "zenparsing/es-private-fields")
	- class内に`@var = 42`でprivate変数
	- coffeescriptの`@`に近い書き味(privateになるけど)
- [wycats/javascript-decorators](https://github.com/wycats/javascript-decorators "wycats/javascript-decorators")
	- `@func` class外/class内 どちらでも使える
- `;` の有無しかという違いがある！！
- => [45th meeting of Ecma TC39](https://github.com/tc39/agendas/blob/master/2015/03.md "45th meeting of Ecma TC39") で話し合うとの事！

----

# TypeScriptとES7

- Decoratorsの糖衣構文的な仕組みは同じっぽい?
- C.3 Type Serialization: とか方に関する記述もあるので仕様はTypeScriptのヤツのほうが大きい

----

# Babel

- [Decorators · Issue #974 · babel/babel](https://github.com/babel/babel/issues/974 "Decorators · Issue #974 · babel/babel")
- それぞれの仕様提案してる人が集まるので観測に便利

----

