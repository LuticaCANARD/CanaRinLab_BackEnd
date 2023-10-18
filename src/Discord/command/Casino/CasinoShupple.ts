import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction , CacheType } from 'discord.js';
import { db } from '../../../Utils/db';
import { ReturningNode } from 'kysely';
import { checkAdmin } from '../../Admincheck';


export default {
	data: new SlashCommandBuilder()
		.setName('카지노뽑기')
		.setDescription('카지노에 참가할 인원을 체크하고, 이 인원을 랜덤으로 배치합니다.')
		.addStringOption(option =>
			option.setName('역할지정')
				.setDescription('멤버 멘션:역할 (구분은 쉼표(,))')
				.setRequired(false)
		)
		.addBooleanOption(option=>
			option.setName("인턴")
			.setDescription('인턴')
		)
		,
	async execute(interaction:ChatInputCommandInteraction<CacheType>){
		if(await checkAdmin(interaction) == false) return ;
		const read = await db.
		selectFrom("CasinoChat")
		.where("CasinoChat.id","=",interaction.guildId)
		.select("CasinoChat.chatId")
		.execute();
		const f = await interaction.channel?.messages.fetch(read[0]["chatId"]);
		const reacts = f?.reactions.cache.get('✅');
		const g = await reacts?.users.fetch({});
		const joinner = new Map();
		let memberids_ = g?.filter(p=>!p.bot)
		let memberids = memberids_?.map(j=>{
			joinner.set(j.id,true)		
			return j.id;
		})
		

		const argus = new Map()
		interaction.options.data.map(a=>argus.set(a.name,a.value))
		const sttr = argus?.get("역할지정")?.replace(/, /g,',').replace(/ ,/g,',').split(',')
		const role_addt = new Map()

		const casino_min_ = await db.selectFrom("ServerPref").select("value").where("ServerPref.prefKey","=","casino_min").execute();
		const casino_min = Number(casino_min_[0].value)
		if (!memberids
			||memberids.length<casino_min
			) 
			{await interaction.reply({content:'이번주 카지노는 쉽니다! (인원부족)'}); return;}
			
		const member_nicks = await db.selectFrom("CasinoMember").where("CasinoMember.userId","in",memberids).select(["CasinoMember.name","CasinoMember.userId"]).execute();
		member_nicks.sort(() => Math.random()-0.5) // 섞음

		let str_val = '오늘의 카지노 \n'
		
		str_val +=''
		const roles_ = await db.selectFrom("CasinoRoles").select(["CasinoRoles.RoleName","CasinoRoles.userId","CasinoRoles.Priority"]).orderBy("CasinoRoles.Priority").execute();
		if(sttr){
			for(let v of sttr ){
				const arrs = v.split(':')
				const pz = arrs[0].replace(/<@|>/g,'')
				const role = arrs[1]
				memberids = memberids.filter(item => item !== pz);
				role_addt.set(role,pz);
			}
		}

		let counter = 1;
		//console.log(member_nicks)
		for(let rl of roles_){

			const rname = rl["RoleName"];
			const res_member = role_addt.get(rname);
			if(res_member) str_val += `${rname} : <@${res_member}>\n`
			else if(rl["userId"]&&joinner.get(rl["userId"])){
				str_val += `${rname} : <@${rl["userId"]}>\n`
			}
			else {
				str_val += `${rname} : <@${member_nicks[counter-1]["userId"]}>\n`
				counter ++ ;
			}
			if(counter > member_nicks.length) break;

		}

		str_val+= ''


		await interaction.reply({content:str_val})


	}
	
}; 
