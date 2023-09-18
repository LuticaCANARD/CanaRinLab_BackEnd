/**
 * Command : function 의 Key-value 
 */

import {SlashCommandBuilder,REST,Routes} from "discord.js";

const commands = [
    new SlashCommandBuilder().setName('안녕하세요').setDescription('인사를 합니다.'),
].map(command => command.toJSON());

export const registerCommands = (token, clientId, guildId) => {
    const rest = new REST({version: '9'}).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}