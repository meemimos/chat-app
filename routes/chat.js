var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/Chat');

server.listen(4000, () => console.log("4000 port running.."));

// socket io
io.on('connection', function(socket) {
    console.log('User Connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('save message', function(data) {
        console.log(data);
        io.emit('new-message', {message: data});
    });
});

// GET ALL CHATS

router.get('/:room', function(req, res, next) {
    Chat.find({ room: req.param.room }, function(err, chats) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function(req, res, next) {
    Chat.create(req.body, function(err, post) {
        if (err) return next(err);
        res.join(post);
    });
});


module.exports = router;