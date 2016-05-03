/**
 * Created by michbil on 02.05.16.
 */
import nconf from './src/server/wrio_nconf.js';
import {server,db,utils,login} from './src/index.js';
import logger from 'winston';
import express from 'express';

import index from './src/index.js';

var app = express();

async function init () {
    var dbInstance =  await db.init();
    logger.log('info','Successfuly connected to Mongo');
    server.initserv(app,dbInstance);

    app.get('/', function (request, response) {
        response.send("Testing auth-free request");
    });
    app.get('/wrio_test', login.wrioAuth, function (request, response) {
        console.log(request.session);
        console.log(request.user);
        response.send(JSON.stringify(request.user));
    });
    app.get('/wrio_registred', function (request, response) {
        console.log(request.session);

        response.send("Testing request for non-temporary wrio users");
    });

    app.get('/wrio_s2s', login.authS2S, function (request, response) {
        console.log(request.session);
        response.send("Testing S2S auth");
    });


    app.listen(nconf.get("server:port"));
}

async function init_env() {
    try {
        await init();
    } catch (e) {
        console.log("Caught error");
        utils.dumpError(e);
    }
}

init_env();
