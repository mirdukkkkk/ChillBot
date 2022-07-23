const { EmbedBuilder } = require('discord.js');
const ChillBotCommand = require('../../structures/ChillBotCommand');

class ReactionCommand extends ChillBotCommand {
    constructor() {
        super('reaction', {
            description: 'Команда для упраления системой реакций',
            category: 'settings',
            aliases: ['react', 'r'],
            cooldown: 15
        });
    }

    async run(message, args) {
        const data = await message.client.database.collection('users').findOne({ id: message.author.id });
        message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${message.client.constants.emojis.done} | Успешно`)
                .setDescription(`🍪 | Теперь под вашими сообщениями реакции ставиться ${data.reactions ?  '**не будут**' : '**будут**'}`)
                .setColor(message.client.constants.colors.main)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            ]
        });
        return message.client.database.collection('users').updateOne({ id: message.author.id }, {
            $set: {
                reactions: data.reactions ? false : true
            }
        });
    }
}

module.exports = ReactionCommand;