var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var defRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var unitsRoutes = require('./routes/units');

var HttpError = require('./error').HttpError;

var app = express();

// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/sendHttpError'));

app.use('/', defRoutes);
app.use('/users', usersRoutes);
app.use('/units', unitsRoutes);


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
