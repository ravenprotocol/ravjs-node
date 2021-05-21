const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.of("/ravjs").on('connection', function (socket) {
    console.log('connection');

    socket.on('CH01', function (from, msg) {
        console.log('Log', from, ' saying ', msg);
    });

    socket.on('op', function (d) {
        const data = JSON.parse(d);

        //Acknowledge op
        socket.emit("acknowledge", JSON.stringify({
            "op_id": data.op_id,
            "message": "Op received"
        }));

        // Perform
        const operation_type = data ["op_type"];
        const operator = data ["operator"];
        if (operation_type && operator) {
            compute(data);
        }
    });
});

http.listen(9999, function () {
    console.log('listening on *:9999');
});