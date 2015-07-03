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

module.exports = router;
