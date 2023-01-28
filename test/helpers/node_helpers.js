const util = require('util');
const assert = require('assert');

const _range = (start, stop, step) => Array.from({ length: ((stop-1) - start) / step + 1}, (_, i) => start + (i * step));

const range = (start, stop, step) => {
    assert(start !== undefined, 'start should always be defined');

    if (stop !== undefined) {
        assert(start <= stop, 'start must be less than or equal to stop');
    }

    step = step === undefined ? 1 : step;

    stop = stop === undefined ? start : stop;

    start = stop === undefined ? 0 : start;

    return _range(start, stop, step);
}

module.exports = {
    async_filter: async (arr, predicate) => Promise.all(arr.map(predicate))
        .then((results) => arr.filter((_v, index) => results[index])),
    sleep: async function(msec) {
        const sleep = util.promisify(setTimeout);

        await sleep(msec)
    },
    range,
}