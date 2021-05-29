const { Structures, Intents } = require('discord.js');
const moment = require('moment');
const ChillBotClient = require('./structures/ChillBotClient');

console.log('[+] ChillBot Запускается!');

moment.locale('ru');

Structures.extend('Message', () => require('./structures/DJS/ChillBotMessage'));

const client = new ChillBotClient({
    ws: {
        intents: Intents.ALL
    },
    disableMentions: 'all'
});

client._start().catch(console.error);