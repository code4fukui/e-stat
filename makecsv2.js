import { RDF } from "./RDF.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const cityen = "sabae";
//const cityen = "iida";
const fn = "population2-" + cityen + ".json";
const data = JSON.parse(await Deno.readTextFile(fn));

const res = RDF.simplify(data);

const res2 = res.sort((a, b) => a.age.localeCompare(b.age));

const mapStatus = {
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-1": "未婚",
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-2": "有配偶",
  //"http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-3": "死別・離別",
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-31": "死別",
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-32": "離別",
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-4": "配偶関係「不詳」",
  "http://data.e-stat.go.jp/lod/ontology/g00200521/code/2015/maritalStatus-all": "総数",
};
const mapFilter = (name, map, data) => {
  return data.map(d => {
    const dname = d[name];
    for (const s in map) {
      if (s.endsWith(dname)) {
        const d2 = {};
        Object.assign(d2, d);
        d2[name] = map[s];
        return d2;
      }
    }
    return null;
  }).filter(d => d);
};
const res3 = mapFilter("status", mapStatus, res2);
console.log(res3);
await Deno.writeTextFile("population2-" + cityen + ".csv", CSV.stringify(res3));
