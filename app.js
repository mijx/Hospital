var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Para dar formato a las fechas
const { create } = require('express-handlebars')
const moment = require('moment')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Configuración de express con handlebars: creacion de helpers
const hbs = create({
  extname: '.hbs'
})

// Helper para dar formato a fechas
hbs.handlebars.registerHelper('formatoFecha', function (fecha){
  return moment(fecha).format('YYYY-MM-DD')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs',hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
