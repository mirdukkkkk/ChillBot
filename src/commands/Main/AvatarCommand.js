const { MessageEmbed } = require('discord.js');
const ChillBotComamnd = require('../../structures/ChillBotCommand');

class AvatarCommand extends ChillBotComamnd {
    constructor() {
        super('avatar', {
            description: 'Отображает вашу аватарку или аватарку указанного пользователя',
            category: 'main',
            usage: '[упоминание/ID]',
            aliases: 'ava',
            cooldown: 3
        });
    }

    run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        return message.reply(
            new MessageEmbed()
            .setTitle(`Аватар пользователя ${user.user.tag}`)
            .setColor(message.client.settings.colors.main)
            .setImage(user.user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        );
    }
}

module.exports = AvatarCommand;