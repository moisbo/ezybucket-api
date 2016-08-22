'use strict';

var Sequelize = require('sequelize');
var config = require('../../app.config')();
var sequelize = new Sequelize(`${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.url}`);

var User = sequelize.define('user', {
    iduser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        field: 'username'
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports.User = User;

function createUser(user) {
    return User.create({
        username: user.username
    });
}

module.exports.createUser = createUser;

function getUser(user) {
    return User.findOne({
        where: {
            iduser: user.iduser
        }
    });
}

module.exports.getUser = getUser;

function deleteUser(user) {
    return User.create({
        username: user.username
    });
}

module.exports.deleteUser = deleteUser;

function updateUser(user) {
    return User.create({
        username: user.username
    });
}

module.exports.updateUser = updateUser;