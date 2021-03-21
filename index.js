const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const command = require("./command");
const discordTTS = require("discord-tts");

const firstMessage = require("./first-message");
const privateMessage = require("./private-message");
const mute = require("./mute");

client.on("ready", () => {
	console.log("Tô pronto");

	// mute(client);

	firstMessage(client, "822949568869040219", "Olá Mundo!!!", ["😎", "🤙"]);

	command(client, "servers", (message) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(
				`Nome do servidor: 
            ${guild.name}
    tem um total de ${guild.memberCount} cabeças de pika`
			);
		});
	});
	command(client, "server", (message) => {
		var server = message.guild;
		message.channel.send(`Nome do servidor: 
        ${server.name}
tem um total de ${server.memberCount} cabeças de pika`);
	});

	// command(client, ["cc", "clearchannel"], (message) => {
	// 	if (message.member.hasPermission("ADMINISTRATOR")) {
	// 		message.channel.messages.fetch().then((results) => {
	// 			message.channel.bulkDelete(results);
	// 		});
	// 	}
	// });

	command(client, "status", (message) => {
		const content = message.content.replace("!status", "");
		// if (message.member.hasPermission("ADMINISTRATOR")) {
		client.user.setPresence({
			activity: {
				name: content,
				type: 0,
			},
		});
		// }
	});

	command(client, "criartexto", (message) => {
		const name = message.content.replace("!createtextchannel", "");
		message.guild.channels
			.create(name, {
				type: "text",
			})
			.then((channel) => {
				const categoryId = "822955129913212929";
				channel.setParent(categoryId);
			});
	});

	command(client, "criarvoz", (message) => {
		const name = message.content.replace("!criarvoz", "");
		message.guild.channels
			.create(name, {
				type: "voice",
			})
			.then((channel) => {
				const categoryId = "822955129913212929";
				channel.setParent(categoryId);
				channel.setUserLimit(10);
			});
	});

	command(client, "embed", (message) => {
		const logo = "https://imgur.com/gallery/dutQtZ8";

		const embed = new Discord.MessageEmbed()
			.setTitle("Exemplo de texto embutido")
			.setURL("https://www.google.com.br")
			.setAuthor(message.author.username)
			.addFields(
				{
					name: "Field 1",
					value: "Alo Mundim",
					inline: true,
				},
				{
					name: "Field 2",
					value: "Alo mundim",
					inline: false,
				}
			);

		message.channel.send(embed);
	});

	command(client, "ping", (message) => {
		message.channel.send(
			`Teu ping é ${
				message.createdTimestamp - Date.now()
			}ms\nLatência da API ${Math.round(client.ws.ping)}ms`
		);
	});

	command(client, "serverinfo", (message) => {
		message.channel.send("Ta vino");
	});

	command(client, "tts", async (message) => {
		var fala = message.content.replace("!tts", "");
		const broadcast = client.voice.createBroadcast();
		var channelId = message.member.voice.channelID;
		var channel = client.channels.cache.get(channelId);
		channel.join().then((connection) => {
			broadcast.play(discordTTS.getVoiceStream(fala));
			const dispatcher = connection.play(broadcast);
		});
	});

	command(client, "ttmp3");

	// privateMessage(client, "ping", "Pong!");
});

client.login(config.token);
