const { MessageEmbed } = require('discord.js');
const { emojis, colors } = require('./ChillBotConstants');

/**
 * ! Времнное решение заместо Structures.extend()
 * TODO: Переделать класс во что то более удобное чем это
 */

class ChillBotEmbedConstructor {
    constructor(client) {
        this.client = client;
    }

    fail(content, message) {
        if(!content) throw new SyntaxError('Содержания сообщения об ошибке не было укзано!');
        const embed = new MessageEmbed()
        .setTitle(`${emojis.failure} | Ошибка`)
        .setDescription(content)
        .setColor(colors.error)
        .setFooter(this.client.user.username, this.client.user.avatarURL())
        .setTimestamp();

        if(!message) return embed;
        return message.reply({ 
            embeds: [
                embed
            ]
        });
    }
}

module.exports = ChillBotEmbedConstructor;