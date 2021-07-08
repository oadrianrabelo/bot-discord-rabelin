const Discord = require("discord.js");
const client = new Discord.Client();

const command = require("./command");

const firstMessage = require("./first-message");
const privateMessage = require("./private-message");
const mute = require("./mute-testar");

const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.on("ready", () => {
    console.log("Tô pronto");

    // command(client, "teste", (message) => {
    // 	const content = message.content.replace("!teste", "").trim();
    // 	if (message.member.hasPermission("ADMINISTRATOR")) {
    // 		mutedRole = message.guild.roles.cache.find(
    // 			(role) => role.name === content
    // 		);
    // 	}
    // });

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

    // command(client, "criartexto", (message) => {
    // 	const name = message.content.replace("!createtextchannel", "");
    // 	message.guild.channels
    // 		.create(name, {
    // 			type: "text",
    // 		})
    // 		.then((channel) => {
    // 			const categoryId = "822955129913212929";
    // 			channel.setParent(categoryId);
    // 		});
    // });

    // command(client, "criarvoz", (message) => {
    // 	const name = message.content.replace("!criarvoz", "");
    // 	message.guild.channels
    // 		.create(name, {
    // 			type: "voice",
    // 		})
    // 		.then((channel) => {
    // 			const categoryId = "822955129913212929";
    // 			channel.setParent(categoryId);
    // 			channel.setUserLimit(10);
    // 		});
    // });

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
                },
            );

        message.channel.send(embed);
    });

    command(client, "ping", (message) => {
        const args = message.content
            .slice(process.env.TOKEN.length)
            .split(/ +/);
        client.commands.get("ping").execute(message, client);
        // 	message.channel.send(
        // 		`Teu ping é ${
        // 			message.createdTimestamp - Date.now()
        // 		}ms\nLatência da API ${Math.round(client.ws.ping)}ms`
        // 	);
    });

    command(client, "serverinfo", (message) => {
        message.channel.send("Ta vino");
    });

    command(client, "tts", async (message) => {
        const args = message.content.replace("!tts", "");
        client.commands.get("tts").execute(message, args, client);
    });

    // privateMessage(client, "ping", "Pong!");
});

client.on("message", (message) => {
    try {
        if (
            !message.content.startsWith(process.env.PREFIX) ||
            message.author.bot
        )
            return;

        const args = message.content
            .slice(process.env.PREFIX.length)
            .split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === "operacao") {
            client.commands.get("operacao").execute(message, args);
        } else if (command === "play") {
            client.commands.get("play").execute(message, args);
        } else if (command === "leave") {
            client.commands.get("leave").execute(message, args);
        } else if (command === "mute") {
            client.commands.get("mute").execute(message, args);
        } else if (command === "unmute") {
            client.commands.get("unmute").execute(message, args);
        } else if (command === "sucumbir") {
            client.commands.get("sucumbir").execute(message, args);
        } else if (command === "perdoar") {
            client.commands.get("perdoar").execute(message, args);
        } else if (command === "help") {
            client.commands.get("help").execute(message, args);
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.CLIENT_TOKEN);
