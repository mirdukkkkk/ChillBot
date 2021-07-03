const ChillBotCommand = require('../../structures/ChillBotCommand');
const ChillBotConfirmation = require('../../utils/ChillBotConfirmation');
const { MessageEmbed } = require('discord.js');

class SuggestionsCommand extends ChillBotCommand {
    constructor() {
        super('suggestions', {
            description: 'Настройки системы предложений',
            category: 'settings',
            args: true,
            usage: '<channel/blacklist>',
            userPermissions: ['MANAGE_GUILD']
        });
    }

    async run(message, args) {
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });
        const option = args[0];

        switch(option) {
            case 'channel': {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === args[1]);

                if(!channel) {
                    await new ChillBotConfirmation(message.client, message.author).init(
                        new MessageEmbed()
                        .setTitle(`${message.client.settings.emojis.info} | Подтверждение`)
                        .setColor(message.client.settings.colors.main)
                        .setDescription(`❓ | Вы действительно хотите сбросить канал для предложений?`)
                        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setTimestamp(),
                        message.channel
                    ).then(async (response) => {
                        if(response) {
                            message.client.database.collection('main').updateOne({ name: 'guild' }, {
                                $set: {
                                    ideaChannel: null
                                }
                            });
                            message.reply(
                                new MessageEmbed()
                                .setTitle(`${message.client.settings.emojis.done} | Успешно`)
                                .setColor('A5FF2A')
                                .setDescription(`👤 | Администратор: ${message.author.tag}\n📝 | Сбросил канал идей`)
                                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                .setTimestamp()
                            );
                        } else message.fail(`${message.client.settings.emojis.info} | Операция отменена.`);
                    });
                    break;
                }
                if(!message.guild.channels.cache.has(channel?.id)) return message.fail(`${message.client.settings.warning} | Указанного вами канала не существует на данном сервере.`);
                await new ChillBotConfirmation(message.client, message.author).init(
                    new MessageEmbed()
                    .setTitle(`${message.client.settings.emojis.info} | Подтверждение`)
                    .setColor(message.client.settings.colors.main)
                    .setDescription(`❓ | Вы действительно хотите сменить канал для предложений на <#${channel.id}>?`)
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp(),
                    message.channel
                ).then(async (response) => {
                    if(response) {
                        message.client.database.collection('main').updateOne({ name: 'guild' }, {
                            $set: {
                                ideaChannel: channel.id
                            }
                        });
                        message.reply(
                            new MessageEmbed()
                            .setTitle(`${message.client.settings.emojis.done} | Успешно`)
                            .setColor('A5FF2A')
                            .setDescription(`👤 | Администратор: ${message.author.tag}\n📝 | Сменил канал идей на: <#${channel.id}>`)
                            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                            .setTimestamp()
                        );
                    } else message.fail(`${message.client.settings.emojis.info} | Операция отменена.`);
                });
                break;
            }
            case 'blacklist': {
                const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!user) return message.fail(`${message.client.settings.emojis.warning} | Укажите пожалуйста пользователя, которого вы хотите занести/вынести из чёрного списка.`);
                if(user.permissions.has('MANAGE_GUILD') || user.roles.highest.position >= message.member.roles.highest.position) return message.fail(`${message.client.settings.emojis.warning} | Вы не можете внести данного пользователя в чёрный список`);
                message.client.database.collection('main').updateOne({ name: 'guild' }, {
                    [data.ideaBlacklist?.includes(user.id) ? '$pull' : '$push']: {
                        ideaBlacklist: user.id
                    }
                });
                message.reply(
                    new MessageEmbed()
                    .setTitle(`${message.client.settings.emojis.done} | Успешно`)
                    .setColor('A5FF2A')
                    .setDescription(`👤 | Администратор: ${message.author.tag}\n📝 | ${!data.ideaBlacklist?.includes(user.id) ? 'Внёс в ЧС' : 'Вынес из ЧС'}: ${user.user.tag} (${user.id})`)
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                );
                break;
            }
            default: {
                message.fail(`${message.client.settings.emojis.info} | Необходимо выбрать опцию, их есть только 2: \`blacklist\`, \`channel\``);
                break;
            }
        }
    }
}

module.exports = SuggestionsCommand;