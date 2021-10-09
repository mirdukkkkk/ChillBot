const ChillBotClient = require('./structures/ChillBotClient');
const { Intents } = require('discord.js');

console.log('[+] ChillBot запускается!');

const client = new ChillBotClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
    partials: ['CHANNEL', 'MESSAGE']
});

client._start().catch(console.error);