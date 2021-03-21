const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
	name: "play",
	description: "Joins and plays a video from youtube",
	async execute(message, args) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel)
			return message.channel.send("Tu tem que tá num canal de voz krai");
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT"))
			return message.channel.send(
				"Coé patrão tu n tem permissão pra conectar irmão"
			);
		if (!permissions.has("SPEAK"))
			return message.channel.send(
				"Coé patrão tu n tem permissão pra falar irmão"
			);
		if (!args.length)
			return message.channel.send("Envia o comando direito fi");

		const validURL = (str) => {
			var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
			if (!regex.test(str)) {
				return false;
			} else {
				return true;
			}
		};

		if (validURL(args[0])) {
			const connection = await voiceChannel.join();
			const stream = ytdl(args[0], { filter: "audioonly" });

			connection
				.play(stream, { sneak: 0, volume: 1 })
				.on("finish", () => {
					voiceChannel.leave();
					message.channel.send("Vazando fi");
				});

			await message.reply(`:thumbsup: Tocando ***teu link ué***`);

			return;
		}

		const connection = await voiceChannel.join();
		const videoFinder = async (query) => {
			const videoResult = await ytSearch(query);

			return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
		};

		const video = await videoFinder(args.join(" "));

		if (video) {
			const stream = ytdl(video.url, { filter: "audioonly" });
			connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
				voiceChannel.leave();
			});

			await message.reply(`:thumbsup: Tocando ***${video.title}***`);
		} else {
			message.channel.send("Achei n ó");
		}
	},
};
