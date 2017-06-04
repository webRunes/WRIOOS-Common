const nconf = require('nconf');
const logger = require('winston');

function CORSomainMatch(origin,domain) {
    domain = domain.replace(/\./g,'\\.')+'$';console.log(domain);
    logger.log('silly',domain);
    return !!origin.match(new RegExp(domain,'m'));
}

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

console.log(CORSomainMatch('http://core_d.wrioos.com','.wrioos.com'));
console.log(CORSomainMatch('http://core_d.wrioos.com:3033','.wrioos.com'));