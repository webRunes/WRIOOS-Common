const path = require('path');
const nconf = require('nconf');
const fs = require('fs');
const logger = require('winston');

nconf.env().argv();

var basedirPath = path.dirname(require.main.filename); // won't work with unit tests
let file;

if (process.env.WRIO_CONFIG) {
    file = path.resolve(__dirname, `../../${process.env.WRIO_CONFIG}`);
} else {
    file = path.resolve(__dirname, '../../config.json');
}

if (!fs.existsSync(file)) {
    throw new Error(`Config file not found ${file}`);
}

nconf.file(file);
logger.info(`Configuration loaded from ${file}`);

module.exports = nconf;