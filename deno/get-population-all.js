import { query } from "./query.js";
import { write } from "./fs.js";

// "2015"^^xsd:gYear
const q = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>
PREFIX estat-measure: <http://data.e-stat.go.jp/lod/ontology/measure/>
PREFIX cd-dimension: <http://data.e-stat.go.jp/lod/ontology/crossDomain/dimension/>
PREFIX cd-code: <http://data.e-stat.go.jp/lod/ontology/crossDomain/code/>
PREFIX g00200521-dimension-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/dimension/2010/>
PREFIX g00200521-code-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/code/2010/>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>
PREFIX dcterms: <http://purl.org/dc/terms/>
select  ?lgcode ?year ?population
where {
      ?s estat-measure:population ?population ;
         sdmx-dimension:refArea / dcterms:identifier ?lgcode ;
         cd-dimension:timePeriod ?year;
         cd-dimension:sex cd-code:sex-all ;
         cd-dimension:nationality cd-code:nationality-japan ;
         g00200521-dimension-2010:area g00200521-code-2010:area-all ;
         cd-dimension:age cd-code:age-all .
}
`;

const res = await query(q);
await write("population-all.rdf.json", res);
