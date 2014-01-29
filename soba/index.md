title: Soba.js
author:
  name: azu
  twitter: azu_re
  url: http://efcl.info/
output: index.html

--

![アイコン](https://github.com/azu/slide/raw/master/offline_study/simple320_320.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

--

## Browserify

* [npmとbrowserifyを使ったクライアントサイドのウェブアプリ開発 | Web scratch](http://efcl.info/2014/0120/res3605/ "npmとbrowserifyを使ったクライアントサイドのウェブアプリ
開発 | Web scratch") を書くまでの話

* ビルドフェーズがあるのでデバッグしにくいと思ってた
*  => sourcemap様

--

* ビルドに時間かかる
	* 最小でも0.3sぐらいかかってる
	* 確かにライブラリとか全部含めると数秒かかる
	* `--noparse` は 分割ビルドとかで改善できる?
	* [gulp.task(&#39;js&#39;](https://github.com/shuhei/morning_pages/blob/f60f3603b4711732160c28efea63d36e6eed0d36/gulpfile.js#L14 "gulp.task(&#39;js&#39;") とか0.5sぐらいまで削れる

--

## Browserify-dev

* 想像以上にnodeな感じで書けるのは心地よい
* ブラウザ向けに書かれたライブラリを使う方法が意外と充実してる

--

## gulp

* コードとして書く
* [Deprecating gulp.run no longer allows defining logic before running tasks. · Issue #193 · gulpjs/gulp](https://github.com/gulpjs/gulp/issues/193 "Deprecating gulp.run no longer allows defining logic before running tasks. · Issue #193 · gulpjs/gulp")
* gulpはtask runnerではなく、build system helper
* JavaScriptには関数と呼ばれるタスクを実行する仕組みが既にある
* Gruntとの比較はイマイチ意味ない場合が多い(競合ではあるが)

--

## gulp?

* コードで書きすぎるとやっぱりスパゲッティは避けられない
* nodeのCLIを書く感じで、その実行起点がgulpのイメージでやってる
* やることがシンプルならplugin読んで、パイプを繋げるだけ
* やることが複雑なら、nodeアプリを書いて呼び出すだけ