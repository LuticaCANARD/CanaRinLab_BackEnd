const { SlashCommandBuilder } = require('discord.js');
import { ChatInputCommandInteraction , CacheType } from 'discord.js';
const  {db} = require( '../../Utils/db')
module.exports= {
	data: new SlashCommandBuilder()
		.setName('카지노뽑기')
		.setDescription('카지노에 참가할 인원을 체크하고, 이 인원을 랜덤으로 배치합니다.')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'Funny', value: 'gif_funny' },
					{ name: 'Meme', value: 'gif_meme' },
					{ name: 'Movie', value: 'gif_movie' },
				)
						
		)
		,
	async execute(interaction:ChatInputCommandInteraction<CacheType>){
		const read = await db.
		selectFrom("CasinoChat")
		.where("CasinoChat.id","=",Number(interaction.guildId))
		.select("CasinoChat.chatId")
		.execute();
		const p = await interaction.reply({ content: '<everyone> 디음주 카지노 참가자 확인합니다!', fetchReply: true })
		console.log(interaction.options.data)
		
		interaction.channel?.messages.fetch(read["chatId"]);
		//.then(message => console.log(message.content)).catch(console.error);
		//await p.react('✅')

		//if(read.length>0) await db.updateTable("CasinoChat").set({"chatId":Number(p.id)}).where("CasinoChat.id","=",Number(p.guildId)).execute();
		//else await db.insertInto("CasinoChat").values([{"id" : Number(p.guildId),"chatId":Number(p.id)}]).execute();
	}
	
}; 
