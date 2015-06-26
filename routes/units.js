var express = require('express');
var router = express.Router();
var Unit = require('../models/unit').Unit;
var HttpError = require('../error').HttpError;

router.get('/', function(req, res, next) {
    Unit.find({}, function(err, units){
        if(err) {
            next(err);
        } else {
            res.json(units);
        }
    });
});

router.post('/add', function(req, res, next){
    var newUnit = new Unit(req.body);

    newUnit.save(function(err, unt){
        if(err) {
            next(new HttpError(400, err.message));
        }
        else {
            res.json(unt);
        }
    });
});

module.exports = router;