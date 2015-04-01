var mongoose = require('mongoose'),
	config = require('../config'),
	util = require('util');

mongoose.connect(util.format(config.get('mongoose:uri'), config.get('mongoose:dbname'), config.get('mongoose:dbpass'))
		, config.get('mongoose:options'));

module.exports = mongoose;