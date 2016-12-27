'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _mongodb = require('mongodb');

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
    db: {},
    ObjectID: _mongodb.ObjectID
};
exports.default = db;
function init() {

    var url = void 0;

    _winston2.default.debug(process.env.NODE_ENV);

    if (process.env.NODE_ENV == 'testing') {
        _winston2.default.info("Mongodb testing mode entered");
        url = 'mongodb://mongo:27017/webrunes_test';
    } else {
        _winston2.default.info("Normal mongodb mode entered");
        var host = _nconf2.default.get('mongo:host');
        var user = _nconf2.default.get('mongo:user');
        var password = _nconf2.default.get('mongo:password');
        var mongodbname = _nconf2.default.get('mongo:dbname');

        if (user) {
            url = 'mongodb://' + user + ':' + password + '@' + host + '/' + mongodbname;
        } else {
            url = 'mongodb://' + host + '/' + mongodbname;
        }
    }

    return new Promise(function (resolve, reject) {
        _mongodb.MongoClient.connect(url, function (err, database) {
            if (err) {
                return reject(err);
            }

            db.db = database;
            resolve(db.db);
        });
    });
}