'use strict';

var Sequelize = require('sequelize');
var config = require('../../app.config')();
var sequelize = new Sequelize(`${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.url}`);

var progress = require('./progress');

var Comment = sequelize.define('comment', {
    idcomment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: Sequelize.STRING,
        field: 'comment'
    },
    picture: {
        type: Sequelize.BLOB,
        field: 'picture'
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

function getComments(progress) {
    return Comment.findAll({
        where:{
            progress_idprogress: progress.idprogress
        }
    });
}

module.exports.getComments = getComments;

function createComment(comment) {
    return Comment.create({
        comment: comment.comment,
        progress_idprogress: comment.progress_idprogress
    });
}

module.exports.createComment = createComment;

function deleteComment(idcomment) {
    return Comment.destroy({
        where:{
            idcomment: idcomment
        }
    });
}

module.exports.deleteComment = deleteComment;

function updateComment(comment) {
    return Comment.update({
        comment: comment.comment
    },{
        where:{
            idcomment: comment.idcomment
        }
    });
}

module.exports.updateComment = updateComment;

function uploadImage(comment) {
    return Comment.update({
        picture: comment.picture
    },{
        where:{
            idcomment: comment.idcomment
        }
    });
}

module.exports.uploadImage = uploadImage;

function getImage(idcomment) {
    return Comment.findOne({
        where:{
            idcomment: idcomment
        }
    });
}

module.exports.getImage = getImage;