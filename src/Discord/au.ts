import { db } from '../Utils/db';

const meme_ = await db.selectFrom('CasinoMember').select('CasinoMember.userId').execute();
const roles_ = await db.selectFrom('CasinoRoles').select('CasinoRoles.RoleName').orderBy('CasinoRoles.Priority').execute();
let sttr = ''
console.log('---')
let meme_2 = meme_.map(c => c.userId)
meme_2.sort(() => Math.random()-0.5) // 섞음

const role_addt = new Map();
let counter = 0;
console.log('---')
for(let rl of roles_){
	const rname = rl["RoleName"];
	const res_member = meme_2[counter];
	if(res_member) sttr += `${rname} : ${res_member}\n`
	if(counter > meme_2.length) break;
	counter++;
}
console.log('---')
console.log(sttr)
