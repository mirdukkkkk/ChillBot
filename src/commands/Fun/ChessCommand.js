const ChillBotCommand = require('../../structures/ChillBotCommand');

class ChessCommand extends ChillBotCommand {
    constructor() {
        super('chess', {
            description: 'Даёт форму для участия в чемпионате',
            category: 'fun',
            aliases: ['ch'],
            cooldown: 5
        });
    }

    async run(message, args) {
        if(message.channel.id == '738534600174862389') return message.reply('Нельзя использовать данную команду в данном канале!');
        message.author.send('https://forms.gle/bzTjPDLXanxTNTWKA <== форма').then(() => {
            message.reply('Я отправил ссылку в ЛС, заполните форму для участия, потом c вами свяжутся.');
        });
    }
}

module.exports = ChessCommand;