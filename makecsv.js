import { CSV } from "https://js.sabae.cc/CSV.js";

//const cityen = "sabae";
const cityen = "iida";
const fn = "population-" + cityen + ".json";
const data = JSON.parse(await Deno.readTextFile(fn));
//console.log(data);
const list = data.results.bindings;
console.log(list[0])
const com = list.map(l => {
  const res = {};
  for (const name in l) {
    const o = l[name];
    if (o.type == "uri") {
      res[name] = o.value.substring(o.value.lastIndexOf("/") + 1);
    } else if (o.type == "literal") {
      res[name] = o.value;
    } else {
      throw "unknown type";
    }
  }
  return res;
});
//console.log(com[0]);

const ages = [];
for (const c of com) {
  if (ages.indexOf(c.age) == -1) {
    ages.push(c.age);
  }
}
ages.sort();
//console.log(ages);
await Deno.writeTextFile("ages.csv", CSV.stringify([ages]));
// 0,1, ... 99,over-100
const byyear = [];
const sex = "sex-all";
//const sex = "sex-female";
const year = "2015";
const nationality = "nationality-all";
let sum = 0;
for (let i = 0; i <= 99; i++) {
  const age = "age-" + (i == 100 ? "over100" : i);
  const hit = com.find(c => c.age == age && c.sex == sex && c.year == year && c.nationality == nationality);
  const cnt = hit ? hit.population : 0;
  byyear.push({ name: i, value: cnt })
  sum += parseInt(cnt);
}
await Deno.writeTextFile("population-" + cityen + ".csv", CSV.stringify(byyear));
console.log(sum); // 45540:sabae, 66431:iida(34998:f, 32695:m => 67693)
  
//await Deno.writeTextFile("population-" + cityen + ".csv", CSV.stringify(com));
