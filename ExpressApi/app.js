const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
// const index = require('./routes/index');
const authorizeBill = require('./middleware/authorize-bill');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./config/passport-config');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'pennypincher',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));
// app.use('/', index);
// app.use('/users', users);
//ROUTES ------------------------------------------------------
const myAuthRoutes = require('./routes/auth-routes');
app.use('/', myAuthRoutes);

const myWorkoutRoutes = require('./routes/workout-routes');
app.use('/', myWorkoutRoutes);

const myExcerciseRoutes = require('./routes/excercise-routes');
app.use('/', myExcerciseRoutes);

const myUserRoutes = require('./routes/user-routes');
app.use('/', myUserRoutes);
//ROUTES ------------------------------------------------------
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
