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

router.get('/:id', function(req, res, next) {
    Unit.findById(req.params.id, function(err, unit){
        if(err) {
            next(err);
        } else {
            res.json(unit);
        }
    });
});

router.post('/', function(req, res, next){
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

router.put('/', function(req, res, next){

});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Unit.remove({_id: id}, function(err){
        if(err) {
            next(new HttpError(400, err.message));
        }
        else {
            res.json({});
        }
    });
});

module.exports = router;