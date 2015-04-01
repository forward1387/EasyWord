var mongoose = require('./mongoose');
var Q = require('q');

Q(open).then(dropDatabase).then(createUsers).then(close);

function open(callback){
	mongoose.connection.on('open', callback);
};

function dropDatabase(callback){
	mongoose.connection.db.dropDatabase(callback);
};

function createUsers(callback) {
	require('../models/user')
	var admin = new mongoose.models.User({username: "admin", password: "admin"});
	var user = new mongoose.models.User({username: "user", password: "user"});
	
	Q.all([admin.save(), user.save()]).then(callback);
};


function close(callback){
	mongoose.disconnect(callback);
};


