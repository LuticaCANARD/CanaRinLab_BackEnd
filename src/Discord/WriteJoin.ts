import axios from "axios";
import {discord_url,discord_header} from "../Utils/headers"

export const WriteJoin = async () =>{
	const od = await axios({
	method: 'POST',
	url: discord_url+`/channels/${process.env["channel_id"]}/messages`,
	headers:discord_header,
	data : {
		"content": process.env["pack_msg"]
	}
});


await axios({
	method: 'PUT',
	url: discord_url+`/channels/${process.env["channel_id"]}/messages/${od["data"]["id"]}/reactions/${process.env["emoji"]}/@me`,
	headers:discord_header
});
}
WriteJoin();

