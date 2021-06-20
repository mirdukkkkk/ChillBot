const ChillBotCommand = require('../../structures/ChillBotCommand');

class BadgesCommand extends ChillBotCommand {
    constructor() {
        super('badges', {
            description: 'Выдаёт значок определённой цели',
            category: 'special',
            usage: '<ID/Упоминание> <ID значка который выходите выдать/отнять>',
            args: true,
            public: false
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.fail(`${message.client.settings.emojis.warning} | Указанный вами пользователь не был найден!`);
        let data = await message.client.database.collection('users').findOne({ userID: member.id });
        if(!data) return message.fail(`${message.client.settings.emojis.warning} | Пользователь отсуствует в базе данных!\n${message.client.settings.emojis.info} | Свяжитесь с создателем бота для дополнительной информации.`);
        if(!message.client.constants.badgesArray.includes(args[1])) return message.fail(`${message.client.settings.emojis.warning} | Указанного вами значка не существует!`)
        try {
            message.client.database.collection('users').updateOne({ userID: member.id }, {
                [data.badges.includes(args[1]) ? '$pull' : '$push']: {
                    badges: args[1]
                }
            });
            message.react(message.client.settings.emojis.done);
        } catch(error) {
            message.reply(`Произошла неизвестная ошибка. Свяжитесь с разработчиком для дополнительной информации!\n${error}`);
        }
    }
}

module.exports = BadgesCommand;