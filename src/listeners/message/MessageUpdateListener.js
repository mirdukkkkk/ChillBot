const ChillBotListener = require('../../structures/ChillBotListener');
const CommandsExecutorService = require('../../services/CommandsExecutorService');

class MessageUpdateListener extends ChillBotListener {
    constructor() {
        super('MessageUpdateListener', { event: 'messageUpdate' });
    }

    async run(client, oldMessage, newMessage) {
        if(!newMessage.guild || oldMessage.content === newMessage.content) return;

        const executor = new CommandsExecutorService(newMessage, client);
        executor.runCommand();
    }
}

module.exports = MessageUpdateListener;