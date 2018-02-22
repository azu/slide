autoscale: true

# [fit] 滞在中のパフォーマンスの改善

----

## やること

- 起動時ではなく滞在中のパフォーマンス改善

### やらないこと

- 起動時のパフォーマンス改善
- メモリ抑制

----


## 最初に


- 観測できる環境を作る
- 観測する
- 改善する
- 繰り返す


----

## 定量化


- 滞在中のパフォーマンスはあらゆるイベントが飛んでくる
- 定量が難しい
- 起動時ならなFMPやTTIなどが分かりやすい目安がある
- 目安がないので、目安を自分で作る

-----

## performance.mark


- 自分で書く
- [ページ上でずっと動いているsetTimeout、setInterval、requestAnimationFrameを見つけてパフォーマンス改善する | Web Scratch](http://efcl.info/2017/12/07/capture-living-timer/)
- [performance.markにメタデータを紐付けできるライブラリを書いた | Web Scratch](http://efcl.info/2017/11/15/performance.mark-metadata/)
- [Almin + React/Vue.jsのパフォーマンスプロファイルをタイムライン表示できるように | Web Scratch](http://efcl.info/2017/09/20/almin-performance-profile-0.14.0/)




-----

## 可視化


- 図
- この辺はただのモチベーション
- 人を説得するためのツール

----

## パフォーマンス

- ひらすたパフォーマンス改善

----

## 計測の環境

- 普通の開発マシンで60FPSでるのは当たり前
- 低スペックのマシンでちゃんと動くようにするのが目的
- 実際のIEなどを使うと計測自体がむずかしい
- Chromeのスロットルを活用する


----

## CPUスロットリング

- 1x
- 4x
- 6x
- が選べる
- もっと柔軟に選べて欲しい


-----

## RUMの再現性

- Real user monitoring(RUM)の再現性はやっぱり取れない
- マイクロベンチマークを重ねていく


----

## React

- <del>react-addon-tools</del>
- why update
- ?react_perf



----

## flux

- 今の時代アクションはイベント化されている
- イベントを可視化する
- flux(自作)
- almin(`peformanceProfile`オプション)
- vue (`performance`オプション)
- react (`?react_perf`、16からはデフォルト)


----

## 観測観測

- 可視化
	- あるアクションが起きたら
	- どのViewが更新され
	- FPSに対してどのような影響があるか


-----

![fit ](/Users/azu/Dropbox/Memo/quiver/Work.qvnotebook/5FF85EF1-843E-4EA6-9AB7-4D6A78335ACA.qvnote/resources/33495595725FF9D22DDA191D37E05E75.jpg)

-----

## すべてのイベントを認識できない

- 内部的な変更
	- `setState`してるだけだとログがでてこない
- 無駄な更新
	- 更新した結果が全く同じ
	- [maicki/why-did-you-update: Puts your console on blast when React is making unnecessary updates.](https://github.com/maicki/why-did-you-update)
	- [react-addons-perf](https://www.npmjs.com/package/react-addons-perf)
	- [shallow-equal for Object/React props | Web Scratch](http://efcl.info/2017/11/30/shallow-equal/ "shallow-equal for Object/React props | Web Scratch")
		- デバッグ付きshallow-equal
- 発見から改善

-----

## プロファイル

- 問題点をプロファイルを取る
- timelineで記録
- timelineをjsonとして保存
- リポジトリに突っ込む

-----


## 無駄パターン

- 入力欄の更新コストの改善
- componentDidUpdateでlayoutの発生
	- componentDidUpdate後に毎回layoutを計算していた
		- offsetなどは触るだけでreflowを起こす
	- イベントに切り替える
	- <del>ResizeObserver</del>
		- [Modular Responsive Web Design using Element Queries](https://arxiv.org/pdf/1511.01223v1.pdf)
	- IntersectionObserver
- スロットリング
	- 一度に追加するのではまとめて追加する
- 定期的に動いてるものを停止する
	- setTimeout、requestAnimationFrame
- 無駄な更新が走っているコンポーネント
	- mouse moveで更新されるコンポーネント
	- 範囲外をクリックしたらパネルを閉じる仕組み


-----


## 改善パターン

- 問題をどうやってみつける
- 観測する
- どうやって計測するか
- どうやって改善するか
- どうやって改善結果を示すか


----

## shouldComponentUpdate

- shouldComponentUpdateをちゃんと実装する
- 特に大量のViewがあるときにあとから改善するのが難しい
- 最初に規定クラスなどのべースを作っておくと後から楽
- propsに関数を渡してElementを作るやつの柔軟性はあるけど、関数同士の比較は基本的にできない
- shouldComponentUpdateで関数を取り除く


----

具体例: リストの改善

- 大きなリストの表示
- 表示範囲だけを更新する仕組みを既に持ってる
- それでもスペックのマシンだと
	- 10コ要素を追加
	- 10コ要素を削除
- ぐらいの処理が重たい(これがリアルタイムで起きてるならなおさら)


----

![fit, 図](https://monosnap.com/file/PnDx8ErAkxA0xtOJuLWlJJyNMqPOeQ.png)

----

## できるといいこと

- プロファイルデータを取る
- ひたすら問題っぽいパターンをGitHubに投げておく
- 大体100MBぐらいなので
- この時 ?react_perfなどのマークやスクショも保存できる
- 再現性がとにかく大事
- CPUスロットリングをとにかく使う
	- パフォーマンス良いマシンでやっても無駄
- 改善では限界はくる 軽量モードを提案する
- フラグ付きで軽量化できる部分をどんどん実装していく



----

# 破壊的改善

# 軽量モード

いわゆる色々な機能を削ったりできる軽量モードの実験実装

## 有効化の方法

URLに `&light_mode=disable-feature1,disable-feature2` などそれぞれの機能を無効化できるフラグを設定できる。複数渡す時は `,` など適当なもので区切る。


----

- いらない機能をどんどん落として破棄的変更を入れる
- フラグ以下なら気軽につっこめる


---


## まとめ

- 計測できる環境を作る
- 観測する
- 改善する
- 改善結果を示して直す
- 繰り返す

