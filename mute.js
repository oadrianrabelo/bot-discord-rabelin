const command = require("./command");

module.exports = (client) => {
	client.on("guildMemberAdd", (member) => {
		const { id } = member;
	});
	const giveRole = (member) => {
		const role = member.guild.roles.cache.find(
			(role) => role.name === "SUCUMBIDO"
		);
		if (role) {
			member.roles.add(role);
			console.log("Muted " + member.id);
		}
	};
	command(client, "mute", (message) => {
		// !mute @ 10 h (mencionar, duração, tipo(segundo, minuto, hora, dia))
		const syntax = "!mute <@> <duração em número> <m, h, d, ou F>";
		const { member, channel, content, mentions, guild } = message;

		if (!member.hasPermission("ADMINISTRATOR")) {
			channel.send("Pó mutar n fi");
			return;
		}

		const split = content.trim().split(" ");

		if (split.length !== 4) {
			channel.send("Escreve direito ae menor: " + syntax);
			return;
		}

		const duration = split[2];
		const durationType = split[3];

		if (isNaN(duration)) {
			channel.send("Coloca um número ai pô. " + syntax);
			return;
		}

		const durations = {
			m: 60,
			h: 60 * 60,
			d: 60 * 60 * 24,
			F: -1,
		};

		if (!durations[durationType]) {
			channel.send("Coloca uma duração certa aí menor. " + syntax);
			return;
		}

		const seconds = duration * durations[durationType];

		const target = mentions.users.first();
		if (!target) {
			channel.send("Tu tá querendo mutar quem krai?");
			return;
		}

		const { id } = target;

		const targetMember = guild.members.cache.get(id);
		giveRole(targetMember);
	});
};
