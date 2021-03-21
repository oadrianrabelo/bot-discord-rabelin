const discordTTS = require("discord-tts");

module.exports = {
	name: "tts",
	description: "comando para o bot falar no canal de voz",
	execute(message, args, client) {
		const broadcast = client.voice.createBroadcast();
		var channelId = message.member.voice.channelID;
		var channel = client.channels.cache.get(channelId);
		channel.join().then((connection) => {
			broadcast.play(discordTTS.getVoiceStream(args));
			const dispatcher = connection.play(broadcast);
		});
	},
};
