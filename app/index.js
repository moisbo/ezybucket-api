'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('../app.config')();
const log = require('./logger')();

const user = require('./model/user');
const bucket = require('./model/bucket');
const progress = require('./model/progress');
const comment = require('./model/comment');

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

app.post('/user', (req, res) => {
    var userObj = req.body;
    user.createUser(userObj)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/user/:username', (req, res) => {
    user.getUser({username: req.params.username})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/bucket', (req, res) => {
    var bucketObj = req.body;
    bucket.createBucket(bucketObj)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/buckets/:iduser', (req, res) => {
    bucket.getBuckets({user: req.params.iduser})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/progress', (req, res) => {
    var progressObj = req.body;
    progress.createProgress(progressObj)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/progress/:idprogress', (req, res) => {
    progress.getProgress({progress: req.params.idprogress})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/comment', (req, res) => {
    var commentObj = req.body;
    comment.createComment(commentObj)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/comment/:idcomment', (req, res) => {
    comment.getComments({comment: req.params.idcomment})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/comment/update', (req, res) => {
    var commentObj = req.body;
    comment.updateComment(commentObj.idcomment, commentObj.obj)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

var server = app.listen(config.port, () => {
    log.info('Api listening on ', server.address().port);
});