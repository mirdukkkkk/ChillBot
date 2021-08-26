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
        const categories = { main: 'Основное', fun: 'Развлечения', moderation: 'Модерация' };
        const data = await message.client.database.collection('main').findOne({ name: 'guild' });

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle(`${message.client.constants.emojis.info} | Помощь по командам бота`)
            .setColor(message.client.constants.colors.main)
            .setDescription(`Если хотите знать более подробную информацию о команде - вводите \`${data.prefix}${this.name} ${this.usage}\``)
            .setThumbnail(message.client.user.avatarURL({ size: 2048 }))
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setTimestamp();

            Object.keys(categories).forEach((i) => {
                embed.addField(categories[i], [...new Set(message.client.commands.filter((cmd) => cmd.category === i).map((x) => `\`${x.name}\``))].join(', '));
            });

            return message.reply({ embeds: [embed] });
        }

        const command = message.client.commands.get(args[0]);
        if(!command || command.category === 'special') return message.client.embconstructor.fail(`${message.client.constants.emojis.info} | Указанная вами команда не была найдена!`, message);

        return message.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`${message.client.constants.emojis.info} | Информация о команде`)
                .setColor(message.client.constants.colors.main)
                .addFields(
                    { name: 'Название', value: command.name, inline: true },
                    { name: 'Алиасы', value: command.aliases.join(', ') || 'Отсуствуют', inline: true },
                    { name: 'Описание', value: command.description || 'Отсуствует', inline: true },
                    { name: 'Использование', value: command.usage || 'Без аргументов', inline: true },
                    { name: 'Кулдаун', value: `${command.cooldown} секунд(-ы)`, inline: true }
                )
                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
            ]
        });
    }
}

module.exports = HelpCommand;