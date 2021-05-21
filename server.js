let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.of("/ravjs").on('connection', function (socket) {
    console.log('connection');

    socket.on('CH01', function (from, msg) {
        console.log('Log', from, ' saying ', msg);
    });

    socket.on('op', function (d) {
        var data = JSON.parse(d);

        //Acknowledge op
        socket.emit("acknowledge", JSON.stringify({
            "op_id": data.op_id,
            "message": "Op received"
        }));

        // Perform
        let operation_type = data ["op_type"];
        let operator = data ["operator"];
        if (operation_type && operator) {
            compute(data);
        }
    });
});

http.listen(9999, function () {
    console.log('listening on *:9999');
});