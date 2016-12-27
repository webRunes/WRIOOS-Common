'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nconf2.default.env().argv();

var basedirPath = _path2.default.dirname(require.main.filename); // won't work with unit tests

if (process.env.WRIO_CONFIG) {
    _nconf2.default.file(_path2.default.resolve(__dirname, '../../' + process.env.WRIO_CONFIG));
} else {
    _nconf2.default.file(_path2.default.resolve(__dirname, '../../config.json'));
}

console.log("Sample configuration loaded");

exports.default = _nconf2.default;