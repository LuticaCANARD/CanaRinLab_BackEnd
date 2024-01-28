import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction , CacheType } from 'discord.js';
import { db } from '../../../Utils/db';
import { ReturningNode } from 'kysely';
import { checkAdmin } from '../../Utils/Admincheck';
import { GetCasinoChatters,GetCasinoRole,GetMemberName } from '../../../model/CasinoMembers';
import { GetSetting } from '../../../model/setting';

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
		const read = await GetCasinoChatters(interaction.guildId);
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

		const casino_min_ = await GetSetting("casino_min");
		const casino_min = Number(casino_min_[0].value)
		if (!memberids
			||memberids.length<casino_min
			) 
			{await interaction.reply({content:'이번주 카지노는 쉽니다! (인원부족)'}); return;}
		const member_nicks = await GetMemberName(memberids);

		const roles_ = await GetCasinoRole();
		if(sttr){
			for(let v of sttr ){
				const arrs = v.split(':')
				const pz = arrs[0].replace(/<@|>/g,'')
				const role = arrs[1]
				memberids = memberids.filter(item => item !== pz);
				role_addt.set(role,pz);
			}
		}
		// TODO : 인턴은 따로돌린다.

		const before = new Map();
		let get_firsted = false;
		let str_val = '오늘의 카지노 \n' + SuppleMember(role_addt,joinner,member_nicks,roles_);

		await interaction.reply({content:str_val})


	}
	
}; 

export const SuppleMember = (role_addt,joinner,member_nicks,roles_,debug=false)=>{
	const deploy_result:Array<Map<string,string>> = [];
	const names = new Map();
	member_nicks.forEach(c=>{
		names.set(c.userId,c.name);
	})
	for(let now=1;now<=2;now++)
	{
		const now_deploy:Map<string,string> = new Map(); 
		let counter = 1;
		member_nicks.sort(() => Math.random()-0.5) // 섞음

		//console.log(member_nicks)
		for(let rl of roles_){
			const rname = rl["RoleName"];
			const res_member = role_addt.get(rname);
			if(res_member) {
				now_deploy.set(rname,res_member);
			}
			else if(rl["userId"] && joinner.get(rl["userId"])){
				now_deploy.set(rname,rl["userId"]);
			} else {
				now_deploy.set(rname,member_nicks[counter-1]["userId"]);
				counter ++ ;
			}
			if(counter > member_nicks.length) break;
		}
		deploy_result.push(now_deploy);
	}
	const debugArray = [];
	let str_val : string = "오늘의 역할 \n";
	for(let i=0;i<deploy_result.length;i++)
	{
		str_val += `${i+1} 부 \n`
		const now_checking_roles = deploy_result[i];
		if(i==1){ // 후반부일때... 전반부와 동일한 역할이 있는지 검사.
			const before_ = deploy_result[0];
			const key_arr_before = Array.from(before_.keys());
			const length_ = key_arr_before.length;
			key_arr_before.forEach(key=>{
				if(before_.get(key) == now_checking_roles.get(key)) 
				{
					let selected_key = key_arr_before[Math.floor(Math.random()*length_)];
					while(selected_key == key || before_.get(selected_key) == now_checking_roles.get(key)){
						selected_key = key_arr_before[Math.floor(Math.random()*length_)];
					}
					let temp_member = now_checking_roles.get(selected_key);
					now_checking_roles.set(selected_key,now_checking_roles.get(key));
					now_checking_roles.set(key,temp_member);
				}
			})
			
		}

		const keys = Array.from(now_checking_roles.keys());
		
		str_val += `\`\`\`\n`
		keys.forEach(key=>{
			str_val += `${key} : ${names.get(now_checking_roles.get(key))}\n`
		})
		debugArray.push(now_checking_roles);
		str_val += '```\n';

	}
	if(debug){
		for(const key of Array.from(debugArray[0].keys())){
			if(debugArray[0].get(key) == debugArray[1].get(key)) {
				console.log('!!!!\n')
				return true;
			}
		}
		return false;
	}
	return str_val;

}
