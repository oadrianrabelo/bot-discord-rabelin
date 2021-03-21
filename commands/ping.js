module.exports = {
	name: "ping",
	description: "this is a ping command",
	execute(message, args) {
		message.channel.send(
			`Teu ping é ${
				message.createdTimestamp - Date.now()
			}ms\nLatência da API ${Math.round(args.ws.ping)}ms`
		);
	},
};
