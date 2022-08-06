const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class ServerCommand extends ChillBotCommand {
    constructor() {
        super('server', {
            description: 'Показывает вам информацию о сервере',
            category: 'info',
            cooldown: 3,
            aliases: ['server-info', 's']
        });
    }

    async run(message, args) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Информация о сервере`)
                .setColor(message.client.constants.colors.main)
                .addFields(
                    [
                        { 
                            name: 'Основная информация', 
                            value: 
                                `✏️ | Название сервера: \`${message.guild.name}\`\n` +
                                `🗓️ | Дата создания: \`${new Date(message.guild.createdAt).toISOString().replace('T', ' ').substring(0, 19)}\` (${message.client.functions.getDays(new Date(message.guild.createdTimestamp))} дней назад)\n` +
                                `👑 | Владелец сервера: \`${message.guild.members.cache.get(message.guild.ownerId).user.tag} | ${message.guild.ownerId}\`\n`
                        },
                        {
                            name: 'Статистика',
                            value: 
                                `👥 | Всего участников: \`${message.guild.memberCount}\`\n` +
                                `👤 | Всего людей: \`${message.guild.members.cache.filter(i => i.user.bot === false).size}\`\n` +
                                `🗂️ | Количество ролей: \`${message.guild.roles.cache.size}\`\n` +
                                `🖇️ | Количество каналов: \`${message.guild.channels.cache.size}\``
                        }
                    ]
                )
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter({ text: `ChillBot by ${message.guild.members.cache.get('663378999103324180').user.username}`, iconURL: message.client.user.displayAvatarURL({ format: 'png' }) })
                .setTimestamp()
            ]
        });
    }
}

module.exports = ServerCommand;