module.exports = {
    name: "ping",
    description: "this is a ping command",
    execute(message) {
        message.channel.send(
            `Teu ping é ${message.createdTimestamp - Date.now()}ms`,
        );
    },
};
