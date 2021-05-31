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
        return message.reply(
            new MessageEmbed()
            .setTitle(`${message.client.settings.emojis.info} | Информация о сервере`)
            .setColor(message.client.settings.colors.main)
            .setDescription(
                `✏️ | Название сервера: \`${message.guild.name}\`\n👑 | Владелец сервера: \`${message.guild.owner.user.tag} | ${message.guild.owner.id}\`\n👥 | Количество участников: \`${message.guild.memberCount}\`\n🗂️ | Количество ролей: \`${message.guild.roles.cache.size}\`\n🖇️ | Количество каналов: \`${message.guild.channels.cache.size}\`\n🧰 | Автороли: <#781477074019155968>\n🎨 | Цветные роли: <#752069889543372852>`
            )
            .setThumbnail(message.guild.iconURL())
            .setFooter('ChillBot by Мокровка', client.user.displayAvatarURL({ format: 'webp', size: 2048 }))
            .setTimestamp()
        )
    }
}

module.exports = ServerCommand;