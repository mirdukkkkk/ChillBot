const { MessageEmbed } = require('discord.js');
const ChillBotComamnd = require('../../structures/ChillBotCommand');

class GayCommand extends ChillBotComamnd {
    constructor() {
        super('gay', {
            description: 'Выдаёт шанс того, что пользователь гей',
            category: 'fun',
            usage: '[упоминание/ID]',
            cooldown: 3
        });
    }

    run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        return message.reply(
            new MessageEmbed()
            .setTitle('🏳️‍🌈 | Гей')
            .setColor(message.client.settings.colors.main)
            .setDescription(`${user.nickname} гей на ${Math.floor(Math.random() * (100 - 0 + 1)) + min}%`)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        );
    }
}

module.exports = GayCommand;