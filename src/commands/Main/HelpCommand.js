const { MessageEmbed } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class HelpCommand extends ChillBotCommand {
    constructor() {
        super('help', {
            description: 'Помощь по командам',
            category: 'main',
            usage: '[команда]',
            cooldown: 3
        });
    }

    async run(message, args) {
        const categories = [
            {
                name: 'Основное',
                key: 'main',
                description: 'Основной модуль бота'
            },
            {
                name: 'Развлечения',
                key: 'fun',
                description: 'Модуль для развлечения'
            }
        ];

        const data = message.client.settings.guild;

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle(`${message.client.settings.emojis.info} | Помощь по командам`)
            .setColor(message.client.settings.colors.main)
            .setDescription(`Узнать и нформация о определённом модуле можно через \`${data.prefix}\``)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

            for (const category of categories) {
                embed.addField(category.name, category.description, true);
            }

            message.reply(embed);
        } if(args[0]) {
            const category = categories.find((c) => c.name === args[0] || c.key === args[0]);
            if(!category) return message.fail(`${message.client.settings.emojis.info} | Указанная вами категория не была найдена доступных`);

            const embed = new MessageEmbed()
            .setTitle(`🔧 | Команды модуля ${category.name}`)
            .setColor(message.client.settings.colors.main)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

            message.client.commands.filter((cmd) => cmd.category === category.key).map((cmd) => {
                embed.description += `\`${data.prefix}${cmd.name}\` — ${cmd.description}\n`;
            });

            return message.reply(embed);
        }
    }
}

module.exports = HelpCommand;