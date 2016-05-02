import path from 'path';
import nconf from 'nconf';

nconf.env().argv();

var basedirPath = path.dirname(require.main.filename); // won't work with unit tests
nconf.file(path.resolve(__dirname, '../config.json'));

console.log("Sample configuration loaded");

export default nconf;