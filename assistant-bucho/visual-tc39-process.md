# Visualize TC39 Process

## TC39によるECMAScript策定プロセス


-----

# 詳しくは[TC39 Process - Google ドキュメント](https://docs.google.com/document/d/1QbEE0BsO4lvl7NFTn5WXWeiEIBfaVUF7Dk0hpPpPDzU/edit "TC39 Process - Google ドキュメント")を参照

------

# TC39 Process :train:

Stageは5段階

- 0 Stawman
- 1 Proposal
- 2 Draft
- 3 Candidate
- 4 Finished

毎年 3月と9月にstage4なったものを取り入れたものを新しいECMAScriptとする

-----

#DEMO

![fit img](http://monosnap.com/image/OjbcN954c9EosPIR9rpX4MkDD7jwEk.png)

## [azu.github.io/tc39-svg/](http://azu.github.io/tc39-svg/)

-----

# Stage 0: Stawman

- アイデア

-----

# Stage 1: Proposal

- プロポーサルの目的や解決方法を示す
- Polyfillやデモ等を用いて解説する

-----

# Stage 2: Draft

- いわゆるドラフト
- ECMAScript標準と同じルールでAPIや構文、セマンティックについて説明していなければならない
	- 仕様書と同じ記法でプロポーサルを書き直す

-----

# Stage 3: Candidate

- 設計は完了した状態
- 実装者からフィードバックを求めて改善をする状態
- レビューアはその仕様策定者以外ならだれでもなれるが専門的な知識を持っている必要がある

-----

# Stage 4: Finished

- ECMAScriptへ取り込まれる準備が完了したことを示す状態
- 2つの実装がテスト([tc39/test262](https://github.com/tc39/test262 "tc39/test262"))をパスしてる状態

-----

# Stage up

- Stage++するかは、2ヶ月ごとのTC39のミーティングで決まる
	- [tc39-notes](https://github.com/rwaldron/tc39-notes "rwaldron/tc39-notes")
- 逆算すれば、Stage 0のものがStage4になるまで8ヶ月かかる
	- Stage 1から始めるものもある


----

# ES2016(想像上の話)

- おそらくES2016までにStage 4となるものはない
	- [tc39/ecma262](https://github.com/tc39/ecma262 "tc39/ecma262")
- ES2015 == ES2016
- ES2016 == ISO/IEC 16262:2016
- 多分、perhaps

-----

#  [azu.github.io/tc39-svg/](http://azu.github.io/tc39-svg/)の中身

-----

# SVG + React

![inline](http://monosnap.com/image/k4e7nFxZYX32cLXDXR3ACCqLurVpYg.png)


-----

# SVG on React

- SVGの要素をReact Componentに書ける
- 縮尺の問題は[d3-scale](https://github.com/d3/d3-scale "d3-scale")をコンポーネントに渡す

![inline d3-scale](http://i0.wp.com/www.jeromecukier.net/wp-content/uploads/2011/08/d3scale1.png)


-----

# React + d3-scale

- コンポーネントがステートレスになる
- 幅、高さ その領域の相対座標計算機(range)を渡して描画

```js
var ECMAXRange = linear().domain(TenPercent).range([500, 800]);
var ECMAYRange = linear().domain(TenPercent).range([0, 500]);
<ECMAScript versionName={`ECMAScript ${this.state.beginYear}`}
    completeSpecList={completeSpecList}
    width={300} height={500}
    xRange={ECMAXRange} yRange={ECMAYRange}/>
```


-----

#A Proposal

- [ES nextの策定プロセスを分かりやすくまとめた記事 · Issue #57 · azu/azu](https://github.com/azu/azu/issues/57 "ES nextの策定プロセスを分かりやすくまとめた記事 · Issue #57 · azu/azu")