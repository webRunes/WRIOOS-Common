const nconf = require('nconf');
const logger = require('winston');
const CORSDomainMatch = require('./CORSDomainMatch');


module.exports = function init_cors (app) {

    // Add headers
    app.use(function(request, response, next) {
        let origin = request.get('origin');
        if (origin == undefined) origin = "";
        const workDomain = nconf.get("server:workdomain");

        if (CORSomainMatch(origin,workDomain)) {
            response.setHeader('Access-Control-Allow-Origin', origin);
            logger.log("debug","Allowing CORS for webrunes domains");
        } else {
            logger.log("debug",'host not match');
        }

        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    return app;
};
