const ChillBotCommand = require('../../structures/ChillBotCommand');
const { EmbedBuilder } = require('discord.js');
const { Pagination } = require('pagination.djs');

class TopCommand extends ChillBotCommand {
    constructor() {
        super('top', {
            description: 'Показывает таблицу лидеров по нескольким напрялениям',
            category: 'info',
            usage: '<messages(m, msg)>',
            cooldown: 3,
            aliases: ['t', 'leaderboard', 'lb']
        });
    }

    async run(message, args) {
        let option = args[0];
        switch(option) {
            case 'm':
            case 'msg':
            case 'messages': {
                let users = await message.client.database.collection('users').find().toArray();
                users = users.sort((a, b) => (b.messages || 0) - (a.messages || 0));
                const embeds = [];
                let place = 1;

                for(let i = 0; i < Math.ceil(users.length / 10); i++) {
                    const embed = new EmbedBuilder()
                    .setTitle('🏅 | Таблица лидеров')
                    .setColor(message.client.constants.colors.main)
                    .setFooter({ text: `Страница ${i+1}/${Math.ceil(users.length / 10)}, человек: ${users.length}`, iconURL: message.guild.iconURL() })
                    .setTimestamp();

                    users.slice(i * 10, i * 10 + 10).map((user) => {
                        embed.addFields([ { name: `#${place++}. ${(message.guild.members.cache.get(user.id)?.nickname || message.client.users.cache.get(user.id)?.username) || 'ID - ' + user.id}`, value: `Сообщений: ${user.messages || 0}` } ]);
                    });

                    embeds.push(embed);
                }

                const pag = new Pagination(message, {
                    firstEmoji: '⏪',
                    prevEmoji: '⬅️',
                    nextEmoji: '➡️',
                    lastEmoji: '⏩',
                    idle: 60000,
                    ephemeral: false,
                    buttonStyle: 'Secondary'
                })
                .setEmbeds(embeds)
                .reply();

                break;
            }

            default: {
                message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Необходимо выбрать опцию для данной команды!\n${message.client.constants.emojis.info} | Доступные опции: \`message(msg, m)\``, message);
                break;
            }
        }
    }
}

module.exports = TopCommand;