const crypto = require("crypto");

class Util {
	static runCommand(socket, command) {
		const msg = {
			"header": {
			  "version": 1,
			  "requestId": crypto.randomUUID(),
			  "messagePurpose": "commandRequest",
			  "messageType": "commandRequest"
			},
			"body": {
			  "version": 1,               
			  "commandLine": command,         
			  "origin": {
				"type": "player"          
			  }
			}
		};
		socket.send(JSON.stringify(msg))
	}
}

module.exports = Util;