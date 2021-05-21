let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.of("/ravjs").on('connection', function (socket) {
    console.log('connection');

    socket.on('CH01', function (from, msg) {
        console.log('Log', from, ' saying ', msg);
    });
});

http.listen(9999, function () {
    console.log('listening on *:3000');
});