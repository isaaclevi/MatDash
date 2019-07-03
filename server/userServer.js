//const Joi = require('joi');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const port = normalizePort(process.env.PORT || '3000');
const User = require(__dirname+'/models/Users');
const val = require('./val');

//const favicon = require('serve-favicon');
//const logger = require('morgan');

//const apiRouter = require('./server/routes/Users.js');
//const dashRouter = require('./routes/Dashboard');

const mongoose = require('mongoose');
const mongodbHost = val.mongodbHost;
const mongodbPort = val.port;
const authenticate = val.authenticate
const mongodbDatabase = val.mongodbDatabase;

// connect string for mongodb server running locally, connecting to a database called test
const url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;

const server = express();
server.use(cors());
server.set('port', port);
//server.setHeader({'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

mongoose.connect(url, { useNewUrlParser: true,promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

  //get all users
server.get('/', (req, res, next)=> {
  User.find((err, products)=> {
    if (err) return next(err);
    res.set();
    res.json(products);
  });
});

//get a user by id
server.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//server.use(logger('dev'));
//server.use(express.json());
//server.use(express.urlencoded({ extended: false }));
//server.use(express.static(path.join(__dirname, 'dist/dashboardServer')));
//server.use('/', express.static(path.join(__dirname, 'dist/dashboardServer')));
//server.use('/api', apiRouter);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;