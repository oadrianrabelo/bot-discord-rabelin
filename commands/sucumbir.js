module.exports = {
	name: "sucumbir",
	description: "sucumbir os palhaços",
	execute(message, args) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
			message.reply("tu n tem permissão pra sucumbir n irmão");
		} else {
			const target = message.mentions.users.first();
			if (target) {
				let mainRole = message.guild.roles.cache.find(
					(role) => role.name === "cargo geral"
				);
				let muteRole = message.guild.roles.cache.find(
					(role) => role.name === "quase ban"
				);

				let memberTarget = message.guild.members.cache.get(target.id);

				memberTarget.roles.remove(mainRole.id);
				memberTarget.roles.add(muteRole.id);

				message.channel.send(
					`<@${memberTarget.user.id}> FOI SUCUMBIDO`
				);
			} else {
				message.channel.send("Achei esse maluco n");
			}
		}
	},
};
