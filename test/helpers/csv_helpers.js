const fs = require('fs');
const csv = require('csv-parser');
const assert = require('assert');

module.exports = {
    read_csv: async function (filePath) {
        const data = {};
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', row => {
                    const first_col = Object.keys(row)[0];
                    // console.log(first_col);
                    const key = row[first_col];

                    assert(!Object.keys(data).includes(key), `key ${key} already exists`);

                    delete row[first_col];
                    data[key] = row;
                    // console.log(data[key]);
                })
                .on('end', () => {
                    resolve(data);
                })
                .on('error', error => {
                    reject(error);
                });
        });
    },
}