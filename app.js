var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
const { middleware } = require('no-avatar');

var donorRouter = require('./routes/donor');
var acceptorRouter = require('./routes/acceptor');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})

var session = require('express-session')
var app = express();
app.get('/avatar.png', middleware);
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({ secret: "Key", cookie: { maxAge: 6000000 } }))

app.use(bodyParser());

// app.configure(function () {
//   app.use(express.methodOverride());
//   app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, '/files')}));

// });
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
