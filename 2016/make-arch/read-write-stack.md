# JavaScriptアーキテクチャ - Read/Write Stack

-----

## [New framework by azu · Pull Request #7 · azu/presentation-annotator](https://github.com/azu/presentation-annotator/pull/7 "New framework by azu · Pull Request #7 · azu/presentation-annotator")

-----

![fit right, 新しい流れ(1)](2016-04-12 11.08.42.jpg)

- ドメインモデルから自己通知を削った
- Repositoryに自己通知をつけた
- UseCaseに`useCase.dispatch`
- Storeに`store.onDispatch`
- を追加した

----
## 変更点

- dispatchを中心的にした
	- ログを基本的につけられるような方向


----

## UseCase

- `execute(value): Promise;`を持つ
- `this.dispatch(key, value): void`を持つ
	- `Store#onDispatch(key, handler)`で受け取れる
- UseCaseの中にUseCaseを書ける



----

## 課題

- Repositoryのシリアライズ/デシリアライズ