const Discord = require("discord.js");
const prefixo = process.env.PREFIX;
module.exports = {
  name: "help",
  description: "ajudar os necessitados",
  execute(message, args) {
    const logo =
      "https://cdn.discordapp.com/avatars/822620300608274482/20c3c0644c9100ee7837c4d79b8251ec.png?size=256";
    message.reply("rlx que o pai ajuda");
    const embed = new Discord.MessageEmbed()
      .setTitle("Ajudinha")
      .setColor("#50055E")
      .addFields(
        {
          name: "Dica:",
          value: "NÃO PRECISA COLOCAR OS '< >'",
          inline: false,
        },
        {
          name: prefixo + "ping",
          value: "Comando para testar o ping",
          inline: false,
        },
        {
          name: prefixo + "tts <seu texto aqui>",
          value: "Comando para o bot falar na call",
          inline: false,
        },
        {
          name: prefixo + "status <seu texto aqui>",
          value: "Muda o status do bot",
          inline: false,
        },
        {
          name: prefixo + "play <nome da musica/URL>",
          value: "Toca uma musica na call (ainda não tem queue)",
          inline: false,
        },
        {
          name: prefixo + "leave",
          value: "Tira a musica da call, junto com o bot",
          inline: false,
        },
        {
          name: prefixo + "mute <@usuario>",
          value: "Muta um usuário (não fala na call)",
          inline: false,
        },
        {
          name: prefixo + "umute <@usuario>",
          value: "Desmuta um usuário",
          inline: false,
        },
        {
          name: prefixo + "sucumbir <@usuario>",
          value: "Sucumbe um usuário (não fala em lugar nenhum)",
          inline: false,
        },
        {
          name: prefixo + "perdoar <@usuario>",
          value: "Perdoa um usuário do sucumbimento",
          inline: false,
        },
        {
          name: prefixo + "operacao <X + X>",
          value: "Faz uma operação. É possível somar, subtrair, dividir e multiplicar usando: (+)(-)(/)(*)",
          inline: false,
        },
        {
          name: prefixo + "link",
          value: "Envia o link da página estática",
          inline: false,
        },
      )
      .setTimestamp()
      .setFooter("BotRabelin", logo);
    message.channel.send(embed);
  },
};
