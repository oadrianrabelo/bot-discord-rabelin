module.exports = {
    name: "status",
    description: "Altera o status do bot",
    execute(message, args, client) {
        const changeStatus = {
            activity: args[0],
            type: args[1].toString().replace(",", " "),
        };
        client.user.setActivity(
            changeStatus.type.toString().replace(",", " "),
            {
                type: changeStatus.activity,
            },
        );
        // client.user.setPresence({
        //     activity: {
        //         name: args.toString().replace(",", " "),
        //         type: "STREAMING",
        //     },
        // });

        message.channel.send("Status do bot alterado com sucesso");
    },
};

// command(client, "status", (message) => {
//     const content = message.content.replace("!status", "");
//     // if (message.member.hasPermission("ADMINISTRATOR")) {
//     client.user.setPresence({
//         activity: {
//             name: content,
//             type: 0,
//         },
//     });
//     // }
// });
