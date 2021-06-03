const { MessageEmbed } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class StatusCommand extends ChillBotCommand {
    constructor() {
        super('bot', {
            category: 'special',
            description: 'Управление ботом',
            usage: '<опция>',
            args: true,
            public: false,
            cooldown: 3
        });
    }

    async run(message, args) {
        let option = args[0];
        switch(option) {
            case 'status': {
                if(args.slice(1).join(' ').length < 50 && args.slice(1).join(' ').length === 0) return message.fail(`${message.client.settings.emojis.info} | Статус не должен содержать 0 символов и привышать 50 символов в длинну!`);
                message.reply(
                    new MessageEmbed()
                    .setTitle(`${message.client.settings.emojis.bot} | Управление ботом`)
                    .setDescription(`${message.client.settings.emojis.info} | Статус бота сменён на \`${args.slice(1).join(' ')}\``)
                    .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                );
                break;
            }
            default: {
                message.fail(`${message.client.settings.emojis.warning} | Необходимо выбрать опцию для данной команды!\n${message.client.settings.emojis.info} | Доступные опции: \`status\``)
                break;
            }
        }
    } 
}

module.exports = StatusCommand;