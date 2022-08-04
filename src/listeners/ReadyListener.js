const ChillBotListener = require('../structures/ChillBotListener');

class ReadyListener extends ChillBotListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }

    async run(client) {
        client.messagecounter.hanlde(30000);
        console.log('[+] ChillBot был запущен!');
    }
}

module.exports = ReadyListener;