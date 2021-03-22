const { execute } = require("./play");
const Discord = require("discord.js");

module.exports = {
	name: "leave",
	description: "parar o bot e sair do canal",
	async execute(message, args) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel)
			return message.channel.send("Tu tem que tá num canal de voz krai");

		await voiceChannel.leave();
		const embed = new Discord.MessageEmbed()
			.setTitle("Os de vdd eu sei quem são :man_detective_tone1: ")
			.setURL("https://www.google.com.br");
		await message.channel.send(embed);
	},
};
