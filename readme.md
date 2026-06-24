# Slide

Github Pagesで公開しているスライドが置いてあります

<https://azu.github.io/slide/>

- [azu/pdf-slide-html: Generator cli for azu/slide-pdf.js.](https://github.com/azu/pdf-slide-html)
- [azu/slide-pdf.js: Presentation tools for pdf file in browser.](https://github.com/azu/slide-pdf.js)

## PDF slide HTML

`pdf-slide-html` の生成機能は、このリポジトリの `_tools/pdf-slide-html` に移植しています。Sassは使わず、`assets/pdf-slide-html/index.css` と `assets/pdf-slide-html/index.js` を生成HTMLから相対パスで読み込みます。

```shell
npm run pdf-slide-html -- \
  --markdown 2025/tskaigi/jsprimer.md \
  --output 2025/tskaigi/jsprimer.html
```

`--pdf-url` を省略した場合は、`--output` の `.html` を `.pdf` に変えた `https://azu.github.io/slide/` 配下のURLを使います。`--base-url` を省略した場合は `https://azu.github.io/slide-pdf.js/` を使います。

生成時はDecksetの先頭設定、`[fit]`、画像の `right`/`fit` などの表示修飾、単独の `[.autoscale: false]` のようなコマンドを本文HTMLから除きます。`^` で始まる発表者ノートは、本文内で発表者ノート用のブロックとして表示します。


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

ライセンスについて記述がないもの以外は、デフォルトでMITライセンス
