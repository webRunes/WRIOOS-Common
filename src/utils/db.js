const {MongoClient,ObjectID} = require('mongodb');
let nconf = require('nconf');
const logger = require('winston');

let db = {
    db: null
};

function init(_) {
    nconf = _ || nconf;
    let url;
    logger.debug(process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'testing') {
        logger.info("Mongodb testing mode entered");
        url = 'mongodb://mongo:27017/webrunes_test';
    } else {
        logger.info("Normal mongodb mode entered");
        let host = nconf.get('mongo:host');
        let user = nconf.get('mongo:user');
        let password = nconf.get('mongo:password');
        let mongodbname = nconf.get('mongo:dbname');


        if (user) {
            url = `mongodb://${user}:${password}@${host}/${mongodbname}`;
        } else {
            url = `mongodb://${host}/${mongodbname}`;
        }

        if (!host) {
            throw new Error("Mongodb config not defined "+url);
        }
    }

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, database) {
            if (err) {
                return reject(err);
            }

            db.db = database;
            resolve(db.db);
        });
    });
}

function getInstance() {
    if (db.db == null) {
        throw new Error("Db not ready yet!");
    } else {
        return db.db;
    }
}

db.init = init;
db.getInstance = getInstance;
module.exports = db;
