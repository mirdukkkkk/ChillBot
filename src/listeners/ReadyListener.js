const { MessageEmbed } = require('discord.js');
const ChillBotListener = require('../structures/ChillBotListener');

class ReadyListener extends ChillBotListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }

    async run(client) {
        console.log('[+] ChillBot был запущен!');
    }
}

module.exports = ReadyListener;