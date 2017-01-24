'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initserv;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _wrio_app = require('./wrio_app.js');

var _wrio_app2 = _interopRequireDefault(_wrio_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by michbil on 02.05.16.
 */

function initserv(app, db) {

    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));

    //For app pages
    app.set('view engine', 'ejs');
    //app.use(express.static(path.join(TEMPLATE_PATH, '/')));

    var DOMAIN = _nconf2.default.get("db:workdomain");

    var SessionStore = (0, _connectMongo2.default)(_expressSession2.default);
    var cookie_secret = _nconf2.default.get("server:cookiesecret");
    app.use((0, _cookieParser2.default)(cookie_secret));
    var sessionStore = new SessionStore({ db: db });
    app.use((0, _expressSession2.default)({

        secret: cookie_secret,
        saveUninitialized: true,
        store: sessionStore,
        resave: true,
        cookie: {
            secure: false,
            domain: DOMAIN,
            maxAge: 1000 * 60 * 60 * 24 * 30
        },
        key: 'sid'
    }));

    (0, _wrio_app2.default)(app);

    return app;
}