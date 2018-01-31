var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/Chat');

server.listen(4000, () => console.log("express: 4000 port is up!"));

// socket io
io.on('connection', function(socket) {
    console.log('User Connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('save-message', function(data) {
        console.log(data);
        io.emit('new-message', {message: data});
    });
});

// GET ALL CHATS

router.get('/:room', function(req, res, next) {
    Chat.find({ room: req.param.room }, function(err, chats) {
        if (err) return next(err);
        res.json(chats);
    });
});

// GET SINGLE CHAT

router.get('/:id', function(req, res, next) {
    Chat.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    })
})

// SAVE CHAT

router.post('/', function(req, res, next) {
    Chat.create(req.body, function(err, post) {
        if (err) return next(err);
        console.log("got a message");
        res.json(post);
    });
});

// UPDATE CHAT

router.put('/:id', function(req, res, next) {
    Chat.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// DELETE POST

router.delete('/:id', function(req, res, next) {
    Chat.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;