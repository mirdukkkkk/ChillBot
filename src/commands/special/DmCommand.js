const ChillBotCommand = require('../../structures/ChillBotCommand');

class DmCommand extends ChillBotCommand {
    constructor() {
        super('dm', {
            description: 'Команда для управления личными сообщениями бота',
            category: 'special',
            usage: '<send/edit/delete>',
            public: false,
            cooldown: 0
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        const option = args[0];
        switch(option) {
            case 'send': {
                const user = message.client.users.cache.get(args[1]) || message.mentions.users.first();
                if(!user) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указаный вами пользователь не был найден!`, message);
                const content = args.slice(2).join(' ');
                if(content.length == 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите то, что вы хотите отправить в ЛС **${user.username}**!`, message);
                user.send(content).then((m) => {
                    message.reply({ content: `Сообщение было успешно отправлено **${user.username}**! ID сообщения: **${m.id}**` });
                }).catch(() => message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Невозможно отправить данному человеку сообщение в ЛС!`, message));
            }
            /*
            case 'edit': {
                const user = message.client.users.cache.get(args[1]) || message.mentions.users.first();
                if(!user) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указаный вами пользователь не был найден!`, message);
                const msg = await message.client.channels.cache.filter(c => !c.recipient === false).find(c => c.recipient.id === user.id).messages.fetch(args[2]).catch(() => {
                    message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указанное вами сообщение не было найдено!`, message);
                });
                try {

                    //if(!msg) return 
                    const content = args.slice(3).join(' ');
                    if(content.length == 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите то, на что вы хотите заменить старое содержание сообщения **${user.username}**!`, message);
                    msg.edit(content);
                } catch { return null }
            }
            */
        }
    }
}

module.exports = DmCommand;