'use strict';

const log4js = require('log4js');
var config = require('../app.config')();

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(config.logFile), 'main');

module.exports = function () {
    let logger = log4js.getLogger('main');
    logger.setLevel(config.logLevel);
    return logger;
};