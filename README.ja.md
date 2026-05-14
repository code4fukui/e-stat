# e-stat

日本の政府統計e-Statオープンデータプラットフォームから人口データを取得・処理・可視化するプロジェクトです。

## デモ

デモページでは、2015年の長野県飯田市（赤）と福井県鯖江市（緑）の人口の年齢分布を比較する折れ線グラフを表示しています。

[飯田市と鯖江市の人口分布比較](https://code4fukui.github.io/e-stat/population-iida-sabae.html)

## オープンデータ

このリポジトリでは、e-Statの国勢調査から取得した、2010年および2015年の全国の市区町村の人口データを提供しています。主要なデータセットは以下の形式で利用可能です：

- [CSV](https://code4fukui.github.io/e-stat/population.csv)
- [JSON](https://code4fukui.github.io/e-stat/population.json)
- [CBOR](https://code4fukui.github.io/e-stat/population.cbor)

データソース: [e-Stat 統計LOD](https://data.e-stat.go.jp/lodw/)

## データの再生成方法

データは、e-StatのSPARQLエンドポイントにクエリを実行するDenoスクリプトを使用して生成されています。

### 要件

- [Deno](https://deno.land/) ランタイム

### メインデータセットの生成

全国の市区町村の `population.csv`、`.json`、`.cbor` ファイルを再生成するには：

1.  e-StatのSPARQLエンドポイントから生データを取得します。これにより `deno/population-all.rdf.json` が作成されます。
    ```sh
    deno run -A deno/get-population-all.js
    ```

2.  ダウンロードしたRDF/JSONを処理し、ルートディレクトリに最終的なフォーマットで出力します。
    ```sh
    deno run -A deno/make-population-all.js
    ```

### デモ用データの生成

デモには飯田市と鯖江市の専用のCSVファイルが必要です。これらのスクリプトは、特定の市区町村のより詳細なデータをクエリする方法を示しています。

1.  `deno/get-population.js` と `deno/makecsv.js` を編集して、目的の市区町村を指定します（スクリプトは飯田市または鯖江市用に事前設定されているため、変数のコメントアウト/コメント解除を行うだけです）。

2.  スクリプトを実行してデータを取得し、最終的なCSV（例: `population-iida.csv`）を生成します：
    ```sh
    # 設定した市区町村の詳細データを取得する
    deno run -A deno/get-population.js

    # 可視化用のCSVに処理する
    deno run -A deno/makecsv.js
    ```

3.  もう一方の市についても同様の手順を繰り返し、対応するデータを生成します。

## ライセンス

MIT License — [LICENSE](LICENSE)を参照してください。
