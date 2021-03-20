const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const command = require("./command");

const firstMessage = require("./first-message");
const privateMessage = require("./private-message");

client.on("ready", () => {
	console.log("Tô pronto");

	firstMessage(client, "822949568869040219", "Olá Mundo!!!", ["😎", "🤙"]);

	command(client, "server", (message) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(
				`${guild.name} tem um total de ${guild.memberCount} cabeças de pika`
			);
		});
	});

	command(client, ["cc", "clearchannel"], (message) => {
		if (message.member.hasPermission("ADMINISTRATOR")) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		}
	});

	command(client, "status", (message) => {
		const content = message.content.replace("!status", "");
		client.user.setPresence({
			activity: {
				name: content,
				type: 0,
			},
		});
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

	// privateMessage(client, "ping", "Pong!");
});

client.login(config.token);
