import { RDF } from "./RDF.js";

const endpoint = "https://data.e-stat.go.jp/lod/sparql/";

export const query = async (query) => {
  const url = endpoint + "alldata/query?query=" + encodeURIComponent(query);
  const rdf = await (await fetch(url)).json();
  return RDF.simplify(rdf);
};
