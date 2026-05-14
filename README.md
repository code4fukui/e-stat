# e-stat

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A project to fetch, process, and visualize population data from the Japanese government's e-Stat open data platform.

## Demo

The demo page displays a line chart comparing the age distribution of the populations in Iida City, Nagano (red) and Sabae City, Fukui (green) for the year 2015.

[Comparison of population distribution for Iida City and Sabae City](https://code4fukui.github.io/e-stat/population-iida-sabae.html)

## Open Data

This repository provides population data for all municipalities in Japan for the years 2010 and 2015, sourced from the e-Stat census. The primary dataset is available in multiple formats:

- [CSV](https://code4fukui.github.io/e-stat/population.csv)
- [JSON](https://code4fukui.github.io/e-stat/population.json)
- [CBOR](https://code4fukui.github.io/e-stat/population.cbor)

Data source: [e-Stat 統計LOD](https://data.e-stat.go.jp/lodw/)

## How to Regenerate the Data

The data is generated using Deno scripts that query the e-Stat SPARQL endpoint.

### Requirements

- [Deno](https://deno.land/) runtime

### Generating the Main Dataset

To regenerate the `population.csv`, `.json`, and `.cbor` files for all municipalities:

1.  Fetch the raw data from the e-Stat SPARQL endpoint. This will create `deno/population-all.rdf.json`.
    ```sh
    deno run -A deno/get-population-all.js
    ```

2.  Process the downloaded RDF/JSON into the final formats in the root directory.
    ```sh
    deno run -A deno/make-population-all.js
    ```

### Generating Data for the Demo

The demo requires specific CSV files for Iida and Sabae cities. These scripts demonstrate how to query for more detailed, city-specific data.

1.  Modify `deno/get-population.js` and `deno/makecsv.js` to specify the desired city (the scripts are pre-configured for Iida or Sabae, just comment/uncomment the variables).

2.  Run the scripts to fetch the data and generate the final CSV (e.g., `population-iida.csv`):
    ```sh
    # Fetch detailed data for the configured city
    deno run -A deno/get-population.js

    # Process it into a CSV for the visualization
    deno run -A deno/makecsv.js
    ```

3.  Repeat the process for the other city to generate its corresponding data.

## License

MIT License — see [LICENSE](LICENSE).