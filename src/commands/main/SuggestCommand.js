const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class SuggestCommand extends ChillBotCommand {
    constructor() {
        super('suggest', {
            description: `Посылает ваши идеи в соответствующий канал`,
            category: 'main',
            usage: '<предложение>',
            cooldown: 3,
            aliases: ['sg']
        });
    }

    async run(message, args) {
        if(args.join(' ').length > 1024) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Длинна идеи не может быть выше 1024 символов в длинну!`, message);
        if(args.join(' ').length === 0) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Идея должна хотя бы что то в себе содержать`, message);
        let data = await message.client.database.collection('main').findOne({ name: 'guild' });
        if(!data.ideaChannel) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | На сервере не установлен канал с предложениями. Обратитесь к администраторам для решения данной проблемы.`, message);
        if(data.ideaBlacklist?.includes(message.author.id)) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы не можете использовать данную команду, так как находитесь в черном списке предложений. Если это произошло случайно, обратитесь к администрации.`, message);

        const id = (await message.client.database.collection('ideas').countDocuments()) + 1;
        const embed = new EmbedBuilder().setTitle(`Предложение №${id}`).setColor(message.client.constants.colors.main).setDescription(args.join(' ')).addFields([ { name: `Дополнительные сведения`, value: `Автор: **${message.author.tag}** (${message.author.id})\nДата отправки: **${new Date().toLocaleString('ru')}**` }, { name: 'Ответа от администрации ещё не последовало', value: 'Здесь появится комментраий от отвечающего администратора' }, { name: 'Оценка участников', value: 'Пока что оценок недостаточно' } ]).setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().toJSON();
        try {
            const m = await message.guild.channels.cache.get(data.ideaChannel).send({
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                        .setCustomId('rating')
                        .setPlaceholder('Установите вашу оценку идее')
                        .setOptions(
                            {
                                label: 'Установить 1 звезду',
                                value: 'onestar',
                                emoji: message.client.constants.emojis.rating['1']
                            },
                            {
                                label: 'Установить 2 звезды',
                                value: 'twostar',
                                emoji: message.client.constants.emojis.rating['2']
                            },
                            {
                                label: 'Установить 3 звезды',
                                value: 'threestar',
                                emoji: message.client.constants.emojis.rating['3']
                            },
                            {
                                label: 'Установить 4 звезды',
                                value: 'fourstar',
                                emoji: message.client.constants.emojis.rating['4']
                            },
                            {
                                label: 'Установить 5 звёзд',
                                value: 'fivestar',
                                emoji: message.client.constants.emojis.rating['5']
                            }
                        )
                    )
                ]
            });
            message.client.database.collection('ideas').updateOne({ id }, {
                $set: {
                    rating: [],
                    message: m.id
                }
            }, { upsert: true });
        } catch(error) {
            return message.client.loggingservice.error(error, message);
        }

        return message.reply(`Ваше предложение было успешно отправлено в канал <#${data.ideaChannel}> (ID: **${id}**)`)
    }
}

module.exports = SuggestCommand;