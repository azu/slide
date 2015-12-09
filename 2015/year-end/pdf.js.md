# pdf.js-controller


-----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

----

# [mozilla/pdf.js](https://github.com/mozilla/pdf.js "mozilla/pdf.js")

 ![pdf inline](img/pdf.js.png)


----

# [mozilla/pdf.js](https://github.com/mozilla/pdf.js "mozilla/pdf.js")

- JavaScriptで書かれたPDFレンダリングライブラリ
- FirefoxのビルトインPDFビューアーに使われてる
- PDFをパース => Canvas + テキストでレンダリング

-----

## pdf.jsの問題

- とにかく扱いにくい
- `cmaps`という言語ロケールの動的ロードが必要
	- 必要なロケールのみを取得するため
- `pdf.worker.js`というのをWebWorkerで動かす
	- `pdf.worker.js`のURLを指定する必要がある


-----

## pdf.worker.js

- pdf.jsはWebWorkerで計算を行う
- `PDFJS.workerSrc` はなぜかURLのみしか受け付けない
- [String to Blob URL for WebWorker](https://gist.github.com/azu/1949d61a57d0eb896f2a "String to Blob URL for WebWorker")だとChromeでクラッシュした…
	- ファイルサイズがでかいとWorker+Blobがダメなのかも?

-----



## pdf.jsのテクニック

- Worker内なら同期XHRが使える
- WorkerのコピーコストはBlob URLをやり取りで解消
	- [Using PDF.js web worker cross domain (CORS) | ColonelPanic](http://colonelpanic.net/2014/08/using-pdf-js-web-worker-cross-domain-cors/ "Using PDF.js web worker cross domain (CORS) | ColonelPanic")

------


## pdf.jsの問題

- デフォルトでは日本語は文字化けする
	- `cmaps`のロードが必要
- デフォルトではCanvasに画像としてレンダリングされるだけ
- テキスト選択やリンクのクリックもできない!


-----



## [pdf.js-controller](https://github.com/azu/pdf.js-controller "pdf.js-controller")

- pdf.jsの面倒なところをラップしたライブラリ
- スライド表示を扱うAPI
- [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist "pdfjs-dist")へのパスを書くだけで面倒なことはやってくれる
- 最初から日本語表示できる。テキスト選択出来る。リンクをクリック出来る


-----

# pdf.jsのレイヤー構造

-----

# 全体像3D

![3D View, inline](https://monosnap.com/file/IowSnMYNqvBbU3sGCCd3o3U2DlVYnA.png)


----

# Canvas

![Canvas Layer, inline](https://monosnap.com/file/NjFOff5GhvGbB4I1XQKftvznz0bzD1.png)

----

# テキスト


![Text Layer,inline](https://monosnap.com/file/3rjEGpf4jm9phrC3R3oyj9ohjNoSEG.png)


-----

# アノテーション

![Annotation Layer, inline](https://monosnap.com/file/BUFO9rYHuw0gK7UbhooUZ5tNRo7WCd.png)


-----

## このスライドも[pdf.js-controller](https://github.com/azu/pdf.js-controller "pdf.js-controller")


-----
