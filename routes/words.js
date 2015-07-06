var express = require('express');
var router = express.Router();
var Word = require('../models/word').Word;
var HttpError = require('../error').HttpError;

router.get('/', function(req, res, next) {
    Word.find({}, function(err, words){
        if(err) {
            next(err);
        } else {
            res.json(words);
        }
    });
});

router.get('/:id', function(req, res, next) {
    Word.findById(req.params.id, function(err, words){
        if(err) {
            next(err);
        } else {
            res.json(words);
        }
    });
});

router.post('/', function(req, res, next){
    var newWord = new Word(req.body);

    newWord.save(function(err, wrd){
        if(err) {
            next(new HttpError(400, err.message));
        }
        else {
            res.json(wrd);
        }
    });
});

router.put('/:id', function(req, res, next){
    var id = req.params.id;

    Word.findByIdAndUpdate(id, req.body, function(err, wrd){
        if(err) {
            next(new HttpError(400, err.message));
        }
        else {
            res.json(wrd);
        }
    });
});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Word.remove({_id: id}, function(err){
        if(err) {
            next(new HttpError(400, err.message));
        }
        else {
            res.json({});
        }
    });
});

module.exports = router;
