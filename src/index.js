const ChillBotClient = require('./structures/ChillBotClient');

console.log('[+] ChillBot запускается!');

const client = new ChillBotClient({
    intents: 45851,
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
    partials: ['CHANNEL', 'MESSAGE']
});

client._start().catch(console.error);

process.on('uncaughtException', async(error) => {
    console.error(error)
});