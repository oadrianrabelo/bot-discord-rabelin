const Discord = require("discord.js");
module.exports = {
    name: "serverinfo",
    description: "Descreve as informações do servidor",
    execute(message, args) {
        const server = message.guild;
        const logo =
            "https://cdn.discordapp.com/avatars/822620300608274482/20c3c0644c9100ee7837c4d79b8251ec.png?size=256";
        const embed = new Discord.MessageEmbed()
            .addField("Nome do servidor", `${server.name}`, false)
            .addField("Usuários", `${server.memberCount}`, false)
            .setTimestamp()
            .setFooter("BotRabelin", logo)
            .setColor("#645GDA");
        message.channel.send(embed);
    },
};
