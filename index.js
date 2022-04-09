const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot iniciado!'));

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

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
        } else if (command === "ping") {
            client.commands.get("ping").execute(message);
        } else if (command === "tts") {
            client.commands.get("tts").execute(message, args, client);
        } else if (command === "serverinfo") {
            client.commands.get("serverinfo").execute(message, args);
        } else if (command === "status") {
            client.commands.get("status").execute(message, args, client);
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.CLIENT_TOKEN);
