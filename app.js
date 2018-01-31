var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chat-app')
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

var chat = require('./routes/chat');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// value can be string or array (when extended is false), or any type (when extended is true).

app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/', function(req, res) {
//     console.log("Testing.. ");
//     res.send("Testing..");
// });

app.use('/chat', chat);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
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