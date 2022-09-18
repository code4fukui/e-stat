//const city = "鯖江市";
//const cityen = "sabae";
const city = "飯田市";
const cityen = "iida";

const query = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>
PREFIX estat-measure: <http://data.e-stat.go.jp/lod/ontology/measure/>
PREFIX cd-dimension: <http://data.e-stat.go.jp/lod/ontology/crossDomain/dimension/>
PREFIX cd-code: <http://data.e-stat.go.jp/lod/ontology/crossDomain/code/>
PREFIX g00200521-dimension-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/dimension/2010/>
PREFIX g00200521-code-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/code/2010/>
select  ?age ?sex ?population ?year ?nationality ?status
where {
      ?s estat-measure:population ?population ;
         sdmx-dimension:refArea / rdfs:label "${city}"@ja ;
         <http://data.e-stat.go.jp/lod/ontology/g00200521/dimension/2010/area> <http://data.e-stat.go.jp/lod/ontology/g00200521/code/2010/area-all>;
         cd-dimension:timePeriod ?year;
         cd-dimension:sex ?sex;
         cd-dimension:nationality ?nationality;
         cd-dimension:age ?age.
      optional { ?s <http://data.e-stat.go.jp/lod/ontology/g00200521/dimension/2015/maritalStatus> ?status. }
}
`
const endpoint = "https://data.e-stat.go.jp/lod/sparql/";
const url = endpoint + "alldata/query?query=" + encodeURIComponent(query);
const res = await (await fetch(url)).json();
console.log(res);
await Deno.writeTextFile("population-" + cityen + ".json", JSON.stringify(res));
