var mongoose = require('./mongoose');
var async = require('async');

async.series([open,
              dropDatabase,
              requireModels,
              createUsers,
              close], function(err){
	console.log(arguments);
});

function open(callback){
	console.log("Open MongoDB connection....");
	mongoose.connection.on('open', callback);
};

function dropDatabase(callback){
	console.log("Drop existing db....");
	mongoose.connection.db.dropDatabase(callback);
};

function requireModels(callback){
	console.log("Include requires models....");
	require('../models/user');
	
	async.each(Object.keys(mongoose.models), function(modelName, callback){
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
};

function createUsers(callback) {
	console.log("Creating default users....");
	
	var users = [{username: "admin", password: "admin"},
	             {username: "user", password: "user"}];
	
	
	async.each(users, function(userData, callback){
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
};


function close(callback){
	console.log("Close db connection....");
	return mongoose.disconnect(callback);
};


