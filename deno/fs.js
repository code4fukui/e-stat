export const write = async (fn, json) => {
  await Deno.writeTextFile(fn, JSON.stringify(json, null, 2));
};
export const read = async (fn) => {
  return JSON.parse(await Deno.readTextFile(fn));
};
