import { LGCode } from "https://code4fukui.github.io/LGCode/LGCode.js";
import { read } from "./fs.js";
import { writeData } from "https://js.sabae.cc/writeData.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const json = await read("population-all.rdf.json");
const lgcodes = ArrayUtil.toUnique(json.map(j => j.lgcode));
const list = lgcodes.map(l => {
  const res = {};
  res.lgcode = LGCode.normalize(l);
  json.filter(j => j.lgcode == l).forEach(d => {
    res[d.year] = d.population;
  })
  return res;
});
list.sort((a, b) => a.lgcode.localeCompare(b.lgcode));
console.log(list);

await writeData("../population", list);
