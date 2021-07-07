module.exports = (client, aliases, callback) => {
    if (typeof aliases === "string") {
        aliases = [aliases];
    }
    client.on("message", (message) => {
        const { content } = message;

        aliases.forEach((alias) => {
            const command = `${process.env.TOKEN}${alias}`;

            if (content.startsWith(`${command}`) || content === command) {
                console.log(`Rodando o comando ${command}`);
                callback(message);
            }
        });
    });
};
