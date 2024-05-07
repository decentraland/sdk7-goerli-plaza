
const Colyseus = require('colyseus.js');


var osc = require("osc"),
    express = require("express"),
    WebSocket = require("ws");

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

// Bind to a UDP socket to listen for incoming OSC events.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
    console.log("To start the demo, go to http://localhost:8081 in your web browser.");
});

udpPort.open();

// Create an Express-based Web Socket server to which OSC messages will be relayed.
var appResources = __dirname + "/web",
    app = express(),
    server = app.listen(8081),
    wss = new WebSocket.Server({
        server: server
    });

app.use("/", express.static(appResources));
wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    // var relay = new osc.Relay(udpPort, socketPort, {
    //     raw: true
    // });
});



// import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

//import * as Colyseus from "/node_modules/colyseus.js/dist/colyseus.js"; // not necessary if included via <script> tag.

const LOCAL = true


var client = new Colyseus.Client(LOCAL?'ws://localhost:2567': `wss://l9tio3.colyseus.dev`);

var options = {director:true, password: "papafrita"}

const room = client.joinOrCreate("my_room", options).then(room => {
    console.log(room.sessionId, "joined", room.name);

	udpPort.on("message", function (oscMessage) {
		console.log(oscMessage);

		room.send("change", {address:oscMessage.address, value:oscMessage.args[0]})

	});

}).catch(e => {
    console.log("JOIN ERROR", e);
});