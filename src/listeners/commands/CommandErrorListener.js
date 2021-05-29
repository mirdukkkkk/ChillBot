const ChillBotListener = require('../../structures/ChillBotListener');

class CommandErrorListener extends ChillBotListener {
    constructor() {
        super('CommandErrorListener', { event: 'commandError' });
    }

    run(error, message) {
        console.log(error);

        return message.fail(`${message.client.settings.emojis.warning} | При выполнении данной команды произошла ошибка! Обратитесь к разработчику бота.`);
    }
}

module.exports = CommandErrorListener;