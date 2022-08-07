const { EmbedBuilder } = require('discord.js');

module.exports = {
    dm: (message, client) => {
        if(!message.guild && !message.author.bot) {
            if(message.attachments.first()) {
                const arr = [];
                message.attachments.map(att => arr.push(att.url));
                return client.constants.webhooks.dm.send({ embeds: [new EmbedBuilder().setTitle('Новое сообщение').setDescription(message.content.length === 0 ? 'Пустое содержание' : message.content).addField(`Вложения`, arr.join('\n'), false).setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true })).setFooter({ text: `${message.author.tag} | ${message.author.id}` }).setTimestamp()] });
            } else return client.constants.webhooks.dm.send({ embeds: [new EmbedBuilder().setTitle('Новое сообщение').setDescription(message.content.length === 0 ? 'Пустое содержание' : message.content).setThumbnail(message.author.displayAvatarURL({ format: 'webp', dynamic: true })).setFooter({ text: `${message.author.tag} | ${message.author.id}`}).setTimestamp()] });
        }
    },
    
    getDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        return Math.floor(diff / 86400000);
    },

    formatWinLose(win, lose) {
        if(isNaN(win/lose)) return 'невозможно расчитать';
        if(!(isFinite(win/lose))) return 'невозможно расчитать';

        return (win/lose).toFixed(2);
    }
}