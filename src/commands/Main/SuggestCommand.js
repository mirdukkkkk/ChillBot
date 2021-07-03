/* eslint-disable */
const { MessageEmbed, Collection } = require('discord.js');
const ChillBotConfirmation = require('../../utils/ChillBotConfirmation');
const ChillBotCommand = require('../../structures/ChillBotCommand');

const cooldown = new Collection();

class SuggestCommand extends ChillBotCommand {
    constructor() {
        super('suggest', {
            description: `Посылает ваши идеи в соответствующий канал`,
            category: 'main',
            usage: '<предложение>',
            cooldown: 3,
            args: true,
            aliases: ['sg']
        });
    }

    get buttons() {
        return [
            {
                type: 2,
                style: 4,
                custom_id: 'delete',
                label: 'Удалить предложение'
            }
        ]
    }

    async run(message, args) {
        if(args.join(' ').length > 1024) message.fail(`${message.client.settings.emojis.info} | Длинна идеи не может быть выше 1024 символов в длинну!`);
        let data = await message.client.database.collection('main').findOne({ name: 'guild' });
        if(!data.ideaChannel) return message.fail(`${message.client.settings.emojis.info} | На сервере не установлен канал с предложениями. Обратитесь к администраторам для решения данной проблемы.`);
        if(data.ideaBlacklist?.includes(message.author.id)) return message.fail(`${message.client.settings.emojis.info} | Вы не можете использовать данную команду, так как находитесь в черном списке предложений. Если это произошло случайно, обратитесь к администрации.`);

        await new ChillBotConfirmation(message.client, message.author).init(`Вы уверены что хотите отправить своё предложение?`, message.channel).then(async (response) => {
            if(response) {
                const id = (data.ideas?.length ?? 0) + 1;
                const embed = new MessageEmbed().setTitle(`Предложение №${id}`).setColor(message.client.settings.colors.main).setDescription(args.join(' ')).addField(`Дополнительные сведения:`, `Автор: **${message.author.tag}** (${message.author.id})\nДата отправки: **${new Date().toLocaleString('ru')}**`).setFooter(message.guild.name, message.guild.iconURL()).setTimestamp().toJSON();
                const m = await message.client.api.channels(data.ideaChannel).messages.post({
                    data: {
                        content: null,
                        embed: embed,
                        components: [
                            {
                                type: 1,
                                components: this.buttons
                            }
                        ]
                    }
                });
                ['👍', '👎'].forEach((r) => message.guild.channels.cache.get(data.ideaChannel).messages.cache.get(m.id).react(r));
                message.client.database.collection('main').updateOne({ name: 'guild' }, {
                    $push: {
                        ideas: {
                            id,
                            message: m.id
                        }
                    }
                });
                message.client.cache.buttons.set(m.id, async (res) => {
                    switch(res.data.custom_id) {
                        case 'delete': {
                            if(res.member.permissions.has('MANAGE_GUILD') || res.member.id === message.author.id) {
                                /*
                                message.client.database.collection('main').updateOne({ name: 'guild' }, {
                                    $pull: {
                                        ideas: { id }
                                    }
                                });
                                */
                                await message.client.api.channels(data.ideaChannel).messages(m.id).delete().catch(null);
                            }
                            break;
                        }
                    }
                });
                return message.reply(`Ваше предложение было успешно отправлено в канал <#${data.ideaChannel}> (ID: **${id}**)`)
            } else message.fail(`${message.client.settings.emojis.info} | Операция отменена.`);
        });
    }
}

module.exports = SuggestCommand;