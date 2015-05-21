var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var Q = require('q');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, users){
		if(err) next(err);
		res.json(users);
	});
});

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id, function(err, user){
		if(err) next(err);
		if(!user) next(404);
		res.json(user);
	});
});

router.post('/', function(req, res, next){
	var schema = {};

	if(typeof req.body.username === "undefined")
		next(new HttpError(400, "'username' data is required."));
	else
		schema['username'] = req.body.username;

	if(typeof req.body.password === "undefined")
		next(new HttpError(400, "'password' data is required."));
	else
		schema['password'] = req.body.password;

	if(typeof req.body.firstname !== "undefined")
		schema['firstname'] = req.body.firstname;

	if(typeof req.body.lastname !== "undefined")
		schema['lasttname'] = req.body.firstname;

	var newUser = new User(schema);

	newUser.save(function(err, usr){
		if(err) next(err);

		res.json(usr);
	});
});

module.exports = router;
