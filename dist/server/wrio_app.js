'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init_cors;

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init_cors(app) {

    // Add headers
    app.use(function (request, response, next) {

        //console.log(request);
        var host = request.get('origin');
        if (host == undefined) host = "";

        var domain = _nconf2.default.get("server:workdomain");

        domain = domain.replace(/\./g, '\\.') + '$';
        _winston2.default.log('silly', domain);

        if (host.match(new RegExp(domain, 'm'))) {
            response.setHeader('Access-Control-Allow-Origin', host);
            _winston2.default.log("debug", "Allowing CORS for webrunes domains");
        } else {
            _winston2.default.log("debug", 'host not match');
        }

        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    return app;
};