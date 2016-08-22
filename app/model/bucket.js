'use strict';

var Sequelize = require('sequelize');
var config = require('../../app.config')();
var sequelize = new Sequelize(`${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.url}`);

var user = require('./user');

var Bucket = sequelize.define('bucket', {
    idbucket: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bucket: {
        type: Sequelize.STRING,
        field: 'bucket'
    },
    user_iduser: {
        references: {
            model: user.User,
            key: 'iduser'
        },
        type: Sequelize.INTEGER,
        field: 'user_iduser'
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports.Bucket = Bucket;

function createBucket(bucket) {
    return Bucket.create({
        bucket: bucket.bucket,
        user_iduser: bucket.user_iduser
    });
}

module.exports.createBucket = createBucket;

function getBuckets(user) {
    return Bucket.findAll({
        where: {
            user_iduser: user.iduser
        }
    });
}

module.exports.getBuckets = getBuckets;

function deleteBucket(idbucket) {
    return Bucket.destroy({
        where:{
            idbucket: idbucket
        }
    });
}

module.exports.deleteBucket = deleteBucket;

function updateBucket(bucket) {
    return Bucket.update({
        bucket: bucket.bucket
    },{
        where:{
            idbucket: bucket.idbucket
        }
    });
}

module.exports.updateBucket = updateBucket;