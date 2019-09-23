var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var index = require('./routes/index');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users = require('./routes/users');
var mysql= require('mysql');
var http = require('http');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'dbUSER',
      password : 'dbPASSWORD',
  		database : 'dbNAME'
	});
	connection.connect();
	next();
});
app.use('/', index);
app.use('/api/v1/users', users);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001);
