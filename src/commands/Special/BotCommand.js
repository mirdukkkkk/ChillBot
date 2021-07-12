const { MessageEmbed } = require('discord.js');
const ChillBotConfirmation = require('../../utils/ChillBotConfirmation');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class BotCommand extends ChillBotCommand {
    constructor() {
        super('bot', {
            category: 'special',
            description: 'Управление ботом',
            usage: '<опция>',
            public: false,
            cooldown: 3
        });
    }

    async run(message, args) {
        if(!message.client.constants.special_access.includes(message.author.id)) return message.react('❌');
        let option = args[0];
        switch(option) {
            case 'status': {
                if(args.slice(1).join(' ').length > 120) return message.fail(`${message.client.settings.emojis.info} | Статус не должен привышать 120 символов в длинну!`);
                if(args.slice(1).join(' ').length === 0) return message.fail(`${message.client.settings.emojis.info} | Статус не может быть длинной 0 символов!`);

                await new ChillBotConfirmation(message.client, message.author).init(`Вы уверены, что хотите сменить статус бота?`, message.channel).then(async (response) => {
                    if(response) {
                        message.reply(new MessageEmbed()
                            .setTitle(`${message.client.settings.emojis.bot} | Управление ботом`)
                            .setColor(message.client.settings.colors.main)
                            .setDescription(`${message.client.settings.emojis.info} | Статус бота сменён на \`${args.slice(1).join(' ')}\``)
                            .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                            .setTimestamp()
                        );
                        message.client.user.setActivity(args.slice(1).join(' '), { type: 3 });
                        /*
                        message.client.database.collection('main').findOne({ name: 'bot' }).updateOne({ name: 'bot' }, {
                            $set: {
                                status: args.slice(1).join(' ')
                            }
                        });
                        */
                    } else message.fail(`${message.client.settings.emojis.info} | Операция была отменена`);
                });
                break;
            }
            default: {
                message.fail(`${message.client.settings.emojis.warning} | Необходимо выбрать опцию для данной команды!\n${message.client.settings.emojis.info} | Доступные опции: \`status\``)
                break;
            }
        }
    } 
}

module.exports = BotCommand;