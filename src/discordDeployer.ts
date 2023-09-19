/**
 * Command : function 의 Key-value 
 */
import path from 'node:path';

export const executeCommand = () =>{
    var os =require("os");
    const { REST, Routes } = require('discord.js');
    const fs = require('node:fs');

    let clientId='';
    let guildId ='';


    clientId = process.env.CLIENT_ID;
    guildId = process.env.TO_REGISTER_GUILD;

    const token = process.env.DISCORD_BOT_TOKEN;

    const path_d = path.join(__dirname, './Discord/command');
    const commands = [];
    // Grab all the command files from the commands directory you created earlier
    const commandFiles = fs.readdirSync(path_d).filter(file => file.endsWith('.ts'));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const command = require(path.join(path_d,`/${file}`));
        console.log(command)
        if(command.__esModule) commands.push(command.default.data.toJSON())
        else commands.push(command.data.toJSON());
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(token);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}
