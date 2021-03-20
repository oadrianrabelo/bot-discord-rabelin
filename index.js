const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const command = require("./command");

client.on("ready", () => {
	console.log("Tô pronto");

	command(client, ["ping", "test"], (message) => {
		message.channel.send("Pong!");
	});

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
});

client.login(config.token);
