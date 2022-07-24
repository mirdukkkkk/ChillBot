const ChillBotCommand = require('../../structures/ChillBotCommand');

class BadgesCommand extends ChillBotCommand {
    constructor() {
        super('badges', {
            description: 'Выдаёт значок определённой цели',
            category: 'special',
            usage: '<ID/Упоминание> <ID значка который выходите выдать/отнять>',
            args: true,
            public: false,
            cooldown: 3
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        if(args.length === 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Пожалуйста, укажите участника, которому вы хотите выдать значок.`, message);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указанный вами пользователь не был найден!`, message);
        if(args.length === 1) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите значок, который вы хотите выдать участнику!`, message);
        let data = await message.client.database.collection('users').findOne({ id: member.id });
        if(!data) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Пользователь отсуствует в базе данных!\n${message.client.constants.emojis.info} | Свяжитесь с создателем бота для дополнительной информации.`, message);
        if(!message.client.constants.badgesArray.includes(args[1])) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указанного вами значка не существует!`, message);

        try {
            message.client.database.collection('users').updateOne({ id: member.id }, {
                [data.badges.includes(args[1]) ? '$pull' : '$push']: {
                    badges: args[1]
                }
            });
            message.react(message.client.constants.emojis.done);
        } catch(error) {
            return message.client.loggingservice.error(error, message);
        }
    }
}

module.exports = BadgesCommand;