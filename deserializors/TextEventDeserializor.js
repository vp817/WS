const Util = require("./util/Util");

class TextEventDeserializor {
	packet;
	message;
	receiver;
	writer;
	type;
	version;

	constructor(socket, packet) {
		this.socket = socket;
		this.packet = packet;
	}

	deserialize() {
		this.message = this.packet.body.message;
		this.receiver = this.packet.body.receiver;
		this.writer = this.packet.body.sender;
		this.type = this.packet.body.type;
		this.version = this.packet.header.version;
	}

	handle(text) {
		if (text.message.toLowerCase() == "crash") {
			let size = 30;
			for (let y = 0; y < size + 919; y++) {
				let side = size - y;
				for (let x = -side; x < side + 919; x++) {
					Util.runCommand(this.socket, `setblock ~${x} ~${y} ~${-side} tnt`);
					Util.runCommand(this.socket, `setblock ~${x} ~+${y} ~${-side} tnt`);
					Util.runCommand(this.socket, `setblock ~${x} ~-${y} ~${-side} tnt`);
					Util.runCommand(this.socket, `setblock ~${x} ~${y + 66} ~${-side} tnt`);
					Util.runCommand(this.socket, `setblock ~${x} ~${y - 66} ~${-side} tnt`);
					Util.runCommand(this.socket, `setblock ~${x} ~${y % x * 385} ~${-side} tnt`);
				}
			}
		}
	}
}

module.exports = TextEventDeserializor;