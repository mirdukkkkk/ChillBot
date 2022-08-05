const ChillBotCommand = require('../../structures/ChillBotCommand');
const ChillBotTttGame = require('../../utils/ChillBotTttGame');

class TttCommand extends ChillBotCommand {
    constructor() {
        super('ttt', {
            description: 'Начинает новую партию в крестики нолики',
            category: 'fun',
            usage: '<упоминание/ID>',
            cooldown: 10
        });
    }

    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Укажите участника, с которым вы хотите поиграть в крестики-нолики`, message);
        if(user.bot) return message.reply({ content: 'Вы не можете предложить играть боту' });

        const ttt = new ChillBotTttGame({
            drawEndDescription: `${message.client.constants.emojis.info} | Игра закончилась ничьёй`,
            drawEndTitle: 'Информация',
            endDescription: "🏆 | **{winner}** выиграл",
            endTitle: "Информация",
            forceEndDescription: "❌ | Игра принудительно звершена {user}",
            forceEndTitle: "Информация",
            requestTitle: "Ты был приглашён поиграть в крестики нолики",
            startTitle: "Крестики-нолики",
            timeEndDescription: "{user}, ты слишком медленный",
            timeEndTitle: "Таймаут",
            autoDelete: 1600
        });

        ttt.duo(message, user.user);
    }
}

module.exports = TttCommand;