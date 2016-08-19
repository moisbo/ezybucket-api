'use strict';

module.exports = () => {

    var settings = !process.env.ISPROD ? require('./settings.dev.json') : require('./settings.prod.json');

    return {
        port: process.env.PORT || settings.port,
        logLevel: settings.logLevel,
        logFile: settings.logFile,
        db: {
            dialect: settings.db.dialect,
            url: process.env.DBURL || settings.db.url,
            username: process.env.DBUSERNAME || settings.db.username,
            password: process.env.DBPASSWORD || settings.db.password
        }
    };
};