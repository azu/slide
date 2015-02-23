# JavaScriptとWeb Audio事始め

----

# アジェンダ


- ウェブで音を扱う方法
- HTML Audio要素
	- Audio要素の制限
- Web Audio API


-----


# HTML Audio要素

- `<audio src="music.mp3" autoplay />` 
- Audio要素で音声ファイルを指定再生できる
- Img要素、Video要素の音声版
- 指定するだけなので簡単

-----

# Audio要素のいいところ

- 
[大体のブラウザがサポートしてる](http://caniuse.com/#feat=audio)

![Audio Element, inline](http://monosnap.com/image/j9MzKXxcRl7QUVbSdW2kI7PIPKgJJE.png)

------


# Audio要素の問題

- iOSやAndroidで制限がある
- ユーザーインタラクションで開始しないと再生できない
- 同時に再生できる音声が1つとなる制限

----

# Audio要素の問題 - ユーザインタラクション

```js
var audio = new Audio('sound.mp3');
// クリックしたら、再生
document.body.addEventListner('click', function (event) {
    event.preventDefault();
    // 再生開始
    audio.play();
});
```

-----

# Audio要素の問題 - 同時再生数が1つ

- 複数の音を同時に扱えない
- オーディオスプライトという回避策がある
	- 複数の音源を一つにまとめて、再生位置をずらして扱う
	- [JavaScript - スマホで音声再生をスムーズに行うためにオーディオスプライトを作成/使用する - Qiita](http://qiita.com/nakajmg/items/7be91626113bfc10846a "JavaScript - スマホで音声再生をスムーズに行うためにオーディオスプライトを作成/使用する - Qiita")
- Web Audio APIならこの制限はない

-----

# Web Audio API

-----

# Web Audio API

- Audioを扱うAPI
- AudioNodeやAudioParamを組み合わせて音を加工できる
- 複数の音を同時に鳴らせる
- [正確なスケジューリング](http://www.html5rocks.com/ja/tutorials/audio/scheduling/ "正確なスケジューリング")が可能(どのタイミングで音を鳴らすか)

-----

# Web Audio API - [サポートブラウザ](http://caniuse.com/#feat=audio-api)

![audio-api, inline](http://monosnap.com/image/zjS9ZVTmqTyfmYWoRJ26jKxp1x7veL.png)

-----

# Web Audio API - サポートブラウザ

- IEやAndroidなどでサポートされてない([次期IEには載る](https://status.modern.ie/webaudioapi?term=audio%20api))
- Flashを使ってシミュレート、フェールバックとしてAudio要素を使うものが存在する
- [g200kg/WAAPISim](https://github.com/g200kg/WAAPISim "g200kg/WAAPISim")
- [CreateJS/SoundJS](https://github.com/CreateJS/SoundJS "CreateJS/SoundJS")
- [sebpiq/node-web-audio-api](https://github.com/sebpiq/node-web-audio-api "sebpiq/node-web-audio-api")

-----

# Web Audio API - コード

```js
// Nodeなどを管理する`context`
var context = new AudioContext();
// Nodeを作ってconnectしていく
var sourceNode = context.createBufferSource();
sourceNode.buffer = audioBuffer;// 音源データはBuffer
var gainNode = context.createGain();
sourceNode.connect(gainNode);
gainNode.connect(context.destination);
source.start(0, 0);// 0秒後にoffset0で再生開始
```

-----


# [AudioNode](https://developer.mozilla.org/ja/docs/Web/API/AudioNode "AudioNode")をつなぐ

![audio node,inline](img/audio-node.png)

----

# AudioNodeとは

- 基本的には音源、フィルターや解析器などが`*Node`として用意されている
- `nodeA.connect(nodeB)`のようにつなぎ合わせる
- シンプルなフローコントロールライブラリを書いた
	- [azu/audio-node-flow](https://github.com/azu/audio-node-flow "azu/audio-node-flow")
- 最終出力は`AudioDestinationNode`というcontextが持つ特殊なNodeへ`connect`する
- 作ったNodeは基本的に**使い捨て**なので再利用できない

----

# Web Audio API - 問題

- ブラウザによって古い実装が混じってる
	- `webkit` prefix、`play` or `noteOn`、メソッド名の変更...
	- 大体は[polyfill](http://qiita.com/mohayonao/items/d79e9fc56b4e9c157be1#polyfill "polyfill")で吸収できる
- 古いiOS(7.1)などで特殊な動作をすることがある
- iOSで最初の一回のみユーザインタラクションで始めないと再生できない

----

# ライブラリ

- [CreateJS/SoundJS](https://github.com/CreateJS/SoundJS "CreateJS/SoundJS")
- [goldfire/howler.js](https://github.com/goldfire/howler.js/ "goldfire/howler.js")
	- 定番的な立ち位置のライブラリ
	- データのロード、再生、フェールバック、iOSの初回再生のハックなど
- [mohayonao/web-audio-test-api](https://github.com/mohayonao/web-audio-test-api "mohayonao/web-audio-test-api")
	- Nodeで動くモック的なテストライブラリ

----

# 参考

- [音を扱うJavaScriptライブラリや記事 - Qiita](http://qiita.com/mohayonao/items/d79e9fc56b4e9c157be1#polyfill "音を扱うJavaScriptライブラリや記事 - Qiita")
- [O&#39;Reilly Japan - Web Audio API](http://www.oreilly.co.jp/books/9784873116419/ "O&#39;Reilly Japan - Web Audio API")
- [Web Audio API 解説 - 01.前説 | g200kg Music &amp; Software](http://www.g200kg.com/jp/docs/webaudio/ "Web Audio API 解説 - 01.前説 | g200kg Music &amp; Software")
- [JavaScript - Web Audio APIのソースコード - Qiita](http://qiita.com/mohayonao/items/ae1c90eaba32c97fd96c "JavaScript - Web Audio APIのソースコード - Qiita")
- [HTML5で音を扱う3つの方法](http://150217-html5sound.fnobi.com/ "HTML5で音を扱う3つの方法")

----

# 問題集(若干古めのiOS)

- [Takazudolog - 地獄のvideo／audio要素](http://takazudo.github.io/blog/entry/2013-02-06-videoaudio.html "Takazudolog - 地獄のvideo／audio要素")
- [Web Audio系APIを使うときに注意する点 - 音の鳴るブログ](http://mohayonao.hatenablog.com/entry/2012/12/12/103009 "Web Audio系APIを使うときに注意する点 - 音の鳴るブログ")
- [JavaScript - スマホで音声再生をスムーズに行うためにオーディオスプライトを作成/使用する - Qiita](http://qiita.com/nakajmg/items/7be91626113bfc10846a "JavaScript - スマホで音声再生をスムーズに行うためにオーディオスプライトを作成/使用する - Qiita")