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

app.get('/user/:iduser', (req, res) => {
    user.getUser({iduser: req.params.iduser})
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
            console.log(response.dataValues);
            res.status(200).json(response.dataValues);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/buckets/:iduser', (req, res) => {
    bucket.getBuckets({iduser: req.params.iduser})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/bucket/delete/:idbucket', (req, res) => {
    bucket.deleteBucket(req.params.idbucket)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/bucket/update/', (req, res) => {
    var bucketObj = req.body;
    bucket.updateBucket(bucketObj)
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

app.get('/progress/:idbucket', (req, res) => {
    progress.getProgress({idbucket: req.params.idbucket})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/progress/delete/:idprogress', (req, res) => {
    progress.deleteProgress(req.params.idprogress)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

app.post('/progress/update/', (req, res) => {
    var progressObj = req.body;
    progress.updateProgress(progressObj)
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

app.get('/comment/:idprogress', (req, res) => {
    comment.getComments({idprogress: req.params.idprogress})
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.get('/comment/delete/:idcomment', (req, res) => {
    comment.deleteComment(req.params.idcomment)
        .then( (response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

app.post('/comment/update/', (req, res) => {
    var commentObj = req.body;
    comment.updateComment(commentObj)
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