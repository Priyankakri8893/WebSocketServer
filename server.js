"use strict";
const express = require('express')
const app = express();
const server = require("http").Server(app)

let WebSocketServer = require('ws').Server;
let port = 8080;
let wsServer = new WebSocketServer({ server });

const ip = require('ip');
console.log('websocket server start.' + ' ipaddress = ' + ip.address() + ' port = ' + port);

wsServer.on('connection', function (ws) {
    console.log('-- websocket connected --');

    ws.on('message', function (message) {
        console.log('-- message recieved --');
        const json = JSON.parse(message.toString());

        wsServer.clients.forEach(function each(client) {
            if (isSame(ws, client)) {
                console.log('skip sender');
            }
            else {
                client.send(message);
            }
        });
    });

});

function isSame(ws1, ws2) {
    // -- compare object --
    return (ws1 === ws2);
}

server.listen(port, () => {
    console.log(`Server started at  ${port}`);
  });