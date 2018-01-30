// Module dependencies

var app = require('../app');
var debug = require('debug')('mean-app:server');
var http = require('http');

// Getting port from env and storing it in express

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Creating HTTP Server

var server = http.createServer(app);


// Listen on provided port, on all network interfaces

server.listen(port, () => console.log("Listening on port " + port));
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string or false

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        //named pipe
        return val;
    }

    if (port >= 0) {
        //port number
        return port;
    }

    return false;
}

// Event listener for http server 'error' event

function onError() {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES': 
            console.error(bind + ' require elevated privileges');
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

// Event listener for HTTP server "listening" event

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}