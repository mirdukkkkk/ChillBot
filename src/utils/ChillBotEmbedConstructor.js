const { EmbedBuilder } = require('discord.js');
const { emojis, colors } = require('./ChillBotConstants');
const { failMessage } = require('./ChillBotErrors');

/**
 * ! Времнное решение заместо Structures.extend()
 * TODO: Переделать класс во что то более удобное чем это
 */

class ChillBotEmbedConstructor {
    constructor(client) {
        this.client = client;
    }

    fail(content, message) {
        if(!content) throw new RangeError('Содержания сообщения об ошибке не было укзано!');
        const interactive = failMessage[Math.floor(Math.random() * failMessage.length)];
        const embed = new EmbedBuilder()
        .setTitle(`${emojis.failure} | Ошибка`)
        .setDescription(content)
        .setColor(colors.error)
        .setFooter({ text: `${interactive.content} | ${interactive.author}` })
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