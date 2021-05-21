import { Op } from "./types"
import ioserver, { Socket } from 'socket.io'
// import ioclient from 'socket.io-client'

const app = require('express')();
const http = require('http').Server(app);
const io = ioserver(http);

io.of("/ravjs").on('connection', function (socket: Socket) {
    console.log('connection');

    socket.on('op', function (d:string) {
        const data:Op = JSON.parse(d);

        //Acknowledge op
        socket.emit("acknowledge", JSON.stringify({
            "op_id": data.op_id,
            "message": "Op received"
        }));

        // Perform
        const operation_type:string = data.op_type;
        const operator:string = data.operator;
        if (operation_type && operator) {
            console.log(operation_type);
            console.log(operator);
        }
    });
});

http.listen(9999, function () {
    console.log('listening on *:9999');
});