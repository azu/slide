# 10分で実装するFlux

----

# EventEmitter

<a class="jsbin-embed" href="http://jsbin.com/rutaso/1/embed?js,console">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>


----

# Dispatcher

- シングルトン

----

# ActionCreator

- Staticメソッドで実装出来る
- シングルトンなので
- emitする

----

# Store

- こっちも実質シングルトン
- onを付ける
- Changeイベントを発行する

----

# React

- カウンター
- changeイベントを検知する