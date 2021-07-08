const Discord = require("discord.js");
module.exports = {
    name: "status",
    description: "Altera o status do bot",
    execute(message, args, client) {
        const logo =
            "https://cdn.discordapp.com/avatars/822620300608274482/20c3c0644c9100ee7837c4d79b8251ec.png?size=256";
        const embed = new Discord.MessageEmbed()
            .addField("Jogando", "!status jogando minecraft")
            .addField("Assistindo", "!status assistindo minecraft")
            .addField("Transmitindo", "!status transmitindo minecraft")
            .addField("Ouvindo", "!status ouvindo minecraft")
            .addField("Competindo", "!status competindo minecraft")
            .setTitle("Atividades disponíveis")
            .setTimestamp()
            .setFooter("BotRabelin", logo)
            .setColor("#3F72K");
        try {
            if (!args[1]) {
                return (
                    message.reply(":thinking: tendi não"),
                    message.channel.send(embed)
                );
            }
            const changeStatus = {
                type: args[0],
                activity: args,
            };
            const activityTypes = {
                jogando: "PLAYING",
                stremando: "STREAMING",
                ouvindo: "LISTENING",
                assistindo: "WATCHING",
                competindo: "COMPETING",
            };

            let statusConstant = "";
            //#region
            switch (changeStatus.type.toString().toLowerCase()) {
                case "jogando":
                    statusConstant = activityTypes.playing;
                    break;
                case "assistindo":
                    statusConstant = activityTypes.assistindo;
                    break;
                case "ouvindo":
                    statusConstant = activityTypes.ouvindo;
                    break;
                case "transmitindo":
                    statusConstant = activityTypes.stremando;
                    break;
                case "competindo":
                    statusConstant = activityTypes.competindo;
                    break;
                default:
                    return message.reply("Atividade inválida");
                    break;
            }
            //#endregion
            let spliceActivity = changeStatus.activity
                .slice(1)
                .toString()
                .split(",")
                .join(" ");
            client.user.setActivity(spliceActivity, {
                type: statusConstant,
            });
            message.channel.send("Status do bot alterado com sucesso");

            function setStatusConstant() {}
        } catch (error) {
            console.error(error);
        }
    },
};
