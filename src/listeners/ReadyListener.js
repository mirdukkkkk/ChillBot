const ChillBotListener = require('../structures/ChillBotListener');

class ReadyListener extends ChillBotListener {
    constructor() {
        super('ReadyListener', { event: 'ready' });
    }

    async run(client) {
        client.user.setActivity(`на сервер Just Chilling`, { type: 3 });
        console.log('[+] ChillBot был запущен!');
    }
}

module.exports = ReadyListener;