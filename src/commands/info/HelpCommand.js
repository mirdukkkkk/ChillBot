const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class HelpCommand extends ChillBotCommand {
    constructor() {
        super('help', {
            description: 'Предоставляет помощь по командам',
            category: 'info',
            usage: '[команда]',
            aliases: ['h', 'хелп'],
            cooldown: 3
        });
    }

    async run(message, args) {
        const categories = { info: 'Информация', fun: 'Развлечения', suggestions: 'Предложения', utils: 'Утилиты', settings: 'Настройки' };
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });

        if(!args[0]) {
            const embed = new EmbedBuilder()
            .setTitle(`${message.client.constants.emojis.info} | Помощь по командам бота`)
            .setColor(message.client.constants.colors.main)
            .setDescription(`Если хотите знать более подробную информацию о команде - вводите \`${data.prefix}${this.name} ${this.usage}\``)
            .setThumbnail(message.client.user.avatarURL({ size: 2048 }))
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTimestamp();

            Object.keys(categories).forEach((i) => {
                embed.addFields([ { name: categories[i], value: [...new Set(message.client.commands.filter((cmd) => cmd.category === i).map((x) => `\`${x.name}\``))].join(', '), inline: false } ]);
            });

            return message.reply({ embeds: [embed] });
        }

        const command = message.client.commands.get(args[0]) || message.client.commands.find((c) => c?.aliases.includes(args[0]));
        if(!command || command.category === 'special') return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Указанная вами команда не была найдена!`, message);

        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${message.client.constants.emojis.info} | Информация о команде`)
                .setColor(message.client.constants.colors.main)
                .addFields([
                    { name: 'Название', value: command.name, inline: true },
                    { name: 'Алиасы', value: command.aliases.join(', ') || 'Отсуствуют', inline: true },
                    { name: 'Описание', value: command.description || 'Отсуствует', inline: true },
                    { name: 'Использование', value: command.usage || 'Без аргументов', inline: true },
                    { name: 'Кулдаун', value: `${command.cooldown} секунд(-ы)`, inline: true }
                ])
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            ]
        });
    }
}

module.exports = HelpCommand;