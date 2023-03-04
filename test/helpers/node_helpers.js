const util = require("util");
const assert = require("assert");
const fs = require("fs");

function writeArrayToFile(fileName, array) {
  fs.writeFile(fileName, array.join("\n"), function (err) {
    if (err) throw err;
    console.log(`The file ${fileName} has been saved!`);
  });
}

const getMethods = (obj) =>
  Object.getOwnPropertyNames(obj).filter(
    (item) => typeof obj[item] === "function"
  );

const _range = (start, stop, step) =>
  Array.from(
    { length: (stop - 1 - start) / step + 1 },
    (_, i) => start + i * step
  );

const range = (start, stop, step) => {
  assert(start !== undefined, "start should always be defined");

  if (stop !== undefined) {
    assert(start <= stop, "start must be less than or equal to stop");
  }

  step = step === undefined ? 1 : step;

  stop = stop === undefined ? start : stop;

  start = stop === undefined ? 0 : start;

  return _range(start, stop, step);
};

const async_filter = async (arr, predicate) =>
  Promise.all(arr.map(predicate)).then((results) =>
    arr.filter((_v, index) => results[index])
  );

module.exports = {
  async_filter,
  sleep: async function (msec) {
    const sleep = util.promisify(setTimeout);

    await sleep(msec);
  },
  range,
  writeArrayToFile,
  getMethods,
};
