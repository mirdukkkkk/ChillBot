const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class MarriageCommand extends ChillBotCommand {
    constructor() {
        super('marriage', {
            description: 'Позволяет пожениться с любым участником сервера 🏳️‍🌈',
            category: 'fun',
            usage: '<ID или упоминание/cancel(canc, c)>',
            aliases: ['marry', 'm'],
            cooldown: 15
        });
    }

    async run(message, args) {
        const option = args[0];
        switch(option) {
            case 'c':
            case 'canc':
            case 'cancel': {
                const data = await message.client.database.collection('users').findOne({ id: message.author.id });

                if(!data.married) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы и так не женаты`, message);

                message.reply({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`Успешно`)
                        .setDescription(`💍 | Брак был разорван`)
                        .setColor('#1690FF')
                        .setTimestamp()
                    ]
                });

                message.client.database.collection('users').updateOne({ id: message.author.id }, { $set: { married: null } });
                message.client.database.collection('users').updateOne({ id: data.married }, { $set: { married: null } });
                break;
            }

            default: {
                const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if(!user) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Укажите того/ту, с кем вы хотите пожениться`, message);
                
                const data = await message.client.database.collection('users').findOne({ id: user.id });

                if(user.id === message.author.id) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы не можете жениться на себе :(`, message);
                if(user.bot) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы не можете жениться на боте`, message);
                if(data.married) return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Вы уже женаты с ${(message.guild.members.cache.get(data.married)?.nickname || message.client.users.cache.get(data.married)?.username) || data.married}`, message);

                const _msg = await message.channel.send({ 
                    embeds: [
                        new EmbedBuilder()
                        .setTitle(`Предложение`)
                        .setDescription(`💍 | ${message.author} предлагает вам поженится, на ответ есть минута`)
                        .setColor('#1690FF')
                        .setTimestamp()
                    ],
                    components: [
                        new ActionRowBuilder()
                        .setComponents(
                            new ButtonBuilder()
                            .setLabel('Принять')
                            .setStyle(ButtonStyle.Success)
                            .setCustomId('1_marry_choose'),
                            new ButtonBuilder()
                            .setLabel('Отклонить')
                            .setStyle(ButtonStyle.Danger)
                            .setCustomId('2_marry_choose'),
                        )
                    ]
                });

                const collector = message.channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && i.message.id === _msg.id && i.customId.endsWith("_marry_choose"), time: 60000 })
                .on('collect', (i) => collector.stop(i.customId[0]))
                .on('end', (f, r) => {
                    switch(r) {
                        case 'time': {
                            _msg.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setTitle('Время на принятие решения вышло')
                                    .setColor('#1690FF')
                                    .setTimestamp()
                                ]
                            });

                            _msg.edit({
                                embeds: [_msg.embeds[0]],
                                components: []
                            });
                            break;
                        }

                        case '2': {
                            _msg.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setTitle('Отказ')
                                    .setDescription(`${user} отказал(лся/ась) от предложения брака`)
                                    .setColor('#FF3333')
                                    .setTimestamp()
                                ]
                            });

                            _msg.edit({
                                embeds: [_msg.embeds[0]],
                                components: []
                            });
                            break;
                        }

                        case '1': {
                            _msg.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setTitle('Предложение принято')
                                    .setDescription(`💍 | ${user} принял(а) предложение брака\n${message.client.constants.emojis.info} | Теперь ${user} и ${message.author} женаты!`)
                                    .setColor('#33FF33')
                                    .setTimestamp()
                                ]
                            });

                            _msg.edit({
                                embeds: [_msg.embeds[0]],
                                components: []
                            });

                            message.client.database.collection('users').updateOne({ id: message.author.id }, { $set: { married: user.id } });
                            message.client.database.collection('users').updateOne({ id: user.id }, { $set: { married: message.author.id } });
                            break;
                        }
                    }
                });
            }
        }
    }
}

module.exports = MarriageCommand;