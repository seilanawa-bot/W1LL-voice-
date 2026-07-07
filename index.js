require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", async () => {
  console.log(`✅ ${client.user.tag} is online!`);

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return console.log("Guild tidak ditemukan!");

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
  if (!channel) return console.log("Voice Channel tidak ditemukan!");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: true,
  });

  console.log(`🎤 Berhasil masuk ke VC: ${channel.name}`);
});

client.login(process.env.TOKEN);
