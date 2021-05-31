const ChillBotListener = require('../../structures/ChillBotListener');
const CommandsExecutorMaster = require('../../masters/CommandsExecutorMaster');

class MessageUpdateListener extends ChillBotListener {
    constructor() {
        super('MessageUpdateListener', { event: 'messageUpdate' });
    }

    async run(client, oldMessage, newMessage) {
        if(!newMessage.guild || oldMessage.content === newMessage.content) return;

        const executor = new CommandsExecutorMaster(newMessage, client);
        executor.runCommand();
    }
}

module.exports = MessageUpdateListener;