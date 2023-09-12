/**
 * Command : function 의 Key-value 
 */

import {DiscordCommandMeta} from './Discord/command/Discord_type_utils/discordTypes'
import fs from 'fs'

const commandFiles = fs.readdirSync('./Discord/command').filter(file => file.endsWith('.js'));
const dd:Array<DiscordCommandMeta> = [];
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command:DiscordCommandMeta = require(`./Discord/command/${file}`);
    dd.push(command);
}

const discord_command = dd.reduce((newObj, obj) => {
    newObj[obj.name] = obj;
    return newObj;
}, {});



export default discord_command;