var express = require('express');
var router = express.Router();
var HttpError = require('../error').HttpError;

router.get('/', function(req, res, next) {
    /*User.find({}, function(err, users){
        if(err) next(err);
        res.json(users);
    });*/
    next(500);
});

module.exports = router;