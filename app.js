var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var donorRouter = require('./routes/donor');
var acceptorRouter = require('./routes/acceptor');
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongodbuser:xdadevelopers@cluster0-shard-00-00.hciac.mongodb.net:27017,cluster0-shard-00-01.hciac.mongodb.net:27017,cluster0-shard-00-02.hciac.mongodb.net:27017/zerowaste?ssl=true&replicaSet=atlas-2o2tzg-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
})

var session = require('express-session')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "Key", cookie: { maxAge: 6000000 } }))

app.use(bodyParser());
app.use('/', indexRouter);

app.use('/donor', donorRouter);
app.use('/acceptor', acceptorRouter);
// catch 404 and forward to error handler
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
