const { EmbedBuilder } = require('discord.js');
const ChillBotComamnd = require('../../structures/ChillBotCommand');

class AvatarCommand extends ChillBotComamnd {
    constructor() {
        super('avatar', {
            description: 'Отображает вашу аватарку или аватарку указанного участника',
            category: 'utils',
            usage: '[упоминание/ID]',
            aliases: ['ava'],
            cooldown: 3
        });
    }

    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Аватар пользователя ${user.nickname || user.user.username}`)
                .setDescription(`**[WEBP](${user.user.displayAvatarURL({ format: 'webp', dynamic: true })})** / **[GIF](${user.user.displayAvatarURL({ format: 'gif', dynamic: true })})** / **[PNG](${user.user.displayAvatarURL({ format: 'png', dynamic: true })})** / **[ORIGINAL](${user.user.displayAvatarURL({ dynamic: true })})**`)
                .setColor(message.client.constants.colors.main)
                .setImage(user.user.displayAvatarURL({ size: 2048, dynamic: true }))
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            ]
        });
    }
}

module.exports = AvatarCommand;