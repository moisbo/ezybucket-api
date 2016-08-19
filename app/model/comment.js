'use strict';

var Sequelize = require('sequelize');
var config = require('../../app.config')();
var sequelize = new Sequelize(`${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.url}`);

var progress = require('./progress');

var Comment = sequelize.define('comment', {
    idcomment: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    comment: {
        type: Sequelize.STRING,
        field: 'comment'
    },
    picture: {
        type: Sequelize.BLOB,
        field: 'picture'
    },
    pictureDesc: {
        type: Sequelize.STRING,
        field: 'pictureDesc'
    },
    progress_idprogress: {
        references: {
            model: progress.Progress,
            key: 'idprogress'
        },
        type: Sequelize.INTEGER,
        field: 'progress_idprogress'
    }
}, {
    freezeTableName: true
});

function createComment(comment) {
    return Comment.create({
        comment: comment.comment,
        progress_idprogress: comment.progress_idprogress
    });
}

module.exports.createComment = createComment;

function getComments(progress) {
    return Comment.findAll({
        progress_idprogress: progress.idprogress
    });
}

module.exports.getComments = getComments;

function updateComment(idcomment, obj) {
    return Comment.update(obj,{
        where:{
            idcomment: idcomment
        }
    });
}

module.exports.updateComment = updateComment;