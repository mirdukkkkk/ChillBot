const { EmbedBuilder } = require('discord.js');
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
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle('🏳️‍🌈 | Гей')
                .setColor(message.client.constants.colors.main)
                .setDescription(`➡️ | ${user.nickname || user.user.username} гей с вероятностью ${Math.floor(Math.random() * (100 - 0 + 1)) + 0}%`)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            ]
        });
    }
}

module.exports = GayCommand;