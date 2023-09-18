const { SlashCommandBuilder } = require('discord.js');
import { ChatInputCommandInteraction , CacheType } from 'discord.js';
const  {db} = require( '../../Utils/db')
module.exports= {
	data: new SlashCommandBuilder()
		.setName('카지노체크')
		.setDescription('카지노에 참가할 인원을 체크합니다.'),
	async execute(interaction:ChatInputCommandInteraction<CacheType>){
		
		const p = await interaction.reply({ content: '<everyone> 디음주 카지노 참가자 확인합니다!', fetchReply: true })
		await p.react('✅')
		const read = await db.
		selectFrom("CasinoChat")
		.where("CasinoChat.id","=",Number(p.guildId))
		.select("CasinoChat.chatId")
		.execute();
		if(read.length>0) await db.updateTable("CasinoChat").set({"chatId":Number(p.id)}).where("CasinoChat.id","=",Number(p.guildId)).execute();
		else await db.insertInto("CasinoChat").values([{"id" : Number(p.guildId),"chatId":Number(p.id)}]).execute();


	}
	
}; 
