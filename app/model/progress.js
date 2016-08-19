'use strict';

var Sequelize = require('sequelize');
var config = require('../../app.config')();
var sequelize = new Sequelize(`${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.url}`);

var bucket = require('./bucket');

var Progress = sequelize.define('progress', {
    idprogress: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    progress: {
        type: Sequelize.STRING,
        field: 'progress'
    },
    bucket_idbucket: {
        references: {
            model: bucket.Bucket,
            key: 'idbucket'
        },
        type: Sequelize.INTEGER,
        field: 'bucket_idbucket'
    }
}, {
    freezeTableName: true
});

module.exports.Progress = Progress;

function createProgress(progress) {
    return Progress.create({
        progress: progress.progress,
        bucket_idbucket: progress.bucket_idbucket
    });
}

module.exports.createProgress = createProgress;

function getProgress(bucket) {
    return Progress.findAll({
        bucket_idbucket: bucket.idbucket
    });
}

module.exports.getProgress = getProgress;