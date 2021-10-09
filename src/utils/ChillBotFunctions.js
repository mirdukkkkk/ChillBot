const { MessageEmbed } = require('discord.js');

module.exports = {
    dm: async (message, client) => {
        if(!message.guild && !message.author.bot) {
            if(!!message.attachments.first()) {
                const arr = [];
                await message.attachments.map(att => arr.push(att.url));
                return client.constants.webhooks.dm.send({ embeds: [new MessageEmbed().setTitle('Новое сообщение').setDescription(message.content.length === 0 ? 'Пустое сообщение' : message.content).addField(`Вложения`, arr.join('\n'), false).setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true })).setFooter(`${message.author.tag} | ${message.author.id}`).setTimestamp()] });
            } else return client.constants.webhooks.dm.send({ embeds: [new MessageEmbed().setTitle('Новое сообщение').setDescription(message.content.length === 0 ? 'Пустое сообщение' : message.content).setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true })).setFooter(`${message.author.tag} | ${message.author.id}`).setTimestamp()] });
        }
    },
    getDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        return Math.floor(diff / 86400000);
    }
}