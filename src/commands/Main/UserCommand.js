const ChillBotComamnd = require('../../structures/ChillBotCommand');
const { MessageEmbed } = require('discord.js');

class UserCommand extends ChillBotComamnd {
    constructor() {
        super('user', {
            description: 'Показывает информацию о определённом пользователе',
            category: 'main',
            usage: '[пользователь]',
            cooldown: 3,
            aliases: ['u']
        });
    }

    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const DataUser = await message.client.database.collection('users').findOne({ userID: user.id });
        return message.reply(
            new MessageEmbed()
            .setTitle('👤 | Профиль пользователя')
            .setColor(message.client.settings.colors.main)
            .setDescription(`📎 | Тег пользователя: \`${user.user.tag}\`\n🖇️ | Никнейм на сервере: \`${user.nickname || 'Не установлен'}\`\n🆔 | ID пользователя: \`${user.id}\`\n🗓️ | Дата регистрации: \`${new Date(user.user.createdAt).toISOString().replace('T', ' ').substr(0, 19)}\`\n🔌 | Присоеденился к серверу: \`${new Date(user.joinedTimestamp).toISOString().replace('T', ' ').substr(0, 19)}\`\n🏅 | Значки: ${DataUser.badges.map((b) => message.client.constants.badges[b]).join(' / ') || '`Отсуствуют`'}`)
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
        );
    }
}

module.exports = UserCommand;