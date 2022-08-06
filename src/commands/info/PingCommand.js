const ChillBotCommand = require('../../structures/ChillBotCommand');

class PingCommand extends ChillBotCommand {
    constructor() {
        super('ping', {
            description: 'Показывает текуюю задержку ответа API discord',
            category: 'info',
            cooldown: 3
        });
    }

    async run(message, args) {
        return message.reply({ content: `Понг 🏓! Пинг **${message.client.ws.ping}ms**` });
    }
}

module.exports = PingCommand;