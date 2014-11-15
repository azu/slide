title: "Canvasを使ったDRM?について"
author:
  name: azu
  twitter: azu_re  
  url: http://efcl.info/
theme: azu/cleaver-ribbon
output: index.html
--



--

# 自己紹介

<img src="https://github.com/azu/slide/raw/master/offline_study/simple320_320.png" width="196" />

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"

--

# アジェンダ

- コミックサイトで見られる**単純な**画像のスクランブルの仕組み
- パズルCanvas
- スクランブルのデコード
- Canvasを自体の問題

--

# 画像のスクランブルの実装

- 画像を直接ダウンロードされないようにスクランブルしてることがある
- 単純な実装だと画像をパズルのように並び変えただけ

--

![puzzuled image](img/encoded.png)

--

# パズルCanvasを実装してみる

これは余計な処理を省いたとても単純なケースです

- Canvasによる画像のエンコード
- 分割した画像と位置のマッピングの作成
- マッピングをランダムで並び替えてレンダリング
- マッピングデータを保存

--

# 画像のエンコード


<iframe src="encode/index.html" width="100%" height="100%" marginheight="0" marginwidth="0"></iframe>

--

- まじめにDRMを実装してる場合はもっと複雑な事をしてそう
- バイナリデータでのやり取り
- 重要な処理はサーバに寄せる
- ワンタイム的な仕組みなど
- 秘匿により保護される仕組みは基本的に破綻してる

--

# 画像のデコード

- 画像のエンコードの逆をすればいいだけ
- マッピングデータとエンコード済みの画像を用意
- 組み合わせてCanvasでレンダリング

--

<iframe src="decode/index.html" width="100%" height="100%" marginheight="0" marginwidth="0"></iframe>

--

# 本当に意味がある実装なのか?

- キャプチャは避けられない
- Canvasにはもっと直接的な方法がある
- => DEMO

--
