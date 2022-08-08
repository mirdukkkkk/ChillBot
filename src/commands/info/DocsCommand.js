const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class DocsCommand extends ChillBotCommand {
    constructor() {
        super('docs', {
            description: 'Предоставляет помощь по системам бота',
            category: 'info',
            usage: '<badges>',
            aliases: ['d'],
            cooldown: 3
        });
    }

    async run(message, args) {
        const choice = args[0];
        switch(choice) {
            case 'b':
            case 'badges': {
                message.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setTitle('Информация по значкам')
                            .setDescription(
                                `💻 | \`developer\` - значок разработчика чиллбота\n` +
                                `🤝 | \`trusted\` - значок доверенного участника, даётся тому, кому хоть кто то из высшей администрации доверяет\n` +
                                `🏷️ | \`purchased\` - значок, который можно купить в $shop (<#792040367624421376>)\n` +
                                `🛡️ | \`moderation\` - даётся людям с ролью <@&748922948433477723>\n` +
                                `🚀 | \`bumper\` - даётся за ежедневный бамп сервера на мониторингах в <#739744319333990441>\n` +
                                `🎨 | \`creator\` - даётся за 3-5 публикации работ в <#738532999125139568>\n` +
                                `💡 | \`creative\` - даётся за 4-5 принятых идей в \`.suggest\` (<#759839539798868013>)\n` +
                                `🎁 | \`thanks\` - даётся за активацию "премиум" возможностей в каком либо из ботов (джунипер, карл и т.п.)`
                            )
                            .setColor(message.client.constants.colors.main)
                            .setFooter({ text: `Значки можно попросить выдать у ${message.guild.members.cache.get('663378999103324180').nickname || message.guild.members.cache.get('663378999103324180').user.username} или высшей администрации сервера`, iconURL: message.client.user.avatarURL() })
                            .setTimestamp()
                        ]
                    }
                );
                break;
            }

            default: {
                message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Доступен пока один параметр: \`badges(b)\``, message);
                break;
            }
        }


        return;
    }
}

module.exports = DocsCommand;