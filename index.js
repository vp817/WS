const ws = require("ws");
const crypto = require("crypto");
const TextEventDeserializor = require("./deserializors/TextEventDeserializor");

const server = new ws.Server({
	port: 3000
});

server.on("connection", socket => {
	socket.send(JSON.stringify({
		"header": {
		  "version": 1,
		  "requestId": crypto.randomUUID(),
		  "messageType": "commandRequest",
		  "messagePurpose": "subscribe"
		},
		"body": {
		  "eventName": "PlayerMessage"
		}
	}));
	socket.on("message", packet => {
		packet = JSON.parse(packet);
		if (packet.header.eventName === "PlayerMessage") {
			let text = new TextEventDeserializor(socket, packet);
			text.deserialize();
			text.handle(text);
		}
	});
	console.log("Connection established");
});
