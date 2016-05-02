import {dumpError} from './utils/utils.js';
import login from './login';
import app from './server/wrio_app.js';
import initserv from './server/initserv.js';

exports.utils = {
    dumpError: dumpError
};
exports.login = login;
exports.wrio_app = app;
exports.server = {
    initserv: initserv
};