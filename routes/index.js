var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Hello from routes[index]');
});

module.exports = router;