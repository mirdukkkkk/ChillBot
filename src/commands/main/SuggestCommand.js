const { EmbedBuilder } = require('discord.js');
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
        if(args.join(' ').length > 1024) message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Длинна идеи не может быть выше 1024 символов в длинну!`, message);
        let data = await message.client.database.collection('main').findOne({ name: 'guild' });
        if(!data.ideaChannel) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | На сервере не установлен канал с предложениями. Обратитесь к администраторам для решения данной проблемы.`, message);
        if(data.ideaBlacklist?.includes(message.author.id)) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы не можете использовать данную команду, так как находитесь в черном списке предложений. Если это произошло случайно, обратитесь к администрации.`, message);

        const id = (data.ideas?.length ?? 0) + 1;
        const embed = new EmbedBuilder().setTitle(`Предложение №${id}`).setColor(message.client.constants.colors.main).setDescription(args.join(' ')).addFields([ { name: `Дополнительные сведения:`, value: `Автор: **${message.author.tag}** (${message.author.id})\nДата отправки: **${new Date().toLocaleString('ru')}**` } ]).setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().toJSON();
        const m = await message.guild.channels.cache.get(data.ideaChannel).send({
            embeds: [
                embed
            ]
        });
        ['👍', '👎'].forEach((r) => m.react(r))
        message.client.database.collection('main').updateOne({ name: 'guild' }, {
            $push: {
                ideas: {
                    id,
                    message: m.id
                }
            }
        });
        return message.reply(`Ваше предложение было успешно отправлено в канал <#${data.ideaChannel}> (ID: **${id}**)`)
    }
}

module.exports = SuggestCommand;