const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class SuggestionsCommand extends ChillBotCommand {
    constructor() {
        super('suggestions', {
            description: 'Настройки системы предложений',
            category: 'suggestions',
            usage: '<channel/blacklist>',
            userPerms: ['MANAGE_GUILD']
        });
    }

    async run(message, args) {
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });
        const option = args[0];

        switch(option) {
            case 'channel': {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === args[1]);

                if(!channel) {
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`${message.client.constants.emojis.done} | Успешно`)
                            .setColor('A5FF2A')
                            .setDescription(`👤 | Администратор: \`${message.author.tag}\`\n📝 | Сбросил канал идей`)
                            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                            .setTimestamp()
                        ]
                    });
                    message.client.database.collection('main').updateOne({ name: 'guild' }, {
                        $set: {
                            ideaChannel: null
                        }
                    });
                    break;
                }
                if(!message.guild.channels.cache.has(channel?.id)) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Указанного вами канала не существует на данном сервере.`, message);
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${message.client.constants.emojis.done} | Успешно`)
                        .setColor('A5FF2A')
                        .setDescription(`👤 | Администратор: \`${message.author.tag}\`\n📝 | Сменил канал идей на: <#${channel.id}>`)
                        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setTimestamp()
                    ]
                });
                message.client.database.collection('main').updateOne({ name: 'guild' }, {
                    $set: {
                        ideaChannel: channel.id
                    }
                });
                break;
            }
            case 'blacklist': {
                const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!user) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Укажите пожалуйста пользователя, которого вы хотите занести/вынести из чёрного списка.`, message);
                if(user.permissions.has(PermissionFlagsBits.ManageGuild) || user.roles.highest.position >= message.member.roles.highest.position) return message.client.embconstructor.fail(`${message.client.constants.emojis.warning} | Вы не можете внести данного пользователя в чёрный список`, message);
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`${message.client.constants.emojis.done} | Успешно`)
                        .setColor('A5FF2A')
                        .setDescription(`👤 | Администратор: ${message.author.tag}\n📝 | ${!data.ideaBlacklist?.includes(user.id) ? 'Внёс в ЧС' : 'Вынес из ЧС'}: ${user.user.tag} (${user.id})`)
                        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setTimestamp()
                    ]
                });
                message.client.database.collection('main').updateOne({ name: 'guild' }, {
                    [data.ideaBlacklist?.includes(user.id) ? '$pull' : '$push']: {
                        ideaBlacklist: user.id
                    }
                });
                break;
            }
            default: {
                message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Необходимо выбрать опцию, их есть только 2: \`blacklist\`, \`channel\``, message);
                break;
            }
        }
    }
}

module.exports = SuggestionsCommand;