/**
 * Created by michbil on 04.06.17.
 */
const logger = require('winston');

function CORSDomainMatch(origin,domain) {
    domain = domain.replace(/\./g,'\\.')+'(:3033)?$';
    logger.log('silly',domain);
    return !!origin.match(new RegExp(domain,'m'));
}
module.exports = CORSDomainMatch;