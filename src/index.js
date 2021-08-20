const ChillBotClient = require('./structures/ChillBotClient');
const { Intents } = require('discord.js');

console.log('[+] ChillBot запускается!');

const client = new ChillBotClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
});

client._start().catch(console.error);