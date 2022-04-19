module.exports = {
	name: "mute",
	description: "mutar os palhaços",
	execute(message, args) {
		const target = message.mentions.users.first();
		if (target) {
			let mainRole = message.guild.roles.cache.find(
				(role) => role.name === "Brabo's"
			);
			let muteRole = message.guild.roles.cache.find(
				(role) => role.name === "mutado"
			);

			let memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.remove(mainRole.id);
			memberTarget.roles.add(muteRole.id);

			message.channel.send(`<@${memberTarget.user.id}> tomou mute`);
		} else {
			message.channel.send("Achei esse maluco n");
		}
	},
};
