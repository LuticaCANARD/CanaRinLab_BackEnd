import { SlashCommandBuilder,APIApplicationCommandOptionChoice, CommandInteractionOptionResolver }from 'discord.js';
import { weatherRegion } from '../../../Utils/RegionCode';
import { getWeather } from '../../../common/weather'

export default {
	data: new SlashCommandBuilder()
		.setName('날씨예보')
		.setDescription('1일 이내의 날씨예보를 찾아옵니다. 위치는 지정된 곳에 한하여 제공합니다. 개발중입니다.')
        .addStringOption(option =>
			{
                option.setName('지역')
                    .setDescription('날씨를 가져올 지역을 선택합니다.')
                    .setRequired(true)
                const r:APIApplicationCommandOptionChoice<string>[] = []
                for(const j in weatherRegion) r.push({ name: j, value:j })
                option.addChoices(...r)
                return option;
            }
                
		),
	async execute(interaction) {
        const request_region = interaction.options.data[0]['value'];
        const position = weatherRegion[request_region];
        const res = await getWeather(position[0],position[1],60);
        const p = res['data']['response']['body']['items']['item'];
        const dataset = new Map();
        const ks = []
        p.forEach(e => {
            let ctr = '';
            if(dataset.get(+e.fcstTime))ctr = dataset.get(+e.fcstTime);
            switch(e.category)
            {
                case'POP':{

                }break;
                case 'PTY':{

                }break;
                case 'PCP':{

                }break;
                case'REH':{
                    
                }break;
                case'SNO':{
                    
                }break;
                case'SKY':{
                    
                }break;
                case'TMP':{
                    
                }break;
                case'TMN':{
                    
                }break;
                case'TMX':{
                    
                }break;
                case'UUU':{
                    
                }break;
                case'VVV':{
                    
                }break;
                case'WAV':{
                    
                }break;
                case'VEC':{
                    
                }break;
                case'WSD':{
                    
                }break;

            }
        });
        await interaction.reply('Pong!');
	}
};