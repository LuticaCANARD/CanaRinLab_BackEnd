import axios from "axios";
import {discord_url,header} from "./headers"

/**
 * 정시가 되면 이모지를 읽고,
 * 이모지로 읽어온 사람들중 참가를 클릭한 인원에 한하여
 * 돌린다. 단, 최저인원 이하일 경우 돌리지 않음.
 */

export const DoReadAndCheck = async () =>{
  const channel_info = await axios({
    method: 'get',
    url: discord_url+`/channels/${process.env["channel_id"]}/messages`,
    headers:header
  });
  
  const last_chat_id = channel_info["data"][0]["id"] // 마지막꺼 들고오는건데 채널 메세지 통제가 중요.
  
  const accept_reactions = await axios({
    method: 'get',
    url: discord_url+`/channels/${process.env["channel_id"]}/messages/${last_chat_id}/reactions/${process.env["emoji"]}`,
    headers:header
  });
  const accepters = accept_reactions.data.map((u:any) =>u["id"])
  
  if(accepters.length < 2) 
  { 
    //정족수 미만
    await axios({
      method: 'POST',
      url: discord_url+`/channels/${process.env["channel_id"]}/messages`,
      headers:header,
      data : {
        "content": "이번주 카지노는 휴무입니다."
      }
    });
  }
  else
  {
    const all_member = await axios({
      method: 'get',
      url: discord_url+`/guilds/${process.env["guild_id"]}/members?limit=999`,
      headers:header
    })
    // 카지노 실행의 정족수 혹은 그 이상이 채워짐.
    // 인턴에 대한 방안 -> 새 array만들어서 걍 따로 밀어버리기.
    const membership = all_member.data.filter((user:any) =>accepters.includes(user["user"]["id"])&&user["roles"].includes(String(process.env["member_id"]))&&!user["roles"].includes(String(process.env["manager_id"])));
    const interns = all_member.data.filter((user:any) => accepters.includes(user["user"]["id"])&&user["roles"].includes(String(process.env["intern_id"])))
    membership.sort(() => Math.random()-0.5) // 섞음
    const orders_raw = await axios({
      method: 'get',
      url: discord_url+`/channels/${process.env["channel_id_role"]}/messages`,
      headers:header
    });
    const order = orders_raw.data[0]["content"].replace(/, /g,',').replace(/ ,/g,',').split(',')
    let res = " 오늘의 역할 \n";
    res +=  "```"
    for (let i = 0; i < membership.length; i++){
      const name = membership[i]["nick"]==null ? membership[i]["user"]["global_name"]:membership[i]["nick"]
      res += `${order[i]} : ${name} \n`;
    }
    if(interns.length > 0){
      res += "------- 인턴 ----- \n";
      for (let i = 0; i < interns.length; i++){
        res += `인턴${i} : ${interns[i]["nick"]} \n`
      }
    }

    res +=  "```"
  
    await axios({
      method: 'POST',
      url: discord_url+`/channels/${process.env["channel_id"]}/messages`,
      headers:header,
      data : {
        "content": res
      }
    });
  }
  
}

DoReadAndCheck();