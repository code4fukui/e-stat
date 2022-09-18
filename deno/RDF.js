const simplify = (rdfjson) => {
  const list = rdfjson.results.bindings;
  const com = list.map(l => {
    const res = {};
    for (const name in l) {
      const o = l[name];
      if (name == "s") {
        res[name] = o.value;
      } else if (o.type == "uri") {
        res[name] = o.value.substring(o.value.lastIndexOf("/") + 1);
      } else if (o.type == "literal") {
        res[name] = o.value;
      } else {
        throw "unknown type";
      }
    }
    return res;
  });
  return com;
};

export const RDF = {
  simplify,
};
