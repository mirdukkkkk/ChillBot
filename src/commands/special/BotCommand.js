const { EmbedBuilder } = require('discord.js');
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
                if(args.slice(1).join(' ').length > 120) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Статус не должен привышать 120 символов в длинну!`, message);
                if(args.slice(1).join(' ').length === 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Статус не может быть длинной 0 символов!`, message);

                message.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`${message.client.constants.emojis.bot} | Управление ботом`)
                            .setColor(message.client.constants.colors.main)
                            .setDescription(`${message.client.constants.emojis.info} | Статус бота сменён на \`${args.slice(1).join(' ')}\``)
                            .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                            .setTimestamp()
                        ]
                    }
                );
                message.client.user.setPresence({ activities: [{ name: args.slice(1).join(' '), type: 3 }] });
                break;
            }

            case 'username': {
                if(args.slice(1).join(' ').length > 32) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Новый никнейм не должен превышать 32 символа в длинну!`, message);
                if(args.slice(1).join(' ').length === 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Новый никнейм не может быть длинной 0 символов!`, message);

                message.client.user.setUsername(args.slice(1).join(' ')).then(() => {
                    message.reply(
                        {
                            embeds: [
                                new EmbedBuilder()
                                .setTitle(`${message.client.constants.emojis.bot} | Управление ботом`)
                                .setColor(message.client.constants.colors.main)
                                .setDescription(`${message.client.constants.emojis.info} | Никнейм бота сменён на \`${args.slice(1).join(' ')}\``)
                                .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                                .setTimestamp()
                            ]
                        }
                    );
                })
                .catch(() => { 
                    message.reply({ content: 'Превышен лимит запрсов на смену ника (максимум 2 смены никнейма в час)' });
                });

                break;
            }

            default: {
                message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Необходимо выбрать опцию для данной команды!\n${message.client.constants.emojis.info} | Доступные опции: \`status\``, message);
                break;
            }
        }
    }
}

module.exports = BotCommand;