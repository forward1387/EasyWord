var express = require('express');
var logger = require('morgan');
var defRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var unitsRoutes = require('./routes/units');
var bodyParser = require('body-parser')
var HttpError = require('./error').HttpError;

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
app.use(require('./middleware/sendHttpError'));

app.use('/api/', defRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/units', unitsRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(404);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
	if(typeof err == 'number'){
		switch(err) {
			case 404:
				err = new HttpError(err, 'Page Not Found!');
				break;
			default:
				err = new HttpError(500, 'Internal Server Error!');
		}
	}
	  
	if(err instanceof HttpError){
		res.sendHttpError(err);
	}else{
		if (app.get('env') === 'development') {
			//express.errorHandler()(err, req, res, next);
			err = new HttpError(500);
			res.sendHttpError(err)
		}else{
			console.log(err);
			err = new HttpError(500);
			res.sendHttpError(err)
		}
	}
});

module.exports = app;
