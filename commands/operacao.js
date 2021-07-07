const Discord = require("discord.js");
module.exports = {
    name: "operacao",
    description: "realizar operacoes",
    async execute(message, args) {
        const logo =
            "https://cdn.discordapp.com/avatars/822620300608274482/20c3c0644c9100ee7837c4d79b8251ec.png?size=256";
        const embed = new Discord.MessageEmbed()
            .addFields(
                {
                    name: "Soma",
                    value: `Somar dois valores: X + X`,
                    inline: false,
                },
                {
                    name: "Subtração",
                    value: `Subtrair dois valores: X - X`,
                    inline: false,
                },
                {
                    name: "Divisão",
                    value: `Dividir dois valores: X / X`,
                    inline: false,
                },
                {
                    name: "Multiplicação",
                    value: `Multiplicar dois valores: X * X`,
                    inline: false,
                },
            )
            .setTitle("Operações disponíveis")
            .setTimestamp()
            .setFooter("BotRabelin", logo)
            .setColor("#EB459E");
        try {
            if (!args) return message.reply("coloque argumentos");
            const operacoes = ["+", "*", "/", "-"];
            const operacao = {
                operacao: args[1],
                firstValue: Number(args[0]),
                secondValue: Number(args[2]),
            };

            if (isNaN(operacao.firstValue, operacao.secondValue))
                return message.channel.send(embed);

            // checar se é uma operação válida
            for (ops in operacoes) {
                if (operacao.operacao == ops) {
                    console.log(operacao.operacao);
                    return message.reply("Esta não é uma operação válida");
                }
            }
            let soma = operacao.firstValue + operacao.secondValue;
            let sub = operacao.firstValue - operacao.secondValue;
            let div = operacao.firstValue / operacao.secondValue;
            let mult = operacao.firstValue * operacao.secondValue;
            //separar as operações
            switch (operacao.operacao) {
                case "+":
                    message.reply(
                        `Resultado da operação ${operacao.firstValue} + ${operacao.secondValue} = ${soma}`,
                    );
                    break;
                case "*":
                    message.reply(
                        `Resultado da operação ${operacao.firstValue} * ${operacao.secondValue} = ${mult}`,
                    );
                    break;
                case "/":
                    message.reply(
                        `Resultado da operação ${operacao.firstValue} / ${operacao.secondValue} = ${div}`,
                    );
                    break;
                case "-":
                    message.reply(
                        `Resultado da operação ${operacao.firstValue} - ${operacao.secondValue} = ${sub}`,
                    );
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    },
};
