'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrap = undefined;
exports.loginWithSessionId = loginWithSessionId;
exports.getLoggedInUser = getLoggedInUser;
exports.authS2S = authS2S;
exports.wrioAuth = wrioAuth;
exports.wrioAdmin = wrioAdmin;
exports.restOnly = restOnly;

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _utils = require('../utils/utils.js');

var _basicAuth = require('basic-auth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasPassportUser(request) {
    var sessionData = request.session;
    if (sessionData.passport) {
        if (sessionData.passport.user) {
            return sessionData.passport.user;
        }
    }
}

// used to deserialize the user
function deserialize(id, done) {
    var webrunesUsers = _db2.default.db.collection('webRunes_Users');
    var sessions = _db2.default.db.collection('sessions');
    console.log("Deserializing user by id=" + id);
    webrunesUsers.findOne(_db2.default.ObjectID(id), function (err, user) {
        if (err || !user) {
            console.log("User not found", err);
            done(err);
            return;
        }
        done(err, user);
    });
};

function loginWithSessionId(request, done) {
    var user = hasPassportUser(request);
    if (user) {
        deserialize(user, done);
    } else {
        done("No WRIO user found");
    }
}

function getLoggedInUser(request) {
    return new Promise(function (resolve, reject) {
        loginWithSessionId(request, function (err, res) {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
}

function authS2S(request, response, next) {
    var creds = (0, _basicAuth2.default)(request);
    var login = _nconf2.default.get("service2service:login");
    var password = _nconf2.default.get("service2service:password");
    if (creds && login && password) {
        if (creds.name === login && creds.pass === password) {
            next();
            return;
        }
    }
    console.log("Access denied");
    response.status(403).send("Access denied");
}

/*
 export function authS2S(request,response,next) {
 var creds = auth(request);
 var login = nconf.get("service2service:login");
 var password = nconf.get("service2service:password");
 if (creds && login && password) {
 if ((creds.name === login) && (creds.pass === password)) {
 next();
 return;
 }
 }
 console.log("Access denied");
 response.status(403).send("Access denied");
 }*/

function isAdmin(id) {
    var admins = _nconf2.default.get('payment:admins');
    if (!admins) {
        return false;
    }
    var result = false;
    admins.forEach(function (user) {
        if (id == user) {
            result = true;
        }
    });
    return result;
}

var wrap = exports.wrap = function wrap(fn) {
    return function () {
        return fn.apply(undefined, arguments).catch(arguments.length <= 2 ? undefined : arguments[2]);
    };
};

function wrioAuth(req, resp, next) {

    loginWithSessionId(req, function (err, user) {
        if (err) {
            console.log("Permission denied", err);
            (0, _utils.dumpError)(err);
            return resp.status(401).send("Not authorized");
        }
        req.user = user;
        next();
    });
}

function wrioAdmin(req, resp, next) {
    wrioAuth(req, resp, function () {
        if (isAdmin(req.user.wrioID)) {
            next();
        } else {
            resp.status(403).send("Error: Not admin");
        }
    });
}

var allowedServices = ['core', 'login', 'titter', 'storage', 'webgold'];

function restOnly(request, response, next) {
    if (!(request.get('X-Requested-With') === "XMLHttpRequest")) {
        response.status(403).send("Only REST requests allowed");
        return;
    }
    var origin = request.get('origin');
    var domain = _nconf2.default.get("server:workdomain");

    next();

    /*  if (origin) {
          var exp = /^http(s)*:\/\/(core|login|webgold|titter|storage)\.wrioos\.com(\/)*$/g;
          if (origin.matches(exp)) {
              next();
          }
      } else {
          response.status(403).send("Forbidden");
      }*/
}