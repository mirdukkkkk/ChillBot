const { MessageEmbed } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class ServerCommand extends ChillBotCommand {
    constructor() {
        super('server', {
            description: 'Показывает вам информацию о сервере',
            category: 'main',
            cooldown: 3,
            aliases: ['server-info', 's']
        });
    }

    async run(message, args) {
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`${message.client.constants.emojis.info} | Информация о сервере`)
                .setColor(message.client.constants.colors.main)
                .setDescription(`✏️ | Название сервера: \`${message.guild.name}\`\n🗓️ | Дата создания: \`${new Date(message.guild.createdAt).toISOString().replace('T', ' ').substr(0, 19)}\`\n🕐 | Сервер создан: \`${message.client.functions.getDays(new Date(message.guild.createdTimestamp))} дней назад\`\n👑 | Владелец сервера: \`${message.guild.members.cache.get(message.guild.ownerId).user.tag} | ${message.guild.ownerId}\`\n👥 | Количество участников: \`${message.guild.memberCount}\`\n🗂️ | Количество ролей: \`${message.guild.roles.cache.size}\`\n🖇️ | Количество каналов: \`${message.guild.channels.cache.size}\`\n🧰 | Автороли: <#781477074019155968>\n🎨 | Цветные роли: <#752069889543372852>`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter(`ChillBot by ${message.guild.members.cache.get('663378999103324180').user.username}`, message.client.user.displayAvatarURL({ format: 'png' }))
                .setTimestamp()
            ]
        });
    }
}

module.exports = ServerCommand;