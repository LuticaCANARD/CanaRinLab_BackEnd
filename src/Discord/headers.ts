import 'dotenv/config'
export const discord_url = "https://discord.com/api"
export const header  =  {
  "User-Agent": `DiscordBot`,
  "Authorization" : `Bot ${process.env["PRIVATE_BOT_KEY"]}`
}