const {dumpError} = require( './utils/utils.js');
const db = require('./utils/db.js');
const {loginWithSessionId,wrioAuth,wrap,authS2S,wrioAdmin,restOnly} = require('./login');
const app = require('./server/cors.js');
const initserv = require('./server/initserv.js');

exports.utils = {
    dumpError: dumpError
};
exports.db = db;
exports.login = {
    loginWithSessionId:loginWithSessionId,
    wrioAuth:wrioAuth,
    authS2S:authS2S,
    wrap: wrap,
    wrioAdmin:wrioAdmin,
    restOnly:restOnly
};
exports.wrio_app = app;
exports.server = {
    initserv: initserv
};