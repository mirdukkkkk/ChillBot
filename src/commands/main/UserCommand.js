const ChillBotCommand = require('../../structures/ChillBotCommand');
const { EmbedBuilder } = require('discord.js');

class UserCommand extends ChillBotCommand {
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
        const data = await message.client.database.collection('users').findOne({ id: user.id });
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle('👤 | Профиль пользователя')
                .setColor(message.client.constants.colors.main)
                .setDescription(`📎 | Тег пользователя: \`${user.user.tag}\`\n🖇️ | Никнейм на сервере: \`${user.nickname || 'Не установлен'}\`\n🆔 | ID пользователя: \`${user.id}\`\n🕐 | Был(-а) зарегистрирован(-а): \`${message.client.functions.getDays(new Date(user.user.createdTimestamp))} дней назад\`\n🗓️ | Дата регистрации: \`${new Date(user.user.createdAt).toISOString().replace('T', ' ').substring(0, 19)}\`\n🔌 | Присоединил(-лся/-ась) к серверу: \`${new Date(user.joinedTimestamp).toISOString().replace('T', ' ').substring(0, 19)}\`\n✉️ | Сообщений: \`${(isNaN(data.messages) ? 0 : data.messages) + (message.client.messagecounter.raw[message.author.id] ? message.client.messagecounter.raw[message.author.id] : 0)}\`\n🏅 | Значки: ${!data ? '`Отсуствуют`' : data.badges.map((b) => message.client.constants.badges[b]).join(' / ') || '`Отсуствуют`'}`)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            ]
        });
    }
}

module.exports = UserCommand;