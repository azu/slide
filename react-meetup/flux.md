# 10分で実装するFlux

----

# [Flux](http://facebook.github.io/flux/ "Flux")

## /flˈʌks/

----

# Fluxとは

- Facebookが提唱したSmalltalk MVCの焼き直し
- CQRS(Command Query Responsibility Segregation)と類似
- データが一方通行へ流れるようにするアーキテクチャ


| Model | View | Controller |
| Store | Component | ActionCreator(Actions) |

----

# Fluxでよく見る図

![fit, overview](img/flux-overview.png)

----

# 目的

- 小さなFluxの実装を作りながらFluxついて学ぶ
- Fluxの特徴: Unidirectional data flow
	- 本当にデータが一方通行に流れるのかを確認する



----

# EventEmitter

<a class="jsbin-embed" href="http://jsbin.com/cinusi/1/embed?js,console">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>


-----

# Emitter.js

```js
"use strict";
class Emitter {
    constructor() {
        this._handlers = {};
    }

    on(type, handler) {
        if (typeof this._handlers[type] === 'undefined') {
            this._handlers[type] = [];
        }

        this._handlers[type].push(handler);
    }

    emit(type, data) {
        var handlers = this._handlers[type] || [];
        handlers.forEach((handler) => {
            handler.call(this, data);
        });
    }

    off(type, handler) {
        var handlers = this._handlers[type] || [];
        handlers.forEach((ownHandler, index) => {
            if (ownHandler === handler) {
                handlers.splice(index, 1);
            }
        });
    }
}
```


----

# Dispatcher

- シングルトン
- Facebookの`flux`モジュールが唯一提供してる機能
- EventEmitterに優先順序をつけたもの

----

# Store

- StoreはEventEmitterを継承する
- onを付ける
- Changeイベントを発行する

----

----

# ActionCreator

- Staticメソッドで実装出来る
- シングルトンなので
- emitする

----

# React

- カウンター
- changeイベントを検知する


----

----

# Fluxの特徴

- 一方通行のデータフローが形成できること
- ホントに先ほどのプログラムは一方通行にデータが流れている?
- 実際に検証してみよう :see:

----

# プログラムの動作フローを見る

- コードの動きを見る
- 簡単に見るにはコールスタックを見れば良い
- デバッガーでブレークポイント OR `console.trace`

----

# コールスタックを見てみる

```
// console.traceからさかのぼる
_onChange	@	Component.js:23
(anonymous function)	@	Component.js:18
emit	@	EventEmitter.js:23
onCountUp	@	Store.js:22
emit	@	EventEmitter.js:23
countUp	@	ActionCreator.js:10
tick	@	Component.js:28
// Start
```


-----

# 呼び出しの流れ


```
Component#tick -> Action#CountUp -> Store#onCountUp -> Component#_onChange
```

- Component -> Action -> Store -> Componentへとデータが流れている
- つまり一方通行のデータフローが作成できた！


----

# Facebook flux

- Facebookの[Flux](http://facebook.github.io/flux/ "Flux")モジュールはDispatcherという機能のみを提供
- 今回のEventEmitterに順序制御などを加えたもの
	- `waitFor([id])` というメソッドを持ち、発行されたイベントの依存関係を記述できる(Store依存関係に使われる)
