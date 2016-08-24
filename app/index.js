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

app.use(allowCrossDomain);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/user', (req, res) => {
    var userObj = req.body;
    user.createUser(userObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/user/:iduser', (req, res) => {
    user.getUser({iduser: req.params.iduser})
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/bucket', (req, res) => {
    var bucketObj = req.body;
    bucket.createBucket(bucketObj)
        .then( (response) => {
            res.status(200).json(response.dataValues);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/buckets/:iduser', (req, res) => {
    bucket.getBuckets({iduser: req.params.iduser})
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/bucket/delete/:idbucket', (req, res) => {
    bucket.deleteBucket(req.params.idbucket)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/bucket/update/', (req, res) => {
    var bucketObj = req.body;
    bucket.updateBucket(bucketObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/progress', (req, res) => {
    var progressObj = req.body;
    progress.createProgress(progressObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/progress/:idbucket', (req, res) => {
    progress.getProgress({idbucket: req.params.idbucket})
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/progress/delete/:idprogress', (req, res) => {
    progress.deleteProgress(req.params.idprogress)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/progress/update/', (req, res) => {
    var progressObj = req.body;
    progress.updateProgress(progressObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/comment', (req, res) => {
    var commentObj = req.body;
    comment.createComment(commentObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/comment/:idprogress', (req, res) => {
    comment.getComments({idprogress: req.params.idprogress})
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/comment/delete/:idcomment', (req, res) => {
    comment.deleteComment(req.params.idcomment)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/comment/update/', (req, res) => {
    var commentObj = req.body;
    comment.updateComment(commentObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.post('/comment/image/', (req, res) => {
    var commentObj = req.body;
    commentObj.picture = new Buffer(commentObj.picture, 'base64');
    comment.uploadImage(commentObj)
        .then( (response) => {
            res.status(200).json(response);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

app.get('/comment/image/:idcomment', (req, res) => {
    comment.getImage(req.params.idcomment)
        .then( (response) => {
            var bufferBase64 = null;
            if(response.picture) {
                var buffer = new Buffer(response.picture);
                bufferBase64 = buffer.toString('base64');
            }
            res.status(200).json(bufferBase64);
        })
        .catch( (err) => {
            log.error(new Error(err));
            res.status(400).json(err);
        });
});

var server = app.listen(config.port, () => {
    log.info('Api listening on ', server.address().port);
});