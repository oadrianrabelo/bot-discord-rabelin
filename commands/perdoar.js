module.exports = {
	name: "perdoar",
	description: "perdoar os palhaços",
	execute(message, args) {
		const target = message.mentions.users.first();
		if (target) {
			let mainRole = message.guild.roles.cache.find(
				(role) => role.name === "cargo geral"
			);
			let muteRole = message.guild.roles.cache.find(
				(role) => role.name === "quase ban"
			);

			let memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.remove(muteRole.id);
			memberTarget.roles.add(mainRole.id);

			message.channel.send(`<@${memberTarget.user.id}> foi perdoado`);
		} else {
			message.channel.send("Achei esse maluco n");
		}
	},
};
