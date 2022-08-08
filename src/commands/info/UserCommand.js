const ChillBotCommand = require('../../structures/ChillBotCommand');
const { EmbedBuilder } = require('discord.js');

class UserCommand extends ChillBotCommand {
    constructor() {
        super('user', {
            description: 'Показывает информацию о определённом пользователе',
            category: 'info',
            usage: '[пользователь]',
            cooldown: 3,
            aliases: ['u']
        });
    }

    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const data = await message.client.database.collection('users').findOne({ id: user.id });
        try {
            const win = data.xo?.win || 0;
            const lose = data.xo?.lose || 0;
            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle('Профиль пользователя')
                    .setColor(message.client.constants.colors.main)
                    .addFields(
                        [
                            {
                                name: 'Информация об аккаунте',
                                value: 
                                    `📎 | Тег пользователя: \`${user.user.tag}\`\n` +
                                    `🆔 | ID пользователя: \`${user.id}\`\n` +
                                    `🗓️ | Дата регистрации: \`${new Date(user.user.createdAt).toISOString().replace('T', ' ').substring(0, 19)}\` (${message.client.functions.getDays(new Date(user.user.createdTimestamp))} дней назад)\n` +
                                    `🖼️ | Аватарка: **[ссылка](${user.user.avatarURL({ size: 4096 })})**`
                            },
                            {
                                name: 'Серверная информация',
                                value: 
                                    `🖇️ | Никнейм на сервере: \`${user.nickname || 'Не установлен'}\`\n` +
                                    `🔌 | Присоединил(лся/ась) к серверу: \`${new Date(user.joinedTimestamp).toISOString().replace('T', ' ').substring(0, 19)}\`\n` +
                                    `✉️ | Сообщений: \`${(data?.messages ? data.messages : 0) + (message.client.messagecounter.raw[user.id] ? message.client.messagecounter.raw[user.id] : 0)}\`\n` +
                                    `❤️ | В браке с: ${data.married ? (message.guild.members.cache.get(data.married) || `\`${data.married}\``) : '`-`'}\n` +
                                    `🏅 | Значки: ${!data ? '`Отсуствуют`' : data.badges.map((b) => message.client.constants.badges[b]).join(' / ') || '`Отсуствуют`'}`
                            },
                            {
                                name: 'Крестики-нолики',
                                value:
                                    `📈 | Побед: \`${win}\`\n` +
                                    `📉 | Поражений: \`${lose}\`\n` +
                                    `💿 | Было сыграно игр: \`${data.xo?.all || 0}\`\n` +
                                    `📶 | W/L: \`${message.client.functions.formatWinLose(win, lose)}\``
                            }
                        ]
                    )
                    .setThumbnail(user.user.avatarURL())
                    .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()
                ]
            });
        } catch(err) {
            console.error(err);
            message.client.loggingservice.error(err, message)
        }

        return;
    }
}

module.exports = UserCommand;